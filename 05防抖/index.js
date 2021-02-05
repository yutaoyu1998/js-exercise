/*
    防抖的定义：
    1、无论期间触发多少次只执行最后一次
*/

var debounce2 = function (fn, delay) {
    var timer;

    return function () {
        var context = this;

        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context);
        }, delay || 500);
    }
}



/*

我不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。

想想这个需求也是很有道理的嘛，那我们加个 immediate 参数判断是否是立刻执行。

 */

function debounce(func, wait, immediate) {

    console.log('debounce')
    var timeout, result;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            console.log('执行')
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
        return result;
    }
}


var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = debounce(getUserAction, 1000, true);