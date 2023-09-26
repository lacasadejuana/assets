const { green } = require('kleur');
const esbuild = require('esbuild');
const { table, getBorderCharacters } = require('table');


function sizeToKb(value) {

    let unit = 'b';
    if (value > 1000) {
        value = Number(value / 1024).toFixed(0);
        unit = 'KiB';
    }
    if (value > 1000) {
        value = Number(value / 1024).toFixed(0);
        unit = 'MiB';
    }
    return value + unit;

}

const analysisTablePlugin = ({ brief } = {}) => ({
    name: 'on-end',
    setup(build) {
        build.onEnd(async (result) => {
            if (result && result.errors && result.errors.length) {
                return console.error('watch build failed:', result.errors);
            } else if (result.metafile) {
                try {
                    let matrix = [['output', 'size', 'percentage']];
                    const analysis = await esbuild.analyzeMetafile(result.metafile);
                    let analysisArr = analysis.split('\n').reduce((accum, row, index) => {
                        const arr = row.replace(/[└├]/, '').replace(/\s+/g, ' ').split(/\s/).slice(1, 4);
                        if (arr.length < 3) return accum;

                        let path = arr[0].replace(/^node_modules\//g, '').split(/(src|dist|public|node_modules)/)[0].split('/');
                        path = path.slice(0, path[0] === 'resources' ? 3 : 2).join('/').replace(/\/$/, '');
                        if (index === 0 || index === 1) path = arr[0];

                        let multiplier = arr[1].includes('kb') ? 1024 : (arr[1].includes('mb') ? 1024 * 1024 : 1);
                        let weight = Number(multiplier * (arr[1].replace(/(kb|mb)/, '')));
                        if (isNaN(weight)) return accum;
                        let percentage = Number(arr[2] ? Number(arr[2].replace('%', '')) : 0);
                        accum[path] = accum[path] || { path, weight: 0, percentage: 0, paths: [] };
                        accum[path] = { path, weight: accum[path].weight + weight, percentage: accum[path].percentage + percentage };

                        return accum;
                    }, {});

                    analysisArr = Object.values(analysisArr).sort((a, b) => {
                        return b.weight - a.weight;
                    }).slice(0, 15).map(entry => {
                        return [green(entry.path), sizeToKb(entry.weight), entry.percentage.toFixed(0) + '%'];
                    }).reduce((accum, entry, index) => {
                        if (index === 0) {
                            matrix.push(entry);
                            return accum;
                        }
                        let [path, weight, percentage] = entry;
                        accum.path.push(path.padEnd(55, ' '));
                        accum.weight.push(weight);
                        accum.percentage.push(percentage);
                        return accum;
                    }, { path: [], weight: [], percentage: [] });

                    if (!brief) matrix.push([analysisArr.path.join('\n'), analysisArr.weight.join('\n'), analysisArr.percentage.join('\n')]);
                    console.log((table(matrix, { border: getBorderCharacters('norc') })));
                } catch (err) {
                    console.error(err);
                }
            }

        });
    },
});
module.exports = { analysisTablePlugin, sizeToKb };