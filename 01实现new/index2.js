/*
    如果构造函数有返回值
    1、构造函数返回一个对象，那么 new 构造函数的值为return 的值
    2、构造函数返回一个基本类型， new 构造函数为 this赋值的对象
*/

function Person(name, age) {
    this.hobby = "play basketball";
    this.age = age;

    return {
        name: name,
        weight: '60'
    }
}

console.log(new Person('kevin', 18));

function PersonAnother(name, age) {
    this.hobby = "play basketball";
    this.age = age;

    return "o my gad"
}
console.log(new PersonAnother('kevin', 18))


/*
    createFactory 做如下改造
*/
function createFactory(){
    var object = new Object();
    Constructor = [].shift.call(arguments);
    object.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(object, arguments);
    return typeof ret === 'object' ? ret : object;
}