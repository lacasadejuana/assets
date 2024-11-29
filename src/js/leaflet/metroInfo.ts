import * as L from 'leaflet/dist/leaflet-src.esm'
const metroInfo = L.control();

metroInfo.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
metroInfo.update = function (props) {
    this._div.innerHTML = props ? ('<b>Metro ' + props.Nombre + '</b><br><b>Linea: </b>' + props.Línea) : '';
};
export const metroIcon = L.icon({
    iconUrl: 'metro.png',
    iconSize: [26, 26], // size of the icon
    iconAnchor: [13, 26], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
export { metroInfo }
var metrogeojson;
function resetMetroHighlight(e) {
    metrogeojson.resetStyle(e.target);
    metroInfo.update();

}
function highlightMetroFeature(e) {
    var layer = e.target;
    metroInfo.update(layer.feature.properties);
}


export async function metroLayer(map: L.Map) {
    metroInfo.addTo(map);
    return fetch('../json/capa_metro.geojson').then(res => res.json()).then(data => {
        metrogeojson = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                if (layer instanceof L.Marker) {
                    layer.setIcon(metroIcon)
                }
                layer.on({
                    mouseover: highlightMetroFeature,
                    mouseout: resetMetroHighlight,
                })
            }
        }).addTo(map);
        return metrogeojson
    });
}