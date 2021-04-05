"use strict";

const puppeteer = require("puppeteer");
const fs = require("fs");

const { email, password } = JSON.parse(
    fs.readFileSync("secret/authDetail.json")
);

const browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
});

let gtab;
browserPromise
    .then(function (browserInstance) {
        const newTabPromise = browserInstance.newPage();
        return newTabPromise;
    })
    .then(function (newTab) {
        gtab = newTab;
        const loginPagePromise = newTab.goto(
            "https://www.hackerrank.com/auth/login"
        );
        return loginPagePromise;
    })
    .then(function () {
        const typeEmailPromise = gtab.type("#input-1", email, { delay: 200 });
        return typeEmailPromise;
    })
    .then(function () {
        const typePasswordPromise = gtab.type("#input-2", password, {
            delay: 200,
        });
        return typePasswordPromise;
    })
    .then(function () {
        const pressEnterPromise = gtab.keyboard.press("Enter");
        return pressEnterPromise;
    })
    .then(function () {
        const warmupClick = waitAndClick(
            ".card-content h3[title='Interview Preparation Kit']"
        );
        return warmupClick;
    })
    .then(function () {
        const url = gtab.url();

    });

function waitAndClick(selector) {
    return new Promise(function (resolve, reject) {
        const selectorWaitPromise = gtab.waitForSelector(selector, {
            visible: true,
        });
        selectorWaitPromise
            .then(function () {
                const selectorClickPromise = gtab.click(selector);
                return selectorClickPromise;
            })
            .then(function () {
                resolve();
            })
            .catch(function () {
                reject(err);
            });
    });
}
