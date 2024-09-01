import { afterAll, afterEach, beforeAll, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateFakeData, JestObject, Mock } from '../../mocks/Utils'

const skipTest = (process.env.SKIP_FIND_TEST == 'true')
const runTest = skipTest ? describe.skip : describe

runTest('Method: FIND | sucess-actions', () => {
    const path = 'tests/.data-test'
    const collectionName = 'find-test'
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

    test('Test 1 - find - multiples conditions / without options', () => {
        const data = generateFakeData(5) as Mock
        sut.addMany(data)
        // Equals
        const outputEquals = sut.find<JestObject>(obj => obj._zid === 1) as Mock
        expect(outputEquals.length).toBe(1)
        expect(outputEquals.at(-1)).toHaveProperty('_zid')
        expect(outputEquals.at(-1).id).toBe(1)

        // Not Equals
        const outputNotEquals = sut.find<JestObject>(obj => obj._zid !== 1) as Mock
        expect(outputNotEquals.length).toBe(4)
        expect(outputNotEquals.at(-1)).toHaveProperty('_zid')
        expect(outputNotEquals.at(-1).id).toBe(5)

        // Like
        const outputLike = sut.find<JestObject>(obj => obj.client.match('2')) as Mock
        expect(outputLike.length).toBe(1)
        expect(outputLike.at(-1)).toHaveProperty('_zid')
        expect(outputLike.at(-1).id).toBe(2)

        // Not Like
        const outputNotLike = sut.find<JestObject>(obj => !obj.client.match('2')) as Mock
        expect(outputNotLike.length).toBe(4)
        expect(outputNotLike.at(-1)).toHaveProperty('_zid')
        expect(outputNotLike.at(-1).id).toBe(5)

        // Higher Than
        const outputHigherThan = sut.find<JestObject>(obj => obj.id > 3) as Mock
        expect(outputHigherThan.length).toBe(2)
        expect(outputHigherThan.at(-1)).toHaveProperty('_zid')
        expect(outputHigherThan.at(-1).id).toBe(5)

        // Less Than
        const outputLessThan = sut.find<JestObject>(obj => obj.id < 3) as Mock
        expect(outputLessThan.length).toBe(2)
        expect(outputLessThan.at(-1)).toHaveProperty('_zid')
        expect(outputLessThan.at(-1).id).toBe(2)

        // Between
        const outputBetween = sut.find<JestObject>(obj => obj.id >= 3 && obj.id <= 4) as Mock
        expect(outputBetween.length).toBe(2)
        expect(outputBetween.at(-1)).toHaveProperty('_zid')
        expect(outputBetween.at(-1).id).toBe(4)
    })

    test('Test 2 - find - multiples conditions / with hideInfo', () => {
        const data = generateFakeData(5) as Mock
        sut.addMany(data)
        // Equals
        const outputEquals = sut.find<JestObject>(obj => obj._zid === 1, {
            hideInfo: ['_zid', 'client']
        }) as Mock
        expect(outputEquals.length).toBe(1)
        expect(outputEquals.at(-1)).not.toHaveProperty('_zid')
        expect(outputEquals.at(-1)).not.toHaveProperty('client')
        expect(outputEquals.at(-1).id).toBe(1)

        // Not Equals
        const outputNotEquals = sut.find<JestObject>(obj => obj._zid !== 1, {
            hideInfo: ['_zid']
        }) as Mock
        expect(outputNotEquals.length).toBe(4)
        expect(outputNotEquals.at(-1)).not.toHaveProperty('_zid')
        expect(outputNotEquals.at(-1).id).toBe(5)

        // Like
        const outputLike = sut.find<JestObject>(obj => obj.client.match('2'), {
            hideInfo: ['_zid']
        }) as Mock
        expect(outputLike.length).toBe(1)
        expect(outputLike.at(-1)).not.toHaveProperty('_zid')
        expect(outputLike.at(-1).id).toBe(2)

        // Not Like
        const outputNotLike = sut.find<JestObject>(obj => !obj.client.match('2'), {
            hideInfo: ['_zid']
        }) as Mock
        expect(outputNotLike.length).toBe(4)
        expect(outputNotLike.at(-1)).not.toHaveProperty('_zid')
        expect(outputNotLike.at(-1).id).toBe(5)

        // Higher Than
        const outputHigherThan = sut.find<JestObject>(obj => obj.id > 3, {
            hideInfo: ['_zid']
        }) as Mock
        expect(outputHigherThan.length).toBe(2)
        expect(outputHigherThan.at(-1)).not.toHaveProperty('_zid')
        expect(outputHigherThan.at(-1).id).toBe(5)

        // Less Than
        const outputLessThan = sut.find<JestObject>(obj => obj.id < 3, {
            hideInfo: ['_zid']
        }) as Mock
        expect(outputLessThan.length).toBe(2)
        expect(outputLessThan.at(-1)).not.toHaveProperty('_zid')
        expect(outputLessThan.at(-1).id).toBe(2)
        
        // Between
        const outputBetween = sut.find<JestObject>(obj => obj.id >= 3 && obj.id <= 4, {
            hideInfo: ['_zid', 'sut', 'client']
        }) as Mock
        expect(outputBetween.length).toBe(2)
        expect(outputBetween.at(-1)).not.toHaveProperty('_zid')
        expect(outputBetween.at(-1)).not.toHaveProperty('client')
        expect(outputBetween.at(-1)).not.toHaveProperty('sut')
        expect(outputBetween.at(-1).id).toBe(4)
    })
})
