import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);
console.log(execPromise);

async function showCLI() {
  const data = await execPromise(`git log --pretty="%h %cn %B" rc-0.0.10...rc-0.0.11`)
  console.log(data.stdout);
}

showCLI();
