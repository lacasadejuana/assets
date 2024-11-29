import * as L from 'leaflet/dist/leaflet-src.esm'
const colegioInfo = L.control();

colegioInfo.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
colegioInfo.update = function (props) {
    this._div.innerHTML = props ? ('<b>Colegio ' + props.Nombre + '</b>') : '';
};
export const colegioIcon = L.icon({
    iconUrl: 'colegios.png',
    iconSize: [26, 26], // size of the icon
    iconAnchor: [13, 26], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
export { colegioInfo }
var colegiogeojson;
function resetcolegioHighlight(e) {
    colegiogeojson.resetStyle(e.target);
    colegioInfo.update();

}
function highlightcolegioFeature(e) {
    var layer = e.target;
    colegioInfo.update(layer.feature.properties);
}


export async function colegioLayer(map: L.Map) {
    colegioInfo.addTo(map);
    return fetch('../json/capa_colegios.geojson').then(res => res.json()).then(data => {
        colegiogeojson = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                if (layer instanceof L.Marker) {
                    layer.setIcon(colegioIcon)
                }
                layer.on({
                    mouseover: highlightcolegioFeature,
                    mouseout: resetcolegioHighlight,
                })
            }
        }).addTo(map);
        return colegiogeojson
    });
}