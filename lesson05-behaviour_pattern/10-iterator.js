/**
 *author:hejianbo 
 * 迭代器模式
 */

 // 迭代器
 var Iterator = function (items,container) {
     // 获取父容器，若container 参数存在，并且可以获取该元素则获取，否则获取 document
     var container = container && document.getElementById(container) || document,
        // 获取元素 
        items = container.getElementsByTagName(items),
        // 获取元素长度
        length = items.length,
        // 当前索引值 ，默认 0
        index = 0; 
    // 缓存源生数组splice方法
     var splice = [].splice;
     return {
         // 获取第一个元素
         first : function(){
             index = 0;  // 校正当前元素
             return items[index];  // 获取第一个元素
         },
         // 获取最后一个元素
         last : function() {
            index = length - 1;  // 校正当前索引
            return items[index];  // 获取最后一个元素
         },
         // 获取前一个元素
         pre : function() {
            if(--index >0){   // 如果索引值大于0
                return items[index];  // 获取索引值对应的元素
            }else{
                index = 0;   // 否则索引值为 0 
                return null;  //  返回空
            }
         },
         // 获取后一个元素
         next : function(){
             if(++index < length){  // 如果索引值小于长度
                 return items[index]; // 获取索引值对应的元素
             }else{
                 index = length - 1;  // 索引值为 length-1
                 return null;  //返回空
             }
         },
         // 获取某一个元素
         get : function(num) {
            // 如果num大于等于0 再正向获取，否则逆向获取
            index = num >= 0 ? num % length : num % length + length;
            // 返回对应元素
            return items[index];  
         },
         // 对每一个元素执行某一个方法
         dealEach : function(fn) {
            // 第二个参数开始为回调函数中参数
            var args = splice.call(arguments,1);
            // 遍历元素
            for(var i=0;i<length;i++){
                // 对元素执行回调函数
                fn.apply(items[i],args);
            }
         },
         // 对某一个元素执行某个方法
         dealItem : function(num,fn) {
            fn.apply(this.get(num),splice.call(arguments,2))
         },
         // 排他方式处理某个元素
         exclusive: function(num, allFn, numFn) {
            // 对所有元素执行回调函数
            this.dealEach(allFn);
            // 如果num 类型为数组
            if(Object.prototype.toString.call(num) === "[object Array]"){
                // 遍历num数组
                for(var i=0,len=num.length;i<len;i++){
                    // 分别处理数组中的每一个元素
                    this.dealItem(num[i],numFn);
                }
            }else{
                // 处理第 num 个元素
                this.dealItem(num,numFn);
            }
         }
     }
 }

 // 使用
//  var demo = new Iterator('li','container');

//  console.log(demo.first());
//  console.log(demo.pre());
//  console.log(demo.next);
//  console.log(demo.get(2000));
// // 处理所有元素
// demo.dealEach(function (text,color) {
//     this.innerHTML = text;
//     this.style.background = color;
// });
// // 排他思想处理第3个与第4个元素
// demo.exclusive([2,3],function () {
//     this.innerHTML = '被排除的';
//     this.style.background = 'green';
// },function () {
//     this.innerHTML = '选中的';
//     this.style.background = 'red';
// });


// 数组迭代器
var eachArray = function (arr,fn) {
    var i = 0,len = arr.length;
    // 遍历数组
    for(;i<len; i++){
        // 依次执行回调函数，注意回调函数中传入的参数第一个为索引，第二个为该索引对应的值
        if(fn.call(arr[i],i,arr[i]) === false){
            break;
        }
    }
}


// 对象迭代器
var eachObject = function (obj,fn) {
    // 遍历对象中的每一个属性
    for(var i in obj){
        // 依次执行回调函数，注意回调函数中传入的参数第一个为属性，第二个为该属性对应的值
        if(fn.call(obj[i], i, obj[i]) === false){
            break;
        }
    }
}


// 使用迭代器

// 创建一个数组
 for(var arr = [],i=0;i<5; arr[i++] = i);
 eachArray(arr,function (i,data) {
     console.log(i,data);
 })


 var obj = {
     a : 23,
     b : 56,
     c : 67
 }

 eachObject(obj,function (i,data) {
     console.log(i,data);
 });

 // 同步变量
 var A ={
     // 所有用户公有
     common : {},
     // 客户端数据
     client : {
         user : {
             username : '雨夜清河',
             uid : '123'
         }
     } ,
     //服务端数据
     server:{}
 }

 // 同步变量迭代取值器
 var AGetter = function (key) {
     // 如果不存在A则返回未定义
     if(!A){
         return undefined;
     }
     var result = A;  // 获取同步变量A对象
     key = key.split('.'); // 解析属性层次序列
     // 迭代同步变量A对象属性
     for(var i =0,len=key.length;i<len;i++){
         // 如果第i层属性存在对应的值则迭代该属性
         if(result[key[i]] !== undefined){
             result = result[key[i]];
            //如果不存在则返回未定义
         }else{
             return undefined;
         }
     }
     // 返回获取的结果
     return result;
 }

 // 获取用户名数据
 console.log(AGetter('client.user.username'));
 // 获取本地语言数据
 console.log(AGetter('server.lang.local'));


 // 同步变量迭代复制器
 var ASetter = function (key,val) {
     // 如果不存在A则返回未定义
     if(!A){
        return undefined;
    }
    var result = A;  // 获取同步变量A对象
    key = key.split('.'); // 解析属性层次序列
    // 迭代同步变量A对象属性
    for(var i =0,len =key.length;i<len -1;i++){
        // 如果第  i 层属性对应的值不存在，则定义为对象
        if(result[key[i]] === undefined){
            result[[key[i]]] = {};
        }
        // 如果第i层属性对应的值不是对象(Object)的一个实例，则抛出错误
        if(!result[key[i]] instanceof Object){
            throw new Error('A.' + key.splice(0,i+1).join('.') + 'is not Object');
            return false;
        }
        // 迭代该层属性值
        result = result[key[i]];
    }
    // 返回设置成功的属性值
    return result[key[i]] = val;
 }
 // 缓存添加体育新闻模块数据
 console.log(ASetter('client.module.news.sports','on'));

 // 为值类型数据添加属性时不允许的
 console.log(ASetter('client.user.username.sports','on'));


 // 迭代器解决分支循环嵌套问题

 window.onload = function () {
     var canvas = document.getElementsByTagName('canvas')[0], // 获取画布
         img = document.images[0], // 获取图片
         width = (canvas.width = img.width * 2) / 2, // 获取并设置宽度
         height = canvas.height = img.height, // 获取并设置高度
         ctx = canvas.getContext('2d');  // 获取并渲染上下文
     ctx.drawImage(img,0,0); // 绘制图片
     // 绘制特效图片
     /**
      * param t 特效类型
      * param x x坐标
      * param y y坐标
      * param w 宽度
      * param h 高度
      * param a 透明度
      */
     function dealImage(t,x,y,w,h,a) {
         // 获取画布图片数据
         var canvasData = ctx.getImageData(x,y,w,h);
         // 获取像素数据
         var data = canvasData.data;
         // 遍历每组像素数据（4个数据表示一个像素点数据，分别代表红色、绿色、蓝色、透明度）
         for(var i=0, len=data.length;i<len;i+=4){
             switch (t) {
                    // 红色滤镜 将绿色与蓝色取值为 0
                 case 'red':
                     data[i+1] = 0;
                     data[i+2] = 0;
                     data[i+3] = a;
                     break;
                     // 绿色滤镜 将红色和蓝色取值为 0
                 case 'green' :
                     data[i] = 0;
                     data[i+2] = 0; 
                     data[i+3] = a; 
                     break;
                     // 蓝色滤镜 将红色和绿色取值 0
                 case 'bule' :
                     data[i] = 0; 
                     data[i+1] = 0; 
                     data[i+3] = a;
                     break;
                     // 平均值灰色滤镜 取三色平均值
                 case 'gray':
                     var num = parseInt((data[i] + data[i+1] + data[i+2]) / 3);
                     data[i] = num;
                     data[i+1] = num;
                     data[i+2] = num;
                     data[i+3] = num;
                    break;
                // 其他方案
                 default:
                     break;
             }
         }
         // 绘制处理后的图片
         ctx.putImageData(canvasData,width + x,y);
     }
     // 为图片添加特效
     dealImage('gray',0,0,width,height,255);
     dealImage('gray',100,50,300,200,100);
     dealImage('gray',150,100,200,100,255);
 }

 // 使用策略模式与迭代器模式结合 改写 dealImage方法
 function dealImage(t,x,y,w,h,a) {
     var canvasData = ctx.getImageData(x,y,w,h),
         data = canvasData.data;
         // 策略模式封装算法
         var Deal = function () {
             var method = {
                 // 默认类型——平均灰度特效
                 'default' : function (i) {
                     return method['gray'](i);
                 },
                 // 红色特效
                 'red' : function (i) {
                     data[i+1] = 0;
                     data[i+2] = 0;
                     data[i+3] = a;
                 },
                 // 平均灰度特效
                 'gray' : function(i){
                     // 将红、绿、蓝色取平均值
                     data[i] = data[i+1] = parseInt(data[i+2] = (data[i] + data[i+1] + data[i+2]) / 3);
                     data[i+3] = a;
                 }
                 // 其余算法省略
             };
             // 主函数，通过给定类型返回对应滤镜算法
            return function (type) {
                return method[type] || method['default'];
            }
         } ();
         
    // 迭代器处理数据
    function eachData(fn) {
        for(var i =0,len = data.length; i<len; i+=4){
            // 处理一组像素数据
            fn(i);
        }
    }
    // 处理数据
    eachData(Deal(t));
    ctx.putImageData(canvasData,width+x,y);
}