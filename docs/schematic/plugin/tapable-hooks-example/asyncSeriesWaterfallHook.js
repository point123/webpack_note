const { AsyncSeriesWaterfallHook } = require("tapable");

const hook = new AsyncSeriesWaterfallHook(["x","y","z"]);

hook.tap("1",(arg1, arg2, arg3) => {
    console.log("同步hook1", arg1, arg2, arg3);
    // return 0;
})

hook.tapAsync("2", (arg1, arg2, arg3, cb) => {
    setTimeout(() => {
        console.log("异步hook", arg1, arg2, arg3);
        cb(0,undefined);
    },1000);
});

hook.tapPromise("3", (arg1, arg2, arg3) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("PromiseHook", arg1, arg2, arg3);
            // resolve(0);
            reject(2);
        }, 1000);
    });
})

hook.tap("4",(arg1, arg2, arg3) => {
    console.log("同步hook1", arg1, arg2, arg3);
    // return 0;
})

// hook.callAsync("6", "4", "9", function () {
//     console.log("回调参数", ...arguments);
//     console.log("完成");
// })


hook.promise("3","4","5")
.then(function () {
    console.log("then", ...arguments);
})
.catch(function () {
    console.log("错误", ...arguments);
})
.finally(() => {
    console.log("完成");
})