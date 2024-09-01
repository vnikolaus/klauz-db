import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateFakeData, Mock } from '../../mocks/Utils'

const skipTest = (process.env.SKIP_RESET_TEST == 'true')
const runTest = skipTest ? describe.skip : describe

runTest('Method: RESET | sucess-actions', () => {
    const path = 'tests/.data-test'
    const collectionName = 'reset-test'
    let sut: Collection
    
    beforeAll(() => {
        sut = new KlauzDB({
            path
        }).createCollection(collectionName) as Collection
    })

    afterAll(() => {
        sut.drop()
    })

    test('Test 1 - reset collection', () => {
        const objects = 50
        const data = generateFakeData(objects)
        sut.addMany(data)
        const dataBeforeReset = sut.findAll() as Mock
        expect(dataBeforeReset.length).toBe(objects)
        const res = sut.reset()
        const dataAfterReset = sut.findAll() as Mock
        expect(Array.isArray(dataAfterReset)).toBeTruthy()
        expect(dataAfterReset.length).toBe(0)
        expect(res).toBeUndefined()
    })
})
