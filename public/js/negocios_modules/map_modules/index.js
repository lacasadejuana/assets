import { createMapFrameData } from './createMapFrameData';
import { loadGoogle } from './google_loader';
import { initMap, loadBarrios } from './map_create';
import { mapLayerData } from './map_layer_deals';
import { geoJsonLayerData } from './map_layer_geojson';
import { heatMapLayerData } from './map_layer_heatmap';
import { kmzLayer } from './map_layer_kmz';
import { saveMapButton } from './save_map_button';
import { saveMapTooltip } from './save_map_tooltip';
export { createMapFrameData };
export * from './cloneControlsButton';
export * from './createCenterControl';
export * from './extendMapDataProtoType';
export * from './negocioFeatureToHtml';
export * from './map_address_autocompleter';
export * from './map_create';
export * from './map_dialog';
export * from './map_geocoder';
export * from './map_layer_deals';
export * from './map_layer_geojson';
export * from './map_layer_heatmap';
export * from './marker_factory/createMarkeIcon';
export * from './instanceAutoCompleter';
export * from './Wrapper';
export { loadBarrios };
export const createMap = async (element, options, otherOptions = { appendToGlobalThis: true, loadBarrios: true }) => {
    let { apiKey, version, region, language, libraries } = globalThis.googleMapsOptions;
    const google = await loadGoogle({ apiKey, version, region, language, libraries });
    return initMap(google, element, options, otherOptions);
};
export const createCustomMap = async (element, options, otherOptions = { appendToGlobalThis: true, loadBarrios: true }) => {
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
export const mapComponents = {
    mapLayerData,
    geoJsonLayerData,
    heatMapLayerData,
    kmzLayer,
    saveMapButton,
    saveMapTooltip,
    createMapFrameData
};
export * from './sharingLevels';
export * from './exampleLayers';
//# sourceMappingURL=index.js.map