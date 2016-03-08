/**
 * Created by hjb2722404 on 2016/3/1.
 */

//利用闭包实现

var Book = (function(){
    //静态私有变量
    var bookNum = 0 ;

    //静态私有方法
    function checkBook(name){}

    //创建类
    function _book(newId,newName,newPrice){

        //私有变量
        var name,price;

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

        bookNum++;
        if(bookNum>100){
            throw new Error('我们仅出版100本书');
        }


        //构造器

        this.setName(name);
        this.setPrice(price);
    }
    _book.prototype = {

        //jingtai 公有属性
        isJSBook : false,

        display : function(){
            console.log("display");
        }

    };
    //返回类
    return _book;-
})();

//var type = "文化";

////类静态公有属性；（对象不能访问）
//Book.type = type;
//
////类静态公有方法 （对象不能访问）
//Book.sell = function(){
//  console.log("sell");
//};



var b = new Book(11,'jsbook',30);

//console.log(b.isJSBook);

//b.setName('haha');
//console.log(b.name);
b.getName();

//b.copy();
//b.sell();
//b.display();
//b.checkId();
