/** 
 * author:hejianbo
 * 委托模式
*/

// 日历的每一个日期点击时背景变灰/

// 粗暴模式
 var ul = document.getElementById('container'),
    li = document.getElementsByTagName('li'),
    i = li.length -1;
for(; i>=0; i--){
    li[i].onclick = function(){
        this.style.backgroundColor ="grey";
    }
}

// 委托模式：利用事件冒泡委托给父级容器
var ul = document.getElementById('container2');
ul.onclick = function(e){
    var e=e || window.event,
        tar = e.target || e.srcElement;
    if(tar.nodeName.toLowerCase() === 'li'){
        tar.style.backgroundColor = "grey";       
    }
}

