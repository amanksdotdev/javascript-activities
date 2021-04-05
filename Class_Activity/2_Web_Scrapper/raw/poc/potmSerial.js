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
        const selector = cheerio.load(body);
        const rawElement = selector(
            ".match-score-block .match-info-link-FIXTURES"
        );
        // const rawElement = selector("a[data-hover='Scorecard']");
        printPlayer(rawElement, 0, selector);
    }
}

function printPlayer(rawElement, idx, selector) {
    if (idx === rawElement.length) {
        return;
    }
    let link = selector(rawElement[idx]).attr("href");
    link = "https://www.espncricinfo.com" + link;
    request(link, function (err, res, body) {
        const sel = cheerio.load(body);
        const bestPlayer = sel(".best-player-name");
        console.log(bestPlayer.text());
        printPlayer(rawElement, idx + 1, selector);
    });
}
