/**
 * Created by hjb2722404 on 2016/3/3.
 */

//构造函数创建对象
/*
* 问题：每实例化一个对象，sayName函数就会实例化一次，造成浪费
* */
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    }
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

console.log(p1.sayName === p2.sayName);