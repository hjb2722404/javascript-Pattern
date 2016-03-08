/**
 * Created by hjb2722404 on 2016/3/2.
 */

//构造函数继承：利用call来更改子类执行环境为父类，利用绑定的this，子类继承了父类的共有属性。

/*
缺点：1.使用此种方法，继承没有涉及子类的原型，所以父类的原型方法自然不会被子类继承。
        2.如果想被子类继承就必须要放在构造函数中
        3.每个实例都会单独拥有一份，不能共有，违背了代码复用原则。
* */


//声明父类
function SuperClass(id){
    //值类型共有属性
    this.id= id;

    //引用类型共有属性
    this.books = ['java','html','css'];
}

//父类声明原型方法
SuperClass.prototype.showBooks = function(){
  console.log(this.books);
};

//声明子类
function SubClass(id){
   SuperClass.call(this,id);
}

//继承父类
//SubClass.prototype = new SuperClass();

//为子类添加共有方法
//SubClass.prototype.getSubValue = function () {
//    return this.subValue;
//};

//创建第一个子类实例
var instance = new SubClass(10);
//console.log(instance.getSuperValue());
//console.log(instance.getSubValue());
//console.log(instance.prototype instanceof SuperClass);
//创建第二个子类实例
var instance2 = new SubClass(11);

console.log(instance2.books);
instance.books.push('hehe');
console.log(instance2.books);
console.log(instance2.id);
console.log(instance.books);
console.log(instance.id);

//instance.showBooks(); //错误，无法继承父类原型上的方法，只能继承构造函数里的属性和方法