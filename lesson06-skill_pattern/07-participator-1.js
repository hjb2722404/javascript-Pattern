/**
 * author:hejianbo
 */

 // 参与者模式

 // 未应用参与者模式之前

 // 单体模式定义命名空间
 var A = {};

 A.event.on = function(dom,type,fn){
     if(dom.addEventListener){
         dom.addEventListener(type,fn,false);
     }else if(dom.attachEvent){
         dom.attachEvent('on'+type,fn);
     }else{
         dom['on'+type] = fn;
     }
 }