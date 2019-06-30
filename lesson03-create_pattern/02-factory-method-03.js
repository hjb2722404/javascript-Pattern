/**
 * author:hejianbo
 */

 // 需求：对不同类别广告资源进行投放
    // java: 绿色字体
    // php: 黄色字体，红色背景

    // 新增需求：javascript ,背景粉色

    // 再次新增需求： UI，红色边框

// 实现方式： 工厂方法模式
// 将实际创建对象的工作推迟到子类当中
// 核心类是抽象类
// 采用安全模式类
// 将创建对象的基类放在工厂方法类的原型中

// 安全模式穿件的工厂类
var Factory = function(type,content){
        if(this instanceof Factory){
                var s = new this[type](content);
                return s;
        }else{
                return new Factory(type, content);
        }
}

// 工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
        Java : function(content){
                // 将内容保存在content里以备日后使用
                this.content = content;
                //以下代码浏览器配合html页面使用
                // 创建对象时，听过闭包，立即执行，将内容按需求的样式插入到页面内
                // (function(content){
                //     var div = document.createElement('div');
                //     div.innerHTML = content;
                //     div.style.color = 'green';
                //     document.getElementById('container').appendChild(div);//浏览器配合html页面使用
                // })(content);
                    // 以下为node环境模拟代码，不需要html页面
                    console.log( "color: green;", content);
        },
        //创建 Php 学科类
         Php : function(content){
                this.content = content;
                // (function(content){
                //     var div = document.createElement('div');
                //     div.innerHTML = content;
                //     div.style.color = 'yellow';
                //     div.style.background = "red";
                //     document.getElementById('container').appendChild(div);
                // })(content);
                console.log("color:yellow;background:red;",content);
        },

        // 创建 JavaScript 学科类
        JavaScript : function(content){
                this.content = content;
                //  (function(content){
                //     var div = document.createElement('div');
                //     div.innerHTML = content;
                //     div.style.background = "pink";
                //     document.getElementById('container').appendChild(div);
                // })(content);
                console.log("background:pink;",content);
        },
        
        // 创建UI 学科类
        UI : function(content){
                this.content = content;
                //  (function(content){
                //     var div = document.createElement('div');
                //     div.innerHTML = content;
                //     div.style.borderColor = "red";
                //     document.getElementById('container').appendChild(div);
                // })(content);
                console.log("border-color:red;",content);
        }

}


var data = [
        {type:'JavaScript',content:'js哪家强'},
        {type:'Java',content:'java哪家强'},
        {type:'Php',content:'php哪家强'},
        {type:'UI',content:'ui哪家强'},
        {type:'UI',content:'ui哪家好'},
        {type:'JavaScript',content:'js哪家好'},
        {type:'JavaScript',content:'js哪家牛'}
];

for(var i=6; i>=0; i--){
        Factory(data[i].type,data[i].content);
}

/** 输出：
 * background:pink; js哪家牛
background:pink; js哪家好
border-color:red; ui哪家好
border-color:red; ui哪家强
color:yellow;background:red; php哪家强
color: green; java哪家强
background:pink; js哪家强
 */