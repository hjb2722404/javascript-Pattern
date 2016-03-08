/**
 * Created by hjb2722404 on 2016/3/2.
 */

//类式继承：将父类的实例赋值给子类的原型

/*
*
* 缺点：1.如果父类中的共有属性是引用类型，则子类的一个实例更改该继承过来的共有属性，就会直接影响到其他子类实例
*       2.实例化父类时无法对父类构造函数进行初始化。
* */


//声明父类
function SuperClass(){
    this.superValue = true;
    this.books = ['java','html','css'];
}

//为父类添加共有方法
//SuperClass.prototype.getSuperValue = function(){
//  return this.superValue;
//};

//声明子类
function SubClass(){
    this.subValue = false;

}

//继承父类
SubClass.prototype = new SuperClass();

//为子类添加共有方法
//SubClass.prototype.getSubValue = function () {
//    return this.subValue;
//};

var instance = new SubClass();
//console.log(instance.getSuperValue());
//console.log(instance.getSubValue());
//console.log(instance.prototype instanceof SuperClass);
var instance2 = new SubClass();

console.log(instance2.books);
instance.books.push('hehe');
console.log(instance2.books);