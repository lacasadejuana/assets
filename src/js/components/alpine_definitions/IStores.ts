
type TStringable = { id: number, name: string, [s: string]: unknown, toString(): string };

interface GenericMapping<T extends TStringable> {
    properties: T[]
    get(id: number): TStringable
}

declare class StoreFactory<T extends TStringable> {

    public properties: T[]
    get(id: number): T

}

export interface $store {
    tipos_negocio: StoreFactory<{ id: number, name: string }>,
    tipos_propiedad: StoreFactory<{ id: number, name: string }>,
    input_types: StoreFactory<{ id: number, name: string }>,
    roles_negocio: StoreFactory<{ id: number, name: string }>,
    tipos_busqueda: StoreFactory<{ id: number, name: string }>,
    solicitud_subestados: StoreFactory<{ id: number, name: string }>,
    solicitud_medios: StoreFactory<{ id: number, name: string }>,
    solicitud_categorias_visita: StoreFactory<{ id: number, name: string }>,
    solicitud_estados: StoreFactory<{ id: number, name: string }>,
    etapas_negocio: StoreFactory<{ id: number, name: string, extra_attributes: unknown }>
}
