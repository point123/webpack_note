const { SyncLoopHook } = require("tapable");

const syncLoopHook = new SyncLoopHook(["a"]);

let count1 = 0;
let count2 = 1;
// 如果任何一个函数的返回值不为undefined,则从第一个函数重新开始执行
syncLoopHook.tap("1", (x) => {
    if ( count1 !== 3 ) {
        console.log(`1: 当前count1值为${count1},不等于3,重头执行`);
        return count1++;
    }
    console.log(`1: 当前count1值为${count1},等于3`);
});

syncLoopHook.tap("2", (x) => {
    if (count2 !== 2) {
        console.log(`2: 当前count2值为${count2},不等于2,重头执行`);
        return count2++;
    }
    console.log(`2: 当前count2值为${count2},等于2`);
});

syncLoopHook.call(1);

// syncLoopHook.callAsync(1, () => {
//     console.log("done");
// })

// syncLoopHook.promise(1).then(() => {
//     console.log("done");
// })

//  output:
//  1: 当前count1值为0,不等于3,重头执行
//  1: 当前count1值为1,不等于3,重头执行
//  1: 当前count1值为2,不等于3,重头执行
//  1: 当前count1值为3,等于3
//  2: 当前count2值为1,不等于2,重头执行
//  1: 当前count1值为3,等于3
//  2: 当前count2值为2,等于2
//  done(当使用callAsync或promise时)
