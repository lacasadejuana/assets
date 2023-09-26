import { AlpineDataComponent, IMapLayerData } from '@lacasadejuana/types';
import { Negocio } from "../../../../../../negocios-panel/resources/js/negocios_modules/entities/Negocio";
import { b64toBlob } from './public_map_modules/b64toBlob';
import { iconOptions } from "./public_map_modules/iconOptions";
import { computeColorAlpha } from "./public_map_modules/marker_factory/markerFactory";
import { negocioFeatureToHtml } from "./public_map_modules/negocioFeatureToHtml";
import { saveLayer } from './public_map_modules/saveLayer';



export const PublicLayerDeals = ({ index, slug_name, name, path, layer_options, criteria }, comunas) => ({


    //   features,
    layer_options,
    path,
    slug_name,
    filters_open: false,
    _map: null,
    index,
    controls: [
        // { property: 'className', name: 'Icon', inputType: 'icon' },
        //   { property: 'fillOpacity', name: 'Opacidad', min: 0, max: 1, step: 0.01, inputType: 'range' },
        { property: 'scale', name: 'Tamaño', min: 0, max: 1, step: 0.05, inputType: 'range' },
        { property: 'strokeColor', name: 'Color', inputType: 'color' },

    ],
    get searchValue() {
        return this.$store.negocios.searchValue
    },
    saveLayer() {

    },
    iconPreview: '',

    ...saveLayer({ slug_name, layer_options }),
    async init() {
        this.original_icon = JSON.parse(JSON.stringify(this.layer_options.icon ?? {}))

        this.iconPreview = this.updateIcon()
        this.layer_options.icon = this.updateIcon();
        this.name = name;
        this.slug_name = slug_name;
        this.criteria = criteria;
        layer_options.fillOpacity = (layer_options.fillOpacity || 0.85)
        layer_options.scale = (layer_options.scale || 0.05)
        this.debouncedSaveLayer = Alpine.debounce(this.saveLayer)
        const { fontFamily, className, text } = iconOptions.find(option => option.className === layer_options.className)
        this.layer_options = { ...layer_options, name, slug_name, fontFamily, className, text }
        this.$watch('searchValue', this.setStyle.bind(this))
        this.$watch('index', this.setStyle.bind(this))

        this.addLayerToMap({ slug_name })
        this.declareEventHandlers();

        this._checked = globalThis.layers[slug_name].getMap() ? true : false


        globalThis.layerComponents = globalThis.layerComponents || {}
        globalThis.layerComponents[this.slug_name] = this
        this.watch()
        const checked = this.layer_options.checked
        this.layer_options.checked = false;
        let strokeColor = this.layer_options.strokeColor

        this.$watch('base64Icon', (newUrl) => {
            if (this.blobUrl) this.blobUrls.push(this.blobUrl)
            let b64Data = newUrl.replace('data:image/png;base64,', '')
            const contentType = 'image/png';

            const blob = b64toBlob(b64Data, contentType);
            this.blobUrl = URL.createObjectURL(blob);
        })
        setTimeout(() => {
            this.layer_options.checked = true
        })
    },
    blobUrls: [],
    destroy() {
        Array.from(new Set(this.blobUrls)).forEach((blobUrl) => URL.revokeObjectURL(String(blobUrl)))
    },
    refreshStrokeColor() {
        let strokeColor = this.layer_options.strokeColor
        let colors = computeColorAlpha(strokeColor, 1)
        //@ts-ignore
        colors.strokeColor = strokeColor
        console.table(colors)
        this.layer_options.strokeColor = '#ffffff';
        requestAnimationFrame(() => this.layer_options.strokeColor = colors.colorRgba)
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
    blobUrl: '',
    get base64Icon() {
        return (this.iconPreview ?? this.layer_options.icon).url
    },
    get iconUrl() {

        return this.blobUrl || this.base64Icon
    },

    get dealsWithCoords() {
        return this.$store.public_maps.dealsWithCoords;
    },


    toggleMap() {
        console.log('toggleMap ' + this.slug_name)
        const map = this.getLayer().getMap() ? null : globalThis.gmap
        this.getLayer().setMap(map)
        this._map = map
    },

    fontSize: 33,
    setFontSize(fontSize) {
        this.fontSize = fontSize
        this.setStyle()
    },
    get featuresMatchingSearch(): google.maps.Data.Feature[] {
        return this.getLayer().getArray().filter(feature => feature.getProperty('searchstring').includes(this.searchValue))
    },
    setStyle() {
        //console.log(`setStyle for layer ${this.slug_name} `, this.markerLabel.color);

        let label = this.getMarkerLabel(),
            icon = this.getIconOptions();



        return (globalThis.layers[this.slug_name] as google.maps.Data).setStyle((feature) => {

            let codigo_interno = null,
                defaultScale = 1,
                highlighted = feature.getProperty('highlighted');

            if (this.$store.public_maps.codigo_interno && this.$store.public_maps.codigo_interno == codigo_interno) {
                codigo_interno = feature.getId();
                defaultScale = defaultScale * 1.1
                icon = this.getIconOptions(highlighted ? 1.2 : 1.1, codigo_interno);
            } else if (highlighted) {
                icon = this.getIconOptions(highlighted ? 1.1 : 0, codigo_interno);
            }


            const result = {
                visible: (!this.searchValue || feature.getProperty('searchstring').includes(this.searchValue)),

                zIndex: (140 - (this.index ?? 0) * 10) + 100 * (feature.getProperty('highlighted') ? 1 : 0),
                draggable: feature.getProperty('draggable'),
                //icon: this.layer_options.icon.url,
                icon,
                label: feature.getProperty('draggable') ? label : null
            };
            return result;
        });
        return this
    },
    getIconOptions(defaultScale = 1, codigo_interno = null) {
        let iconUrl = this.iconUrl
        if (this.$store.public_maps.codigo_interno && this.$store.public_maps.codigo_interno != codigo_interno) {
            iconUrl = this.layer_options.url_low_emphasis || this.iconUrl
        }

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
                scaledSize: { width, height }
            }
        }




    },
    addLayerToMap({ slug_name }) {
        if (globalThis.layers[slug_name] instanceof google.maps.Data) return
        const layer = new google.maps.Data();
        globalThis.layers[slug_name] = layer;
        // this.$store.public_maps.layers[slug_name] = layer;
        //this.appendFeatures(this.dealsWithCoords)



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
        this.setStyle(layer)

        setTimeout(() => {

            this.setFontSize(48)
        }, 500);
        return this;
    },
    removeInfoWindowBehavior(layer: google.maps.Data): void {
        if (!this.infowindow_added) return
        this.infowindow_added = false

        google.maps.event.clearListeners(layer, 'click');
    },
    addInfoWindowBehavior(layer: google.maps.Data): void {
        if (this.infowindow_added) return
        this.infowindow_added = true

        google.maps.event.addListener(layer, 'click', (event: google.maps.Data.MouseEvent) => {
            globalThis.gmap.infowindow.close();
            let negocio = event.feature as google.maps.Data.Feature;



            this.getMap().panTo(event.latLng)


            let html = new negocioFeatureToHtml(negocio, this.$store.columnas_actuales.featureProperties).content;
            this.getInfoWindow().setContent(html);
            this.getInfoWindow().setPosition(event.latLng);
            this.getInfoWindow().open({ map: globalThis.gmap });

        });
    },
    get infowindow(): google.maps.InfoWindow {
        return globalThis.gmap.infowindow
    },
    getInfoWindow(): google.maps.InfoWindow {
        return globalThis.gmap.infowindow

    },
    mouseover_added: false,
    infowindow_added: false,
    mouseOverListener: null,
    mouseOutListener: null,
    clickListener: null,
    declareEventHandlers() {
        const labelProperty = this.layer_options.labelProperty || 'seudonimo-propiedad'

        this.marker = globalThis.gmap.labelMarker;

        if (!this.mouseOverListener) {
            this.mouseOverListener = (event: google.maps.Data.MouseEvent) => {
                const { feature } = event;
                if (this.marker.featuredProperty) {
                    this.marker.featuredProperty.setProperty('highlighted', false);
                }
                this.marker.featuredProperty = feature;
                feature.setProperty('highlighted', true);

                const featureLabel = feature.getProperty(labelProperty)
                if (featureLabel) {
                    this.marker.setLabel(this.getNameLabel(featureLabel));
                    //@ts-ignore
                    this.marker.setPosition(feature.getCenter());
                    this.marker.setVisible(true);
                    this.marker.setMap(globalThis.gmap)
                }
            };
        }
        if (!this.mouseOutListener) {
            this.mouseOutListener = (event: google.maps.Data.MouseEvent) => {
                event.feature.setProperty('highlighted', false);
                if (this.marker.featuredProperty) {
                    this.marker.featuredProperty.setProperty('highlighted', false);
                }
                this.marker.setLabel('');
                this.marker.setVisible(false);
                this.marker.setMap(null)
            };
        }

        if (!this.clickListener) {
            this.clickListener = (event: google.maps.Data.MouseEvent) => {
                globalThis.gmap.infowindow.close();
                let negocio = event.feature as google.maps.Data.Feature,
                    { domEvent } = event || {},
                    // @ts-ignore
                    { shiftKey } = domEvent || {};

                console.info('clickListener', { domEvent, shiftKey })


                this.getMap().panTo(event.latLng)


                let html = new negocioFeatureToHtml(negocio, this.campos).content;
                this.getInfoWindow().setContent(html);
                this.getInfoWindow().setPosition(event.latLng);
                this.getInfoWindow().open({ map: globalThis.gmap });

            }
        }

    },

    get map() {
        return this.getLayer().getMap()
    },
    getMap() {
        return this.getLayer().getMap()
    },
    getLength() {
        return this.getLayer().getLength()
    },

    get layer() {
        return this.getLayer()
    },
    get gmap() {
        return globalThis.gmap
    },

    async removeFeatures() {
        const lengthBefore = this.getLength()
        this.getLayer().forEach(feature => {
            this.getLayer().remove(feature)
        });
        this.length = this.getLength()
        console.log({ layer: this.slug_name, lengthBefore, lengthAfter: this.length })
        return this
    },



    mapDialogOpen: false,

    async appendFeatures(dealsWithCoords: Negocio[]) {

        this.features = (dealsWithCoords || this.dealsWithCoords)
            .filter((negocio) => negocio.match(this.criteria))
            .map((n) => n.toFeature());
        for (let feature of this.features) {
            this.getLayer().addGeoJson(feature);
        }

        this.length = this.getLength()

        return this.getLayer()

    },


    tomselect: null,

} as AlpineDataComponent<IMapLayerData>)

