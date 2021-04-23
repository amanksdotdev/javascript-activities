"use strict";

const helpObj = require("./commands/help");
const viewObj = require("./commands/view");
const organizeObj = require("./commands/organize");

const input = process.argv.slice(2);

switch (input[0]) {
    case "view":
        viewObj.viewFn(input[1], input[2]);
        break;
    case "organize":
        organizeObj.organizeFn(input[1] || '.');
        break;
    case "help":
        helpObj.helpFn();
        break;
    default:
        console.log(
            "Invalid arguments: use 'help' to get list of valid commands"
        );
}
