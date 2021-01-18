/*
    apply
*/

Function.prototype.apply2 = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}

/*
    验证动态原型模式直接覆盖原型链是否会报错
*/

function createObject() {
    var object = new Object();
    Constructor = [].shift.call(arguments);
    object.__proto__ = Constructor.protortype;
    //debugger
    var ret = Constructor.apply2(object, arguments);
    return typeof ret === 'object' ? ret : object;
}



function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }
    }
}

var person1 = createObject(Person, 'kevin');
var person2 = createObject(Person, 'hhh');

var person1 = new Person('kevin');
var person2 = new Person('daisy');

// 报错 并没有该方法
//person1.getName();

// 注释掉上面的代码，这句是可以执行的。
person2.getName();

/*
回顾下 apply 的实现步骤，会执行 obj.Person 方法，这个时候就会执行 if 语句里的内容，注意构造函数的 prototype 属性指向了实例的原型，使用字面量方式直接覆盖 Person.prototype，并不会更改实例的原型的值，person1 依然是指向了以前的原型，而不是 Person.prototype。而之前的原型是没有 getName 方法的，所以就报错了！
*/