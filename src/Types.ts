import { Collection } from "./Collection"

type UUID = `${string}-${string}-${string}-${string}-${string}`
export type ObjectId = UUID
type ErrorPayload = {
    error: string
}
export type Output<T> = T | ErrorPayload

export type Operators = 'equals' | 'not_equals' | 'like' | 'not_like' | 'bigger_than' | 'less_than'
export enum eOperators {
    equals = 'equals' ,
    not_equals = 'not_equals',
    like = 'like',
    not_like = 'not_like',
    bigger_than = 'bigger_than',
    less_than = 'less_than',
}

export type CollectionProps = {
    path: string
    name: string
}

export type CollectionContent = {
    collection_name: string,
    created_at: string,
    last_interaction: string,
    data: Array<CollectionDataWithObjectId>
}

export type CollectionData = Record<string, any>
export type CollectionDataWithObjectId = { 
    [K in keyof CollectionData]: CollectionData[K] 
} & { _ObjectId?: ObjectId }

export type KlauzProps = {
    path: string
}

