/**
 * author:hejianbo
 * 链模式
 */

 // 解决覆盖获取--使用new
 var A = function(selector){
     return new A.fn.init(selector);
 }
 A.fn = A.prototype = {
    init : function(selector){
        this[0] = document.getElementById(selector); // 作为当前对象的属性值保存
        this.length = 1; // 校正 length 属性
        return this; // 返回当前对象
    },
    length:2,
    size:function(){
        return this.length;
    }
}
console.log(A('demo'));
console.log(A('test'));
console.log(A('demo').size());//Uncaught TypeError: A(...).size is not a function
