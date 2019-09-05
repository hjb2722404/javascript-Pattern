/**
 * author:hejianbo
 * 简单模板模式
 */

 var data = {
     id:'simple-data',
     type:'listPart',
     data:{
         h2:"简单模板模式",
         p : "简单模板模式未应用之前，需要大量的DOM操作",
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
// 创建视图方法集合
A.strategy = {
    // 文字列表展示---使用大量的DOM操作来创建视图
    'listPart' : function(data){
        var s = document.createElement('div'), // 模块容器
            h = document.createElement('h2'), // 标题容器
            p = document.createElement('p'), // 描述容器
            ht = document.createTextNode(data.data.h2), // 标题内容
            pt = document.createTextNode(data.data.p), // 描述内容
            ul = document.createElement('ul'), // 列表内容
            ldata = data.data.li, // 列表数据
            // li 列表项容器，strong 列表项标题， span 列表项解释, t 列表项标题内容，c 列表项解释内容
            li,strong,span,t,c;
        // 有 id 设置模块id，
        data.id && (s.id = data.id);
        s.className = "part";  // 设置模块类名
        h.appendChild(ht);  // 将标题内容放入标题容器中
        p.appendChild(pt);  // 将描述内容放入描述容器中
        s.appendChild(h);  // 将标题容器插入模块容器中
        s.appendChild(p);  // 将描述容器插入模板容器中
        // 遍历列表数据
        for(var i = 0, len = ldata.length; i< len; i++){
            li = document.createElement('li'); // 创建列表项容器
            strong = document.createElement('strong'); // 创建列表项标题容器
            span = document.createElement('span'); // 创建列表项解释容器
            t = document.createTextNode(ldata[i].strong); // 创建列表项标题内容
            c = document.createTextNode(ldata[i].span);// 创建列表项解释内容
            strong.appendChild(t);  // 向列表标题容器中插入标题内容
            span.appendChild(c);  // 向列表解释容器中插入解释内容
            li.appendChild(strong); // 向列表项中插入列表项标题
            li.appendChild(span);  // 向列表项中插入列表项解释
            ul.appendChild(li); // 向列表容器中插入列表项
        }
        s.appendChild(ul);  // 向模块中插入列表
        A.root.appendChild(s); // 展现模块
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