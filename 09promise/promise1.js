/*
    实现 promise 
*/

import MPromise from './promise2'

function MyPromise(executor) {

    const self = this;

    // A promise must be in one of three states: pending, fulfilled, or rejected.
    self.status = 'pending';

    self.data = undefined;

    self.onResolvedCallback = [];   // promise resolved callback

    self.onRejectedCallback = [];   //  promise reject callback

    // resolve function
    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.data = value;
            // execute resolved callback list
            for (var i = 0; i < self.onResolvedCallback.length; i++) {
                self.onResolvedCallback[i](value);
            }
        }
    }

    // reject function
    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.data = reason;
            // execute resolved callback list
            for (var i = 0; i < self.onResolvedCallback.length; i++) {
                self.onResolvedCallback[i](reason);
            }
        }
    }

    try {
        executor(resolve, reject) // executor
    } catch (e) {
        reject(e);
    }

}

/*
    A promise must provide a then method to access its current or eventual value or reason.
    A promise’s then method accepts two arguments:
*/

MyPromise.prototype.then = function (onResolved, onRejected) {
    var self = this;
    var promise2;

    // if not a method, ignore
    onResolved = typeof (onResolved) === 'function' ? onResolved : function (v) { };
    onRejected = typeof (onRejected) === 'function' ? onRejected : function (r) { };

    if (self.status === 'pending') {
        return promise2 = new MyPromise(function (resolve, reject) {
            self.onResolvedCallback.push(function (value) {
                try {
                    var x = onResolved(self.data)
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            })

            self.onRejectedCallback.push(function (reason) {
                try {
                    var x = onRejected(self.data)
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    if (self.status === 'resolved') {
        return promise2 = new MyPromise(function (resolve, reject) {
            try {
                var x = onResolved(self.data);
                if (x instanceof MyPromise) {
                    x.then(resolve, reject);
                }
            } catch (e) {
                reject(e);
            }
        })
    }

    if (self.status === 'rejected') {
        return promise2 = new MyPromise(function (resolve, reject) {
            try {
                var x = onRejected(self.data);
                if (x instanceof MyPromise) {
                    x.then(resolve, reject);
                }
            } catch (e) {
                reject(e);
            }
        })
    }
}

MyPromise.prototype.catch = function(onRejected){
    return this.then(null, onRejected)
}


// 测试
// const randomFlag = () => {
//     return Math.random() > 0.5;
// }

// const p = new MyPromise((resolve, reject) => {
//     if (randomFlag()) {
//         resolve(true)
//     } else {
//         reject(false);
//     }
// })

// p.then(res => {
//     console.log('execute my promise', res)
// })
// p.catch(err => {
//     console.log('err', err)
// })

new MyPromise(resolve=> resolve(8))
  .then()
  .then()
  .then(function foo(value) {
    alert(value)
  })



