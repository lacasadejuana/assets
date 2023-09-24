export const publicColumn = {
    title: 'Público',
    sortable: true,
    field: 'public',
    class: 'py-0  text-center px-2',
    filterControl: 'select',
    width: '80px',
    formatter: (value, row, index, field) => {
        return `<div class="inner_cell ">${value ?
            '<span class="hidden">Si</span><i class="px-1 mr-1 text-lg py-0 fa fa-check text-green-600"></i>'
            : '<span class="hidden>No</span><i class="px-1 mr-1 text-lg py-0 fa fa-lock text-gray-500"></i>'}</div>`;
    },
    searchFormatter: false,
};
//# sourceMappingURL=publicColumn.js.map