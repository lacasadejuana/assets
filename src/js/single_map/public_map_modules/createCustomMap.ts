import { loadGoogle } from './google_loader';
import { initMap } from './map_create';


export const createMap = async (element: HTMLElement, options: google.maps.MapOptions, otherOptions = { appendToGlobalThis: true, loadBarrios: true }) => {
    let { apiKey, version, region, language, libraries } = globalThis.googleMapsOptions;
    const google = await loadGoogle({ apiKey, version, region, language, libraries });
    return initMap(google, element, options, otherOptions);
};

export const createCustomMap = async (element: HTMLElement, options: google.maps.MapOptions, otherOptions = { appendToGlobalThis: true, loadBarrios: true }) => {
    let { apiKey, version, region, language, libraries } = globalThis.googleMapsOptions;
    const google = await loadGoogle({ apiKey, version, region, language, libraries, ...options });
    return initMap(google, element, options, otherOptions);
};

export const fromargisToArray = (arcgis) => {
    if (arcgis && typeof arcgis === 'string') {
        let [west, south, east, north] = arcgis.split(',').map(parseFloat);
        globalThis.gmap.fitBounds({ west, south, east, north });
    }
};
