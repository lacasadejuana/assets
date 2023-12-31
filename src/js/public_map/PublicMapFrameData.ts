import { requestAnimationPromise, waitFor } from '@/components/plugins';
import {
    AlpineDataComponent,
    IHeatMapLayerData,
    IMapLayerData
} from '@lacasadejuana/types';
import { extendMapDataProtoType } from './public_map_modules/extendMapDataProtoType';

const comunas = [
    'Lo Barnechea',
    'Las Condes',
    'La Reina',
    'Ñuñoa',
    'Providencia',
    'Vitacura',
    'Santiago',
];

import { NegocioColumn } from '@/components/entities/NegocioColumn';
import { ILayerDefinition, IMapFrameData } from "@lacasadejuana/types";
import TomSelect from 'tom-select';
import { RecursivePartial, TomSettings } from 'tom-select/dist/types/types';

import { CamposBusquedaStore, ColumnasActualesStore } from '@/components';
import { Negocio } from '@/components/entities/Negocio';
import { IKmzLayer } from '@lacasadejuana/types';
import { initMap } from './public_map_modules';
import { MapTypeListener } from './public_map_modules/MapTypeListener';
import { PublicLayersObject } from './public_map_modules/exampleLayers';
import { populateMapFields } from './public_map_modules/populateMapFields';
export const PublicMapFrameData = ({ codigo_interno = null, extent = null }: { codigo_interno?: string, extent?: string }) => {
    return {
        gmap: null,
        mapTypes: [],
        lastType: null,
        barriosButton: null,
        barriosVisible: false,
        mapOptions: {
            zoom: 17,
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
        bounds: null,
        codigo_interno: null,
        async init() {
            let mapPromise = google.maps.importLibrary('maps'),
                markerPromise = google.maps.importLibrary('marker'),
                qs = new URL(location.href)
            if (qs.searchParams.get('extent')) {
                let [west, north, east, south] = qs.searchParams.get('extent').split(',')

                this.bounds = {
                    east: Number(east),
                    north: Number(north),
                    west: Number(west),
                    south: Number(south),
                }
            } else if (codigo_interno) {
                this.bounds = null
            }

            else {
                this.bounds = { "south": -33.46, "west": -70.67, "north": -33.336, "east": -70.49 }
            }
            if (qs.searchParams.get('codigo_interno')) {
                this.codigo_interno = qs.searchParams.get('codigo_interno')
                this.$store.public_maps.setCodigoInterno(this.codigo_interno)
            }
            this.$store.negocios.on('complete', () => this.appendFeatures());
            
            this.$watch('comunas', (comunas) => {
                Object.keys(globalThis.layers).forEach((key) => {
                    globalThis.layerComponents[key] &&
                        globalThis.layerComponents[key].setStyle();
                });
            });
            this.$watch('searchValue', Alpine.debounce(this.fitBoundsMatchingSearch.bind(this), 500));
            globalThis.mapFrameData = this;
            this.$store.campos_busqueda.on('ready').then((columnas_actuales) => {
                this.campos = populateMapFields(
                    { columnDefs: [] } as ColumnasActualesStore,
                    this.$store.campos_busqueda as unknown as CamposBusquedaStore
                )
            });
            this.$store.public_maps.fetchPublicaciones();
            console.warn('deciding between createMap and store ready')
            this.$store.public_maps.once('ready', maps => {
                console.info('mapFrameData, received store ready event')

                console.info({ googleMaps: maps })
                extendMapDataProtoType(maps);

                this.$store.public_maps.once('map_created', gmap => {


                    console.log('map_created', this.gmap, gmap)

                    this.gmap = this.$store.public_maps.customElementsMap
                    globalThis.gmap = Alpine.raw(this.gmap)
                    this.mapCreatedHandlers.forEach(handler => handler(this.gmap))

                    this.googleReady = true;

                    this.marker = this.createMarker();
                    globalThis.layers = {};
                    this.$store.public_maps.once('layers_added').then(async () => {
                        console.trace('layers added')
                        this.appendFeatures()
                        this.onMapCreated((gmap) => {
                            console.warn('map created')
                            if(this.codigo_interno) {
                            this.panToCodigoInterno()
                            }
                        })
                        if (this.bounds) {
                            this.gmap.fitBounds(this.bounds)
                        } else if (this.storedStatus.center && this.storedStatus.zoom) {
                            this.gmap.setOptions(this.storedStatus);
                        } else {
                            await waitFor(1000);
                            this.fitBounds();
                        }
                        this.gmap.setZoom(13)

                    });
                    this.$store.public_maps.layer_object = PublicLayersObject
                    this.$store.public_maps.createLayers(this);
                    //alert('createDomManager created')
                    this.createDomManager(!!this.codigo_interno );

                    setTimeout(() => {
                        if (globalThis.layerComponents.colegios) globalThis.layerComponents.colegios.layer_options.checked = true
                        if (globalThis.layerComponents.metro) globalThis.layerComponents.metro.layer_options.checked = true
                    }, 2000)
                    return gmap;
                })


                let
                    mapStatusObj = {} as Partial<google.maps.MapOptions>
                this.url = new URL(window.location.href);

                //@ts-ignore
                if (!mapStatusObj.center) {
                    mapStatusObj = this.storedStatus;
                }

                let mergedOptions = {

                    rotateControl: true,
                    isFractionalZoomEnabled: false,
                    streetViewControl: false,
                    mapTypeControl: !this.codigo_interno && !this.extent,
                    tiltControl: true,

                    ...mapStatusObj,
                    zoom:13,
                    mapId: '3b1abace91810cf',
                };
                if (this.$store.public_maps.skipMapCreation || this.$store.public_maps.full_map) {
                    this.gmap = new google.maps.Map(this.$el.querySelector('#map_container'), mergedOptions)
                    this.$store.public_maps.customElementsMap = this.gmap
                }

            });


        },
        marker: null as google.maps.Marker,
        createMarker() {
            this.marker = this.marker || new google.maps.Marker({
                position: this.gmap.getCenter(),
                visible: false,
                map: globalThis.gmap,
                zIndex: 210,
                icon: {
                    path: 0,//google.maps.SymbolPath.CIRCLE,
                    scale: 0.5,
                    strokeWeight: 1,
                    labelOrigin: new google.maps.Point(0, 2),
                    strokeColor: 'rgba(200,200,200,0)',
                }
            });
            globalThis.gmap.labelMarker = this.marker;
            return this.marker;
        },
        async createMap(): Promise<google.maps.Map> {
            globalThis.mapframe = this;
            console.warn('creating map or waiting for the store to create it')
            //globalThis.googleMapsOptions.libraries.push('drawing');

            console.info('deciding between initMap and map_created')







        },
        mapCreatedHandlers: [],
        onMapCreated(handler) {
            this.mapCreatedHandlers.push(handler)
        },
        createDomManager(codigo_interno) {

            if (codigo_interno) {
                this.gmap.setZoom(17)
            } else {
                this.gmap.controls[google.maps.ControlPosition.LEFT_TOP].push(document.querySelector('#map_controls'),);
                setTimeout(() => {
                    this.$nextTick(() => (this.mapDialogOpen = true));
                }, 2000);

            }

            this.$refs.map_container.classList.remove('hidden');
            this.$refs.map_container.style.height = `${this.mapHeight}px`;
            this.mapTypeListener = new MapTypeListener(this.gmap);
            this.mapTypeListener

                .addCustomStyles()
                .then(() => {

                });

            this.infowindow = new google.maps.InfoWindow();
            this.gmap.infowindow = this.infowindow;

        },

        googleReady: null,
        get scrollableElement(): HTMLElement | null {
            return this.$el.closest('.map_outer_container') as HTMLElement;
        },
        get mapHeight() {
            if (!(this.scrollableElement instanceof HTMLElement)) return 'auto';
            let offsetTop = 20;
            return (
                window.innerHeight -
                this.scrollableElement.getBoundingClientRect().top -
                offsetTop
            );
        },



        get layerSlugs() {
            return this.$store.public_maps.layerSlugs;
        },
        set layerSlugs(slugs) {
            this.$store.public_maps.layerSlugs = slugs
        },

        get mapStatus() {
            if (!this.gmap) return {};
            let center = this.gmap?.getCenter();
            if (!center) return {};
            let lat = Number(Number(center?.lat()).toFixed(6)),
                lng = Number(Number(center?.lng()).toFixed(6));
            return {
                center: { lat, lng },
                zoom: Number(Number(this.gmap?.getZoom()).toFixed(1)),

            };
        },


        get dealsWithCoords() {
            return this.$store.public_maps.dealsWithCoords
        },

        listFeatures() {
            console.table(this.dataLayers.filter(f => f.type === 'deals').map(f => ({
                slug_name: f.slug_name,
                features: f.getLength()
            })))
        },
        async removeFeatures() {

            for (let dataLayer of this.dataLayers.filter(f => f && f.type === 'deals' && f.removeFeatures)) {
                await requestAnimationPromise().then(() => Promise.all([
                    dataLayer.removeFeatures(),
                    waitFor(50)
                ]))
            }

        },
        async appendFeatures(dealsWithCoords: Negocio[]) {

            for (let layer of this.dataLayers) {
                if (layer && layer.appendFeatures) {
                    await layer.appendFeatures(dealsWithCoords ?? this.dealsWithCoords);
                    await waitFor(50);
                }
            }


        },
        panToCodigoInterno() {
            if (this.codigo_interno) {
                console.log('looking for deal with codigo_interno ' + this.codigo_interno)
                let negocio = this.$store.public_maps.dealsWithCoords.find(n => n.codigo_interno == this.codigo_interno || n.id == this.codigo_interno)
                if (negocio) {
                    let gmap = this.gmap as google.maps.Map;

                    this.gmap.setCenter({ lat: Number(negocio.lat), lng: Number(negocio.lng) })
                    this.gmap.setZoom(Math.max(this.gmap.getZoom(), 17))


                }
            }
        },
        reload() {
            this.removeFeatures().then(() => this.appendFeatures())

        },
        getLayer(
            slug_name,
        ): google.maps.Data | google.maps.visualization.HeatmapLayer {
            return globalThis.layers[slug_name];
        },

        get layers(): ILayerDefinition[] {
            return this.layerSlugs.map((slug) =>
                this.$store.public_maps.layer_array.find((l) => l.slug_name === slug),
            );
        },
        moveCollapsibles(oldIndex, newIndex) {
            let collapsibles = this.layerSlugs.slice(0);
            this.layerSlugs = [];
            let moved = collapsibles.splice(oldIndex, 1);
            collapsibles.splice(newIndex, 0, moved[0]);
            this.$nextTick(() => (this.layerSlugs = collapsibles));
        },

        get featuresMatchingSearch(): google.maps.Data.Feature[] {
            return this.dataLayers.reduce((accum, layer) => {
                if (layer) {
                    accum = accum.concat(layer.featuresMatchingSearch)
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

        fitBounds(type?: 'deals' | 'all') {
            const bounds = this.gmap.getBounds();

            this.dataLayers.forEach((layer) => {
                if (layer && (layer.type === type || type === 'all')) {
                    let gmapLayer = layer.getLayer();
                    if (gmapLayer.getBounds)
                        bounds.union(gmapLayer.getBounds());
                }
            });
            this.gmap.fitBounds(bounds);
            return bounds;
        },
        get dataLayers(): (IMapLayerData | IHeatMapLayerData | IKmzLayer)[] {
            globalThis.layerComponents = globalThis.layerComponents || {}

            return this.layerSlugs.map(
                (slug_name) => globalThis.layerComponents[slug_name],
            );
        },

        url: null as unknown as URL,
        get storedStatus() {
            return this.$store.public_maps.storedStatus;
        },
        set storedStatus(mapStatus) {
            this.$store.public_maps.storedStatus = mapStatus;
        },

        getLength() {
            return this.dataLayers.filter(d => d.type === 'deals').reduce((accum, layer) => {
                accum = accum + layer.getLength();
                return accum
            }, 0)
        },

        search(term) {
            console.log('searching for', term);
        },

        campos: [] as NegocioColumn[],

        infowindow: null as google.maps.InfoWindow,


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
            return 1
        },
        set mapTypeId(mapTypeId) {

        },
        get mapTypeOptions() {
            return this.gmap
                ? Object.entries(
                    this.gmap.mapTypes as Record<string, google.maps.MapType>,
                )
                    .filter(([id, mapType]) => {
                        const { name } = mapType;
                        return (
                            name &&
                            !name.startsWith('gm_') &&
                            !name.startsWith('_')
                        );
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
            } as unknown as RecursivePartial<TomSettings>;
        },
        tomSelect: null as TomSelect,
    } as AlpineDataComponent<IMapFrameData>
};

