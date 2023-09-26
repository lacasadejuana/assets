const { green, bold, yellow } = require('kleur');
const { replaceTimestamp } = require("./replaceTimestamp");

const { sizeToKb } = require('./analysisTablePlugin');
const prefix = require.main === module ? '' : bold(yellow('[esbuild] '));

const onEndPlugin = (origin, timeStamp) => ({
    name: 'on-end',
    setup(build) {
        build.onEnd(async (result) => {
            if (result && result.errors && result.errors.length) {
                return console.error('watch build failed:', result.errors);
            } else {
                const t_ini = Date.now();
                const output = Object.entries(result.metafile.outputs)
                    .filter(([key, value]) => {
                        return !key.includes('.map');
                    })
                    .map(([key, value]) => {
                        return [key, sizeToKb(value.bytes)];
                    });


                const t_fin = Date.now();
                if (Array.isArray(output)) {
                    try {
                        let [[resource, size]] = output;

                        console.log(
                            `${prefix} ${origin} complete in ${String(t_fin - t_ini).padStart(5, ' ')}ms : ${green(
                                resource
                            )} (${size})`
                        );
                    } catch (err) {
                        console.log(output);
                    }
                }
                if (timeStamp) replaceTimestamp();
            }
        });
    },
});
module.exports = { onEndPlugin };