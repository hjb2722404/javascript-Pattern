/**
 * author:hejianbo
 */

 // 需求：发布简历
//      1.特长和兴趣爱好可以发布
//      2.联系信息不可以发布
//      3.工作可以分类
//      4.可添加描述信息

    // 需求分析
    //  1.创建用户信息部分需要独立处理，因为信息要隐藏
    //  2.应聘者需要独立创建，因为他们是一个整体
    //  3.工作职位需要独立创建，它们又是应聘者拥有的一部分，且分类很多
    //  4.这样每位应聘者，以及他们每个人的用户信息、工作职位等都需要创建，需要创建的东西太多

    // 实现方式： 建造者模式
    // 建造者模式与工厂模式的区别：
    //   工厂模式关心的是创建的最终结果，即对象实例或者类簇，比如一个人
    //   建造者模式关心的是创建的过程，更关注细节，比如这个人穿什么衣服，是男还是女，兴趣爱好是什么等

    // 创建一位人类
    var Human = function(param){
        // 技能
        this.skill = param && param.skill || '保密';
        // 兴趣爱好
        this.hobby = param && param.hobby || '保密';
    }

    // 人类原型方法
    Human.prototype = {
        getSkill:function(){
            return this.skill;
        },
        getHobby:function(){
            return this.hobby;
        }
    }

    // 实例化姓名类
    var Named = function(name){
        var that = this;
        // 构造器
        // 构造函数解析姓名的姓与名
        (function(name,that){
            that.wholeName = name;
            if(name.indexOf('') > -1){
                that.FirstName = name.slice(0,name.indexOf(' '));
                that.secondName = name.slice(name.indexOf(' '));
            }
        })(name,that);
    }

    // 实例化职位类
    var Work = function(work){
        var that = this;
        // 构造器
        // 构造函数中通过传入的职位特征来设置相应职位以及描述
        (function(work, that){
            switch(work){
                case 'code':
                    that.work = '工程师';
                    that.workDescript = '每天醉心于编程';
                    break;
                case 'UI':
                case 'UE':
                    that.work = '设计师';
                    that.workDescript = '设计更似一种艺术';
                    break;
                case 'teach':
                    that.work = '教师';
                    that.workDescript = '分享也是一种快乐';
                    break;
                default:
                    that.work = work;
                    that.workDescript = '对不起，我们还不清楚您所选择职位的相关描述';
            }
        })(work,that);
    }

    // 更换期望的职位
    Work.prototype.changeWork = function(work){
        this.work = work;
    }

    // 添加对职位的描述
    Work.prototype.changeDescript = function(setence){
        this.workDescript = setence;
    }

    /**
     * 应聘者建造者
     * 参数 name: 姓名（全名）
     * 参数 work: 期望职位
     */

    var Person = function(name,work){
        // 创建应聘者缓存对象
        var _person = new Human();
        // 创建应聘者姓名解析对象
        _person.name = new Named(name);
        // 创建应聘者期望职位
        _person.work = new Work(work);
        // 将创建的应聘者对象返回
        return _person;
    }

    // 测试代码

    var person = new Person('xiao ming','code');

    console.log(person.skill); //保密
    console.log(person.name.FirstName); // xiao
    console.log(person.work.work); //工程师
    console.log(person.work.workDescript); //每天醉心于编程
    person.work.changeDescript('更改一下职位描述')
    console.log(person.work.workDescript); //更改一下职位描述



