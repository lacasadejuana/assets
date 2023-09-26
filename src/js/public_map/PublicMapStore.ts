import type {
    ICamposBusqueda,
    IFilterStore,
    ILayerDefinition,
    IMapData,
    IMapFrameData,
    IMapStore,
    INegocioStore,
    IRolesNegocioStore,
    ISavedMap,
    IUserStore,
    TSharingLevel,
    TeventType,
    XTipoBusquedaStore,
    iCurrentColumns
} from '@lacasadejuana/types';
import Alpine from 'alpinejs';

import { AlpineDataComponent, waitFor } from '@/components';
import { BaseClass } from '@/components/stores';
import { PublicLayersObject, exampleLayers } from './public_map_modules/exampleLayers';
import { sharingLevels } from './public_map_modules/sharingLevels';

export class PublicMapStore extends BaseClass implements IMapStore<'ready' | 'layers_added'> {
    map_name: string = null
    map_description: string = null
    sharing_level: string = null
    map_type: string = null
    layer_object: Record<string, ILayerDefinition> = null
    id: number = null
    filter_id: number = null
    user_id: number = null
    sharingLevels: Record<string, TSharingLevel> = sharingLevels
    PublicLayersObject: Record<string, ILayerDefinition> = PublicLayersObject
    map_sharing_level: 'private' | 'shared' | 'public' | 'collaborative' = 'private'

    token: string = null
    active_tab = 'tabs-savemap'
    layer_array: ILayerDefinition[] = []
    savedMaps: ISavedMap[] = []
    url: URL;
    feature_collection: GeoJSON.FeatureCollection<GeoJSON.Geometry> = { type: 'FeatureCollection', features: [] }
    layerSlugs: string[] = []
    codigo_interno: string = null
    constructor() {
        super()


        //@ts-ignore
        this.exampleLayers = exampleLayers

        //if (!this.$store.active_filter) this.$store.active_filter = $store.active_filter;
        //if (!this.$store.user) this.$store.user = $store.user;
        this.url = new URL(window.location.href);



    }
    get verifiers(): Record<Partial<TeventType>, boolean> {
        return {
            ready: !!this.ready,
            layers_added: this.layer_array.length > 0
        } as unknown as Record<Partial<TeventType>, boolean>

    }


    init() {

    }
    setCodigoInterno(codigo_interno) {
        this.codigo_interno = codigo_interno
    }
    reloadSavedMaps(savedMaps: ISavedMap[]) {
        this.savedMaps = savedMaps

    }
    updateProperties(mapData: IMapData) {
        let {
            filter_id,
            id,
            name,
            description,
            sharing_level,
            map_type,
            layer_object,
            user_id,
            map_status,
            feature_collection
        } = mapData || {};
        this.filter_id = filter_id;
        this.map_name = name;
        this.map_description = description;
        this.sharing_level = sharing_level;
        this.map_type = map_type;
        this.feature_collection = feature_collection || this.feature_collection;

        this.layer_object = id ? (layer_object || this.PublicLayersObject) : this.PublicLayersObject;

        if (map_status) {
            this.storedStatus = map_status
        }
        this.id = id;
        this.user_id = user_id;
        if (!filter_id) {
            setTimeout(() => {
                this.filter_id = 157
            }, 2000);
        }
        return this
    }

    get active_filter() {
        return this.filter_id;
    }
    set active_filter(filter_id) {
        if (filter_id !== this.filter_id) {
            console.zinfo('setting map filter id to ' + filter_id);
            this.filter_id = filter_id;
        }
    }
    //@ts-ignore
    __$store = {
        tipos_busqueda: (Alpine.store('tipos_busqueda') as XTipoBusquedaStore),
        columnas_actuales: (Alpine.store('columnas_actuales') as iCurrentColumns),
        campos_busqueda: (Alpine.store('campos_busqueda') as ICamposBusqueda),
        negocios: (Alpine.store('negocios') as INegocioStore),
        roles_negocio: (Alpine.store('roles_negocio') as IRolesNegocioStore),
        active_filter: (Alpine.store('active_filter') as IFilterStore),

        user: (Alpine.store('user') as IUserStore)
    }

    refreshSavedMaps(): Promise<void | ISavedMap[]> {
        return
    }
    fetchPublicaciones() {
        return this.$store.negocios.fetchAll().then((result) => {
            //ifDefined(globalThis.mapFrameData, (mapFrameData) => mapFrameData.reload())
            //ifDefined(globalThis.bsTable, (bsTable) => bsTable.reload && bsTable.reload())
            setTimeout(() => this.$store.negocios.total = this.$store.negocios.properties.length, 1000);
            return result;
        })

    }
    get comunasOptions() {
        return Array.from(new Set(this.dealsWithCoords.map(d => d.comuna)))
    }
    get dealsWithCoords() {

        return this.$store.negocios.properties.filter(
            ({ lat, lng, _extra_props }) =>
                (lat &&
                    lng &&
                    typeof lat === 'number' &&
                    typeof lng === 'number') || (
                    //@ts-ignore
                    _extra_props?.lat && _extra_props?.lng && typeof _extra_props?.lat === 'number' && typeof _extra_props?.lng === 'number'
                ),
        );

    }
    get sharingLevelDescription() {
        return this.sharingLevels[this.map_sharing_level].description;
    }
    get dataLayers(): (IMapLayerData | IHeatMapLayerData | IKmzLayer)[] {
        return this.layerSlugs.map(
            (slug_name) => globalThis.layerComponents[slug_name],
        );
    }


    get payload() {
        return {
            id: this.id,
            user_id: this.user_id || this.$store.user.id,
            last_modified_by: this.$store.user.id,
            filter_id: this.filter_id,
            name: this.map_name,
            description: this.map_description,
            sharing_level: this.map_sharing_level,
            layer_object: this.layer_object,
            map_status: this.storedStatus,
            feature_collection: this.feature_collection
        };
    }

    async saveLayer(slug_name, { layer_options }) {

        this.layer_object[slug_name].layer_options = layer_options;
    }
    get storedStatus() {
        const defaultMapStatus = {
            center: { lat: -33.415785, lng: -70.578539 },
            mapTypeId: 'Grass',
            zoom: 13.1,
        };
        const mapStatus = {
            ...defaultMapStatus,
        };

        if (mapStatus.zoom)
            mapStatus.zoom = Number(Number(mapStatus.zoom).toFixed(1));
        if (mapStatus.center?.lat)
            mapStatus.center.lat = Number(
                Number(mapStatus.center.lat).toFixed(6),
            );
        if (mapStatus.center?.lng)
            mapStatus.center.lng = Number(
                Number(mapStatus.center.lng).toFixed(6),
            );
        return mapStatus;
    }
    set storedStatus(mapStatus) {
        mapStatus = mapStatus || {};
        mapStatus.mapTypeId = mapStatus.mapTypeId || 'roadmap';

        if (
            mapStatus.zoom &&
            mapStatus.center?.lat &&
            mapStatus.center?.lng
        ) {
            mapStatus.zoom = Number(Number(mapStatus.zoom).toFixed(1));
            mapStatus.center.lng = Number(
                Number(mapStatus.center.lng).toFixed(6),
            );

            mapStatus.center.lat = Number(
                Number(mapStatus.center.lat).toFixed(6),
            );
        }



    }

    pushLayer(options: ILayerDefinition) {

        this.layer_array.push(options)
        //@ts-ignore
        this.layerSlugs.push(options.slug_name);
        return waitFor(200 + Math.random() * 150)
    }


    async createLayers(mapFrameData: AlpineDataComponent<IMapFrameData>) {
        let initialLength = this.layer_array.length
        const promises = Object.entries(this.layer_object)
            .filter(([slug_name, layer]) => !layer.disabled)
            .map(([slug_name, layer_options]) => {
                return this.pushLayer({ slug_name, name: layer_options.name || slug_name, ...layer_options as ILayerDefinition } as ILayerDefinition)
            });
        return Promise.all(promises).then(() => {


            if (initialLength === 0) {
                this.processEventListeners('layers_added', this)
            }
        })

        //@ts-ignore
    }

    set $store($store) {
        this._$store = $store
    }
    _$store = {
        tipos_busqueda: (Alpine.store('tipos_busqueda') as XTipoBusquedaStore),
        columnas_actuales: (Alpine.store('columnas_actuales') as iCurrentColumns),
        campos_busqueda: (Alpine.store('campos_busqueda') as ICamposBusqueda),
        negocios: (Alpine.store('negocios') as INegocioStore),
        roles_negocio: (Alpine.store('roles_negocio') as IRolesNegocioStore),
        active_filter: (Alpine.store('active_filter') as IFilterStore),

        user: (Alpine.store('user') as IUserStore)
    }
    get $store() {
        return this._$store
    }


}


export const createPublicMapStore = ($store) => {
    return new PublicMapStore($store)

};
