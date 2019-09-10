/**
 * author:hejianbo
 * 同步模块模式
 */

 // 模块化开发

 // 定义模块管理器单体对象
  
 var F = F || {};

 /*
  * 定义模块方法（理论上，模块方法应该放在闭包中实现，可以隐蔽内部信息，这里我们为让读者能够看明白，我们忽略此步骤）
  * @param {*} str 模块路由
  * @param {*} fn 模块方法
  */
 F.define = function(str,fn){
     // 解析模块路由
     var parts = str.split('.'),
        // old为当前模块的祖父模块，parent为当前模块的父模块
        // 如果在闭包中，为了屏蔽对模块直接访问，建议将模块添加给闭包内部的私有变量
         old = parent = this,
         // i 模块当前层级，len 模块层级长度
         i = len = 0; 
        // 如果第一个模式是模块管理器单体对象，则移除
      if(parts[0] === 'F'){
          parts = parts.slice(1);
      }   
      // 屏蔽对define 与 module 模块方法的重写
      if(parts[0] === 'define' || parts[0] === 'module'){
          return;
      }
      // 遍历路由模块并定义每层模块
      for(len=parts.length;i<len;i++){
          // 如果父模块中不存在当前模块
          if(typeof parent[parts[i]] === 'undefined'){
              // 声明当前模块
              parent[parts[i]] ={};
          }
          // 缓存下一层级的祖父模块
          old = parent;
          // 缓存下一层级的父模块
          parent = parent[parts[i]];
      }
      // 如果给定模块方法则定义该模块方法
      if(fn){
          // 此时 i 等于parts.length,故减一
          old[parts[--i]] = fn();
      }
      // 返回模块管理器单体对象
      return this;
 }

 // 创建模块

 // F.string 模块
 F.define('string',function(){
     // 接口方法
     return {
         // 清除字符串两边空白
         trim: function(str){
             return str.replace(/^\s+|\s+$/g,'');
         }
     }
 });

//  // 测试
//  var a = F.string.trim('    测试用例。 ');
//  console.log('a: ', a);

 F.define('dom',function(){
     var $ = function(id){
         $.dom = document.getElementById(id);
         return $;
     }
     $.html = function(html){
         if(html){
             this.dom.innerHTML = html;
             return this;
         }else{
             return this.dom.innerHTML;
         }
     }
     return $;
 });

 F.define('dom.addClass');
 F.dom.addClass = function(type,fn){
     return function(className){
         if(!~this.dom.className.indexOf(className)){
             this.dom.className += ' ' + className;
         }
     }
 }();
 
 // 模块调用方法
 F.module = function(){
     var args = [].slice.call(arguments),
         fn = args.pop(),
         parts = args[0] && args[0] instanceof Array ? args[0] :args,
         modules = [],
         modIDs = '',
         i=0,
         ilen = parts.length,
         parent,j,jlen;
     while(i<ilen){
         if(typeof parts[i] === 'string'){
             parent =this;
             modIDs = parts[i].replace(/^F\./,'').split('.');
             for(j=0,jlen=modIDs.length;j<jlen;j++){
                 parent = parent[modIDs[j]] || false;
             }
             modules.push(parent);
         }else{
             modules.push(parts[i]);
         }
         i++;
     }
     fn.apply(null,modules);
 }
