import TomSelect from 'tom-select';
const moment = globalThis.moment;
export const searchContactOnDealCreation = ({ comentario_propietario, contacto_apellido, contacto_email, contacto_nombre, contacto_telefono, fecha_esperada_venta, propiedad_comuna, propiedad_direccion, propiedad_numero, propiedad_tipo, propiedad_lat, propiedad_lng, valor_esperado_venta, tipo_negocio, como_llegaste_a_nosotros, id_persona, comunasStgo, }) => ({
    tomselect: null,
    async init() {
        globalThis.searchContactOnDealCreationInstance = this;
        this.initContactsTomSelect(document.querySelector('[name=id_persona]'));
    },
    loading: false,
    comunasStgo,
    negocio: {
        comentario_propietario,
        como_llegaste_a_nosotros,
        contacto_apellido,
        contacto_email,
        contacto_nombre,
        contacto_telefono,
        fecha_esperada_venta,
        id_persona,
        propiedad_comuna,
        propiedad_direccion,
        propiedad_lat,
        propiedad_lng,
        propiedad_numero,
        propiedad_tipo,
        tipo_negocio,
        valor_esperado_venta
    },
    get selected() {
        return this.negocio.id_persona ? [{
                id: this.negocio.id_persona,
                name: this.negocio.contacto_nombre,
                nombre: this.negocio.contacto_nombre,
                nombre_completo: this.negocio.contacto_nombre + ' ' + this.negocio.contacto_apellido,
                email: this.negocio.contacto_email,
            }] : [];
    },
    capitalize(s) {
        if (typeof s !== 'string')
            return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    },
    formatName(item) {
        console.log({ item });
        return (item.name || item.nombre || item.nombre_completo).toLowerCase().split(' ')
            .map(i => this.capitalize(i.trim()))[0].trim();
    },
    get options() {
        if (!this.tomselect || !this.tomselect.options)
            return [];
        return Object.values(this.tomselect.options);
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
            //controlInput: this.$refs.contacto_nombre,
            plugins: ['clear_button'],
            onChange: (id_persona) => {
                const persona = self.options.find(({ id }) => id == id_persona);
                let { nombre, apellidos, rut, email, telefono } = persona || {};
                console.log({ id_persona, persona });
                self.negocio.contacto_nombre = nombre || '';
                self.negocio.id_persona = id_persona;
                self.negocio.contacto_apellido = apellidos || '';
                self.negocio.contacto_email = email || '';
                self.negocio.contacto_telefono = telefono || '';
            },
            searchField: ['nombre', 'apellidos', 'nombre_completo', 'email'],
            items: [id_persona],
            options: this.selected,
            render: {
                option_create: function (data, escape) {
                    return '<div style="font-size:1.1em;" class="text-gray-700 py-2 create">Nuevo contacto:  <strong>' + escape(data.input) + '</strong>&hellip;</div>';
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
                query = query.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
                fetch(url(query))
                    .then(response => response.json())
                    .then(json => {
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
export default searchContactOnDealCreation;
//# sourceMappingURL=searchContactOnDealCreation.js.map