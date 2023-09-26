export const optgroups = [
    //{ group: 'otros', id: 'otros', name: 'Otros' },
    {
        group: 'fechas_negocio',
        id: 'fechas_negocio',
        name: 'Fechas Negocio'
    },
    {
        group: 'general',
        id: 'general',
        name: 'General'
    },
    {
        group: 'propiedad',
        id: 'propiedad',
        name: 'Datos Propiedad'
    },
    {
        group: 'comercial',
        id: 'comercial',
        name: 'Info Comercial'
    }, {
        group: 'contacto',
        id: 'contacto',
        name: 'Contactos Asociados'
    }
];

export type Toptgroups = typeof optgroups;
export const defaultSlugs = [
    'id',
    'nombre',
    'tipo_negocio',
    //'id_tipo_negocio',
    'tipo_propiedad',
    //'id_tipo_propiedad',
    'etapa_negocio',
    //'id_etapa_negocio',
    'fecha_creacion',
    'fecha_actualizacion',
    "fecha_creacion_visual",
    "fechaCreacion",
];
