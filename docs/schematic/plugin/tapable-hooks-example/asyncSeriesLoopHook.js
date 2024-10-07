const { AsyncSeriesLoopHook } = require("tapable");

const hook = new AsyncSeriesLoopHook(["x", "y"]);

let count1 = 0;
let count2 = 1;
let count3 = 2;

hook.tap("1", (x,y) => {
    console.log(`同步hook,count1: ${count1}, 参数:${x}, ${y}`);
    if (count1 !== 3) {
        return count1++;
    }
})

hook.tapAsync("2", (x,y,cb) => {
    setTimeout(() => {
        console.log(`异步hook,count2: ${count2}, 参数:${x}, ${y}`);
        if (count2 !== 3) {
            count2++;
            cb(0,1);
        } else {
            cb();
        }
    },1000);
})

hook.tapPromise("3", (x,y) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`promise-hook,count3: ${count3}, 参数:${x}, ${y}`);
            if (count3 !== 3) {
                // resolve(count3++);
                reject();
            }
            resolve();
        }, 1000)
    });
})

hook.callAsync(1,2, function () {
    console.log("结束", ...arguments);
})