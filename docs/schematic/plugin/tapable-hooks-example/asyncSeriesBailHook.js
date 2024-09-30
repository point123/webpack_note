const { AsyncSeriesBailHook } = require("tapable");

const hook = new AsyncSeriesBailHook(["x"]);

hook.tap("1", (x) => {
    console.log("同步Hook");
    // return 1;
})

hook.tapAsync("2", (x, cb) => {
    setTimeout(() => {
        console.log("异步Hook1");
        cb();
    },1000)
});

hook.tapPromise("3", x => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log("PromiseHook1");
            // resolve(0);
            reject()
        }, 1000);
    })
})

hook.tapAsync("4", (x, cb) => {
    setTimeout(() => {
        console.log("异步Hook2");
        cb(0);
    },1000)
});

// hook.callAsync(1, function() {
//     console.log("参数", ...arguments);
//     console.log("ok");
// })

hook.promise(1)
.then(function () {
    console.log("then", ...arguments);
})
.catch(function () {
    console.log("catch", ...arguments);
})
.finally(() => {
    console.log("done");
})