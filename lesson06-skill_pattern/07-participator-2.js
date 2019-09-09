/**
 * author:hejianbo
 */

 // 参与者模式

 // 未应用参与者模式之前——为回到函数添加参数【利用call或apply】

 // 单体模式定义命名空间
 var A = {};
// data为要额外添加的参数
 A.event.on = function(dom,type,fn,data){
     if(dom.addEventListener){
         dom.addEventListener(type,function(e){
             // 在dom环境中调用fn,并传入事件对象与data数据参数
             fn.call(dom,e,data);
         },false);
     }else if(dom.attachEvent){
         dom.attachEvent('on'+type,function(e){
            // 在dom环境中调用fn,并传入事件对象与data数据参数
            fn.call(dom,e,data);
        });
     }else{
         dom['on'+type] = function(e){
            // 在dom环境中调用fn,并传入事件对象与data数据参数
            fn.call(dom,e,data);
        };
     }
 }

 // 存在的问题：添加的回调函数不能移除了