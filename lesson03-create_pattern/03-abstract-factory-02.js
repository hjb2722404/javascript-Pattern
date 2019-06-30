/**
 * author:hejianbo
 */

 // 抽象工厂模式：
 // 使用抽象工厂来为抽象的父类创建子类

 // 抽象工厂方法
 var VehicleFactory = function(subType, superType){
     if(typeof VehicleFactory[superType] === 'function'){
         // 缓存类
         function F(){};
         // 缓存类继承父类属性和方法[类式继承]
         F.prototype = new VehicleFactory[superType]();
         // 将子类 constructor 指向子类
         subType.constructor = subType;
         // 子类原型继承 “父类”
          // 在抽象工厂中让子类继承父类的一个实例（缓存类的实例），以此获得父类的对象属性
         subType.prototype = new F();
     }else{
         // 不存在该抽象类抛出错误
         throw new Error('未创建该抽象类');
     }
 }

 // 小汽车抽象类，使用抽象工厂类VehicleFactory创建子类，区别于以前的使用var关键字类声明子类
 // 由于抽象工厂中的父类是抽象类，而抽象工厂方法不需要实例化，所以抽象工厂添加抽象类直接采用点语法来添加
 VehicleFactory.Car = function(){
     this.type = 'car';
 };
 VehicleFactory.Car.prototype = {
    getPrice:function(){
        return new Error('抽象方法不能调用');
    },
    getSpeed:function(){
       return new Error('抽象方法不能调用');

    }
 }

 // 公交车抽象类
 VehicleFactory.Bus = function(){
    this.type = 'bus';
};
VehicleFactory.Bus.prototype = {
   getPrice:function(){
       return new Error('抽象方法不能调用');
   },
   getPassengeNum:function(){
      return new Error('抽象方法不能调用');

   }
}

// 货车抽象类
VehicleFactory.Truck = function(){
    this.type = 'truck';
};
VehicleFactory.Truck.prototype = {
   getPrice:function(){
       return new Error('抽象方法不能调用');
   },
   getTrainload:function(){
      return new Error('抽象方法不能调用');

   }
}

// 宝马汽车子类
var BMW = function(price,speed){
    this.price = price;
    this.speed = speed;
}
// 抽象工厂实现对Car抽象类的继承
VehicleFactory(BMW,'Car');
BMW.prototype.getPrice = function(){
    return this.price;
}

// 兰博基尼汽车子类
var Lamborghini = function(price,speed){
    this.price = price;
    this.speed = speed;
}
// 抽象工厂实现对Car抽象类的继承
VehicleFactory(Lamborghini,'Car');
Lamborghini.prototype.getPrice = function(){
    return this.price;
}
Lamborghini.prototype.getSpeed = function(){
    return this.speed;
}

// 宇通汽车子类
var YUTONG = function(price,passenger){
    this.price = price;
    this.passenger = passenger;
}
// 抽象工厂实现对Bus抽象类的继承
VehicleFactory(YUTONG,'Bus');
YUTONG.prototype.getPrice = function(){
    return this.price;
}
YUTONG.prototype.getPassengeNum = function(){
    return this.passenger;
}

// 奔驰汽车子类
var BenzTruck = function(price,trainLoad){
    this.price = price;
    this.trainLoad = trainLoad;
}
// 抽象工厂实现对Truck抽象类的继承
VehicleFactory(BenzTruck,'Truck');
BenzTruck.prototype.getPrice = function(){
    return this.price;
}
BenzTruck.prototype.getTrainload = function(){
    return this.trainLoad;
}

var truck = new BenzTruck(100000,1000);
console.log(truck.getPrice()); // 100000
console.log(truck.type); // truck // 通过抽象工厂类中的类式继承获得父类的属性

var bmw = new BMW(200000,300);
console.log(bmw.getPrice()); // 200000
console.log(bmw.type); // car
console.log(bmw.getSpeed()); // Error：抽象方法不能调用【子类没有实现父类的抽象方法】