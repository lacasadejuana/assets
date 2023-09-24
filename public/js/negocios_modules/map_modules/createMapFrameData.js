import { createCustomMap, } from '.';
import { requestAnimationPromise, waitFor } from '../../components/plugins';
import { extendMapDataProtoType } from './extendMapDataProtoType';
const comunas = [
    'Lo Barnechea',
    'Las Condes',
    'La Reina',
    'Ñuñoa',
    'Providencia',
    'Vitacura',
    'Santiago',
];
import TomSelect from 'tom-select';
import { MapTypeListener } from './MapTypeListener';
import { instanceDrawingManager } from './instanceDrawingManager';
import { populateMapFields } from './populateMapFields';
export const createMapFrameData = () => ({
    gmap: null,
    mapTypes: [],
    lastType: null,
    barriosButton: null,
    barriosVisible: false,
    mapOptions: {
        zoom: 15,
        bounds: {},
        center: {
            lat: -33.41,
            lng: -70.575,
        },
        mapTypeControl: true,
        fullscreenControl: true,
        gestureHandling: 'greedy',
        scaleControl: true,
        zoomControl: true,
        streetViewControl: true,
    },
    comunas: comunas.reduce((accum, comuna) => {
        accum[comuna] = true;
        return accum;
    }, {}),
    get searchValue() {
        return this.$store.negocios.searchValue;
    },
    get filters_open() {
        return this.$store.active_filter.filters_open;
    },
    set filters_open(value) {
        this.$store.active_filter.filters_open = value;
        this.$dispatch('filtersopen', value);
    },
    init() {
        this.$store.negocios.on('complete', () => this.reload());
        this.$watch('comunas', (comunas) => {
            Object.keys(globalThis.layers).forEach((key) => {
                globalThis.layerComponents[key] &&
                    globalThis.layerComponents[key].setStyle();
            });
        });
        this.$watch('searchValue', Alpine.debounce(this.fitBoundsMatchingSearch.bind(this), 500));
        this.debouncedUpdateHash = Alpine.debounce(this.updateHash, 500);
        globalThis.mapFrameData = this;
        this.$store.columnas_actuales.on('ready').then((columnas_actuales) => {
            this.campos = populateMapFields(columnas_actuales, this.$store.campos_busqueda);
        });
        this.createMap().then(async (gmap) => {
            this.gmap = gmap;
            globalThis.layers = {};
            this.$store.maps.onLayersAdded().then(async () => {
                this.appendFeatures();
                this.fetchPage();
                if (this.storedStatus.center && this.storedStatus.zoom) {
                    this.gmap.setOptions(this.storedStatus);
                }
                else {
                    await waitFor(1000);
                    this.fitBounds();
                }
                this.gmap.data.addGeoJson(this.$store.maps.feature_collection);
                this.gmap.data.setControls(['Point', 'LineString', 'Polygon']);
                this.gmap.data.setControlPosition(google.maps.ControlPosition.BOTTOM_CENTER);
                this.gmap.data.setMap(gmap);
                google.maps.event.addListener(this.gmap.data, 'addfeature', async (event) => {
                    gmap.data.setDrawingMode(null);
                    this.$store.maps.feature_collection = await new Promise(res => {
                        globalThis.gmap.data.toGeoJson(res);
                    });
                });
            });
            this.$store.maps.createLayers(this);
        });
    },
    async fetchPage() {
        if (this.$store.negocios.next_page_url && this.$store.negocios.data.length < this.$store.negocios.total) {
            let data = await this.$store.negocios.next();
            this.appendFeatures(data);
            if (this.$store.negocios.next_page_url) {
                return this.fetchPage();
            }
            return true;
        }
        return true;
    },
    googleReady: null,
    get scrollableElement() {
        return this.$el.closest('.map_outer_container');
    },
    get mapHeight() {
        if (!(this.scrollableElement instanceof HTMLElement))
            return 'auto';
        let offsetTop = 20;
        return (window.innerHeight -
            this.scrollableElement.getBoundingClientRect().top -
            offsetTop);
    },
    get layerSlugs() {
        return this.$store.maps.layerSlugs;
    },
    set layerSlugs(slugs) {
        this.$store.maps.layerSlugs = slugs;
    },
    get mapStatus() {
        if (!this.gmap)
            return {};
        let center = this.gmap?.getCenter();
        if (!center)
            return {};
        let lat = Number(Number(center?.lat()).toFixed(6)), lng = Number(Number(center?.lng()).toFixed(6));
        return {
            center: { lat, lng },
            zoom: Number(Number(this.gmap?.getZoom()).toFixed(1)),
            mapTypeId: this.gmap?.getMapTypeId(),
        };
    },
    get dealsWithCoords() {
        return this.$store.maps.dealsWithCoords;
    },
    async removeFeatures() {
        for (let dataLayer of this.dataLayers.filter(f => f.type === 'deals' && f.removeFeatures)) {
            await requestAnimationPromise().then(() => Promise.all([
                dataLayer.removeFeatures(),
                waitFor(100)
            ]));
        }
    },
    async appendFeatures(dealsWithCoords) {
        for (let layer of this.dataLayers) {
            if (layer && layer.appendFeatures) {
                await layer.appendFeatures(dealsWithCoords ?? this.dealsWithCoords);
                await waitFor(100);
            }
        }
    },
    reload() {
        this.removeFeatures().then(() => this.appendFeatures());
    },
    getLayer(slug_name) {
        return globalThis.layers[slug_name];
    },
    get layers() {
        return this.layerSlugs.map((slug) => this.$store.maps.layer_array.find((l) => l.slug_name === slug));
    },
    moveCollapsibles(oldIndex, newIndex) {
        let collapsibles = this.layerSlugs.slice(0);
        this.layerSlugs = [];
        let moved = collapsibles.splice(oldIndex, 1);
        collapsibles.splice(newIndex, 0, moved[0]);
        this.$nextTick(() => (this.layerSlugs = collapsibles));
    },
    get featuresMatchingSearch() {
        return this.dataLayers.reduce((accum, layer) => {
            if (layer) {
                accum = accum.concat(layer.featuresMatchingSearch);
            }
            return accum;
        }, []);
    },
    fitBoundsMatchingSearch() {
        let bounds = new google.maps.LatLngBounds();
        this.featuresMatchingSearch.forEach((feature) => {
            bounds.extend(feature.getCenter());
        });
        if (this.searchValue && this.featuresMatchingSearch.length > 0) {
            this.gmap.panTo(bounds.getCenter());
        }
    },
    screenShot() {
        this.mapControlsOpen = false;
        this.mapTypeListener.prepareScreenShot({
            map_container: this.$refs.map_container,
            mapHeight: this.mapHeight
        })
            .then(() => {
            this.mapControlsOpen = true;
        });
    },
    fitBounds() {
        const bounds = this.gmap.getBounds();
        this.dataLayers.forEach((layer) => {
            if (layer) {
                let gmapLayer = layer.getLayer();
                if (gmapLayer.getBounds)
                    bounds.union(gmapLayer.getBounds());
            }
        });
        this.gmap.fitBounds(bounds);
        return bounds;
    },
    get dataLayers() {
        return this.layerSlugs.map((slug_name) => globalThis.layerComponents[slug_name]);
    },
    async loadDrawingManager() {
        //@ts-ignore
        const { DrawingManager } = await google.maps.importLibrary("drawing");
        this.drawingManager = instanceDrawingManager(DrawingManager, this.gmap);
    },
    url: null,
    get storedStatus() {
        return this.$store.maps.storedStatus;
    },
    set storedStatus(mapStatus) {
        this.$store.maps.storedStatus = mapStatus;
    },
    async createMap() {
        globalThis.mapframe = this;
        globalThis.googleMapsOptions.libraries.push('visualization');
        //globalThis.googleMapsOptions.libraries.push('drawing');
        let mapStatus, mapStatusObj = {};
        this.url = new URL(window.location.href);
        if (this.url.searchParams.get('center')) {
            try {
                let center = JSON.parse(this.url.searchParams.get('center'));
                let zoom = Number(this.url.searchParams.get('zoom'));
                let mapTypeId = this.url.searchParams.get('mapTypeId');
                if (center.lat && center.lng) {
                    mapStatusObj = {
                        center: {
                            lat: Number(center.lat),
                            lng: Number(center.lng),
                        },
                        zoom,
                        mapTypeId,
                    };
                    this.storedStatus = mapStatusObj;
                    console.zinfo('mapStatusObj', { mapStatusObj });
                }
            }
            catch (e) { }
        }
        //@ts-ignore
        if (!mapStatusObj.center) {
            mapStatus = this.storedStatus;
            mapStatusObj = this.storedStatus;
        }
        this.gmap = await createCustomMap(this.$refs.map_container, {
            //mapId: '918f8abc9ae2727a',
            rotateControl: true,
            mapTypeControlOptions: {
                //  mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'],
                style: 1, // google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            },
            ...mapStatusObj,
        }, { appendToGlobalThis: true, loadBarrios: false });
        this.gmap.controls[google.maps.ControlPosition.LEFT_TOP].push(document.querySelector('#map_controls'));
        this.googleReady = true;
        setTimeout(() => {
            this.$nextTick(() => (this.mapDialogOpen = true));
        }, 2000);
        this.$refs.map_container.classList.remove('hidden');
        this.$refs.map_container.style.height = `${this.mapHeight}px`;
        extendMapDataProtoType(google.maps);
        this.mapTypeListener = new MapTypeListener(this.gmap);
        this.mapTypeListener
            .onChanged((mapTypeId) => {
            console.log({ mapTypeId });
            this.debouncedUpdateHash();
        })
            .onClickSave(() => {
            console.zinfo('onClickSave');
            this.debouncedUpdateHash();
        })
            .addCustomStyles()
            .then(() => {
            setTimeout(() => (this.tomSelect = new TomSelect(this.$el.querySelector('#maptype_selector'), this.tomselectOptions)), 1000);
        });
        this.infowindow = new google.maps.InfoWindow();
        this.gmap.infowindow = this.infowindow;
        google.maps.event.addListener(this.gmap, 'zoom_changed', () => {
            this.debouncedUpdateHash();
        });
        google.maps.event.addListener(this.gmap, 'maptypeid_changed', () => {
            this.debouncedUpdateHash();
            this.tomSelect &&
                this.tomSelect.addItem(this.gmap.getMapTypeId());
        });
        google.maps.event.addListener(this.gmap, 'center_changed', () => {
            this.debouncedUpdateHash();
        });
        return this.gmap;
    },
    getLength() {
        return this.dataLayers.filter(d => d.type === 'deals').reduce((accum, layer) => {
            accum = accum + layer.getLength();
            return accum;
        }, 0);
    },
    updateHash() {
        this.storedStatus = this.mapStatus;
        //@ts-ignore
        //   location.hash = decodeURIComponent(this.url.searchParams.toString())
    },
    search(term) {
        console.log('searching for', term);
    },
    campos: [],
    infowindow: null,
    mapDialogOpen: false,
    _buildingOptions: {
        strokeColor: '#0000cc',
        scale: 0.05,
    },
    _houseOptions: {
        strokeColor: '#009900',
        scale: 0.05,
    },
    get mapTypeId() {
        return this.gmap ? this.gmap.getMapTypeId() : 'roadmap';
    },
    set mapTypeId(mapTypeId) {
        if (this.gmap) {
            this.gmap.setMapTypeId(mapTypeId);
        }
    },
    get mapTypeOptions() {
        return this.gmap
            ? Object.entries(this.gmap.mapTypes)
                .filter(([id, mapType]) => {
                const { name } = mapType;
                return (name &&
                    !name.startsWith('gm_') &&
                    !name.startsWith('_'));
            })
                .map(([id, mapType]) => {
                return {
                    id,
                    name: mapType.name.replace(/^Mapa$/, 'Roadmap'),
                };
            })
                .sort((a, b) => a.name.localeCompare(b.name))
            : [];
    },
    get tomselectOptions() {
        return {
            valueField: 'id',
            maxItems: 1,
            create: false,
            labelField: 'name',
            options: this.mapTypeOptions,
            items: [this.gmap.getMapTypeId()],
            onChange: (newValue) => {
                this.gmap.setMapTypeId(newValue);
            },
        };
    },
    tomSelect: null,
});
//# sourceMappingURL=createMapFrameData.js.map