/*
    寄生式继承
    缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
*/

function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}