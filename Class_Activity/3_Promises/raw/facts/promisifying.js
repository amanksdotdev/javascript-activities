"use strict";

const fs = require("fs");

//creating our own function that returns a promise, converted callback code to promise
const readFilePromise = function (path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const token = readFilePromise("f1.txt");

token.then(function (data) {
    console.log(data.toString());
});

token.catch(function (err) {
    console.log(err);
});
