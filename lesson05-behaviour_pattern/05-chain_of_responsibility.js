/**
 * author:hejianbo
 */

 // 职责链模式

 // 需求：表单提示、表单验证，且交互体验不确定
 // 需求分解：
 // 绑定事件——异步请求——适配响应数据——向组件传入数据

 /**
    * 异步请求对象（简化版本）
    * 参数 data  请求数据
    * 参数 dealType 响应数据处理对象
    * 参数 dom  事件源
  */

  var sendData = function(data,dealType,dom){
    // XHR 对象 简化版本 IE另行处理    
    var xhr = new XMLHttpRequest(),
        // 请求路径
        url = 'getData.php?mod=userInfo';
    // 请求返回事件
    xhr.onload = function(event){
        // 请求成功
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
            dealData(xhr.responseText,dealType,dom);
        }else{
            // 请求失败
            console.log("error");
        }
    };
    //拼接请求字符串
    for (var i in data) {
        url += '&' + i + '=' +data[i];
    }
    // 发送异步请求
    xhr.open("get",url,true);
    xhr.send(null);
  }

  /**
   * 处理响应数据
   * @param {} data 响应数据
   * @param {*} dealType 响应数据处理对象
   * @param {*} dom 事件源
   */
    var dealType = function(data,dealType,dom){
        // 对象 toString 方法简化引用
        var dataType = Object.prototype.toString.call(data);
        // 判断响应数据处理对象
        switch(dealType){
            // 输入框提示功能
            case 'sug':
                // 如果数据为数组
                if(dataType ===  "[object Array]"){
                    // 创建提示框组件
                    return createSug(data,dom);
                }
                // 将响应的对象数据转化为数组
                if(dataType === "[object Object]"){
                    var newData = [];
                    for(var i in data){
                        newData.push(data[i]);
                    }
                    // 创建提示框组件
                    return createSug(newData,dom);
                }
                // 将响应的其他数据转化为数组
                return createSug([data],dom);
                break;
            case 'validata':
                return createVlidataResult(data,dom);
                break;
        }
    }

    /**
     * 创建提示框组件
     * @param {*} data  响应适配数据
     * @param {*} dom  事件源
     */
    var createSug  = function(data,dom){
        var i = 0,
            len = data.length,
            html = '';
        // 拼接每一条提示语句
        for(;i<len; i++){
            html += '<li>' + data[i] + '</li>';
        }
        // 显示提示框
        dom.parentNode.getElementsByTagName('ul')[0].innerHTML = html;
    }

    /**
     * 创建校验组件
     * @param {*} data 
     * @param {*} dom 
     */
    var createVlidataResult = function(data,dom){
        // 显示校验结果
        dom.parentNode.getElementsByTagName('span')[0].innerHTML = data;
    }

    // 使用

    var input = document.getElementsByTagName('input');
    // 监听内容改变事件做内容校验
    input[0].onchange =function (e) {
        sendData({value:input[0].value},'validata',input[0]);
    }
    // 监听键盘事件对内容做提示处理
    input[1].onkeydown = function(e){
        sendData({value:input[1].value},'sug',input[1]);
    }