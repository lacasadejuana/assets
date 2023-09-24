import { tap } from '../../components/plugins';
import { changesActiveFilterMixin } from '../decorators/changesActiveFilterMixin';
/**
 * This component is shown above the filter constructor (when editing a filter)
 * from `/filtros/{filter_id}/edit`
 *
 * When the selected filter changes, the contents of the edition screen change too
 * reflecting the new filter.
 *
 * The above doesn't trigger a page reload, as it happens in the similar component
 * `selectorFiltroDefault.ts`
 *
 * @param csrf
 * @param onChange
 * @returns
 */
export const selectorFiltrosDisponibles = () => ({
    ...changesActiveFilterMixin(),
    get default_filter_id() {
        return this.$store.active_filter.id;
    },
    set default_filter_id(id) {
        console.log('setting default_filter_id to ' + id);
        if (Number(id) === Number(this.default_filter_id))
            return;
        if (location.pathname.startsWith('/filtros')) {
            let formurl = new URL(location.href);
            formurl.pathname = '/filtros/' + id + '/edit';
            history.replaceState({ method: 'GET' }, '', formurl);
        }
        this.$store.active_filter.setActive(id);
        this.$nextTick(() => this.$store.user.connect());
    },
    init() {
        tap(document.querySelector('#search_contextual'), (el) => {
            if (!el)
                return;
            el.classList.remove('col-md-5');
            el.classList.add('col-md-6');
        });
        globalThis.selectorFiltrosDisponiblesInstance = this;
    },
});
export default selectorFiltrosDisponibles;
//# sourceMappingURL=selectorFiltrosDisponibles.js.map