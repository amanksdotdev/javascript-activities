"use strict";

const fs = require("fs");
const path = require("path");

const input = process.argv.slice(2);

// converting relative path to absolute path
let dirpath = path.resolve(input[0]);

// calling view tree
viewTree(dirpath, "");

function viewTree(dirpath, indent) {
    if (isFile(dirpath)) {
        // const fileName = dirpath.split("/").pop();
        const fileName = path.basename(dirpath);
        console.log(indent, fileName + "*");
    } else {
        // const fileName = dirpath.split("/").pop();
        const fileName = path.basename(dirpath);
        console.log(indent, fileName);

        let children = getChildren(dirpath);

        for (let i = 0; i < children.length; i++) {
            // let childPath = dirpath + "/" + children[i];
            let childPath = path.join(dirpath, children[i]);
            viewTree(childPath, indent + "\t");
        }
    }
}

function isFile(dirpath) {
    return fs.existsSync(dirpath) && fs.lstatSync(dirpath).isFile();
}

function getChildren(dirpath) {
    return fs.readdirSync(dirpath);
}
