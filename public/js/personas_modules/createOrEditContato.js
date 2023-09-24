import TomSelect from 'tom-select';
import { faker } from '@faker-js/faker';
export const createOrEditContacto = (persona, empresas) => {
    return {
        persona,
        get extra_attributes() {
            return this.persona.extra_attributes || {};
        },
        id: null,
        get form_action() {
            return this.persona.id ? `/persona/${this.persona.id}` : '/persona';
        },
        get form_method() {
            return this.persona.id ? 'PATCH' : 'POST';
        },
        confirmedNewContact: false,
        nombreInputType: 'hidden',
        init() {
            this.id = persona.id || null;
            if (/\d+/.test(this.id)) {
                this.nombreInputType = 'text';
            }
            globalThis.personaForm = this;
            this.persona.extra_attributes = this.persona.extra_attributes || {};
            Object.entries(this.persona || {}).forEach(([key, value]) => {
                if (key.startsWith('extra_attributes->')) {
                    this.persona.extra_attributes[key.replace('extra_attributes->', '')] =
                        this.persona.extra_attributes[key.replace('extra_attributes->', '')] ?? value;
                }
            });
            this.persona.extra_attributes.id_rol_negocio = Object.values((this.persona.extra_attributes || {}).id_rol_negocio || []);
            setTimeout(() => {
                if (this.$el.querySelector('input[name=id]') && !/\d+/.test(this.id)) {
                    this.initContactsTomSelect(this.$el.querySelector('input[name=id]'));
                }
            }, 500);
            this.$watch('extra_attributes', (newVal, oldVal) => {
                Object.entries(newVal || {}).forEach(([key, value]) => {
                    this.persona[`extra_attributes->${key}`] = value;
                });
                //this.persona.extra_attributes.id_rol_negocio = Object.values((this.persona.extra_attributes || {}).id_rol_negocio || []);
            }, { deep: true });
        },
        checkFormValiidation() {
        },
        dv(T) {
            var M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        },
        populateMockData() {
            this.persona["apellidos"] = faker.person.lastName();
            this.persona["direccion"] = faker.address.streetAddress();
            this.persona["email"] = faker.internet.email();
            this.persona["extra_attributes->comuna"] = faker.address.city();
            this.persona.extra_attributes.comuna;
            //this.$el.querySelector('[name="extra_attributes->lng"]').value =
            this.persona["extra_attributes->nacionalidad"] = faker.location.country();
            this.persona.extra_attributes.nacionalidad = faker.location.country();
            this.persona["extra_attributes->telefono_secundario"] = faker.phone.number();
            let dt = new Date();
            dt.setFullYear(1970 + Math.round(Math.random() * 20));
            dt.setMonth(Math.round(Math.random() * 11));
            dt.setDate(Math.round(Math.random() * 28));
            this.persona["fecha_nacimiento"] = dt.toLocaleString('es-CL').slice(0, 10);
            this.persona["nombre"] = faker.person.firstName();
            let rutSinDv = '1' + Math.random().toString(10).slice(3, 10);
            this.persona["rut"] = rutSinDv + '-' + this.dv(Number(rutSinDv));
            this.persona["telefono"] = '+569' + Math.random().toString(10).slice(3, 10);
            this.$store.persona.setProperties(this.persona);
        },
        get formElement() {
            return this.$refs.edit_or_update_contact || this.$el.querySelector('#edit_or_update_contact');
        },
        save() {
            this.$store.persona.setProperties(this.persona);
            this.$store.persona
                .save_property(this.$el.querySelector('#edit_or_update_contact'))
                .then((jsonRes) => {
                console.log({ jsonRes });
                if (jsonRes.success) {
                    this.persona.id = jsonRes.id || jsonRes.persona.id;
                }
            });
        },
        setProperty(key, value) {
            this.persona[key] = value;
            if (key.includes('extra_attributes->')) {
                this.persona.extra_attributes[key.replace('extra_attributes->', '')] = value;
            }
        },
        getProperty(key) {
            return (this.persona[key] ||
                (key.includes('extra_attributes->')
                    ? this.persona.extra_attributes[key.replace('extra_attributes->', '')]
                    : null));
        },
        get nombre_completo() {
            return this.persona.nombre + ' ' + this.persona.apellidos;
        },
        get selected() {
            return this.persona && this.persona.id
                ? [
                    {
                        id: this.persona.id,
                        name: this.persona.nombre,
                        nombre: this.persona.nombre,
                        apellidos: this.persona.apellidos,
                        nombre_completo: this.persona.nombre +
                            ' ' +
                            this.persona.apellidos,
                        email: this.persona.email,
                    },
                ]
                : [];
        },
        capitalize(s) {
            if (typeof s !== 'string')
                return '';
            return s.charAt(0).toUpperCase() + s.slice(1);
        },
        formatName(item) {
            console.log({ item });
            return (item.nombre + ' ' + item.apellidos ||
                item.nombre_completo ||
                item.name ||
                '')
                .toLowerCase()
                .split(' ')
                .map((i) => this.capitalize((i || '').trim()))[0]
                .trim();
        },
        get options() {
            if (!this.tomselect || !this.tomselect.options)
                return [];
            return Object.values(this.tomselect.options);
        },
        get negocios() {
            return ((this.persona || {}).negocios || []).map((negocio) => {
                let rol_negocio = this.$store.roles_negocio.get(negocio.id_rol_negocio);
                if (rol_negocio) {
                    negocio.rol_negocio = rol_negocio.name;
                }
                return negocio;
            });
        },
        initContactsTomSelect($el) {
            if (this.tomselect)
                return;
            const self = this;
            const url = (term) => {
                const href = new URL(location.origin + '/persona/searchByName');
                href.search = new URLSearchParams({
                    term,
                    _type: 'query',
                    q: term,
                    //contactosArray: arrayContactos,
                    //id_rol_negocio
                }).toString();
                return href;
            };
            this.tomselect = new TomSelect($el, {
                valueField: 'id',
                labelField: 'nombre',
                maxItems: 1,
                create: true,
                onOptionAdd: function (option, user_added) {
                    console.log({ option, user_added });
                    if (!user_added)
                        return;
                    option = option.slice(0, 1).toUpperCase() + option.slice(1);
                    self.confirmedNewContact = true;
                    self.nombreInputType = 'text';
                    self.persona.nombre = option;
                    self.persona.id = null;
                },
                //controlInput: this.$refs.contacto_nombre,
                plugins: ['clear_button'],
                onChange: (id_persona, user_added) => {
                    const persona = self.options.find(({ id }) => id == id_persona);
                    if (persona) {
                        let { nombre = '', apellidos = '', rut = '', email = '', negocios = '', telefono = '', direccion = '', created_at = '', empresa_id = '', extra_attributes = {}, } = persona || {};
                        console.log({ id_persona, persona, user_added });
                        self.persona = {
                            ...self.persona,
                            nombre,
                            rut,
                            id_persona,
                            direccion,
                            negocios,
                            apellidos,
                            email,
                            telefono,
                            created_at,
                            empresa_id,
                        };
                        if (extra_attributes &&
                            Object.keys(extra_attributes).length) {
                            self.persona.extra_attributes = {
                                ...self.persona.extra_attributes,
                                ...extra_attributes,
                            };
                            Object.entries(self.persona.extra_attributes || {}).forEach(([key, value]) => {
                                self.persona[`extra_attributes->${key}`] =
                                    value;
                            });
                        }
                        if (id_persona && /\d+/.test(id_persona)) {
                            history.pushState({}, '', `/persona/${id_persona}/edit`);
                        }
                    }
                },
                searchField: [
                    'nombre',
                    'apellidos',
                    'nombre_completo',
                    'email',
                ],
                items: [this.persona.id],
                options: this.selected,
                render: {
                    option_create: function (data, escape) {
                        return '<div style="font-size:1.1em;" class="py-2 create">Nuevo contacto:  <strong>' + escape(data.input) + '</strong>&hellip;</div>';
                    },
                    item: (item, escape) => {
                        var name = this.formatName(item);
                        return `<div>${item.nombre
                            ? `<span class="name">${escape(item.nombre)}</span>`
                            : ''}</div>`;
                    },
                    option: (item, escape) => {
                        var name = escape(item.nombre + ' ' + item.apellidos) ||
                            this.formatName(item);
                        var label = name || item.email;
                        var caption = name ? item.email : null;
                        return (`<div class="flex flex-col"><span class="label">${escape(label)}</span>` +
                            (caption
                                ? `<span class="caption fs-09em italic text-gray-600">${escape(caption)}</span>`
                                : '') +
                            '</div>');
                    },
                },
                shouldLoad: (query) => {
                    console.log(query);
                    return query.length >= 3;
                },
                // fetch remote data
                load: (query, callback) => {
                    var self = this;
                    if (self.loading > 1 || query.length < 2) {
                        //@ts-ignore
                        callback();
                        return;
                    }
                    query = query
                        .normalize('NFD')
                        .replace(/\p{Diacritic}/gu, '')
                        .toLowerCase();
                    fetch(url(query))
                        .then((response) => response.json())
                        .then((json) => {
                        //@ts-ignore
                        callback(json.results);
                    })
                        .catch((err) => {
                        console.error(err);
                        //@ts-ignore
                        callback();
                    });
                },
            });
        },
    };
};
//# sourceMappingURL=createOrEditContato.js.map