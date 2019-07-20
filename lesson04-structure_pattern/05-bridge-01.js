/**
 * author:hejianbo
 */

 // 鼠标滑过用户信息时添加特效，划过用户名背景变色，划过等级和消息改变数字内容

 // 小白实现

 var spans = document.getElementsByTagName('span');
 // 为用户名绑定特效
 spans[0].onmouseover = function(){
     this.style.color = 'red';
     this.style.background = '#ddd';
 };
 spans[0].onmouseout = function(){
    this.style.color = '#333';
    this.style.background = '#f5f5f5';
 };
 spans[1].onmouseover = function(){
    this.getElementsByTagName('strong')[0].style.color = 'red';
    this.getElementsByTagName('strong')[0].style.background = '#ddd';
};
 spans[1].onmouseout = function(){
    this.getElementsByTagName('strong')[0].style.color = '#333';
    this.getElementsByTagName('strong')[0].style.background = '#f5f5f5';
};

// 问题：代码冗余

// 解决一：抽象
function changeColor(dom,color,bg){
    dom.style.color = color;
    dom.style.background = bg;
}

// 解决二： 桥接——利用this
var spans = document.getElementsByTagName('span');
spans[0].onmouseover = function(){
    changeColor(this,'red','#ddd');
};
spans[0].onmouseout = function(){
    changeColor(this,'#333','#f5f5f5');
};
spans[1].onmouseover = function(){
    changeColor(this.getElementsByTagName('strong')[0],'red','#ddd');
};
spans[0].onmouseout = function(){
    changeColor(this.getElementsByTagName('strong')[0],'#333','#f5f5f5');
};