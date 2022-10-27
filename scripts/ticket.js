import fetch from "node-fetch";
import exec from "@actions/exec"
import github from "@actions/github"

const {AUTH, ORG_ID} = process.env

const headers = {
  Authorization: `OAuth ${AUTH}`,
  "X-Org-ID": ORG_ID
}

const ticketURL = `https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-168`
const author = github.context.author
const tag = github.context.ref

function releaseTicket() {
  console.log("author: ", author)
  console.log("tag: ", tag)
  console.log(github.context)
  console.log("-----------------")
  console.log("exec", exec)
  console.log("github", github)
}

releaseTicket()