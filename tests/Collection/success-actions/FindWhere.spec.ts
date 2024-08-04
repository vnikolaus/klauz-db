import { afterAll, afterEach, beforeAll, describe, expect, test } from '@jest/globals'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateData, Mock, REGEX_UUID } from '../../mocks/Utils'

const skipTest = (process.env.SKIP_FINDWHERE_TEST == 'true')
const runTest = skipTest ? describe.skip : describe

runTest('Method: FINDWHERE | sucess-actions', () => {
    const path = 'tests/.data-test'
    const collectionName = 'findWhere-test'
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

    test('Test 1 - findWhere - equals', () => {
        const data = generateData(5) as Mock
        sut.addMany(data)
        const [obj_1] = sut.findWhere('id', 'equals', 1) as Mock
        const [obj_3] = sut.findWhere('id', 'equals', 3) as Mock
        const [obj_5] = sut.findWhere('id', 'equals', 5) as Mock
        expect(obj_1.client).toBe('Jest_1')
        expect(obj_3.client).toBe('Jest_3')
        expect(obj_5.client).toBe('Jest_5')
    })

    test('Test 2 - findWhere - not_equals', () => {
        const data = generateData(5) as Mock
        sut.addMany(data)
        const res_1 = sut.findWhere('id', 'not_equals', 1) as Mock
        const res_2 = sut.findWhere('id', 'not_equals', 5) as Mock
        expect(res_1.length).toBe(4)
        expect(res_1.at(0).id).toBe(2)
        expect(res_1.at(0).client).toBe('Jest_2')
        expect(res_2.length).toBe(4)
        expect(res_2.at(-1).id).toBe(4)
        expect(res_2.at(-1).client).toBe('Jest_4')
    })

    test('Test 3 - findWhere - like', () => {
        const data = generateData(10) as Mock
        sut.addMany(data)
        const res_1 = sut.findWhere('id', 'like', 1) as Mock
        const [obj_4] = sut.findWhere('id', 'like', 4) as Mock
        const [obj_6] = sut.findWhere('id', 'like', 6) as Mock
        const [obj_8] = sut.findWhere('id', 'like', 8) as Mock
        expect(res_1.length).toBe(2)
        expect(res_1.at(0).client).toBe('Jest_1')
        expect(res_1.at(-1).client).toBe('Jest_10')
        expect(obj_4.client).toBe('Jest_4')
        expect(obj_6.client).toBe('Jest_6')
        expect(obj_8.client).toBe('Jest_8')
    })

    test('Test 4 - findWhere - not_like', () => {
        const data = generateData(10) as Mock
        sut.addMany(data)
        const res_1 = sut.findWhere('id', 'not_like', 5) as Mock
        const res_2 = sut.findWhere('id', 'not_like', 1) as Mock
        expect(res_1.length).toBe(9)
        expect(res_1.at(0).client).toBe('Jest_1')
        expect(res_2.length).toBe(8) // exclude id: 1 and id: 10
        expect(res_2.at(0).client).toBe('Jest_2')
        expect(res_2.at(-1).client).toBe('Jest_9')
    })

    test('Test 5 - findWhere - bigger_than', () => {
        const data = generateData(20) as Mock
        sut.addMany(data)
        const res_1 = sut.findWhere('id', 'bigger_than', 5) as Mock
        const res_2 = sut.findWhere('id', 'bigger_than', 7) as Mock
        const res_3 = sut.findWhere('id', 'bigger_than', 10) as Mock
        expect(res_1.length).toBe(15)
        expect(res_1.at(0).client).toBe('Jest_6')
        expect(res_2.length).toBe(13)
        expect(res_2.at(0).client).toBe('Jest_8')
        expect(res_3.length).toBe(10)
        expect(res_3.at(0).client).toBe('Jest_11')
    })

    test('Test 6 - findWhere - less_than', () => {
        const data = generateData(20) as Mock
        sut.addMany(data)
        const res_1 = sut.findWhere('id', 'less_than', 15) as Mock
        const res_2 = sut.findWhere('id', 'less_than', 10) as Mock
        const res_3 = sut.findWhere('id', 'less_than', 7) as Mock
        expect(res_1.length).toBe(14)
        expect(res_1.at(-1).client).toBe('Jest_14')
        expect(res_2.length).toBe(9)
        expect(res_2.at(-1).client).toBe('Jest_9')
        expect(res_3.length).toBe(6)
        expect(res_3.at(-1).client).toBe('Jest_6')
    })
})
