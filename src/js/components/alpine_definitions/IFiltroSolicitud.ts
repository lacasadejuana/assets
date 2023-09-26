
export interface IFiltroSolicitud {





    equipo: number[];
    estado: number;
    medio: number;
    solicitud_categorias_visita?: number;
    id_negocio: number;
    personas: number[];
    subestado: number;
    campo_fecha?: string;
    date_range?: string;
}
export interface Ilabelvalue {
    label: string;
    id: unknown;
    default: string;
    name?: string;
}
export interface IValueLabelTuple {
    id: string;
    name: string;
    [s: string]: unknown;
}
