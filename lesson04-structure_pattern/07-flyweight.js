/**
 * author:hejianbo
 */

 //享元模式

 // 新闻翻页需求的原始代码

// 新闻数据
var article = [
    // ...
];

 var dom = null,  // 缓存创建的新闻标题元素
     paper = 0, // 当前页数
     num = 5,  // 每页显示新闻数目
     i =0,  // 创建新闻元素时保存变量
     len = article.length;  // 新闻数据长度

for(; i<len; i++){
    dom = document.createElement('div');  // 创建包装新闻标题元素
    dom.innerHTML = article[i];           // 向元素中添加新闻标题
    if(i >= num){                         // 默认显示第一页
        dom.style.display = 'none';       // 超出第一页新闻隐藏
    }
    document.getElementById('container').appendChild(dom);  // 添加到页面中
}

// 下一页绑定事件
document.getElementById('next_page').onclick = function(){
    var div = document.getElementById('container').getElementsByTagName('div'),
    // 获取所有新闻标题包装元素
    j= k = n =0;    // j,k 循环变量，n是当前页显示的第一个新闻序号
    n = ++paper % Math.ceil(len / num) * num; // 获取当前页显示的第一个新闻序号
    for(;j<len;j++){
        div[j].style.display = 'none';  // 隐藏所有新闻
    }
    for(; k<5; k++){
        if(div[n+k]){
            div[n+k].style.display = 'block';  // 显示当前页新闻
        }
    }
}

//  问题：
//      所有新闻结构相同而内容不同，同时插入几百条数据会造成大量开销

// 改造：

var Flyweight = function(){
    // 已创建的元素
    var created = [];
    // 创建一个新闻包装容器
    function create(){
        var dom = document.createElement("div");
        // 将容器插入新闻列表容器中
        document.getElementById('container').appendChild(dom);
        // 缓存新创建的元素
        created.push(dom);
        return dom;
    }
    return {
        // 获取创建新闻元素方法
        getDiv : function(){
            // 如果已创建的元素小于当前页元素总个数，则创建
            if(created.length < 5){
                return create();
            }else{
                // 获取第一个元素，并插入最后面
                var div = created.shift();
                created.push(div);
                return div;
            }
        }
    }
}

var pager =0,
    num = 5,
    len = article.length;
// 添加5条新闻
for(var i=0; i< 5; i++){
    if(article[i]){
        Flyweight.getDiv().innerHTML = article[i];
    }
}

document.getElementById('next_page').onclick = function(){
    // 如果新闻内容不足5条则返回
    if(article.length <5){
        return;
    }
    var n = ++paper * num % len; // 获取当前页显示的第一个新闻序号
    j = 0;
    // 插入5条新闻
    for(;j<5;j++){
        // 如果存在第n+j条则插入
        if(article[n+j]){
            Flyweight.getDiv().innerHTML = article[n+j];
        // 否则插入起始位置第 n+j-len条---即从最后一页翻到第一页
        } else if(article[n+j-len]){
            Flyweight.getDiv().innerHTML = article[n+j-len];
        // 如果都不存在则插入空字符串
        }else{
            Flyweight.getDiv().innerHTML = "";
        }
    }    
}

// 享元模式之——享元动作

var Flyweight = {
    moveX:function(x){
        this.x = x;
    },
    moveY:function(y){
        this.y = y;
    }
}

// 让人继承移动方法
var Player = function(x,y,c){
    this.x = x;
    this.y = y;
    this.color = c;
}
Player.prototype = Flyweight;
Player.prototype.changeC = function(c){
    this.color = c;
}

// 让精灵继承移动方法
var Spirit = function(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
}
Spirit.prototype = Flyweight;
Spirit.prototype.changeR = function(c){
    this.r = r;
}

var player1 = new Player(5,6,'red');
player1.moveX(6);
player1.moveY(7);
player1.changeC('pink');


var spirit1 = new Spirit(2,3,4);
spirit1.moveX(3);
spirit1.moveY(4);
spirit1.changeR(5);