import { iconOptions, iconSelector } from './iconSelector';
import { computeColorAlpha, markerFactory } from "./marker_factory/markerFactory";
import { negocioFeatureToHtml } from "./negocioFeatureToHtml";
import { saveLayer } from './saveLayer';
const comunas = [
    "Lo Barnechea",
    "Las Condes",
    "La Reina",
    "Ñuñoa",
    "Providencia",
    "Vitacura",
    "Santiago",
];
export const mapLayerData = ({ index, slug_name, name, path, layer_options, criteria }, comunas) => ({
    //   features,
    layer_options,
    path,
    slug_name,
    filters_open: false,
    _map: null,
    index,
    controls: [
        { property: 'className', name: 'Icon', inputType: 'icon' },
        //   { property: 'fillOpacity', name: 'Opacidad', min: 0, max: 1, step: 0.01, inputType: 'range' },
        { property: 'scale', name: 'Tamaño', min: 0, max: 1, step: 0.05, inputType: 'range' },
        { property: 'strokeColor', name: 'Color', inputType: 'color' },
    ],
    get searchValue() {
        return this.$store.negocios.searchValue;
    },
    saveLayer() {
    },
    iconPreview: '',
    ...saveLayer({ slug_name, layer_options }),
    ...iconSelector({ slug_name, layer_options }),
    init() {
        this.original_icon = JSON.parse(JSON.stringify(this.layer_options.icon ?? {}));
        this.iconPreview = this.updateIcon();
        this.layer_options.icon = this.updateIcon();
        this.name = name;
        this.slug_name = slug_name;
        this.criteria = criteria;
        layer_options.fillOpacity = (layer_options.fillOpacity || 0.85);
        layer_options.scale = (layer_options.scale || 0.05);
        this.debouncedSaveLayer = Alpine.debounce(this.saveLayer);
        const { fontFamily, className, text } = iconOptions.find(option => option.className === layer_options.className);
        this.layer_options = { ...layer_options, name, slug_name, fontFamily, className, text };
        this.$watch('searchValue', this.setStyle.bind(this));
        this.$watch('index', this.setStyle.bind(this));
        this.addLayerToMap({ slug_name });
        this.declareEventHandlers();
        this._checked = globalThis.layers[slug_name].getMap() ? true : false;
        globalThis.layerComponents = globalThis.layerComponents || {};
        globalThis.layerComponents[this.slug_name] = this;
        this.watch();
        const checked = this.layer_options.checked;
        this.layer_options.checked = false;
        let strokeColor = this.layer_options.strokeColor;
        setTimeout(() => {
            this.layer_options.checked = checked;
            this.initTomSelect(this.$el.querySelector('.iconpicker'));
            this.refreshStrokeColor();
        }, 1000);
    },
    refreshStrokeColor() {
        let strokeColor = this.layer_options.strokeColor;
        let colors = computeColorAlpha(strokeColor, 1);
        //@ts-ignore
        colors.strokeColor = strokeColor;
        console.table(colors);
        this.layer_options.strokeColor = '#ffffff';
        requestAnimationFrame(() => this.layer_options.strokeColor = colors.colorRgba);
    },
    updateIcon() {
        let IconObject = markerFactory({
            label: this.layer_options.text,
            text: this.layer_options.text,
            fontFamily: "fontello",
            strokeColor: this.layer_options.strokeColor || '#0066aa',
            fillColor: '#ffffff',
            strokeOpacity: 1,
            fillOpacity: 1,
            fontSize: this.layer_options.fontSize || 36,
            // the scale is fixed for icon generation
            // the layer_options.scale is used afterwards, in method iconOptions
            scale: 1
        });
        //console.log(IconObject.toJSON())
        return IconObject;
    },
    get dealsWithCoords() {
        return this.$store.maps.dealsWithCoords;
    },
    toggleMap() {
        console.log('toggleMap ' + this.slug_name);
        const map = this.getLayer().getMap() ? null : globalThis.gmap;
        this.getLayer().setMap(map);
        this._map = map;
    },
    fontSize: 33,
    setFontSize(fontSize) {
        this.fontSize = fontSize;
        this.setStyle();
    },
    get featuresMatchingSearch() {
        return this.getLayer().getArray().filter(feature => feature.getProperty('searchstring').includes(this.searchValue));
    },
    setStyle() {
        //console.log(`setStyle for layer ${this.slug_name} `, this.markerLabel.color);
        let label = this.getMarkerLabel(), icon = this.getIconOptions();
        return globalThis.layers[this.slug_name].setStyle((feature) => {
            const result = {
                visible: (!this.searchValue || feature.getProperty('searchstring').includes(this.searchValue)),
                zIndex: (100 - (this.index ?? 0) * 10) + 100 * (feature.getProperty('highlighted') ? 1 : 0),
                draggable: feature.getProperty('draggable'),
                icon: this.getIconOptions(feature.getProperty('highlighted') || feature.getProperty('draggable') ? 1.1 : 1),
                label: feature.getProperty('draggable') ? label : null
            };
            return result;
        });
        return this;
    },
    getIconOptions(defaultScale = 1) {
        let { text, fontFamily, strokeColor, fillOpacity, fillColor, strokeOpacity, fontSize, scale, icon } = this.layer_options.markerOpts || this.layer_options;
        if (icon.url) {
            //   console.log({ url, slug_name: this.slug_name })
            defaultScale = defaultScale * Number(this.layer_options.scale);
            let width = 84 * defaultScale, height = 96 * defaultScale;
            return {
                scale: defaultScale,
                url: icon.url,
                size: { width: 96, height: 96 },
                anchor: { x: width / 2, y: height },
                scaledSize: { width, height }
            };
        }
    },
    addLayerToMap({ slug_name }) {
        if (globalThis.layers[slug_name] instanceof google.maps.Data)
            return;
        const layer = new google.maps.Data();
        globalThis.layers[slug_name] = layer;
        // this.$store.maps.layers[slug_name] = layer;
        //this.appendFeatures(this.dealsWithCoords)
        google.maps.event.addListener(layer, 'map_changed', () => {
            this.checked = layer.getMap() ? true : false;
            if (this.checked) {
                this.addMouseOverBehavior(layer);
                this.addInfoWindowBehavior(layer);
                this.addDragBehavior(layer);
            }
            else {
                this.removeMouseOverBehavior(layer);
                this.removeDragehavior(layer);
                this.removeInfoWindowBehavior(layer);
            }
        });
        this.setStyle(layer);
        setTimeout(() => {
            this.setFontSize(48);
        }, 500);
        return this;
    },
    get infowindow() {
        return globalThis.gmap.infowindow;
    },
    getInfoWindow() {
        return globalThis.gmap.infowindow;
    },
    mouseover_added: false,
    infowindow_added: false,
    mouseOverListener: null,
    mouseOutListener: null,
    clickListener: null,
    declareEventHandlers() {
        const labelProperty = this.layer_options.labelProperty || 'seudonimo-propiedad';
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
                strokeColor: 'rgba(200,200,200,1)',
            }
        });
        if (!this.mouseOverListener) {
            this.mouseOverListener = (event) => {
                const { feature } = event;
                feature.setProperty('highlighted', true);
                const featureLabel = feature.getProperty(labelProperty);
                if (featureLabel) {
                    this.marker.setLabel(this.getNameLabel(featureLabel));
                    //@ts-ignore
                    this.marker.setPosition(feature.getCenter());
                    this.marker.setVisible(true);
                }
            };
        }
        if (!this.mouseOutListener) {
            this.mouseOutListener = (event) => {
                event.feature.setProperty('highlighted', false);
                this.marker.setLabel('');
                this.marker.setVisible(false);
            };
        }
        const dragEndFactory = (feature) => {
            return (event) => {
                const { latLng } = event;
                feature.toGeoJson((jsonFeature) => {
                    let geoJsonFeature = jsonFeature;
                    let id = feature.getId(), negocio = this.$store.negocios.get(Number(id)), [lng, lat] = geoJsonFeature.geometry.coordinates;
                    //@ts-ignore
                    if (negocio)
                        negocio.saveAddress({ lat, lng });
                    feature.setProperty('draggable', false);
                    console.timerInfo({ handler: 'feature.setgeometry', lng, lat, id, negocio });
                });
            };
        };
        if (!this.clickListener) {
            this.clickListener = (event) => {
                globalThis.gmap.infowindow.close();
                let negocio = event.feature, { domEvent } = event || {}, 
                // @ts-ignore
                { shiftKey } = domEvent || {};
                if (shiftKey) {
                    negocio.setProperty('draggable', !negocio.getProperty('draggable'));
                    let debouncedDragEndHandler = Alpine.debounce(dragEndFactory(negocio), 500);
                    google.maps.event.addListener(negocio, 'setgeometry', debouncedDragEndHandler);
                    google.maps.event.addListener(negocio, 'dragstart', this.dragStartListener);
                    google.maps.event.addListener(negocio, 'dragend', this.dragEndListener);
                }
                else {
                    this.getMap().panTo(event.latLng);
                    let html = new negocioFeatureToHtml(negocio, this.campos).content;
                    this.getInfoWindow().setContent(html);
                    this.getInfoWindow().setPosition(event.latLng);
                    this.getInfoWindow().open({ map: globalThis.gmap });
                }
            };
        }
        if (!this.dragStartListener) {
            this.dragStartListener = (event) => {
                let negocio = event.feature;
                //negocio.setProperty('lat', event.latLng.lat())
                //negocio.setProperty('lng', event.latLng.lng())
                //console.log({ latLng: event.latLng })
                //this.getMap().panTo(event.latLng)
            };
        }
        if (!this.dragEndListener) {
            this.dragEndListener = (event) => {
                let negocio = event.feature, { domEvent } = event || {}, 
                // @ts-ignore
                { shiftKey } = domEvent || {};
                //negocio.setProperty('lng', event.latLng.lng())
                //console.log({ latLng: event.latLng })
                //this.getMap().panTo(event.latLng)
            };
        }
    },
    get map() {
        return this.getLayer().getMap();
    },
    getMap() {
        return this.getLayer().getMap();
    },
    getLength() {
        return this.getLayer().getLength();
    },
    get layer() {
        return this.getLayer();
    },
    get gmap() {
        return globalThis.gmap;
    },
    async removeFeatures() {
        this.getLayer().forEach(feature => {
            this.getLayer().remove(feature);
        });
        this.length = this.getLength();
        return this;
    },
    mapDialogOpen: false,
    async appendFeatures(dealsWithCoords) {
        this.features = (dealsWithCoords || this.dealsWithCoords)
            .filter((negocio) => negocio.match(this.criteria))
            .map((n) => n.toFeature());
        for (let feature of this.features) {
            this.getLayer().addGeoJson(feature);
        }
        this.length = this.getLength();
        return this.getLayer();
    },
    tomselect: null,
});
//# sourceMappingURL=map_layer_deals.js.map