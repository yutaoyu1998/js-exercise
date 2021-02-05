
if (window.Worker) {

    var myWorker = new Worker('worker.js');

    var inputDom = document.getElementById('myinput');
    var resultDom = document.getElementById('result');

    inputDom.onchange = function() {
        // worker 发送消息
        myWorker.postMessage([inputDom.value]);
        console.log('Message posted to worker');
    }

    // worker 收到消息
    myWorker.onmessage = function(e) {
        resultDom.innerText = e.data;
        console.log('Message received from worker');

        setTimeout(()=>{
            // 关闭worker
            // myWorker.terminate();
            console.log('worker close')
        }, 3000)
    }

}else{
    console.log('不支持 web worker')
}

