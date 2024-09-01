// type UUID = `${string}-${string}-${string}-${string}-${string}`
export type ZID = number

// Functions
type ErrorPayload = { error: string }
export type Output<T> = T | ErrorPayload

export type KzObject<T> = T & { _zid: ZID }

export type Callback<T> = (obj: T) => any

// export enum eZID {
//     uuid = 'uuid',
//     numeric = 'numeric',
// }
// export type ZidTypes = 'uuid' | 'numeric'

// export type AddOptions = {
//     zidType?: ZidTypes,
// }

export type FindOptions = {
    hideInfo?: Array<string>
}

// Klauz & Collection
export type CollectionProps = {
    path: string
    name: string
}

export type CollectionContent = {
    collection_name: string,
    created_at: string,
    last_interaction: string,
    data: Array<CollectionDataWithZID>
}

export type CollectionData = Record<string, any>
export type CollectionDataWithZID = { 
    [K in keyof CollectionData]: CollectionData[K] 
} & { _zid?: ZID }

export type KlauzProps = {
    path: string
}