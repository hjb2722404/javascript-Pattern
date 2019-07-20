/**
 * author:hejianbo
 */

 // 需求：输入框提示变动

 // 原始代码：
    // 输入框元素
 var telInput = document.getElementById('tel_input');
    // 输入格式提示文案
 var telWarnText = document.getElementById('tel_warn_text');
    // 点击输入框显示输入框输入格式提示文案
input.onclick = function(){
    telWarnText.style.display = 'inline-block';
}

// 修改：
   // 输入框元素
   var telInput = document.getElementById('tel_input');
   // 输入格式提示文案
    var telWarnText = document.getElementById('tel_warn_text');
    //输入框提示输入文案
    var telDemoText = document.getElementById('tel_demo_text');
   // 点击输入框显示输入框输入格式提示文案
   input.onclick = function(){
        telWarnText.style.display = 'inline-block';
        telDemoText.style.display = 'none';
}

// 问题：还有其他很多输入框，难道每一个都要这样去改？
// 解决办法：使用装饰者模式

//装饰者
var decorator = function(input, fn){
    // 获取事件源
    var input = document.getElementById(input);
    // 若事件源已经绑定事件
    if(typeof input.onclick ==='function'){
        // 缓存事件源原有回调函数
        var oldClickFn = input.onclick;
        // 为事件源定义新的事件
        input.onclick = function(){
            // 事件源原有回调函数
            oldClickFn();
            // 执行事件源新增回调函数
            fn();
        }
    }else{
        // 事件源未绑定事件，直接为事件源添加新增回调函数
        input.onclick = fn;
    }
}

// 调用
//电话输入框功能修饰
decorator('tel_input',function(){
    document.getElementById('tel_demo_text').style.display = 'none';
});

// 姓名输入框功能修饰
decorator('name_input',function(){
    document.getElementById('name_demo_text').style.display = 'none';
});
// 地址输入框功能修饰
decorator('adress_input',function(){
    document.getElementById('adress_demo_text').style.display = 'none';
});