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
import { PublicMapStore } from './PublicMapStore';
import { FeatureCollection, GeoJsonProperties, Polygon } from 'geojson';

if (!globalThis.storeCamposBusqueda) {
    const createAlpineStore = <T extends XData>(name: string, factoryFn: () => T): T => {
        if (Alpine.store(name)) return Alpine.store(name) as T;
        Alpine.store(name, factoryFn());
        return Alpine.store(name) as T;
    }
    const storeCamposBusqueda = globalThis.storeCamposBusqueda = createAlpineStore<CamposBusquedaStore>('campos_busqueda', () => new CamposBusquedaStore());
    //@ts-ignore
    const storeNegocios = globalThis.storeNegocios = createAlpineStore<INegocioStore>('negocios', () => createNegociosStore());
    //@ts-ignore
    const storeColumnasActuales = globalThis.storeColumnasActuales = createAlpineStore<iCurrentColumns>('columnas_actuales', () => columnas_actuales());
    //@ts-ignore
    const storeActiveFilter = globalThis.storeActiveFilter = createAlpineStore<IFilterStore>('active_filter', () => new ActiveFilterStore());
    //@ts-ignore
    const storePublicMaps = globalThis.storePublicMaps = createAlpineStore<PublicMapStore>('public_maps', () => new PublicMapStore());

    const camposBusquedaPromise = staticFetchWrapper<Record<string, NegocioColumn>>(
        '/api/campos_formulario', {}).then(res => {
            globalThis.camposBusquedaJson = res;
            console.timerInfo('received camposBusquedaPromise result from sw');
            return globalThis.camposBusquedaJson;
        })

    const barrioLabelsJson = staticFetchWrapper<FeatureCollection<Polygon, GeoJsonProperties>>(
        '/property_maps/json/barrios_label.geojson', {}).then(res => {
            globalThis.barrioLabelsJson = res;
            console.timerInfo('received barrioLabelsJson result from sw');
            storePublicMaps.setBarrioLabels(res.features)
            return globalThis.barrioLabelsJson;
        })
    globalThis.columnasVisiblesPromise = staticFetchWrapper<Record<string, NegocioColumn>>(
        '/api/columnas_actuales', {}).then(res => {
            globalThis.camposBusquedaJson = res;
            console.timerInfo('received camposBusquedaPromise result from sw');
            return globalThis.camposBusquedaJson;
        })
    camposBusquedaPromise.then(campos => {
        storeCamposBusqueda.reloadCampos(Object.values(campos), false);
        storePublicMaps.fetchPublicaciones();
    });

    storeCamposBusqueda.on('ready', () => {
        storeColumnasActuales.setDefaultColumns(storeCamposBusqueda.findMany(['id', 'nombre']))
        globalThis.columnasVisiblesPromise.then(columnasVisibles => {
            storeColumnasActuales.reloadCampos(columnasVisibles, false);
            storeActiveFilter.ready = true;

        })
    });

    (g => {
        var h, a, k, p = "The Google Maps JavaScript API",
            c = "google",
            l = "importLibrary",
            q = "__ib__",
            m = document,
            b = window;
        b = b[c] || (b[c] = {});
        var d = b.maps || (b.maps = {}),
            r = new Set,
            e = new URLSearchParams,
            u = () => h || (h = new Promise(async (f, n) => {
                await (a = m.createElement("script"));
                e.set("libraries", [...r] + "");
                for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
                e.set("callback", c + ".maps." + q);
                a.src = `https://maps.${c}apis.com/maps/property_maps/api/js?` + e;
                d[q] = f;
                a.onerror = () => h = n(Error(p + " could not load."));
                a.nonce = m.querySelector("script[nonce]")?.nonce || "";
                m.head.append(a);
            }));
        d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() =>
            d[l](f, ...n));
    })({
        key: "AIzaSyAAnmNtArAHn42aA9BEyiuGDN2Y1J4lhV8",
        v: "beta",
        // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
        // Add other bootstrap parameters as needed, using camel case.
    });

    console.timerInfo('start: negocio common footer');


    globalThis.googleMapsOptions = {
        "apiKey": "AIzaSyAAnmNtArAHn42aA9BEyiuGDN2Y1J4lhV8",
        "version": "beta",
        "region": "CL",
        "language": "es",
        "mapId": "8f541b0e0f5f6c31",
        "libraries": ["places", "localContext"]
    };
    const {
        campos_busqueda = [],
            default_columns = []
    } = globalThis;

    const contactosArray = "";
    globalThis.backendPaginator = {
        "has_take": true,
        "count": 129,
        "next_page_url": null,
        "first_page_url": "https:\/\/assets.juana.house\/api\/negocios",
        "last_page_url": "https:\/\/assets.juana.house\/api\/negocios",
        "current_page": 1,
        "from": 1695628584,
        "cursor": 1695628584,
        "last_page": 1,
        "max_id": null,
        "min_id": null,
        "path": "https:\/\/negocioslocal.juana.house\/api\/maps\/publicaciones?",
        "per_page": 350,
        "prev_page_url": null,
        "query": {
            "limit": 350,
            "take": 1,
            "api_base_path": "\/api\/maps\/publicaciones",
            "total": 129
        },
        "request_id": "dcdcbe64-d493-4c3d-8321-af0c2759be62",
        "current_filter_id": null,
        "to": 130,
        "total": 129,
        "links": [{
            "url": null,
            "label": "&laquo; Anterior",
            "active": false
        }, {
            "url": null,
            "label": "&laquo; Siguiente",
            "active": false
        }],
        "data": [

        ]
    };

}


