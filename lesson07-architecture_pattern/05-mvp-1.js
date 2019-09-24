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
        M.data = {};
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
    MVP.presenter = function(){};
    // MVP入口
    MVP.init = function (){};
    // 暴露MVP对象，这样即可在外部访问MVP
    window.MVP = MVP;
 })(window)