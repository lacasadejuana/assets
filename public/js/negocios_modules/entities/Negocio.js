import { openToast } from '../../components/openToast';
import { DummyNegocio } from './DummyNegocio';
import { ifDefined } from '../../components';
import { tap } from '../../components/plugins';
export class Negocio extends DummyNegocio {
    constructor(negocio, slugs = []) {
        super(negocio, slugs);
        this.className = 'Negocio';
        this.savingPromise = null;
        this.initial = new Map();
        this._checked = false;
        let negocioNormalized = negocio;
        if (slugs) {
            negocioNormalized = slugs
                ? slugs.reduce((accum, slug_name) => {
                    accum[slug_name] = negocio[slug_name];
                    this[slug_name] = negocio[slug_name];
                    return accum;
                }, {})
                : negocio;
            this.searchstring = this.computeSearchString(negocioNormalized);
        }
        if (this._extra_props.created_at) {
            negocioNormalized.created_at = negocioNormalized.fechaCreacion = negocioNormalized.fecha_creacion_visual = String(this._extra_props.created_at).replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1');
        }
        this.initial = new Map(Object.entries(negocioNormalized));
    }
    get checked() {
        return this._checked;
    }
    set checked(checked) {
        if (checked === this._checked)
            return;
        this._checked = checked;
        if (!checked)
            globalThis.alpineBsTable.bsTable.bootstrapTable('uncheckBy', {
                field: 'id',
                values: [this.id],
            });
    }
    computeSearchString(negocioNormalized) {
        return this.slugs
            .reduce((accum, slug) => accum +
            ' ' +
            Alpine.store('campos_busqueda').getShownValue(negocioNormalized, slug), '')
            .normalize('NFD')
            .replace(/\n+/, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase();
    }
    get latitud() {
        return (this.lat || this._extra_props.lat);
    }
    get longitud() {
        return (this.lng || this._extra_props.lng);
    }
    toFeature() {
        const merged_props = { ...this, ...this._extra_props };
        let { 
        //searchstring,
        nombre, id, ...props } = merged_props;
        let geometry = {
            type: 'Point',
            coordinates: [this.longitud, this.latitud],
        };
        let propertyKeys = Object.keys(this.$store.columnas_actuales.featureProperties).concat([
            'nombre',
            'comuna',
            'seudonimo-propiedad',
            'link-img-portada-wordpress',
        ]);
        //@ts-ignore
        let properties = Object.entries(props)
            .filter(([slug_name, value]) => {
            return true || propertyKeys.includes(slug_name);
        })
            .reduce((accum, [slug_name, value]) => {
            accum[slug_name] = this.$store.campos_busqueda.getShownValue(this, slug_name);
            return accum;
        }, {});
        return {
            type: 'Feature',
            id,
            properties,
            geometry,
        };
    }
    async getBarrio() {
        if (!this.latitud || !this.longitud)
            return Promise.reject(new Error('No hay coordenadas'));
        await fetch(`https://workers.lacasadejuana.cl/geo/coords/${this.longitud}/${this.latitud}`);
    }
    get token() {
        //@ts-ignore
        return document.querySelector('[name="_token"]').value;
    }
    async setProperty(property, value) {
        return this.validateInputs({ property })
            .then(({ prefixed_property }) => {
            console.log({
                property,
                from: this[property],
                to: value,
            });
            if (property === 'id_etapa_negocio') {
                this.set('id_etapa_negocio', this.initial.get('id_etapa_negocio'));
                return globalThis.cambio_etapa_check({
                    id: this.id,
                    id_etapa_negocio: value,
                });
            }
            if (!this.savingPromise) {
                this.savingPromise = globalThis.patchNegocio({
                    id: this.id,
                    [prefixed_property]: value,
                }, true);
            }
            if (this[property] === value) {
                this.savingPromise = null;
                return true;
            }
            return this.savingPromise.then((result) => {
                if (!result)
                    return false;
                //@ts-ignore
                openToast({
                    type: 'success',
                    text: 'Se ha actualizado el campo ' + property,
                    description: 'en el Negocio ' + this.id,
                    delay: 2000,
                });
                this[property] = value;
                this.savingPromise = null;
                return true;
            });
        })
            .catch((err) => {
            //@ts-ignore
            openToast({
                type: 'error',
                text: 'No se pudo actualizar el negocio ' + this.id,
                description: err.message,
                delay: 2000,
            });
            this.savingPromise = null;
            return false;
        });
    }
    /**
     * There's no campo_busqueda for "region" but this method handles it in case it's needed in the future
     * @param param0
     * @returns
     */
    async saveAddress({ lat, lng, direccion, comuna, region }) {
        let changes = await Object.entries({ lat, lng, direccion, comuna }).reduce(async (accum, [property, value]) => {
            accum = await accum;
            let campo = this.$store.campos_busqueda.find(property);
            if (!campo)
                return accum;
            let prefixed_property = [campo.attr_type, property].join('.');
            accum[prefixed_property] = value;
            return accum;
        }, {});
        console.log(changes);
        if (!this.savingPromise) {
            this.savingPromise = globalThis.patchNegocio({
                id: this.id,
                ...changes,
            }, true);
        }
        return this.savingPromise
            .then((result) => {
            if (!result)
                return false;
            //@ts-ignore
            openToast({
                type: 'success',
                text: `Se actualizó el negocio ${this.id}`,
                description: '(dirección, comuna y coordenadas)',
                delay: 2000,
            });
            Object.entries({ lat, lng, direccion, comuna }).forEach(([property, value]) => {
                this[property] = value;
                this.initial.set(property, value);
            });
            this.savingPromise = null;
            return true;
        })
            .catch((err) => {
            //@ts-ignore
            openToast({
                type: 'error',
                text: 'No se pudo actualizar el negocio ' + this.id,
                description: err.message,
                delay: 2000,
            });
            this.savingPromise = null;
            return false;
        });
    }
    async save() {
        if (Object.keys(this.changes).length === 0) {
            console.log('Negocio ' + this.id + ': no hay cambios');
            return;
        }
        //@ts-ignore
        if (this.changes.id_etapa_negocio)
            return globalThis.cambio_etapa_check({
                id: this.id,
                //@ts-ignore
                id_etapa_negocio: this.changes.id_etapa_negocio,
            });
        let changes = await Object.entries(this.changes).reduce(async (accum, [property, value]) => {
            accum = await accum;
            let campo = this.$store.columnas_actuales.find(property);
            /**
             * Discard changes to tipo negocio or tipo propiedad if current etapa negocio
             * has reached "Firma de contrato de servicio"
             */
            if (['id_tipo_negocio', 'id_tipo_propiedad'].includes(campo.slug_name) &&
                this.id_etapa_negocio >= 3)
                return accum;
            if (!campo)
                return accum;
            let prefixed_property = [campo.attr_type, property].join('.');
            accum[prefixed_property] = value;
            return accum;
        }, {});
        console.log(changes);
        if (!this.savingPromise) {
            this.savingPromise = globalThis.patchNegocio({
                id: this.id,
                ...changes,
            }, true);
        }
        return this.savingPromise
            .then((result) => {
            if (!result)
                return false;
            //@ts-ignore
            openToast({
                type: 'success',
                text: `Se actualizó el negocio ${this.id}`,
                delay: 2000,
            });
            Object.entries(this.changes).forEach(([property, value]) => {
                this[property] = value;
                this.initial.set(property, value);
            });
            this.savingPromise = null;
            return true;
        })
            .catch((err) => {
            //@ts-ignore
            openToast({
                type: 'error',
                text: 'No se pudo actualizar el negocio ' + this.id,
                description: err.message,
                delay: 2000,
            });
            this.savingPromise = null;
            return false;
        });
    }
    submitContacto(slug_name, id_persona) {
        let id_negocio = this.negocio.id;
        let campo = this.$store.columnas_actuales.find(slug_name);
        if (!campo)
            return Promise.reject(new Error('No se encontró el campo: ' + slug_name));
        let id_rol_negocio = campo.id_rol_negocio;
        if (!id_rol_negocio)
            return Promise.reject(new Error('No se encontró el rol negocio del campo ' + slug_name));
        const nombreRol = ifDefined(this.$store.roles_negocio, (rolesStore) => rolesStore.get(Number(id_rol_negocio)).name);
        console.info({ id_negocio, id_persona, id_rol_negocio });
        return fetch(location.origin + '/negocio/nuevoContacto/' + this.id, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': this.token,
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_negocio,
                buscador_persona: id_persona,
                id_rol_negocio,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
            return tap(res, (res) => openToast({
                type: res.type || 'warning',
                text: 'Se modificó un contacto del negocio ' + this.id,
                from: 'submitContacto',
                description: 'rol ' + nombreRol,
                delay: 2000,
            }));
        });
    }
}
//# sourceMappingURL=Negocio.js.map