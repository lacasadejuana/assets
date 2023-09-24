import * as Popper from '@popperjs/core';
import * as bootstrap from 'bootstrap';
import jQuery from 'jquery';
import 'daterangepicker';
import 'jquery-ui';
import 'select2';
export { Popper, bootstrap, jQuery };
//import 'bootstrap-table'
//import './bs_table'
//import 'dragtable'
// Make it accessible in global ssope:
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */
try {
    //window._ = _
    window.Popper = Popper;
    //@ts-ignore
    window.$ = window.jQuery = jQuery;
    window.bootstrap = bootstrap;
}
catch (e) { }
//@ts-ignore
console.zdebug = console.info.bind(console, '%cDEBUG:', 'color:#A39;font-weight:bold;');
//@ts-ignore
//@ts-ignore
console.zinfo = console.info.bind(console, '%cINFO:', 'color:#33C;font-weight:bold;');
//@ts-ignore
console.zwarn = console.warn.bind(console, '%cWARN:', 'color:orange;font-weight:bold;');
//# sourceMappingURL=bootstrap.js.map