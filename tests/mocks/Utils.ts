export type Mock = any

export type JestObject = {
    id: number,
    client: string,
    sut: boolean
}

export const REGEX_UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/

function generateFakeData(qty: number): Mock[] {
    let i = 1
    const output = []
    while (i <= qty) {
        const obj = {
            id: i,
            client: `Jest_${i}`,
            sut: true,
        }
        output.push(obj)
        i++
    }
    return output
}

export { generateFakeData }