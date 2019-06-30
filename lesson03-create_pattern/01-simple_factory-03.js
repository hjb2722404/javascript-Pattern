/**
 * Created by jianbohe on 16/3/8.
 */

//简单工厂模式 实现 登陆注册时的各类警告信息弹出框

function createPop(type, text){

    //创建一个对象,并对对象拓展属性何方法
    var o = new Object();  // 过渡对象,借用寄生模式
    o.content = text;
    o.show = function(){
        console.log(o.content);
        o.showDiffrent();
    };

    if(type == 'alert'){
        o.showDiffrent=function(){
            //donothing
        }
    }else if(type == 'prompt'){
        o.showDiffrent=function(){
            console.log("there is buttons,","there is input");
        }
    }else if(type== 'confirm'){
        o.showDiffrent=function(){
            console.log("there is a register button");
        }
    }

    return o;
}

var passwordAlert = new createPop('alert','输入的密码不正确');
passwordAlert.show(); //输入的密码不正确

var loginFailConfirm = new createPop('confirm','您的用户名不存在，请重新输入或者注册账号');
loginFailConfirm.show(); //您的用户名不存在，请重新输入或者注册账号,there is a register button

var loginPrompt = new createPop('prompt','欢迎回来，请输入心情：');
loginPrompt.show(); //欢迎回来，请输入心情：there is buttons, there is input