export function getBarrioForPoint(map, lat, lng, barriosLayer) {

    fetch(`https://workers.lacasadejuana.cl/geo/coords/${lng}/${lat}`)
        .then((res) => res.json())
        .then(async (feature) => {
            if (!feature) {
                console.warn('unknown barrio');
                return;
            }
            let { type, properties, geometry } = feature, { idBarrio } = properties || { idBarrio: 0 };
            if (idBarrio) {
                let barrio = barriosLayer.getFeatureById(idBarrio);
                console.log({ idBarrio, barrio });
                if (barrio) {
                    barrio.setProperty('matches', true);
                    barrio.setProperty('strokeWeight', 3.5);
                    //barrio.setProperty("Transparencia", 5);
                }
            }
            globalThis.marker = new google.maps.Marker({
                map: map,
                draggable: false,
                position: map.getCenter(),
                animation: google.maps.Animation.BOUNCE,
            });

            setTimeout(
                () => globalThis.marker.setOptions({ animation: null }),
                2000
            );
        });

}
