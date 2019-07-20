/**
 * author:hejianbo
 */

 // 多元化对象的桥接模式

 // 多维变量类
 // 运动单元
 function Speed(x,y){
     this.x = x;
     this.y = y;
 }
 Speed.prototype.run = function(){
     console.log('运动起来')
 }
 // 着色单元
 function Color(cl){
     this.color = cl;
 }
Color.prototype.draw = function(){
    console.log('绘制色彩');
}

//变形单元
function Shape(sp){
    this.shape = sp;
}
Shape.prototype.change = function(){
    console.log('改变形状');
}

// 说话单元
function Speek(wd){
    this.word = wd;
}
Speek.prototype.say = function(){
    console.log('书写字体');
}

function Ball(x,y,c){
    this.speed = new Speed(x,y);
    this.color = new Color(c);
}
Ball.prototype.init = function(){
    this.speed.run();
    this.color.draw();
}


function People(x,y,f){
    this.speed = new Speed(x,y);
    this.font = new Speek(f);
}
People.prototype.init = function(){
    this.speed.run();
    this.font.say();
}

function Spirite(x,y,c,s){
    this.speed = new Speed(x,y);
    this.color = new Color(c);
    this.shape = new Shape(s);
}
Spirite.prototype.init = function(){
    this.speed.run();
    this.color.draw();
    this.shape.change();
}
//调用

var s = new Spirite(10,12,'red','rect');
s.init(); // 运动起来   绘制色彩   改变形状