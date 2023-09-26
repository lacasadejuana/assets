import { DttColumn } from '../DttColumn';
import { INegocioRow } from '../alpine.store';
import { defaultSlugs, optgroups } from "../alpine_definitions/OptionGroups";
import { VInputType } from '../alpine_definitions/definitions.input_types';


export function decorateCampo(campo: DttColumn<INegocioRow>): DttColumn<INegocioRow> {
    campo.id_input_type = String(campo.id_input_type) as unknown as VInputType;
    const {
        slug_name = '', attr_type, id_input_type, input_type, name
    } = campo;
    let { visible, width } = campo

    if (!slug_name) {
        console.warn({ campo })
        return campo as DttColumn<INegocioRow>
    }
    let group = 'general';
    if (slug_name === 'nombre') {
        group = 'general';
    } else if (attr_type === 'propiedad_attr'
        || slug_name.includes('direccion')
        || (attr_type === 'propiedad')
        || slug_name.includes('m2')) {
        group = 'propiedad';
    } else if (
        (slug_name.includes('esperada') && slug_name.includes('venta'))
        || slug_name.includes('precio')
        || slug_name.includes('monto')
        || slug_name.includes('gasto')
        || slug_name.includes('contribuciones')
        || slug_name.includes('credito')
        || slug_name.includes('pago')
        || slug_name.includes('abono')
        || slug_name.includes('uf')
        || slug_name.includes('costo')
        || slug_name.includes('valor')
    ) {
        group = 'comercial';
    } else if (String(input_type).toLowerCase().includes('date')
        || [VInputType.INPUT_DATE, VInputType.INPUT_DATE_TIME].includes(id_input_type)) {
        group = 'fechas_negocio';
    } else if ((attr_type || '').includes('contacto') || (input_type || '').includes('contacto')) {
        group = 'contacto';
    }
    let optgroup = optgroups.find(g => g.id === group);
    if (!optgroup)
        group = 'general';
    let editable = true;
    if (campo.readonly) {
        editable = false;
        //@ts-ignore
        // if (campo.editable === undefined) console.warn('columna readonly ', { slug_name: campo.slug_name, editable: campo.editable })
    }
    let black_list = defaultSlugs;
    if (black_list.includes(slug_name)) {

        editable = false;
        //@ts-ignore
        //console.warn('black_list includes slug ', { slug_name: campo.slug_name, editable: campo.editable })
    }
    const key = [slug_name, attr_type].filter(Boolean).join(',');
    let data = campo.slug_name;
    /*if (['id_tipo_negocio',
        'id_tipo_propiedad',
        'id_etapa_negocio'].includes(campo.slug_name)) {
        //   console.info({ campo })
        data = campo.slug_name.replace(/^id_/, '');
    }*/
    if (campo.id_input_type === VInputType.INPUT_CHECKBOX) {
        campo.properties = [
            { id: 'NOT NULL', name: 'Checked' },
            { id: 'NULL', name: 'Unchecked' }
        ]
    }
    //if (campo.properties && Array.isArray(campo.properties)) {
    ///*campo.options = campo.id_input_type == VInputType.INPUT_CONTACTO_ASOCIADO
    //? (Object.values(campo.properties) as TContactOption[]).map(processContactOption)
    //: (Object.values(campo.properties)).map(processOption);*/
    //campo.optionMap = new Map(campo.options.map(o => [(o.id), o.name]));
    //
    //}
    let template_id;
    switch (campo.id_input_type) {
        case VInputType.INPUT_SELECT:
        case VInputType.INPUT_RADIO_BUTTONGROUP:
        case VInputType.INPUT_STATIC_PARAMS:
            if (
                [
                    'id_tipo_negocio',
                    'id_tipo_propiedad',
                    'id_etapa_negocio',
                ].includes(String(campo.slug_name))
            ) {

                template_id = '#input_main_fields';
            } else {


                template_id = '#input_select';
            }

            break;
        case VInputType.INPUT_CONTACTO_ASOCIADO:
            template_id = '#input_contacto';
            break;
        case VInputType.INPUT_TEXT:
        case VInputType.INPUT_TEXT_AREA:
            template_id = '#input_textarea';
            break;

        case VInputType.INPUT_SELECT_MULTIPLE:
            template_id = '#input_multiselect';
            break;

        case VInputType.INPUT_CHECKBOX:
            template_id = '#input_checkbox';
            break;

        case VInputType.INPUT_NUMBER:

            if (campo.slug_name !== 'id') {

                template_id = '#input_number';
            }
            break;
        case VInputType.INPUT_DATE:
        case VInputType.INPUT_DATE_TIME:
            //campo            .filterControl = 'datepicker';
            if (campo.readonly) {
                template_id = '#input_readonly';
            } else {
                template_id = '#input_dates';
            }
            break;
        default:
            break;
    }



    return {
        ...campo,
        editable,
        data,
        field: data,
        key,
        group,
        template_id,
        className: [name].join(' '),
        width,
        title: campo.name,
    } as unknown as DttColumn<INegocioRow>;
}
globalThis.decorateCampo = decorateCampo;
