/**
 * author:hejianbo
 */

 // 需求：对不同类别广告资源进行投放
    // java: 绿色字体
    // php: 黄色字体，红色背景

    // 新增需求：javascript ,背景粉色

// 实现方式： 基类工厂模式
// 缺点：如果再有新的类型需求，还需要增加基类，修改工厂类

// 创建Java学科类
var Java = function(content){
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
}

//创建 Php 学科类
var Php = function(content){
    this.content = content;
    // (function(content){
    //     var div = document.createElement('div');
    //     div.innerHTML = content;
    //     div.style.color = 'yellow';
    //     div.style.background = "red";
    //     document.getElementById('container').appendChild(div);
    // })(content);
        console.log("color:yellow;background:red;",content);
}

// 创建 JavaScript 学科类
var JavaScript = function(content){
        this.content = content;
        //  (function(content){
                //     var div = document.createElement('div');
                //     div.innerHTML = content;
                //     div.style.background = "pink";
                //     document.getElementById('container').appendChild(div);
                // })(content);
                    console.log("background:pink;",content);
}

// 学科类工厂
function JobFactory(type,content){
        switch(type){
                case 'java':
                        return new Java(content);
                case 'php':
                        return new Php(content);
                case 'javascript':
                        return new JavaScript(content);
        }
}

JobFactory('java',"你好，java"); //color: green; 你好，java

JobFactory('php',"hello php"); //color:yellow;background:red; hello php

JobFactory('javascript',"js哪家强");//background:pink; js哪家强