import { Collection } from '../src/Collection';
import { KlauzDB } from '../src/Klauz';
import { CollectionDataWithObjectId } from '../src/Types';
import { generateData } from './mocks/Utils';

console.log(`|||  START   |||\n`);

let sucessTests = 0, errorTests = 0;

(() => {
    console.log('Test-error - Method: add()');
    const kz = new KlauzDB({ path: 'tests/.data-test' })
    const sut = kz.createCollection('add-errors') as Collection
    let i = 0, k = 0
    const t1 = sut.add('123')
    const t2 = sut.add(123)
    const t3 = sut.add(true)
    const t4 = sut.add(false)
    const t5 = sut.add([])
    const t6 = sut.add()
    'error' in t1 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error - ⛔`)
    'error' in t2 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error - ⛔`)
    'error' in t3 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error - ⛔`)
    'error' in t4 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error - ⛔`)
    'error' in t5 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error - ⛔`)
    'error' in t6 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error - ⛔`)
    console.log();
    sut.drop()
    sucessTests += i; errorTests += k;
})();

(() => {
    console.log('Test-error - Method: addMany()');
    const kz = new KlauzDB({ path: 'tests/.data-test' })
    const sut = kz.createCollection('addMany-errors') as Collection
    let i = 0, k = 0
    const t1 = sut.addMany({ key: 'ok' })
    const t2 = sut.addMany('123')
    const t3 = sut.addMany(123)
    const t4 = sut.addMany(true)
    const t5 = sut.addMany(['123'])
    const t6 = sut.addMany([123])
    const t7 = sut.addMany()
    'error' in t1 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t2 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t3 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t4 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t5 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t6 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t7 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    console.log();
    sut.drop()
    sucessTests += i; errorTests += k;
})();

(() => {
    console.log('Test-error - Method: findWhere()');
    const kz = new KlauzDB({ path: 'tests/.data-test' })
    const sut = kz.createCollection('findWhere-errors') as Collection
    const data = generateData(5)
    sut.addMany(data)
    let i = 0, k = 0
    const t1 = sut.findWhere()
    const t2 = sut.findWhere('', 'equals', 1)
    const t3 = sut.findWhere('id', 'equal', 1)
    const t4 = sut.findWhere({ id: 1 })
    const t5 = sut.findWhere('idz', 'equals', 1)
    const t6 = sut.findWhere(true)
    'error' in t1 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t2 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t3 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t4 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t5 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t6 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    console.log();
    sut.drop()
    sucessTests += i; errorTests += k;
})();

(() => {
    console.log('Test-error - Method: update()');
    const kz = new KlauzDB({ path: 'tests/.data-test' })
    const sut = kz.createCollection('update-errors') as Collection
    const data = generateData(5)
    const objs = sut.addMany(data) as CollectionDataWithObjectId[]
    let i = 0, k = 0
    const t1 = sut.update()
    const t2 = sut.update(1, { id: 2 })
    const t3 = sut.update('01', { id: 2 })
    const t4 = sut.update('x-x-x-x-x', { id: 99 })
    const t5 = sut.update('xxxxx-xxxxxxx-xxxxx-xxxxxxxxx-xxxxxxx', { id: 99 })
    const t6 = sut.update(objs[0]._ObjectId, '123')
    const t7 = sut.update(objs[0]._ObjectId, 123)
    const t8 = sut.update(objs[0]._ObjectId, true)
    'error' in t1 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t2 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t3 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t4 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t5 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t6 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t7 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t8 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    console.log();
    sut.drop()
    sucessTests += i; errorTests += k;
})();

(() => {
    console.log('Test-error - Method: updateMany()');
    const kz = new KlauzDB({ path: 'tests/.data-test' })
    const sut = kz.createCollection('updateMany-errors') as Collection
    const data = generateData(5)
    const objs = sut.addMany(data) as CollectionDataWithObjectId[]
    let i = 0, k = 0
    const t1 = sut.updateMany()
    const t2 = sut.updateMany([1,2,3], { fake_id: 99 })
    const t3 = sut.updateMany(['1','2','3'], { fake_id: 99 })
    const t4 = sut.updateMany(1, { fake_id: 99 })
    const t5 = sut.updateMany(objs[0]._ObjectId, { fake_id: 99 })
    const t6 = sut.updateMany([{}], { fake_id: 99 })
    const t7 = sut.updateMany([{ idz: 1 }], { fake_id: 99 })
    const t8 = sut.updateMany(true, { fake_id: 99 })
    'error' in t1 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t2 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t3 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t4 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t5 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t6 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t7 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t8 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    console.log();
    sut.drop()
    sucessTests += i; errorTests += k;
})();

(() => {
    console.log('Test-error - Method: delete()');
    const kz = new KlauzDB({ path: 'tests/.data-test' })
    const sut = kz.createCollection('delete-errors') as Collection
    let i = 0, k = 0
    const t1 = sut.delete()
    const t2 = sut.delete(1)
    const t3 = sut.delete('1')
    const t4 = sut.delete('x-x-x-x-x')
    const t5 = sut.delete('xxxxx-xxxxxxx-xxxxx-xxxxxxxxx-xxxxxxx')
    const t6 = sut.delete(true)
    const t7 = sut.delete(undefined)
    'error' in t1 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t2 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t3 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t4 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t5 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t6 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t7 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    console.log();
    sut.drop()
    sucessTests += i; errorTests += k;
})();

(() => {
    console.log('Test-error - Method: deleteMany()');
    const kz = new KlauzDB({ path: 'tests/.data-test' })
    const sut = kz.createCollection('deleteMany-errors') as Collection
    const data = generateData(3)
    const objs = sut.addMany(data) as CollectionDataWithObjectId[]
    let i = 0, k = 0
    const t1 = sut.deleteMany()
    const t2 = sut.deleteMany([1,2,3])
    const t3 = sut.deleteMany(['1','2','3'])
    const t4 = sut.deleteMany(1)
    const t5 = sut.deleteMany(objs[0]._ObjectId)
    const t6 = sut.deleteMany([{}])
    const t7 = sut.deleteMany([{ idz: 1 }])
    const t8 = sut.deleteMany(true)
    'error' in t1 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t2 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t3 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t4 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t5 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t6 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t7 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    'error' in t8 ? console.log(`${++i} - OK ✅`) : console.log(`${++k} - Error ⛔`)
    console.log();
    sut.drop()
    sucessTests += i; errorTests += k;
})();

console.log('TESTS COMPLETE:');
console.log(`total: ${sucessTests + errorTests}`);
console.log(`✅ passed: ${sucessTests}`);
console.log(`⛔ fail: ${errorTests}`);
