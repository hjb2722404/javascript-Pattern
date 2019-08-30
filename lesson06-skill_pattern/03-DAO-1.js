/**
 * author:hejianbo
 * 数据访问对象模式 
 */

 /**
  * 本地存储类
  * 参数 preId  本地存储数据库前缀
  * 参数 timeSign  时间戳与存储数据之间的拼接符
  */

  var BaseLocalStorage = function(preId,timeSign){
      this.preId = preId;
      this.timeSign = timeSign || '|-|';
  }

  // 本地存储类原型方法
  BaseLocalStorage.prototype = {
    // 操作状态  
    status :{
          SUCCESS : 0, // 成功
          FAILURE : 1, // 失败
          OVERFLOW :2, // 溢出
          TIMEOUT : 3  // 过期
      },
      // 保存本地存储链接
      storage : localStorage || window.localStorage,
      // 获取本地存储数据库数据真实字段
      getKey : function(key){return this.preId + key;},
      // 添加或修改数据
      /**
       * 
       * @param {*} key 数据字段标识
       * @param {*} value 数据值
       * @param {*} callback 回调函数
       * @param {*} time 添加时间
       */
      set : function(key,value,callback,time){
            // 默认操作状态时成功
            var status = this.status.SUCCESS;
            // 获取真实字段
            var key = this.getKey(key);
            try {
                // time参数存在则获取时间戳
                time = new Date(time).getTime() || time.getTime();
            } catch (error) {
                // 时间参数有误则获取默认时间：一个月
                time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31;
            }
            try{
                // 向数据库中添加数据
                this.storage.setItem(key,time+this.timeSign+value);
            }catch(e){
                // 溢出，返回溢出状态
                status = this.status.OVERFLOW;
            }
            // 有回调函数则执行回调并传入参数
            callback && callback.call(this,status,key,value);
      },
      // 获取数据
      /**
       * 
       * @param {*} key 数据字段标识
       * @param {*} callback 回调函数
       */
      get : function(key,callback){
          // 默认操作状态时成功
        var status = this.status.SUCCESS,
            // 获取真实字段
            key = this.getKey(key),
            // 默认值为空
            value = null,
            // 时间戳与存储数据之间的拼接符长度
            timeSignLen = this.timeSign.length,
            // 缓存当前对象
            that = this,
            // 时间戳与存储数据之间拼接符起始位置 
            index,
            // 时间戳
            time,
            // 最终获取的数据
            result;
        try {
            // 获取字段对应的数据字段串
            value = that.storage.getItem(key);
        }catch(e){
            // 获取失败时返回失败状态，数据结果为null
            result = {
                status : that.status.FAILURE,
                value : null
            };
            // 执行回调并返回结果
            callback && callback.call(this,result.status,result.value);
            return result;
        }
        // 如果成功获取数据字符串
        if(value){
            // 获取时间戳与存储数据时间的拼接符起始位置
            index = value.indexOf(that.timeSign);
            // 获取时间戳
            time = +value.slice(0,index);
            // 如果时间为过期
            if(new Date(time).getTime > new Date().getTime() || time == 0){
                //  获取数据结果（拼接符后面的字符串）
                value = value.slice(index + timeSignLen);
            }else{
                // 过期则结果为 null
                value = null,
                // 设置状态为过期状态
                status = that.status.TIMEOUT;
                // 删除该字段
                that.remove(key);
            }
        }else{
            // 未获取到数据字符串状态置为失败
            status = that.status.FAILURE;
        }
        // 设置结果
        result = {
            status :status,
            value : value
        };
        // 执行回调函数
        callback && callback.call(this,result.status,result.value);
        // 返回结果
        return result;

      },
      // 删除数据
      remove : function(key,callback){
        var status = this.status.FAILURE,
            key = this.getKey(key),
            value = null;
        try{
            value = this.storage.getItem(key);
        }catch(e){

        }
        // 如果数据存在
        if(value) {
            try{
                this.storage.removeItem(key);
                status = this.status.SUCCESS;
            }catch(e){}
        }
        callback && callback.call(this,status,status>0?null:value.slice(value.indexOf(this.timeSign)+this.timeSign.length))
      }
  }