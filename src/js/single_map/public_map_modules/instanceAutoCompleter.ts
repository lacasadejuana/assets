import { loadGoogle } from './google_loader';
import { createAutoCompleter } from './map_address_autocompleter';

export type TreducedComponents = {
    street_number: string;
    route: string;
    comuna: string;
    administrative_area_level_1: string;
    administrative_area_level_2: string;
    region: string;
    country: string;
    postal_code: string;
    location: {
        lat: number | (() => number)
        lng: number | (() => number)
    };
    lat?: number,
    lng?: number,
    direccion: string,
    [s: string]: unknown
};
async function updateAddressComponents(
    place: google.maps.places.PlaceResult,
): Promise<TreducedComponents> {
    const address_components = place.address_components || [];
    let reducedComponents = Object.entries(
        address_components.reduce((accum, entry) => {
            let key = entry.types[0],
                storeKey = key;
            if (key === 'administrative_area_level_1') {
                //   this.set(`propiedad-attr-region`, entry.short_name);
                storeKey = `region`;
                accum[storeKey] = entry.short_name;
                accum['administrative_area_level_1'] = entry.long_name
                return accum;
            }

            if (key == 'locality' || key === 'administrative_area_level_3') {
                //  this.set(`propiedad-comuna`, entry.short_name);
                storeKey = `comuna`;
            } else if (key == 'address') {
                // this.set(`propiedad-direccion`, entry.short_name);
                storeKey = `direccion`;
            }
            // this.set(storeKey, entry.short_name);
            accum[storeKey] = entry.short_name;
            return accum;
        }, {}),
    );
    //@ts-ignore
    let objectComponents = Object.fromEntries(reducedComponents) as TreducedComponents;
    let location = (place.geometry || {}).location,
        coords = {} as { lat: number, lng: number }, lat, lng
    if (location instanceof google.maps.LatLng) {
        //@ts-ignore
        location = location.toJSON() as { lat: number, lng: number }

    }
    //@ts-ignore
    lat = location?.lat || location?.lat?.()
    //@ts-ignore
    lng = location?.lng || location?.lng?.()

    objectComponents = {
        ...objectComponents,
        lat, lng, location
    }
    const response = (await fetch(`https://workers.lacasadejuana.cl/geo/coords/${lng}/${lat}`))
    const feature = await response.json() as GeoJSON.Feature
    objectComponents.barrio = feature.properties?.barrio

    objectComponents.direccion =
        objectComponents.direccion ||
        `${objectComponents.route} ${objectComponents.street_number}`;
    return objectComponents;
}
export async function instanceAutoCompleter(
    autocompleteInput: HTMLInputElement,
    onPlaceChanged: (reducedComponents: TreducedComponents) => void,
    onInvalidResult?: (reducedComponents: TreducedComponents) => void,
    autocompleteOptions: google.maps.places.AutocompleteOptions = {},
): Promise<google.maps.places.Autocomplete> {
    const googleMapsOptions = {
        apiKey: 'AIzaSyAAnmNtArAHn42aA9BEyiuGDN2Y1J4lhV8',
        version: 'beta',
        region: 'CL',
        language: 'es',
        mapId: '8f541b0e0f5f6c31',
    };
    let { apiKey, version, region, language } = googleMapsOptions;

    globalThis.google = await loadGoogle({
        apiKey,
        version,
        region,
        language,
        libraries: ['places'],
    });
    window.google = globalThis.google;
    if (!autocompleteInput) {
        throw new Error('No autocomplete input');
    }
    let { autocomplete } = createAutoCompleter({
        singleInstance: false,
        autocompleteInput,
        autocompleteOptions,
        onPlaceChanged: async (place: google.maps.places.PlaceResult) => {
            let reducedComponents = await updateAddressComponents(place);
            reducedComponents.types = place.types;
            if (!place.types || !place.types.includes('street_address')) {
                console.zwarn('No es una dirección válida', {
                    types: place.types,
                });
                //if (onInvalidResult) onInvalidResult(reducedComponents)
            }
            onPlaceChanged(reducedComponents);
        }


    }) || { autocomplete: null };
    //enableEnterKey(autocompleteInput);
    return autocomplete
}
/*
    autocompleteInput.addEventListener('xkeydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            console.log('enter keydown')
            autocompleteInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown' }));

        }
    });
    */
//@ts-ignore
/*
HTMLInputElement.prototype._addEventListener = HTMLInputElement.prototype.addEventListener;
HTMLInputElement.prototype.addEventListener = function () {
    let args = [...arguments]
    let temp = args[1];
    args[1] = function () {
        let args2 = [...arguments];
        args2[0] = Object.assign({}, args2[0])
        args2[0].isTrusted = true;
        return temp(...args2);
    }
    //@ts-ignore
    return this._addEventListener(...args);
}
*/

export const enableEnterKey = (
    input: HTMLInputElement & { hasEnterKeyListener?: boolean },
) => {
    if (input.hasEnterKeyListener) {
        return;
    }
    /* Store original event listener */
    const _addEventListener = input.addEventListener;

    const addEventListenerWrapper = (type, listener) => {
        if (type === 'keydown') {
            /* Store existing listener function */
            const _listener = listener;
            listener = (event) => {
                /* Simulate a 'down arrow' keypress if no address has been selected */
                const suggestionSelected =
                    document.getElementsByClassName('pac-item-selected').length;
                if (event.key === 'Enter' && !suggestionSelected) {
                    event.preventDefault();
                    console.log({
                        suggestionSelected,
                        key: event.key,
                        code: event.code,
                    });
                    const e = JSON.parse(JSON.stringify(event));
                    e.key = 'ArrowDown';
                    e.code = 'ArrowDown';
                    console.log('enter keydown');
                    _listener.apply(input, [e]);
                    return false;
                }

                _listener.apply(input, [event]);
            };
        }
        _addEventListener.apply(input, [type, listener]);
    };

    input.addEventListener = addEventListenerWrapper;
    input.hasEnterKeyListener = true;
    return;
};
