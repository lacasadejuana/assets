import TomSelect from 'tom-select';
export const contactosAutocompleter = (token, id_rol_negocio) => ({
    capitalize(s) {
        if (typeof s !== 'string')
            return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    },
    formatName(item) {
        return (item.name || item.nombre_completo).toLowerCase().split(' ')
            .map(i => this.capitalize(i.trim())).join(' ').trim();
    },
    get id_rol_negocio() {
        return id_rol_negocio || this.$store.roles_negocio.current;
    },
    id_persona: null,
    token,
    init() {
        setTimeout(() => {
            globalThis.contactosAutocompleterInstance = this;
        }, 500);
    },
    initContactsTomSelect($el) {
        if (this.tomselect)
            return;
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
            searchField: ['name', 'email'],
            items: this.id_persona,
            render: {
                item: (item, escape) => {
                    var name = this.formatName(item);
                    return `<div>${(name ? `<span class="name">${escape(name)}</span>` : '')}</div>`;
                },
                option: (item, escape) => {
                    var name = this.formatName(item);
                    var label = name || item.email;
                    var caption = name ? item.email : null;
                    return `<div><span class="label">${escape(label)}</span>` +
                        (caption ? `<span class="caption fs-09em italic text-gray-600">${escape(caption)}</span>` : '')
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
                    //@ts-ignore
                    callback();
                    return;
                }
                query = query.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
                fetch(url(query, this.contactosArray, this.id_rol_negocio || ''))
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
//# sourceMappingURL=contactosAutocompleter.js.map