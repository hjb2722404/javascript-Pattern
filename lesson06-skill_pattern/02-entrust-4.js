/** 
 * author:hejianbo
 * 委托模式--数据分发
*/

function doSomeThing(a){}

// 同页面多ajax请求，粗暴模式
$.get("deal.php?q=banner",function(){ doSomeThing(1)});
$.get("deal.php?q=aside",function(){ doSomeThing(2)});
$.get("deal.php?q=article",function(){ doSomeThing(3)});
$.get("deal.php?q=member",function(){ doSomeThing(4)});
$.get("deal.php?q=message",function(){ doSomeThing(5)});

// 委托模式

var Deal = {
    banner:function(){doSomeThing(1)},
    aside:function(){doSomeThing(2)},
    article:function(){doSomeThing(3)},
    member:function(){doSomeThing(4)},
    message:function(){doSomeThing(5)}
}
$.get("deal.php?",function(res){
    // 数据拆包分发
    for(var i in res){
        Deal[i] && Deal[i](res[i]);
    }
})