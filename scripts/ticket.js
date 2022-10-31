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
  const date = new Date().getDate()
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()
  const header = `Релиз ${tag} - ${date}/${month}/${year}`
  const data = await getDescription(patchVersion)
  const responsible = `Ответственный за релиз: ${author}\n\n`
  const description = responsible + data.split("\n").filter(x => x.length).join("\n")
  const dataToBeSend = {
    summary: header,
    description
  }
  fetch(ticketURL, {
    method: "PATCH",
    headers,
    body: JSON.stringify(dataToBeSend)
  })
}

async function getDescription(patchVersion) {  
  let version = patchVersion === 1 ? "rc-0.0.1" : `rc-0.0.${patchVersion - 1}...rc-0.0.${patchVersion}`
  const data = await exec(`git log --pretty="%h %cn %B" ${version}`)

  return data.stdout
}

releaseTicket();
