/**
 * author:hejianbo
 * 链模式
 */

 // 强化构造函数
 var A = function(selector){
     return new A.fn.init(selector);
 }
 A.fn = A.prototype = {
     // 强化构造器
     constructor : A,
     init : function(selector){
         console.log(this.constructor);
         this[0] = document.getElementById(selector); // 作为当前对象的属性值保存
         this.length = 1; // 校正 length 属性
         return this; // 返回当前对象
     },
     length:2,
     size:function(){
         return this.length;
     }
}
A.fn.init.prototype = A.fn;

console.log(A('demo'));
console.log(A('demo').size());
