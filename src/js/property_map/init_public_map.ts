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
    /*const barrios = staticFetchWrapper<FeatureCollection<Polygon, GeoJsonProperties>>(
        '/json/barrios.json', {}).then(res => {
            globalThis.barriosJson = res;
            console.timerInfo('received barrios result from sw');
            return globalThis.barriosJson;
        })*/
    const barrioLabelsJson = staticFetchWrapper<FeatureCollection<Polygon, GeoJsonProperties>>(
        '/json/barrios_label.geojson', {}).then(res => {
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
    })
}


