/**
 * Created by hjb2722404 on 2016/3/1.
 */

//私有属性与私有方法，特权方法，对象共有属性和对象共有方法，构造器

var Book = function(id,name,price){
    //私有属性
    var num = 1;

    //私有方法
    function checkId(){
        console.log('checkid');
    }

    //特权方法
    this.getName = function(){
        checkId();
    };
    this.getPrice = function(){
        return this.price;
    };
    this.setName = function(name){
        this.name = name;
    };
    this.setPrice = function(price){
        this.price = price;
    };

    //对象共有属性

    this.id = id;

    //对象公有方法

    this.copy = function(){
        console.log('copy');
    };

    //构造器

    this.setName(name);
    this.setPrice(price);

};

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

var b = new Book(11,'jsbook',30);

//console.log(b.isJSBook);

//b.setName('haha');
//console.log(b.name);
b.getName();

//b.copy();
//b.sell();
//b.display();
//b.checkId();
