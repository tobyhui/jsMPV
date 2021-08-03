/*
 * @Author: Toby
 * @Date: 2021-08-03 23:53:53
 * @LastEditors: Toby
 * @LastEditTime: 2021-08-04 00:03:38
 * @FilePath: /jsMPV/packages/esbuild-http-import/example/esbuild.js
 */
const esbuild = require('esbuild');

const httpPlugin = require('../lib/esbuild-http-import')

esbuild.build({
    entryPoints: ["example/app.js"],
    bundle: true,
    outfile: "example/dist/out.js",
    plugins: [httpPlugin]
})