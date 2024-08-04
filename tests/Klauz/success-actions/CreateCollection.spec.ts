import { describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'

const skipTest = (process.env.SKIP_CREATE_COLLECTION_TEST == 'true')
const runTest = skipTest ? describe.skip : describe

runTest('CreateCollection - success-actions', () => {
    const path = 'tests/.data-test'
    const collectionName = 'createCollection-test'

    test('Test 1 - CreateCollection - success-actions', () => {
        const kz = new KlauzDB({
            path
        })
        const sut = kz.createCollection(collectionName) as any
        expect(sut).toBeInstanceOf(Collection)
        sut.drop()
    })
})