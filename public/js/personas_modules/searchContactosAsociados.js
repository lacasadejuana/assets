/// <reference types="alpinejs" />
import TomSelect from 'tom-select';
export const searchContactosAsociados = (contactosArray, token) => ({
    contactosArray: Array.isArray(contactosArray) ? contactosArray : String(contactosArray || '').split(','),
    capitalize(s) {
        if (typeof s !== 'string')
            return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    },
    showEveryone: false,
    formatName(item) {
        return (item.name || item.nombre_completo).toLowerCase().split(' ')
            .map(i => this.capitalize(i.trim())).join(' ').trim();
    },
    get id_rol_negocio() {
        return this.$store.roles_negocio.current;
    },
    set id_rol_negocio(id_rol_negocio) {
        this.$store.roles_negocio.current = id_rol_negocio;
    },
    id_persona: null,
    id_negocio: null,
    contactToRemove: {},
    roleToRemove: {},
    token,
    data() {
        return {
            contactToRemove: {},
            roleToRemove: {},
        };
    },
    submitContactRemoval(contact, role, pivot_id) {
        let { id_negocio, id_persona, id_rol_negocio } = contact.pivot, nombre_completo = contact.nombre_completo;
        let payload = { id_negocio, id_persona, id_rol_negocio };
        if (confirm(`${nombre_completo} dejará de tener rol "${role.name}" en este negocio`)) {
            return fetch(location.origin + '/negocio/eliminarContacto/' + id_negocio, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': this.token,
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            }).then(res => res.json())
                .then(res => {
                if (res.success) {
                    console.warn({ payload });
                }
                let tablaContactos = window.tablaContactos;
                let fila = tablaContactos.row('#contact_row_' + pivot_id);
                fila.remove().draw();
            });
        }
    },
    submitContacto(negocio_id) {
        window.submitContactRemoval = this.submitContactRemoval;
        let id_negocio = negocio_id;
        let id_persona = this.id_persona || this.$store.theform.properties.id_persona;
        let id_rol_negocio = this.id_rol_negocio;
        console.info({ id_negocio, id_persona, id_rol_negocio });
        return fetch(location.origin + '/negocio/nuevoContacto/' + id_negocio, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': this.token,
                accept: 'application/json',
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                id_negocio,
                buscador_persona: id_persona,
                id_rol_negocio
            })
        }).then(res => res.json())
            .then(res => {
            if (res.success) {
                console.info('Respuesta del servidor:', res);
                this.contactosArray.push(res.data);
                let tablaContactos = window.tablaContactos;
                tablaContactos.draw();
                let contact = {
                    id: res.persona.id,
                    nombre: res.persona.nombre,
                    apellidos: res.persona.apellidos,
                    email: res.persona.email,
                    nombre_completo: res.persona.nombre_completo,
                    pivot: {
                        id_negocio: res.id_negocio,
                        id_persona: res.id_persona,
                        id_rol_negocio: res.role_id,
                        id_button: res.id_pivot,
                    }
                };
                let role = {
                    name: res.role_name,
                };
                this.contactToRemove[res.id_pivot] = contact;
                this.roleToRemove[res.id_pivot] = role;
                let boton = '<button id="contact_btn_' + res.id_pivot + '" class="btn btn-danger btn-block btn-xs" style="height:1.7rem" @click="()=>submitContactRemoval(contactToRemove[' + res.id_pivot + '],roleToRemove[' + res.id_pivot + '], ' + res.id_pivot + ')"><i class="fa fa-trash-alt"></i></button>';
                let fila = tablaContactos.row.add([
                    res.persona.nombre + ' ' + res.persona.apellidos,
                    res.persona.telefono,
                    res.role_name,
                    res.persona.rut,
                    res.persona.email,
                    null,
                    boton
                ]).draw().node();
                $(fila).attr('id', 'contact_row_' + res.id_pivot);
                id_persona = '';
                id_rol_negocio = '';
            }
            else {
                alert(res.message);
            }
        });
    },
    init() {
        setTimeout(() => {
            this.id_negocio = this.$store.theform.properties.id || this.$store.theform.properties.id_negocio;
            globalThis.contactosAsociadosData = this;
            console.info({
                contactosArray: this.contactosArray,
                id_negocio: this.id_negocio,
                id_persona: this.id_persona,
                id_rol_negocio: this.id_rol_negocio
            });
        }, 500);
    },
    initContactsTomSelect($el) {
        if (this.tomselect)
            return;
        console.info({ contactosArray });
        const url = (term, arrayContactos, id_rol_negocio) => {
            const href = new URL(location.origin + '/persona/searchByName');
            href.search = new URLSearchParams({
                term,
                _type: 'query',
                q: term,
                contactosArray: arrayContactos,
                id_rol_negocio
            }).toString();
            return href;
        };
        this.tomselect = new TomSelect($el, {
            valueField: 'id',
            labelField: 'name',
            //plugins: ['clear_button'],
            searchField: ['name', 'email', 'nombre_completo'],
            items: this.id_persona,
            render: {
                item: (item, escape) => {
                    var name = this.formatName(item);
                    return `<div>${(name ? `<span class="name">${escape(name)}</span>` : '')}</div>`;
                },
                option: (item, escape) => {
                    console.log({ item });
                    var name = this.formatName(item);
                    var label = name || item.email;
                    var caption = name ? item.email : null;
                    return `<div><span class="label">${escape(label)}</span>` +
                        (caption ? `<span class="caption fs-09em  text-gray-600">${escape(caption)}</span>` : '')
                        + '</div>';
                }
            },
            shouldLoad: (query) => {
                console.log(query);
                return query.length >= 3;
            },
            // fetch remote data
            load: (query, callback) => {
                var self = this;
                if (self.loading > 1 || query.length < 2) {
                    console.log('debounce');
                    //@ts-ignore
                    callback();
                    return;
                }
                query = query.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
                fetch(url(query, this.contactosArray, this.id_rol_negocio || ''))
                    .then(response => response.json())
                    .then(json => {
                    console.log(callback);
                    //@ts-ignore
                    callback(json.results);
                }).catch((err) => {
                    console.error(err);
                    //@ts-ignore
                    callback();
                });
            }
        });
    }
});
export default searchContactosAsociados;
//# sourceMappingURL=searchContactosAsociados.js.map