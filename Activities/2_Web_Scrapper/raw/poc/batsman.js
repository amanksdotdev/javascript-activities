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
    const teamsRaw = selector(".Collapsible h5.header-title");
    const teams = [];
    for (const teamRaw of teamsRaw) {
        let team = selector(teamRaw).text();
        team = team.split("INNINGS").shift().trim();
        teams.push(team);
    }

    const batsmanTableRaw = selector(".table.batsman");
    for (let i = 0; i < batsmanTableRaw.length; i++) {
        const rows = selector(batsmanTableRaw[i]).find(
            "tbody tr td.batsman-cell"
        );
        console.log("\n*************************************\n");
        for (let j = 0; j < rows.length; j++) {
            const player = selector(rows[j]).text().trim();
            console.log(`${player} plays for ${teams[i]}`);
        }
    }
}
