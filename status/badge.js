const fs = require("fs");
const fsPromise = fs.promises;
const got = require("got");
const { makeBadge, ValidationError } = require("badge-maker");
const { info } = require("console");

const problems_api = "https://leetcode.com/api/problems/all/";
const source_dir = "./../";

(async () => {
  const body = await got(problems_api, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3579.0 Safari/537.36",
      Accept: "application/json, text/javascript, */*; q=0.01",
      Referer: "https://leetcode.com/problemset/all/",
    },
  }).json();
  let problems = body.stat_status_pairs;
  let files = await fsPromise.readdir(source_dir);
  let py_files = files
    .filter((item) => item.endsWith(".py"))
    .map((item) => item.split("-")[0]);
  let record = new Map();
  let status = {};
  status["level_cnt"] = new Array(4).fill(0);
  status["level_fin"] = new Array(4).fill(0);
  problems.forEach((item) => {
    let id = item.stat.frontend_question_id;
    let level = item.difficulty.level;
    status["level_cnt"][level] += 1;
    record.set(id, item);
  });
  py_files.forEach((item) => {
    if (isNaN(item)) {
      status["level_fin"][0] += 1;
    } else if (record.has(parseInt(item))) {
      let info = record.get(parseInt(item));
      status["level_fin"][info.difficulty.level] += 1;
    }
  });
  console.log(status);
})();
