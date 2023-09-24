import { columnas_actuales } from '../components/stores/ColumnasActualesStore';
import filterCreateStore, { createFilterStore, ActiveFilterStore } from '../filter_modules/stores/activeFilterStore';
import { camposBusquedaStore } from './negocios_modules/stores/camposBusquedaStore';
import { createNegociosStore, createTheFormStore, createMapStore } from '../negocios_modules/stores';
import { createPersonaStore } from '../components/stores/PersonaStore';
import { TipoBusquedaStore, ifDefined } from '../components';
import { declareAlpineDirectives } from './alpine.directives;
export function createAlpineStore(Alpine) {
    if (Alpine.store('campos_busqueda'))
        return;
    console.info({ ActiveFilterStore, createFilterStore, filterCreateStore });
    const createAlpineStore = (name, store) => {
        Alpine.store(name, store());
        return Alpine.store(name);
    };
    //@ts-ignore
    const { 
    //@ts-ignore
    availableFiltersPromise, 
    //@ts-ignore
    activeFilterPromise, 
    //@ts-ignore
    defaultFieldsPromise, 
    //@ts-ignore
    columnasVisiblesPromise, 
    //@ts-ignore
    camposBusquedaPromise
    //@ts-ignore
     } = globalThis;
    const storeCamposBusqueda = globalThis.storeCamposBusqueda = Alpine.store('campos_busqueda') ?? createAlpineStore('campos_busqueda', () => camposBusquedaStore());
    const storeColumnasActuales = globalThis.storeColumnasActuales = Alpine.store('columnas_actuales') ?? createAlpineStore('columnas_actuales', () => columnas_actuales());
    const storeActiveFilter = globalThis.storeActiveFilter = Alpine.store('active_filter')
        ?? createAlpineStore('active_filter', () => new ActiveFilterStore());
    //const storeMaps = globalThis.storeMap = Alpine.store('maps') ?? createAlpineStore<MapStore>('maps', () => createMapStore());
    const storeNegocios = globalThis.storeNegocios = Alpine.store('negocios') ?? createAlpineStore('negocios', () => createNegociosStore());
    ifDefined(Alpine.store('tipos_busqueda'), () => console.log('TipoBusquedaStore already defined'), () => createAlpineStore('tipos_busqueda', () => new TipoBusquedaStore()));
    console.info('declaring theform');
    if (location.pathname.startsWith('/contacto') || location.pathname.startsWith('/persona') || location.pathname.startsWith('/usuario')) {
        const storePersona = globalThis.storePersona = Alpine.store('persona') ?? createAlpineStore('persona', () => createPersonaStore());
    }
    if (location.pathname.startsWith('/map')) {
        const storeMaps = globalThis.storeMap = Alpine.store('maps') ?? createAlpineStore('maps', () => createMapStore());
    }
    if (!location.pathname.startsWith('/solicitud_visita')) {
        globalThis.reloadFiltersOnLoad = () => {
            storeColumnasActuales.onReady().then(() => {
                availableFiltersPromise.then(filtrosDisponibles => {
                    storeActiveFilter
                        .loadFiltrosDisponibles(filtrosDisponibles);
                    activeFilterPromise.then((activeFilter) => {
                        //alert('active filter is ' + activeFilter.id)
                        storeActiveFilter.setActive(location.href.endsWith('filtros/create') ? 0 : activeFilter.id);
                    });
                });
            });
        };
        globalThis.reloadFiltersOnLoad();
        Promise.all([
            storeCamposBusqueda.onReady(),
            defaultFieldsPromise,
            activeFilterPromise
        ]).then(([campos, defaultFields, activeFilter]) => {
            storeColumnasActuales.setDefaultColumns(defaultFields);
            storeColumnasActuales.reloadCampos(activeFilter.columnas_actuales, true);
        });
        /**
         * Once the camposBusquedaPromise is ready, execute "reloadCampos"
         */
        document.addEventListener('alpine:init', () => {
            Alpine.store('theform', createTheFormStore());
        });
    }
    camposBusquedaPromise.then(campos => {
        storeCamposBusqueda.reloadCampos(Object.values(campos), false);
    });
    Alpine.store('id_tipo_negocio', {
        id: null,
        change(id) {
            //@ts-ignore
            this.id = id;
            console.log({ id_tipo_negocio: id });
        }
    });
    Alpine.store('appmodelstipospropiedad', {
        id: null,
        change(id) {
            //@ts-ignore
            this.id = id;
            console.log({ appmodelstipospropiedad: id });
        }
    });
    Alpine.store('inputsByType', {
        properties: globalThis.inputsByType,
        isEqual(name, value) {
            return this.properties[name] == value;
        },
        get(name) {
            return this.properties[name];
        },
        set(name, value) {
            this.properties[name] = value;
            console.log({
                [name]: value,
                properties: this.properties
            });
        },
        init() {
            globalThis.$auxStore.inputsByType = this;
        }
    });
    declareAlpineDirectives(Alpine);
}
//# sourceMappingURL=createAlpineStore.alt.js.map