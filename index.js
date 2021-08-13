function add(x, y) {
    return x + y;
}

console.log(add(1, 2));

// console.log(data)
class MyEvent {
    constructor() {
        this.event = {};
        this.maxLinsterner = 10;
    }

    // 监听
    on(type, handle) {
        if (this.event[type]) {
            if(this.event[type].length>this.maxLinsterner){
                console.error('同一个监听器最多被10个对象监听，否则可能造成内存泄漏')
            }
            this.event[type].push(handle)
        } else {
            this.event[type] = [handle]
        }
    }

    //发布
    emit(type, ...reset) {
        if (this.event[type]) {
            this.event[type][0](reset)
        }
    }

    //移除
    removeListerner(type) {
        if (this.event[type]) {
            delete this.event[type]
        }
    }
}

window.onload = function () {
    let myevent = new MyEvent();
    myevent.on('myEventType', (param) => {
        console.log('事件回调被触发，参数为', param)
    });
    document.getElementById('clickEvent').addEventListener(
        'click', function () {
            myevent.emit('myEventType', 'i am param')
        })
}
