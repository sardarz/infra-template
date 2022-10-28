import fetch from "node-fetch";
import child_processes from "child_process"
import { promisify } from "util";
import github from "@actions/github";

const { AUTH, ORG_ID } = process.env;

const headers = {
  Authorization: `OAuth ${AUTH}`,
  "X-Org-ID": ORG_ID,
};

const exec = promisify(child_processes.exec)

async function releaseTicket() {
  const ticketURL = `https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-168`;
  const author = github.context.actor;
  const regex = /rc-\d+.\d+.\d+/
  const ref = github.context.ref

  const tag = ref.match(regex)[0];
  const patchVersion = tag.split(".").pop();

  let desc = getDescription(patchVersion)
  getDescription(patchVersion).then(value => {
    console.log("from promise description", value)
  })
  console.log("desc", desc)
}

async function getDescription(patchVersion) {
  
  let version = patchVersion === 0 ? "rc-0.0.0" : `rc-0.0.${patchVersion - 1}...rc-0.0.${patchVersion}`
  await exec("git status")
  const data = await exec(`git log --pretty="%h %cn %B" ${version}`)

  return data.stdout

}

releaseTicket();
