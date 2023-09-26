import { AlpineStore } from '../alpine.store';

type XstoreApp = AlpineStore & {
    solicitudes: {
        estados: {
            [key: number]: {
                name: string;
            };
        };
        subestados: {
            [key: number]: {
                name: string;
            };
        };
    };
};
type XstoreSolicitudes = XstoreApp['solicitudes'];
export interface IIdNameTuple {
    id: number;
    name: string;
}
export interface IContactoTuple {
    id: number;
    nombre_completo: string;
}
export interface IOptionElement extends Partial<IIdNameTuple> {
    disabled?: boolean;
    selected?: boolean;
    estado_id?: number;
    subestado_id?: number;
    value?: number;
    label?: string;


}

export type IidEstadoTuple = (IOptionElement & {
    subestados: IOptionElement[];


});
