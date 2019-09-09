/**
 * author:hejianbo
 */

 // 参与者模式

 // 使用函数柯里化思想重构bind


 //重写bind

 function bind(fn,context){
    // 缓存数组slice方法
    var Slice = Array.prototype.slice,
        // 从第三个参数开始截取参数（包括第三个参数）
        args = Slice.call(arguments,2);
    // 返回新方法
    return function(){
        // 将参数转化为数组
        var addArgs = Slice.call(arguments),
        // 拼接参数
            allArgs = addArgs.concat(args);
        //对fn装饰并返回
        return fn.apply(context,allArgs);
    }
 }
 function demoFn(){
    console.log(arguments,this);
    console.log(arguments[1].text);
}
 var demoData1 = {
     text:'这是第一组数组'
 },
 demoData2 = {
     text:'这是第二组数据'
 };

 var btn = document.getElementsByTagName('button')[0];
 var btn1 = document.getElementsByTagName('button')[1];

 // 提供btn元素、demoData1 参与对象
 var bindFn = bind(demoFn,btn,demoData1);
 btn.addEventListener('click',bindFn);

 var bindFn1 = bind(demoFn,btn1,demoData2);
 btn1.addEventListener('click',bindFn1);
