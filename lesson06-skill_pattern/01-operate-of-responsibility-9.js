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

// 添加方法

A.fn.extend({
    // 添加事件
    on: (function(){
        // 标准浏览器DOM2级事件
        if(document.addEventListener){
            return function(type,fn){
                var i = this.length -1;
                // 遍历所有元素添加事件
                for(; i>=0; i--){
                    this[i].addEventListener(type,fn,false);
                }
                return this; // 返回源对象
            }
            // IE 浏览器DOM2级事件
        }else if(document.attachEvent){
            return function(type,fn){
                var i = this.length - 1;
                for(; i>=0; i--){
                    this[i].attachEvent('on' + type, fn);
                }
                return this;
            }
            // 不支持DOM2 级事件浏览器添加事件
        }else{
            return function(type,fn){
                var i = this.length -1;
                for(; i>=0; i--){
                    this[i]['on' + type] = fn;
                }
                return this;
            }
        }
    })()
});
console.log(A.fn);

A.extend({
    // 将 '-'分隔符转化为驼峰式，如 'border-color' ->  'borderColor'
    camelCase : function(str){
        return str.replace(/\-(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        })
    }
});

console.log(A);

A.fn.extend({
    css: function(){
        var arg = arguments,
            len = arg.length;
        if(this.length < 1){
            return this;
        }
        if(len === 1){
            if(typeof arg[0] === 'string'){
                if(this[0].currentStyle){
                    return this[0].currentStyle[name];
                }else{
                    return getComputedStyle(this[0],false)[arg[0]];
                }
            }else if(typeof arg[0] === "object"){
                for(var i in arg[0]){
                    for(var j = this.length-1; j>=0; j--){
                        this[j].style[A.camelCase(i)] = arg[0][i];
                    }
                }
            }
        }else if(len === 2){
            for(var j = this.length -1; j>=0; j--){
                this[j].style[A.camelCase(arg[0])] = arg[1];
            }
        }
        return this;
    }
});

console.log(A);

A.fn.extend({
    attr:function(){
        var arg = arguments,
            len = arg.length;
        if(this.length < 1){
            return this;
        }
        if(len === 1){
            if(typeof arg[0] === 'string'){
                return this[0].getAttribute(arg[0]);
            }else if(typeof arg[0] === "object"){
                for(var i in arg[0]){
                    for(var j = this.length-1; j>=0; j--){
                        this[j].setAttribute(i,arg[0][i]);
                    }
                }
            }
        }else if(len === 2){
            for(var j = this.length -1; j>=0; j--){
                this[j].setAttribute(arg[0],arg[1]);
            }
        }
        return this;
    }
});

console.log(A.fn);

A.fn.extend({
    html : function(){
        var arg = arguments,
        len = arg.length;
        if(len===0){
            return this[0] && this[0].innerHTML;
        }else{
            for(var i=this.length-1; i>=0; i--){
                this[i].innerHTML = arg[0];
            }
        }
        return this;
    }
});

console.log(A.fn);

A('div')
.css({
    height:'30px',
    border:'1px solid #000',
    'background-color':'red'
})
.attr('class','demo')
.html('add demo text')
.on('click',function(){
    console.log('点击了');
});

console.log(A('div').css('height'));