/***
 * MVVM模式
 */

 //~ 可以屏蔽压缩报错
 ~(function(){
     // 在闭包中获取全局变量
     // (0,eval)--> 立即执行返回eval
     //     逗号表达式：
     //      一般形式：表达式1，表达式2，表达式3，......表达式n
       //    求解过程：先计算表达式1的值，再计算表达式2的值，......一直计算到表达式n的值。
       //     最后整个表达式的值是表达式n的值。 
       //       所以这里最终的值就是eval
     //  为eval传入'this'字符串
     // 因为在严格模式下，匿名函数中的this为undefined
     //  为了防止在严格模式下window变量被赋予undefined，使用(0,eval)('this')重新指向window对象
    // 那为什么不直接写 eval('this')呢？
    //      因为eval直接调用时返回的是一个引用，而间接调用则返回一个值，并且间接调用是在全局范围内执行代码的
    //          而我们这里需要的是一个this指向的值，所以需要间接调用
     var window = this || (0,eval)('this');

     // 获取页面字体大小，作为创建页面UI尺寸参照物
     var FONTSIZE = function(){
         // 获取页面body元素字体大小并转化成整数
         return parseInt(document.body.currentStyle ? document.body.currentStyle['fontSize'] :getComputedStyle(document.body,false)['fontSize']);
     }();
     // 视图模型对象
     var VM = function(){
         // 组件创建策略对象
         var Method = {
             /**
              * 进度条组件创建方法
              * @param {*} dom  进度条容器
              * @param {*} data 进度条数据模型 
              */
             progressbar:function(dom,data){
                 // 进度条进度完成容器
                var progress = document.createElement('div'),
                    // 数据模型数据，结构: {position:50}
                    param = data.data;
                // 设置进度完成容器尺寸
                progress.style.width = (param.position || 100) + '%';
                // 为进度条组件添加UI样式
                dom.className += ' ui-progressbar';
                // 进度完成容器元素插入进度条容器中
                dom.appendChild(progress);
             },
             
             /**
              * 滑动条组件创建方法
              * @param {*} dom  滑动条容器
              * @param {*} data  滑动条数据模型
              */
             slider:function(dom,data){
                 // 滑动条拨片
                var bar = document.createElement('span'),
                    // 滑动条进度容器
                    progress = document.createElement('div'),
                    // 滑动条容量提示信息
                    totalText = null,
                    // 滑动条拨片提示信息
                    progressText = null,
                    // 数据模型数据，结构：{position:60,total:200}
                    param = data.data,
                    // 容器元素宽度
                    width = dom.clientWidth,
                    // 容器元素横坐标值
                    left = dom.offsetWidth,
                    // 拨片位置（以模型数据中Position数据计算）
                    realWidth = (param.position || 100) *  width / 100;
                // 清空滑动条容器，为创建滑动条做准备
                dom.innerHTML = '';
                // 如果模型数据中提供容器总量信息（param.total），则创建滚动条提示文案
                if(param.total){
                    // 容器总量提示文案节点
                    totalText = document.createElement('b');
                    // 拨片位置提示文案节点
                    progressText = document.createElement('em');
                    // 设置容量总量提示文案内容
                    totalText.innerHTML = param.total;
                    // 将容器总量提示文案元素添加到滑动条组件中
                    dom.appendChild(totalText);
                    // 将拨片位置提示文案元素添加到滑动条组件中
                    dom.appendChild(progressText);
                }
                // 设置滑动条
                setStyle(realWidth);
                // 为滑动条组件添加UI样式
                dom.className += ' ui-slider';
                // 将进度容器添加到滑动条组建中
                dom.appendChild(progress);
                // 将拨片添加到滑动条组件中
                dom.appendChild(bar);
                /**
                 * 设置滑动条
                 * @param {*} w  拨片位置 
                 */
                function setStyle(w){
                    // 设置进度容器宽度
                    progress.style.width = w + 'px';
                    // 设置拨片横坐标
                    bar.style.left = w - FONTSIZE /2  + 'px';
                    // 如果有拨片提示文案
                    if(progressText){
                        // 设置拨片提示文案横坐标
                        progressText.style.left = w - FONTSIZE /2 *2.4 + 'px';
                        // 设置拨片提示文案内容
                        progressText.innerHTML = parseFloat(w/width*100).toFixed(2)+'%';
                    }
                }
                /**
                 * 按下鼠标拨片
                 */
                bar.onmousedown = function(){
                    // 移动拨片（鼠标光标在页面中滑动（而不限于滑动条中），事件绑定给document是为了优化交互体验）
                    document.onmousemove = function (event) {
                        // 获取时间源
                        var e = event || window.event;
                        // 鼠标光标相对于滑动条容器位置原点移动的横坐标
                        var w = e.clientX - left;
                        // 设置滑动条
                        // w <width ? (w > 0 ? w : 0) : width 执行步骤：
                        //   按照运算符优先级，()最高，故先运算 w > 0 ? w : 0,假设该表达式的值为tmp, 得到 tmp = w 或者 tmp=0
                        //   再执行  w < width ? tmp : width
                        setStyle(w <width ? (w > 0 ? w : 0) : width);
                    }
                    // 阻止页面滑动选取事件
                    //   平常我们在网页中按下鼠标左键并拖动，会选择到页面上的文字，其实就是触发了onselectstart事件
                    //   阻止该事件可以防止我们通过按下鼠标并在页面中滑动时同时选中页面中的文字
                    document.onselectstart = function(){
                        return false;
                    }
                }
                // 停止滑动交互（鼠标按键松开）
                document.onmouseup = function(){
                    //取消文档鼠标光标移动事件
                    document.onmousemove = null;
                    // 取消文档滑动选取事件
                    document.onselectstart = null;
                }
             }
         }
         /**
          * 获取视图层组件渲染数据的映射信息
          * @param {*} dom 组件元素
          */
         function getBindData(dom){
             // 获取组件自定义属性data-bind的值
            var data = dom.getAttribute('data-bind');
            // 将自定义属性data-bind的值转化为对象
            // 逻辑！优先级高于 && , 故先执行!!data，将data强制转换为布尔型来判断数据是否为空
            //  如果data不为空，则利用函数构造方法，返回对象格式的数据
            return !!data && (new Function("return ({" + data + "})"))();
         }
         // 组件实例化方法
         return function(){
                // 获取页面中所有元素
             var doms = document.body.getElementsByTagName('*'), 
                // 元素自定义数据句柄
                 ctx = null;
            // ui 处理是会向页面中插入元素，此时doms.length会改变，此时动态获取dom.length
            for(var i=0; i<doms.length;i++){
                //获取元素自定义数据
                ctx = getBindData(doms[i]);
                //如果元素是UI组件，则根据自定义属性中组件类型，渲染该组件
                ctx.type && Method[ctx.type] && Method[ctx.type](doms[i],ctx);
            }
         }
     }();
     // 将视图模型对象绑定在window上，供外部获取
     window.VM = VM;
 })();

 // 数据模型中获取到的组件渲染数据
    // 带有提示文案的滑动条
 var demo1 = {
     position:60,
     total:200
 },
 // 简易版滑动条
 demo2 = {
     position:20
 },
 // 进度条
 demo3 = {
     position:50
 };

 window.onload = function(){
     VM();
 }