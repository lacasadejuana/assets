import { LogLevel, bindConsole } from "../alpine_definitions";
import { BaseClass } from "../stores";
import { v4 as uuidv4 } from 'uuid';


export interface IPreferencia {
    id: number;
    persona_id: number;
    origen: number;
    tipo_negocio: number;
    tipo_propiedad: number;
    extra_attributes: IPreferenciaExtraAttributes;
    negocio_id: null;
    deleted_at: null;
    created_at: Date;
    updated_at: Date;
    persona: null;

    precio_max?: number;
    precio_min?: number;
    dormitorios_max?: number;
    dormitorios_min?: number;
    banos_completos_max?: number;
    banos_completos_min?: number;
    barrios: string[]
    comunas: string[]
    plazo_limite?: Date
    acepta_mascotas?: boolean
    nombre_negocio: string;
    email_persona?: string;
    cliente_premium?: boolean;
    persona_nombre_completo?: string
    region?: string
    comentario?: string
    cliente_premium_comment?: string
    negocio?: unknown
}

export interface IPreferenciaExtraAttributes {
    precio: IMaxMin;
    region: string;
    barrios: null;
    comunas: string[];
    comentario: string;
    dormitorios: IMaxMin;
    plazo_limite: Date;
    acepta_mascotas: null;
    "banos-completos": IMaxMin;
}

export interface IMaxMin {
    max: string;
    min: string;
}

export class Preferencia extends BaseClass {
    public className = 'Preferencia'

    silent: boolean = false;
    loglevel: LogLevel = LogLevel.WARN

    id: number;
    persona_id: number;
    origen: number;
    tipo_negocio: number;
    tipo_propiedad: number;
    extra_attributes: IPreferenciaExtraAttributes;
    negocio_id: number;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
    persona: unknown;
    negocio: unknown;
    precio: IMaxMin;


    region: string;
    barrios: string[];
    comunas: string[];
    comentario: string;
    dormitorios: IMaxMin;


    plazo_limite: Date;
    acepta_mascotas: boolean;
    banos_completos: IMaxMin;


    precio_max?: number;
    precio_min?: number
    dormitorios_max?: number;
    dormitorios_min?: number
    banos_completos_max?: number;
    banos_completos_min?: number
    ready: boolean
    nombre_negocio?: string
    email_persona?: string
    cliente_premium?: boolean
    cliente_premium_comment?: string
    persona_nombre_completo?: string
    searchstring?: string
    protected timerColor: string = 'color:blue;font-weight:bold'
    protected classNameColor: string = 'color:purple;font-weight:bold;'
    constructor(attributes: IPreferencia) {
        super()
        this.ready = false
        this.classNameColor = 'color:purple;font-weight:bold;'
        this._console = bindConsole(this.className, this.classNameColor)

        this.id = attributes.id
        this.persona_id = attributes.persona_id
        this.origen = attributes.origen
        this.tipo_negocio = attributes.tipo_negocio
        this.tipo_propiedad = attributes.tipo_propiedad
        this.extra_attributes = attributes.extra_attributes
        this.negocio_id = attributes.negocio_id
        this.deleted_at = attributes.deleted_at
        this.created_at = attributes.created_at
        this.updated_at = attributes.updated_at
        this.persona = attributes.persona
        this.negocio = attributes.negocio
        this.precio_max = attributes.precio_max;
        this.precio_min = attributes.precio_min;
        this.region = attributes.region;
        this.barrios = attributes.barrios;
        this.comunas = attributes.comunas;
        this.comentario = attributes.comentario;
        this.dormitorios_max = attributes.dormitorios_max;
        this.dormitorios_min = attributes.dormitorios_min;
        this.plazo_limite = attributes.plazo_limite;
        this.acepta_mascotas = attributes.acepta_mascotas;
        this.banos_completos_max = attributes.banos_completos_max
        this.banos_completos_min = attributes.banos_completos_min

        this.nombre_negocio = attributes.nombre_negocio
        this.email_persona = attributes.email_persona
        this.cliente_premium = attributes.cliente_premium
        this.cliente_premium_comment = attributes.cliente_premium_comment
        this.persona_nombre_completo = attributes.persona_nombre_completo
        this.searchstring = this.computeSearchString(attributes)
        // this.init()
    }
    init() {
        this.marquee(' init ')
    }
    computeSearchString(preferencia) {
        return Object.entries(preferencia)
            .reduce((accum, [ket, value]) => {
                if (value === undefined) return accum;
                return accum + ' ' + value + ' '

            }, '')
            .normalize('NFD')
            .replace(/\n+/, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase();
    }
}