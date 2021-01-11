/*
    工厂模式
    缺点：对象无法识别，因为所有的实例都指向一个原型
*/

function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;
}

var person1 = createPerson('kevin');



/*
    构造函数模式
    优点：实例可以识别为一个特定的类型
    缺点：每次创建实例时，每个方法都要被创建一次
*/

function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}

var person1 = new Person('kevin');




/*
    原型模式
    优点：方法不会重新创建
    缺点：1. 所有的属性和方法都共享 2. 不能初始化参数
*/
function Person(name) {

}

Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};

var person1 = new Person();




/*
    原型模式2
    优点：封装性好了一点
    缺点：重写了原型，丢失了constructor属性
*/

function Person(name) {

}

Person.prototype = {
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();



/*
    原型模式3
    优点：实例可以通过constructor属性找到所属构造函数
    缺点：原型模式该有的缺点还是有
*/

function Person(name) {

}

Person.prototype = {
    constructor: Person,
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();