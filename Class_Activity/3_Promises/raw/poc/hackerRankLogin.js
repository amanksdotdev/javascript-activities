"use strict";

const puppeteer = require("puppeteer");
const fs = require("fs");
const { email, password } = JSON.parse(
    fs.readFileSync("../../activity/secret/authDetail.json")
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
        const typePasswordPromise = gtab.type("input-2", password, {
            delay: 200,
        });
        return typePasswordPromise;
    })
    .then(function () {
        const pressEnterPromise = gtab.keyboard.press("Enter");
        return pressEnterPromise;
    });
