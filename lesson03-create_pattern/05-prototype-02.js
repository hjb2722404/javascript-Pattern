/**
 * author:hejianbo
 */

 // 原型模式
 // 用原型实例指向创建对象的类，使用于创建新的对象的类【共享】原型对象的属性及方法
 // 这种继承是基于一种对属性或者方法的共享，而非复制

 // 将基类中耗资源比较多的操作放在基类原型中，避免每次继承重复执行

 // 图片轮播类
 var LoopImages = function(imgArr, container){
     this.imagesArray = imgArr; // 轮播图片数组
     this.container = container; // 轮播图片容器
 }

 LoopImages.prototype = {
    createImage : function(){
        console.log("创建轮播图片");
    }, // 创建轮播图片
    changeImage : function(){
        console.log("切换图片");
    }  // 切换下一张图片
 }

// 上下滑动切换类
 var SlideLoopImg = function(imgArr, container){
    // 构造函数继承图片轮播类 
    LoopImages.call(this, imgArr, container);
 }
 SlideLoopImg.prototype = new LoopImages();
    // 重写继承的切换下一张图片的方法
 SlideLoopImg.prototype.changeImage = function(){
    console.log("上下滑动");
 }

 // 渐隐切换类
 var FadeLoopImg = function(imgArr, container, arrow){
    // 构造函数继承图片轮播类 
    LoopImages.call(this, imgArr, container);
    // 切换箭头私有变量
    this.arrow = arrow;
 }

 FadeLoopImg.prototype = new LoopImages();
 FadeLoopImg.prototype.changeImage = function(){
     console.log("渐隐切换");
 }

 // 实例化
 var fadeImg = new FadeLoopImg([
     '01.jpg',
     '02.jpg',
     '03.jpg',
     '04.jpg'
 ],'slide',[
     'left.jpg',
     'right.jpg'
 ]);

 fadeImg.changeImage(); // 渐隐切换

// 原型的拓展
// 对原型对象的拓展，不论是子类或者是父类的实例对象都会继承

LoopImages.prototype.getImageLength = function(){
    return this.imagesArray.length;
}

FadeLoopImg.prototype.getContainer = function(){
    return this.container;
}

console.log(fadeImg.getImageLength()); //4
console.log(fadeImg.getContainer()); //slide

// 原型模式的特点：
    // 在任何时候都可以对基类或者子类进行方法拓展，而且所有被实例化的对象或者类都能获取这些方法