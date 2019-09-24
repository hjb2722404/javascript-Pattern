/**
 * author:hejianbo
 * MVC模式
 */

 // 为简化页面操作逻辑，这里引用链模式中实现的A框架，具体方法参考附录A
 // 页面加载后创建MVC对象
 $(function(){
     // 初始化MVC对象
     var MVC = MVC || {};
     // 初始化MVC数据模型层
     MVC.model = function() {
         // 内部数据对象
         var M = {};
         // 服务器端获取的数据，通常通过Ajax获取并存储，后面的案例为简化实现，直接作为同步数据写在页面中，减少服务端异步请求操作
         M.data = {
             slideBar : [
                 {
                     text :'萌妹子',
                     icon :'left_meng.png',
                     title:'喵耳萝莉的千本樱',
                     content:'自古幼女有三好',
                     img:'left_meng_img.jpg',
                     href:'http://moe.hao123.com'
                 },
                 {
                     text :'动漫',
                     icon :'left_comic.png',
                     title:'喵耳萝莉的千本樱',
                     content:'自古幼女有三好',
                     img:'left_comic_img.jpeg',
                     href:'http://moe.hao123.com'
                 },
                 {
                     text :'lol直播',
                     icon :'left_lol.png',
                     title:'喵耳萝莉的千本樱',
                     content:'自古幼女有三好',
                     img:'left_lol_img.jpeg',
                     href:'http://moe.hao123.com'
                 },
                 {
                     text :'网络剧',
                     icon :'left_tv.png',
                     title:'喵耳萝莉的千本樱',
                     content:'自古幼女有三好',
                     img:'left_tv_img.jpeg',
                     href:'http://moe.hao123.com'
                 },
                 {
                     text :'热帖',
                     icon :'left_tie.png',
                     title:'喵耳萝莉的千本樱',
                     content:'自古幼女有三好',
                     img:'left_tie_img.jpeg',
                     href:'http://moe.hao123.com'
                 }
             ]
         };
         // 配置数据，页面加载时即提供
         M.conf = {
             slideBarCloseAnimate:false
         };
         // 返回数据模型对象操作方法
         return {
             // 获取服务端数据
             getData: function(m){
                 // 根据数据字段获取数据
                 return M.data[m];
             },
             // 获取配置数据
             getConf: function(c){
                 // 根据配置数据字段获取配置数据
                 return M.conf[c];
             },
             // 设置服务器端数据（通常将服务器端异步获取到的数据，更新该数据）
             setData: function(m,v){
                 // 设置数据字段m对应的数据v
                 M.data[m] = v;
                 return this;
             },
             // 设置配置数据（通常在页面中执行某些操作，为做记录而更新配置数据）
             setConf: function(c,v){
                 // 设置配置数据字段c对应的配置数据v
                 M.conf[c] = v;
                 return this;
             }
         }
     }();
     // 初始化MVC视图层
     MVC.view = function() {
         // 模型数据层对象操作方法引用
         var M = MVC.model;
         // 内部视图创建方法对象
         var V = {
             createSliderBar : function(){
                 var html = '',
                     data = M.getData('slideBar');
                 if(!data || !data.length){
                     return;
                 }
                 var dom = $.create('div',{
                     'class': 'slidebar',
                     'id': 'slidebar'
                 });
                 var tpl = {
                     container:[
                         '<div class="slidebar-inner"><ul id="content">{#content#}</ul></div>',
                         '<a hidefocus href="#" class="slidebar-close" title="收起"> 菜单</a>'
                     ].join(''),
                     item:[
                         '<li>',
                            '<a class="icon" href="{#href#}">',
                                '<img src="common/img/{#icon#}"/>',
                                '<span>{#text#}</span>',
                            '</a>',
                            '<div class="box">',
                                '<div>',
                                    '<a class="title" href="{#href#}">{#title#}</a>',
                                    '<a href="{#href#}">{#content#}</a>',
            
                                '</div>',
                                '<a class="image" href="{#href#}"><img src="common/img/{#img#}"/></a>',
                            '</div>',
                         '</li>',
                     ].join(''),
                 };
                 for(var i = 0, len = data.length; i < len; i++) {
                     html += $.fromateString(tpl.item,data[i]);
                 }
                 dom
                    .html(
                        $.fromateString(tpl.container,{content:html})
                    )
                    .appendTo('body');
             }
         };
         // 获取视图接口方法
         return function(v){
             V[v]();
         }
     }();
     // 初始化MVC控制器层
     MVC.ctrl = function() {
         // 模型数据层对象操作方法引用
         var M = MVC.model;
         // 模型数据层对象操作方法引用
         var V = MVC.view;
         // 控制器创建方法对象
         var C = {
             // 侧边导航栏模块
              initSlideBar: function (){
                  // 渲染导航栏模块视图
                  V('createSliderBar');
                  // 为每一个导航图标添加鼠标光标滑过与鼠标光标离开交互事件（具体方法参考A框架）
                  $('li','slidebar')
                    // 鼠标移入导航icon ，显示导航浮层
                    .on('mouseover', function(e){
                        $(this).addClass('show');
                    })
                    // 鼠标移出导航icon，隐藏导航浮层
                    .on('mouseout', function(e){
                        $(this).removeClass('show');
                    });
                //箭头icon 动画交互
                $('.slidebar-close','slidebar')
                    // 点击箭头icon 时
                    .on('click', function(e){
                        // 如果正在执行动画
                        if(M.getConf('slideBarCloseAnimate')){
                            // 终止操作
                            return false;
                        }
                        // 设置侧边导航模块动画配置数据开关为打开状态
                        M.setConf('slideBarCloseAnimate',true);
                        // 获取当前元素（箭头icon）
                        var $this = $(this);
                        // 如果箭头icon是关闭状态
                        if($this.hasClass('is-close')){
                            // 为侧边导航模块添加显示动画
                            $('.slidebar-inner','slidebar')
                                .animate({
                                    // 动画时间
                                    duration:800,
                                    // 动画类型
                                    type:'easeOutQuart',
                                    // 动画主函数
                                    main:function(dom){
                                        // 每一帧改变导航模块容器 left值
                                        dom.css('left',-150+this.tween*150+'px');
                                    },
                                    // 动画结束时回调函数
                                    end:function(){
                                        // 设置箭头 icon 为打开状态
                                        $this.removeClass('is-close');
                                        // 设置侧边导航模块动画配置数据开关为关闭状态（此时可继续进行模块显隐动画交互）
                                        M.setConf('slideBarCloseAnimate',false);
                                    }
                                });
                        // 如果箭头icon 是打开状态
                        }else{
                            // 为侧边导航模块添加显示动画
                            $('.slidebar-inner','slidebar')
                                .animate({
                                    duration:800,
                                    type:'easeOutQuart',
                                    main:function(dom){
                                        dom.css('left',this.tween * -150 +'px');
                                    },
                                    end:function(){
                                        $this.addClass('is-close');
                                        M.setConf('slideBarCloseAnimate',false);
                                    }
                                });
                        }
                    })    
              }
         };
         // 为所有模块添加交互效果
         for(var i in C){
             C[i] && C[i]();
         }
     }(); 
 });