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

## 🏗️ Usabilidade

No começo da sua aplicação, importe o pacote "klauz-db" e defina o path principal para suas collections:

```javascript
const { KlauzDB } = require('klauz-db')

const kz = new KlauzDB({
    path: '{db_path}'
})
```

.. or using ES6?

```javascript
import { KlauzDB } from 'klauz-db'

const kz = new KlauzDB({
    path: '{db_path}'
})
```

Feito isso, você já pode criar suas coleções e utilizar as funcões do KlauzDB !

## 📖 Documentation

KlauzDB expõe apenas uma função:

* `createCollection`

### createCollection
    Cria uma nova *collection* de dados.

#### Syntax
```js
createCollection(nomeCollection)
```

##### Parametros
`nomeCollection: string`<br><br>Nome utilizado para criação de uma nova Collection e seu arquivo para persistência de dados;

##### Retorno
Instãncia propria da Collection habilitando acesso as funções de banco de dados;

##### Exemplo
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
        "nome": 'Victor',
        "idade": 28,
        "admin": true,
        "_zid": 1
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
    [
        {
            "nome": 'teste 1',
            "descricao": 'Objeto teste 1',
            "_zid": 1
        },
        {
            "nome": 'teste 2',
            "descricao": 'Objeto teste 2',
            "_zid": 2
        }
    ]
//
```



