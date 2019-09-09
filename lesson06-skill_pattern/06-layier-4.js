/**
 * author:hejianbo
 */

 // 惰性模式创建 XHR对象

 // 第一种：闭包重定义方案

 var createXHR = (function(){
     if(typeof XMLHttpRequest != "undefined"){
         return function(){
             return new XMLHttpRequest();
         }
     }else if(typeof ActiveXObject != "undefined"){
         return function(){
             if(typeof arguments.callee.activeXString != "string"){
                 var versions = ["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],
                     i=0,
                     len = versions.length;
                 for(;i<len;i++){
                     try{
                         new ActiveXObject(versions[i]);
                         arguments.callee.activeXString = versions[i];
                         break;
                     }catch(e){

                     }
                 }
             }
             return new ActiveXObject(arguments.callee.activeXString);
         }
     }else{
         throw new Error("您的浏览器不支持Ajax");
     }
 })();


 // 第二种，第一次调用时重定义

 function createXHRForLayier(){
     if(typeof XMLHttpRequest !== "undefined"){
         createXHRForLayier = function(){
             return new XMLHttpRequest();
         }
     }else if(typeof ActiveXObject !== "undefined"){
         createXHRForLayier = function(){
            if(typeof arguments.callee.activeXString != "string"){
                var versions = ["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],
                    i=0,
                    len = versions.length;
                for(;i<len;i++){
                    try{
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    }catch(e){

                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
         }
     }else{
         createXHRForLayier = function(){
             throw new Error("您的浏览器不支持Ajax");
         }
     }
     return createXHRForLayier();
 }