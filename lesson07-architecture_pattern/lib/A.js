/**
 * A Library v1.0.0
 * 
 * Author: zhangrongming
 * Date:2014-11-30
 * 
 */
~(function(window){
    var A = function(selector,content){
        if(typeof selector == "function"){
            A(window).on('load',selector)
        }else{
            return new A.fn.init(selector,content);
        }
    }
})(window);