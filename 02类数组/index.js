/*

var array = ['name', 'age', 'sex'];

var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}


// 读写

console.log(array[0]); // name
console.log(arrayLike[0]); // name

array[0] = 'new name';
arrayLike[0] = 'new name';

// 长度

console.log(array.length); // 3
console.log(arrayLike.length); // 3

// 遍历

for(var i = 0, len = array.length; i < len; i++) {
   ……
}
for(var i = 0, len = arrayLike.length; i < len; i++) {
    ……
}


// 类数组调用数组的方法

Array.prototype[function].call(arrayLike)


// 类数组转数组
// 1. slice
Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"] 
// 2. splice
Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"] 
// 3. ES6 Array.from
Array.from(arrayLike); // ["name", "age", "sex"] 
// 4. apply
Array.prototype.concat.apply([], arrayLike)


使用ES6的 ... 运算符，我们可以轻松转成数组。

function func(...arguments) {
    console.log(arguments); // [1, 2, 3]
}

func(1, 2, 3);

*/