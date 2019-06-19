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
SuperClass.prototype.getSuperValue = function(){
 return this.superValue;
};

//声明子类
function SubClass(){
    this.subValue = false;
}

//继承父类
SubClass.prototype = new SuperClass();

//为子类添加共有方法
SubClass.prototype.getSubValue = function () {
   return this.subValue;
};

var instance = new SubClass();
console.log(instance.getSuperValue()); // true，子类通过继承获得了父类的方法
console.log(instance.getSubValue()); // false, 子类自己的方法
console.log(instance.prototype instanceof SuperClass); // false 子类实例的原型并不是父类的实例
console.log(SubClass.prototype instanceof SuperClass); // true  子类的原型是父类的实例
var instance2 = new SubClass();

console.log(instance2.books);//[ 'java', 'html', 'css' ] 子类实例继承自父类的属性
instance.books.push('hehe'); 
console.log(instance2.books);//[ 'java', 'html', 'css', 'hehe' ] 
console.log(new SubClass().books);//[ 'java', 'html', 'css', 'hehe' ] 子类实例修改继承自父类的引用类型的属性会影响所有父类的实例