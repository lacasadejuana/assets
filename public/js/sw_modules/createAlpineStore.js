import { columnas_actuales } from '../components/stores/ColumnasActualesStore';
import { ActiveFilterStore } from '../filter_modules/stores/activeFilterStore';
import { CamposBusquedaStore } from '../components/stores/CamposBusquedaStore';
import { createNegociosStore, createTheFormStore, createMapStore } from '../negocios_modules/stores';
import { createPersonaStore } from '../components/stores/PersonaStore';
import { TipoBusquedaStore, ifDefined } from '../components';
import { declareAlpineDirectives } from './alpine.directives';
import { SolicitudesStore } from '../solicitudes_modules/stores/SolicitudesStore';
import { createDict } from '../solicitudes_modules';
import { PreferenciasStore } from '../components/stores/PreferenciasStore';
export function createAlpineStore(Alpine) {
    if (Alpine.store('campos_busqueda'))
        return;
    const createAlpineStore = (name, factoryFn) => {
        if (Alpine.store(name))
            return Alpine.store(name);
        Alpine.store(name, factoryFn());
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
    const storeCamposBusqueda = globalThis.storeCamposBusqueda = createAlpineStore('campos_busqueda', () => new CamposBusquedaStore());
    ifDefined(Alpine.store('tipos_busqueda'), () => console.log('TipoBusquedaStore already defined'), () => createAlpineStore('tipos_busqueda', () => new TipoBusquedaStore()));
    const storePreferencias = globalThis.storePreferencias = createAlpineStore('preferencias', () => new PreferenciasStore());
    if (location.pathname.startsWith('/solicitud_visita')) {
        const storeSolicitudes = globalThis.storeSolicitudes = createAlpineStore('solicitudes', () => new SolicitudesStore());
        const storeDictionary = globalThis.storeDictionary = createAlpineStore('dictionary', () => createDict());
        globalThis.anfitrioneYSolicitantesPromise.then(res => {
            storeSolicitudes.updateAnfitrionesYSolicitantes(res);
        });
    }
    else {
        if (location.pathname.startsWith('/map')) {
            const storeMaps = globalThis.storeMap = Alpine.store('maps') ?? createAlpineStore('maps', () => createMapStore());
        }
        const storeColumnasActuales = globalThis.storeColumnasActuales = createAlpineStore('columnas_actuales', () => columnas_actuales());
        const storeActiveFilter = globalThis.storeActiveFilter = createAlpineStore('active_filter', () => new ActiveFilterStore());
        const storeNegocios = globalThis.storeNegocios = createAlpineStore('negocios', () => createNegociosStore());
        globalThis.reloadFiltersOnLoad = () => {
            storeColumnasActuales.onReady(() => {
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
    }
    if (location.pathname.startsWith('/contacto') || location.pathname.startsWith('/persona') || location.pathname.startsWith('/usuario')) {
        const storePersona = globalThis.storePersona = Alpine.store('persona') ?? createAlpineStore('persona', () => createPersonaStore());
    }
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
    console.info('declaring theform');
    /**
     * Once the camposBusquedaPromise is ready, execute "reloadCampos"
     */
    document.addEventListener('alpine:init', () => {
        Alpine.store('theform', createTheFormStore());
    });
    camposBusquedaPromise.then(campos => {
        storeCamposBusqueda.reloadCampos(Object.values(campos), false);
    });
    declareAlpineDirectives(Alpine);
}
//# sourceMappingURL=createAlpineStore.js.map