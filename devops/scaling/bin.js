import cluster from "cluster";
import os from "os";
import { app } from "./index.js";

const totalCPUs = os.cpus().length;
const PORT = 3000;

// vertical scaling of single threaded javascript app
// even though the system have multiple cores, the app can only use one core at a time, so if we are vertically scaling the application we need to implement worker nodes concept

if (cluster.isPrimary) {
  console.log(`Total CPUs: ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  // fork workers
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
