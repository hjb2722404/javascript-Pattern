/**
 * hejianbo
 */

 // 模板方法模式

 // 需求：各式各样的弹出框统一样式

 // 第一步：基础提示框

 // 模板类  基础提示框， data：渲染数据

 var Alert = function(data){
     //没有数据则返回，防止后面程序执行
     if(!data){
         return;
     }
     // 设置内容
     this.content = data.content;
     // 创建提示框面板
     this.panel = document.createElement('div');
     // 创建提示内容模板
     this.contentNode = document.createElement('p');
     // 创建确定按钮组件
     this.confirmBtn = document.createElement('span');
     // 创建关闭按钮组件
     this.closeBtn = document.createElement('b');

     //为提示框面板添加类
     this.panel.className = 'alert';
     // 为关闭按钮添加类
     this.closeBtn.className = 'a-close';
     // 为确定按钮添加类
     this.confirmBtn.className = 'a-confirm';
     // 为确定按钮添加文案
     this.confirmBtn.innerHTML = data.confirm || '确认';
     // 为提示内容添加文本
     this.contentNode.innerHTML = this.content;
     // 点击确定按钮执行方法，如果 data 中有 success 方法则为 success方法，否则为空函数
     this.success = data.success || function(){};
     // 点击关闭按钮执行方法
     this.fail = data.fail || function(){};
 }

 // 提示框原型方法
 Alert.prototype = {
     // 创建方法
     init : function(){
         // 生成提示框
         this.panel.appendChild(this.closeBtn);
         this.panel.appendChild(this.contentNode);
         this.panel.appendChild(this.confirmBtn);
         // 插入页面中
         document.body.appendChild(this.panel);
         // 绑定方法
         this.bindEvent();
         // 显示提示框
         this.show();
     },
     bindEvent:function(){
         var me = this;
         // 关闭按钮点击事件
         this.closeBtn.onclick = function(){
             // 执行关闭方法
             me.fail();
             // 隐藏弹层
             me.hide();
         }
         // 确定按钮点击事件
         this.confirmBtn.onclick = function(){
             // 执行关闭确认方法
             me.success();
             // 隐藏弹层
             me.hide();
         }
     },
     hide: function(){
         this.panel.style.display = 'none';
     },
     show: function(){
         this.panel.style.display = 'block';
     }
 }

 // 根据模板创建类
 // 右侧按钮提示框
 var RightAlert = function (data) {
     // 继承基本提示框构造函数
     Alert.call(this,data);
     // 为确认按钮添加right类设置位置居右
     this.confirmBtn.className = this.confirmBtn.className + ' right';
 }
 // 继承基本提示框方法
 RightAlert.prototype = new Alert();

 // 标题提示框
 var TitleAlert = function (data) {
     // 继承基本提示框构造函数
     Alert.call(this,data);
     // 设置标题内容
     this.title = data.title;
     // 创建标题组件
     this.titleNode = document.createElement('h3');
     // 标题组件中写入标题内容
     this.titleNode.innerHTML = this.title;
 }
 // 继承基本提示框方法
 TitleAlert.prototype = new Alert();
 // 对基本提示框创建方法拓展
 TitleAlert.prototype.init = function(){
     // 插入标题
     this.panel.insertBefore(this.titleNode,this.panel.firstChild);
     // 继承基本提示框 init 方法
     Alert.prototype.init.call(this);
 }
 
 // 继承类作为模板类

 //带有取消按钮的弹出框
 var CancelAlert = function (data) {
     // 继承标题提示框构造函数
     TitleAlert.call(this,data);
     // 取消按钮文案
     this.cancel = data.cancel;
     // 创建取消按钮
     this.cancelBtn = document.createElement('span');
     // 为取消按钮添加类
     this.cancelBtn.className ='cancel';
     // 设置取消按钮内容
     this.cancelBtn.innerHTML = hit.cancel || '取消';
 }
 // 继承标题提示框原型方法
 CancelAlert.prototype = new Alert();
 CancelAlert.prototype.init = function(){
     // 继承标题提示框创建方法
     TitleAlert.prototype.init.call(this);
     // 由于取消按钮要添加到末尾，所以在创建完其他组件后添加
     this.panel.appendChild(this.cancelBtn);
 }
 CancelAlert.prototype.bindEvent = function(){
     var me = this;
     // 标题提示框绑定事件方法继承
     TitleAlert.prototype.bindEvent.call(me);
     // 取消按钮绑定事件
     this.cancelBtn.onclick = function(){
         me.fail();
         me.hide();
     }
 }

 // 创建提示框

 new CancelAlert({
     title:'提示标题',
     content:'提示内容',
     success:function(){
         console.log('OK');
     },
     fail:function(){
         console.log('cancel');
     }
 }).init();