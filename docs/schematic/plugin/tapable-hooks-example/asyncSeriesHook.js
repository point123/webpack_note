const { AsyncSeriesHook } = require("tapable");

const asyncSeriesHook = new AsyncSeriesHook(["x"]);

asyncSeriesHook.tap("1", (x) => {
    console.log("同步hook1");
    return 2;
})

asyncSeriesHook.tapAsync("2",(x, callback) => {
    setTimeout(() => {
        console.log("异步hook1");
        callback(0);
    }, 1000)
})

asyncSeriesHook.tapAsync("3",(x, callback) => {
    console.log("异步hook2");
    callback(0)
})

asyncSeriesHook.tap("4", (x) => {
    console.log("同步hook2");
})

asyncSeriesHook.tapPromise("5", arg => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("promise-hook1");
            resolve(2)
        },1000)
    }) 
})

asyncSeriesHook.tapPromise("6", arg => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("promise-hook2");
            resolve(1);
        },10)
    }) 
})

asyncSeriesHook.tap("7", (x) => {
    console.log("同步hook3");
    return 1;
})

asyncSeriesHook.tapAsync("8",(x, callback) => {
    console.log("异步hook3");
    callback(0, 10);
})

// asyncSeriesHook.callAsync(2, function () {
//     console.log("参数", ...arguments);
//     console.log("ok");
// });

asyncSeriesHook.promise("3")
.then(function() {
    console.log("then", ...arguments);
})
.catch(function() {
    console.log("error", ...arguments);
})
.finally(() => {
    console.log("ok");
})