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

console.log(A('demo'));
console.log(A('#test'));
console.log(A('p'));
console.log(A('p').size());
