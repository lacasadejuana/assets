const mix = require('laravel-mix');
const atImport = require('postcss-import');
const tailwindcss = require('tailwindcss'); /* Add this line at the top */
const argv = require('minimist')(process.argv.slice(2));
const { exec } = require('child_process');
require('laravel-mix-merge-manifest');

const { ignored } = require('../esbuild.js');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

require('mix-tailwindcss');
/*
mix.sass('resources/css/_app.scss', "public/css/app.css").tailwind()
    .sass('resources/css/filtros_negocios.scss', 'public/css/filtros_negocios.css').tailwind()
    .sass('resources/css/negocios_datatable.scss', 'public/css/negocios_datatable.css').tailwind()
    .sass('resources/css/negocios_legacy.scss', 'public/css/negocios_legacy.css').tailwind()
    .sass('resources/css/negocios-compact.scss', 'public/css/negocios-compact.css').tailwind()
    .mergeManifest()
    .version();
*/
mix.sass('resources/css/_app.scss', "public/css/app.css").tailwind()
    .css('resources/dist/filtros_negocios.css', 'public/css/filtros_negocios.css').tailwind()
    .css('resources/dist/negocios_datatable.css', 'public/css/negocios_datatable.css').tailwind()
    .css('resources/dist/negocios_legacy.css', 'public/css/negocios_legacy.css').tailwind()
    .css('resources/dist/negocios_compact.css', 'public/css/negocios_compact.css').tailwind()
    .mergeManifest()
    .version();

/**
 * Ignore everything
 */
mix.webpackConfig({
    watchOptions: {
        ignored: [...ignored, '**/resources/js/**']
    }
});

if (mix.inProduction()) {
    console.log({ argv, env: process.env.NODE_ENV });
    mix.sourceMaps({
        devType: 'eval',
        productionType: 'source-map'
    });
}