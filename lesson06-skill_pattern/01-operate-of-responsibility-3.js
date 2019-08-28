/**
 * author:hejianbo
 * 链模式
 */

 // 仿JQuery做法，干脆让B(此处替换为fn)成为A的一个属性
//  var A = function(){
//      return A.fn;
//  }
//  A.fn = A.prototype = {}

 // 获取元素
 var A = function(selector){
    return A.fn.init(selector);
 };
    A.fn = A.prototype = {
     init: function(selector){
         return document.getElementById(selector)
     },
     length:2,
     size:function(){
         return this.length;
     }
 }
 console.log(A('demo')); // <div id="demo"></div>
