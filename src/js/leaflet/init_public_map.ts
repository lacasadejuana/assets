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

import resize from '@aerni/alpine-resize';
import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';
import intersect from '@alpinejs/intersect';
import persist from '@alpinejs/persist';
import Mask from '@ryangjchandler/alpine-mask';
import Tooltip from "@ryangjchandler/alpine-tooltip";
import Alpine from 'alpinejs';

Alpine.plugin(persist);
Alpine.plugin(resize);
Alpine.plugin(focus);
Alpine.plugin(collapse);
Alpine.plugin(Tooltip);
//Alpine.plugin(mask)
Alpine.plugin(intersect);
//Alpine.plugin(slug)
Alpine.plugin(Mask);
export { Alpine };
globalThis.Alpine = Alpine

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

import { IFilterStore, INegocioStore, XData, columnas_actuales, iCurrentColumns } from '@/components';
import { staticFetchWrapper } from '@/components/decorators';
import { NegocioColumn } from '@/components/entities/NegocioColumn';
import { CamposBusquedaStore } from '@/components/stores/CamposBusquedaStore';
import { ActiveFilterStore } from '@/components/stores/activeFilterStore';
import { createNegociosStore } from '@/components/stores';

import { FeatureCollection, GeoJsonProperties, Polygon } from 'geojson';
import { LeafletMap } from './LeafletMap';
import { PublicLayerDeals } from './PublicLayerDeals';
globalThis.backendPaginator = { total: 500 }
document.addEventListener('alpine:init', () => {
    Alpine.data('LeafletMap', LeafletMap);
    Alpine.data('PublicLayerDeals', PublicLayerDeals);
})

document.addEventListener('DOMContentLoaded', () => {
    Alpine.start();
})

if (!globalThis.storeCamposBusqueda) {
    const createAlpineStore = <T extends XData>(name: string, factoryFn: () => T): T => {
        if (Alpine.store(name)) return Alpine.store(name) as T;
        Alpine.store(name, factoryFn());
        return Alpine.store(name) as T;
    }
    globalThis.$store = {};
    const storeCamposBusqueda = globalThis.$store.campos_busqueda = globalThis.storeCamposBusqueda = createAlpineStore<CamposBusquedaStore>('campos_busqueda', () => new CamposBusquedaStore());
    //@ts-ignore
    const storeNegocios = globalThis.$store.negocios = globalThis.storeNegocios = createAlpineStore<INegocioStore>('negocios', () => createNegociosStore());
    //@ts-ignore
    const storeColumnasActuales = globalThis.$store.columnas_actuales = globalThis.storeColumnasActuales = createAlpineStore<iCurrentColumns>('columnas_actuales', () => columnas_actuales());
    //@ts-ignore
    const storeActiveFilter = globalThis.$store.active_filter = globalThis.storeActiveFilter = createAlpineStore<IFilterStore>('active_filter', () => new ActiveFilterStore());
    //@ts-ignore


    const camposBusquedaPromise = staticFetchWrapper<Record<string, NegocioColumn>>(
        'https://assets.juana.house/api/campos_formulario', {}).then(res => {
            globalThis.camposBusquedaJson = res;
            console.timerInfo('received camposBusquedaPromise result from sw');
            return globalThis.camposBusquedaJson;
        })


    globalThis.columnasVisiblesPromise = staticFetchWrapper<Record<string, NegocioColumn>>(
        'https://assets.juana.house/api/columnas_actuales', {}).then(res => {
            globalThis.camposBusquedaJson = res;
            console.timerInfo('received camposBusquedaPromise result from sw');
            return globalThis.camposBusquedaJson;
        })
    camposBusquedaPromise.then(campos => {
        storeCamposBusqueda.reloadCampos(Object.values(campos), false);
    });

    storeCamposBusqueda.on('ready', () => {
        storeColumnasActuales.setDefaultColumns(storeCamposBusqueda.findMany(['id', 'nombre']))
        globalThis.columnasVisiblesPromise.then(columnasVisibles => {
            storeColumnasActuales.reloadCampos(columnasVisibles, false);
            storeActiveFilter.ready = true;

        })
    });



}


