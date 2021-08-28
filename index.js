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
            if (this.event[type].length > this.maxLinsterner) {
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
    // 调用自己封装的发布订阅组件
    let myevent = new MyEvent();
    myevent.on('myEventType', (param) => {
        console.log('事件回调被触发，参数为', param)
    });
    document.getElementById('clickEvent').addEventListener(
        'click', function () {
            myevent.emit('myEventType', 'i am param')
        });

    //模拟自定义事件
    if (document.implementation.hasFeature('CustomEvent', '3.0')) {
        let customEveBtn = document.getElementById('myCustomEventBtn');

        let myCustomEve = document.createEvent('customEvent');//为按钮创建customEvent自定义事件
        myCustomEve.initCustomEvent('myCunstomEvent', true, false, '我是detail属性的内容');//初始化myCunstomEvent事件
        //注册该事件
        customEveBtn.addEventListener('myCunstomEvent', (e) => {
            console.log('我的自定义事件被触发了，我不是通过用户点击触发的，是通过dispatch代码触发的', e)
        });
        //调用该事件,可以在这里加一些逻辑去指定触发时机
        customEveBtn.dispatchEvent(myCustomEve)
    }

    //模拟clcik事件
    let clickEveBtn = document.getElementById('myclickBtn');
    let mouserEvn = document.createEvent('MouseEvent');
    mouserEvn.initMouseEvent('click',true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null)
    clickEveBtn.addEventListener('click',(e)=>{
        console.log('mouseEvent click事件被触发了，我不是通过用户点击触发的,是通过dispatch代码触发的',e)
    });
    clickEveBtn.dispatchEvent(mouserEvn)


}
