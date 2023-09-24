import { inferDireccionAndPropietario } from '../../../components/DttColumn';
import { VInputType } from '../../../components/alpine_definitions/definitions.input_types';
import { parseMySqlDate } from '../../../plugins/moment.bundle';
import { NumberHandler } from '../../decorators/NumberHandler';
const integerHandler = new NumberHandler('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
});
const floatHandler = new NumberHandler('es-CL', {
    style: 'decimal',
    maximumFractionDigits: 6,
});
export const mapColumns = (columns) => columns.map(campo => {
    campo.editable = false;
    if (campo.field === 'id') {
        campo.visible = false;
    }
    campo.class = campo.className.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '_')
        + '  '
        + [
            campo.field.toLowerCase().replace(/[\u0300-\u036f]/g, "").replace(/[\(\)\s+\/]+/g, '_'),
            campo.input_type.replace(/\s+/g, '_')
        ].join(' ');
    /**
     * This condition exits early
     */
    if (campo.field === 'nombre') {
        campo.width = 255;
        campo.class += ' nombre_text bg-white sticky left-0 z-10';
        //console.log(campo);
        campo.formatter = (value, row) => {
            let { propietario, direccion } = inferDireccionAndPropietario(value);
            if (propietario)
                propietario =
                    `<span class="print_only"> - </span><small>${propietario}</small>`;
            return `<div style="padding-top:0.25em;padding-bottom:0.15em;" class="-my-1  pl-2 mx-0 direccion_y_nombre"  title="${value}"><div class="direccion">${direccion}</div>${propietario}</div>`;
        };
        return campo;
    }
    /**
     * Other fields are formatted according to their type
     */
    switch (campo.id_input_type) {
        case VInputType.INPUT_NUMBER:
            campo.sorter = 'numericOnly';
            campo.class += " text-end pr-4";
            if (campo.field !== 'id') {
                campo.formatter = (value, row) => {
                    return `<span >${(value !== undefined && value !== null) ? floatHandler.numberToString(value) : ''}</span>`;
                };
            }
            break;
        case VInputType.INPUT_SELECT:
        case VInputType.INPUT_STATIC_PARAMS:
        case VInputType.INPUT_RADIO_BUTTONGROUP:
            //campo            .filterControl = 'select';
            campo.formatter = (value, row) => {
                //@ts-ignore
                let replaced = campo.getShownValue(row);
                //   console.log({ ['optionMap_' + campo.slug_name]: campo.optionMap, ['negocio_' + row.id]: row[campo.slug_name] || '' })
                if (campo.optionMap) {
                    replaced = campo.optionMap.get(row[campo.slug_name] || '') || '';
                }
                //return replaced.map(val => `<span>${val}</span>`).join('');
                return `<span x-tooltip.theme.light.html.raw="${replaced}" style="text-align:justify" class="text_line_clamp min-w-[200px]">${replaced}</span>`;
            };
            break;
        case VInputType.INPUT_DATE:
        case VInputType.INPUT_DATE_TIME:
            //campo            .filterControl = 'datepicker';
            campo.sorter = dateSorter;
            campo.class += ' text-center';
            campo.formatter = function (value, row) {
                var replaced = (value ?? "").toString().replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1").replace("T", " ").slice(0, 16);
                return "<span style=\"margin:0 auto;\" class=\"text-center\" >".concat(replaced, "</span>");
            };
            break;
        case VInputType.INPUT_CONTACTO_ASOCIADO:
            if (campo.optionMap) {
                campo.formatter = (value, row) => {
                    let replaced = campo.optionMap.get(Number(row[campo.slug_name]) || '') ||
                        campo.optionMap.get(String(row[campo.slug_name]) || '') || '';
                    return `<span style="text-align:justify" class="min-w-[200px]">${replaced}</span>`;
                };
            }
            break;
        case VInputType.INPUT_TEXT:
            campo.formatter = (value, row) => {
                let replaced = String((value ?? '') || '').replace('null', '');
                return `<span class="text_line_clamp" x-tooltip.raw="'${replaced}'" style="white-space:normal;max-width:300px;">${replaced}</span>`;
            };
            break;
        case VInputType.INPUT_TEXT_AREA:
            campo.formatter = (value, row) => {
                let replaced = String((value ?? '') || '').replace('null', '');
                return `<span class="text_line_clamp" ${replaced.length && replaced.length > 120 ? 'x' : ''}-tooltip.raw="${replaced}" style="white-space:normal;min-width:300px;max-width:400px;">${replaced.length && replaced.length > 120 ? '<i class="text-primary fas fa-plus"></i> ' : ''}${replaced}</span>`;
            };
            break;
        case VInputType.INPUT_CHECKBOX:
            campo.formatter = (value, row) => {
                return `<span class="pointer-events-none flex w-100 justify-center"><input style="zoom:1.4" type="checkbox" ${value ? 'checked' : ''} readonly></span>`;
            };
            break;
        case VInputType.INPUT_SELECT_MULTIPLE:
            campo.formatter = (value, row) => {
                let replaced = (value === '' ? null : value) ?? [];
                if (typeof replaced === 'string')
                    replaced = [replaced];
                if (!replaced.join) {
                    console.log({ warn: 'error, value is not an array,', value: replaced });
                }
                else {
                    replaced = replaced.filter(r => r !== null && r !== 'null' && r !== '[null]').map(r => String(r).trim());
                }
                //return replaced.map(val => `<span>${val}</span>`).join('');
                return `<span style="cursor:pointer;text-align:justify;overflow:hidden;white-space:nowrap"
                 x-tooltip.theme.light.html.raw="<li>${replaced.join('</li><li>')}</li>"
                class="max-w-[200px] nowrap max-h-[100x] overflow-hidden">${replaced.length ? '<i class="text-primary fas fa-info-circle"></i> ' : ''} ${replaced.join(', ')} </span>`;
            };
            break;
    }
    return campo;
});
export function dateSorter(a, b) {
    try {
        a = (parseMySqlDate(a).toISOString()) || '';
        b = (parseMySqlDate(b).toISOString()) || '';
    }
    catch (err) {
        console.warn(err, a, b);
    }
    return a.localeCompare(b);
}
export function createCustomSort(columnas) {
    return (sortName, sortOrder, rows) => {
        const order = sortOrder === 'desc' ? -1 : 1;
        let { input_type = 'text', slug_name } = columnas.find(c => c.field === sortName) || {};
        if (['tipo_negocio', 'tipo_propiedad', 'etapa_negocio'].includes(String(sortName))) {
            sortName = String(`id_${sortName}`);
            input_type = 'number';
        }
        return rows.sort(function (a, b) {
            let valA = String(a[sortName]), valB = String(b[sortName]);
            // console.log({ valA, valB, order, slug_name, input_type, sortName, sortOrder })
            if (input_type === 'number') {
                let numA = parseFloat(String(a[sortName] || '0').split(',')[0].replace(/[^\d]/g, '').replace(/\.(\d{3})/g, '$1')), numB = parseFloat(String(b[sortName] || '0').split(',')[0].replace(/[^\d]/g, '').replace(/\.(\d{3})/g, '$1'));
                //console.log({ input_type, numA, numB })
                return order * ((numA) - (numB));
            }
            if (input_type.includes('date')) {
                return order * dateSorter(valA, valB);
            }
            return order * valA.localeCompare(valB);
        });
    };
}
//# sourceMappingURL=bttColumnHandlers.js.map