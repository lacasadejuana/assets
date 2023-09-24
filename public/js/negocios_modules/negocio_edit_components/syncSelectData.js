import Alpine from 'alpinejs';
import TomSelect from 'tom-select';
export const syncSelectData = (className) => ({
    init() {
        const selector = `select[name="${this.$el.name}"]:not(.select2-hidden-accessible)`;
        globalThis.syncSelectDataRows = globalThis.syncSelectDataRows || [];
        setTimeout(() => {
            this
                .initializePendingSelect2Elements(selector);
            this.jqElement.on('change.select2', (e) => {
                //console.info({ event: 'change.select2', value: this.$el.value, name: this.$el.name })
                this.$store.theform.set(this.$el.name, this.$el.value);
            });
            this.jqElement.on('select2:select', (e) => {
                console.info({ event: 'select2:select', value: this.$el.value, name: this.$el.name });
                this.$store.theform.set(this.$el.name, this.$el.value);
            });
        }, 100);
        this.$watch('elementValue', (newValue, oldValue) => {
            //  console.info({ oldValue, newValue, name: this.$el.name })
            let pendingSelect2Elements = this
                .initializePendingSelect2Elements(selector);
            this.jqElement.val(newValue)
                .trigger('change.select2');
        });
    },
    get jqElement() {
        return $(this.$el);
    },
    get elementValue() {
        //@ts-ignore
        return Alpine.store('theform').get(this.$el.name);
    },
    initializePendingSelect2Elements(selectorStr) {
        const pendingSelect2Elements = $(selectorStr);
        if (!pendingSelect2Elements.length)
            return pendingSelect2Elements;
        pendingSelect2Elements.select2({
            //@ts-ignore
            placeholder: () => {
                this.jqElement
                    .data('placeholder');
            },
            allowClear: true,
            width: '100%',
            theme: "bootstrap",
            dropdownParent: this.$el.closest('#validacionEtapaNegocioModal'),
        });
        this.$nextTick(() => {
            this.jqElement
                .val(this
                .elementValue)
                .trigger('change.select2');
            const pendingSelect2ElementsAfter = $(selectorStr);
            globalThis.syncSelectDataRows.push({ name: this.$el.name, before: pendingSelect2Elements.length, after: pendingSelect2ElementsAfter.length });
        });
        return pendingSelect2Elements;
    },
});
export const syncSingleSelectData = (className = 'select2', multiple = false) => ({
    async $promiseTick() {
        return new Promise((res) => {
            this.$nextTick(() => res);
        });
    },
    get jqElement() {
        return $(this.$el);
    },
    get elementValue() {
        let newValue = this.$store.theform
            .get(this.$el.name);
        return newValue;
    },
    set elementValue(newValue) {
        this.$store.theform.set(this.$el.name, newValue);
    },
    init() {
        this.$el.tomSelect = new TomSelect(this.$el, {
            plugins: ['change_listener', 'input_autogrow'],
            allowEmptyOption: true,
            items: this.elementValue,
            maxItems: 1
        });
        this.$el.tomSelect.on('item_add', (value, item) => {
            let elementValue = this.elementValue.sort();
            if (!elementValue.includes(value)) {
                console.info('item_add', { value, items: this.$el.tomSelect.items });
                elementValue.push(value);
                this.elementValue = Array.from(new Set(elementValue));
            }
        });
        this.$el.tomSelect.on('item_remove', (value, item) => {
            let elementValue = this.elementValue.sort();
            if (elementValue.includes(value)) {
                console.info('item_remove', { value, items: this.$el.tomSelect.items });
                elementValue = elementValue.filter(item => item !== value);
                this.elementValue = Array.from(new Set(elementValue));
            }
        });
        this.$watch('elementValue', (newValue, oldValue) => {
            this.$el.tomSelect.addItem(newValue, true);
        });
    }
});
export const syncMultiSelectData = (className = 'select2_multiple', multiple = true) => ({
    async $promiseTick() {
        return new Promise((res) => {
            this.$nextTick(() => res);
        });
    },
    get jqElement() {
        return $(this.$el);
    },
    get elementValue() {
        let newValue = this.$store.theform
            .get(this.$el.name.replace('[]', ''));
        if (!newValue)
            newValue = [];
        newValue = Array.isArray(newValue) ? newValue : [
            newValue
        ];
        return [...newValue];
    },
    set elementValue(newValue) {
        if (!newValue)
            newValue = [];
        newValue = Array.isArray(newValue) ? newValue : [
            newValue
        ];
        this.$store.theform.set(this.$el.name.replace('[]', ''), newValue);
    },
    init() {
        /*if (this.elementValue.length) {
            console.warn({ [this.$el]: this.elementValue })
        }*/
        this.$el.tomSelect = new TomSelect(this.$el, {
            plugins: ['change_listener', 'input_autogrow', 'remove_button'],
            allowEmptyOption: true,
            items: this.elementValue,
            maxItems: 10
        });
        this.$el.tomSelect.on('item_add', (value, item) => {
            let elementValue = this.elementValue.sort();
            if (!elementValue.includes(value)) {
                console.info('item_add', { value, items: this.$el.tomSelect.items });
                elementValue.push(value);
                this.elementValue = Array.from(new Set(elementValue));
            }
        });
        this.$el.tomSelect.on('item_remove', (value, item) => {
            let elementValue = this.elementValue.sort();
            if (elementValue.includes(value)) {
                console.info('item_remove', { value, items: this.$el.tomSelect.items });
                elementValue = elementValue.filter(item => item !== value);
                this.elementValue = Array.from(new Set(elementValue));
            }
        });
        this.$watch('elementValue', (newValue, oldValue) => {
            newValue = Array.from(new Set(newValue));
            let tomselectItems = Array.from(new Set(this.$el.tomSelect.items)), itemstoAdd = newValue.filter(item => !tomselectItems.includes(item)), itemstoRemove = tomselectItems.filter(item => !newValue.includes(item));
            console.info({ event: '$watch elementValue', itemstoAdd, itemstoRemove });
            for (let item of itemstoRemove) {
                this.$el.tomSelect.removeItem(item, true);
            }
            for (let item of itemstoAdd) {
                this.$el.tomSelect.addItem(item, true);
            }
        });
    }
});
//# sourceMappingURL=syncSelectData.js.map