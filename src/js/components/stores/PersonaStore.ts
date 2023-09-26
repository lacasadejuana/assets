/// <reference types="alpinejs" />

import { LogLevel, bindConsole } from '../alpine_definitions';
import { BaseClass } from './BaseClass';


export interface IPersona {
    id: number;
    nombre: string;
    rut: string;
    apellidos: string;
    email: string;
    empresa_id: null;
    created_at: Date;
    direccion: null;
    telefono: string;
    extra_attributes: IPersonaExtraAttributes;
    nombre_completo: string;
    can_be_impersonated: null;
    roles_negocio: IRolesNegocioPersona[];
    negocios: INegociosPersona[];
    realm: string;
    role: string;
    text: string;
}

export interface IPersonaExtraAttributes {
    giro: null;
    comportamiento: null;
    id_rol_negocio: number[];
    como_conocio_lcdj: string;
    nivel_satisfaccion: null;
    telefono_secundario: null;
    "cliente_premium-comment": null;
    comportamiento_comentario: null;
    nivel_satisfaccion_comentario: null;
    como_prefieres_que_te_contactemos: string;
    [s: string]: unknown
}

export interface INegociosPersona {
    id_negocio: number;
    nombre: string;
    id_rol_negocio: number;
    rol_negocio?: string;
}

export interface IRolesNegocioPersona {
    id: number;
    name: string;
    equipo_lcdj: number;
}
export function createPersonaStore() {
    return new PersonaStore()
}

export class PersonaStore extends BaseClass {
    public className = 'PersonaStore'
    id?: number;
    silent: boolean = false;
    loglevel: LogLevel = LogLevel.WARN

    protected persona: IPersona = {} as IPersona

    ready: boolean


    constructor() {
        super()
        this._console = bindConsole(this.className)
        console.marquee({
            [Number(performance.now() / 1000).toFixed(1)]: 'color:blue;font-weight:bold',
            ' created store ': '',
            [String(this.constructor.name)]: 'color:purple;font-weight:bold;'
        })
    }
    init() {
    }
    get extra_attributes() {
        return this.persona.extra_attributes || {};
    }
    mergeAttributes(attrs) {
        this.persona.extra_attributes = {
            ...this.persona.extra_attributes,
            ...attrs
        }
    }
    mergeAttributesIfMissing(attrs) {
        Object.entries(attrs).forEach(([key, value]) => {
            this.persona.extra_attributes[key] = this.persona.extra_attributes[key] ?? value
        });
    }
    get nombre_completo() {
        return (this.persona.nombre + ' ' + this.persona.apellidos)
    }
    setProperties(persona: IPersona) {
        this.persona = persona
        this.id = persona.id || null

        this.persona.extra_attributes = this.persona.extra_attributes || {} as IPersonaExtraAttributes;
        this.syncAttributes()
        this.persona.extra_attributes.id_rol_negocio = Object.values((this.persona.extra_attributes || {}).id_rol_negocio || []);

    }
    /**
     * Syncs extra attributes in both notations 
     * e.g. persona[extra-attributes->comuna] and persona.extra_attributes.comuna
     */
    syncAttributes() {
        Object.entries(this.persona || {}).forEach(([key, value]) => {
            if (key.startsWith("extra_attributes->")) {
                this.persona.extra_attributes[key.replace("extra_attributes->", "")] = this.persona.extra_attributes[key.replace("extra_attributes->", "")] ?? value;
            }
        });
        Object.entries(this.persona.extra_attributes || {}).forEach(([key, value]) => {
            this.persona[`extra_attributes->${key}`] = this.persona[`extra_attributes->${key}`] ?? value;
        });
    }
    get(key, defaultValue = null) {
        return this.persona[key] || defaultValue
    }
    get mapLink() {
        let { lat, lng, map_link } = this.persona.extra_attributes
        if (map_link) return map_link
        if (lat && lng)
            return encodeURI(`https://www.google.com/maps/search/?api=1&query='${this.persona.direccion}'`)
    }
    get payload() {

        return this.persona
    }
    save_property(frm: HTMLFormElement, remove_label = false) {
        let tokenElement = frm.querySelector('[name="_token"]') as HTMLInputElement
        if (!(tokenElement instanceof HTMLInputElement) || !tokenElement.value) throw new Error('No se encontró el token de seguridad')

        const sanctumToken = document.querySelector('meta[name="test_user_token"]') as HTMLMetaElement;

        /**
         * Let's pick the best token for the task
         */
        const headers = {
            // 'Content-Type': 'application/json; charset=UTF-8',
        };
        if (sanctumToken) {
            headers['Authorization'] = `Bearer ${sanctumToken.content}`
        } else {
            headers['X-CSRF-TOKEN'] = `${tokenElement.value}`
        }
        const propfields = new FormData(frm as HTMLFormElement);

        propfields.delete('negocio-id_etapa_negocio');
        propfields.delete('modal_etapas');

        //@ts-ignore
        return fetch(frm.action, {
            method: String(propfields.get('_method') || 'POST'),
            headers,
            body: propfields
        }).then(res => res.json())
            .then(async jsonRes => {

                return jsonRes;
            })
    }

    get changed() {
        let changed = new Map();
        for (let [key, value] of Object.entries(this.persona)) {
            let cleanKey = key // this.getCleanKey(key as composite_field)
            let initialValue = this.persona[key]// this.initial.get(cleanKey);
            if (initialValue === null && !value) continue
            if (initialValue != value) {
                changed.set(cleanKey, value);
            }
        }
        return Object.fromEntries(changed);
    }




}

Object.defineProperty(PersonaStore.prototype, 'init', { enumerable: true });
