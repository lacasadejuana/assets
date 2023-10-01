#!/usr/bin/env node
const { analysisTablePlugin } = require('./plugins/analysisTablePlugin');
const { onEndPlugin } = require('./plugins/onEndPlugin');
const { replaceTimestamp } = require('./plugins/replaceTimestamp');
const { bold, green, yellow, magenta } = require('kleur');
const esbuild = require('esbuild');
const argv = require('minimist')(process.argv.slice(2));

const { exec } = require('child_process');

const umdWrapper = require('esbuild-plugin-umd-wrapper');
const { watchTs } = require("./plugins/watchTs");
const { compileSassApi } = require("./compileSassApi");



//const tsPaths = require("./plugins/esbuild-tspaths");


const umdWrapperOptions = {

    external: "inherit", // <= default
    amdLoaderName: "define" // <= default
};
async function runEsbuild(options = { outdir: 'resources/dist' }) {
    let { watch, quiet, brief, libraryName, saas, format = 'umd', ...config } = options;
    libraryName = libraryName || options.entryPoints[0].split('/').pop().replace(/\.ts$/, '');
    const tspath = process.cwd() + '/tsconfig.json';
    console.log({ tspath });
    const plugins = [
        //        tsPaths(tspath),
        onEndPlugin('Build', false),

    ];
    if (!quiet) plugins.push(analysisTablePlugin({ brief }));
    if (format === 'umd') plugins.push(umdWrapper.default({ ...umdWrapperOptions, libraryName }));
    const buildOptions = {

        tsconfig: tspath,
        plugins,
        bundle: true,
        format,
        sourcemap: true,
        metafile: true,
        minify: false,
        globalName: libraryName,
        ...config,
    };
    //console.log(buildOptions);
    return esbuild
        .build(buildOptions)
        .then(() => {
            if (saas) {
                return compileSassApi({ tuples: saas, quiet });
            }
            return;
        })
        .catch((e) => {
            console.warn(e);
            if (require.main === module) {
                process.exit(1);
            }
        });

}
module.exports = {
    replaceTimestamp,
    runEsbuild,
};
const onRebuild = async (map_type) => {
    await runEsbuild({
        entryPoints: [
            `src/js/public_map/init_public_map.ts`
        ],
        outfile: `public/${map_type}/js/init_public_map.js`,
        quiet: true,
        saas: [['src/css/_app.scss', 'src/css/${map_type}.css']]
        ,
        format: 'umd',

    });
    await runEsbuild({
        entryPoints: [
            'src/js/public_map/index.ts'
        ],
        outfile: `public/${map_type}/js/${map_type}.js`,
        quiet: true,
        format: 'esm',
    });

};
if (require.main === module) {
    let { _, ...options } = argv;
    let map_type = process.env.MAP_TYPE || 'public_map';
    if (options.watch) {
        return watchTs('src/js', () => onRebuild(map_type));
    }

    onRebuild(map_type);

}
