import Alpine from 'alpinejs';
window.Alpine = Alpine;
globalThis.Alpine = Alpine;
import { LeafletMap } from './LeafletMap';
globalThis.backendPaginator = { total: 500 }
import { createNegociosStore } from '../components/stores/NegocioStore';
if (!console.timerInfo) {
    Object.defineProperty(console, 'timerInfo', {
        get: function () {
            return Function.prototype.bind.call(
                console.debug,
                console,
                '%c' +
                Number(performance.now() / 1000).toFixed(2) +
                ' Timer:',
                'color:#03C;font-weight:bold;'
            );
        },
    });
}
if (!console.marquee) {

    Object.defineProperty(console, 'marquee', {
        get: function () {
            return (obj, ...args) => {
                let colors = Object.values(obj),
                    payload = [''].concat(Object.keys(obj));
                console.log(payload.join('%c '), ...colors, ...args);
            };
        },
    });
}
import { LeafletMap } from './LeafletMap';
globalThis.backendPaginator = { total: 500 }
document.addEventListener('alpine:init', () => {
    Alpine.data('LeafletMap', LeafletMap);

})

document.addEventListener('DOMContentLoaded', () => {
    Alpine.start();
})