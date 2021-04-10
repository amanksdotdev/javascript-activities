"use strict";

const puppeteer = require("puppeteer");
const fs = require("fs");

const { email, password } = JSON.parse(
    fs.readFileSync("secret/authDetail.json")
);
const { codes } = require("./codes");

//launch browser
(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
        });

        const newTab = await browser.newPage();
        await newTab.goto("https://www.hackerrank.com/auth/login");
        await newTab.type("#input-1", email, { delay: 100 });
        await newTab.type("#input-2", password, {
            delay: 100,
        });
        await newTab.keyboard.press("Enter");
        await waitAndClick(
            ".card-content h3[title='Interview Preparation Kit']",
            newTab
        );
        await waitAndClick("a[data-attr1='warmup']", newTab);

        const url = newTab.url();
        for (let i = 0; i < codes.length; i++) {
            await questionSolver(url, codes[i].soln, codes[i].qName, newTab);
        }
    } catch (err) {
        console.log(err);
    }
})();

async function waitAndClick(selector, newTab) {
    await newTab.waitForSelector(selector, { visible: true });
    return newTab.click(selector);
}

async function questionSolver(pageUrl, code, questionName, newTab) {
    await newTab.goto(pageUrl);
    function browserConsole(questionName) {
        let allH4Elem = document.querySelectorAll("h4");
        allH4Elem = [...allH4Elem];
        const textArr = allH4Elem.map((elem) => {
            const question = elem.innerText.split("\n")[0];
            return question;
        });
        const idx = textArr.indexOf(questionName);
        allH4Elem[idx].click();
    }

    await newTab.evaluate(browserConsole, questionName);
    await waitAndClick(".custom-checkbox.inline", newTab);
    await newTab.type(".custominput", code);
    await newTab.keyboard.down("Control");
    await newTab.keyboard.press("a");
    await newTab.keyboard.press("x");
    await newTab.click(".monaco-editor.no-user-select.vs");
    await newTab.keyboard.press("a");
    await newTab.keyboard.press("v");
    await newTab.keyboard.up("Control");
    return newTab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
}
