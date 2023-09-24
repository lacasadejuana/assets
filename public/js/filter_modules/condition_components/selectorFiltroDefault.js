import { changesActiveFilterMixin } from '../decorators/changesActiveFilterMixin';
/**
 * This component is shown above deals datatable. When the selected value changes,
 * the new filter id is persisted to the user's session AND to the database.
 *
 * The window is reloaded afterwards
 * @param csrf
 * @param onChange
 * @returns
 */
export const selectorFiltroDefault = (csrf, onChange = () => { }) => {
    return {
        ...changesActiveFilterMixin(),
        _internal_filter_id: null,
        get default_filter_id() {
            return this.$store.active_filter.id;
        },
        set default_filter_id(id) {
            if (id && id != this._internal_filter_id && id != this.$store.active_filter.id) {
                this._internal_filter_id = id;
                this.$store.active_filter.properties.id = id;
            }
            /*
                .then(() => this.$store.active_filter.setActive(id))
                .then(() => this.$store.active_filter.submitSearch({ limit: 5500, from: Number(Date.now() / 1000).toFixed(0) }))
*/
        },
        get tsWrapper() {
            return this.$el.querySelector('.ts-wrapper');
        },
        lockDown: false,
        init() {
            this.$store.active_filter.once('ready', () => {
                if (!this.$store.active_filter.opened_once) {
                    this.$store.active_filter.opened_once = true;
                }
            });
            this.$watch('default_filter_id', (id, oldId) => {
                console.log('changing default_filter_id from ' + oldId + ' to ' + id + 'negocios complete? ' + this.$store.negocios.complete);
                if (this.lockDown) {
                    console.zwarn('aborting default_filter_id change because lockDown is true');
                    return;
                }
                if (!id || Number(id) == Number(oldId)) {
                    console.log({
                        'changing default_filter_id': 'NO CHANGES',
                        id,
                        oldId
                    });
                    return;
                }
                this.lockDown = true;
                this.$store.active_filter.setDefaultFilter(id).then(() => {
                    setTimeout(() => {
                        this.lockDown = false;
                    }, 2500);
                    this.$store.active_filter.submitTwice();
                });
            });
            this.$store.active_filter.controls.set('selectorFiltroDefault', this);
            this._internal_filter_id = this.$store.active_filter.id;
        },
        get payload() {
            let formData = Object.fromEntries(this.formData());
            return { ...formData, default_filter: this._internal_filter_id };
        },
        formData() {
            //@ts-ignore
            return new FormData(this.$refs.default_filter_form);
        }
    };
};
export default selectorFiltroDefault;
//# sourceMappingURL=selectorFiltroDefault.js.map