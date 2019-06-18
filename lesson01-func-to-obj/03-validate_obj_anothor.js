/**
 * Created by hjb2722404 on 2016/2/29.
 */
/*
* 使用点语法来给对象添加方法
*
*调用方式：对象.方法
*
* 缺点：对象无法复用继承
* */

var CheckObject = function(){};
CheckObject.checkName = function(){
    var name = document.getElementById("name").value;
    if(!name){
        alert("请输入正确的用户名");
        return false;
    }
};
CheckObject.checkEmail = function(){
    var email = document.getElementById("email").value;
    if(!email){
        alert("请输入正确的邮箱");
        return false;
    }
};
CheckObject.checkPwd = function(){
    var pwd = document.getElementById("pwd").value;
    if(!pwd){
        alert("请输入正确的密码");
        return false;
    }
};

function checkForm(){
   CheckObject.checkName();
   CheckObject.checkEmail();
   CheckObject.checkPwd();
}

//function checkName(){
//    var name = document.getElementById("name").value;
//    if(!name){
//        alert("请输入正确的密码");
//        return false;
//    }
//}
//
//function checkEmail(){
//    var email = document.getElementById("email").value;
//    if(!email){
//        alert("请输入正确的邮箱");
//        return false;
//    }
//}
//
//function checkPwd(){
//    var pwd = document.getElementById("pwd").value;
//    if(!pwd){
//        alert("请输入正确的邮箱");
//        return false;
//    }
//}