"use strict";

const fs = require("fs");
const path = require("path");

const input = process.argv.slice(2);

const dirpath = path.resolve(input[0]);

viewFlat(dirpath);

function viewFlat(dirpath) {
    if (isFile(dirpath)) {
        console.log(dirpath + "*");
    } else {
        console.log(dirpath);

        let children = getChildren(dirpath);

        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(dirpath, children[i]);
            viewFlat(childPath);
        }
    }
}

function isFile(dirpath) {
    return fs.existsSync(dirpath) && fs.lstatSync(dirpath).isFile();
}

function getChildren(dirpath) {
    return fs.readdirSync(dirpath);
}
