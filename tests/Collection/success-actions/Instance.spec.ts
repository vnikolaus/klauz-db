import { afterAll, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'

describe('Collection instance', () => {
    const sut = new Collection({
        name: 'tests',
        path: 'tests/.data-test'
    }) as Collection

    afterAll(() => sut.drop())

    test('Should be a instance of Collection', () => {
        expect(sut).toBeInstanceOf(Collection)
    })
})