# KlauzDB [![NPM version](https://img.shields.io/npm/v/klauz-db.svg?style=flat-square)](https://www.npmjs.com/package/klauz-db)

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

.. [or using ES6?]()

```javascript
import { KlauzDB } from 'klauz-db'

const kz = new KlauzDB({
    path: '{seu_path}'
})
```

É isso. agora você já pode criar suas coleções e utilizar as funcões do KlauzDB !

## 📖 Documentation

KlauzDB expõe apenas uma função:

* `createCollection`

### createCollection

`createCollection` cria uma nova *collection*, com base no nome passado na função, retornando sua própria instância.

```js
const kz = new KlauzDB({
    path: './'
})

const collection = kz.createCollection('teste')

console.log(collection)

// Resultado:
    Collection { props: { name: 'teste', path: './' } }
//

// Coleção criada:
    {
    "collection_name": "teste",
    "created_at": "2024-08-04T22:00:03.950Z",
    "last_interaction": "2024-08-04T22:00:03.956Z",
    "data": []
    }
//
```

Com sua collection criada agora você já tem acesso a todas as funções de banco de dados:

