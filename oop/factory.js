/**
 * Created by hjb2722404 on 2016/3/3.
 */

//工厂模式创建对象

function createPerson(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    };
    return o;
}
//createPerson.prototype.sayJob = function(){
//    console.log(this.job);
//};
var p1 = createPerson('p1',11,'aa');
var p2 = createPerson('p2', 22, 'bb');

//console.log(p1);
//console.log(p2);
//
//console.log(typeof p2);

//p1.sayName();
//console.log(p1.__proto__); //{}
//console.log(p1.__proto__.__proto__); //null
//console.log(p1.prototype);// undefined
//console.log(p1.constructor); // [Function:Object]
//console.log(createPerson.prototype); // createPerson {}
//console.log(createPerson.prototype.constructor); //[Function : createPerson]
//console.log(p1.constructor == createPerson); //false

console.log(p1 instanceof createPerson);

console.log(p2 instanceof Object);