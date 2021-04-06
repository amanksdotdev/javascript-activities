"use strict";
/***
 * Example of an generic tree for understanding file system
 *
 *                d10
 *             /   |  \
 *          d20   d30  d40
 *         / \    / \    \
 *      d50 d60 d70 d80  d90
 *                   |
 *                 d100
 */

const root = {
    name: "d10",
    children: [
        {
            name: "d20",
            children: [
                {
                    name: "d50",
                    children: [],
                },
                {
                    name: "d60",
                    children: [],
                },
            ],
        },
        {
            name: "d30",
            children: [
                {
                    name: "d70",
                    children: [],
                },
                {
                    name: "d80",
                    children: [
                        {
                            name: "d100",
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            name: "d40",
            children: [
                {
                    name: "d90",
                    children: [],
                },
            ],
        },
    ],
};

function displayTree(tree) {
    // building output string as Parent => Child1, Child2 ...
    let output = tree.name + " => ";
    for (let i = 0; i < tree.children.length; i++) {
        output += tree.children[i].name + ", ";
    }
    console.log(output);

    // Recursively calling rest of the children for output
    for (let i = 0; i < tree.children.length; i++) {
        let child = tree.children[i];
        displayTree(child);
    }
}

displayTree(root);
