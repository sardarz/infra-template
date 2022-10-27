import fetch from "node-fetch";
import exec from "@actions/exec";
import github from "@actions/github";

const { AUTH, ORG_ID } = process.env;

const headers = {
  Authorization: `OAuth ${AUTH}`,
  "X-Org-ID": ORG_ID,
};

async function releaseTicket() {
  const ticketURL = `https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-168`;
  const author = github.context.actor;
  const regex = /rc-\d+-\d+-\d+/
  const ref = github.context.ref

  console.log("ref", ref)
  console.log("github.context", github.context)

  const tag = ref.match(regex)[0];
  const patchVersion = tag.split(".").pop();

  let desc = getDescription(patchVersion)
  getDescription(patchVersion).then(value => {
    console.log("from promise", value)
  })
  console.log("desc", desc)
}

async function getDescription(patchVersion) {
  let myOutput = "";
  let myError = "";
  const options = {};
  options.listeners = {
    stdout: (data) => {
      myOutput += data.toString();
    },
    stderr: (data) => {
      myError += data.toString();
    },
  };
  let version = patchVersion === 0 ? "rc-0.0.0" : `rc-0.0.${patchVersion - 1}...rc-0.0.${patchVersion}`
  return exec.exec("git log", [`--pretty="%h %cn %B" ${version}`], options)
}

releaseTicket();
