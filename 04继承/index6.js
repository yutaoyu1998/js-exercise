/*
    寄生组合式继承

    对组合式继承优化，避免调用两次构造函数
    不使用 Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype
*/

function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();


var child1 = new Child('kevin', '18');

console.log(child1);

/*
    封装
*/
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);

/*

这种方式的高效率体现它只调用了一次 Parent 构造函数，
并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。
与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。
开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

*/