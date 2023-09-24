/// <reference types="alpinejs" />
import TomSelect from 'tom-select';
import { VInputTypeIcons } from '../components/alpine_definitions';
var formatName = function (item) {
    return ((item.first || '') + ' ' + (item.last || '')).trim();
};
/**
 *Displays the multi-column widget to pick columns
 * @param columnas_visibles
 * @returns
 */
export const filterColumnasDisponibles = (columnas_visibles) => ({
    tomselect: null,
    items: [...Object.values([...columnas_visibles])],
    get columnDefs() {
        return this.$store.columnas_actuales.columnDefs;
    },
    get columnIds() {
        return this.$store.columnas_actuales.columnIds;
    },
    get default_columns() {
        return this.$store.columnas_actuales.default_columns;
    },
    get filter_columns() {
        return this.$store.active_filter.columnas_visibles;
    },
    init() {
        globalThis.columnasDisponiblesInstance = this;
        this.$store.active_filter.controls.set('columnas_disponibles_control', this);
        //this.tomselect.clearActiveItems();
        this.onTomSelectReady(() => {
            this.$watch('filter_columns', (newVal, oldVal) => {
                newVal = newVal.map(c => String(c));
                oldVal = oldVal.map(c => String(c));
                let added = newVal.filter(c => oldVal.indexOf(c) === -1), removed = oldVal.filter(c => newVal.indexOf(c) === -1);
                if (!added.length && !removed.length) {
                    return;
                }
                removed.forEach(element => {
                    //this.tomselect.removeItem(element)
                });
                //this.tomselect.addItems(added)
                console.warn('filter_columns changed', {
                    added,
                    removed,
                });
                this.$store.active_filter.sync_columnas_actuales();
            });
        });
        this.$store.active_filter.once('ready').then(() => {
            //@ts-ignore
            this.initializeTomSelect();
        });
    },
    tap(callback) {
        callback(this);
        return this;
    },
    onTomSelectReadyHandlers: [],
    onTomSelectReady(handler) {
        return this.tap(() => this.tomselect ? handler(this.tomselect) : this.onTomSelectReadyHandlers.push(handler));
    },
    tomSettings(tomOptions) {
        if (!this.$store.columnas_actuales.ready)
            throw new Error('columnas_visibles not ready');
        let options = [...Object.values(this.options)];
        return {
            allowEmptyOption: true,
            plugins: ['drag_drop', 'optgroup_columns'],
            //@ts-ignore
            optgroups: Alpine.store('campos_busqueda').optgroups,
            optgroupField: 'group',
            optgroupLabelField: 'name',
            optgroupValueField: 'group',
            lockOptgroupOrder: true,
            valueField: 'id',
            labelField: 'name',
            maxOptions: 400,
            onChange: (columnasVisibles, other) => {
                let input = document.querySelector('#columnas_visibles-ts-control');
                //@ts-ignore
                /*this.$store.active_filter.columnas_actuales = columnasVisibles.map(c => {
                    let { slug_name, visible = true, id } = this.$store.active_filter.columnas_actuales.find(col => col.id == c)
                        || this.$store.campos_busqueda.get(c) || this.$store.columnas_actuales.get(c)
                    return {
                        id,
                        visible,
                        slug_name
                    }
                })*/
                if (input)
                    input.value = '';
            },
            onLoad: (data) => {
                console.info('tomSelect onLoad', data);
            },
            //@ts-ignore
            options,
            items: [],
            searchField: ['slug_name', 'name', 'group'],
            render: {
                optgroup_header: function (data, escape) {
                    return `<div class=\'optgroup-header bg-gray-100 fw-500 py-2 text-black -translate-y-2 \'>${escape(data.name)}</div>`;
                },
                /*   option: function (data, escape) {
     
                       return `<div data-selectable="" data-value="${data.slug_name},${data.attr_type}" class="option" role="option"  >${escape(data.name)}</div>`
     
                   },*/
                option: function (data, escape) {
                    let { id_input_type, input_type, disabled } = data, typeclass = `input-type-${id_input_type}`, icon = VInputTypeIcons[id_input_type];
                    if (!icon)
                        icon = 'fas fa-question';
                    let tooltip = disabled ? ` x-tooltip.theme.light.raw="El campo viene incluído por defecto" ` : '';
                    return `<div data-icon="${escape(icon)}" data-selectable="${!disabled}" ${tooltip} data-value="${data.id}" class=" ${input_type} ${disabled ? 'xpointer-events-none' : ''}  ${typeclass} option" role="option"  ><i class="${icon} mr-2 fs-09rem"></i> ${escape(data.name)}</div>`;
                },
                item: function (data, escape) {
                    data.name = escape(data.name);
                    data.message = data.name;
                    let { id, name, is_default, id_input_type } = data;
                    let icon = VInputTypeIcons[id_input_type];
                    return `<div x-data="selectedFieldSlugs(${id},${is_default})"   :title="campo.name"
                        class=" my-1 mx-2  item_columnas_visibles" :class="{
                         
                         'bg-white' :  is_visible,
                         

                         'text-gray-800':!is_default && is_visible,
                         'text-black':is_default && is_visible,
                         'text-gray-500':  !is_visible,

                         'border-gray-300':!is_visible,
                         
                      'is_default':is_default,

                    }" :style="{
                        'font-weight': is_default ? '400' : 'normal',
                        'border': is_visible ? '1px solid #e2e8f0' : '1px solid #777' 
                    }">
        
        
                <div   :class="{
                    'column_item': true
                    
                     
                }" 
                x-on:contextmenu="($event)=>preventDefault($event)" 
                 
                 x-tooltip.on.contextmenu="xtooltip" ><i class="${icon} mr-2 fs-1rem"></i> ${name}</div>
              </div>`;
                },
                ...tomOptions
            }
        };
    },
    get storeReference() {
        return (this.$store.active_filter || {}).properties || {};
    },
    initializeTomSelect() {
        //this.items = this.items.filter(id => !this.$store.campos_busqueda.no_seleccionables.map(c => c.id).includes(id))
        if (this.tomselect) {
            return;
        }
        return Promise.all([
            this.$store.columnas_actuales.once('ready'),
            this.$store.active_filter.once('ready')
        ]).then(() => {
            //console.info({ optsVisibles: this.tomSettings.options, optgroups: this.tomSettings.optgroups })
            this.tomselect = new TomSelect(this.$el, this.tomSettings({ items: this.items }));
            this.tomselect.on('item_add', (value, item) => {
                // console.info({ item_add: value });
                this.storeReference.columnas_visibles = this.storeReference.columnas_visibles || [];
                let { id, slug_name, visible = true } = this.$store.columnas_actuales.get(value) || this.$store.campos_busqueda.get(value);
                //   console.log('item_add', { id, slug_name, visible })
                let position = this.$store.active_filter.columnas_visibles.indexOf(id);
                if (position === -1) {
                    this.storeReference.columnas_visibles.push(value);
                    this.$store.active_filter.onReady().then(() => {
                        this.$store.active_filter.columnas_actuales.push({ id, slug_name, visible });
                    });
                }
            });
            this.tomselect.on('item_remove', (value, item) => {
                //console.info({ item_remove: value });
                this.storeReference.columnas_visibles = this.storeReference.columnas_visibles || [];
                let position = this.$store.active_filter.columnas_visibles.indexOf(Number(value));
                this.storeReference.columnas_visibles = this.storeReference.columnas_visibles.filter((v) => v !== value);
                this.$store.active_filter.onReady().then(() => {
                    this.$store.active_filter.columnas_actuales = this.$store.active_filter.columnas_actuales.filter(c => c.id != value);
                });
                // console.info('onItemRemove', value, position)
            });
            while (this.onTomSelectReadyHandlers.length) {
                let handler = this.onTomSelectReadyHandlers.shift();
                handler(this.tomselect);
            }
            setTimeout(() => this.resetSelectedOptions(this.$store.active_filter.columnas_visibles), 300);
        }).then(() => {
            this.$store.columnas_actuales.on('columns_updated', () => {
                this.resetSelectedOptions(this.$store.active_filter.columnas_visibles);
            });
        });
        globalThis.columnas_disponibles_control = this;
    },
    get options() {
        return this.campos_busqueda
            //   .filter(c => !this.$store.campos_busqueda.slugs_no_seleccionables.includes(c.slug_name))
            .map(c => {
            let disabled;
            let { id, name, id_input_type, group, attr_type, input_type, related_model, slug_name, is_default } = c;
            if (this.$store.campos_busqueda.slugs_no_seleccionables.includes(slug_name))
                disabled = true;
            return {
                //...c,
                id_input_type,
                slug_name,
                id,
                value: id,
                name: name.replace(/^F\./, 'F '),
                attr_type,
                input_type,
                related_model: (related_model || '').replace('App\\Models\\', ''),
                disabled,
                group,
                is_default
            };
        });
    },
    get campos_busqueda() {
        //@ts-ignore
        return this.$store.campos_busqueda.properties;
    },
    resetSelectedOptions(columnas_visibles) {
        //@ts-ignore
        let new_columnas_visibles = (Array.isArray(columnas_visibles)
            ? columnas_visibles.join(',')
            : columnas_visibles).split(',')
            .map(id => this.$store.campos_busqueda.get(Number(id)));
        let visible_slugs = new_columnas_visibles.filter(c => c).map(c => c.slug_name), default_slugs = this.default_columns.map(c => c.slug_name), items = this.default_columns.filter(c => !visible_slugs.includes(c.slug_name))
            .map(c => {
            c.is_default = true;
            return c;
        }).concat(new_columnas_visibles)
            .filter(col => col)
            .map(col => {
            if (default_slugs.includes(col.slug_name))
                col.is_default = true;
            return col;
        });
        this.onTomSelectReady(() => {
            if (this.tomselect)
                this.tomselect.clear();
            setTimeout(() => {
                this.tomselect.addItems(items.map(c => c.id));
            }, 100);
        });
    },
});
export default filterColumnasDisponibles;
//# sourceMappingURL=filter_columnas_disponibles.js.map