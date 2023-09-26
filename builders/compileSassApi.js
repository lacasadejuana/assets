const fs = require('fs');
const sass = require('sass');
const { table, getBorderCharacters } = require('table');
const { bold, magenta, cyan } = require('kleur');

const prefix = bold(magenta('[sass] '));



const entryMap = {
    'resources/css/filtros_negocios.scss': 'public/css/filtros_negocios.css',
    'resources/css/negocios_datatable.scss': 'public/css/negocios_datatable.css',
    'resources/css/negocios_legacy.scss': 'public/css/negocios_legacy.css ',
    'resources/css/negocios_compact.scss': 'public/css/negocios_compact.css',
    'resources/css/map_view.scss': 'public/css/map_view.css',

    //'resources/css/modules/qr_reader.scss': 'public/css/qr_reader.css'
    //  'resources/css/plugins/file_icons/file-icon-vectors.scss': 'public/css/file_icons/file-icon-vectors.css'

};
function sizeToKb(value) {

    unit = 'b';
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
function formatSassError(err) {
    if (!err.formatted) return console.warn(err);
    const error_array = (err.formatted).split('\n');
    const line_length = error_array[error_array.length - 1].length;
    console.warn(bold(magenta('┌─' + Array(line_length).fill('─').join(''))));
    console.warn(magenta('│ [sass] ') + bold(magenta(' error:')));
    console.warn(magenta('│  ') + bold(magenta(' error:')));
    console.warn(error_array.map(line => bold(magenta('│ ')) + line).join('\n'));
    console.warn(bold(magenta('└─' + Array(line_length).fill('─').join(''))));
}
exports.formatSassError = formatSassError;

async function compileSassApi({ tuples, quiet } = {}) {

    let matrix = [['source', 'output', 'size', 'loaded URLs'], ['', '', '', '']];
    const t_ini = Date.now();
    tuples = tuples || Object.entries(entryMap).map(
        ([entry, output]) => {

            return [entry, output.trim()]; // `${entry}:${output}`;
        }
    );

    const tuplesPromises = [];
    let errors = 0;
    for (let tuple of tuples) {
        tuplesPromises.push(new Promise((resolve, reject) => {
            const options = {
                file: tuple[0],
                loadPaths: [
                    process.cwd() + '/node_modules',
                    process.cwd() + '/resources/css'
                ],
                sourceMap: true,
                sourceMapIncludeSources: true,
                outFile: tuple[1],
                analyze: true,
            };

            try {
                //const result = sass.renderSync(options);
                const result = sass.compile(tuple[0], options);

                let size = sizeToKb(((result.css).toString() || '').length);
                matrix[1][0] = (matrix[1][0] + '\n' + magenta(tuple[0])).trim().replace(process.cwd(), '.');
                matrix[1][1] = (matrix[1][1] + '\n' + magenta(tuple[1])).trim().replace(process.cwd(), '.');
                matrix[1][2] = (matrix[1][2] + '\n' + (size)).trim();
                matrix[1][3] = (matrix[1][3] + '\n' + `${result.loadedUrls.length}`).trim();
                let resultCss = result.css.toString();
                if (result.sourceMap) {
                    //console.log(result.sourceMap);
                    resultCss += "\n";
                    resultCss += `/*# sourceMappingURL=${tuple[1].split('/').pop()}.map */`;
                    fs.writeFileSync(tuple[1] + '.map', JSON.stringify(result.sourceMap).replaceAll(process.cwd(), '../..').replaceAll('file://..', '..'));
                }
                fs.writeFileSync(tuple[1], resultCss);

                resolve();
            } catch (err) {
                errors++;

                formatSassError(err);
                reject(err);
            }
        }));
    }

    return Promise.all(tuplesPromises).then(() => {

        const t_fin = Date.now();

        if (quiet) {
            console.log(`${prefix}    Build complete in ${String(t_fin - t_ini).padStart(5, ' ')}ms : ${matrix[1][1]} (${matrix[1][2]})`);
        } else {
            console.log();
            console.log(`${prefix} Compiled in ${String(t_fin - t_ini).padStart(5, ' ')}ms with ${errors} errors`);
            console.log((table(matrix, { border: getBorderCharacters('norc') })));
        }
        return;
    });

}
exports.compileSassApi = compileSassApi;
