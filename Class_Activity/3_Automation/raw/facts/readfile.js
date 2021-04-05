"use strict";

const fs = require("fs");

//reading file asynchronously using CALLBACK
console.log("before");
fs.readFile("f1.txt", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("data --> " + data);
    }
});
console.log("after");

//reading file asynchronously using PROMISES
console.log("before");

//getting promise
const token = fs.promises.readFile("f2.txt");

console.log(token); //printing current state of promise

//consuming promise
token
    .then(function (data) {
        console.log("data --> " + data);
    })
    .catch(function (err) {
        console.log(err);
    });

console.log("after");

// setTimeout(function () {
//     console.log(token);
// }, 3000);
