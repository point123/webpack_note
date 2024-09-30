const { SyncBailHook } = require('tapable');

const bailHook = new SyncBailHook(["arg"]);

// 存在返回值为非undefined的情况下,不会执行后续的回调函数
bailHook.tap("bail1", (arg) => {
    console.log("bail1");
    return 1;
})

// 该函数不会执行
bailHook.tap("bail2", (arg) => {
    console.log("bail2");
})

bailHook.call();

// bailHook.callAsync("",function() {
//     console.log("done", ...arguments);
// })

// bailHook.promise()
// .then(function() {
//     console.log("done", ...arguments);
// })