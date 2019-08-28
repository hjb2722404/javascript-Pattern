/**
 * author:hejianbo
 * 链模式
 */

 // 原型式继承
 var A = function(){}
 A.prototype = {
     length:2,
     size:function(){
         return this.length;
     }
 }

 // 访问size方法：
 var a = new A();
 console.log(a.size()); // 输出2

 // 错误的访问方法
 console.log(A.size()) // TypeError: A.size is not a function [size方法绑定在A的原型上，不是A上]
 console.log(A().size()); // TypeError: Cannot read property 'size' of undefined [A函数执行后没返回值（其实是返回undefined），所以找不到size方法]

 