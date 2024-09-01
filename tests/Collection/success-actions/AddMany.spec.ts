import { afterAll, afterEach, beforeAll, describe, expect, test } from '@jest/globals'
import { randomInt } from 'crypto'
import { Collection } from '../../../src/Collection'
import { KlauzDB } from '../../../src/Klauz'
import { generateFakeData, Mock } from '../../mocks/Utils'

const skipTest = (process.env.SKIP_ADDMANY_TEST == 'true')
const runTest = skipTest ? describe.skip : describe

runTest('Method: ADDMANY | sucess-actions', () => {
    const path = 'tests/.data-test'
    const collectionName = 'addMany-test'
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

    test('Test 1 - addMany 10x', () => {
        const objs = 10
        const collectionData = sut.findAll() as Mock
        expect(collectionData.length).toBe(0)
        const mockData = generateFakeData(objs) as Mock
        const addedData = sut.addMany(mockData) as Mock
        const r = randomInt(objs)
        expect(addedData.length).toBe(objs)
        expect(typeof addedData[r]._zid).toBe('number')
        const collectionDataPostAddMany = sut.findAll() as Mock
        expect(collectionDataPostAddMany.length).toBe(objs)
    })

    test('Test 2 - addMany 50x', () => {
        const objs = 50
        const collectionData = sut.findAll() as Mock
        expect(collectionData.length).toBe(0)
        const mockData = generateFakeData(objs) as Mock
        const addedData = sut.addMany(mockData) as Mock
        const r = randomInt(objs)
        expect(addedData.length).toBe(objs)
        expect(typeof addedData[r]._zid).toBe('number')
        const collectionDataPostAddMany = sut.findAll() as Mock
        expect(collectionDataPostAddMany.length).toBe(objs)
    })

    test('Test 3 - addMany 100x', () => {
        const objs = 100
        const collectionData = sut.findAll() as Mock
        expect(collectionData.length).toBe(0)
        const mockData = generateFakeData(objs) as Mock
        const addedData = sut.addMany(mockData) as Mock
        const r = randomInt(objs)
        expect(addedData.length).toBe(objs)
        expect(typeof addedData[r]._zid).toBe('number')
        const collectionDataPostAddMany = sut.findAll() as Mock
        expect(collectionDataPostAddMany.length).toBe(objs)
    })

    test('Test 4 - addMany 500x', () => {
        const objs = 500
        const collectionData = sut.findAll() as Mock
        expect(collectionData.length).toBe(0)
        const mockData = generateFakeData(objs) as Mock
        const addedData = sut.addMany(mockData) as Mock
        const r = randomInt(objs)
        expect(addedData.length).toBe(objs)
        expect(typeof addedData[r]._zid).toBe('number')
        const collectionDataPostAddMany = sut.findAll() as Mock
        expect(collectionDataPostAddMany.length).toBe(objs)
    })

    test('Test 5 - addMany 1000x', () => {
        const objs = 1000
        const collectionData = sut.findAll() as Mock
        expect(collectionData.length).toBe(0)
        const mockData = generateFakeData(objs) as Mock
        const addedData = sut.addMany(mockData) as Mock
        const r = randomInt(objs)
        expect(addedData.length).toBe(objs)
        expect(typeof addedData[r]._zid).toBe('number')
        const collectionDataPostAddMany = sut.findAll() as Mock
        expect(collectionDataPostAddMany.length).toBe(objs)
    })
})
