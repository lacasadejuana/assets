import { inferDireccionAndPropietario } from '../../components';
import { waitFor } from '../../components/plugins';
import { BaseClass } from '../../components/stores';
export class DummyNegocio extends BaseClass {
    constructor(negocio, slugs = []) {
        super();
        this.className = 'DummyNegocio';
        this.savingPromise = null;
        this.initial = new Map();
        this.savingMessage = '';
        this.slugs = slugs || Object.keys(negocio);
        this.id = negocio.id;
        this.tipo_negocio = negocio.tipo_negocio;
        this.tipo_propiedad = negocio.tipo_propiedad;
        this.etapa_negocio = negocio.etapa_negocio;
        this.id_tipo_negocio = negocio.id_tipo_negocio;
        this.id_tipo_propiedad = negocio.id_tipo_propiedad;
        this.id_etapa_negocio = negocio.id_etapa_negocio;
        this.searchstring = negocio.searchstring;
        this.thumbnail = negocio.thumbnail;
        //@ts-ignore
        this.timestamp = Number(new Date(negocio.timestamp).getTime() / 1000).toFixed(0);
        this.fecha_creacion_visual = String(negocio.fecha_creacion_visual ?? (this.fechaCreacion ?? (negocio.created_at ?? (negocio._extra_props || {}).created_at)));
        this.fecha_creacion_visual = this.fechaCreacion = this.fecha_creacion = this.created_at = this.fecha_creacion_visual.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1');
        //@ts-ignore
        let { propietario, direccion } = inferDireccionAndPropietario(negocio.nombre);
        this.propietario = propietario;
        this.address = direccion;
        this._negocio = negocio;
        this.controls = new Map();
        let negocioNormalized = negocio;
        if (slugs) {
            negocioNormalized = slugs ? slugs.reduce((accum, slug_name) => {
                accum[slug_name] = negocio[slug_name];
                this[slug_name] = negocio[slug_name];
                return accum;
            }, {}) : negocio;
        }
        this.initial = new Map(Object.entries(negocioNormalized));
        this._extra_props = Object.keys(negocio).filter(key => !Object.keys(negocioNormalized).includes(key)).reduce((accum, key) => {
            accum[key] = negocio[key];
            return accum;
        }, {});
    }
    populateFromAddress() {
        this.direccion = this.direccion || this.address;
    }
    match(criteria) {
        return Object.entries(criteria).every(([key, value]) => {
            return this[key] === value;
        });
    }
    get(slug_name) {
        return this[slug_name];
    }
    getWithExtra(slug_name) {
        return this[slug_name] || this._extra_props[slug_name];
    }
    get changes() {
        let dirty = {};
        for (let [slug_name, value] of this.initial) {
            let current = (typeof this[slug_name] === 'string' && String(this[slug_name]).trim() === '') ? null : this[slug_name];
            if (value != current) {
                dirty[slug_name] = this[slug_name];
            }
        }
        return dirty;
    }
    printChanges() {
        let changes = [];
        for (let [slug_name, value] of this.initial) {
            let current = (typeof this[slug_name] === 'string' && String(this[slug_name]).trim() === '') ? null : this[slug_name];
            if (value != current) {
                changes.push({ slug_name, initial: value, current });
            }
        }
        console.table(changes);
    }
    get saveable_properties() {
        let { nombre, id, fechaCreacion, lat, lng, id_etapa_negocio, fecha_creacion_visual, ...properties } = this.slugs.reduce((accum, slug) => {
            accum[slug] = this[slug];
            return accum;
        }, {});
        return properties;
    }
    get editable_inputs() {
        return this.$store.columnas_actuales.columnDefs.filter(c => c.editable && Object.keys(this.saveable_properties)
            .includes(c.slug_name));
    }
    get negocio() {
        return this;
    }
    set negocio(value) {
        console.log('set negocio', value);
        throw new Error('No se puede modificar el negocio');
    }
    toJSON() {
        return this.negocio;
    }
    shown_value(slug_name) {
        return this.$store.campos_busqueda.getShownValue(this, slug_name);
    }
    set(slug_name, value, verbose = true) {
        if (verbose) {
            console.trace('Setting', slug_name, 'to', value);
        }
        else {
            console.log('Setting', slug_name, 'to', value);
        }
        this[slug_name] = value;
        return this;
    }
    init() {
        //console.log(`init negocio ${this.id}`, { negocio: this._negocio })
    }
    toFeature() {
        throw new Error('not implemented');
    }
    async validateInputs({ property }) {
        let currentValue = this[property];
        let campo = this.$store.columnas_actuales.find(property);
        if (!campo)
            return Promise.reject(new Error('no se encontró el campo:' + property));
        let canBeEdited = (campo.editable || (this.$store.columnas_actuales.isContact(campo.id_input_type) && currentValue === null));
        if (!canBeEdited) {
            console.warn(campo);
            return Promise.reject(new Error('Propiedad no editable: ' + property));
        }
        let prefixed_property = [campo.attr_type, property].join('.');
        return { prefixed_property };
    }
    async setProperty(property, value) {
        throw new Error('not implemented');
    }
    syncInitialValues() {
        return this.$store.columnas_actuales.columnDefs.filter(c => c.editable && !c.readonly && Object.keys(this.saveable_properties).includes(c.slug_name)).map(c => c.slug_name).reduce((accum, slug_name) => {
            let property_sample = this.$store.negocios.checked.map(n => n[slug_name]);
            let property_set = new Set(property_sample);
            if (property_set.size === 1) {
                accum[slug_name] = property_sample[0];
                this.set(slug_name, property_sample[0], false);
                this.initial.set(slug_name, property_sample[0]);
            }
            else {
                this.set(slug_name, null, false);
                this.initial.set(slug_name, null);
            }
            return accum;
        }, {});
    }
    get modalTitle() {
        return this.savingMessage ? this.savingMessage : `Editando ${this.$store.negocios.checked.length} negocios`;
    }
    async save(mock = false) {
        if (Object.keys(this.changes).length === 0 && !mock) {
            console.log('no hay cambios');
            return;
        }
        //@ts-ignore
        if (this.changes.id_etapa_negocio)
            return globalThis.cambio_etapa_check({ id: this.id, id_etapa_negocio: this.changes.id_etapa_negocio });
        let changes = await Object.entries(this.changes).reduce(async (accum, [property, value]) => {
            accum = await accum;
            let campo = this.$store.columnas_actuales.find(property);
            if (!campo)
                return accum;
            let prefixed_property = [campo.attr_type, property].join('.');
            accum[prefixed_property] = value;
            return accum;
        }, {});
        console.zinfo('changes', changes);
        let totalChecked = this.$store.negocios.checked.length, saved = 0;
        for (let negocio of this.$store.negocios.checked) {
            Object.entries(this.changes).forEach(([property, value]) => {
                if (/^\d+$/.test(String(value)))
                    value = Number(value);
                negocio[property] = value;
                console.log('set', property, value);
            });
            await waitFor(1000);
            this.savingMessage = `Guardando negocio ${saved++} de ${totalChecked}`;
            console.log(this.savingMessage, this.modalTitle);
            await negocio.save().catch((err) => {
                console.warn(err);
            }).finally(() => {
                negocio.checked = false;
            });
        }
        this.savingMessage = '';
        Object.entries(this.changes).forEach(([property, value]) => {
            this[property] = this.initial[property];
        });
        return;
    }
}
//# sourceMappingURL=DummyNegocio.js.map