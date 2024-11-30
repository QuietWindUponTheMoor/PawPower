let mainLoopTimer = 10; // 10 ms
let effector = mainLoopTimer / 1000; // Makes the visual timer more realistic

setInterval(async () => await mainLoop(), mainLoopTimer);