import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateData, Mock, REGEX_UUID } from '../../mocks/Utils'

const skipTest = (process.env.SKIP_ADD_TEST == 'true')
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

    test('Test 1 - update', () => {
        const obj_1 = sut.add({
            id: 1,
            client: `Jest_1`,
            sut: false,
        }) as Mock
        expect(obj_1.client).toBe('Jest_1')
        sut.update(obj_1._ObjectId, { client: 'Jest_XX', sut: true })
        const [collectionObj] = sut.findWhere('_ObjectId', 'equals', obj_1._ObjectId) as Mock
        expect(collectionObj.client).toBe('Jest_XX')
        expect(collectionObj.sut).toBeTruthy()
    })
})
