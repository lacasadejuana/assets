const custom_element_map = document.querySelector("#custom_element_map");

setTimeout(() => {
    customElements.whenDefined(custom_element_map.localName).then(async (mapElement) => {
        //let {map,shadowRoot}=mapElement 
        console.warn(mapElement)
        console.info('custom_element_map', mapElement)
        //Alpine.initTree(map)

    });
}, 400)
const advancedMarkerr = document.querySelector("#custom_element_map gmp-advanced-marker");


customElements.whenDefined(advancedMarker.localName)
    .then(async () => {
        Alpine.store('public_maps').customElementsMap = advancedMarker.map;
        advancedMarker.map.setOptions({ streetViewControl: false, mapTypeControl: false })
        console.timerInfo('got reference to custom element map')
        //Alpine.initTree(advancedMap)

        advancedMarker.addEventListener('gmp-click', async () => {
            console.info('gmp-click')
            const { InfoWindow } = await google.maps.importLibrary("maps");
            const infoWindow = new InfoWindow({
                content: advancedMarker.title
            });
            infoWindow.open({
                anchor: advancedMarker
            });
        });
    });

console.timerInfo('DOMContentLoaded')