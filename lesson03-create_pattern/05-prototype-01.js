/**
 * author:hejianbo
 */

 // 原型模式
 // 用原型实例指向创建对象的类，使用于创建新的对象的类【共享】原型对象的属性及方法
 // 这种继承是基于一种对属性或者方法的共享，而非复制

 // 需求： 焦点图

 // 图片轮播类
 var LoopImages = function(imgArr, container){
     this.imagesArray = imgArr; // 轮播图片数组
     this.container = container; // 轮播图片容器
     this.createImage = function(){}  // 创建轮播图片
     this.changeImage = function(){}  // 切换下一张图片
 }

// 难点：
//  类型多样：有的上下切换，有的左右切换，有的渐隐切换，有的缩放切换
// 方案：
//   抽象出一个基类，让不同特效类去继承这个基类，然后对于差异化的需求通过重写这些继承下来的属性
//    或者方法来解决

// 上下滑动切换类
 var SlideLoopImg = function(imgArr, container){
    // 构造函数继承图片轮播类 
    LoopImages.call(this, imgArr, container);
    // 重写继承的切换下一张图片的方法
    this.changeImage = function(){
        console.log("上下滑动");
    }
 }

 // 渐隐切换类
 var FadeLoopImg = function(imgArr, container, arrow){
    // 构造函数继承图片轮播类 
    LoopImages.call(this, imgArr, container);
    // 切换箭头私有变量
    this.arrow = arrow;
    // 重写继承的切换下一张图片的方法
    this.changeImage = function(){
        console.log("渐隐切换");
    }
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

 // 问题：每次子类继承父类时，都要创建一次父类，如果父类构造函数中存在耗时操作，消耗太大
 //  方案： 将消耗资源的方法放在基类的原型中，见 05-02