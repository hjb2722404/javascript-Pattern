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

 // 简单测试用例
 var demoObj = {
     title:'这是一个例子'
 }
 // 测试方法
 function demoFn() {
     console.log(this.title);
 }
 // 让demoObj 参与 demoFn 的执行
 var bindFn = bind(demoFn,demoObj);
 demoFn(); // undefined
 bindFn(); // 这是一个例子
