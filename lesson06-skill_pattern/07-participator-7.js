/**
 * author:hejianbo
 */

 // 参与者模式

 // 浏览器兼容版本的bind

 if(Function.prototype.bind === undefined){
     Function.prototype.bind = function(context){
         // 缓存数组slice方法
    var Slice = Array.prototype.slice,
        // 从第二个参数开始截取参数
        args = Slice.call(arguments,1),
        // 保存当前函数引用
        that = this;
        // 返回新方法
        return function(){
            // 将参数转化为数组
            var addArgs = Slice.call(arguments),
            // 拼接参数
                allArgs = addArgs.concat(args);
            //对fn装饰并返回
            return that.apply(context,allArgs);
        }
     }
 }

 