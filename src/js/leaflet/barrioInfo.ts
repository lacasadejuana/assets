import * as L from 'leaflet/dist/leaflet-src.esm'


const barrioInfo = L.control();

barrioInfo.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'transparent'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
barrioInfo.update = function (props) {
    this._div.innerHTML = props ? ('<div class="info"><b>Barrio ' + props.Nombre_de_Barrio + '</b></div>') : '';
};
export { barrioInfo }



export async function barriosLayer(map: L.Map) {
    var geojson;
    function style(feature) {
        return {
            fillColor: feature.properties.fillColor,
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.2
        };
    }
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        barrioInfo.update();

    }
    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.3
        });

        layer.bringToFront();
        barrioInfo.update(layer.feature.properties);

    }
    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
    barrioInfo.addTo(map);
    return fetch('../json/barrios_old.json').then(res => res.json()).then(data => {
        globalThis.barrios = data;
        geojson = L.geoJson(data, { style: style, onEachFeature: onEachFeature })
        geojson.addTo(map);
        return geojson
    });

}