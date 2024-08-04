import { afterAll, afterEach, beforeAll, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateData, Mock, REGEX_UUID } from '../../mocks/Utils'

const skipTest = (process.env.SKIP_ADD_TEST == 'true')
const runTest = skipTest ? describe.skip : describe

runTest('Method: UPDATEMANY | sucess-actions', () => {
    const path = 'tests/.data-test'
    const collectionName = 'updateMany-test'
    let sut: Collection
    
    beforeAll(() => {
        sut = new KlauzDB({
            path
        }).createCollection(collectionName) as Collection
    })

    afterEach(() => {
        sut.reset()
    })

    afterAll(() => {
        sut.drop()
    })

    test('Test 1 - updateMany - full', () => {
        const data = generateData(30)
        sut.addMany(data)
        const dataBeforeUpdate = sut.findAll() as Mock
        sut.updateMany(dataBeforeUpdate, { client: 'Jest_XX', sut: false })
        const dataAfterUpdate = sut.findAll() as Mock
        expect(dataAfterUpdate.every((el: any) => el.client === 'Jest_XX' && el.sut === false)).toBeTruthy()
    })

    test('Test 2 - updateMany - partial', () => {
        const data = generateData(30)
        sut.addMany(data)
        const dataBeforeUpdate = sut.findWhere('id', 'bigger_than', 15) as Mock
        sut.updateMany(dataBeforeUpdate, { client: 'Jest_XX' })
        const dataAfterUpdate = sut.findWhere('client', 'like', 'XX') as Mock
        expect(dataAfterUpdate.length).toBe(15)
        expect(dataAfterUpdate.at(0).id).toBe(16)
        expect(dataAfterUpdate.every((el: any) => el.client === 'Jest_XX')).toBeTruthy()
    })
})
