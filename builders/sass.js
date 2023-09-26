#!/usr/bin/env node
const chokidar = require('chokidar');
const { bold, green, cyan, yellow, magenta } = require('kleur');
const argv = require('minimist')(process.argv.slice(2));

const { size } = require('lodash');

const { compileSassApi, formatSassError } = require('./compileSassApi');


const watchCss = (watchPath) => {

    const watcherCss = chokidar.watch(watchPath, {
        ignored: /(^|[\/\\])\..|_app\.scss$/,
        persistent: true,
    });
    watcherCss.on('ready', () => {
        console.log(`${cyan('[chokidar]')} watching ${cyan(watchPath)}`);
        watcherCss
            .on('add', (path) => {
                console.log(
                    `${cyan('[chokidar]')} File ${path.replace(process.cwd(), '.')} has been added`
                );
                let tuple = [path, `${path.replace('resources/css', 'public/css').replace('.scss', '.css')}`];

                compileSassApi({ tuples: [tuple] }).catch(err => {
                    console.warn('threw errors');

                });

            })
            .on('change', (path) => {
                console.log(
                    `${cyan('[chokidar]')} File ${path.replace(process.cwd(), '.')} has been changed`
                );
                let tuple = [path, `${path.replace('resources/css', 'public/css').replace('.scss', '.css')}`];


                compileSassApi({ tuples: [tuple] }).catch(err => {
                    console.warn('threw errors');
                });

            });
    });

};

exports.watchCss = watchCss;

if (require.main === module) {
    let { _, ...options } = argv;
    if (options.watch) {
        return watchCss(process.cwd() + '/resources/css/*.scss', compileSassApi);
    }
    return compileSassApi(options).catch(err => {
        console.log(err);

    });
}