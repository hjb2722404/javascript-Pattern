/**
 * author:hejianbo
 */

 // 抽象类：可以声明但不能使用的类
 // 用来定义一个产品簇，声明一些必备方法，如果子类中没有重写就会抛出错误

 //汽车抽象类，当使用其实例对象的方法时会抛出错误

 var Car = function(){}

 Car.prototype = {
     getPrice:function(){
         return new Error('抽象方法不能调用');
     },
     getSpeed:function(){
        return new Error('抽象方法不能调用');

     }
 }

 // 定义一个子类
 function Bus(name,price,speed){
     this.name = name;
     var price = price
     this.getPrice = function(){
         return price;
     }
 }

 //类式继承，继承父类Car
 Bus.prototype = new Car()

var bus = new Bus("公交车","30万","120公里");

console.log(bus.getPrice()); // 30万
console.log(bus.getSpeed()); //Error: 抽象方法不能调用 。。。 [由于没有重写父类方法，抛出了错误]