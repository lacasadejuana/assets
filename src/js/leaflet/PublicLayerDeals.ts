import { FeatureCollection } from 'geojson';
import { IMapLayerData } from '@/components/alpine_definitions';
import { AlpineDataComponent } from '@/components/alpine.store';
import { Negocio } from "@/components/entities/Negocio";

import { negocioFeatureToHtml } from "./negocioFeatureToHtml";
import * as L from 'leaflet/dist/leaflet-src.esm'


export async function PublicLayerDeals({ index, slug_name, name, path, layer_options, criteria }, map: L.Map) {

    const dealInfo = L.control();

    dealInfo.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'transparent'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    dealInfo.update = function (props) {
        this._div.innerHTML = props ? ('<div class="info"><b>' + props['seudonimo-propiedad'] + '</b></div>') : '';
    };

    const FeatureCollection = {
        type: "FeatureCollection",
        features: []
    }
    var deallayer;
    const icon = L.icon({
        iconUrl: `${slug_name}.png`,
        iconSize: [28, 32], // size of the icon
        iconAnchor: [14, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -32] // point from which the popup should open relative to the iconAnchor 
    })
    function appendFeatures(dealsWithCoords: Negocio[]) {

        let features = (dealsWithCoords)
            .filter((negocio) => negocio.match(criteria))
            .map((n) => n.toFeature());
        for (let feature of features) {
            FeatureCollection.features.push(feature)
        }


    }
    function resetHighlight(e) {

        dealInfo.update();

    }
    function highlightFeature(e) {
        var layer = e.target;


        dealInfo.update(layer.feature.properties);

    }
    dealInfo.addTo(map);
    function addLayerToMap({ slug_name }) {

        appendFeatures(globalThis.$store.negocios.deals_with_coordinates)
        deallayer = L.geoJson(FeatureCollection, {
            onEachFeature: (feature, layer) => {
                layer.bindPopup((new negocioFeatureToHtml(feature, {})).content, {
                    maxWidth: 400
                })
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                });
                if (layer instanceof L.Marker) {
                    layer.setIcon(icon)
                }

            }
        })
        deallayer.addTo(map);
        return deallayer
    }

    globalThis.layers = globalThis.layers || {};



    console.log('addLayerToMap', { slug_name })
    return addLayerToMap({ slug_name })





} 