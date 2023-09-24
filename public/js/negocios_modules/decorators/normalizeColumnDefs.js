import { decorateCampo } from "../../components/decorators";
import { NegocioColumn } from "../../components/entities/NegocioColumn";
export function normalizeColumnDef(columna, index = null) {
    //@ts-ignore
    let campo = decorateCampo(columna);
    let { name, visible, slug_name, editable, attr_type, input_type, id_input_type, width } = campo;
    //console.log(
    //['',
    //campo.slug_name,
    //`es`,
    //editable ? 'editable' : 'readonly'
    //].join('%c '),
    //'color:#336699;background-color:#fff;font-weight:bold;',
    //'',
    //`color:${editable ? '#0a0' : '#f60'};font-weight:bold;`,
    //)
    let data = slug_name;
    /* if (['id_tipo_negocio', 'id_tipo_propiedad', 'id_etapa_negocio'].includes(slug_name)) {
         data = slug_name.replace(/^id_/, '');
     }*/
    let column = {
        ...campo,
        title: name,
        name,
        id_input_type,
        slug_name,
        visible: !!visible,
        className: [name].join(' '),
        width,
        input_type,
        data,
        editable,
        attr_type,
    };
    let dttColumn = new NegocioColumn({ ...column, targets: index });
    if (!dttColumn.editable) {
        //console.info({ data, col_editable: columna.editable, campo_editable: campo.editable })
    }
    return dttColumn;
}
//# sourceMappingURL=normalizeColumnDefs.js.map