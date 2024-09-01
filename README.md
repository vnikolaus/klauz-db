<!-- # KlauzDB [![NPM version](https://img.shields.io/npm/v/klauz-db.svg?style=flat-square)](https://www.npmjs.com/package/klauz-db) -->
# KlauzDB [![NPM version]]

KlauzDB é um banco de dados orientando a "collections", que utiliza o armazenamento local da máquina para persistir os dados, seguindo sua proposta de ser rápido e de fácil utilização. (*não requer nenhuma conexão externa ou afins*)

Ideal para testes automatizados, vídeo-aulas ou aplicações com um grau menor de complexidade.


* [🌱 Instalação](#-Instalação)
* [🏗️ Usage (.env)](#%EF%B8%8F-usage)
* [📖 Docs](#-documentation)
<!-- * [📚 Examples](#-examples) -->
<!-- * [❓ FAQ](#-faq) -->
<!-- * [⏱️ Changelog](./CHANGELOG.md) -->

## 🌱 Instalação

```bash
# instalação local (recomendado)
npm install klauz-db --save
```

Instalação via yarn: `yarn add klauz-db`

## 🏗️ Usage

No começo da sua aplicação, importe o pacote "klauz-db" e defina o path principal para suas collections:

```javascript
const { KlauzDB } = require('klauz-db')

const kz = new KlauzDB({
    path: '{seu_path}'
})
```

.. or using ES6?

```javascript
import { KlauzDB } from 'klauz-db'

const kz = new KlauzDB({
    path: '{seu_path}'
})
```

Feito isso, você já pode criar suas coleções e utilizar as funcões do KlauzDB !

## 📖 Documentation

KlauzDB expõe apenas uma função:

* `createCollection`

### createCollection

`createCollection` cria uma nova *collection*, com base no nome passado na função, retornando sua própria instância.

```js
const kz = new KlauzDB({
    path: './'
})

const collection = kz.createCollection('coll-teste')

console.log(collection.information)

// Resultado:
    {
    "collection_name": "coll-teste",
    "created_at": "2024-08-25T22:41:57.416Z",
    "last_interaction": "2024-08-25:41:57.416Z",
    }
//
```

Com sua collection criada agora você já tem acesso a todas as funções de banco de dados:

### add

`add` adiciona um novo objeto (*chave-valor*) dentro da collection.

```js
const output = collection.add({
    nome: 'Victor',
    idade: 28,
    admin: true
})
console.log("output: ", output);

// Resultado:
    {
    "data": [
        {
            "nome": 'Victor',
            "idade": 28,
            "admin": true,
            "_zid_": '85136b83-eb3a-4673-a502-f59b337f8f6a'
        }
    ]
    }
//
```

### addMany

`addMany` adiciona um novo array de objetos (*chave-valor*) dentro da collection.

```js
const output = collection.addMany([
    {
        nome: 'teste 1',
        descricao: 'Objeto teste 1'
    },
    {
        nome: 'teste 2',
        descricao: 'Objeto teste 2'
    }
])
console.log("output: ", output);

// Resultado:
    {
    "data": [
        {
            "nome": 'teste 1',
            "descricao": 'Objeto teste 1',
            "_ObjectId": '8a636bd6-48d8-479b-8bf4-24146867a692'
        },
        {
            "nome": 'teste 2',
            "descricao": 'Objeto teste 2',
            "_ObjectId": 'a71dbb58-b529-419b-a21d-030b3201a948'
        }
    ]
    }
//
```




