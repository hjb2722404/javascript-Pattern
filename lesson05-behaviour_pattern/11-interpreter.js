/**
 * author:hejianbo
 * 解释器模式
 */

 

 // XPath解释器
 var Interpreter = (function () {
    function getSublingName(node) {
        // 如果存在兄弟元素
        if(node.previousSibling){
            var name = '', // 返回的兄弟元素名称字符串
                count = 1, // 紧邻兄弟元素中相同名称元素个数
                nodeName = node.nodeName, // 原始节点名称
                sibling = node.previousSibling; // 前一个兄弟元素                            
        // 如果存在前一个兄弟元素
        while (sibling) {
            // 如果节点为元素，并且节点类型与前一个兄弟元素类型相同，并且前一个兄弟元素名称存在
            if(sibling.nodeType ==1 && sibling.nodeType === node.nodeType && sibling.nodeName){
                // 如果节点名称和前一个兄弟元素名称相同
                if(nodeName == sibling.nodeName){
                    // 节点名称后面添加计数
                    name += ++count;
                }else{
                    // 重置相同紧邻节点名称节点个数
                    count = 1;
                    // 追加新的节点名称
                    name += '|' + sibling.nodeName.toUpperCase();
                }
                return name;
                //否则不存在兄弟元素，返回''
            }else{
                return '';
            }
        }
        }
    }
// 参数1 node:目标节点  参数二 wrap：容器节点
    return function (node,wrap) {
        // 路径数组
        var path = [],
            // 如果不存在容器节点，默认为document
            wrap = wrap || document;
            // 如果当前（目标）节点等于容器节点
            if(node === wrap){
                // 容器节点为元素
                if(wrap.nodeType == 1){
                    // 路径数组中输入容器节点名称
                    path.push(wrap.nodeName.toUpperCase());
                }
                // 返回最终路径数组结果
                return path;
            }
            // 如果当前节点的父元素节点与容器节点不相等
            if(node.parentNode !== wrap){
                path = arguments.callee(node.parentNode,wrap);
            }else{
                // 容器节点为元素
                if(wrap.nodeType ==1){
                    // 路径数组中输入容器节点名称
                    path.push(wrap.nodeName.toUpperCase());
                }
            }
            // 获取元素的兄弟元素名称统计
            var sublingNames = getSublingName(node);
            // 如果节点为元素
            if(node.nodeType == 1){
                // 输入当前节点元素名称及其前面兄弟元素名称统计
                path.push(node.nodeName.toUpperCase() + sublingNames);
            }
            // 返回最终路径数组结果
            return path;
    }
    // 立即执行方法
 })();