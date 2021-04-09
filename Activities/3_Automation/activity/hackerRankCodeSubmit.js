"use strict";

const puppeteer = require("puppeteer");
const fs = require("fs");

const { email, password } = JSON.parse(
    fs.readFileSync("secret/authDetail.json")
);
const { codes } = require("./codes");

//launch browser
const browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
});

// global tab variable so all functions can use it
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
        const ipKitClick = waitAndClick(
            ".card-content h3[title='Interview Preparation Kit']"
        );
        return ipKitClick;
    })
    .then(function () {
        const warmupClick = waitAndClick("a[data-attr1='warmup']");
        return warmupClick;
    })
    .then(function () {
        const url = gtab.url();
        const questionObj = codes[0];
        let qChain = questionSolver(url, questionObj.soln, questionObj.qName);
        for (let i = 1; i < codes.length; i++) {
            qChain = qChain.then(function () {
                return questionSolver(url, codes[i].soln, codes[i].qName);
            });
        }
        return qChain;
    })
    .catch(function (err) {
        console.log(err);
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

function questionSolver(pageUrl, code, questionName) {
    return new Promise(function (resolve, reject) {
        const gotoPageUrlPromise = gtab.goto(pageUrl);
        gotoPageUrlPromise
            .then(function () {
                //function will run inside browser (not in node)
                function browserConsole(questionName) {
                    //getting all question Name from DOM and clicking on the questionName passed as argument
                    let allH4Elem = document.querySelectorAll("h4");
                    allH4Elem = [...allH4Elem];
                    const textArr = allH4Elem.map((elem) => {
                        const question = elem.innerText.split("\n")[0];
                        return question;
                    });
                    const idx = textArr.indexOf(questionName);
                    allH4Elem[idx].click();
                }

                // evaluate method given by puppeteer to make a callback run on browser
                const questionClickPromise = gtab.evaluate(
                    browserConsole,
                    questionName
                );
                return questionClickPromise;
            })
            .then(function () {
                // clicking custom input checkbox
                const checkboxClickPromise = waitAndClick(
                    ".custom-checkbox.inline"
                );
                return checkboxClickPromise;
            })
            .then(function () {
                //type in custom input area
                const typeInCustomInput = gtab.type(".custominput", code);
                return typeInCustomInput;
            })
            .then(function () {
                return gtab.keyboard.down("Control");
            })
            .then(function () {
                return gtab.keyboard.press("a");
            })
            .then(function () {
                return gtab.keyboard.press("x");
            })
            .then(function () {
                return gtab.click(".monaco-editor.no-user-select.vs");
            })
            .then(function () {
                return gtab.keyboard.press("a");
            })
            .then(function () {
                return gtab.keyboard.press("v");
            })
            .then(function () {
                return gtab.keyboard.up("Control");
            })
            .then(function () {
                return gtab.click(
                    ".pull-right.btn.btn-primary.hr-monaco-submit"
                );
            })
            .then(function () {
                resolve();
            })
            .catch(function () {
                reject(err);
            });
    });
}
