/**
 * author:hejianbo
 */

 // 参与者模式

 // 参与者模式基础之 bind 实现

 // 简单版
 
 // 函数绑定 bind
 function bind(fn,context) {
     // 闭包返回新函数
     return function(){
         // 对fn装饰并返回
         return fn.apply(context,arguments);
     }
 }

 // 事件框架使用bind参与

 var btn = document.getElementsByTagName('button')[0];
 var btn1 = document.getElementsByTagName('button')[1];
 var btn2 = document.getElementsByTagName('button')[2];
 var p = document.getElementsByTagName('p')[0];
 // 对demoFn 改进，在控制台输出参数与this对象
 function demoFn(){
     console.log(arguments,this);
 }
// 未设置提供参与对象
var bindFn = bind(demoFn);
// 绑定事件
btn.addEventListener('click',bindFn);

// 提供btn元素参与对象
var bindFn1 = bind(demoFn,btn1);
btn1.addEventListener('click',bindFn1);

// 提供p元素参与对象
var bindFn2 = bind(demoFn,p);     
btn2.addEventListener('click',bindFn2);

// btn.removeEventListener('click',bindFn);
// btn1.removeEventListener('click',bindFn1);
// btn2.removeEventListener('click',bindFn2);