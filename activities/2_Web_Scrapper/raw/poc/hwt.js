"use strict";

const request = require("request");
const cheerio = require("cheerio");

const url =
    "https://www.espncricinfo.com/series/england-tour-of-india-2020-21-1243364/india-vs-england-4th-t20i-1243391/full-scorecard";

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
    const rawElement = selector(".table.bowler");

    let hwtName = "";
    let hwtWickets = 0;
    let wicketTaken = false;
    // extracting bowler and his wickets from table and pushing to playerData array
    for (let i = 0; i < rawElement.length; i++) {
        const table = selector(rawElement[i]); // take a single table
        const rows = table.find("tbody tr"); // find rows in that table

        for (let row of rows) {
            // loop in the rows and
            const cols = selector(row).find("td"); // get coloumns array for each row
            if (selector(cols[4]).text() > hwtWickets) {
                hwtName = selector(cols[0]).text();
                hwtWickets = selector(cols[4]).text();

                wicketTaken = true;
            }
        }

        if (!wicketTaken) {
            console.log("No wickets taken today");
        }
    }

    console.log(
        `${hwtName} is the highest wicket taker today and he has taken ${hwtWickets} wickets.`
    );
}
