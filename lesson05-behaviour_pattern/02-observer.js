/**
 * author：hejianbo
 */

 // 观察者模式

 // 将观察者放在闭包中，当页面加载就立即执行
 var Observer = (function(){
    // 防止消息队列暴露而被篡改故将消息容器作为静态私有变量保存
    var __messages = {};
    return {
        // 注册信息接口
        regist : function(type,fn){
            // 如果此消息不存在则应创建一个该消息类型
            if(typeof __messages[type] === "undefined"){
                // 将动作推入到该消息对应的动作执行队列中
                __messages[type] = [fn];
            }else{
                // 将动作推入该消息对应的动作执行序列中
                __messages[type].push(fn);
            }
        },
        // 发布消息接口
        fire : function(type,args){
            // 如果该消息没有被注册，则返回
            if(!__messages[type]){
                return;
            }
            // 定义消息信息
            var events = {
                type : type, //消息类型
                args : args || {} // 消息携带数据
            },
            i = 0,
            len = __messages[type].length;
            // 遍历消息动作
            for(; i<len; i++){
                // 依次执行注册的消息对应的动作序列
                __messages[type][i].call(this, events);
            }
        },
        // 移除信息接口
        remove : function(type,fn){
            // 如果消息队列存在
            if(__messages[type] instanceof Array){
                // 从最后一个消息动作遍历
                var i = __messages[type].length -1; 
                for(; i>=0; i--){
                    // 如果存在该动作则在消息动作序列中移除响应动作
                    __messages[type][i] === fn && __messages[type].splice(i,1);
                }
            }
        },
    }
 })();

 // 简单使用

 Observer.regist('test',function(e){
     console.log(e.type, e.args.msg);
 });

 Observer.fire('test',{msg:'传递参数'});

// 正式使用

// 外观模式 简化获取元素
function $(id) {
    return document.getElementById(id);    
}
// 工程师A 代码
(function () {
    // 追加一则消息
    function addMsgItem(e) {
        var text = e.args.text,  // 获取消息中用户添加的文本内容
            ul = $("msg"),  // 留言容器元素
            li = document.createElement('li'),  // 创建内容容器元素
            span = document.createElement('span'); // 删除按钮
            li.innerHTML =  text; // 写入评论
            // 关闭按钮
            span.onclick = function(){ 
                ul.removeChild('li'); // 移除留言
                // 发布删除留言消息
                Observer.fire('removeCommentMessage',{
                    num : -1
                });
            }
            // 添加删除按钮
            li.appendChild(span);
            // 添加留言节点
            ul.appendChild(li);
    }
    // 注册添加评论信息
    Observer.regist('addCommentMessage',addMsgItem);
})();

// 工程师B 代码
(function(){
    // 更改用户消息数目
    function changeMsgNum(e) {
        // 获取需要增加的用户消息数目
        var num = e.args.num;
        // 增加用户消息数目并写入页面中
        $('msg_num').innerHTML = parseInt($('msg_num').innerHTML) + num;
    }
    // 注册添加评论信息
    Observer
        .regist('addCommentMessage',changeMsgNum)
        .regist('removeCommentMessage',changeMsgNum);
})();


// 工程师C 代码
(function(){
    // 用户点击提交按钮
    $('user_submit').onclick = function(){
        // 获取用户输入框中输入的信息
        var  text = $('user_input');
        // 如果消息为空则提交失败
        if(text.value === ''){
            return;
        }
        // 发布一则评论信息
        Observer.fire('addCommentMessage',{
            text:text.value,   // 消息评论内容
            num : 1             // 消息评论数目
        });
        text.value = '';        // 将输入框置为空
    }
})();