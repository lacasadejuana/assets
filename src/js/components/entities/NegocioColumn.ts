import { INegocioRow } from '@lacasadejuana/types';
import { AttrType } from '../alpine_definitions/type_definitions';

import { DttColumn } from '../DttColumn';
import { InputType, VInputType } from '../alpine_definitions/definitions.input_types';


import { TOption } from '../alpine_definitions';
import type { IColumnDefField } from '../alpine_definitions/IColumnDefCommon';
import { defaultSlugs, optgroups } from "../alpine_definitions/OptionGroups";
import { TContactOption } from '../alpine_definitions/TContactOption';
import { processContactOption, processOption } from '../decorators/ContactOption';



export class NegocioColumn extends DttColumn<INegocioRow> implements IColumnDefField<INegocioRow> {

    public field: string;
    public attr_type: AttrType;
    public group?: string;
    public optionMap?: Map<string | number, string>;
    public template_id: string;
    public id_input_type: VInputType;
    public folder_slug: string;
    //public options: (TOption | TContactOption)[]
    [s: string]: unknown;
    constructor(options) {
        super(options)
        this.id_input_type = options.id_input_type;
        this.attr_type = options.attr_type;
        this.properties = options.properties;
        if (this.id_input_type === VInputType.INPUT_CHECKBOX) {
            this.properties = [
                { id: 'NOT NULL', name: 'Checked' },
                { id: 'NULL', name: 'Unchecked' }
            ]
        }
        if (this.slug_name === 'dias-publicado') this.name = 'Días Publicado'
        this.populateOptions();
        this.inferTemplateId();
        this.group = assignGroup(this);
        this.editable = !this.readonly && !defaultSlugs.includes(this.slug_name);
        this.key = [this.slug_name, this.attr_type].filter(Boolean).join(',');
        this.data = this.slug_name
        this.field = this.slug_name;
        this.folder_slug = options.folder_slug;
    }
    populateOptions() {
        if (this.properties && Array.isArray(this.properties)) {

            this.optionMap = new Map(this.options.map(o => [(o.id), o.name]));

        }
    }
    get options(): (TOption | TContactOption)[] {
        if (!this.properties || !Array.isArray(this.properties)) return []

        return this.id_input_type == VInputType.INPUT_CONTACTO_ASOCIADO
            ? (Object.values(this.properties) as TContactOption[]).map(processContactOption)
            : (Object.values(this.properties)).map(processOption);
    }
    get componentName() {
        return `inputs.${this.form_component}`
    }
    get inputName() {
        return null !== this.attr_type ? `${this.attr_type}-${this.slug_name}` : this.slug_name;
    }
    get filesInputName() {
        return this.attachesFiles ? this.inputName + '-files' : null;
    }
    inferTemplateId() {

        switch (this.id_input_type) {
            case VInputType.INPUT_SELECT:
            case VInputType.INPUT_RADIO_BUTTONGROUP:
            case VInputType.INPUT_STATIC_PARAMS:
                if (String(this.slug_name) === 'id_etapa_negocio') {
                    this.template_id = '#input_etapa_negocio';
                } else if (
                    [
                        'id_tipo_negocio',
                        'id_tipo_propiedad',

                    ].includes(String(this.slug_name))
                ) {

                    this.template_id = '#input_main_fields';
                } else {


                    this.template_id = '#input_select';
                }

                break;
            case VInputType.INPUT_CONTACTO_ASOCIADO:
                this.template_id = '#input_contacto';
                break;
            case VInputType.INPUT_TEXT:
            case VInputType.INPUT_TEXT_AREA:
                this.template_id = '#input_textarea';
                break;

            case VInputType.INPUT_SELECT_MULTIPLE:
                this.template_id = '#input_multiselect';
                break;

            case VInputType.INPUT_CHECKBOX:
                this.template_id = '#input_checkbox';
                break;

            case VInputType.INPUT_NUMBER:

                if (this.slug_name !== 'id') {

                    this.template_id = '#input_number';
                }
                break;
            case VInputType.INPUT_DATE:
            case VInputType.INPUT_DATE_TIME:
                //campo            .filterControl = 'datepicker';
                if (this.readonly) {
                    this.template_id = '#input_readonly';
                } else {
                    this.template_id = '#input_dates';
                }
                break;
            default:
                break;
        }
    }

    getShownValue(negocio) {
        if (typeof negocio === 'number') negocio = this.$store.negocios.get(negocio)
        negocio = negocio || { _extra_props: {} }
        let baseline = negocio[this.slug_name] || (negocio._extra_props || {})[this.slug_name] || ''
        if (
            this.isSelectOrRadioButtonGroup
            || this.isContact
        ) {
            if (!this.optionMap) {
                console.warn('Campo select sin opciones', this)
                return baseline
            }
            return this.optionMap.get(negocio[this.slug_name] as string || '')
                || this.optionMap.get(String(negocio[this.slug_name]) as string || '')
                || this.optionMap.get(Number(negocio[this.slug_name]) as unknown as string || '') || ''
        }
        if (this.isMultiSelectField) {
            let value = (negocio[this.slug_name] as string[] || [])

            return Array.isArray(value) ? value.map((id: string) => this.optionMap.get(id) || '').join(', ') : value
        }
        if (typeof negocio[this.slug_name] === 'string') {
            return baseline.replace('[null]', '').replace('null', '')
        }
        return baseline;
    }
    get attachesFiles(): boolean {
        return !!this.attach_files
    }
    get isMultiSelectField(): boolean {
        return VInputType.INPUT_SELECT_MULTIPLE === String(this.id_input_type)
    }
    get isDateOrDatetimeField(): boolean {
        return VInputType.INPUT_DATE === String(this.id_input_type) || VInputType.INPUT_DATE_TIME === String(this.id_input_type)
    }
    get isTextOrTextArea(): boolean {
        return VInputType.INPUT_TEXT === String(this.id_input_type) || VInputType.INPUT_TEXT_AREA === String(this.id_input_type)
    }
    get isSelectOrRadioButtonGroup(): boolean {
        return VInputType.INPUT_STATIC_PARAMS === String(this.id_input_type)
            || VInputType.INPUT_RADIO_BUTTONGROUP === String(this.id_input_type)

            || VInputType.INPUT_SELECT === String(this.id_input_type)
    }
    get isCheckbox(): boolean {
        return VInputType.INPUT_CHECKBOX === String(this.id_input_type)
    }
    get isNumber(): boolean {
        return VInputType.INPUT_NUMBER === String(this.id_input_type)
    }
    get isContact(): boolean {
        return VInputType.INPUT_CONTACTO_ASOCIADO === String(this.id_input_type)
    }

}

function assignGroup(column: NegocioColumn) {
    let { slug_name, attr_type, input_type, id_input_type } = column;
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
    //Ensure no extraneous group is assigned
    if (!optgroup) group = 'general';
    return group;
}

function assignInputType(dttCol: NegocioColumn) {
    /**
               * If the column is not a select, text, date, datetime, textarea or number, then it is readonly of type text
               */
    if (![
        VInputType.INPUT_SELECT,
        VInputType.INPUT_TEXT,
        VInputType.INPUT_DATE,
        VInputType.INPUT_DATE_TIME,
        VInputType.INPUT_TEXT_AREA,
        VInputType.INPUT_CHECKBOX,
        VInputType.INPUT_CONTACTO_ASOCIADO,
        VInputType.INPUT_RADIO_BUTTONGROUP,
        VInputType.INPUT_SELECT_MULTIPLE,
        VInputType.INPUT_STATIC_PARAMS,
        VInputType.INPUT_NUMBER
    ].includes(dttCol.id_input_type)) {
        //@ts-ignore
        dttCol.original_id_input_type = dttCol.id_input_type;
        dttCol.id_input_type = VInputType.INPUT_TEXT;
        dttCol.readonly = true;
        dttCol.input_type = 'text' as InputType.Text;
    }
    return dttCol.input_type
}