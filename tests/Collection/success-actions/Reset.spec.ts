import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateData, Mock } from '../../mocks/Utils'

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

    test('Test 1 - reset', () => {
        const objects = 40
        const data = generateData(objects)
        sut.addMany(data)
        const dataBeforeReset = sut.findAll() as Mock
        expect(dataBeforeReset.length).toBe(objects)
        sut.reset()
        const dataAfterReset = sut.findAll() as Mock
        expect(Array.isArray(dataAfterReset)).toBeTruthy()
        expect(dataAfterReset.length).toBe(0)
    })
})
