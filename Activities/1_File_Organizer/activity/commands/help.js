"use strict";

function help() {
    console.log(`List of commands
        1. node mycli view <dirnpath> tree
        2. node mycli view <dirpath> flat
        3. node mycli organize <dirpath>
        4. node mycli help
        `);
}

module.exports = {
    helpFn: help,
};
