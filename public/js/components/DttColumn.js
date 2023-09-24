import { InputType } from './alpine_definitions/definitions.input_types';
export function inferDireccionAndPropietario(value = '') {
    value = value || '';
    if (!(value || '').includes(' - ') && (value || '')
        .includes('-'))
        value = value
            .replace(/([^\s]+)\s*-\s*([^\s]+)/, '$1 - $2');
    let valueArray = (value || '').split(' - ');
    let [direccion = '', propietario = ''] = (!valueArray[1] || /\d+/.test(valueArray[0]) || !/\d+/.test(valueArray[1]))
        ? [
            valueArray[0], valueArray[1]
        ] : [valueArray[1], valueArray[0]];
    return { direccion, propietario };
}
export class DttColumn {
    constructor(options) {
        this._visible = true;
        this.input_type = InputType.Text;
        this.editable = true;
        const { name, data, title, visible = true, className, sortable, render, width, targets, slug_name, input_type, checkbox, attr_type = 'negocio', editable = true, is_default = false, ...attrs } = options;
        Object.entries(attrs).forEach(([attr_name, attr_value]) => {
            this[attr_name] = attr_value;
        });
        //@ts-ignore
        this.editable = editable;
        this.is_default = is_default;
        this.slug_name = slug_name;
        this.width = width;
        this.title = this.name = name;
        if (data) {
            this.data = data;
            this.field = data;
        }
        else if (checkbox) {
            this.checkbox = checkbox;
        }
        //@ts-ignore
        this.attr_type = attr_type;
        this.title = title;
        this.visible = visible;
        this.class = this.className = className;
        this.sortable = sortable;
        this.targets = targets;
        this.input_type = (input_type || 'text');
        this.render = render || this.defaultRendered;
        this.formatter = (value, row) => {
            return this.render(value, null, row, null);
        };
        const key = [slug_name, attr_type].filter(Boolean).join(',');
    }
    /*set visible(visible: boolean) {
        //console.trace(this.slug_name + ' setting visible', visible)
        this._visible = visible;
    }
    get visible() {
        return this._visible;
    }*/
    defaultRendered(data, type, row, meta) {
        return data;
    }
    get $store() {
        return {
            columnas_actuales: Alpine.store('columnas_actuales'),
            campos_busqueda: Alpine.store('campos_busqueda'),
            negocios: Alpine.store('negocios'),
            active_filter: Alpine.store('active_filter'),
            maps: Alpine.store('maps'),
            user: Alpine.store('user')
        };
    }
}
//# sourceMappingURL=DttColumn.js.map