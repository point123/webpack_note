const { SyncHook } = require('tapable');

const hook = new SyncHook(["arg"]);
// 按序执行回调函数
hook.tap("method", (param) => {
    console.log("sync hook1")
    console.log(param);
    return 1;
});

hook.tap("method1", (param) => {
    console.log("sync hook2")
    console.log(param);
});

// 通过call手动调用hook
// hook.call("hello");

hook.callAsync("hi", function() {
    console.log("done", ...arguments);
})

// hook.promise("hello").then((res) => {
//     console.log("done");
// })


