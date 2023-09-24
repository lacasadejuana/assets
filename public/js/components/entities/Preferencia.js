import { LogLevel, bindConsole } from "../alpine_definitions";
import { BaseClass } from "../stores";
export class Preferencia extends BaseClass {
    constructor(attributes) {
        super();
        this.className = 'Preferencia';
        this.silent = false;
        this.loglevel = LogLevel.WARN;
        this.timerColor = 'color:blue;font-weight:bold';
        this.classNameColor = 'color:purple;font-weight:bold;';
        this.ready = false;
        this.classNameColor = 'color:purple;font-weight:bold;';
        this._console = bindConsole(this.className, this.classNameColor);
        this.id = attributes.id;
        this.persona_id = attributes.persona_id;
        this.origen = attributes.origen;
        this.tipo_negocio = attributes.tipo_negocio;
        this.tipo_propiedad = attributes.tipo_propiedad;
        this.extra_attributes = attributes.extra_attributes;
        this.negocio_id = attributes.negocio_id;
        this.deleted_at = attributes.deleted_at;
        this.created_at = attributes.created_at;
        this.updated_at = attributes.updated_at;
        this.persona = attributes.persona;
        this.negocio = attributes.negocio;
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
        this.banos_completos_max = attributes.banos_completos_max;
        this.banos_completos_min = attributes.banos_completos_min;
        this.nombre_negocio = attributes.nombre_negocio;
        this.email_persona = attributes.email_persona;
        this.cliente_premium = attributes.cliente_premium;
        this.cliente_premium_comment = attributes.cliente_premium_comment;
        this.persona_nombre_completo = attributes.persona_nombre_completo;
        this.searchstring = this.computeSearchString(attributes);
        // this.init()
    }
    init() {
        this.marquee(' init ');
    }
    computeSearchString(preferencia) {
        return Object.entries(preferencia)
            .reduce((accum, [ket, value]) => {
            if (value === undefined)
                return accum;
            return accum + ' ' + value + ' ';
        }, '')
            .normalize('NFD')
            .replace(/\n+/, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase();
    }
}
//# sourceMappingURL=Preferencia.js.map