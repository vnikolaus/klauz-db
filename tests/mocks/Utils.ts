export type Mock = any

export const REGEX_UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/

function generateData(qty: number): Mock[] {
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

export { generateData }