/**
 * Created by hjb2722404 on 2016/2/29.
 */
/*
*  使用类的方式：构造函数（使用原型对象赋值）
*
*  +返回自身
*
*  调用方式： new关键词调用-->链式调用
*
*  提示：类 ———> new
*
* */


var CheckObject = function(){};
CheckObject.prototype = {

    checkName : function(){
        var name = document.getElementById("name").value;
        if(!name){
            alert("请输入正确的用户名");
            return false;
        }
        return this;
    },
    checkEmail : function(){
        var email = document.getElementById("email").value;
        if(!email){
            alert("请输入正确的邮箱");
            return false;
        }
        return this;
    },
    checkPwd : function(){
        var pwd = document.getElementById("pwd").value;
        if(!pwd){
            alert("请输入正确的密码");
            return false;
        }
        return this;
    }

};


function checkForm(){
    var c = new CheckObject();
    c.checkName().checkEmail().checkPwd();

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