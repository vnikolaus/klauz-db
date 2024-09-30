import { KlauzDB } from "./Klauz"
import { KzObject } from "./Types"

function generateFakeData(qty: number): Mock[] {
    let i = 1
    const output = []
    while (i <= qty) {
        const obj = {
            name: `Client_${i}`,
            permissions: {
                admin: true
            },
        }
        output.push(obj)
        i++
    }
    return output
}

(() => {
    type Objeto = { name: string, permissions: { admin: boolean } }

    const kz = new KlauzDB({
        path: './src/pasta'
    })
    const collection = kz.createCollection('teste')

    // const output = collection.add({
    //     name: "User manual",
    //     admin: false,
    // })
    // console.log("output: ", output);

    // const fakeData = generateFakeData(10)
    // const output = collection.addMany(fakeData)

    // const newData = collection.update<Objeto>(obj => obj._zid === 1, {
    //     name: 'Client_1_1' 
    // })
    // console.log("newData: ", newData);

    // collection.delete<Objeto>(obj => obj._zid > 9)
    // collection.reset()

    const data = collection.find<Objeto>(obj => obj.permissions.admin === true, {
        // hideInfo: ['_zid']
    })
    console.log("data: ", data);

    // const allData = collection.findAll({
    //     // hideInfo: ['permissions'],
    // })
    // console.log("allData: ", allData);


    // const info = collection.information
    // console.log("info: ", info);
})()