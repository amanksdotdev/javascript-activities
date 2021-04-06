"use strict";

const fs = require("fs");
const path = require("path");

const input = process.argv.slice(2);

let dir = input[0] || ".";
dir = path.resolve(dir);
const counts = {
    dirs: 0,
    files: 0,
};
tree(dir, "", counts);
function tree(dir, prefix, counts) {
    const children = fs.readdirSync(dir);

    for (let i = 0; i < children.length; i++) {
        const childPath = path.join(dir, children[i]);
        const isDirectory = fs.lstatSync(childPath).isDirectory();

        counts[isDirectory ? "dirs" : "files"]++;

        if (i === children.length - 1) {
            console.log(`${prefix}└──${children[i]}`);
            if (isDirectory) {
                tree(childPath, `${prefix}   `, counts);
            }
        } else {
            console.log(`${prefix}├──${children[i]}`);
            if (isDirectory) {
                tree(childPath, `${prefix}|   `, counts);
            }
        }
    }
}

console.log(`\n${counts.dirs} directories, ${counts.files} files`);
