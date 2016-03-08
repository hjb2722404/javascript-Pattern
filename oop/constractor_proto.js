/**
 * Created by hjb2722404 on 2016/3/3.
 */

//构造函数创建对象--引用类型实例化过程移到全局作用域中

/*
* 问题：共享引用类型，导致修改其中一个对象的值会改变其他的,值类型不存在该问题
* */
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;

    Person.prototype.sayName = function(){
      console.log(this.name);
    };

    Person.prototype.family = ['dad','mom','bro'];
    Person.prototype.haha = 'hehe';
}


var p1 = new Person("aa" , 11,"bb");
var p2 = new Person("cc", 22, "dd");

//console.log(p1);
//console.log(p2);

//console.log(Person.prototype); // Person {}

//console.log(Person.prototype.constructor); //[Function: Person]

//console.log(p1.__proto__); // Person {}

//console.log(p2.__proto__); // Person {}

Person.prototype.h = 185;

//console.log(Person.prototype.h); //185

//console.log(p1.h); // 185

//console.log(p1 instanceof Person); //true

//console.log(p1.sayName === p2.sayName);

console.log(p1.family);
console.log(p2.family);
p1.family.push('sis');
console.log(p1.family);
console.log(p2.family);
console.log(Person.prototype.family);

//console.log(p1.haha);
//console.log(p2.haha);
//p1.haha = 'xixi';
//console.log(p1.haha);
//console.log(p2.haha);
//console.log(Person.prototype.haha);