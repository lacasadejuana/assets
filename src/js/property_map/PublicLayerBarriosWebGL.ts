import { staticFetchWrapper } from '@/components/decorators/staticFetchWrapper';
import { hslToRGB, requestAnimationPromise } from '@/components/plugins';
import { AlpineDataComponent, IGeoJsonLayerData, ILayerOptions } from '@lacasadejuana/types';
import { PublicLayersObject } from './public_map_modules/exampleLayers';
import { genericFeatureToHtml } from "./public_map_modules/genericFeatureToHtml";
import { saveLayer } from "./public_map_modules/saveLayer";

type TBarrioProperties = {
    "guid": string,
    "Color": string,
    "Comuna": string,
    "visible": string,
    "link-publicacion-web": string,
    "thumbnail": string,
    "post_title": string,
    "barrio_name": string,
    "Transparencia": number,
    "Nombre_de_Barrio": string

}
const comunasIndex = {
    "Providencia": "2",
    "Lo Barnechea": "3",
    "La Reina": "4",
    "Vitacura": "5",
    "Santiago": "6",
    "Las Condes": "0",

    "Ñuñoa": "1",

}

import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps';
import { GeoJsonLayer } from '@deck.gl/layers';
import { Feature } from 'geojson';




type TBarrioFeature = GeoJSON.Feature<GeoJSON.Polygon> & { properties: TBarrioProperties, id: number }

export const PublicLayerBarriosWebGL = ({ index, slug_name, name, layer_options }, comunas) => ({

    mapTypes: [],
    lastType: null,
    layer_options,
    filters_open: false,
    _map: null,
    index,
    controls: [
        //  { property: 'className', name: 'Icon', inputType: 'icon' },

        { property: 'fillOpacity', name: 'Opacidad', min: 0, max: 1, step: 0.01, inputType: 'range' },
        { property: 'strokeWeight', name: 'Grosor', min: 0, max: 5, step: 0.05, inputType: 'range' },
        { property: 'scale', name: 'Tamaño', min: 0, max: 1, step: 0.05, inputType: 'range' },
        { property: 'strokeColor', name: 'Color', inputType: 'color' },


    ],
    boundingBox: {
        "south": -33.49850221364226,
        "west": -70.70542845963612,
        "north": -33.33716710494213,
        "east": -70.4681924366869
    },
    bounds: null as google.maps.LatLngBounds,
    ...saveLayer({ slug_name, layer_options }),
    codigo_interno: null,
    geoJsonLayer: {},
    async init() {
        this.bounds = new google.maps.LatLngBounds(this.boundingBox)
        let qs = new URL(location.href)
        if (qs.searchParams.get('codigo_interno')) {
            this.codigo_interno = qs.searchParams.get('codigo_interno')
        }


        this.layer_options = { ...this.layer_options, ...layer_options }


        globalThis.exampleLayerObject = PublicLayersObject
        let example_layer = PublicLayersObject[slug_name] || { layer_options },
            icon = null;
        const checked = this.layer_options.checked
        this.name = name;
        this.slug_name = slug_name;
        globalThis.layers = globalThis.layers || {}

        globalThis.layerComponents = globalThis.layerComponents || {}
        globalThis.layerComponents[this.slug_name] = this;


        this.addLayerToMap();


        this.layer_options.checked = false;
        this.layer_options = { ...layer_options, name, slug_name }


        setTimeout(() => {
            google.maps.event.addListenerOnce(globalThis.gmap, 'idle', () => {
                this.checked = checked
            })
        }, 2000)
    },


    updateIcon(defaultScale = 1) {
        let {
            text,
            fontFamily,
            strokeColor,
            fillOpacity,
            fillColor,
            strokeOpacity,
            fontSize,
            scale,
            icon,
            strokeWeight,
            rotation

        } = this.layer_options

        if (!icon) return null
        if (icon.path) {
            return {

                path: icon.path,
                scale: (scale ?? icon.scale) / 10,
                fillColor: strokeColor || icon.strokeColor || strokeColor,
                strokeColor: strokeColor,
                strokeOpacity: strokeOpacity,
                strokeWeight: icon.strokeWeight ?? (strokeWeight || 0.1),
                fillOpacity: fillOpacity,
                rotation: icon.rotation ?? (rotation ?? 90),
                anchor: new google.maps.Point(96, 48)
            }
        }
        if (icon.url) {

            //   console.log({ url, slug_name: this.slug_name })
            defaultScale = defaultScale * Number(this.layer_options.scale)
            let width = 54 * defaultScale,
                height = 54 * defaultScale;
            return {
                scale: defaultScale,
                url: icon.url,
                size: new google.maps.Size(54, 54),
                anchor: { x: width / 2, y: height },
                scaledSize: new google.maps.Size(width, height),
            }
        }




    },
    get base64Icon() {
        return (this.iconPreview ?? this.layer_options.icon ?? {}).url
    },
    get iconUrl() {

        return this.blobUrl || this.base64Icon
    },

    getIconOptions(defaultScale = 1) {
        let iconUrl = this.iconUrl

        if (iconUrl) {

            //   console.log({ url, slug_name: this.slug_name })
            defaultScale = defaultScale * Number(this.layer_options.scale)
            let width = 54 * defaultScale,
                height = 54 * defaultScale;
            return {
                scale: defaultScale,
                url: iconUrl,
                size: { width: 54, height: 54 },
                anchor: { x: width / 2, y: height },
                scaledSize: { width, height },
                labelOrigin: { x: 0.8 * width, y: height }
            }
        }




    },

    getOverlay() {
        return Alpine.raw(this.getLayer()._overlay)
    },

    get checked() {
        return this.layer_options.checked
    },
    set checked(value) {

        this.getOverlay()?.setMap(value ? globalThis.gmap : null)

        this.layer_options.checked = value
        //console.log('checked changing:', value)


    },
    toggleMap() {
        //console.log('toggleMap ' + this.slug_name)
        const map = this.getOverlay().getMap() ? null : globalThis.gmap
        this.getLayer().setProps({ visible: !!map })
        this.getOverlay().setMap(map)
        this._map = map
    },

    setStyle(): AlpineDataComponent<IGeoJsonLayerData> {
        const layer = this.getLayer()
        const highlightLabelClassname = "uppercase max-w-[125px] text-gray-500 markerLabel_break_words markerLabel bg-gray-200   p-1 bg-opacity-50";
        return this;

    },

    fontSize: 33,
    setFontSize(fontSize) {
        this.fontSize = fontSize
        this.setStyle()
    },
    mouseover_added: false,
    infowindow_added: false,
    addLayerToMap(): Promise<AlpineDataComponent<IGeoJsonLayerData>> {
        // Add overlay to map

        const layer = globalThis.layers[this.slug_name] || new DeckOverlay({
            layers: [

            ],
        });

        globalThis.layers[this.slug_name] = layer
        // layer.setMap(globalThis.gmap);

        //this.$store.public_maps.layers[slug_name] = layer

        return this.appendFeatures()


    },


    mouseOverListener: null,
    mouseOutListener: null,
    clickListener: null,
    async declareEventHandlers() {
        const labelProperty = this.layer_options.labelProperty || 'Nombre_de_Barrio'

        this.marker = globalThis.gmap.labelMarker;
        if (!this.mouseOverListener) {
            this.marker = this.marker || new google.maps.Marker({
                position: this.getLayer().getBounds().getCenter(),
                visible: true,
                map: globalThis.gmap,
                zIndex: 210,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 5,
                    strokeWeight: 2,
                    labelOrigin: new google.maps.Point(0, 2),
                    strokeColor: 'rgba(200,200,200,0)',
                }
            });

            const layer = this.getLayer()

            let visibilityZoom = this.layer_options.labelVisibility.zoom;
            if (visibilityZoom) {
                let previousZoom = globalThis.gmap.getZoom();
                const zoomChangedHandler = e => {
                    let currentZoom = globalThis.gmap.getZoom()

                    // When zooming above visibilty threshold, update the style
                    if (currentZoom >= visibilityZoom && previousZoom <= visibilityZoom) {
                        console.zinfo('went above visibility zoom', currentZoom)
                        document.querySelector('.gm-style').classList.remove('hide-labels')
                        document.querySelector('.gm-style').classList.add('show-labels')
                    }
                    // When zooming below visibilty threshold, update the style
                    if (currentZoom < visibilityZoom && previousZoom >= visibilityZoom) {
                        console.zinfo('went below visibility zoom', currentZoom)
                        document.querySelector('.gm-style').classList.remove('show-labels')
                        document.querySelector('.gm-style').classList.add('hide-labels')
                    }
                    console.timerInfo(`zoom changed from ${previousZoom} to ${currentZoom}`)
                    previousZoom = currentZoom
                };
                this.gmap.addListener('idle', () => zoomChangedHandler(null));
                // this.gmap.addListener('zoom_changed', Alpine.debounce(zoomChangedHandler, 100));

            }
            if (this.layer_options.labelVisibility.highlighted) {
                this.mouseOverListener = (event: google.maps.Data.MouseEvent) => {
                    const { feature } = event;
                    feature.setProperty('highlighted', true);
                    let featureLabel = feature.getProperty(labelProperty);
                    if (featureLabel) {
                        this.marker.setLabel(this.getNameLabel(featureLabel, 'uppercase max-w-[125px] text-gray-500 markerLabel_break_words markerLabel bg-gray-50   p-1 bg-opacity-10'));
                        //@ts-ignore
                        this.marker.setPosition(feature.getCenter());
                        this.marker.setVisible(true);
                    }
                };
            }

            if (!this.mouseOutListener && this.layer_options.labelVisibility.highlighted) {
                this.mouseOutListener = (event: google.maps.Data.MouseEvent) => {
                    event.feature.setProperty('highlighted', false);
                    this.marker.setLabel('');
                    this.marker.setVisible(false);
                };
            }
        }
        if (!this.clickListener && this.layer_options.infoWindow) {
            this.clickListener = (event: google.maps.Data.MouseEvent) => {
                globalThis.gmap.infowindow.close();
                let negocio = event.feature as google.maps.Data.Feature;
                console.log({ latLng: event.latLng })
                this.getMap().panTo(event.latLng)


                let html = new genericFeatureToHtml(negocio, this.layer_options.campos).content;
                this.getInfoWindow().setContent(html);
                this.getInfoWindow().setPosition(event.latLng);
                this.getInfoWindow().open({ map: globalThis.gmap });
            }
        }
    },




    get infowindow(): google.maps.InfoWindow {
        return globalThis.gmap.infowindow
    },
    getInfoWindow(): google.maps.InfoWindow {
        return globalThis.gmap.infowindow

    },

    getLayer(): google.maps.Data {
        return globalThis.layers[this.slug_name]
    },

    getLength(): number {
        let { layers } = this.getLayer().props
        return layers.length ? layers[0].count : 0

    },
    length: 0,

    setMap(map): void {
        return this.getLayer().setMap(map)
    },
    getMap(): google.maps.Map | null {
        return this.getLayer().getMap()
    },
    get gmap(): google.maps.Map | null {
        return globalThis.gmap
    },

    get layer(): google.maps.Data | null {
        return this.getLayer()
    },
    removeFeatures(): void {
        // This layer shouldn't remove features when negocios store is emptied
        return

    },

    async appendFeatures(): Promise<google.maps.Data> {
        if (this.getLayer() && this.getLength() > 0) return this.getLayer()

        const geoJsonLayer = new GeoJsonLayer({
            id: "barrios",
            data: this.layer_options.url,
            ///Alpine.raw(this.featureCollection),//, "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
            filled: true,
            opacity: 0.4,

            getFillColor: (f: Feature) => {
                console.log(f)
                if (!f.properties.rgbaColor) {

                    return [190, 190, 190]
                }
                let { r, g, b, a } = f.properties.rgbaColor
                let fillColor = [r, g, b]
                console.log({ fillColor })
                return fillColor
            },
            autoHighlight: true,
            onDataLoad: () => {
                console.log('onDataLoad')
                /* eslint-disable no-undef */
                // @ts-ignore defined in include
                //                progress.done(); // hides progress bar
                /* eslint-enable no-undef */
            },
        });
        this.getLayer().setProps({ layers: [geoJsonLayer] });



        return this.getLayer()
    },


    mapDialogOpen: false,





} as AlpineDataComponent<IGeoJsonLayerData>)

