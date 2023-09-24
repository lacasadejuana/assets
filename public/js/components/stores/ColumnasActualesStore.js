//ColumnaVisible
import { VInputType, bindConsole } from "@lacasadejuana/types";
import { v4 as uuidv4 } from 'uuid';
import { defaultSlugs } from "../alpine_definitions/OptionGroups";
import { decorateCampo } from '../decorators/decorateCampo';
import { NegocioColumn } from '../entities/NegocioColumn';
import { CamposBusquedaStore } from './CamposBusquedaStore';
export class ColumnasActualesStore extends CamposBusquedaStore {
    constructor() {
        super();
        this.className = 'ColumnasActualesStore';
        this.id = uuidv4();
        this.timerColor = 'color:emerald;font-weight:bold';
        this.classNameColor = 'color:darkcyan;font-weight:bold;';
        this.ready = false;
        this.classNameColor = 'color:darkcyan;font-weight:bold;';
        this.timerColor = 'color:emerald;font-weight:bold;';
        this._console = bindConsole(this.className, this.classNameColor);
        this.previouslyInvisible = ['id', 'fecha_creacion_visual', 'fechaCreacion'];
    }
    init() {
        this.marquee(' init store ' + this.classNameColor);
    }
    get columnDefs() {
        return this.properties;
    }
    set columnDefs(campos_busqueda) {
        this.properties = campos_busqueda;
    }
    setDefaultColumns(default_columns) {
        this.default_columns = Array.from(new Set(default_columns));
        return this;
    }
    get active_filter() {
        return Alpine.store('active_filter');
    }
    get columnVisibility() {
        return this.columnDefs.reduce((acc, col) => {
            acc[col.slug_name] = !!col.visible;
            return acc;
        }, {});
    }
    get sortedColumnDefs() {
        return this.columnDefs.slice(0).sort((a, b) => Number(a.position ?? 19) - Number(b.position ?? 19));
    }
    reloadCampos(columnas_visibles, reset = false) {
        // don't accept empty arrays as input
        if (columnas_visibles.length === 0)
            return this.columnDefs;
        /**
         *
         */
        this.columnas_visibles = Array.from(new Set(columnas_visibles.filter(c => !defaultSlugs.includes(c.slug_name))));
        let visible_slugs = this.columnas_visibles.map(c => c.slug_name), default_slugs = this.default_columns.map(c => c.slug_name);
        let properties = this.$store.campos_busqueda.findMany(Array.from(new Set(default_slugs.filter(c => !visible_slugs.includes(c)).concat(visible_slugs))));
        //console.info({ visible_slugs, default_slugs })
        this.properties = (this.default_columns || [])
            /**
             * Select among the default columns those that aren't already in the visible slugs subset
             * and mark them as default
             */
            .filter(c => !visible_slugs.includes(c.slug_name))
            .map((c, index) => {
            c.is_default = true;
            c.position = index;
            if (['created_at', 'fechaCreacion', 'fecha_creacion_visual'].includes(c.slug_name))
                c.position = 3 + index;
            return c;
        }).concat(this.columnas_visibles.map((c, index) => {
            c.position = index + this.default_columns.length;
            return c;
        }))
            .sort((a, b) => {
            //@ts-ignore
            return a.position - b.position;
        });
        this.properties = this.properties
            .map((col, index) => {
            //@ts-ignore
            let dttCol = this.campos_busqueda.find(col.slug_name) ?? new NegocioColumn(decorateCampo(col));
            if (default_slugs.includes(dttCol.slug_name))
                dttCol.is_default = true;
            //@ts-ignore
            // dttCol.index = index;
            if (col.visible !== undefined) {
                if (['created_at', 'fechaCreacion', 'fecha_creacion_visual'].includes(dttCol.slug_name))
                    col.visible = false;
                dttCol.visible = col.visible;
            }
            if (!this.active_filter || !this.active_filter.columnas_actuales)
                return dttCol;
            let colFiltro = this.active_filter.columnas_actuales.find(c => c.id == dttCol.id);
            if (colFiltro) {
                dttCol.visible = colFiltro.visible;
            }
            if (['created_at', 'fechaCreacion', 'fecha_creacion_visual'].includes(dttCol.slug_name))
                dttCol.visible = false;
            return dttCol;
        });
        this.properties.sort((a, b) => {
            //@ts-ignore
            return a.position - b.position;
        });
        this.marquee('computed properties', this.properties);
        if (!reset)
            this.properties.forEach(c => {
                c.visible = !this.previouslyInvisible.includes(c.slug_name);
                let col = this.campos_busqueda.find(c.slug_name);
                //@ts-ignore
                if (col)
                    col.visible = c.visible;
                if (['created_at', 'fechaCreacion', 'fecha_creacion_visual'].includes(c.slug_name))
                    c.visible = false;
            });
        if (!this.ready) {
            this.ready = true;
            this.once('ready', () => {
                this.syncWithActiveFilter();
                this.marquee(' Finished processings columnas_visibles definition ');
            });
            // This event if fired just once. It signals the moment in which is safe to 
            // rely on the contents of this store
            this.processEventListeners('ready', this);
        }
        // This event fires every time the columnas_visibles definition is updated,
        // for example after changing the default dilter
        this.processEventListeners('columns_updated', this);
        return this.properties;
    }
    get visible_slugs() {
        return this.columnDefs.filter(c => c.visible).map(c => c.slug_name);
    }
    /**
     * @todo since ActiveFilterStore is actually empty the first time this method is called,
     * perhaps the synchronization should happen in the other direction
     */
    syncWithActiveFilter() {
        Promise.all([
            this.once('ready'),
            this.active_filter.once('ready')
        ]).then(() => {
            this.properties = (this.properties || []).map(col => {
                if (!this.active_filter || !this.active_filter.columnas_actuales)
                    return col;
                let colFiltro = this.active_filter.columnas_actuales.find(c => c.id == col.id);
                if (colFiltro) {
                    col.visible = colFiltro.visible;
                }
                if (['created_at', 'fechaCreacion', 'fecha_creacion_visual'].includes(col.slug_name))
                    col.visible = false;
                return col;
            });
            this.processEventListeners('columns_updated', this);
        });
    }
    get campos_busqueda() {
        return Alpine.store('campos_busqueda');
    }
    get defaultSlugs() {
        return this.default_columns.map(c => c.slug_name).concat(defaultSlugs);
    }
    get campos_del_filtro() {
        const discard_default_slugs = this.default_columns.map(c => c.slug_name);
        return this.columnDefs.filter(item => !discard_default_slugs
            .includes(item.slug_name));
    }
    setAllFieldsOn(except = ['id']) {
        this.properties.filter(c => !except.includes(c.slug_name)).forEach(c => c.visible = true);
    }
    setAllFieldsOff() {
        this.properties.forEach(c => c.visible = false);
    }
    printTable() {
        // console.log('this.printTable')
        console.table(this.properties, ['id', 'slug_name', 'position', 'visible', 'editable', 'is_default']);
    }
    refreshInvisibles() {
        this.previouslyInvisible = this.properties.filter(c => !c.visible).map(c => c.slug_name);
        return this;
    }
    /**
     * @returns {Array<string>} the list of slugs for the current set of columns
     */
    get currentSlugs() {
        return [...(this.columnDefs || []).map(c => c.slug_name)];
    }
    isDefaultField(slug_name) {
        return this.defaultSlugs.includes(slug_name);
    }
    /**
     * Non default columns as provided by the backend
     */
    get column_groups() {
        //@ts-ignore
        return Alpine.store('campos_busqueda').optgroups.map(group => {
            return {
                ...group,
                group_options: this.columnDefs
                    .filter(p => p.group === group.id)
            };
        });
    }
    isVisible(slug_name) {
        //@ts-ignore
        let property = this.find(slug_name) || { visible: undefined };
        return property.visible;
    }
    /**
    * Slug name should be only the clean nombre of the field,
    * but this method cleans the postfix in case it was passed a
    * filter campo de busqueda
    *
    * @param {string} slug_name
    * @returns
    */
    find(slug_name) {
        slug_name = slug_name.replace(/^([^,]+),?.*$/, '$1');
        //@ts-ignore
        return this.columnDefs.find(c => c.slug_name === slug_name) || {};
    }
    get(id) {
        return this.columnDefs.find(c => c.id == id);
    }
    has(slug_name) {
        return this.columnDefs.find(c => c.slug_name === slug_name) !== undefined;
    }
    toggle(slug_name) {
        let current_column = this.find(slug_name);
        current_column.visible = !current_column.visible;
        let col = this.campos_busqueda.find(slug_name);
        col.visible = current_column.visible;
    }
    at(index = 0) {
        //@ts-ignore
        return this.columnDefs[index];
    }
    get columnIds() {
        return this.columnDefs.map(c => c.id);
    }
    async moveColumn(oldIndex, newIndex) {
        this.refreshInvisibles();
        this.columnDefs.forEach(c => c.visible = false);
        let moved = this.columnDefs.splice(oldIndex, 1)[0];
        console.info(`%c se ha movido %c${moved.slug_name} %c hasta después de %c ${(this.columnDefs[newIndex - 1] || { name: 'el final' }).slug_name}`, '', 'color:#336699;background-color:#fff;font-weight:bold;', '', `color:#0a0;font-weight:bold;`);
        globalThis.waitFor(100);
        this.columnDefs.splice(newIndex, 0, moved);
        this.columnDefs.forEach(c => {
            c.visible = !this.previouslyInvisible.includes(c.slug_name);
        });
    }
    /**
     * Fields admisible to be shown in the map view info window
     */
    get featureProperties() {
        return this.columnDefs.filter(c => c.id_input_type !== VInputType.INPUT_CHECKBOX && c.id_input_type !== VInputType.INPUT_SELECT_MULTIPLE).reduce((accum, campo) => {
            accum[campo.slug_name.replace('fecha_creacion_visual', 'created_at')] = campo.name.replace(/^F\.\s/, 'Fecha ');
            return accum;
        }, {});
    }
}
export function columnas_actuales() {
    return new ColumnasActualesStore();
}
//# sourceMappingURL=ColumnasActualesStore.js.map