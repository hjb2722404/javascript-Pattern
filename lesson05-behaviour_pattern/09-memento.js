/**
 * author:hejianbo
 */

 // 备忘录模式

 // 未使用备忘录模式的翻页功能

 // 下一页按钮点击事件
 $('#next_page').click(function () {
     // 获取新闻内容元素
     var $news = $('news_content');
     //获取新闻内容元素当前页数据
     var page = $news.data('page');
     //获取并显示新闻
     getPageData(page,function () {
         // 修正新闻内容元素当前页数据
         $news.data('page',page+1);
     });
 });
 // 上一页按钮点击事件
 $('#pre_page').click(function () {
     //显示上一页
 });
 // 请求某一页新闻 page：当前页 fn：成功回调函数
 function getPageData(page,fn) {
     // post请求数据
     $.post('./data/getNewsData.php',{
         page:page
     },function (res) {
         // 正常返回数据
         if(res.errNo == 0){
             // 显示当前页
             showPage(page,res,data);
             // 执行回调函数
             fn && fn();
         }
     })
 }
 // 显示某页逻辑
 function showPage(page,data) {
     //...
 }

 // 缺陷：点击下一页后再点击上一页，会造成重复请求

 // 备忘录模式——缓存

 // Page 备忘录类
 var Page = function () {
     // 信息缓存对象
     var cache = {};
     /**
      * 主函数
      * 参数 page 页码
      * 参数 fn 成功回调函数
      */
     return function (page,fn) {
         if(cache[page]){
             showPage(page,cache[page]);
             fn && fn();
         }else{
            $.post('./data/getNewsData.php',{
                page:page
            },function (res) {
                // 正常返回数据
                if(res.errNo == 0){
                    // 显示当前页
                    showPage(page,res,data);
                    // 将数据存入缓存
                    cache[page] = res.data;
                    // 执行回调函数
                    fn && fn();
                }else{
                    // 处理异常
                }
            }) 
         }
     }
 }

 // 下一页按钮点击事件
 $('#next_page').click(function () {
    // 获取新闻内容元素
    var $news = $('news_content');
    //获取新闻内容元素当前页数据
    var page = $news.data('page');
    //获取并显示新闻
    Page(page,function () {
        // 修正新闻内容元素当前页数据
        $news.data('page',page+1);
    });
});