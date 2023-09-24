export const sectionSelector = (id_negocio, current_section, secciones_options) => ({
    id_negocio,
    current_section,
    secciones_options,
    get tomSelectOptions() {
        const self = this;
        return {
            placeholder: "Seleccione una sección",
            allowClear: true,
            valueField: "id",
            labelField: "name",
            closeOnSelect: true,
            create: false,
            items: [self.current_section],
            onChange(section_id) {
                const tomSelect = self.$refs.select_section.tomselect;
                let selected_icon = tomSelect.wrapper.querySelector("#selected_section");
                if (selected_icon)
                    selected_icon.className = "fa fa-spinner fa-spin";
                console.log("onChange", { section_id });
                if (section_id === 0)
                    section_id = "";
                location.href = location.href.replace(`edit/${self.current_section}`, `edit/${section_id}`);
            },
            options: [{ id: "", name: "Todas las secciones", icon: "list" }].concat(this.secciones_options),
            render: {
                option: (item, escape) => {
                    return `<div style="font-size:1.1rem"><i class="fa fa-${item.icon}" style="margin-right:5px"></i>
                    <span class="label">${escape(item.name)}</span></div>`;
                },
                item: (item, escape) => {
                    return `<div style="font-size:1.1rem"><i id="selected_section" class="fa fa-${item.icon}" style="margin-right:5px"></i>
                    <span class="label">${escape(item.name)}</span></div>`;
                }
            }
        };
    }
});
//# sourceMappingURL=sectionSelector.js.map