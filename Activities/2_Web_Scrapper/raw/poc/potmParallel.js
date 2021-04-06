"use strict";

const request = require("request");
const cheerio = require("cheerio");

const url =
    "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

request(url, cb);

function cb(err, res, body) {
    if (err) {
        console.log(err);
    } else {
        extractHTML(body);
    }
}

function extractHTML(html) {
    const selector = cheerio.load(html);
    const rawElement = selector(".match-score-block .match-info-link-FIXTURES");
    // const rawElement = selector("a[data-hover='Scorecard']");
    for (let i = 0; i < rawElement.length; i++) {
        let link = selector(rawElement[i]).attr("href");
        link = "https://www.espncricinfo.com" + link;
        request(link, function (err, res, body) {
            if (err) {
                console.log(err);
            } else {
                const selector = cheerio.load(body);
                const rawElement = selector(".best-player-name");
                console.log(rawElement.text());
            }
        });
    }
}
