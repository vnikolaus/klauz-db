import { afterAll, afterEach, beforeAll, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateData, Mock } from '../../mocks/Utils'

const skipTest = (process.env.SKIP_DELETEMANY_TEST == 'true')
const runTest = skipTest ? describe.skip : describe

runTest('Method: DELETEMANY | sucess-actions', () => {
    const objects = 30
    const path = 'tests/.data-test'
    const collectionName = 'deleteMany-test'
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

    test('Test 1 - deleteMany - full', () => {
        const data = generateData(objects)
        sut.addMany(data)
        const dataBeforeDelete = sut.findAll() as Mock
        expect(dataBeforeDelete.length).toBe(objects)
        sut.deleteMany(dataBeforeDelete)
        const dataAfterDelete = sut.findAll() as Mock
        expect(dataAfterDelete.length).toBe(0)
    })

    test('Test 2 - deleteMany - partial', () => {
        const data = generateData(objects)
        sut.addMany(data)
        const dataBeforeDelete = sut.findAll() as Mock
        const dataToDelete = sut.findWhere('id', 'less_than', 11) as Mock
        expect(dataBeforeDelete.length).toBe(objects)
        expect(dataToDelete.length).toBe(10)
        sut.deleteMany(dataToDelete)
        const dataAfterDelete = sut.findAll() as Mock
        expect(dataAfterDelete.length).toBe(20)
    })
})
