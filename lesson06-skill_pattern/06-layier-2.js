/**
 * author:hejianbo
 */

 // 惰性模式

 // 惰性模式之加载即执行

 // 单体模式定义命名空间
 var A = {};

 A.on = function(dom,type,fn){
     if(document.addEventListener){ //特性检测
         return function(dom,type,fn){ // 返回新方法
            dom.addEventListener(type,fn,false);
         } // 下同
     }else if(document.attachEvent){
         return function(dom,type,fn){
            dom.attachEvent('on'+type,fn);
         }
     }else{
         return function(dom,type,fn){
            dom['on'+type] = fn;
         }
     }
 }();// 加载时立即执行，完成重定义