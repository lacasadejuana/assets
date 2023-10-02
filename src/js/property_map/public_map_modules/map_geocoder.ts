/// <reference types="google.maps" />

export function fillInAddress(place: google.maps.places.PlaceResult): { calle: any; numeroCalleStr: any; } {

    // optional parameter
    const addressNameFormat = {
        street_number: "short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        country: "long_name",
        postal_code: "short_name",
    };
    const componentForm = [
        "address",
        "locality",
        "administrative_area_level_1",
        "country",
        "postal_code",
    ];
    const getAddressComp = function (type) {
        for (const component of place.address_components ?? []) {
            if (component.types[0] === type) {
                return component[addressNameFormat[type]];
            }
        }
        return "";
    };
    (document.getElementById("address") as HTMLInputElement).value = [
        getAddressComp("route"),
        getAddressComp("street_number"),
    ].join(" ");
    for (const component of componentForm) {
        // Location field is handled separately above as it has different logic.
        if (component !== "address") {
            (document.getElementById(component) as HTMLInputElement).value =
                getAddressComp(component);

        }
    }
    const calleYNumero = {

        calle: getAddressComp("route"),
        numeroCalleStr: getAddressComp("street_number"),
        address: ''
    }
    calleYNumero.address = [calleYNumero.calle + " " + calleYNumero.numeroCalleStr].join(' ')
    return componentForm.reduce((acc, key) => {
        acc[key] = acc[key] || getAddressComp(key);
        return acc
    }, calleYNumero)
}

export function createGeoCoder(map?: google.maps.Map, cb = fillInAddress) {
    const geocoder: google.maps.Geocoder = new google.maps.Geocoder();
    const geocode = (request: google.maps.GeocoderRequest) => {
        geocoder
            .geocode(request)
            .then(({ results }) => {
                if (!results)
                    return {};
                //results.forEach(result => console.log({ result }));
                let resultFirst = results[0];
                if (map) {
                    map.setCenter(resultFirst.geometry.location);
                    if (globalThis.marker) {
                        globalThis.marker.setPosition(resultFirst.geometry.location);
                        globalThis.marker.setMap(map);
                    }
                }
                //    console.log(resultFirst);
                fillInAddress(resultFirst);
                return resultFirst;
            })
            .catch((e) => {
                alert(
                    "Geocode was not successful for the following reason: " + e
                );
                return {};
            });
    };

    //@ts-ignore

    //geocode({ location: place.geometry.location });
    globalThis.geocoder = geocoder;
    globalThis.geocode = geocode;
    return { geocoder, geocode }
}




