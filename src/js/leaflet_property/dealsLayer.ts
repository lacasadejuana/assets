import * as L from 'leaflet/dist/leaflet-src.esm'
const metroInfo = L.control();

metroInfo.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
metroInfo.update = function (props) {
    this._div.innerHTML = props ? ('<b>' + props.Nombre + '</b><br><b>Linea: </b>' + props.Línea) : '';
};
export const metroIcon = L.icon({
    iconUrl: 'metro.png',
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
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

const ventaCasasFC = {
    "type": "FeatureCollection",
    "features": []
}


export async function dealsLayer(map: L.Map) {
    metroInfo.addTo(map);
    fetch('https://maps.lacasadejuana.cl/api/negocios?from=1732302822&total=0&limit=500').then(res => res.json()).then(data => {

    });
}