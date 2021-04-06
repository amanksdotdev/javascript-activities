"use strict";

const fs = require("fs");
const path = require("path");
const { viewFn } = require("./view");

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

function organize(dirPath) {
    //getting absolute path from give input
    dirPath = path.resolve(dirPath);

    //creating directories and getting parent's name
    const organizedFolderPath = createDirectories(dirPath);

    //organizing files in dirPath into parent directory
    organizeFiles(dirPath, organizedFolderPath);

    //printing tree
    viewFn(organizedFolderPath, "tree");
}

//function to create directories
function createDirectories(dirPath) {
    //creating parent directory
    const parentFolderName = "Organized Files";
    const parentFolderPath = path.join(dirPath, parentFolderName);
    if (!fs.existsSync(parentFolderPath)) {
        fs.mkdirSync(parentFolderPath);
    }

    //creating all subdirectories
    for (let key in types) {
        const childFolder = path.join(parentFolderPath, key);
        if (!fs.existsSync(childFolder)) {
            fs.mkdirSync(childFolder);
        }
    }

    //creating 'others' directory
    if (!fs.existsSync(path.join(parentFolderPath, "others"))) {
        fs.mkdirSync(path.join(parentFolderPath, "others"));
    }

    //returning destinatin folder path
    return parentFolderPath;
}

//function to copy files into created direcotries according to their extension
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

module.exports = {
    organizeFn: organize,
};
