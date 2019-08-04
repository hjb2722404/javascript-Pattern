/**
 * author:hejianbo
 */

 // 状态模式

 // 超级玛丽的状态：跳跃、开枪、蹲下、奔跑、蹲下开枪，跳起开枪、移动中开枪……
 // 状态太多，如果用条件分支，则会造成无法想象的开销

 // 创建超级玛丽状态类
 var MarryState = function () {
     // 内部状态私有变量
     var _currentState = {},
     //动作与状态方法映射
        states = {
            jump : function(){
                console.log("跳跃");
            },
            move : function(){
                console.log("移动");
            },
            shoot : function(){
                console.log("射击");
            },
            squat : function(){
                console.log("蹲下");
            }
        };
    // 动作控制类
    var Action = {
        // 改变状态方法
        changeState : function(){
            // 组合多个动作通过传递多个参数实现
            var arg = arguments;
            // 重置内部状态
            _currentState = {};
            // 如果有动作则添加动作
            if(arg.length){
                // 遍历动作
                for (var i = 0; i < arg.length; i++) {
                    // 向内部状态中添加动作
                    _currentState[arg[i]] = true;
                }
            }
            //返回动作控制来
            return this;
        },
        // 执行动作
        gose : function(){
            console.log("触发一次动作");
            // 遍历内部状态保存的动作
            for(var i in _currentState){
                // 如果该动作存在则执行
                states[i] && states[i]();
            }
            return this;
        }
    }
    return {
        change : Action.changeState,
        gose : Action.gose
    }
 } 


 // 使用
 var marry = new MarryState();
 marry
    .change('jump','shoot') // 添加跳跃与射击动作
    .gose()  // 执行动作
    .gose()     // 执行动作
    .change('shoot')  // 添加射击动作
    .gose();    // 执行动作

    /* 输出：

    触发一次动作
    跳跃
    射击
    触发一次动作
    跳跃
    射击
    触发一次动作
    射击



    */