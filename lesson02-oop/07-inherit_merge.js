/**
 * Created by hjb2722404 on 2016/3/2.
 */

//组合继承：

/*
综合两种继承方式的优点，过滤掉缺点
缺点：父类构造函数执行了两遍
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
var instance2 = new SubClass("css",2013);
console.log(instance1.books); // [ 'java', 'html', 'css', 'js partern' ]  
console.log(instance2.books);//[ 'java', 'html', 'css' ] 由于使用了构造函数继承，利用this复制了共有属性，所以引用类型的修改不会影响其他实例
instance1.getName(); //js //继承了父类原型上的方法
instance1.getTime(); // 2014 // 子类自己原型上的方法，实例借以访问自身的属性
instance2.getName(); //css
instance2.getTime(); // 2013