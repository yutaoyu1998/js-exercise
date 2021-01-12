/*
    借用构造函数继承
    优点
    1.避免了引用类型的属性被所有实例共享
    2.可以在 Child 中向 Parent 传参
    缺点：
    1.方法都在构造函数中定义，每次创建实例都会创建一遍方法。
*/

function Parent() {
    this.names = ['kevin', 'daisy'];
}
Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child() {
    Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]