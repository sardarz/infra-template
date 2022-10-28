import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);
console.log(execPromise);

async function showCLI() {
  const data = await execPromise("ls -1")
  console.log(data.stdout);
}

showCLI();
