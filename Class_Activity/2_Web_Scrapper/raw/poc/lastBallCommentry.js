"use strict";

const request = require("request");
const cheerio = require("cheerio");

request(
    "https://www.espncricinfo.com/series/england-tour-of-india-2020-21-1243364/india-vs-england-4th-t20i-1243391/ball-by-ball-commentary",
    cb
);

function cb(err, res, body) {
    if (err) {
        console.log(err);
    } else {
        extractHTML(body);
    }
}

function extractHTML(html) {
    const selector = cheerio.load(html);
    const rawElement = selector(
        ".col-14.col-md-15.col-lg-14 .match-comment-long-text"
    );
    // rawElement[0].text();  methods will not work on indexes we have to wrap it inside selector to make it work
    const lastBallComment = selector(rawElement[0]).text();
    console.log(lastBallComment);
}
