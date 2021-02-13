// 基本用法

function* helloWorldGenerator() {
    var s = yield 'hello';
    yield 'world';
    return 'ending';
  }
  
var hw = helloWorldGenerator();

for (var i = 0; i < 3; i++) {
    console.log(hw.next());
}

// next 方法的参数

/*
    yield表达式本身没有返回值，或者说总是返回undefined。
    next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
*/
function* f() {
    for (var i = 0; true; i++) {
        var reset = yield i;
        console.log('next:' + i, reset)
        if (reset) i = -1;
    }
}

var g = f();
for (var i = 0; i < 5; i++) {
    console.log(g.next());
}
console.log(g.next(true)) // 此时打印的next: 4, true


/*
    带参数的例子
*/

function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }

/*
    分析：
    上面代码第一次调用b的next方法时，返回x+1的值6；
    第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；
    第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，
    所以return语句的值等于42。

    由于next方法的参数表示上一个yield表达式的返回值，
    所以在第一次使用next方法时，传递参数是无效的。V8 引擎直接忽略第一次使用next方法时的参数，
    只有从第二次使用next方法开始，参数才是有效的。
    从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。
*/

function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`);
    console.log(`2. ${yield}`);
    return 'result';
  }
  
  let genObj = dataConsumer();
  genObj.next();
  // Started
  genObj.next('a')
  // 1. a
  genObj.next('b')
  // 2. b