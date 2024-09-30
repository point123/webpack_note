const { SyncWaterfallHook } = require("tapable");

const syncWaterfallHook = new SyncWaterfallHook(["x","y","z"]);

// 执行过程中,如果存在值为非undefined的返回值
// 那么该值会作为后续每个函数的第一个参数,直到被新的返回值覆盖
syncWaterfallHook.tap("1", (a,b,c) => {
    console.log(a,b,c); // 1 2 3
    return null;
});

syncWaterfallHook.tap("1", (a,b,c) => {
    console.log(a,b,c); // null 2 3
    return 20;
})

syncWaterfallHook.tap("1", (a,b,c) => {
    console.log(a,b,c); // 20 2 3
})

syncWaterfallHook.tap("1", (a,b,c) => {
    console.log(a,b,c); // 20 2 3
})

syncWaterfallHook.call("1","2","3");

// syncWaterfallHook.callAsync("1","2","3",function() {
//     console.log("done", ...arguments);
// })

// syncWaterfallHook.promise("1","2","3").then( function() {
//     console.log("done", ...arguments);
// })

