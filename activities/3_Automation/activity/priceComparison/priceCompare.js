"use strict";
const puppeteer = require("puppeteer");
const links = [
    "https://www.amazon.in",
    "https://www.flipkart.com",
    "https://paytmmall.com/",
];
const pName = process.argv[2];

console.log("Before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
        });
        console.log("\n****AMAZON PRICE LIST****\n");
        await getListingFromAmazon(links[0], browserInstance, pName);
        console.log(`\n****FLIPKART PRICE LIST*******\n`);
        await getListingFromFlipkart(links[1], browserInstance, pName);
        console.log(`\n****PAYTM PRICE LIST*******\n`);
        await getListingFromPaytm(links[2], browserInstance, pName);
    } catch (err) {
        console.log(err);
    }
})();

//  product Name,url of amazon home page
// output-> top 5 matching product -> price Name print
async function getListingFromAmazon(link, browserInstance, pName) {
    const newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.type("input[aria-label='Search']", pName, { delay: 200 });
    await newTab.keyboard.press("Enter");
    const nameSelector = ".a-size-medium.a-color-base.a-text-normal";
    const priceSelector = ".a-price-whole";
    await newTab.waitForSelector(nameSelector, {
        visible: true,
    });

    const productArr = await newTab.evaluate(
        getDataFromBrowser,
        nameSelector,
        priceSelector
    );
    // display(productArr);
    console.table(productArr);
    // console.log(productArr);
    console.log("done for AMAZON");
}

async function getListingFromFlipkart(link, browserInstance, pName) {
    const newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.type("input[type='text']", pName, { delay: 200 });
    await newTab.keyboard.press("Enter");
    const nameSelector = "._4rR01T";
    const priceSelector = "._30jeq3._1_WHN1";
    await newTab.waitForSelector(nameSelector, { visible: true });
    const productArr = await newTab.evaluate(
        getDataFromBrowser,
        nameSelector,
        priceSelector
    );
    // display(productArr);
    console.table(productArr);
    // console.log(productArr);
    console.log("done for FLIPKART");
}

async function getListingFromPaytm(link, browserInstance, pName) {
    const newTab = await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.type("input[type='search']", pName, { delay: 200 });
    await newTab.keyboard.press("Enter");
    const nameSelector = ".UGUy";
    const priceSelector = ".pCOS ._1kMS span";
    await newTab.waitForSelector(nameSelector, { visible: true });
    const productArr = await newTab.evaluate(
        getDataFromBrowser,
        nameSelector,
        priceSelector
    );
    // display(productArr);
    console.table(productArr);
    // console.log(productArr);
    console.log("done for PAYTM");
}

function getDataFromBrowser(nameSelector, priceSelector) {
    let allItemName = document.querySelectorAll(nameSelector);
    let allItemPrice = document.querySelectorAll(priceSelector);
    const arrOfObj = [];
    for (
        let i = 0;
        i < 5 && i < allItemName.length && i < allItemPrice.length;
        i++
    ) {
        arrOfObj[i] = {
            name: allItemName[i].innerText,
            price: allItemPrice[i].innerText,
        };
    }

    return arrOfObj;
}

function display(productArr) {
    for (let i = 0; i < productArr.length; i++) {
        console.log(
            `Product Name: ${productArr[i].name}\nPrice: ${productArr[i].price}\n`
        );
    }
}
