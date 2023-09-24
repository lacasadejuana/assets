import Alpine from 'alpinejs';
import { Modal } from 'bootstrap';
import { loadGoogle } from '../map_modules/google_loader';
export function modalLogicFn() {
    const modalElement = document.querySelector('#direccionModal');
    const $Modal = $(modalElement);
    $Modal.on('click', '#button-cta', () => {
        const $theForm = Alpine.store('theform');
        let address = $Modal.find('#address').val(), locality = $Modal.find('#locality').val(), neighborhood = $Modal.find('#barrio').val(), lat = $Modal.find('#coord_lat').val(), lng = $Modal.find('#coord_lng').val(), region = $Modal.find('#administrative_area_level_1').val();
        if (lat) {
            $('input[name="propiedad_attr-lat"]').val(lat).trigger('change');
            $theForm.set('propiedad_attr-lat', lat);
        }
        if (lng) {
            $('input[name="propiedad_attr-lng"]').val(lng).trigger('change');
            $theForm.set('propiedad_attr-lng', lng);
        }
        if (address) {
            $('input[name="direccion"]').val(address).trigger('change');
            $theForm.set('direccion', address);
            $('input[name="propiedad_attr-direccion"]').val(address).trigger('change');
            $theForm.set('propiedad_attr-direccion', address);
            $('input[name="propiedad-direccion"]').val(address).trigger('change');
            $theForm.set('propiedad-direccion', address);
        }
        if (locality) {
            $('select[name="comuna"]').val(locality).trigger('change.select2');
            $theForm.set("comuna", locality);
            $('select[name="propiedad_attr-comuna"]').val(locality).trigger('change.select2');
            $theForm.set("propiedad_attr-comuna", locality);
            $('select[name="propiedad-comuna"]').val(locality).trigger('change.select2');
            $theForm.set("propiedad-comuna", locality);
        }
        if (neighborhood) {
            $('select[name="propiedad_attr-barrio"]').val(neighborhood).trigger('change.select2');
            $theForm.set("propiedad_attr-barrio", neighborhood);
        }
        let frm = document.querySelector('#form-11');
        if (frm && $theForm.save_property)
            $theForm.save_property(frm);
        $Modal.modal('hide');
    });
    $('input[name="propiedad_attr-direccion"],input[name="propiedad-direccion"]').on('click', () => {
        if (!$Modal.data('modal')) {
            $Modal.data('modal', new Modal($Modal[0], { backdrop: true }));
        }
        $Modal.data('modal').show();
    });
    if (modalElement) {
        modalElement.getMap = async () => {
            if (!globalThis.gmap) {
                const mapElement = document.querySelector('#map');
                let mapOptions = {};
                const $theForm = Alpine.store('theform');
                let lat = $theForm.get('propiedad-lat'), lng = $theForm.get('propiedad-lng');
                if (lat && lng) {
                    mapOptions.center = { lat: Number(lat), lng: Number(lng) };
                }
                globalThis.gmap = await globalThis.createMap(mapElement, mapOptions);
                mapElement.classList.remove('hidden');
                mapElement.classList.add('min-h-30rem');
            }
            return globalThis.gmap;
        };
    }
    $Modal.one('shown.bs.modal', async (e) => {
        const $theForm = Alpine.store('theform');
        let { apiKey, version, region, language, libraries } = globalThis.googleMapsOptions;
        const google = await loadGoogle({ apiKey, version, region, language, libraries });
        $Modal.find('#open_map').on('click', async () => {
            return $Modal[0].getMap();
        });
        setTimeout(() => {
            if (globalThis.autocomplete)
                return;
            $theForm.createAutoCompleter(document.getElementById('address'));
        }, 2000);
    });
}
//# sourceMappingURL=modalLogicFn.js.map