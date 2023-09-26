const { green, cyan } = require('kleur');
const fs = require('fs');

function replaceTimestamp() {
    const currentTime = Number(Date.now() / 5000).toFixed(0);
    return fs.writeFile(
        'resources/dist/dummy.ts',
        `export const timeStamp=${currentTime};`,
        'utf8',
        function (err) {
            if (err)
                return console.log(err);
            console.log(
                `${cyan('[other]')} Wrote timestamp  ${cyan(
                    currentTime
                )} to ${green('dist/dummy.ts')}`
            );
        }
    );
}
module.exports = { replaceTimestamp };