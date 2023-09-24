import { VInputType } from './alpine_definitions/definitions.input_types';
export const hardCodedDateFields = [
    //{ slug_name: "created_at", attr_type: "negocio", name: "Fecha Creación" },
    {
        slug_name: 'updated_at',
        attr_type: 'negocio',
        name: 'Última actualización',
        id_input_type: VInputType.INPUT_DATE_TIME,
        visible: false,
        readonly: true,
    },
    //{ slug_name: "fecha_esperada_venta", attr_type: "negocio_attr", name: "F. Esperada venta" }
]
    .map((item) => {
    let { slug_name, attr_type } = item;
    return {
        data: slug_name,
        field: slug_name,
        id: 0,
        related_model: null,
        readonly: 0,
        input_type: 'date',
        ...item,
        key: `${slug_name},${attr_type}`,
        id_input_type: 5,
        inputType: 'date',
        form_component: 'dateInputComponent',
        visible: item.visible,
    };
})
    .sort((a, b) => {
    return a.slug_name.localeCompare(b.slug_name);
});
//# sourceMappingURL=hardCodedDateFields.js.map