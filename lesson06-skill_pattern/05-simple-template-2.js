/**
 * author:hejianbo
 * 简单模板模式
 */

 var data = {
     id:'simple-data',
     type:'listPart',
     data:{
         h2:"简单模板模式",
         p : "简单模板模式应用之后，节省DOM操作",
         li:[
             {strong:'标题一',span:"解释一"},
             {strong:'标题二',span:"解释二"},
             {strong:'标题三',span:"解释三"},
             {strong:'标题四',span:"解释四"},
             {strong:'标题五',span:"解释五"},
             {strong:'标题六',span:"解释六"},
             {strong:'标题七',span:"解释七"},
             {strong:'标题八',span:"解释八"},
         ]
     }
 };

//命名空间 单体对象
var A = A || {};
//主体展示区容器
A.root = document.getElementById('container');
// 模板渲染方法
A.fromateString = function(str,data){
    return str.replace(/\{#(\w+)#\}/g, function (match,key){
        return typeof data[key] === undefined ? '' : data[key]
    });
}
// 创建视图方法集合
A.strategy = {
    // 文字列表展示---使用大量的DOM操作来创建视图
    'listPart' : function(data){
        var s = document.createElement('div'),
            ul = '',
            ldata = data.data.li,
            // 模块模板
            tpl = [
                '<h2>{#h2#}</h2>',
                '<p>{#p#}</p>',
                '<ul>{#ul#}</ul>'
            ].join(''),
            // 列表项模板
            liTpl = [
                '<li>',
                    '<strong>{#strong#}</strong>',
                    '<span>{#span#}</span>',
                '</li>'
            ].join('');
            // 有id则设置模块id
            data.id && (s.id = data.id);
            // 遍历列表数据
            for(var i = 0, len = ldata.length; i<len; i++){
                // 如果有列表项数据
                if(ldata[i].em || ldata[i].span){
                    ul += A.fromateString(liTpl,ldata[i]);
                }
            }
            // 装饰列表数据
            data.data.ul = ul;
            // 渲染模块并插入模块中
            s.innerHTML = A.fromateString(tpl,data.data);
            // 渲染模块
            A.root.appendChild(s);
    },
    'codePart' : function(){},
    'onlyTitle' : function(){},
    'guide' : function(){}
}
// 创建视图入口
A.init = function(data){
    // 根据传输的视图类型创建视图
    this.strategy[data.type](data);
}

A.init(data);