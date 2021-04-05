"use strict";

const request = require("request");
const cheerio = require("cheerio");

console.log("Before");

request("https://www.google.com", cb);

function cb(error, response, html) {
    if (error) {
        console.log(error);
    } else {
        extractHTML(html);
    }
}

function extractHTML(html) {
    const selecter = cheerio.load(html);
    const rawElement = selecter("#SIvCob");
    console.log(rawElement.text());
}

console.log("After");
