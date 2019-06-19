/**
 * Created by hjb2722404 on 2016/3/1.
 */

//利用闭包实现

var Book = (function(){
    //静态私有变量
    var bookNum = 0 ;
    //静态私有方法
    function checkBook(name){
        console.log(name);
    }

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
            return name;
        };
        this.getPrice = function(){
            return price;
        };
        this.setName = function(newName){
            name = newName;
            console.log(name);
        };
        this.setPrice = function(newPrice){
            price = newPrice;
            console.log(price);
        };
        this.checkMyId = function(){
            checkId();
        }
        this.getBookNum = function(){
            return bookNum;
        }
        this.checkMyBook = function(){
            checkBook(name);
        }
        //对象共有属性
        this.id = newId;
        //对象公有方法
        this.copy = function(){
            console.log('copy');
        };
        bookNum++;
        if(bookNum>100){
            throw new Error('我们仅出版100本书');
        }
        //构造器
        this.setName(newName);
        this.setPrice(newPrice);
    }
    _book.prototype = {

        //jingtai 公有属性
        isJSBook : false,

        display : function(){
            console.log("display");
        }

    };
    //返回类
    return _book;
})();

var b = new Book(11,'jsbook',30);

console.log(b.name); // undefined
console.log(b.getName()); // jsbook
//b.checkBook("abc"); 报错
//b.checkId(); 报错
b.checkMyId(); // checkid
console.log(b.id); //11
b.copy(); // copy
b.setName("phpbook"); // phpbook
b.setPrice(25);// 25
b.display(); //display
console.log(b.isJSBook); // false
console.log(b.bookNum); // undefined
console.log(Book.bookNum); //undefined
console.log(b.getBookNum()); // 1
b.checkMyBook(); // phpbook
