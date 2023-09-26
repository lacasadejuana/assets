import { CamposBusquedaStore, ColumnasActualesStore, VInputType } from "@/components";

export const populateMapFields = (columnas_actuales: ColumnasActualesStore, campos_busqueda: CamposBusquedaStore) => {
    return (columnas_actuales.columnDefs.
        concat([
            campos_busqueda.find('nombre'),
            campos_busqueda.find('id'),
            campos_busqueda.find('id_tipo_negocio'),
            campos_busqueda.find('id_tipo_propiedad'),
            campos_busqueda.find('lng'),
            campos_busqueda.find('lat'),
            campos_busqueda.find('comuna'),
            campos_busqueda.find('seudonimo-propiedad'),
            campos_busqueda.find('codigo-interno'),
            campos_busqueda.find('codigo_interno'),
            campos_busqueda.find('link-img-portada-wordpress'),
            campos_busqueda.find('titulo-resumen-web'),
            campos_busqueda.find('link-publicacion-web'),
            campos_busqueda.find('codigo-wordpress'),
            campos_busqueda.find('id_wordpress'),
        ]))
        .filter(
            (c) =>
                c &&
                c.id_input_type !== VInputType.INPUT_CHECKBOX &&
                c.id_input_type !== VInputType.INPUT_SELECT_MULTIPLE &&
                c.slug_name !== 'direccion',
        )
        .reduce((accum, campo) => {
            accum[
                campo.slug_name.replace(
                    'fecha_creacion_visual',
                    'created_at',
                )
            ] = campo.name.replace(/^F\.\s/, 'Fecha ');
            return accum;
        }, {});

}