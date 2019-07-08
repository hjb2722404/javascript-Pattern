/**
 * author:hejianbo
 */

 // 单例模式：只允许实例化1次的对象类

 // 原始需求：活动页面的新闻列表中实现鼠标滑动特效

 // 小白模式：

 function g(id){
     return document.getElementById(id);
 }

 function css(id,key,value){
     g(id).style[key] = value;
 }

 function attr(id,key,value){
     g(id)[key] = value;
 }

 function html(id, value){
     g(id).innerHTML = value;
 }

 function on(id, type, fn){
     g(id)['on' + type] = fn;
 }

 // 问题：在页面中添加了很多变量，容易产生命名冲突
 // 解决方法： 使用单例模式，它常被用来定义命名空间

 var Ming = {
     g:function(id){
        return document.getElementById(id);
    },
   
     css: function(id,key,value){
        this.g(id).style[key] = value;
    },
   
     attr : function(id,key,value){
        this.g(id)[key] = value;
    },
   
     html : function(id, value){
        this.g(id).innerHTML = value;
    },
   
     on: function(id, type, fn){
        this.g(id)['on' + type] = fn;
    }
 }

 //单例模式的另一个作用是进行代码库的模块管理：

var A = {
    Util:{
        util_method1 : function(a){
            console.log('util_method_1:',a);
        },
        util_method2 : function(){
            this.util_method1('util_method_2');
        },
    },
    Tool:{
        tool_method1 : function(){
            console.log('tm_1');
        },
        tool_method2:function(){
            console.log('tm_2');
        }
    },
    Ajax:{
        get:function(){
            console.log('get from remote');
        },
        post : function(){
            console.log('post to remote');
        }
    },
    others:{}
}

A.Util.util_method2(); //util_method_1: util_method_2
A.Tool.tool_method1(); //tm_1
A.Ajax.post(); //post to remote

// 单例模式的第三个作用：管理静态变量

var Conf = (function(){
    // 私有变量
    var conf = {
        MAX_NUM :100,
        MIN_NUM :1,
        COUNT:1000
    }
    // 返回取值器对象
    return {
        get : function(name){
            return conf[name] ? conf[name] : null;
        }
    }
})();

var count = Conf.get('COUNT');
console.log(count); // 1000

// 单例的延迟创建

var LazySingle = (function(){
    // 单例实例引用
    var _instance = null;
    // 单例
    function Single(){
        // 这里定义私有属性和方法
        return {
            publicMethod : function(){
                console.log('publickMethod')
            },
            publicProperty : '1.0'
        }
    }
    // 获取单例对象接口
    return function(){
        // 如果为创建单例则创建单例
        if(!_instance){
            _instance = Single();
        }
        // 返回单例
        return _instance;
    }
})();

console.log(LazySingle().publicProperty); // 1.0