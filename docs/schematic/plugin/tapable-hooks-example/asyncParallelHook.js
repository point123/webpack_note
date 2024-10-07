const { AsyncParallelHook } = require("tapable");

const hook = new AsyncParallelHook(["name"]);

hook.tap("1", (x) => {
    console.log("同步hook1", x);
    return 3;
})

// 并发执行,1s后两个函数都会执行
hook.tapAsync("2", (x , cb) => {
    cb(2)
    setTimeout(() => {
        console.log("异步Hook1", x);
        cb(0,1);
    },1000)
})

hook.tapAsync("5", (x , cb) => {
    setTimeout(() => {
        console.log("异步Hook2", x);
        cb();
    },1000)
})

hook.tapPromise("3", (x) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("pormise-hook", x);
            // resolve(3);
            // resolve(1);
            reject(null);
        },1000);
    });
})

hook.tap("4", (x) => {
    console.log("同步hook2", x);
})

// hook.callAsync(1, (arg1, arg2) => {
//     console.log("完成", arg1, arg2);
// })

hook.promise(1)
.then(function () {
    console.log("then", ...arguments);
})
.catch(function () {
    console.log("err", ...arguments);
})
.finally(() => {
    console.log("完成");
})