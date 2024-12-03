
import { IMapLayerData } from '@/components/alpine_definitions';
import { AlpineDataComponent } from '@/components/alpine.store';
import { Negocio } from "@/components/entities/Negocio";

import { negocioFeatureToHtml } from "./negocioFeatureToHtml";
import * as L from 'leaflet/dist/leaflet-src.esm'
import { negocioFeatureToHtmlMini } from './negocioFeatureToHtmlMini';


export const PublicLayerDeals = ({ index, slug_name, name, path, layer_options, criteria }, map: L.Map) => ({


    //   features,
    layer_options,
    path,
    name,
    slug_name,
    filters_open: false,
    _map: null,
    index,
    criteria,
    get searchValue() {
        return this.$store.negocios.searchValue
    },

    iconPreview: '',

    async init() {




        console.log('PublicLayerDeals', { slug_name, map })

        globalThis.layerComponents = globalThis.layerComponents || {}
        globalThis.layerComponents[this.slug_name] = this

        this.dealInfo = L.control();
        this.dealInfo.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'transparent'); // create a div with a class "info"
            this.update();
            return this._div;
        };
        // method that we will use to update the control based on feature properties passed
        this.dealInfo.update = function (props) {
            this._div.innerHTML = props ? ('<div class="info"><b>' + props['seudonimo-propiedad'] + '</b></div>') : '';
        };
        this.dealInfo.addTo(this.map);

        await this.$store.negocios.once('complete')
        this.geojson = this.addLayerToMap()



    },
    clearOverlay() {
        this.geojson.clearLayers()
        globalThis.layerControl.removeLayer(this.geojson)
    },

    resetHighlight(e) {
        this.dealInfo.update();
    },
    highlightFeature(e) {
        var layer = e.target;
        this.dealInfo.update(layer.feature.properties);
    },
    get icon() {
        return L.icon({
            iconUrl: `${this.slug_name}.png`,
            iconSize: [28, 32], // size of the icon
            iconAnchor: [14, 32], // point of the icon which will correspond to marker's location
            popupAnchor: [-3, -32] // point from which the popup should open relative to the iconAnchor 
        })
    },

    get dealsWithCoords() {
        return globalThis.$store.negocios.deals_with_coordinates;
    },


    geojson: null,

    addLayerToMap() {



        this.FeatureCollection = {
            type: "FeatureCollection",
            features: []
        }
        this.appendFeatures(globalThis.$store.negocios.deals_with_coordinates)
        this.geojson = L.geoJson(this.FeatureCollection, {
            onEachFeature: (feature, layer) => {
                layer.bindPopup((new negocioFeatureToHtmlMini(feature, {})).content, {
                    maxWidth: 400
                })
                layer.on({
                    mouseover: (e) => this.highlightFeature(e),
                    mouseout: (e) => this.resetHighlight(e),
                });
                if (layer instanceof L.Marker) {
                    layer.setIcon(this.icon)
                }

            }
        })
        this.geojson.addTo(map);
        globalThis.layerControl.addOverlay(this.geojson, `<img style="display:inline;height:28px;width:24px;" src="${this.slug_name}.png"> ${this.name}`);

        return this.geojson;
    },




    mapDialogOpen: false,

    appendFeatures(dealsWithCoords: Negocio[]) {

        this.features = (dealsWithCoords || this.dealsWithCoords)
            .filter((negocio) => negocio.match(this.criteria))
            .map((n) => n.toFeature());
        for (let feature of this.features) {
            this.FeatureCollection.features.push(feature)
        }


    },



} as unknown as AlpineDataComponent<IMapLayerData>)

