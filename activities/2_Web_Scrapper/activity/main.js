"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");

const baseUrl = "https://github.com";

request(baseUrl + "/topics", function (err, res, body) {
    if (err) {
        console.log(err);
    } else {
        extractTopics(body);
    }
});

function extractTopics(html) {
    const selector = cheerio.load(html);
    const topics = selector(".topic-box");
    for (let topic of topics) {
        const topicAnchor = selector(topic).find("a");
        const topicURL = baseUrl + topicAnchor.attr("href");
        gotoTopicURL(topicURL);
    }
}

function gotoTopicURL(url) {
    request(url, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            extractRepos(body);
        }
    });
}

function extractRepos(html) {
    const selector = cheerio.load(html);
    const topicName = selector(".h1-mktg").text().trim();
    createDirectory(topicName);
    // console.log(topicName);
    const repoLinks = selector("a.text-bold");

    for (let i = 0; i < repoLinks.length && i < 8; i++) {
        const repoName = selector(repoLinks[i]).text().trim();
        createFile(topicName, repoName);
        const repoLink =
            baseUrl + selector(repoLinks[i]).attr("href") + "/issues";
        gotoIssues(repoLink, topicName, repoName);
    }
}

function gotoIssues(url, topicName, repoName) {
    request(url, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            exractIssues(body, topicName, repoName);
        }
    });
}

function exractIssues(html, topicName, repoName) {
    const selector = cheerio.load(html);
    const issueLinks = selector("a.Link--primary.markdown-title");
    const arr = [];
    for (let i = 0; i < issueLinks.length && i < 8; i++) {
        const issueName = selector(issueLinks[i]).text().trim();
        const issueLink = baseUrl + selector(issueLinks[i]).attr("href");
        arr.push({
            name: issueName,
            url: issueLink,
        });
    }
    const filePath = path.join(__dirname, topicName, repoName + ".json");
    fs.writeFileSync(filePath, JSON.stringify(arr));
}

function createDirectory(topicName) {
    const dirPath = path.join(__dirname, topicName);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
}

function createFile(topicName, repoName) {
    const filePath = path.join(__dirname, topicName, repoName + ".json");
    if (!fs.existsSync(filePath)) {
        let createStream = fs.createWriteStream(filePath);
        createStream.end();
    }
}
