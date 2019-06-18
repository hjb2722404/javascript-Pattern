/**
 * Created by hjb2722404 on 2016/2/29.
 */

/*
*
* 用函数方法返回包装对象
*
* 调用方法：先利用函数返回一个对象，再调用该对象的方法
*
* 缺点：返回的对象与CheckObject这个对象没有关联【无法同步】
* */

var CheckObject = function(){

    return {
        checkName:function(){
            var name = document.getElementById("name").value;
            if(!name){
                alert("请输入正确的用户名");
                return false;
            }
        },
        checkEmail:function(){
            var email = document.getElementById("email").value;
            if(!email){
                alert("请输入正确的邮箱");
                return false;
            }
        },
        checkPwd:function(){
            var pwd = document.getElementById("pwd").value;
            if(!pwd){
                alert("请输入正确的密码");
                return false;
            }
        }
    };

};

function checkForm(){
    var c = CheckObject();
    c.checkName();
    c.checkEmail();
    c.checkPwd();
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