import { ISavedMap, XDataContext } from '@/components/alpine_definitions';
import tippy from 'tippy.js';

export const saveMapTooltip = () => ({


    hideInstance() {
        this.$dispatch('closesavemaptooltip')
    },


    keyUpEscape() {
        this.$dispatch('closesavemaptooltip')
    },
    saving: false,
    cloning: false,
    default_filter_id: null,
    tooltip: null,
    map_name: '',
    map_description: '',
    sharing_level: 'private',
    active_tab: 'tabs-savemap',

    map_type: 'roadmap',
    saving_success: false,
    cloning_success: false,
    deleting: false,
    deleting_success: false,
    layer_options: {},
    get active_filter() {
        return this.$store.active_filter.id
    },
    saveMap() {
        this.saving = true;
        this.$store.public_maps.saveMap()
        setTimeout(() => {
            this.saving = false;
            this.saving_success = true;
            setTimeout(() => {
                this.saving_success = false;
                this.$nextTick(this.hideInstance())
            }, 1000)
        }, 750)
    },
    deleteMap(map_id?: number) {
        this.deleting = true;
        this.$store.public_maps.deleteMap(map_id)
        setTimeout(() => {
            this.deleting = false;
            this.deleting_success = true;
            setTimeout(() => {
                this.deleting_success = false;
                this.$nextTick(this.hideInstance())
            }, 1000)
        }, 750)
    },
    cloneMap(map_id?: number) {
        this.cloning = true;
        this.$store.public_maps.cloneMap(map_id)
        setTimeout(() => {
            this.cloning = false;
            this.cloning_success = true
            setTimeout(() => {
                this.cloning_success = false;
                this.$nextTick(this.hideInstance())
            }, 1000)
        }, 750)
    },


    openConfirmTooltip($el: HTMLElement, savedMap: ISavedMap) {
        const self = this
        console.info({ $el })
        this.confirmInstance = tippy(
            $el,
            this.confirmDeleteTooltipOptions(savedMap)
        )
        this.confirmInstance.show()
    },
    confirmInstance: null,

    hideConfirmationDialog() {
        if (this.confirmInstance) this.confirmInstance.hide()

    },

    confirmDeleteTooltipOptions(savedMap: ISavedMap) {
        let self = this;
        const hideOnEsc = {
            name: 'hideOnEsc',
            defaultValue: true,
            fn({ hide, ...otherArgs }) {
                console.log('saveMap Tooltip hideOnEsc', { otherArgs })

                function onKeyDown(event) {
                    console.log({ 'saveMap Tooltip onKeyDown': { otherArgs } })
                    if (event.keyCode === 27) {
                        hide();
                    }
                }

                return {
                    onShow() {
                        console.log('onEscPlugin onShow', { otherArgs })
                        self.confirmInstance = otherArgs.instance
                        document.addEventListener('keydown', onKeyDown);
                    },
                    onHide() {
                        document.removeEventListener('keydown', onKeyDown);
                    },
                };
            },
        };
        return {

            trigger: 'click',
            content: () => document.querySelector('#map_confirm_delete_tooltip').innerHTML.replace('id_map', savedMap.id.toString()),

            maxWidth: '40rem',
            allowHTML: true,
            //appendTo: document.querySelector('#table_outer_container'),// this.$refs.negocios_full,
            theme: 'light-border',
            placement: 'right',
            hideOnEsc: true,
            plugins: [hideOnEsc],

            onHide(instance) {
                self.open = false

            },
            onShow(instance) {
                self.confirmInstance = instance
            },
            interactive: true
        }
    },
    init() {
        //initTE({ Tab });
        globalThis.mapSavingDialog = this
        this.default_filter_id = this.$store.public_maps.active_filter;



    }
} as XDataContext)