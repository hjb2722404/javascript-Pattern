/**
 * author:hejianbo
 */

 // 访问者模式

 var bindEvent = function(dom,type, fn){
     if(dom.addEventListener){
         dom.addEventListener(type, fn, false);
     }else if(dom.attachEvent){
         dom.attachEvent('on' + type, fn);
     }else{
         dom['on' + type] = fn;
     }
 }
//  var demo = document.getElementById('demo');
//  bindEvent(dom,'click',function(){
//      this.style.background = 'red';
//  });

 // IE下使用访问者模式

 function bindEvent(dom,type, fn,data) {
     var data = data || {};
     dom.attachEvent('on' + type, function (e) {
         fn.call(dom,e,data);
     })
 }

 // 对象访问器
 var Visitor = (function () {
     return {
         // 截取方法
         splice : function() {
            // splice 方法参数，从原参数的第二个参数开始算起
            var args = Array.prototype.splice.call(arguments,1);
            // 对第一个参数对象执行splice方法
            return Array.prototype.splice.apply(arguments[0],args);
         },
         // 追加数据方法
         push : function() {
            //强化类数组对象，使它拥有length属性
            var len = arguments[0].length || 0;
            // 添加的数据从原参数的第二个参数算起
            var args = this.splice(arguments,1);
            // 校正length属性
            arguments[0].length = len + arguments.length -1; 
            // 对第一个参数对象执行push方法
            return Array.prototype.push.apply(arguments[0],args);
        },
        // 弹出最后一从添加的元素
        pop : function() {
            // 对第一个参数对象执行pop方法
            return Array.prototype.pop.apply(arguments[0]);
        },
     }
 })();

 // 使用类数组访问器

 var a = new Object();
 console.log(a.length);
 Visitor.push(a,1,2,3,4);
 console.log(a.length);
 Visitor.push(a,4,5,6);
 console.log(a);
 console.log(a.length);
 Visitor.pop(a);
 console.log(a);
 console.log(a.length);
 Visitor.splice(a,2);
 console.log(a);