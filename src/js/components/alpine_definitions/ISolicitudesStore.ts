import { Moment } from '../../plugins/moment.bundle'
import { IAnfitrionOrSolicitante, XDataContext } from '../alpine.store';
import { IFiltroSolicitud } from "./IFiltroSolicitud";
import { ISolicitud } from './ISolicitudBase';
import { IIdNameTuple } from "./IidEstadoTuple";



export interface ISolicitudesStore extends XDataContext {
    parsedRange: [Moment, Moment];
    anfitriones: IAnfitrionOrSolicitante[];
    solicitantes: IAnfitrionOrSolicitante[];
    negocios: { id: number; propietario: string; direccion: string; solicitudes: number; }[];
    filtros: IFiltroSolicitud & { parsed_range?: [Moment, Moment]; negocios: number[]; };
    solicitud_estados: IIdNameTuple[];
    solicitud_subestados: IIdNameTuple[];
    solicitud_medios: IIdNameTuple[];
    solicitud_categorias_visita: IIdNameTuple[];
    solicitudes: Record<string, ISolicitud>;
    csrf_token?: string;
}
