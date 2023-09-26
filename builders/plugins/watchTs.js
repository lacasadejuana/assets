const { cyan } = require('kleur');
const chokidar = require('chokidar');
const { replaceTimestamp } = require("./replaceTimestamp");

/**
 * This method doesn't invoke esbuild by itself. It just signals Mix
 * whenever a file under `resources/js` is changed.
 *
 * Upon this signal, Mix will rebuild its assets and invoke Esbuild
 * as the final step.
 *
 * @param {string} path
 */
const watchTs = (watchPath) => {
    const watcher = chokidar.watch(watchPath, {
        ignored: /(^|[\/\\])\../,
        persistent: true,
    });

    // Add event listeners.
    watcher.on('ready', () => {
        console.log(`${cyan('[chokidar]')} ready`);
        watcher
            .on('add', (path) => {
                console.log(
                    `${cyan('[chokidar]')} File ${path} has been added`
                );
                replaceTimestamp();
            })
            .on('change', (path) => {
                console.log(
                    `${cyan('[chokidar]')} File ${path} has been changed`
                );
                replaceTimestamp();
            })
            .on('unlink', (path) => {
                console.log(
                    `${cyan('[chokidar]')} File ${path} has been removed`
                );
                replaceTimestamp();
            });
    });
};
exports.watchTs = watchTs;
