/**
 * MVP 模式
 * author:hejianbo
 */

 ~(function(window){
    // MVP构造函数
    var MVP = function(){};
    // 数据层
    MVP.model = function(){
        var M = {};
        M.data = {
            nav : [
                {
                    text : '新闻头条',
                    mode : 'news', 
                    url : 'http://www.baidu.com/'
                },
                {
                    text : '最新电影',
                    mode : 'movie', 
                    url : 'http://www.baidu.com/'
                },
                {
                    text : '热门游戏',
                    mode : 'game', 
                    url : 'http://www.baidu.com/'
                },
                {
                    text : '今日特价',
                    mode : 'price', 
                    url : 'http://www.baidu.com/'
                }
            ]
        };
        M.conf = {};
        return {
            getData :function(m){
                return M.data[m];
            },
            setData :function(m,v){
                M.data[m] = v;
                return v;
            },
            getConf :function(){
                return M.conf[c]
            },
            setConf :function(c,v){
                M.conf[c] = v
                return v;
            }
        }
    }();
    // 视图层---支持zencode语法
    MVP.view = function(){
        // 子元素或者兄弟元素替换模板
        var REPLACEKEY = '__REPLACEKEY__';
        /**
         * 获取完整元素模板
         * @param {*} str  元素字符串
         * @param {*} type 元素类型
         */
        function getHTML(str,type){
            // 简化实现， 只处理字符串中第一个{}里面的内容
            return str
                    .replace(/^(\w+)([^\{\}]*)?(\{(@\w+)\})?(.*?)$/,function(match,$1,$2,$3,$4,$5){
                        $2 = $2 || '';  // 元素属性参数容错处理
                        $3 = $3 || '';  // {元素内容} 参数容错处理
                        $4 = $4 || '';  // 元素内容参数容错处理
                        $5 = $5.replace(/\{([@\w]+)\}/g,''); // 去除元素内容后面添加的元素属性中的{}内容
                        /**
                         * 以str=div举例：如果div元素有子元素则表示成 <div>__REPLACEKEY__</div>,
                         * 如果div有兄弟元素则表示成<div></div>__REPLACEKEY__，否则表示成<div></div>
                         */
                        return type === 'in' ? 
                            '<' + $1 + $2 + +$5 + '>'  + $4 + REPLACEKEY + '</' +$1 + '>' :
                            type === 'add' ?
                            '<' + $1 + $2 + +$5 + '>' + $4 + '</' +$1 + '>' + REPLACEKEY :
                            '<' + $1 + $2 + +$5 + '>' + $4 + '</' +$1 + '>';
                    })
                    // 处理特殊标识#--id属性
                    .replace(/#([@\-\w]+)/g,' id="$1"')
                    // 处理特殊标示.--class属性
                    .replace(/\.([@\-\w]+)/g, ' class="$1"')
                    // 处理其他属性组
                    .replace(/\[(.+)\]/g,function(match,key){
                        // 元素属性组
                        var a = key
                                // 过滤其中引号
                                .replace(/'|"/g,'')
                                // 以空格分组
                                .split(' '),
                            // 属性模板字符串
                            h = '';
                        // 遍历属性组
                        for(var j = 0, len = a.length; j < len;j++){
                            // 处理并拼接每一个属性
                            h += ' ' + a[j].replace(/=(.*)/g,'="$1"');
                        }
                        // 返回属性组模板字符串
                        return h;
                    })
                    // 处理可替换内容， 可根据不同模板渲染引擎自由处理
                    .replace(/@(\w+)/g, '{#$1#}');
        }
        /**
         * 数组迭代器
         * @param {*} arr  数组 
         * @param {*} fn   对每一项要执行的回调函数
         */
        function eachArray(arr,fn){
            for(var i=0,len=arr.length;i<len;i++){
                fn(i,arr[i],len);
            }
        }
        /**
         * 替换兄弟元素模板或者子元素模板
         * @param {*} str  原始字符串
         * @param {*} rep   兄弟元素模板或者子元素模板
         */
        function formateItem(str,rep){
            return str.replace(new RegExp(REPLACEKEY,'g'),rep);
        }
        // 模板解析器
        return function(str){
            // 模板层级数组
            var part = str
                        // 去除收尾空白符
                        .replace(/^\s+|\s+$/g,'')
                        // 去除>两端空白符
                        .replace(/^\s+(>)\s+/g,'$1')
                        // 以>分组
                        .split('>'),
                // 模块视图根模板
                html = REPLACEKEY,
                // 同层元素
                item,
                // 统计元素模板
                nodeTpl;
            // 遍历每组元素
            eachArray(part,function(partIndex,partValue,partLen){
                // 为同级元素分组
                item = partValue.split('+');
                // 设置统计元素初始模板
                nodeTpl = REPLACEKEY;
                // 遍历同级每一个元素
                eachArray(item,function(itemIndex,itemValue,itemLen){
                    /*
                     * 用渲染元素得到的模板去渲染同级元素模板，此处简化逻辑
                     * 如果itemIndex(同级元素索引)对应元素不是最后一个，则作为兄弟元素处理
                     * 否则，如果partIndex(层级索引) 对应的层级不是最后一层 ，则作为负层级处理（该层级有子层级，即该元素是父元素）
                     * 否则，该元素无兄弟元素，无子元素
                     */
                    nodeTpl = formateItem(nodeTpl,getHTML(itemValue,itemIndex === itemLen -1 ?(partIndex === partLen-1?'':'in'):'add'));
                });
                // 用渲染子层级得到的模板去渲染父层级模板
                html = formateItem(html,nodeTpl);
            });
            return html;
        }
    }();
    // 管理层
    MVP.presenter = function(){
        var V = MVP.view;
        var M = MVP.model;
        // 控制器对象
        var C = {
            
            /**
             * 导航管理器
             * @param {*} M  数据层对象
             * @param {*} V  视图层对象
             */
            nav : function(M,V){
                // 获取导航渲染数据
                var data = M.getData('nav');
                // 处理导航渲染数据
                data[0].choose = 'choose';
                data[data.length-1].last = 'last';
                // 获取导航渲染模板
                var tpl = V('li.@mode @choose @last[data-mode=@mode]>a#nav_@mode.nav-@mode[href=@url title=@text]>i.nav-icon-@mode+span{@text}');
                // 创建导航容器
                $
                .create('ul',{
                    'class' : 'navigation',
                    'id' : 'nav'
                })
                // 插入导航视图
                .html(
                    A.fromateString(tpl,data)
                )
                // 导航模块添加到页面中
                .appendTo('#container');
            }
        };
        return {
            // 执行方法
            init : function(){
                // 遍历控制中的管理器方法
                for(var i in C){
                    C[i] && C[i](M,V,i);
                }
            }
        };
    }();
    // MVP入口
    MVP.init = function (){
        debugger;
        this.presenter.init();
    };
    // 暴露MVP对象，这样即可在外部访问MVP
    window.MVP = MVP;
 })(window);

 window.onload = function(){
     MVP.init();
 }