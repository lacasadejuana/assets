import Alpine from 'alpinejs';
import { AlpineDataComponent } from '@/components/alpine.store';
import * as L from 'leaflet/dist/leaflet-src.esm'
import { barriosLayer } from './barrioInfo';
import { metroInfo, metroIcon, metroLayer } from './metroInfo';
import { colegioLayer } from './colegioInfo';
import { exampleLayers } from './exampleLayers'
import { PublicLayerDeals } from './PublicLayerDeals';
import { extendMapDataProtoType } from '@/property_map/public_map_modules';
interface iLeafletMap {
    map: L.Map | null
    init(): void
}

export const LeafletMap = () => ({
    map: null,
    exampleLayers: exampleLayers,
    async init() {
        this.map = L.map('map', {
            zoomControl: false
        }).setView([-33.43, -70.5777], 13);
        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.map);
        globalThis.map = this.map
        globalThis.leafletMap = this
        const cartoCDN = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        });

        cartoCDN.addTo(this.map);


        globalThis.layerControl = L.control.layers(
            null
            , null, { collapsed: false, position: 'topright' }).addTo(this.map);
        globalThis.layers = globalThis.layers || {}

        this.barrioslayer = await barriosLayer(this.map)

        this.metrolayer = await metroLayer(this.map);

        this.colegioLayer = await colegioLayer(this.map);

        globalThis.layerControl.addOverlay(this.barrioslayer, "Barrios");
        globalThis.layerControl.addOverlay(this.metrolayer, `<img style="display:inline;height:28px;width:24px;" src="metro.png"> Metro`);
        globalThis.layerControl.addOverlay(this.colegioLayer, `<img style="display:inline;height:28px;width:24px;" src="colegios.png"> Colegios`);


        this.$store.columnas_actuales.on('ready', () => {
            this.fetchPublicaciones()

        });

    },
    fetchPublicaciones() {
        Alpine.store('negocios').next_page_url = 'https://lacasadejuana.cl/api/publicaciones'
        Alpine.store('negocios').complete = false
        return this.$store.negocios.restart().then(async (result) => {
            setTimeout(() => this.$store.negocios.total = this.$store.negocios.properties.length, 1000);
            console.info('fetched negocios', this.$store.negocios.properties.length);

            /*for (let { type, slug_name, name, criteria, layer_options } of exampleLayers) {
                this[slug_name] = await PublicLayerDeals({ slug_name, name, criteria, layer_options }, this.map)
                globalThis.layerControl.addOverlay(this[slug_name], name);
            };*/

        })
    },

}) as AlpineDataComponent<iLeafletMap>;