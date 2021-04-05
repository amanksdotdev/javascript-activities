"use strict";

const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const request = require("request");

const baseUrl = "https://github.com";

request(baseUrl + "/topics", function (err, res, body) {
    if (err) {
        console.log(err);
    } else {
        const topicSelector = cheerio.load(body);
        const topics = topicSelector(".topic-box");
        const topicsNames = topics.find(".f3.text-center.Link--primary");
        for (let i = 0; i < topicsNames.length; i++) {
            const topicName = topicSelector(topicsNames[i]).text().trim();
            createDirectory(topicName);
            const topicAnchor = topicSelector(topics[i]).find("a");
            const topicLink = baseUrl + topicAnchor.attr("href");

            request(topicLink, function (err, res, body) {
                const repoSelector = cheerio.load(body);
                const repos = repoSelector("a.text-bold");
                for (let i = 0; i < repos.length && i < 8; i++) {
                    const repoName = repoSelector(repos[i]).text().trim();
                    createFiles(repoName, topicName);
                }
            });
        }
    }
});

function createDirectory(topicName) {
    const dirPath = path.join(__dirname, topicName);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
}

function createFiles(repoName, topicName) {
    const filePath = path.join(__dirname, topicName);
    if (!fs.existsSync(repoName)) {
        var createStream = fs.createWriteStream("JournalDEV.txt");
        createStream.end();
    }
}
