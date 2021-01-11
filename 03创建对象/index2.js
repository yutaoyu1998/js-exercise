/*
    组合模式
    优点：该共享的共享，该私有的私有，使用最广泛的方式
    缺点：有的人就是希望全部都写在一起，即更好的封装性
*/

function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();

/*
    动态原型模式
    注意：使用动态原型模式时，不能用对象字面量重写原型
*/

function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype.getName = function () {
            console.log(this.name);
        }
    }
}

var person1 = new Person();