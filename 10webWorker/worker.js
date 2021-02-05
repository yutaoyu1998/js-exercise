// 加载第三方数据
importScripts('test.js')

onmessage = function (e) {
    console.log('Message received from main script');
    var workerResult = 'Result: ' + e.data;
    abc(workerResult)
    console.log('Posting message back to main script');
    postMessage(workerResult);

    if(e.data[0] === 'close'){
        // 自己关闭 worker
        close();
    }
}


