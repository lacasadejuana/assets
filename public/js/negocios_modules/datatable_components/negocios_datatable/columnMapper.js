import { VInputType } from '../../../components/alpine_definitions';
import { dateSorter } from '../compact_table/bttColumnHandlers';
const createFormatter = (template_id, slug_name, options = {}) => {
    return (value, row) => {
        return document
            .querySelector(template_id)
            .innerHTML.replace(/negocio_id/g, String(row.id))
            .replace(/editing_cell/g, 'false')
            .replace(/editable_item/g, String(options.editable ?? true))
            .replace(/save_auto/g, String(options.save_auto ?? true))
            .replace(/tom_select_or_choices/g, `'${options.tom_select_or_choices ?? "choices"}'`)
            .replace(/open_auto/g, String(options.save_auto ?? true))
            .replace(/name_slug/g, `'${slug_name}'`);
    };
};
export const columnMapper = (columns) => columns.map((campo) => {
    campo.searchFormatter = false;
    //campo.editable = false;
    campo.field = campo.data;
    campo.sortable = true;
    campo.searchable = true;
    //@ts-ignore
    if (campo.title.includes('(') && campo.title.includes(')') && campo.title.length >= 30) {
        let title_parts = campo.title.split('(');
        campo.title = `<span class="flex flex-col">${title_parts[0]}<small style="line-height:14px;font-weight:400">(${title_parts[1]}</small></span>`;
        campo.name = title_parts[0];
        console.log({ campo });
    }
    campo.class =
        campo.className
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace('@', '')
            .replace(/\./g, '') +
            '  ' +
            [
                campo.field
                    .toLowerCase()
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[\(\)\s+\/]+/g, '_')
                    .replace('@', '')
                    .replace(/\./g, ''),
                'negocio_cell',
                campo.input_type.replace(/\s+/g, '_'),
            ].join(' ');
    ////console.log({ campo, class: campo.class });
    if (campo.field === 'id') {
        campo.visible = false;
        campo.searchFormatter = true;
        campo.align = 'center';
        campo.formatter = (value, row) => {
            return `${value} <pre class="hidden">${row.searchstring}</pre>`;
        };
    }
    /**
     * This condition exits early
     */
    if (campo.field === 'nombre') {
        campo.width = '255';
        campo.class += ' sticky left-0 z-10 w-[255px] border ';
        campo.align = 'left';
        campo.cellStyle = (value, row, index) => {
            return {
                id: `${campo.field}_${row.id}`,
                classes: [campo.field, 'negocio_cell', 'sticky'].join(' '),
            };
        };
        ////console.log(campo);
        campo.formatter = (value, row) => {
            return document
                .querySelector('#row_actions')
                .innerHTML.replace(/negocio_id/g, String(row.id))
                .replace(/save_auto/g, 'true')
                .replace(/name_slug/g, `'${campo.slug_name}'`);
        };
        return campo;
    }
    if (campo.field === 'direccion') {
        campo.formatter = createFormatter('#input_address', campo.slug_name, {
            editable: campo.editable,
        });
        return campo;
    }
    /**
     * Other fields are formatted according to their input type
     */
    switch (campo.id_input_type) {
        case VInputType.INPUT_SELECT:
        case VInputType.INPUT_RADIO_BUTTONGROUP:
        case VInputType.INPUT_STATIC_PARAMS:
            if ('id_etapa_negocio' === String(campo.slug_name)) {
                campo.showSelectTitle = true;
                campo.searchFormatter = true;
                campo.slug_name = String(`id_${campo.slug_name}`).replace('id_id_', 'id_');
                //console.log({ slug_name: campo.slug_name });
                campo.formatter = createFormatter('#input_etapa_negocio', campo.slug_name, { tom_select_or_choices: 'tomselect' });
            }
            else if ([
                'id_tipo_negocio',
                'id_tipo_propiedad',
            ].includes(String(campo.slug_name))) {
                campo.showSelectTitle = true;
                campo.searchFormatter = true;
                campo.slug_name = String(`id_${campo.slug_name}`).replace('id_id_', 'id_');
                //console.log({ slug_name: campo.slug_name });
                campo.formatter = createFormatter('#input_main_fields', campo.slug_name, { tom_select_or_choices: 'choices' });
            }
            else {
                campo.searchFormatter = true;
                campo.formatter = createFormatter('#input_select', campo.slug_name, { editable: campo.editable });
            }
            break;
        case VInputType.INPUT_CONTACTO_ASOCIADO:
            campo.formatter = createFormatter('#input_contacto', campo.slug_name, { editable: campo.editable });
            break;
        case VInputType.INPUT_TEXT:
        case VInputType.INPUT_TEXT_AREA:
            campo.formatter = createFormatter('#input_textarea', campo.slug_name, { editable: campo.editable });
            break;
        case VInputType.INPUT_SELECT_MULTIPLE:
            campo.formatter = createFormatter('#input_multiselect', campo.slug_name, {
                editable: campo.editable,
                tom_select_or_choices: 'tomselect',
            });
            /*campo.formatter = (value, row) => {
            return document.querySelector('#input_multiselect').innerHTML
                .replace(/open_auto/g, 'true')
                .replace(/editing_cell/g, 'false')
                .replace(/negocio_id/g, String(row.id))
                .replace(/save_auto/g, 'true')
                //@ts-ignore
                .replace(/editable_item/g, campo.editable)
                .replace(/tom_select_or_choices/g, "'tomselect'")
                //@ts-ignore
                .replace(/name_slug/g, `'${campo.slug_name}'`)
        }*/
            /*campo.formatter = (value, row) => {
            let replaced = (value === '' ? null : value) || []
            if (typeof replaced === 'string') replaced = [replaced]
            if (!replaced.join) (
                //console.log({ replaced })
            )
         
            //return replaced.map(val => `<span>${val}</span>`).join('');
            return `<span style="cursor:pointer;text-align:justify;overflow:hidden;white-space:nowrap" x-tooltip.theme.light.raw="${replaced.join(', ')}"
            class="max-w-[200px] nowrap max-h-[100x] overflow-hidden">${replaced.length ? '<i class="fas fa-info-circle"></i> ' : ''} ${replaced.join(', ')} </span>`;
        }*/
            break;
        case VInputType.INPUT_CHECKBOX:
            campo.formatter = createFormatter('#input_checkbox', campo.slug_name, {
                editable: campo.editable,
            });
            break;
        case VInputType.INPUT_NUMBER:
            campo.sorter = 'numericOnly';
            if (campo.field === 'id') {
                campo.visible = false;
            }
            else {
                campo.formatter = createFormatter('#input_number', campo.slug_name, {
                    editable: campo.editable,
                });
            }
            break;
        case VInputType.INPUT_DATE:
        case VInputType.INPUT_DATE_TIME:
            //campo            .filterControl = 'datepicker';
            campo.sorter = dateSorter;
            if (campo.readonly) {
                //console.log({ campo });
                campo.formatter = createFormatter('#input_readonly', campo.slug_name, {
                    editable: campo.editable,
                });
            }
            else {
                campo.formatter = createFormatter('#input_dates', campo.slug_name, {
                    editable: campo.editable,
                });
            }
            break;
        default:
            break;
    }
    return campo;
});
//# sourceMappingURL=columnMapper.js.map