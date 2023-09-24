export const MainFormAccordionData = () => {
    return {
        theform: {},
        inputsByType: {},
        spinnerIcon() {
            this.guardarButton = `<i class='fa fa-spinner fa-spin'></i> Guardando...`;
        },
        tooltipOptions: {
            trigger: 'click',
            maxWidth: '40rem',
            allowHTML: true,
            theme: 'light-border',
            interactive: true,
            placement: 'bottom',
        },
        guardarButton: `<i class='fa fa-save'></i> Guardar`,
        init() {
            const element = document.querySelector(location.hash || '#accordionPanelsStayOpenExample');
            if (element) {
                const prevElement = element.previousElementSibling;
                if (prevElement) {
                    const saveSection = prevElement.querySelector('.save_section');
                    if (saveSection) {
                        saveSection.scrollIntoView();
                    }
                }
            }
            globalThis.formDataElement = this;
            setTimeout(() => {
                this.theform = this.$store.theform.properties;
                this.inputsByType = this.$store.inputsByType.properties;
            }, 100);
        }
    };
};
export default MainFormAccordionData;
//# sourceMappingURL=accordionPanelsStayOpenExample.js.map