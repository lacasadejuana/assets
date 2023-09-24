import Alpine from 'alpinejs';
import { waitFor } from '../../components';
import { staticFetchWrapper } from '../../components/decorators';
import { BaseClass } from '../../components/stores';
import { exampleLayerObject, exampleLayers, sharingLevels } from '../map_modules';
export class MapStore extends BaseClass {
    constructor() {
        super();
        this.map_name = null;
        this.map_description = null;
        this.sharing_level = null;
        this.map_type = null;
        this.layer_object = null;
        this.id = null;
        this.filter_id = null;
        this.user_id = null;
        this.sharingLevels = sharingLevels;
        this.exampleLayerObject = exampleLayerObject;
        this.map_sharing_level = 'private';
        this.token = null;
        this.active_tab = 'tabs-savemap';
        this.layer_array = [];
        this.savedMaps = [];
        this.feature_collection = { type: 'FeatureCollection', features: [] };
        this.layerSlugs = [];
        this.onLayersAddedListeners = [];
        //@ts-ignore
        this.exampleLayers = exampleLayers;
        this.url = new URL(window.location.href);
    }
    init() {
    }
    reloadSavedMaps(savedMaps) {
        this.savedMaps = savedMaps;
        return this;
    }
    updateProperties(mapData) {
        let { filter_id, id, name, description, sharing_level, map_type, layer_object, user_id, map_status, feature_collection } = mapData || {};
        this.filter_id = filter_id;
        this.map_name = name;
        this.map_description = description;
        this.sharing_level = sharing_level;
        this.map_type = map_type;
        this.feature_collection = feature_collection || this.feature_collection;
        this.layer_object = id ? (layer_object || this.exampleLayerObject) : this.exampleLayerObject;
        if (map_status) {
            this.storedStatus = map_status;
        }
        this.id = id;
        this.user_id = user_id;
        if (!filter_id) {
            setTimeout(() => {
                this.filter_id = Number(this.$store.active_filter.id);
            }, 2000);
        }
        return this;
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
    get $store() {
        return {
            columnas_actuales: Alpine.store('columnas_actuales'),
            campos_busqueda: Alpine.store('campos_busqueda'),
            negocios: Alpine.store('negocios'),
            active_filter: Alpine.store('active_filter'),
            user: Alpine.store('user'),
        };
    }
    async saveMap() {
        this.$store.active_filter.setActive(this.filter_id);
        return staticFetchWrapper('/map' + (this.id ? `/${this.id}` : ''), {
            body: JSON.stringify(this.payload),
            method: this.id ? 'PUT' : 'POST'
        })
            .then(({ data }) => {
            this.id = data.id;
            this.url.pathname = `/map/${this.id}`;
            history.pushState(null, null, this.url.toString());
            this.user_id = data.user_id;
            this.id = data.id;
            return this.refreshSavedMaps();
        })
            .catch(err => {
            return console.warn(err);
        });
    }
    deleteMap(map_id) {
        map_id = Number(map_id || this.id);
        return staticFetchWrapper(`/api/maps/${map_id}`, {
            method: 'DELETE',
        })
            .then(() => {
            if (map_id === this.id) {
                this.url.pathname = `/map`;
                location.href = this.url.toString();
            }
            this.savedMaps = this.savedMaps.filter(map => map.id !== map_id);
        })
            .catch(err => {
            return console.warn(err);
        });
    }
    refreshSavedMaps() {
        return staticFetchWrapper('/api/maps', {})
            .then(({ my_maps }) => {
            return this.savedMaps = my_maps.reverse().reverse().map(map => {
                map.created_at = new Date(map.created_at).toLocaleString('en-GB').replace(/\//g, '-').replace(',', '').slice(0, 16);
                return map;
            });
        })
            .catch(err => {
            return console.warn(err);
        });
    }
    cloneMap(map_id) {
        map_id = Number(map_id || this.id);
        if (!map_id)
            return;
        return staticFetchWrapper('/map' + `/${map_id}/clone`, {
            body: JSON.stringify(this.payload),
            method: 'POST',
        })
            .then(({ data }) => {
            this.id = data.id;
            this.url.pathname = `/map/${this.id}`;
            location.href = this.url.toString();
            return history.pushState(null, null, this.url.toString());
        })
            .catch(err => {
            return console.warn(err);
        });
    }
    get dealsWithCoords() {
        return this.$store.negocios.properties.filter(({ lat, lng, _extra_props }) => (lat &&
            lng &&
            typeof lat === 'number' &&
            typeof lng === 'number') || (
        //@ts-ignore
        _extra_props?.lat && _extra_props?.lng && typeof _extra_props?.lat === 'number' && typeof _extra_props?.lng === 'number'));
    }
    get sharingLevelDescription() {
        return this.sharingLevels[this.map_sharing_level].description;
    }
    get dataLayers() {
        return this.layerSlugs.map((slug_name) => globalThis.layerComponents[slug_name]);
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
            ...JSON.parse(localStorage.getItem('mapStatus') ?? '{}'),
        };
        if (mapStatus.zoom)
            mapStatus.zoom = Number(Number(mapStatus.zoom).toFixed(1));
        if (mapStatus.center?.lat)
            mapStatus.center.lat = Number(Number(mapStatus.center.lat).toFixed(6));
        if (mapStatus.center?.lng)
            mapStatus.center.lng = Number(Number(mapStatus.center.lng).toFixed(6));
        return mapStatus;
    }
    set storedStatus(mapStatus) {
        mapStatus = mapStatus || {};
        mapStatus.mapTypeId = mapStatus.mapTypeId || 'roadmap';
        if (mapStatus.zoom &&
            mapStatus.center?.lat &&
            mapStatus.center?.lng) {
            mapStatus.zoom = Number(Number(mapStatus.zoom).toFixed(1));
            mapStatus.center.lng = Number(Number(mapStatus.center.lng).toFixed(6));
            mapStatus.center.lat = Number(Number(mapStatus.center.lat).toFixed(6));
        }
        localStorage.setItem('mapStatus', JSON.stringify(mapStatus));
    }
    pushLayer(options) {
        this.layer_array.push(options);
        //@ts-ignore
        this.layerSlugs.push(options.slug_name);
        return waitFor(200 + Math.random() * 150);
    }
    onLayersAdded(handler) {
        if (handler) {
            return this.tap(() => this.layer_array.length ? handler(this) : this.onLayersAddedListeners.push(handler));
        }
        else {
            return this.layer_array.length ? Promise.resolve(this) : new Promise(res => this.onLayersAddedListeners.push(res));
        }
    }
    async createLayers(mapFrameData) {
        let initialLength = this.layer_array.length;
        const promises = Object.entries(this.layer_object)
            .filter(([slug_name, layer]) => !layer.disabled)
            .map(([slug_name, layer_options]) => {
            return this.pushLayer({ slug_name, name: layer_options.name || slug_name, ...layer_options });
        });
        return Promise.all(promises).then(() => {
            if (initialLength === 0) {
                while (this.onLayersAddedListeners.length) {
                    this.onLayersAddedListeners.shift()(this);
                }
            }
        });
        //@ts-ignore
    }
}
export const createMapStore = () => {
    return new MapStore();
};
//# sourceMappingURL=createMapStore.js.map