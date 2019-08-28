/**
 * author:hejianbo
 */

 // 命令模式应用二——绘图

 // 实现对象
 var CanvasCommand = (function(){
     // 获取 canvas
     var canvas = document.getElementById('canvas'),
     // canvas 元素的上下文引用对象缓存在命令对象内部
     ctx = canvas.getContext('2d');
     // 内部对象方法
     var Action ={
         // 填充色彩
         fillStyle :function (c) {
             ctx.fillStyle =c;
         },
         // 填充矩形
         fillRect : function(x,y,width,height) {
            ctx.fillRect(x,y,width,height);
         },
         // 描边色彩
         strokeStyle : function(c) {
            ctx.strokeStyle = c;
         },
         // 描边矩形
         strokeRect : function(x,y,width,height) {
            ctx.strokeRect(x,y,width,height);
         },
         // 填充字体
         fillText : function(text,x,y) {
            ctx.fillText(text,x,y)
         },
         // 开启路径
         beginPath : function() {
            ctx.beginPath();
         },
         // 移动画笔触点
         moveTo : function(x,y) {
            ctx.moveTo(x,y);
         },
         // 画笔连线
         lineTo : function(x,y) {
            ctx.lineTo(x,y);
         },
         // 绘制弧线
         arc : function(x,y,r,begin,end,dir) {
            ctx.arc(x,y,r,begin,end,dir);
         },
         // 填充
         fill : function() {
            ctx.fill();
         },
         // 描边
        stroke : function() {
            ctx.stroke();
         }
     }

     return {
         // 命令接口
         excute : function(msg) {
            // 如果没有指令则返回
            if (!msg) {
                return;
            }
            // 如果命令是一个数组
            if (msg.length) {
                // 遍历执行多个命令
                for(var i=0,len=msg.length;i<len; i++){
                    arguments.callee(msg[i]);
                }
                // 执行一个命令
            }else{
                // 如果 msg.param 不是一个数组，将其转化为数组
                msg.param = Object.prototype.toString.call(msg.param) === "[object Array]" ? msg.param :[msg.param];
                Action[msg.command].apply(Action,msg.param);
            }
         }, 
     }
 })();

 // 使用

 // 设置填充色彩为红色，并绘制一个矩形
 CanvasCommand([
     {command:'fillStyle',param:'red'},
     {command:'fillRect',param:[20,20,100,100]}
 ]);