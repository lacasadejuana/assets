export const deleteTemplate = (row) => {
    return `<input type="hidden" name="_method" value="DELETE">
            <button type="button" title="Eliminar" data-id="${row.id}"
                                             class="btn btn-danger p-2 btn-xs mx-1 delete_filter">
                                            <i class="p-1 fa fa-trash-alt"></i>
                                        </button>`;
};
export const editTemplate = (row) => {
    return `<a   href="/filtros/${row.id}/edit"
                                            rel="${row.id}" title="Editar" x-data="{
                                                edit_icon: 'fa fa-edit',
                                            }" 
                                            @xclick.prevent="()=>{
                                                edit_icon = 'fa-spinner fa-spin';
                                                loadPartial('/filtros/${row.id}/edit?barebone=true')
                                            }"
                                            class="btn btn-success edit_filter  p-2 btn-xs  mx-1  "><i
                                                class="p-1 fa fa-edit"></i></a>`;
};
export const cloneTemplate = (row) => {
    return `<a href="/filtros/${row.id}/clone"
        rel="${row.id}" title="clonar"
        class="btn btn-success edit_filter  p-2 btn-xs  mx-1  "><i
            class="p-1 fa fa-clone"></i></a>`;
};
export const applyTemplate = (row) => {
    return `<a href="/negocio?filter_id=${row.id}" x-tooltip.theme.light.raw="Usar en DataTable"
        rel="${row.id}" title="Usar en DataTable"
        class="btn btn-silver edit_filter  p-2 btn-xs  mx-1  "><i
            class="p-1 fa fa-table"></i></a>`;
};
export const actionsColumn = (token) => {
    return {
        title: '',
        field: 'actions',
        sortable: false,
        searchable: false,
        switchable: false,
        class: 'p-0 -my-2 ',
        formatter: (value, row, index, field) => {
            let deleteRow = '', editRow = '';
            let cloneRow = cloneTemplate(row);
            let applyRow = applyTemplate(row);
            //@ts-ignore
            if ($store.user.id === row.user_id || $store.user.has_privileged_role) {
                deleteRow = deleteTemplate(row);
                editRow = editTemplate(row);
                cloneRow = '';
            }
            return `
        <form id="actionsForm${row.id}" action="/filtros/${row.id}" class="px-2  -my-2   actions_form align-items-center flex  align-self-center" method="post">
                            <input type="hidden" name="_token" value="${token}">
                            ${deleteRow}
                            ${editRow}
                            ${cloneRow} 
                            ${applyRow}
                    </form>`;
        }
    };
};
//# sourceMappingURL=actionsColumn.js.map