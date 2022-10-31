import fetch from "node-fetch";
import child_processes from "child_process";
import { promisify } from "util";
import github from "@actions/github";

const { AUTH, ORG_ID } = process.env;

const exec = promisify(child_processes.exec);

const headers = {
  Authorization: `OAuth ${AUTH}`,
  "X-Org-ID": ORG_ID,
};

const createImage = async () => {
  const regex = /rc-\d+.\d+.\d+/;
  const ref = github.context.ref;
  const tag = ref.match(regex)[0];
  const commentURL = `https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-168/comments`;

  await exec(`docker build -t ${tag} .`);

  fetch(commentURL, {
    method: "POST",
    headers,
    body: JSON.stringify(`Собрали образ с тегом ${tag}`)
  })
};

createImage()