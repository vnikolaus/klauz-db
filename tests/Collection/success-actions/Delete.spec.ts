import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateData, Mock } from '../../mocks/Utils'

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
        const data = generateData(10)
        sut.addMany(data)
    })

    afterAll(() => {
        sut.drop()
    })

    test('Test 1 - delete', () => {
        expect(sut.findAll().length).toBe(10)
        const obj = sut.add({
            id: 11,
            client: `Jest_11`,
            sut: true,
        }) as Mock
        const dbData_1 = sut.findAll() as Mock
        expect(dbData_1.length).toBe(11)
        expect(dbData_1.at(-1).client).toBe('Jest_11')
        sut.delete(obj._ObjectId)
        const dbData_2 = sut.findAll() as Mock
        expect(dbData_2.length).toBe(10)
        expect(dbData_2.at(-1).client).toBe('Jest_10')
    })
})
