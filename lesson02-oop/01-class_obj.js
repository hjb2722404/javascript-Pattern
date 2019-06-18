/**
 * Created by hjb2722404 on 2016/3/1.
 */

 // 属性与方法封装
 
//私有属性与私有方法，特权方法，对象共有属性和对象共有方法，构造器

var Book = function(id,name,price){
    //私有属性--实例无法访问
    var num = 1;
    var myName;
    var myPrice
 
    //私有方法--实例无法访问
    function checkId(){
        console.log(id);
    }

    //特权方法
    this.getName = function(){
        return myName;
    };
    this.getPrice = function(){
        return myPrice;
    };
    this.getNum = function(){
        return num;
    }
    this.setName = function(newName){
        myName = newName;
        console.log(myName);
    };
    this.setPrice = function(newPrice){
        myPrice = newPrice;
        console.log(myPrice);
    };

    //对象公有属性

    this.id = id;

    //对象公有方法

    this.copy = function(){
        console.log('copy');
    };

    //构造器

    this.setName(name);
    this.setPrice(price);

};

var b = new Book(11,'jsbook',30);

var type = "文化";

//类静态公有属性；（对象不能访问）
Book.type = type;

//类静态公有方法 （对象不能访问）
Book.sell = function(){
  console.log("sell");
};

Book.prototype = {

    //公有属性

    isJSBook : false,


    display : function(){
        console.log("display");
    }

};

var b2 = new Book(12,'phpbook',25);

console.log(b.num);  // undefined: 私有属性实例无法访问
// b.checkId(); // 报错：b.checkId is not a function  私有方法实例无法访问
//checkId();  // 报错：checkId is not a function  私有方法同样无法通过全局访问
console.log(b.getNum());  // 1 通过特权方法可以访问私有属性
console.log(b.myName); // undefined 通过实例无法访问私有属性
console.log(b.getName()); // jsbook  通过特权方法可以访问实例私有属性
b.setName('haha'); //haha 通过特权方法可以设置实例属性
console.log(b.id); //11 通过实例可以访问对象公有属性
b.copy(); // copy 通过实例可以访问对象公有方法；
//b.sell(); // 报错，无法获得类的静态公有方法
console.log(b.type); // undefined ，无法获得类的静态公有属性
//b2.sell(); // 报错，即使通过类的点语法添加后再创建的实例也无法访问类的静态公有方法
console.log(b2.type); //undefined 即使通过类的点语法添加后再创建的实例也无法访问类的静态公有属性
console.log(Book.type); // 文化，可以通过类的点语法访问类的静态公有属性；
Book.sell();//sell 可以通过类的点语法访问类的静态公有方法；
console.log(b.isJSBook); // undefined 在给prototye上定义属性前实例化的对象无法访问公有属性
console.log(b2.isJSBook); // false 在给prototye上定义属性后实例化的对象可以访问公有属性
//b.display(); //报错  在给prototye上定义属性前实例化的对象无法访问公有方法
b2.display(); // display 在给prototye上定义属性后实例化的对象可以访问公有方法