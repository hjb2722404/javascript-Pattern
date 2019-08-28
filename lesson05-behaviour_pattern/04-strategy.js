/**
 * author:hejianbo
 */

 // 策略模式
// 商品促销策略

// 价格策略对象
var PriceStrategy = function(){
    // 内部算法对象
    console.log("222");
    var strategy = {
        // 100 返 30
        return30 : function(price){
            // parseInt可通过 ~~、| 等运算符替换， 要注意此时price要在[-2147483648,2147483647]之间
            // +price 转化为数字类型
            return +price + parseInt(price / 100) * 30;
        },
        // 100 返 50
        return50 : function(price) {
            return +price + parseInt(price / 100) * 50;
        },
        // 9折
        percent90 : function(price) {
            // js在处理小数乘除法有bug，故运算前转化为整数
            return price * 100 * 90 /10000;
        },
        // 8折
        percent80 : function(price) {
            return price * 100 * 80 /10000;
        },
        // 5折
        percent50 : function(price) {
            return price* 100 *50 /10000;
        }
    }
    // 策略算法调用接口
    return function (algorithm, price) {
        console.log("11");
        // 如果算法存在，则调用算法，否则返回false
        return strategy[algorithm] && strategy[algorithm](price);
    }
}();

var price = PriceStrategy('return50','314.67');
console.log('price: ', price);

