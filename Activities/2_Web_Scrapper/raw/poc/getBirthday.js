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
            "tbody tr td.batsman-cell a"
        );

        for (let j = 0; j < rows.length; j++) {
            const link = selector(rows[j]).attr("href");
            request(link, function (err, res, body) {
                if (err) {
                    console.log(err);
                } else {
                    const selector = cheerio.load(body);
                    const rawData = selector(".ciPlayerinformationtxt span");
                    // const dob = rawData
                    //     .text()
                    //     .split("\n")[1]
                    //     .split(",")
                    //     .splice(0, 2);
                    const dob = selector(rawData[1]).text().slice(1); // slice to remove a '\n' at first index
                    const playerName = selector(rows[j]).text().trim();
                    console.log(
                        `${playerName} plays for ${teams[i]} and was born on ${dob}`
                    );
                    console.log("````````````````````````````");
                }
            });
        }
    }
}
