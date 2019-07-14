/**author:hejianbo */

// 需求：团队原来代码都使用A框架库写的，现在为了更方便，要引入JQuery库

// 定义A框架
var A = A || {};
// 通过ID获取元素
A.g = function(id){
    return document.getElementById(id);
}

// 为元素绑定事件
A.on = function(id, type, fn){
    // 如果传递参数是字符串则以 id 处理，否则以元素对象处理
    var dom = typeof id === 'string' ? this.g(id) : id;
    // 标准DOM2级添加事件方式
    if(dom.addEventListener){
        dom.addEventListener(type,fn,false);
    }else if(dom.attachEvent){
        dom.attachEvent('on' + type, fn);
    }else{
        dom['on' + type] = fn;
    }
}

A.on(window,'load',function(){
    A.on('mybutton','click',function(){
        console.log('mybutton clicked')
    })
})

// 适配JQuery

A.g = function(id){
    return $(id).get(0);
}

A.on = function(id,type, fn){
    var dom = typeof id === 'string' ? $('#' + id) : $(id);
    dom.on(type,fn);
}

// 适配器用法二：参数适配器

function doSomeThing(name,title,age,color,size,prize){}

// 问题： 参数太多，不容易记，改进：
/**
 * obj.name:name
 * obj.title : titel
 * obj.age : age
 * obj.color : color
 * obj.size : size
 * obj.parize :prize
 */

 function doSomeThing(obj){}

 // 问题：调用时不知参数是否完整、是否有默认值，使用适配器改进：

 function doSomeThing(obj){
     var _adapter = {
         name : '名称',
         title : '设计模式',
         age : 24,
         color : 'pink',
         size : 100,
         prize : 50
     };

     for(var i in _adapter){
         _adapter[i] = obj[i] || _adapter[i];
     }
 }

 // 适配器用法三：数据适配
  var arr = ['js','book','前端','8月1日'];
  //问题 ： 语义结构不好，使用适配器改进：
  function arrToObjAdapter(arr){
      return {
          name : arr[0],
          type : arr[1],
          title : arr[2],
          date : arr[3]
      }
  }

  var adapterData = arrToObjAdapter(arr);
 console.log(adapterData);

 // 适配器用法四：服务端数据适配
 function ajaxAdapter(data){
     return [data['key1'],data['key2'],data['key3']]
 }

 $.ajax({
     url:'someAdress.php',
     success: function(data,status){
         if(data){
             doSomeThing(ajaxAdapter(data));
         }
     }
 });