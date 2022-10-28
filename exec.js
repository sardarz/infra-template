import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);
async function getDescription(patchVersion) {
  
  let version = patchVersion === 0 ? "rc-0.0.0" : `rc-0.0.${patchVersion - 10}...rc-0.0.${patchVersion}`
  const data = await execPromise(`git log --pretty="%h %cn %B" ${version}`)

  return data.stdout
}

const data = await getDescription(21)

console.log("------------------------------")
console.log(data.split("\n").filter(x => x.length).join("\n"))
console.log("------------------------------")