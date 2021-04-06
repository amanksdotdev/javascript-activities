"use strict";

const fs = require("fs");
const path = require("path");

function view(dirpath, mode) {
    dirpath = path.resolve(dirpath);
    if (mode === "tree") {
        const counts = {
            dirs: 0,
            files: 0,
        };
        viewTree(dirpath, "", counts);
        console.log(`\n${counts.dirs} directories, ${counts.files} files`);
    } else if (mode === "flat") {
        viewFlat(dirpath);
    }
}

function viewTree(dirpath, prefix, counts) {
    const children = fs.readdirSync(dirpath);
    for (let i = 0; i < children.length; i++) {
        const childPath = path.join(dirpath, children[i]);
        const isDirectory = fs.lstatSync(childPath).isDirectory();

        counts[isDirectory ? "dirs" : "files"]++;

        if (i === children.length - 1) {
            console.log(`${prefix}└──${children[i]}`);
            if (isDirectory) {
                viewTree(childPath, `${prefix}   `, counts);
            }
        } else {
            console.log(`${prefix}├──${children[i]}`);
            if (isDirectory) {
                viewTree(childPath, `${prefix}|   `, counts);
            }
        }
    }
}

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

module.exports = {
    viewFn: view,
};
