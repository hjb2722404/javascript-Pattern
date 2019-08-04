/**
 * hejianbo
 */

 // 模板方法模式

 // 创建多类导航，第一类是基础的，第二类是多了消息提醒功能，第三类是多了后面显示网址功能的

// 格式化字符串方法

function fromateString(str,data){
    return str.replace(/\{#(\w+)#\}/g,function(match,key){return typeof data[key] === undefined ? '' : data[key]});
}
// 基础导航
var Nav = function (data) {
    // 基础导航样式模板
    this.item = '<a href="{#href#}" title="{title}">{#name#}</a>';
    // 创建字符串
    this.html = '';
    // 格式化数据
    for(var i=0,len = data.length;i<len;i++){
        this.html += fromateString(this.item,data[i]);
    }
    // 返回字符串数据
    return this.html;
}

// 带有消息提醒信息的导航
var NumNav = function (data) {
    // 消息提醒信息组件模板
    var tpl = '<b>{#num#}</b>';
    // 装饰数据
    for(var i= data.length -1; i>=0; i--){
        data[i].name += data[i].name + fromateString(tpl,data[i]);
    }
    // 继承基础导航类，并返回字符串
    return Nav.call(this,data);
}

// 带有链接地址的导航
var LinkNav = function (data) {
    // 链接地址模板
    var tpl = '<span>{#link#}</span>';
    // 装饰数据
    for(var i= data.length -1;i>=0; i--){
        data[i].name += data[i].name + fromateString(tpl,data[i]);
    }
    // 继承继承导航类，并返回字符串
    return Nav.call(this,data);
}

// 创建导航

// 获取导航容器
var nav = document.getElementById('content');
// 添加内容
nav.innerHTML = NumNav([
    {
        href : 'http://www.baidu.com',
        title:'百度一下',
        name:'百度',
        num:'10'
    },
    {
        href : 'http://www.taobao.com',
        title:'淘宝商城',
        name:'淘宝',
        num:'2'
    },
    {
        href : 'http://www.qq.com',
        title:'腾讯首页',
        name:'腾讯',
        num:'3'
    },
]);
