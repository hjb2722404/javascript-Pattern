/**
 * Created by hjb2722404 on 2016/3/2.
 */

//组合继承：

/*
综合两种继承方式的有点，过滤掉缺点
缺点：

父类构造函数执行了两遍
* */


//声明父类
function SuperClass(name){
    //值类型共有属性
    this.name = name;

    //引用类型共有属性
    this.books = ['java','html','css'];
}

//父类声明原型方法
SuperClass.prototype.getName = function(){
  console.log(this.name);
};

//声明子类
function SubClass(name,time){
    //构造函数式继承父类name属性
   SuperClass.call(this,name); //执行了一遍父类构造函数

    //子类中新增共有属性
    this.time = time;
}

//类式继承 子类原型继承父类
SubClass.prototype = new SuperClass();  //又执行了一遍父类构造函数

//为子类添加共有方法
SubClass.prototype.getTime = function () {
    console.log(this.time);
};

//创建第一个子类实例

var instance1 = new SubClass('js',2014);

instance1.books.push('js partern');

console.log(instance1.books);

instance1.getName();
instance1.getTime();

var instance2 = new SubClass("css",2013);
console.log(instance2.books);
instance2.getName();
instance2.getTime();