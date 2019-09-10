/**
 * author:hejianbo
 * 同步模块模式
 */

 // 未模块化之前的代码：

 // A工程师 获取数据并创建导航模块（沿用A框架）
// 导航数据
 var data = null,
     dom = A('#nav'),
     createNav = function(){
         // A工程师完成导航创建逻辑

         /*********** C工程师加入，为导航添加引导图片 *************** */
      var li = A('li',dom);
      for(var i = 0,len=data.length; i < len; i++){
            if(data[i].hasGuide){
                $(li[i]).addClass('has-guide');
            }
      } 
      /*************************************************************** */ 

      /***************** B工程师加入 完成对导航添加事件续期 ************************* */
      // 在导航容器中获取每条导航
      var li = A('li',dom);
      li.on('mouseover', function(){
          // 显示下拉框逻辑
      }).on('mouseout', function(){
          // 隐藏下拉框逻辑
      });
      /**************************************************************** */


    };

    // 获取导航数据
    A.ajax('data/nav',function(res){
        if(res.errorNo == 0){
            data = rs.data;
            createNav();
        }
    });