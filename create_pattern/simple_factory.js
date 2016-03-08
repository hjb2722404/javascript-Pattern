/**
 * Created by jianbohe on 16/3/8.
 */

//简单工厂模式 实现 登陆注册时的各类警告信息弹出框

function createPop(type, text){

    //创建一个对象,并对对象拓展属性何方法
    var o = new Object();  // 过渡对象,借用寄生模式
    o.content = text;
    o.show() = function(){

    };

    if(type == 'alert'){

    }else if(type == 'prompt'){

    }else if(type== 'confirm'){

    }

    return o;
}