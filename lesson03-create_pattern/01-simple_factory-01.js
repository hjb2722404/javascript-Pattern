/**
 * Created by jianbohe on 16/3/8.
 */

//通过类实例化对象 实现 登陆注册时的各类警告信息弹出框
// 缺点：类太多

// 用户名警示框

var LoginAlert = function(text){
    // 创建对象的安全模式
    if(this instanceof LoginAlert){
        this.text = text;        
    }else{
        return new LoginAlert(text);
    }
}

LoginAlert.prototype.show = function(){
    // alert(this.text) 浏览器环境中使用，本示例在node环境下，使用以下代码模拟
    console.log(this.text);
}

var userNameAlert = new LoginAlert('用户名不能多于16个字母或数字');
userNameAlert.show(); // 用户名不能多于16个字母或数字

// 新需求：密码错误提示框
// 可复用上面的类
var passwordAlert = new LoginAlert('输入的密码不正确');
passwordAlert.show(); //输入的密码不正确


//新需求：用户名不存在提示，并且添加注册按钮
//  由于多了注册按钮，所以上面的类无法再用，需要新建类
var LoginConfirm = function(text){
    if(this instanceof LoginConfirm){
        this.text = text;        
    }else{
        return new LoginConfirm(text);
    }
}

LoginConfirm.prototype.show = function(){
    // var r = confirm(this.text) 浏览器环境中使用，本示例在node环境下，使用以下代码模拟
    // if(r){...}else{...}
    console.log(this.text,": there is a register button");
}

var loginFailConfirm = new LoginConfirm('您的用户名不存在，请重新输入或者注册账号');
loginFailConfirm.show(); // 的用户名不存在，请重新输入或者注册账号 : there is a register button

// 新需求：登录成功提示框，除了有确认取消按钮，还要有输入框接收用户输入
// 由于新增了输入框，上面两个类都无法使用，需要新建类
var LoginPrompt = function(text){
    if(this instanceof LoginPrompt){
        this.text = text;        
    }else{
        return new LoginPrompt(text);
    }
}

LoginPrompt.prototype.show = function(){
    // var input = prompt(this.text); 浏览器环境中使用，本示例在node环境下，使用以下代码模拟
    // save(input);
    console.log(this.text,"there is buttons,","there is input");
}

var loginPrompt = new LoginPrompt('欢迎回来，请输入心情：');
loginPrompt.show(); // 欢迎回来，请输入心情： there is buttons, there is input