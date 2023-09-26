import { ISingleFileInput, XDataForm } from "@lacasadejuana/types";
import { loadGoogle } from '../../negocios_modules/map_modules/google_loader';
import { createAutoCompleter } from '../../negocios_modules/map_modules/map_address_autocompleter';
import { fillInAddress } from '../../negocios_modules/map_modules/map_geocoder';

const createTheFormStore = (): XDataForm => {
    return {
        className: 'TheFormStore',
        ready: false,
        init() {
            //console.log('init theForm');
            globalThis.$auxStore.theform = this;
            setTimeout(() => {
                //@ts-ignore
                this.ready = true;
            }, 1000)
        },
        properties: globalThis.theForm,
        get commentFields() {
            return Object.fromEntries(Object.entries(this.properties).filter(([key, value]) => key.endsWith('comment'))
                .sort((a, b) => {
                    return a[0].localeCompare(b[0]);
                }));
        },
        isEqual(name, value) {
            return this.properties[name] == value;
        },
        get(name) {
            return this.properties[name];
        },
        set(name, value) {
            this.properties[name] = value;
            //console.log({ [name]: value, properties: this.properties })
            return this;
        },
        push(name, value) {
            let current = this.get(name);
            if (!current) current = [];
            if (Array.isArray(current)) {
                current.push(value);
            }
            this.set(name, current);
        },
        pushFile(name, value) {
            let fileList = this.get(name) || { 0: {} },
                maxEntry = Math.max(0, ...Object.keys(fileList).map(Number)),
                nextEntry = maxEntry + 1;


            fileList[nextEntry] = {
                id: nextEntry,
                key: `${value.slug_name}.${nextEntry}`,
                ...value,
                index: nextEntry,
            };
            this.set(name, fileList);
        },
        pruneFilesBy(name, property = 'fileName') {
            let current = this.get(name) || { 0: {} }
            const newEntries = Object.entries(current).filter(([key, value]) => value && value[property])
                .reduce((accum, [key, value]) => {
                    accum[value.id] = value;
                    return accum;
                }, {})
            this.set(name, Object.fromEntries(Object.entries(current).filter(([key, value]) => value && value[property])));
        },
        getFileById(name, id): ISingleFileInput {
            let current = this.get(name) || { 0: {} }
            //@ts-ignore
            return Object.values(current).find(file => file.id == id) as ISingleFileInput
        },
        deleteFileById(name, id) {
            let current = this.get(name) || { 0: {} }
            console.log('deleteFileById', id, current)
            //@ts-ignore
            this.set(name, Object.fromEntries(Object.entries(current).filter(([key, value]) => value.id != id)));
        },
        uploadedFiles(name) {
            let current = this.get(name) || { 0: {} }
            //@ts-ignore
            return Object.fromEntries(Object.entries(current).filter(([key, value]) => value && value.fileName))
        },
        pendingFiles(name) {
            let current = this.get(name) || { 0: {} }
            //@ts-ignore
            return Object.fromEntries(Object.entries(current).filter(([key, value]) => value && !value.fileName))
        },
        updateFile(name, id, properties) {
            let fileList = this.get(name) || { 0: {} },
                file = fileList[id]
            if (file) {
                file = {
                    ...file,
                    ...properties
                }
                console.log(`Setting ${file.key} to `, file)
                fileList[id] = file
            } else {
                console.log(`No file found at ${name}.${id}`)
            }
            this.set(name, fileList);

        },
        updateFromPlace(place: google.maps.places.PlaceResult): void {
            let location = place.geometry.location.toJSON();
            if (globalThis.gmap) {
                globalThis.marker = new google.maps.Marker({
                    map: globalThis.gmap,
                    draggable: false,
                    position: location,
                    animation: google.maps.Animation.BOUNCE,
                });
            }
            const reducedComponents = { ...this.updateAddressComponents(place.address_components), ...fillInAddress(place), location: { lat: Number(Number(location.lat).toFixed(6)), lng: Number(Number(location.lng).toFixed(6)) } };

            console.log(reducedComponents);
            this.updateFromLatLng(reducedComponents.location);
        },
        updateAddressComponents(address_components: google.maps.GeocoderAddressComponent[]): Record<string, unknown> {

            const reducedComponents = Object.entries(address_components.reduce((accum, entry) => {
                let key = entry.types[0], storeKey = `propiedad_attr-${key}`;

                if (key === 'administrative_area_level_1') {
                    this.set(`propiedad-attr-region`, entry.short_name);
                    storeKey = `propiedad-attr-region`;
                } else if (key == 'locality' || key === 'administrative_area_level_3') {
                    this.set(`propiedad-comuna`, entry.short_name);
                    storeKey = `propiedad-comuna`;
                } else if (key == 'address') {
                    this.set(`propiedad-direccion`, entry.short_name);
                    storeKey = `propiedad-direccion`;
                } else {
                    storeKey = `propiedad_attr-${key}`;
                }
                this.set(storeKey, entry.short_name);
                accum[storeKey] = entry.short_name;
                return accum;
            }, {}));

            reducedComponents.forEach(([key, value]) => {
                this.set(key, value);
            });
            return Object.fromEntries(reducedComponents);

        },

        async updateFromLatLng(location: google.maps.LatLngLiteral): Promise<void> {
            let currentValue = String($('select[name="comuna"]').val());
            this.set('negocio_attr-coordenadas-mapa', JSON.stringify(location));
            this.set('propiedad-lat', location.lat);
            this.set('propiedad-lng', location.lng);

            let newComuna = this.get('propiedad-comuna');
            if (currentValue && newComuna && newComuna != currentValue) {
                $('select[name="propiedad_attr-barrio"]').val('').trigger('change.select2');
            }
            const barrioFeature = await fetch(`https://workers.lacasadejuana.cl/geo/coords/${location.lng}/${location.lat}`)
                .then(res => res.json()) as { properties?: { Nombre_de_Barrio?: string; codigo?: string; }; }, { Nombre_de_Barrio, codigo } = (barrioFeature || {}).properties || {};
            if (Nombre_de_Barrio) {
                $('#barrio').val(Nombre_de_Barrio).parent().removeClass('empty_neighborhood');
                this.set('propiedad_attr-barrio', Nombre_de_Barrio);
            }


        },
        async createAutoCompleter(autocompleteInput: HTMLInputElement) {

            let { apiKey, version, region, language, libraries } = globalThis.googleMapsOptions;


            const google = await loadGoogle({ apiKey, version, region, language, libraries });
            let { autocomplete } = createAutoCompleter({
                onPlaceChanged: (place: google.maps.places.PlaceResult) => {
                    console.info('PLACE CHANGED');
                    this.updateFromPlace(place);

                    let { geometry } = place;
                    if (geometry.location) {
                        if (globalThis.map && globalThis.map instanceof google.maps.Map)
                            globalThis.map.setCenter(geometry.location);

                        if (globalThis.marker) {
                            globalThis.marker.setPosition(geometry.location);
                        }
                    }

                },
                singleInstance: true,
                autocompleteInput
            });
            const empty_neighborhood = document.querySelector('.empty_neighborhood');
            if (this.get('propiedad_attr-barrio') && empty_neighborhood) {
                empty_neighborhood.classList.remove('empty_neighborhood');
            }

        },
        populateFields() {
            let {
                //@ts-ignore
                "propiedad-lat": lat,
                //@ts-ignore
                "propiedad-lng": lng,
                //@ts-ignore
                "propiedad_attr-atributo-barrio": barrio,
                //@ts-ignore
                "propiedad_attr-region": region,
                //@ts-ignore
                "propiedad_attr-coordenadas-mapa": coordenadas,
                //@ts-ignore
                "propiedad-comuna": comuna,
                //@ts-ignore
                "propiedad-direccion": direccion

            } = this.properties;
            barrio = barrio || this.get('propiedad_attr-barrio');
            lng = lng || this.get('propiedad_attr-lng');
            lat = lat || this.get('propiedad_attr-lat');
            comuna = comuna || this.get('propiedad_attr-comuna');
            this.set('propiedad-lat', lat);
            this.set('propiedad-lng', lng);
            this.set('propiedad_attr-barrio', barrio);
            this.set('propiedad_comuna', comuna);
            coordenadas = coordenadas || { lat, lng };
            return { direccion, region, comuna, barrio, coordenadas, lat, lng };
        },

        populatePropertyForm(formData: FormData, include_empty = false): FormData {
            return Object.entries(this.properties).filter(([key, value]) => {
                return key.startsWith('propiedad') && (value || include_empty === true);
            }).reduce((accum, [key, value]) => {
                if (key.includes('coordinates')) {
                    value = JSON.parse(String(value));
                }
                accum.append(key, String(value));
                return accum;
            }, formData || new FormData());
        },
        save_property(frm: HTMLFormElement) {

            const propfields = this.populatePropertyForm(
                //@ts-ignore
                new FormData(frm as HTMLFormElement), false);
            //@ts-ignore
            return fetch(frm.action, {
                method: 'post',
                headers: { 'accept': 'application/json' },
                body: propfields
            }).then(res => res.json());
        }
    };
}
export default createTheFormStore;
export { createTheFormStore };
