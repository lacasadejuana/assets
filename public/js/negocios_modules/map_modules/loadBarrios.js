/// <reference types="google.maps" />
export function loadBarrios(map, layerurl) {
    if (globalThis.barriosLayer)
        return globalThis.barriosLayer;
    function getIcon({ x = 0, y = 0 } = {}) {
        return {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            strokeWeight: 2,
            labelOrigin: { x, y },
            strokeColor: 'rgba(200,200,200,0)',
        };
    }
    function getLabel(text = '') {
        return {
            text,
            color: '#444',
            fontSize: '11px',
            className: 'markerLabel',
        };
    }
    let barriosMarker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        icon: getIcon(),
    });
    barriosMarker.setLabel(getLabel());
    barriosMarker.setVisible(false);
    const barriosLayer = new google.maps.Data();
    //@ts-ignore
    barriosLayer.loadGeoJson(layerurl);
    console.log(layerurl);
    //@ts-ignore
    globalThis.barriosLayer = barriosLayer;
    globalThis.negociosLayer = new google.maps.Data();
    google.maps.event.addListener(barriosLayer, 'mouseover', (event) => {
        const { feature } = event;
        feature.setProperty('highlighted', true);
        let barrio = feature.getProperty('Nombre_de_Barrio');
        barriosMarker.setLabel(getLabel(barrio));
        barriosMarker.setPosition(feature.getCenter());
        barriosMarker.setVisible(true);
    });
    google.maps.event.addListener(barriosLayer, 'mouseout', (event) => {
        event.feature.setProperty('highlighted', false);
    });
    return barriosLayer;
}
//# sourceMappingURL=loadBarrios.js.map