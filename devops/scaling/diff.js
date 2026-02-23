import cluster from "cluster";
import os from "os";

const target = 1_000_000_000_0;

// function singleThread() {
//   //single-threaded
//   let ans = 0;
//   let startTime = Date.now();
//   for (let i = 0; i <= target; i++) {
//     ans += i;
//   }
//   let endTime = Date.now();
//   console.log(`Total time: ${endTime - startTime}`);
//   console.log(`Total sum: ${ans}`);
// }

function multiThread() {
  const totalCPUs = os.cpus().length;
  const chunkSize = Math.floor(target / totalCPUs);

  // multi-threaded
  if (cluster.isPrimary) {
    let startTime = Date.now();
    let totalSum = 0;
    let completedWorkers = 0;

    for (let i = 0; i < totalCPUs; i++) {
      const worker = cluster.fork();
      const start = i * chunkSize;
      const end = i === totalCPUs - 1 ? target : (i + 1) * chunkSize - 1;

      setTimeout(() => {
        worker.send({ start, end });
      }, 100);

      worker.on("message", (msg) => {
        totalSum += msg.partialSum;
        completedWorkers++;

        if (completedWorkers === totalCPUs) {
          let endTime = Date.now();
          console.log(`Total time: ${endTime - startTime}`);
          console.log(`Total sum: ${totalSum}`);
          process.exit();
        }
      });
    }
  } else {
    process.on("message", (msg) => {
      const startTime = Date.now();
      const { start, end } = msg;

      let partialSum = 0;

      for (let i = start; i <= end; i++) {
        partialSum += i;
      }
      process.send({ partialSum: partialSum.toString() });
      let endTime = Date.now();
      console.log(
        `Time taken by worker ${process.pid} is: ${endTime - startTime}`,
      );
    });
  }
}

// singleThread();
multiThread();
