<!-- # KlauzDB [![NPM version](https://img.shields.io/npm/v/klauz-db.svg?style=flat-square)](https://www.npmjs.com/package/klauz-db) -->
# KlauzDB [![NPM version]]

KlauzDB é um banco de dados orientando a **Collections**, que tem como proposta ser extremamente simples de se usar e rápido nas operações CRUD, pois utiliza o armazenamento local da máquina para persistir os dados, e não necessita de nenhuma conexão externa para seu funcionamento.

Ideal para testes automatizados, vídeo-aulas ou aplicações com um grau menor de complexidade.
<br>

* [🌱 Instalação](#-Instalação)
* [🏗️ Usabilidade](#%EF%B8%8F-Usabilidade)
* [📖 Docs](#-Documentação)
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

ES6:

```javascript
import { KlauzDB } from 'klauz-db'

const kz = new KlauzDB({
    path: '{db_path}'
})
```

Feito isso, você já pode criar suas Collections.
<br>

## 📖 Documentação

KlauzDB expõe apenas uma função:

* `createCollection`

### createCollection()
Habilita uma nova instância Collection, e cria seu arquivo json para persistência de dados.

#### Syntax
```js
createCollection(nomeCollection)
```

#### Parâmetros
`nomeCollection: string`<br><br>Nome utilizado para criação de uma nova Collection e seu arquivo de persistência de dados;

#### Retorno
Instância própria da Collection, habilitando acesso as funções de banco de dados;

#### Exemplo
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

Com sua collection criada agora você já tem acesso as seguintes funções de banco de dados:
```js
.add()
.addMany()
.update()
.delete()
.findAll()
.find()
.reset()
```
<br>

### add
Adiciona um novo objeto dentro da collection.

#### Syntax
```js
add(valor)
```

#### Parâmetros
`valor: { key: value }`<br><br>Objeto utilizado para inserir um único registro dentro da Collection;

#### Retorno
Objeto adicionado já com as novas propriedades criadas pelo banco de dados;

#### Exemplo
```js
const output = collection.add({
    nome: 'User_1',
    admin: true
})

console.log("output: ", output);
// Resultado:
    {
        "nome": "User_1",
        "admin": true
        "_zid": 1
    }
//
```
<br>

### addMany
Adiciona um novo array de objetos dentro da collection.

#### Syntax
```js
addMany(valor)
```

#### Parâmetros
`valor: [{ key: value }, { key: value }]`<br><br>Array utilizado para inserir diversos registros dentro da Collection;

#### Retorno
Array de objetos adicionados já com as novas propriedades criadas pelo banco de dados;

#### Exemplo
```js
const output = collection.addMany([
    {
        nome: 'User_1',
        admin: true
    },
    {
        nome: 'User_2',
        admin: false
    }
])

console.log("output: ", output);
// Resultado:
    [
        {
            "nome": "User_1",
            "admin": true,
            "_zid": 1
        },
        {
            "nome": "User_2",
            "admin": false,
            "_zid": 2
        }
    ]
//
```

### update
Altera um ou mais objetos dentro da Collection.

#### Syntax
```js
update(callback, value)
```

#### Parâmetros
`callback: function(obj)`<br><br>Função callback que recebe como parâmetro os objetos contidos na Collection.<br>Seu retorno deve ser os objetos que serão atualizados;<br><br>
`value: { key: value }`<br><br>Valor a ser alterado;

#### Retorno
Array de objetos já com as novas alterações;

#### Exemplo
```js
// Adicionando dados
collection.addMany([
    {
        nome: 'User_1',
        admin: false
    },
    {
        nome: 'User_2',
        admin: false
    }
])


// Alterando dados

// Syntax JavaScript antiga:
const output = collection.update(function(obj) {
    if (obj.nome === 'User_1') {
        return obj
    }
}, { admin: true })


// Syntax JavaScript moderna:
const output = collection.update(obj => obj.nome === 'User_1', { admin: true })


// Syntax Typescript:
// Utiliza Generics para habilitar a tipagem dos objetos, incluindo a propriedade '_zid' como padrão.
type User = { nome: string, admin: boolean }
const output = collection.update<User>(obj => obj._zid === 1, { admin: true })


console.log("output: ", output);
// Em todos os exemplos o output segue o mesmo:
    [
        {
            "nome": "User_1",
            "admin": true,
            "_zid": 1
        },
        {
            "nome": "User_2",
            "admin": false,
            "_zid": 2
        }
    ]
//
```



