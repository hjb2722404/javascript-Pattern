/**
 * author:hejianbo
 * 链模式
 */

 // 丰富元素获取
 var A = function(selector,context){
     return new A.fn.init(selector,context);
 }
 A.fn = A.prototype = {
     // 强化构造器
     constructor : A,
     init : function(selector,context){
         // 获取元素长度
         this.length = 0,
         // 默认获取元素的上下文为 document
         context = context || document;
         // 如果是id选择符. 按位非将-1转化为0，转化为布尔值false`
         if(~selector.indexOf('#')){
            // 截取id 并选择
            this[0] = document.getElementById(selector.slice(1)); 
            this.length = 1;
            // 如果是元素名称
         }else{
             // 在上下文中选择元素
             var doms = context.getElementsByTagName(selector),
                 i = 0,
                 len = doms.length;
             for(;i<len; i++){
                 // 压入this中
                 this[i] = doms[i];
             }
             // 校正长度
             this.length = len;
         }
         // 保存上下文
         this.context = context;
         // 保存选择符
         this.selector = selector;
         return this; // 返回当前对象
     },
     length:2,
     size:function(){
         return this.length;
     },
     // 增强数组
     push:[].push,
     sort:[].sort,
     splice:[].splice
}
A.fn.init.prototype = A.fn;

// 对象拓展

A.extend = A.fn.extend = function(){
    // 拓展对象从第二个参数算起
    var i = 1,
        // 获取参数长度
        len = arguments.length,
        //第一个参数为源对象
        target = arguments[0],
        // 拓展对象中的属性
        j;
    // 如果只传入一个参数
    if(i == len){
        // 源对象为当前对象
        target = this;
        // i 从0计数
        i--;
    }
    // 遍历参数中拓展对象
    for(;i<len;i++){
        // 遍历拓展对象中的属性
        for(j in arguments[i]){
            // 拓展源对象
            target[j] = arguments[i][j];
        }
    }
    // 返回源对象
    return target;
}


// 拓展一个对象

var demo = A.extend({first:1},{second:2},{third:3});
console.log(demo);