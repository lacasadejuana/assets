import Alpine from 'alpinejs';
export const getFiltrosDisponiblesOptions = (default_filter_id, user_default_filter, include_author = false, filtrosDisponibles = null) => {
    user_default_filter = user_default_filter ?? default_filter_id;
    filtrosDisponibles = filtrosDisponibles || Alpine.store('active_filter').filtrosDisponibles;
    return {
        tables: false,
        items: default_filter_id,
        plugins: ['dropdown_input'],
        valueField: 'id',
        labelField: 'name',
        searchField: ['name'],
        //@ts-ignore
        options: filtrosDisponibles.map(i => ({ id: i.id, name: i.name, class: i.opt_group ?? 'Otros', author: i.author, estimate: i.estimate })).slice(0).sort((a, b) => String(a.class || '' + ' ' + a.name || '').localeCompare(String(b.class || '' + ' ' + b.name || ''))),
        optgroups: Array.from(new Set(filtrosDisponibles.map(i => i.opt_group)))
            .map(i => ({ value: i, label: i }))
            .slice(0).sort((a, b) => String(a.label || '').localeCompare(String(b.label || ''))),
        optgroupField: 'class',
        create: false,
        maxItems: 1,
        onChange: function (value, item) {
            console.log('active filter changed', value, item);
        },
        render: {
            optgroup_header: function (data, escape) {
                return `<div class=\'optgroup-header bg-gray-200 fw-500 py-2 text-black -translate-y-2 \'>${escape(data.value)}</div>`;
            },
            option: function (data, escape) {
                let { name, author = 'N/A', id, estimate } = data;
                let isDefault = user_default_filter === data.id;
                let icon = isDefault ? "<i style='transform: translate(0, 3px);' class='fas fa-thumbtack text-green-600 float-right' x-tooltip='`Este es tu filtro por defecto`' > </i>" : '', tooltip = estimate ? `x-tooltip.raw.placement.left.theme.light-border.delay.500.sticky.debounce.1000="ID: ${id}, Estimación: ${estimate} registros"` : '', autor = include_author ? `<span class='label block text-gray-500 fs-08rem'>${author}</span>` : '';
                return `<div data-selectable="" ${tooltip}   class="option" role="option"  >
                ${escape(data.name)}${icon}
                ${autor}
                </div>`;
            },
            item: function (data, escape) {
                data.name = escape(data.name);
                data.message = data.name;
                let isDefault = user_default_filter === data.id;
                let icon = isDefault ? "<i style='transform: translate(-2.5em, 0);' class='fas fa-thumbtack text-green-600 float-right' x-tooltip='`Este es tu filtro por defecto`' > </i>" : '';
                return `<div class="flex w-full justify-between">
                <div data-value="${data.id}" class="item" data-ts-item="" x-data x-text="$store.active_filter.name"></div>
                ${icon}</div>`;
            },
        },
    };
};
//# sourceMappingURL=getFiltrosDisponiblesOptions.js.map