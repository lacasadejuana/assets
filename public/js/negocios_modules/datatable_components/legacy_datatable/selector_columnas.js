export const SelectorColumnas = (columnas_actuales) => ({
    /**
    * @returns {string} a.k.a zoom1, zoom2, zoom3, zoom4, zoom5
    */
    get tableZoomClass() {
        return 'tablezoom' + String(Math.min(14, Math.max(7, this.zoom_class))).replace(/^(\d{1})$/, '0$1');
    },
    columnas_actuales: null,
    searchValue: '',
    get filteredFields() {
        if (!this.searchValue)
            return this.columnas_actuales;
        return this.columnas_actuales.filter(c => c.slug_name.includes(this.searchValue));
    },
    get columnIds() {
        return this.$store.columnas_actuales.columnIds;
    },
    refreshColumns() {
        this.columnas_actuales = [];
        this.$nextTick(() => {
            this.columnas_actuales = this.$store.columnas_actuales.columnDefs;
        });
    },
    init() {
        this.refreshColumns();
        this.$watch('columnIds', (newVal, oldVal) => {
            let strNewVal = JSON.stringify(newVal), strOldVal = JSON.stringify(oldVal);
            if (strNewVal && strOldVal)
                return;
            console.log('refreshing columns');
            this.refreshColumns();
        });
        console.log('current zoom_class', this.tableZoomClass);
        this.$watch('tableZoomClass', (newVal, oldVal) => {
            document.querySelector('#negocios_mid_wrapper').classList.remove(oldVal);
            document.querySelector('#negocios_mid_wrapper').classList.add(newVal);
            this.$dispatch('zoom', newVal);
            console.log('new  zoom_class', newVal);
            if (globalThis.readCookie('debug_lcdj') || globalThis.readCookie('zoom_class_lcdj')) {
                globalThis.setCookie('zoom_class_lcdj', this.zoom_class, 365);
            }
        });
        this.$watch('columnas_actuales', (newVal, oldVal) => {
            if (oldVal === newVal)
                return;
            console.log('columnas_actuales', newVal, oldVal);
            /*if (globalThis.readCookie('debug_lcdj')) {
                globalThis.setCookie('savedVisibilityState', JSON.stringify(newVal), 365)
            }*/
        });
        if (globalThis.readCookie('debug_lcdj') || globalThis.readCookie('zoom_class_lcdj')) {
            if (globalThis.readCookie('zoom_class_lcdj')) {
                this.zoom_class = globalThis.readCookie('zoom_class_lcdj');
            }
        }
        if (!localStorage.getItem('savedVisibilityState')) {
            this.savedVisibilityState = this.visibilityMap;
        }
        else {
            this.syncsavedVisibilityState();
        }
        globalThis.selectorColumnasInstance = this;
    },
    toggleField(item) {
        let visibleBefore = item.visible;
        item.visible = !item.visible;
        let itemValue = item.visible ? 'visible' : 'hidden';
        const campo = this.$store.columnas_actuales.columnDefs.find(c => c.slug_name === item.slug_name);
        const campoValue = campo.visible ? 'visible' : 'hidden';
        if (campo.visible !== item.visible) {
            console.warn(`${item.slug_name}'s visibility set to ${itemValue}, but its' column in $store is currently ${campoValue}`);
        }
        console.info({ when: performance.now(), method: 'toggleFields', item: item.slug_name, visible: item.visible });
        this.savedVisibilityState = this.visibilityMap;
        //this.$store.commit('updateColumnas', this.$store.columnas_actuales)
    },
    hideDropDown() {
        this.dropDownVisible = false;
        return true;
    },
    get visibilityMap() {
        return this.$store.columnas_actuales.columnDefs.map((item) => ({ name: item.name, slug_name: item.slug_name, visible: item.visible }));
    },
    dropDownVisible: false,
    zoom_class: 10,
    get savedVisibilityState() {
        try {
            let savedVisibilityState = localStorage.getItem('savedVisibilityState');
            return JSON.parse(savedVisibilityState);
        }
        catch (e) {
            this.savedVisibilityState = this.visibilityMap;
            return this.visibilityMap;
        }
    },
    set savedVisibilityState(savedVisibilityState) {
        try {
            localStorage.setItem('savedVisibilityState', JSON.stringify(savedVisibilityState || this.visibilityMap));
        }
        catch (e) {
        }
    },
    syncsavedVisibilityState() {
        this.savedVisibilityState.forEach((item) => {
            let { visible: storedVisible, slug_name: storedSlug } = item, storedValue = storedVisible ? 'visible' : 'hidden', col = this.$store.columnas_actuales.columnDefs.find(c => c.slug_name === storedSlug);
            if (!col) {
                console.warn('Columna no encontrada', storedSlug);
            }
            else {
                let { visible, slug_name } = col, currentValue = visible ? 'visible' : 'hidden';
                if (storedVisible !== visible) {
                    console.warn(`Field "${slug_name}" is stored as ${storedValue}, but it's currently ${currentValue}`);
                }
            }
        });
    },
    storeTransform(transform) {
        this.transform = transform;
        console.log({ transform: this.transform });
    },
    transform: null,
});
export default SelectorColumnas;
//# sourceMappingURL=selector_columnas.js.map