/**
 * Created by jianbohe on 16/3/8.
 */
//多继承  属性复制

var mix = function(){
    var i = 1,                   //从第二个参数起为被继承的对象
        len = arguments.length,  //获取参数长度
        target = arguments[0],   //第一个参数为目标对象
        arg;                     //缓存参数对象

    for(; i < len; i++){
        //缓存当前对象
        arg = arguments[i];

        //遍历被继承的对象中的属性
        for(var property in arg){
            target[property] = arg[property];
        }
    }
    //返回目标对象
    return target;
};

//将该方法绑定到对象原型上,这样所有对象就可以直接拥有此方法

Object.prototype.mix = function(){
    var i = 0,                   //从第一个参数起为被继承的对象
        len = arguments.length,  //获取参数长度
        arg;                     //缓存参数对象

    for(; i < len; i++){
        //缓存当前对象
        arg = arguments[i];

        //遍历被继承的对象中的属性
        for(var property in arg){
            this[property] = arg[property];
        }
    }

};

var book1 = {
    name:'js',
    price:30
};

var book2 = {
    color:'red',
    ISBN: 11111111
};

var otherBook = {
    author:'me'
};

otherBook.mix(book1,book2);

console.log(otherBook);

