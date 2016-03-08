/**
 * Created by jianbohe on 16/3/8.
 */

// 单继承,属性复制[浅复制,只能复制值类型的属性]

var extend =function(target, source){
  //遍历源对象中的属性
    for(var property in source){
        //将源对象中的属性复制到目标对象中
        target[property] = source[property];
    }

    //返回对象
    return target;
};

var book ={
    name : 'JavaScript设计模式',
    alike : ['css','html','javascript']
};

var anotherBook = {
    color : 'blue'
};

extend(anotherBook,book);

console.log(anotherBook.name);
console.log(anotherBook.alike);

anotherBook.alike.push('ajax');
anotherBook.name = '设计模式';

console.log(anotherBook.name);
console.log(anotherBook.alike);

console.log(book.name);
console.log(book.alike);