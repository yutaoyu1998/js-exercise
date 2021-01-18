let arr = [
    {
        label: 1,
        children: [
            {
                label: 2,
                children: [
                    {
                        label: 3,
                        children: []
                    }
                ]
            },
            {
                label: 4
            }
        ]
    }
]
function getNode(arr){
    // debugger
    arr.forEach(element => {
        element.label2 = element.label
        if(element.children && element.children.length > 0){
            getNode(element.children)
        }else{
        }
    });
}

getNode(arr)
console.log('over', arr)