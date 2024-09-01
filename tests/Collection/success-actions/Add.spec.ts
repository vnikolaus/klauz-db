import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateFakeData, Mock } from '../../mocks/Utils'

const skipTest = (process.env.SKIP_ADD_TEST == 'true')
const runTest = skipTest ? describe.skip : describe

runTest('Method: ADD | sucess-actions', () => {
    const mockObjects = 5
    const path = 'tests/.data-test'
    const collectionName = 'add-test'
    let sut: Collection
    
    beforeAll(() => {
        sut = new KlauzDB({
            path
        }).createCollection(collectionName) as Collection
    })

    afterAll(() => {
        sut.drop()
    })

    beforeEach(() => {
        const data = generateFakeData(mockObjects) as Mock
        sut.addMany(data)
    })

    afterEach(() => {
        sut.reset()
    })

    test('Test 1 - add', () => {
        const collectionData = sut.findAll() as Mock
        expect(collectionData.length).toBe(mockObjects)
        const resAdd = sut.add({
            id: mockObjects + 1,
            client: `Jest_${mockObjects + 1}`,
            sut: false,
        }) as Mock
        expect(resAdd).toHaveProperty('_zid')
        expect(typeof resAdd._zid).toBe('number')
        expect(resAdd.id).toBe(mockObjects + 1)
        expect(resAdd.client).toBe(`Jest_${mockObjects + 1}`)
        expect(resAdd.sut).toBe(false)
        const collectionDataPostAdd = sut.findAll() as Mock
        expect(collectionDataPostAdd.length).toBe(mockObjects + 1)
    })
})
