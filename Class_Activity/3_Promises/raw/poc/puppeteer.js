"use strict";

const puppeteer = require("puppeteer");

const browserPromise = puppeteer.launch({ headless: false });

let gtab;
//Bad way of writing async code, callback hell
// browserPromise.then(function (browser) {
//     let newTabPromise = browser.newPage();
//     newTabPromise.then(function (newTab) {
//         gtab = newTab;
//         const goToGooglePromise = newTab.goto("https://www.google.com");
//         goToGooglePromise.then(function () {
//             const searchPromise = gtab.type(
//                 "input[aria-label='Search']",
//                 "pepcoding",
//                 { delay: 100 }
//             );
//             searchPromise.then(function () {
//                 const pressEnterPromise = gtab.keyboard.press("Enter");
//                 pressEnterPromise.then(function () {
//                     console.log("search done");
//                 });
//             });
//         });
//     });
// });

//better way of writing async code, chaining promises
browserPromise
    .then(function (browser) {
        const newTabPromise = browser.newPage();
        return newTabPromise;
    })
    .then(function (newTab) {
        gtab = newTab;
        const goToGooglePromise = gtab.goto("https://www.google.com");
        return goToGooglePromise;
    })
    .then(function () {
        const typeTextPromsie = gtab.type(
            "input[aria-label='Search']",
            "pepcoding",
            { delay: 100 }
        );
        return typeTextPromsie;
    })
    .then(function () {
        const pressEnterPromise = gtab.keyboard.press("Enter");
        return pressEnterPromise;
    })
    .then(function () {
        console.log("done");
    });
