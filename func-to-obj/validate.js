/**
 * Created by hjb2722404 on 2016/2/29.
 */
/*
*
* 函数式的编程
*
* 缺点：全局变量空间污染
*
* */
function checkForm(){
    checkName();
    checkEmail();
    checkPwd();
}

function checkName(){
    var name = document.getElementById("name").value;
    if(!name){
        alert("请输入正确的用户名");
        return false;
    }
}

function checkEmail(){
    var email = document.getElementById("email").value;
    if(!email){
        alert("请输入正确的邮箱");
        return false;
    }
}

function checkPwd(){
    var pwd = document.getElementById("pwd").value;
    if(!pwd){
        alert("请输入正确的密码");
        return false;
    }
}
