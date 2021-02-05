const getJSON = function (url) {
    const promise = new Promise(function (resolve, reject) {
        const handler = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
    });

    return promise;
};


/*
    链式调用
*/

getJSON("./1.json").then(function (json) {
    console.log('then 1 : ', json)
    return json.data;
}).then(function (post) {
    console.log('then 2 : ', post)
    return post
}).then(function (message) {
    console.log('then 3 : ', message.split(" "))
}).catch(err => {
    console.log('err : ', err)
}).finally(() => {
    console.log('finally')
})


/*
    promise.all
*/
const promises = [1, 2, 3, 4, 5, 8].map(function (id) {
    return getJSON('./' + id + ".json");
});

Promise.all(promises).then(function (posts) {
    console.log('all response',posts)
}).catch(function (err) {
    console.log('err --', err)
});


/*
    promise.race
    只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
    那个率先改变的 Promise 实例的返回值，就传递给p的回调函数
*/
const promises2 = [11, 12, 3, 4, 5, 6].map(function (id) {
    return getJSON('./' + id + ".json");
});

Promise.race(promises2).then(function (response) {
    console.log('race response : ', response)
}).catch(function (err) {
    console.log('race err : ', err)
});

/*
    promise.allSettled
    与promise.all 相比即便请求失败了最后也会进入then
*/
const promises3 = [1, 2, 3, 4, 5, 8].map(function (id) {
    return getJSON('./' + id + ".json");
});

Promise.allSettled(promises3).then(function (response) {
    console.log('allSettled response : ', response)
}).catch(function (err) {
    console.log('allSettled err : ', err)
});

/*
    promise.any ES2021
    只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；
    如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

    Promise.any()跟Promise.race()方法很像，只有一点不同，
    就是不会因为某个 Promise 变成rejected状态而结束
*/
const promises4 = [11, 12, 13, 14, 15, 6].map(function (id) {
    return getJSON('./' + id + ".json");
});

Promise.any(promises4).then(function (response) {
    console.log('any response : ', response)
}).catch(function (err) {
    console.log('any err : ', err)
});