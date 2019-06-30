/**
 * Created by jianbohe on 16/3/8.
 */

//简单工厂模式 实现 运动工厂

// 篮球基类
var Basketball = function(){
    this.intro = '篮球盛行于美国';
}
Basketball.prototype = {
    getMember:function(){
        console.log("每个队伍有需要5名球员");
    },
    getBallSize:function(){
        console.log('篮球很大');
    }
};

// 足球基类
var Football = function(){
    this.intro = '足球在全世界范围内流行';
}
Football.prototype = {
    getMember:function(){
        console.log("每个队伍有需要11名球员");
    },
    getBallSize:function(){
        console.log('足球较大');
    }
};

// 网球基类
var Tennis = function(){
    this.intro = '每年有很多网球比赛';
}
Tennis.prototype = {
    getMember:function(){
        console.log("每个队伍有需要1名球员");
    },
    getBallSize:function(){
        console.log('网球很小');
    }
};

// 运动工厂
var SprotsFactory = function(name){
    switch(name){
        case 'NBA':
            return new Basketball();
        case 'wordCup':
            return new Football();
        case 'FrenchOpen':
            return new  Tennis();
    }
}

// 为世界杯创建一个足球，只需要记住运动工厂 SportsFactory, 调用并创建
var football = SprotsFactory("wordCup");
console.log(football); //{ intro: '足球在全世界范围内流行' },添加到原型上的方法不会再实例中显示
console.log(football.intro); //足球在全世界范围内流行
football.getMember(); //每个队伍有需要11名球员