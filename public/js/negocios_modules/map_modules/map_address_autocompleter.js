/// <reference types="google.maps" />
export function createAutoCompleter({ autocompleteInput, autocompleteOptions, onPlaceChanged, singleInstance = true, }) {
    autocompleteOptions = {
        bounds: {
            "south": -33.44976262855116,
            "west": -70.67030870283203,
            "north": -33.37338798180063,
            "east": -70.48010789716797
        },
        //fields: ['formatted_address', 'geometry', 'place_id'],
        fields: ["address_components", "geometry", "name", "formatted_address"],
        componentRestrictions: {
            country: "cl",
        },
        types: ['address'],
        ...autocompleteOptions
        //types: ['address', 'street_address']*/
    };
    console.info({ autocompleteOptions });
    if (!globalThis.autocomplete || !singleInstance) {
        try {
            let autocomplete = new google.maps.places.Autocomplete(autocompleteInput, autocompleteOptions);
            globalThis.autocomplete = autocomplete;
            google.maps.event.addListener(globalThis.autocomplete, 'place_changed', function () {
                const place = globalThis.autocomplete.getPlace(), { address_components, geometry } = place;
                if (!geometry || !geometry.location) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No existe información georreferenciada para: '" + place.name + "'");
                    return;
                }
                console.log({ place });
                if (onPlaceChanged)
                    onPlaceChanged(place);
            });
            return { autocomplete };
        }
        catch (e) {
            console.warn(e);
            return;
        }
    }
}
//# sourceMappingURL=map_address_autocompleter.js.map