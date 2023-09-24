import TomSelect from 'tom-select';
import { waitFor } from '../../components';
import { getFiltrosDisponiblesOptions } from '../decorators/getFiltrosDisponiblesOptions';
export const availableFiltersControl = (filter_id) => ({
    id_filter: filter_id,
    tomSelect: null,
    destroy() {
        if (this.tomSelect) {
            this.tomSelect.destroy();
        }
        this.tomSelect = null;
    },
    /*get filter_id() {
        return this.id_filter
    },
    set filter_id(id) {
        if (this.tomSelect) {
            this.tomSelect.addItem(id, true)
        }
        this.id_filter = Number(id)
    },*/
    tomSettings(filtrosDisponibles) {
        const filtrosDisponiblesTomSettings = {
            ...getFiltrosDisponiblesOptions(this.id_filter || this.$store.active_filter.id, this.$store.user.default_filter, false, filtrosDisponibles.map(f => {
                if (f.user_id == this.$store.user.id) {
                    f.opt_group = ' Creados por mí';
                }
                return f;
            })),
            onChange: (value, item) => {
                console.info('availableFiltersControl onChange', value, item);
                this.id_filter = value;
                this.$store.active_filter.setActive(value);
            },
            item: function (data) {
                return `<span class="bg-gray-100 border">${data.name}</span>`;
            }
        };
        return filtrosDisponiblesTomSettings;
    },
    createAvailableFiltersControl(attempt = 0, cb) {
        let filtrosDisponibles = this.$store.active_filter.filtrosDisponibles;
        if (!filtrosDisponibles.length && attempt < 3) {
            return waitFor(500).then(() => { this.createAvailableFiltersControl(attempt + 1, cb); });
        }
        const tomSettings = this.tomSettings(filtrosDisponibles);
        console.info('createAvailableFiltersControl', tomSettings);
        if (this.tomSelect) {
            this.tomSelect.destroy();
            return setTimeout(() => {
                this.tomSelect = null;
                this.tomSelect = new TomSelect(this.$el, tomSettings);
                if (cb)
                    cb();
            }, 1000);
        }
        this.tomSelect = new TomSelect(this.$el, tomSettings);
        if (cb)
            cb();
        this.$store.active_filter.on('filters_loaded', () => {
            this.recreateAvailableFiltersControl();
        });
    },
    recreateAvailableFiltersControl() {
        if (this.tomSelect) {
            this.tomSelect.destroy();
        }
        this.createAvailableFiltersControl(0, () => {
            setTimeout(() => {
                if (this.tomSelect)
                    this.tomSelect.addItem(this.active_filter_store_id);
            }, 500);
        });
    },
    get active_filter_store_id() {
        return this.$store.active_filter.id;
    },
    init() {
        console.info('waiting for active_filter to be ready');
        this.$store.active_filter.once('filters_loaded', () => {
            this.createAvailableFiltersControl();
            this.$watch('active_filter_store_id', (id) => {
                if (this.tomSelect) {
                    this.tomSelect.addItem(id);
                }
            });
        });
        globalThis.availableFiltersControlInstance = this;
    }
});
export default availableFiltersControl;
//# sourceMappingURL=availableFiltersControl.js.map