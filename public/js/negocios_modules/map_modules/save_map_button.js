export const saveMapButton = () => ({
    instance: null,
    setInstance(instance) {
        this.instance = instance;
        console.log({ setInstance: this.instance });
    },
    hideinstance() {
        console.log({ 'hideinstance': this.instance });
        if (this.instance)
            this.instance.hide();
    },
    keyUpEscape() {
        console.log({ 'keyUpEscape': this.instance });
        if (this.instance)
            this.instance.hide();
    },
    init() {
        const hideOnEsc = {
            name: 'hideOnEsc',
            defaultValue: true,
            fn({ hide, ...otherArgs }) {
                console.log('saveMap Button hideOnEsc', { otherArgs });
                function onKeyDown(event) {
                    if (event.keyCode === 27) {
                        hide();
                    }
                }
                return {
                    onShow() {
                        document.addEventListener('keydown', onKeyDown);
                    },
                    onHide() {
                        document.removeEventListener('keydown', onKeyDown);
                    },
                };
            },
        };
        const self = this;
        this.tooltip = {
            trigger: 'click',
            content: () => document.querySelector('#map_save_tooltip').innerHTML,
            maxWidth: '40rem',
            allowHTML: true,
            //appendTo: document.querySelector('#table_outer_container'),// this.$refs.negocios_full,
            theme: 'light-border',
            placement: 'right',
            hideOnEsc: true,
            plugins: [hideOnEsc],
            onHide(instance) {
                self.open = false;
            },
            onShow(instance) {
                self.setInstance(instance);
                self.instance = instance;
            },
            interactive: true
        };
    }
});
//# sourceMappingURL=save_map_button.js.map