import { getBarrioForPoint } from './getBarrioForPoint';
import { loadBarrios } from './loadBarrios';
export { loadBarrios };
type TcomunaEntry = {
    nombreComuna: string;
    codigo: string;
    slug?: string;
};

/*let comunaEntry = comunas.find(c => {
    return slugify(c.nombreComuna) === slugify(Comuna) ||
        String(c.nombreComuna).toUpperCase().trim() === String(Comuna).toUpperCase().trim()
})*/

const comunas = [
    'Lo Barnechea',
    'Las Condes',
    'La Reina',
    'Ñuñoa',
    'Providencia',
    'Vitacura',
    'Santiago',
];

export function initMap(
    google,
    element: Element,
    mapOptions: Partial<google.maps.MapOptions>,
    options,
): google.maps.Map {
    if (globalThis.gmap) return globalThis.gmap;
    //console.trace('initMap', google, element, mapOptions);
    google.maps.Data.Feature.prototype.getCenter = function () {
        return this.getBounds().getCenter();
    };

    google.maps.Data.prototype.getBounds = function () {
        var featuresArray = [];
        var bounds = new google.maps.LatLngBounds();
        this.forEach(function (feature) {
            bounds.union(feature.getBounds());

            /*feature.getGeometry().forEachLatLng(function (latLng) {
                bounds.extend(latLng);
              });*/
        });
        return bounds;
    };

    google.maps.Data.Feature.prototype.getBounds = function () {
        const bounds = new google.maps.LatLngBounds();
        this.getGeometry().forEachLatLng(function (latLng) {
            bounds.extend(latLng);
        });
        return bounds;
    };

    /**
     * Extiende la familia google.maps.Data.Geometry
     */
    google.maps.Data.Geometry.prototype.getBounds = function () {
        const bounds = new google.maps.LatLngBounds();
        this.forEachLatLng(function (latLng) {
            bounds.extend(latLng);
        });
        return bounds;
    };
    let { lat, lng } = mapOptions.center || {};
    mapOptions = {
        zoom: 15,
        bounds: {},
        center: {
            lat: -33.41,
            lng: -70.575,
        },
        mapTypeControl: true,
        fullscreenControl: true,
        gestureHandling: 'greedy',
        scaleControl: true,
        zoomControl: true,
        streetViewControl: true,
        ...mapOptions,
    } as google.maps.MapOptions;
    console.log({ mapOptions });

    const map: google.maps.Map & { isFractionalZoomEnabled: boolean } =
        new google.maps.Map(element, mapOptions);

    globalThis.overlay = new google.maps.OverlayView();
    globalThis.overlay.setMap(map);
    if (options.appendToGlobalThis) globalThis.gmap = map;
    if (options.loadBarrios) {
        const barriosLayer = loadBarrios(map, '/json/barrios.json');
        if (lat && lng) {
            getBarrioForPoint(map, lat, lng, barriosLayer);
        }

    }
    return map;
}
const fromargisToArray = (arcgis: string) => {
    let [west, south, east, north] = arcgis.split(',').map(parseFloat);
    return { south, west, north, east };
};

//"-70.5315,-33.4423,-70.5202,-33.4374"
/*globalThis.localContextMapView = new google.maps.localContext.LocalContextMapView({
      element: document.querySelector('#map2'),
      map,
      //placeTypePreferences: ['restaurant', 'bakery', 'supermarket', 'park'],
      placeTypePreferences: [
          { type: "bakery", weight: 1 },
          { type: "bank", weight: 1 },
          { type: "cafe", weight: 2 },
          { type: "department_store", weight: 1 },
          { type: "drugstore", weight: 1 },
          { type: "park", weight: 3 },
          { type: "restaurant", weight: 2 },
          { type: "primary_school", weight: 3 },
          { type: "secondary_school", weight: 3 },
          { type: "supermarket", weight: 2 },
      ],
      maxPlaceCount: 0, // Avoids an automatic call to load places during initialization.
  });
  console.log({
      mapOptions,
  });*/
