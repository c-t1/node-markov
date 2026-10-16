/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");


/** make a Markov machine from text and print generated text */

function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}


/** read a file and generate text from it */

function makeTextFromFile(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    }
    generateText(data);
  });
}


/** fetch a URL and generate text from it */

async function makeTextFromURL(url) {
  try {
    let resp = await axios.get(url);
    generateText(resp.data);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
}


/** read the command line to decide what to do */

let method = process.argv[2];
let path = process.argv[3];

if (!path) {
  console.error("Usage: node makeText.js file <path> OR node makeText.js url <url>");
  process.exit(1);
}

if (method === "file") {
  makeTextFromFile(path);
} else if (method === "url") {
  makeTextFromURL(path);
} else {
  console.error(`Unknown method: ${method}. Use "file" or "url".`);
  process.exit(1);
}