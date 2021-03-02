const getData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve('test my promise')
    }, 1000);
})

// getData().then(res=>{
//     console.log('res---', res)
// })


function* getDataGenerator(){
    const data = yield getData();
    console.log('data: ',data);
    const data2 = yield getData();
    console.log('data2: ', data2);
    return 'success';
}

const gen = getDataGenerator();

gen.next();

gen.next();