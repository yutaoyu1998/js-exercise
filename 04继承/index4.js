/*
    原型式继承
    ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。

    缺点：
    包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
*/

function createObj(o) {
    function F() { };
    F.prototype = o;
    return new F();
}