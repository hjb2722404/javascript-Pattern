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
    



})(window);