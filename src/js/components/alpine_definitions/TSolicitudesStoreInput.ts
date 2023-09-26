import { IContactoTuple, IIdNameTuple } from '../../solicitudes_modules/stores/createDictStore';
import { IFiltroSolicitud } from '../../solicitudes_modules/filtros_solicitudes';
import { ISolicitud } from "../../solicitudes_modules/ISolicitudBase";
import { Moment } from '../../plugins/moment.bundle';




export type TSolicitudesStoreInput = {
    data: Record<string, ISolicitud>;
    solicitud_estados: IIdNameTuple[];
    solicitud_subestados: IIdNameTuple[];

    solicitud_medios: IIdNameTuple[];
    solicitud_categorias_visita: IIdNameTuple[];
    filtros: IFiltroSolicitud & {
        parsed_range?: [Moment, Moment];
    };
    anfitriones: (IContactoTuple & {
        email: string;
        anfitrion: number;
    })[];
    solicitantes: (IContactoTuple & {
        email: string;
        solicitante: number;
    })[];
    negocios: ({
        id: number;
        propietario: string;
        direccion: string;
        solicitudes: number;
    })[];
    csrf_token?: string;
};

export type TSolicitanteOAnfitrion = { id_persona?: number; nombre_completo: string; id?: string; email?: string; extra_attributes?: any; rut?: string; como_prefieres_que_te_contactemos?: string }