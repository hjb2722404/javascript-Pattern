/**
 * author：hejianbo 
 */

 // 代理模式

 // 站长统计代理的实现方式
 var Count = (function(){
     var _img = new Image();

     // 返回统计函数
     return function(param){
         // 统计请求字符串
         var str = 'http://www.count.com/a.gif?';
         // 拼接请求字符串
         for(var i in param){
            str += i + '=' + param[i];
             //发送统计请求
             _img.src = str;
         }
     }
 })();

 // 浏览器环境 —— 测试用例，统计 num
 Count({num : 10});

 // JSONP 代理的实现原理
 
    // 见03-proxy-01.html

 //代理模板
    // 见03-proxy-02A.html