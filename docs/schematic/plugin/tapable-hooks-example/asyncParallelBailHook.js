const { AsyncParallelBailHook } = require("tapable");

const hook = new AsyncParallelBailHook(["name"]);

hook.tap("1", x => {
    console.log("同步hook");
    // return 0;
});

hook.tapAsync("2", (x,cb) => {
    setTimeout(() => {
        console.log("异步hook1", x);
        cb(0,undefined);
    }, 1000);
})

hook.tapPromise("3", x => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log("pormise-hook", x);
            // resolve(0);
            reject(0)
        },1000);
    })
})

hook.tapAsync("4", (x,cb) => {
    setTimeout(() => {
        console.log("异步hook2", x);
        cb();
    },1000);
})

// hook.callAsync(3, function() {
//     console.log("完成", ...arguments);
// })

hook.promise(3)
.then(res => {
    console.log("then", res);
})
.catch(err => {
    console.log("err", err);
})
.finally(() => {
    console.log("完成");
})