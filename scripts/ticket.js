const github = require("@actions/github");
const exec = require("@actions/exec");
const fetch = require("node-fetch")

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

}

releaseTicket()