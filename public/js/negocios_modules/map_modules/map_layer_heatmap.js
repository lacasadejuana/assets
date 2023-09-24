import { saveLayer } from "./saveLayer";
const comunas = [
    "Lo Barnechea",
    "Las Condes",
    "La Reina",
    "Ñuñoa",
    "Providencia",
    "Vitacura",
    "Santiago",
];
export const heatMapLayerData = ({ slug_name, name, path, layer_options, criteria }, comunas) => ({
    //   features,
    layer_options,
    slug_name,
    filters_open: false,
    _map: null,
    fillOpacity: null,
    controls: [
        { property: 'opacity', name: 'Opacidad', min: 0, max: 1, step: 0.01, inputType: 'range' },
        { property: 'radius', name: 'Radio', min: 0, max: 200, step: 1, inputType: 'range' },
        { property: 'maxIntensity', name: 'Intensidad', min: 0, max: 1, step: 0.01, inputType: 'range' },
    ],
    ...saveLayer({ slug_name, layer_options }),
    init() {
        this.name = name;
        this.slug_name = slug_name;
        this.fillOpacity = layer_options.fillOpacity;
        this.addLayerToMap({ slug_name, name, criteria });
        this._checked = globalThis.layers[slug_name].getMap() ? true : false;
        this.layer_options = { ...layer_options, name, slug_name };
        globalThis.layerComponents = globalThis.layerComponents || {};
        globalThis.layerComponents[this.slug_name] = this;
        this.watch();
        const checked = this.layer_options.checked;
        this.layer_options.checked = false;
        setTimeout(() => {
            this.layer_options.checked = checked;
        }, 1000);
    },
    get length() {
        return this.getLayer().getLength();
    },
    get layer() {
        return this.getLayer();
    },
    setStyle() {
        globalThis.layers[this.slug_name].setOptions(this.layer_options);
        return this;
    },
    addLayerToMap({ slug_name, name, path, layer_options, criteria }) {
        const layer = new google.maps.visualization.HeatmapLayer();
        globalThis.layers[slug_name] = layer;
        //this.$store.maps.layers[slug_name] = layer
        return this.appendFeatures().then(() => this.setStyle());
    },
    get map() {
        return this.getLayer().getMap();
    },
    get gmap() {
        return globalThis.gmap;
    },
    removeFeatures() {
        this.getLayer().setOptions({ data: [] });
    },
    mapDialogOpen: false,
    async appendFeatures() {
        const data = this.dealsWithCoords.map(({ lat, lng }) => ({ location: new google.maps.LatLng(lat, lng), weight: 1 }));
        this.getLayer().setOptions({ data });
        return this.getLayer();
    },
});
//# sourceMappingURL=map_layer_heatmap.js.map