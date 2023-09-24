import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { transformableBehavior } from '../../index';
export const selectorColumnasDialog = () => ({
    sortableInstance: null,
    get columnDefs() {
        return this.$store.columnas_actuales.columnDefs;
    },
    createSortable() {
        setTimeout(() => {
            this.sortableInstance = Sortable.create(this.$el.querySelector('.sortable_wrapper'), {
                animation: 150,
                draggable: '.columna_actual',
                onEnd: (evt) => {
                    let oldIndex = evt.oldIndex - 1, newIndex = evt.newIndex - 1;
                    let moved = this.columnas_actuales[oldIndex];
                    if (evt.newIndex > 0 && evt.oldIndex !== 0) {
                        console.marquee({
                            'se moverá': '',
                            [moved.slug_name]: 'color:#336699;font-weight:bold;',
                            'desde la posición': '',
                            [oldIndex]: 'color:#0a0;font-weight:bold;',
                            'hasta después de': '',
                            [this.columnas_actuales[newIndex].slug_name]: 'color:#0a0;font-weight:bold;',
                        });
                        this.$store.columnas_actuales.moveColumn(oldIndex, newIndex);
                        setTimeout(() => {
                            this.$dispatch('refreshcolumns');
                        }, 500);
                    }
                },
            });
        }, 500);
    },
    get elementStyle() {
        return this.$el.style.transform;
    },
    timeout: null,
    mousedown: false,
    clickAway(e) {
        if (!this.bootstrapped || this.mousedown || e.target.classList.contains('accordion-button-no-chevron'))
            return;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.$dispatch('hidedropdown');
        }, 500);
    },
    bootstrapped: false,
    init() {
        setTimeout(() => {
            this.bootstrapped = true;
            this.$nextTick(() => {
                this.createSortable();
            });
        }, 1000);
        transformableBehavior(this.$el, document.querySelector('#drag_dropdown'));
        this.$el.style.transform = this.elementStyle;
        this.$watch('elementStyle', (newVal, oldVal) => {
            if (newVal === oldVal)
                return;
            console.log('transformableBehavior', newVal);
            this.$dispatch('transformed', newVal.transform);
        });
    }
});
//# sourceMappingURL=selector_columnas_dialog.js.map