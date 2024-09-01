import { afterAll, afterEach, beforeAll, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateFakeData, JestObject, Mock } from '../../mocks/Utils'
import { randomInt } from 'crypto'

const skipTest = (process.env.SKIP_UPDATE_TEST == 'true')
const runTest = skipTest ? describe.skip : describe

runTest('Method: UPDATE | sucess-actions', () => {
    const path = 'tests/.data-test'
    const collectionName = 'update-test'
    let sut: Collection
    
    beforeAll(() => {
        sut = new KlauzDB({
            path
        }).createCollection(collectionName) as Collection
    })

    afterAll(() => {
        sut.drop()
    })

    afterEach(() => {
        sut.reset()
    })

    test('Test 1 - update existent key', () => {
        const obj = sut.add({
            id: 1,
            client: `Jest_1`,
            sut: false,
        }) as Mock
        expect(obj._zid).toBeDefined()
        expect(obj.client).toBe('Jest_1')
        const [result] = sut.update<JestObject>(obj => obj.id === 1, { client: 'Jest_XX', sut: true }) as Mock
        expect(result.client).toBe('Jest_XX')
        expect(result.sut).toBeTruthy()
        const [collectionObj] = sut.find<JestObject>(obj => obj.id === 1) as Mock
        expect(collectionObj.client).toBe('Jest_XX')
        expect(collectionObj.sut).toBeTruthy()
    })

    test('Test 2 - update and insert new key', () => {
        const obj = sut.add({
            id: 1,
            client: `Jest_1`,
            sut: false,
        }) as Mock
        expect(obj._zid).toBeDefined()
        expect(obj.client).toBe('Jest_1')
        const [result] = sut.update<JestObject>(obj => obj.id === 1, { permissions: { admin: true } }) as Mock
        expect(result).toHaveProperty('permissions')
        expect(result.permissions).toHaveProperty('admin')
        expect(result.permissions.admin).toBeTruthy()
        const [collectionObj] = sut.find<JestObject>(obj => obj.id === 1) as Mock
        expect(collectionObj).toHaveProperty('permissions')
        expect(collectionObj.permissions).toHaveProperty('admin')
        expect(collectionObj.permissions.admin).toBeTruthy()
    })

    test('Test 3 - update many data', () => {
        const objs = 100, q = 50
        const r1 = randomInt(objs), r2 = randomInt(q, objs)
        const fakeData = generateFakeData(objs)
        sut.addMany(fakeData) as Mock
        const dbData1 = sut.findAll() as Mock
        expect(dbData1[r1].client).toBe(`Jest_${r1 + 1}`)
        sut.update<JestObject>(obj => obj._zid > q, { client: 'Jest_XX' }) as Mock
        const dbData2 = sut.findAll() as Mock
        expect(dbData2[r2].client).toBe(`Jest_XX`)
    })
})
