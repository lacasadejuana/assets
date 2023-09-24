import slugify from 'slugify';
import { instanceAutoCompleter } from '../map_modules/instanceAutoCompleter';
async function updateComunas(region_id) {
    if (region_id) {
        return $.ajax({
            url: '/getComunasByRegion',
            type: "GET",
            data: {
                region: region_id
            },
            dataType: "json",
            success: function (data) {
                $('#comuna').empty();
                $('#comuna').append('<option value="">Seleccione</option>');
                $.each(data, function (key, value) {
                    $('#comuna')
                        .append('<option value="' +
                        value
                            .nombre_comuna +
                        '">' +
                        value
                            .nombre_comuna +
                        '</option>');
                });
            }
        });
    }
    else {
        return Promise.resolve().then(() => $('#comuna').empty());
    }
}
function getComunaSlugs(comunaElement) {
    globalThis.comunas = Array.from((comunaElement || document.querySelector('#comuna')).querySelectorAll('option')).map(option => {
        return { value: option.value, label: option.textContent, slug: slugify(option.value).toLowerCase() };
    });
    return globalThis.comunas;
}
function getRegionesSlugs(regionElement) {
    globalThis.regiones = Array.from((regionElement || document.querySelector('#region')).querySelectorAll('option')).map(option => {
        return { value: option.value, label: option.textContent, slug: slugify(option.value).toLowerCase() };
    });
    return globalThis.regiones;
}
globalThis.getComunaByName = (comuna) => {
    return getComunaSlugs().find(c => {
        return c.slug.includes(comuna);
    });
};
export function geoLocationHandlers(jQuery) {
    const addressElement = document.querySelector('#propiedad_direccion');
    const comunaElement = document.querySelector('[name="propiedad_comuna"]');
    const regionElement = document.querySelector('[name="region"]');
    jQuery(function () {
        $('#comuna').on('change', function () {
            var comuna_id = $(this).val();
            if (!comuna_id) {
                return Promise.resolve().then(() => $('#barrio').empty());
            }
            return $.ajax({
                url: '/getBarriosByComuna',
                type: "GET",
                data: {
                    comuna: comuna_id
                },
                dataType: "json",
                success: function (data) {
                    $('#barrio').empty();
                    $('#barrio').append('<option value="">Seleccione</option>');
                    $.each(data, function (key, value) {
                        $('#barrio').append('<option value="' + value.name + '">' + value.name + '</option>');
                    });
                }
            });
        });
        // get comunas when region is selected
        $('#region').on('change', function () {
            var region_id = $(this).val();
            updateComunas(region_id);
        });
    });
    if (addressElement) {
        instanceAutoCompleter(addressElement, ({ lat, lng, direccion, comuna, region, administrative_area_level_1 }) => {
            document.querySelector('[name="propiedad_lat"]').value = String(lat);
            document.querySelector('[name="propiedad_lng"]').value = String(lng);
            addressElement.value = direccion;
            let regionValue = getRegionesSlugs(regionElement).find(c => slugify(c.value).toLowerCase().includes(slugify(region).toLowerCase()));
            let comunaSlug = slugify(comuna).toLowerCase();
            console.log({ lat, lng, direccion, comunaSlug, region, regionValue });
            if (!regionValue)
                return;
            regionElement.value = regionValue.value;
            $(regionElement).trigger('change.select2');
            updateComunas(regionValue.value).then(() => {
                setTimeout(() => {
                    let comunaValue = globalThis.getComunaByName(comunaSlug);
                    if (comunaValue)
                        comunaElement.value = comunaValue.value;
                    comunaElement.dispatchEvent(new Event('change'));
                    $(comunaElement).trigger('change.select2');
                }, 1000);
            });
        });
        addressElement.addEventListener('keydown', (e) => {
            if (e.key == 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    }
}
//# sourceMappingURL=geoLocationHandlers.js.map