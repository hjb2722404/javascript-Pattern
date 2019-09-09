/**
 * author:hejianbo
 */

 // 惰性模式

 // 惰性模式之惰性执行

 // 单体模式定义命名空间
 var A = {};

 A.on = function(dom,type,fn){
     if(dom.addEventListener){ // 第一次调用时检测
         A.on = function(dom,type,fn){ // 重定义
            dom.addEventListener(type,fn,false);
         } // 下同
     }else if(dom.attachEvent){
         A.on = function(dom,type,fn){
            dom.attachEvent('on'+type,fn);
         }
     }else{
         A.on = function(dom,type,fn){
            dom['on'+type] = fn;
         }
     }
     // 执行重定义的on方法
     A.on(dom,type,fn);
 }