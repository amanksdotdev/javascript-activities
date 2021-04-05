"use strict";

const fs = require("fs");
const path = require("path");

const input = process.argv.slice(2);

const types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};

//getting absolute path from give input
const dirPath = path.resolve(input[0]);

//calling function
organize(dirPath);

function organize(dirPath) {
    const parentFolderName = createFolder(dirPath);
    organizeFiles(dirPath, parentFolderName);
}

//function to create folders
function createFolder(dirPath) {
    const parentFolderName = "Organized Files";
    const parentFolderPath = path.join(dirPath, parentFolderName);
    if (!fs.existsSync(parentFolderPath)) {
        fs.mkdirSync(parentFolderPath);
    }

    for (let key in types) {
        const childFolder = path.join(parentFolderPath, key);
        if (!fs.existsSync(childFolder)) {
            fs.mkdirSync(childFolder);
        }
    }
    if (!fs.existsSync(path.join(parentFolderPath, "others"))) {
        fs.mkdirSync(path.join(parentFolderPath, "others"));
    }
    return parentFolderName;
}

//function to copy files to created folder according to their extension
function organizeFiles(dirPath, organizedFolderPath) {
    if (fs.lstatSync(dirPath).isFile()) {
        const destinationFolderName = getDestinationFolder(dirPath); // getting dest folder name
        const destPath = path.join(organizedFolderPath, destinationFolderName); //getting full destination folder path
        copyFile(dirPath, destPath);
    } else {
        const allChildren = fs.readdirSync(dirPath);
        for (let i = 0; i < allChildren.length; i++) {
            organizeFiles(
                path.join(dirPath, allChildren[i]),
                organizedFolderPath
            );
        }
    }
}

//function to get destination path name
function getDestinationFolder(dirPath) {
    let extension = path.extname(dirPath);
    extension = extension.substring(1);
    for (let key in types) {
        for (let i = 0; i < types[key].length; i++) {
            if (extension === types[key][i]) {
                return key;
            }
        }
    }
    return "others";
}

//function to copy from src to dest
function copyFile(src, dest) {
    const fileName = path.basename(src);
    dest = path.join(dest, fileName);
    fs.copyFileSync(src, dest);
}
