import { randomUUID as uuid } from "crypto";
import { accessSync, constants, readFileSync, unlinkSync, writeFileSync } from "fs";
import z from 'zod';
import { errorMessage } from "./Error";
import {
    CollectionContent,
    CollectionData,
    CollectionDataWithObjectId,
    CollectionProps,
    eOperators,
    ObjectId,
    Operators,
    Output
} from "./Types";

export class Collection {
    readonly #name: string
    readonly #path: string
    #content = {} as CollectionContent

    constructor(private readonly props: CollectionProps) {
        const fileExtension = '.json'
        const { path, name } = props
        this.#name = name
        this.#path = `${path}/.${name}${fileExtension}`
        this.#load()
    }

    #load(): void {
        try {
            accessSync(this.#path, constants.F_OK)
            const readedContent = readFileSync(this.#path, {
                encoding: 'utf-8'
            })
            this.#content = JSON.parse(readedContent)
        } catch (err) {
            const content: CollectionContent = {
                collection_name: this.#name,
                created_at: new Date().toISOString(),
                last_interaction: new Date().toISOString(),
                data: []
            }
            this.#content = content
        } finally {
            this.#save(this.#content)
        }
    }

    #save(content: CollectionContent): void {
        writeFileSync(this.#path, JSON.stringify(content, null, 2))
    }

    #setCollectionDataValue(data: CollectionDataWithObjectId): void {
        this.#load()
        this.#content.last_interaction = new Date().toISOString()
        this.#content.data.push(data)
        this.#save(this.#content)
    }

    #setCollectionData(data: CollectionDataWithObjectId[]): void {
        this.#load()
        this.#content.last_interaction = new Date().toISOString()
        this.#content.data = data
        this.#save(this.#content)
    }

    #getCollectionData(): CollectionDataWithObjectId[] {
        this.#load()
        return this.#content.data
    }

    get name() {
        return this.#name
    }

    get content() {
        return this.#content
    }

    findAll(): CollectionDataWithObjectId[] {
        const collectionData = this.#getCollectionData()
        return collectionData
    }

    findWhere(key: string, operator: Operators, value: any): Output<CollectionDataWithObjectId[]> {
        try {
            let output = [] as CollectionDataWithObjectId[]
            if (!eOperators[operator]) throw Error('Invalid operator')
            const zKey = z.string().min(1).parse(key)
            const collectionData = this.#getCollectionData()
            switch (operator) {
                case eOperators.equals:
                    output = collectionData.filter(el => el[zKey] === value)
                break;
                case eOperators.not_equals:
                    output = collectionData.filter(el => el[zKey] !== value)
                break;
                case eOperators.like:
                    output = collectionData.filter(el => String(el[zKey]).match(value))
                break;
                case eOperators.not_like:
                    output = collectionData.filter(el => !String(el[zKey]).match(value))
                break;
                case eOperators.bigger_than:
                    output = collectionData.filter(el => el[zKey] > value)
                break;
                case eOperators.less_than:
                    output = collectionData.filter(el => el[zKey] < value)
                break;
            }
            if (output.length === 0) throw Error('Registers not found')
            return output
        } catch (err) {
            return errorMessage(err)
        }
        
    }

    add(data: CollectionData): Output<CollectionDataWithObjectId> {
        try {
            let obj = {} as CollectionDataWithObjectId
            const schema = z.record(z.string(), z.any(), { message: `Content must be a object. Use 'addMany' method, to insert a new array` })
            obj = schema.parse(data) as CollectionDataWithObjectId
            Reflect.set(obj, '_ObjectId', uuid())
            this.#setCollectionDataValue(obj)
            return obj
        } catch (err) {
            return errorMessage(err)
        }
    }

    addMany(data: CollectionData[]): Output<CollectionDataWithObjectId[]> {
        try {
            let objs: CollectionDataWithObjectId[] = []
            const schemaArray = z.array(z.record(z.string(), z.any()))
            const schemaObject = z.record(z.string(), z.any())
            objs = schemaArray.parse(data)
            for (const obj of objs) {
                schemaObject.parse(obj)
                Reflect.set(obj, '_ObjectId', uuid())
                this.#setCollectionDataValue(obj)
            }
            return objs
        } catch (err) {
            return errorMessage(err)
        }
    }

    update(objectId: ObjectId, value: CollectionData): Output<void> {
        try {
            const zObjectId = z.string().uuid().parse(objectId)
            const zValue = z.record(z.string(), z.any()).parse(value)
            const collectionData = this.#getCollectionData()
            const updatedData = collectionData.map(el => {
                if (el._ObjectId === zObjectId) {
                    const tempId = el._ObjectId
                    Reflect.deleteProperty(el, '_ObjectId')
                    el = {
                        ...el,
                        ...zValue,
                        _ObjectId: tempId
                    }
                }
                return el
            }) as CollectionDataWithObjectId[]
            this.#setCollectionData(updatedData)
        } catch (err) {
            return errorMessage(err)
        }
    }

    updateMany(elements: CollectionDataWithObjectId[], value: CollectionData): Output<void> {
        try {
            const schemaArray = z.array(z.record(z.string(), z.any()))
            const schemaObject = z.record(z.string(), z.any())
            const zValue = schemaObject.parse(value)
            const array = schemaArray.parse(elements) as CollectionDataWithObjectId[]
            const updatedIds: Array<string> = []
            for (const obj of array) {
                const zObj = schemaObject.parse(obj) as CollectionDataWithObjectId
                zObj._ObjectId && updatedIds.push(zObj._ObjectId)
            }
            if (updatedIds.length === 0) throw Error('Ids not found')
            const collectionData = this.#getCollectionData()
            const updatedData = collectionData.map(el => {
                if (el._ObjectId && updatedIds.includes(el._ObjectId)) {
                    const tempId = el._ObjectId
                    Reflect.deleteProperty(el, '_ObjectId')
                    el = {
                        ...el,
                        ...zValue,
                        _ObjectId: tempId
                    }
                }
                return el
            }) as CollectionDataWithObjectId[]
            this.#setCollectionData(updatedData)
        } catch (err) {
            return errorMessage(err)
        }
    }

    delete(objectId: ObjectId): Output<void> {
        try {
            const zObjectId = z.string().uuid().parse(objectId)
            this.findWhere('_ObjectId', 'equals', zObjectId)
            const collectionData = this.#getCollectionData()
            const collectionDataAfterDeletion = collectionData.filter(obj => obj._ObjectId !== zObjectId)
            this.#setCollectionData(collectionDataAfterDeletion)
        } catch (err) {
            return errorMessage(err)
        }
    }

    deleteMany(elements: CollectionDataWithObjectId[]): Output<void> {
        try {
            const schemaArray = z.array(z.record(z.string(), z.any()))
            const schemaObject = z.record(z.string(), z.any())
            const array = schemaArray.parse(elements) as CollectionDataWithObjectId[]
            const deletedIds: Array<string> = []
            for (const obj of array) {
                const zObj = schemaObject.parse(obj) as CollectionDataWithObjectId
                if (zObj._ObjectId) deletedIds.push(zObj._ObjectId)
            }
            if (deletedIds.length === 0) throw Error('Ids not found')
            const collectionData = this.#getCollectionData()
            const collectionDataAfterDeletion = collectionData.filter(obj => obj._ObjectId && !deletedIds.includes(obj._ObjectId))
            this.#setCollectionData(collectionDataAfterDeletion)
        } catch (err) {
            return errorMessage(err)
        }
    }

    reset(): Output<void> {
        try {
            this.#load()
            const arr = [] as CollectionDataWithObjectId[]
            this.#setCollectionData(arr)
        } catch (err) {
            return errorMessage(err)
        }
    }

    drop(): void {
        unlinkSync(this.#path)
    }
}