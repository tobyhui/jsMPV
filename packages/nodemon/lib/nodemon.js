#!/usr/bin/env node
const chokidar = require("chokidar");
const { exec, spawn } = require("child_process");
const { argv } = require('optimist')

let childProcess;
let debounceRestart = debounce(restart, 500);

const target = argv._
const watchPath = argv.watch || argv.w || target

chokidar.watch(watchPath).on("all", () => debounceRestart());

function restart() {
    childProcess && childProcess.kill();

    childProcess = spawn("node", target, {
        stdio: [process.stdin, process.stdout, process.stderr],
    });
}

function debounce(fn, delay) {
    let id;
    return () => {
        clearTimeout(id);

        id = setTimeout(() => {
            fn();
        }, delay);
    };
}