import { staticFetchWrapper } from '@/components/decorators/staticFetchWrapper';
import { requestAnimationPromise } from '@/components/plugins';
import { AlpineDataComponent, IGeoJsonLayerData, ILayerOptions } from '@lacasadejuana/types';
import { PublicLayersObject } from './public_map_modules/exampleLayers';
import { genericFeatureToHtml } from "./public_map_modules/genericFeatureToHtml";
import { saveLayer } from "./public_map_modules/saveLayer";
import { hslToRGB } from '@/components/plugins';
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




type TBarrioFeature = GeoJSON.Feature<GeoJSON.Polygon> & { properties: TBarrioProperties, id: number }

export const PublicLayerBarriosDataLayer = ({ index, slug_name, name, layer_options }, comunas) => ({

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
    async init() {
        this.bounds = new google.maps.LatLngBounds(this.boundingBox)
        let qs = new URL(location.href)
        if (qs.searchParams.get('codigo_interno')) {
            this.codigo_interno = qs.searchParams.get('codigo_interno')
        }
        let { layer_options, ...featureCollection } = await staticFetchWrapper<GeoJSON.FeatureCollection & { layer_options: ILayerOptions }>(this.layer_options.url, {})

        this.layer_options = { ...this.layer_options, ...layer_options }

        globalThis.layerComponents = globalThis.layerComponents || {}
        globalThis.layerComponents[this.slug_name] = this;

        this.featureCollection = featureCollection

        this.original_icon = JSON.parse(JSON.stringify(this.layer_options.icon ?? {}))
        this.iconPreview = this.updateIcon()

        globalThis.exampleLayerObject = PublicLayersObject
        let example_layer = PublicLayersObject[slug_name] || { layer_options },
            icon = (example_layer.layer_options || layer_options).icon

        this.name = name;
        this.slug_name = slug_name;
        globalThis.layers = globalThis.layers || {}

        this.addLayerToMap();
        this.declareEventHandlers();

        this.$watch('index', this.setStyle.bind(this))

        this.watch()
        const checked = this.layer_options.checked
        this.layer_options.checked = false;
        this.layer_options = { ...layer_options, name, slug_name }


        setTimeout(() => {
            this.layer_options.checked = checked

        }, 1000)
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
    setStyle(): AlpineDataComponent<IGeoJsonLayerData> {
        const layer = this.getLayer()
        const highlightLabelClassname = "uppercase max-w-[125px] text-gray-500 markerLabel_break_words markerLabel bg-gray-200   p-1 bg-opacity-50";

        requestAnimationPromise().then(() => {
            let icon = this.iconPreview;
            let { labelVisibility } = this.layer_options

            let laberIcon = {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5,
                strokeWeight: 2,
                labelOrigin: new google.maps.Point(0, 2),
                strokeColor: 'rgba(200,200,200,0)',
            };
            this.getLayer().setStyle((feature) => {
                let featureName = feature.getProperty(this.layer_options.labelProperty),
                    comuna = feature.getProperty('Comuna'),
                    comunaOffset = Object.keys(comunas).indexOf(comuna);
                if (!comuna || comunaOffset === -1) {
                    comunaOffset = 0
                }
                comunaOffset -= 1
                let
                    highlighted = feature.getProperty('highlighted'),
                    matches = feature.getProperty('matches'),
                    transparencia = feature.getProperty('Transparencia') ?? 0,

                    fillOpacity = this.layer_options.fillOpacity *
                        //(1 - transparencia / 10) *
                        ((matches ? 2.5 : 0.9) *
                            highlighted
                            ? 1.3
                            : 0.7),
                    fillColor = `hsl(${(matches ? 20 : transparencia * 7) + comunaOffset * 50},${matches ? 65 : 55}%,${matches ? 60 : 70}%)`;


                /**
             * Label Visibility is computed from layer options
             * - labelVisibility.always means label is always shown
             * - labelVisibility.highlighted means label is shown when feature is highlighted
             * - labelVisibility.zoom means label is visible when map zoom is greater than or equal to labelVisibility.zoom
             */

                let styleObj = {

                    // label,
                    fillColor: feature.getProperty('fillColor') || fillColor,

                    strokeColor: feature.getProperty('strokeColor') || `hsl(${comunaOffset * 60},45%,40%)`,
                    strokeWeight: this.layer_options.strokeWeight || 1 || (feature.getProperty('strokeWeight') || 1) * this.layer_options.strokeWeight,
                    strokeOpacity: matches ? 1 : 0.7,
                    // visible: feature.getProperty('comuna') && comunas[feature.getProperty('comuna')] === true,
                    fillOpacity
                };

                return styleObj;
            });
        });
        return this
    },

    fontSize: 33,
    setFontSize(fontSize) {
        this.fontSize = fontSize
        this.setStyle()
    },
    mouseover_added: false,
    infowindow_added: false,
    addLayerToMap(): Promise<AlpineDataComponent<IGeoJsonLayerData>> {
        const layer = globalThis.layers[this.slug_name] || new google.maps.Data();
        globalThis.layers[this.slug_name] = layer
        //this.$store.public_maps.layers[slug_name] = layer

        return this.appendFeatures().then(() => {
            google.maps.event.addListener(layer, 'map_changed', () => {
                this.checked = layer.getMap() ? true : false
                if (this.checked) {
                    this.addMouseOverBehavior(layer)
                    this.addInfoWindowBehavior(layer);
                } else {
                    this.removeMouseOverBehavior(layer)
                    this.removeInfoWindowBehavior(layer);
                }
            })
            this.length = layer.getLength()
            return this.setStyle()
        })
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


    if(visibilityZoom) {
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
        return this.getLayer().getLength()
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
        if (this.getLayer() && this.getLayer().getLength() > 0) return this.getLayer()


        if (this.featureCollection) {
            this.getLayer().addGeoJson(this.featureCollection)
        } else if (this.layer_options.url) {
            this.getLayer().loadGeoJson(this.layer_options.url);
        }

        setTimeout(() => this.length = this.getLength(), 1500)

        return this.getLayer()
    },


    mapDialogOpen: false,





} as AlpineDataComponent<IGeoJsonLayerData>)

