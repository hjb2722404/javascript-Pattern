/**
 * A Library v1.0.0
 * 
 * Author: zhangrongming
 * Date:2014-11-30
 * 
 */
~(function(window){
    /**
     * 框架单体对象A
     * @param {*} selector 选择器或页面加载回调函数
     * @param {*} context  查找元素上下文
     */
    var A = function(selector,context){
        // 如果selector 为方法则为窗口添加页面加载完成事件监听
        if(typeof selector == "function"){
            A(window).on('load',selector)
        }else{
            // 创建A对象
            return new A.fn.init(selector,context);
        }
    }
    // 原型方法
    A.fn = A.prototype = {
        // 强化构造函数
        constructor : A,
        // 构造函数
        init : function(selector,context){
            // modify 选择器为元素
            if(typeof selector === "object"){
                this[0] = selector;
                this.length = 1;
                return this;
            }
            // 设置获取到的元素长度属性
            this.length = 0,
            // 矫正上下文
            context = document.getElementById(context) || document;
            // 如果是ID选择器
             //~ 和 indexOf() 一起可以将结果强制类型转换（实际上仅仅是转换）为真 / 假值，下同
            if(~selector.indexOf('#')){
                this[0] = document.getElementById(selector.slice(1));
                this.length = 1;
                // 如果是类选择器
            }else if(~selector.indexOf('.')){
                var doms = [],
                    classname = selector.slice(1);
                    // 支持通过类获取元素的方法
                    if(context.getElementsByClassName){
                        doms = context.getElementsByClassName(classname);
                    }else{
                        doms = context.getElementsByTagName('*');
                    }
                    // 设置获取到的元素
                    for(var i = 0, len = doms.length;i<len; i++){
                        if(doms[i].className && !!~doms[i].className.indexOf(classname)){
                            this[this.length] = doms[i];
                            // 矫正长度
                            this.length++;
                        }
                    }
                    // 否则为元素名选择器
                } else {
                    var doms = context.getElementsByTagName(selector),
                        i = 0, 
                        len = doms.length;
                        for(;i<len; i++){
                            this[i] = doms[i];
                        }
                        this.length = len;
                }
                // 设置当前对象的选择上下文
                this.context = context;
                // 设置当前对象的选择器
                this.selector = selector;
                return this;
        },
        length:0,
        // 增强数组
        push:[].push,
        splice:[].splice
    }
    // 设置构造函数原型
    A.fn.init.prototype = A.fn;
    
    /**
     * @name 对象扩展方法
     * @param[0]  目标对象
     * @param[1,...]  拓展对象
     */
    A.extend = A.fn.extend = function(){
        var i = 1,
            len = arguments.length,
            target = arguments[0],
            j;
        // 如果只有一个参数，则为当前对象拓展方法
        if(i == len){
            target = this;
            i--;
        }
        // 遍历拓展对象
        for(; i < len; i++){
            // 遍历拓展对象中的方法与属性
            for(j in arguments[i]){
                // 浅复制
                target[j] = arguments[i][j];
            }
        }
        return target;
    };
    // 单体对象A方法拓展
    A.extend({
        /**
         * 将横线式命名字符串转化为驼峰式
         * @param {} str 待转换字符串
         * eg:'test-demo' -> 'testDemo'
         */
        camelCase :function(str){
            return str.replace(/\-(\w)/g, function(match,letter){
                return letter.toUpperCase();
            });
        },
        /**
         * 去除字符串两端空白符
         * @param {*} str 待处理字符串
         */
        trim :function(str){
            return str.replace(/^\s+|\s+$/g, '');
        },
        /**
         * 创建一个元素并包装成A对象
         * @param {*} type  元素类型
         * @param {*} value  元素属性对象
         */
        create :function(type,value){
            var dom = document.createElement(type);
            return A(dom).attr(value);
        },
        /**
         * 格式化模板
         * @param {*} str 模板字符串
         * @param {*} data  渲染数据
         */
        fromateString:function(str,data){
            var html = '';
            // 如果渲染数据是数组，则遍历数组并渲染
            if(data instanceof Array){
                for(var i=0,len=data.length;i<len; i++){
                    html += arguments.callee(str,data[i]);
                }
                return html;
            }else{
                // 搜索 {#key#} 格式字符串，并在data中查找对应的key属性替换
                return str.replace(/\{#(\w+)#\}/g,function(match,key){
                    return typeof data === 'string' ? data : (typeof data[key] ==='undefined' ? '' : data[key]);
                });
            }
        }
    });
    // 事件绑定私有方法
    var _on = (function(){
        // 标准浏览器
        if(document.addEventListener){
            return function(dom,type,fn,data){
                dom.addEventListener(type,function(e){
                    fn.call(dom,e,data);
                },false);
            }
            // IE浏览器
        }else if(document.attachEvent){
            return function(dom,type,fn,data){
                dom.attachEvent('on'+type,function(e){
                    fn.call(dom,e,data);
                });
            }
        }else{
            // 老版本浏览器
            return function(dom,type,fn,data){
                dom['on' + type] = function(e){
                    fn.call(dom,e,data);
                }
            }
        }
    })();

    A.fn.extend({
        // 添加事件
        on : function(type,fn,data){
            var i = this.length;
            for(;--i>=0;){
                // 通过闭包实现对i变量的保存
                _on(this[i],type,fn,data);
            }
            return this;
        },
        // 设置或者获取元素样式
        css : function(){
            var arg = arguments,
                len = arg.length;
            // 如果无获取到的元素，则放回
            if(this.length < 1){
                return this;
            }
            // 如果只有一个参数
            if(len === 1){
                // 如果该参数为string类型则返回获取到的【第一个】元素的样式
                if(typeof arg[0] === 'string'){
                    // 如果是IE浏览器
                    if(this[0].currentStyle){
                        return this[0].currentStyle[name];
                    }else{
                        // 其他浏览器
                        return getComputedStyle(this[0],false)[name];
                    }
                    // 如果参数为对象，则为获取到的所有元素设置样式
                }else if(typeof arg[0] === 'object'){
                    for(var i in arg[0]){
                        for(var j = this.length -1; j>=0; j--){
                            this[j].style[A.camelCase(i)] = arg[0][i];
                        }
                    }
                }
                // 如果是两个参数
            } else if(len === 2){
                // 为获取到的所有元素设置样式
                for(var j = this.length -1; j>=0; j--){
                    this[j].style[A.camelCase(arg[0])] = arg[1];
                }
            }
            return this;
        },
        // 设置或者获取元素属性
        attr : function(){
            var arg = arguments,
                len = arg.length;
            // 如果无获取到的元素，则返回
            if(this.length < 1){
                return this;
            }
            // 如果只有一个参数
            if(len === 1){
                // 如果参数是string类型，则返回获取到的第一个元素的属性值
                if(typeof arg[0] === 'string'){
                    return this[0].getAttribute(arg[0]);
                    // 如果参数为对象，则为所有获取到的元素设置属性
                }else if(typeof arg[0] === 'object'){
                    for(var i in arg[0]){
                        for(var j = this.length -1; j>=0; j--){
                            this[j].setAttribute(i,arg[0][i]);
                        }
                    }
                }
                // 如果是两个参数
            }else if(len === 2){
                // 为获取到的所有元素设置属性
                for(var j = this.length -1; j>=0; j--){
                    this[j].setAttribute(arg[0],arg[1]);
                }
            }
            return this;
        },
        // 获取或者设置元素内容
        html : function(){
            var arg = arguments,
                len = arg.length;
            // 如果无获取到的元素，则返回
            if(this.length < 1){
                return this;
            }
            // 如果无参数，则返回获取到的第一个元素内容
            if(len === 0){
                return this[0].innerHTML;
                // 如果是一个参数，则设置获取到的所有元素内容
            }else if(len === 1){
                for(var i=this.length-1;i>=0; i--){
                    this[i].innerHTML = arg[0];
                }
                // 如果有两个参数，且第二个参数值为true，则为获取到的所有元素追加内容
            }else if(len === 2 && arg[1]){
                for(var i=this.length-1;i>=0; i--){
                    this[i].innerHTML += arg[0];
                }
            }
            return this;
        },
        // 判断类是否存在
        hasClass : function(val){
            if(!this[0]){
                return;
            }
            var value = A.trim(val);
            return this[0].className&&this[0].className.indexOf(value) >=0 ? true:false;
        },
        // 添加类
        addClass : function(val){
            var value = A.trim(val),
                str = '';
                // 遍历所有获取到的元素
            for(var i = 0, len = this.length; i < len; i++){
                //获取当前元素的类名
                str = this[i].className;
                // 如果当前元素类名不包含参数中的类名，则为它添加之
                if(!~str.indexOf(value)){
                    this[i].className += ' ' +value;
                }
            }
            return this;
        },
        // 移除类名
        removeClass : function(val){
            var value = A.trim(val),
                classNameArr,
                result;
                // 遍历所有获取到的元素
            for (var i =0,len=this.length;i<len;i++){
                // 如果当前元素有设置类名，并且类名包含了传入的参数中的类名
                if(this[i].className && ~this[i].className.indexOf(value)){
                    // 以空格分割当前类名为数组
                    classNameArr = this[i].className.split(' ');
                    result = '';
                    // 遍历数组，并重新组合类名，过程中剔除参数传入的类名
                    for(var j= classNameArr.length-1;j>=0;j--){
                        classNameArr[j] = A.trim(classNameArr[j]);
                        result += classNameArr[j] && classNameArr[j] !== value ? ' ' +classNameArr[j] : '';
                    }
                    this[i].className = result;
                }
            }
        },
        // 插入元素
        // parent:父元素
        appendTo : function(parent){
            var doms = A(parent);
            if(doms.length){
                // 遍历子元素
                for(var j = this.length-1;j>=0; j--){
                    // 简化元素克隆操作，只向第一个父元素中插入子元素
                    doms[0].appendChild(this[j]);
                }
            }
        }

    });
    // 运动框架单体对象
    var Tween = {
        // 计时器句柄
        timer : 0,
        // 运动成员队列
        queen : [],
        // 运动间隔（按每秒60帧，最小间隔为16.7ms）
        intervar : 16,
        // 缓冲函数（反映速度的变化过程）
        easing : {
            // 默认匀速运动
            def : function(time,startValue,changeValue,duration){
                return changeValue * time /duration + startValue;
            },
            // 缓慢结束，三次方减速
            easeOutQuart : function(time,startValue,changeValue,duration){
                return -changeValue * ((time=time/duration-1)*time*time*time-1)+startValue;
            }
        },
        //添加运动成员
        add : function(instance){
            this.queen.push(instance);
            this.run();
        },
        // 停止框架运行
        clear : function(){
            clearInterval(this.timer);
            this.timer = 0;
        },
        // 开始运行框架
        run : function(){
            if(this.timer){
                return;
            }
            this.clear();
            this.timer = setInterval(this.loop,this.intervar);
        },
        // 运动框架循环方法
        loop:function(){
            // 如果运动队列中没有成员，则停止框架运行，并返回
            if(Tween.queen.length === 0){
                Tween.clear();
                return;
            }
            // 获取当前时间
            var now = +new Date();
            // 遍历运动成员
            for(var i = Tween.queen.length-1; i >= 0; i--){
                // 获取当前成员
                var instance = Tween.queen[i];
                // 当前成员已运动时间
                instance.passed = now - instance.start;
                // 如果当前成员已运动时间小于目标时间
                if(instance.passed < instance.duration){
                    // 继续运动
                    Tween.workFn(instance);
                    // 否则停止运动
                }else{
                    Tween.endFn(instance);
                }
            }
        },
        // 成员运动方法
        workFn : function(instance){
            // 获取当前成员在当前时刻下的运动进程（即下一个目标位置）
            instance.tween = this.easing[instance.type](instance.passed,instance.from,instance.to - instance. from,instance.duration);
            // 执行运动
            this.exec(instance);
        },
        // 成员运动结束方法
        endFn : function(instance){
            // 已运动时间设置为目标时间
            instance.passed = instance.duration;
            // 当前位置设置为目标位置
            instance.tween = instance.to;
            // 最后执行一遍
            this.exec(instance);
            // 销毁运动成员
            this.distory(instance);
        },
        // 执行运动方法
        exec: function(instance){
            try{
                //执行当前成员主函数
                instance.main(instance.dom)
            }catch(e){}
        },
        // 销毁运动成员
        distory: function(instance){
            // 执行成员结束方法
            instance.end();
            // 从队列中去除当前运动成员
            this.queen.splice(this.queen.indexOf(instance),1);
            // 遍历成员属性，删除
            for(var i in instance){
                delete instance[i];
            }
        }
    }
    // 获取当前成员在运动成员队列中发位置
    Tween.queen.indexOf = function(){
        var that = this;
        return Tween.queen.indexOf || function(instance){
            for(var i=0, len=that.length;i<len;i++){
                if(that[i] === instance){
                    return i;
                }
            }
            return -1;
        }
    }();
    // 为A.fn拓展动画模块
    A.fn.extend({
        // obj：动员成员对象
        animate: function(obj){
            // 适配运动对象，补充默认参数
            var obj = A.extend({
                duration:400, // 目标运行时间
                type: 'def', // 动画缓动类型
                from:0, // 开始点
                to:1, // 结束点
                start : +new Date(), // 开始时间
                dom : this, // 当前运动元素
                main : function(){}, // 运行主函数
                end : function(){} // 结束方法
            },obj);
            // 向运动框架中载入运动成员对象
            Tween.add(obj);
        }
    });
    // 避免框架别名冲突
    // library:其它框架
    A.noConflict = function(library){
        // 如果传递其它框架
        if(library){
            // 为传入框架绑定$别名
            window.$ = library;
            // 否则删除$别名
        }else{
            window.$ = null;
            delete window.$;
        }
        return A;
    }
    // 为全局对象绑定A框架，并绑定别名$
    window.$ = window.A = A;

})(window);