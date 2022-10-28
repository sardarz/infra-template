import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

async function showCLI() {
  const data = await execPromise(`git log --pretty="%h %cn %B" rc-0.0.10...rc-0.0.11`)
  const ls = await execPromise("ls -1")
  console.log(data.stdout);
  console.log(ls.stdout)
}

showCLI();

async function getDescription(patchVersion) {
  
  let version = patchVersion === 0 ? "rc-0.0.0" : `rc-0.0.${patchVersion - 1}...rc-0.0.${patchVersion}`
  const st = await execPromise("git status")
  console.log(st.stdout)
  const data = await execPromise(`git log --pretty="%h %cn %B" ${version}`)

  return data.stdout
}

const data = await getDescription(2)

console.log(data)