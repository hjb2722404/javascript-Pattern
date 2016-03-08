/**
 * Created by hjb2722404 on 2016/3/3.
 */

//构造函数创建对象--引用类型实例化过程移到全局作用域中

/*
* 问题：如果对象需要定义很多引用类型的函数，会在全局作用域添加很多函数，对象没有了封装性
* */
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

 function sayName (){
     console.log(this.name);
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