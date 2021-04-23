"use strict";

const fs = require("fs");

const f1 = fs.promises.readFile("f1.txt");
const f2 = fs.promises.readFile("f2.txt");
const f3 = fs.promises.readFile("f3.txt");

const combinedPromise = Promise.all([f1, f2, f3]);
combinedPromise.then(function (combinedPromiseArr) {
    for (let i = 0; i < combinedPromiseArr.length; i++) {
        console.log("data --> " + combinedPromiseArr[i]);
    }
});
