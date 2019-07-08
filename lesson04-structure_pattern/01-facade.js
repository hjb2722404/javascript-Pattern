/**
 * author:hejianbo
 */

// 需求：为页面文档对象绑定click事件,用来隐藏提示框

// 简单实现:

document.onclick = function(e){
    e.preventDefault();
    if(e.target !== document.getElementById('myinput')){
        hidePageAlert()
    }
} 

function hidePageAlert(){
    console.log('提示框隐藏了');
}

// 问题1：onclick为DOM0级事件，容易被其他人相同事件的绑定所覆盖
// 解决：使用DOM2级事件来绑定，即 addEventListener , 但是IE9以下不支持，它们只支持 attachEvent ，
//        如果某些浏览器不支持 DOM2 级事件，则只能使用 DOM0 级的 onclick实现

// 问题2： e.preventDefault() 和 e.target 在IE低版本中存在兼容性问题
// 解决： 使用外观模式

// 兼容方式

// 解决问题1，外观模式实现
function addEvent(dom,type,fn){
    // 对于支持 DOM2 级事件处理程序 addEventListener 方法的浏览器
    if(dom.addEventListener){
        dom.addEventListener(type, fn, false);
    // 对于不支持 addEventListener 方法但支持 attachEvent 方法的浏览器
    } else if(dom.attachEvent) {
        dom.attachEvent('on' + type, fn);
    // 对于不支持以上两种方式的浏览器
    } else{
        dom['on' + type] = fn;
    }
}

// 解决问题2，外观模式实现

// 获取事件对象
var getEvent = function(event){
    // 标准浏览器返回 event , IE 下 window.event
    return event || window.event;
}

// 获取元素
 var getTarget = function(event){
     var event = getEvent(event);
     // 标准浏览器下返回 event.target , IE 下 event.srcElement
     return event.target || event.srcElement;
 }

 // 阻止默认行为
 var preventDefault = function(event){
     var event = getEvent();
     //标准浏览器
     if(event.preventDefault){
         event.preventDefault();
         // IE
     } else {
         event.returnValue = false;
     }
 }

addEvent(document,'click',function(){
    preventDefault(e);
    if(getTarget(e) !== document.getElementById('myinput')){
        hidePageAlert();
    }
});

// 外观模式的另一个作用：小型代码库中用来封装多个功能，简化底层操作方法
// 这里外观模式与单例模式实现了类似的作用，但切入角度不同，一个是利用命名空间做模块管理，一个是强调统一封装的外观
// 简约版属性样式方法库
var A = {
    //通过 id 获取元素
    g: function(id){
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

A.css('box','background','red');
A.attr('box','className','box');
A.html('box','这是新添加的内容');
A.on('box','click',function(){
    A.css('box','width','500px');
});