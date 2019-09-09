/**
 * author:hejianbo
 */

 // 参与者模式

 // 参与者模式基础之函数柯里化
 
 // 函数柯里化器
 function curry(fn){
     // 缓存数组slice方法，Array.prototype.slice
     var Slice = [].slice;
     // 从第二个参数开始截取参数
     var args = Slice.call(arguments,1);
     // 闭包返回新函数
     return function(){
         // 将参数（类数组）转化为数组
         var addArgs = Slice.call(arguments),
         // 拼接参数
            allArgs = args.concat(addArgs);
        // 返回新函数
        return fn.apply(null,allArgs);
     }
 }

 // 测试函数柯里化器
 
 // 加法器
 function add(num1, num2){
    return num1 + num2;
 }
 // 加5的加法器
 function add5(num){
     return add(5,num);
 }
// 测试add加法器
console.log(add(1,2)); // 3
// 测试加5加法器
console.log(add5(6)); //  11
//函数柯里化创建加6加法器
var add6 = curry(add,6); //13
console.log(add6(7));

var add7and8 = curry(add,7,8);
console.log(add7and8()); //15
 