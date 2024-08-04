import { KlauzDB } from "./Klauz"

(() => {
    const kz = new KlauzDB({
        path: './src/'
    })
    const collection = kz.createCollection('teste')

    // const output = collection.add({
    //     nome: 'tst',
    //     descricao: 'Objeto teste'
    // })
    // console.log("output: ", output);

    // const output = collection.addMany([
    //     {
    //         nome: 'teste 1',
    //         descricao: 'Objeto teste 1'
    //     },
    //     {
    //         nome: 'teste 2',
    //         descricao: 'Objeto teste 2'
    //     }
    // ])
    // console.log("output: ", output);

    const allData = collection.findAll()
    console.log("allData: ", allData);
})()