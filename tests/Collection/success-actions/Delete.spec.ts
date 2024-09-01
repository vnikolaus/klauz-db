import { afterAll, afterEach, beforeAll, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateFakeData, JestObject, Mock } from '../../mocks/Utils'

const skipTest = (process.env.SKIP_DELETE_TEST == 'true')
const runTest = skipTest ? describe.skip : describe

runTest('Method: DELETE | sucess-actions', () => {
    const path = 'tests/.data-test'
    const collectionName = 'delete-test'
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

    test('Test 1 - delete single obj', () => {
        const data = generateFakeData(10)
        sut.addMany(data)
        sut.delete<JestObject>(obj => obj._zid === 1)
        const dbData = sut.findAll() as Mock
        expect(dbData.length).toBe(9)
        expect(dbData.at(0).client).toBe('Jest_2')
    })

    test('Test 2 - delete many objs', () => {
        const data = generateFakeData(50)
        sut.addMany(data)
        sut.delete<JestObject>(obj => obj._zid > 20)
        const dbData = sut.findAll() as Mock
        expect(dbData.length).toBe(20)
        expect(dbData.at(-1).client).toBe('Jest_20')
    })

    test('Test 3 - delete many objs', () => {
        const data = generateFakeData(300)
        sut.addMany(data)
        sut.delete<JestObject>(obj => (obj.id & 1) === 1)
        const dbData = sut.findAll() as Mock
        expect(dbData.length).toBe(150)
        expect(dbData.at(0).client).toBe('Jest_2')
        expect(dbData.at(-1).client).toBe('Jest_300')
    })
})
