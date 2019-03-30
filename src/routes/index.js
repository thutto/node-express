import path from "path";
import fs from "fs";
import assign from "lodash.assignin";

fs.readdirSync(__dirname).forEach(file => {
    /* If its the current file ignore it */
    if (file === "index.js") return;

    /* Prepare empty object to store module */
    const mod = {};

    /* Store module with its name (from filename) */
    mod[path.basename(file, ".js")] = require(path.join(__dirname, file));

    /* Extend module.exports (in this case - underscore.js, can be any other) */
    assign(module.exports, mod);
});
