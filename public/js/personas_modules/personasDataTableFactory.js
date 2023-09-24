import ScrollBooster from "scrollbooster";
const defaultTcons = {
    paginationSwitchDown: 'fa-caret-down-square',
    paginationSwitchUp: 'fa-caret-up-square',
    refresh: 'fa-redo',
    toggleOff: 'fa-toggle-off',
    toggleOn: 'fa-toggle-on',
    columns: 'fa-list-ul',
    detailOpen: 'fa-plus',
    detailClose: 'fa-minus',
    fullscreen: 'fa-expand',
    search: 'fa-search',
    clearSearch: 'fa-trash',
    export: 'fa-download',
    paginationSwitch: 'fa-toggle-on',
    paginationNext: 'fa-chevron-right',
    paginationPrevious: 'fa-chevron-left',
    paginationFirst: 'fa-step-backward',
    paginationLast: 'fa-step-forward',
    filterControlSwitchHide: 'fa-eye-slash',
    filterControlSwitchShow: 'fa-eye',
};
const defaultOperateEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like action, row: ' + JSON.stringify(row));
    }
};
function rutFormatter(value) {
    return String(value || '').toUpperCase().replace(/^(\d{1,2})\.?(\d{3})\.?(\d{3})-?(K|\d{1})$/, '$1.$2.$3-$4')
        .replace(/^0/, '');
}
function phoneToPrettyPhone(phone) {
    if (phone && /(\+*5*6*){0,1}([1-9])(\d{4})(\d{4})/.exec(phone
        .replace(/\s/g, ''))) {
        let [_, code, prefix, group1, group2] = /(\+*5*6*){0,1}([1-9])(\d{4})(\d{4})/.exec(phone.replace(/\s/g, ''));
        phone = ['+56', prefix, group1, group2].join(' ');
    }
    return phone;
}
function telFormatter(value, row, index) {
    row.telefono = phoneToPrettyPhone(row.telefono);
    return row.telefono ? [
        '<a class="py-1" href="tel:' + row.telefono +
            '" title="teléfono">',
        row.telefono,
        '</a>  ',
        '<a target="_blank" class="rounded-pill float-right mr-3 btn-success px-2" href="https://api.whatsapp.com/send?phone=' +
            row.telefono +
            '&text=Hola!" x-tooltip.raw.theme.light="abrir whatsapp">',
        '<i class="text-lg text-bold fab fa-whatsapp"></i>',
        '</a>'
    ].join('') : '';
}
function emailFormatter(value, row, index) {
    return [
        '<a class="" href="mailto:' + row.email + '" title="Correo">',
        row.email,
        '</a>  '
    ].join('');
}
export function personasDataTableFactory(tableSelector, $remove, current_user, operateEvents = defaultOperateEvents, icons = defaultTcons) {
    let selections = [];
    function getIdSelections() {
        return $.map(tableSelector.bootstrapTable('getSelections'), function (row) {
            return row.id;
        });
    }
    function responseHandler(res) {
        $.each(res.rows, function (i, row) {
            row.state = $.inArray(row.id, selections) !== -1;
        });
        return res;
    }
    function operateFormatter(value, row, index) {
        return [
            '<div class="flex">',
            `<a target="_blank" style="padding:0.35em 0.5em"  class="btn btn-primary max-h-[35px]"  @click.prevent="loadPartial('/persona/${row.id}')"  href="persona/${row.id}" title="Ver">`,
            '<i class="fa fa-eye"></i>',
            '</a>  ',
            `<a target="_blank" style="padding:0.35em  0.5em" class="btn btn-secondary max-h-[35px]  mx-2" @click.prevent="loadPartial('/persona/${row.id}/edit')"  title="Editar">`,
            '<i class="fa fa-edit"></i>',
            '</a>',
            (current_user.has_privileged_role && row.can_be_impersonated && row
                .user_id) ?
                `<a target="_blank" style="padding:0.35em 0.5em"  class="btn btn-success max-h-[35px] " href="impersonate/take/${row.user_id}" title="Usar perfil"><i class="fa fa-mask"></i></a>` :
                '',
            '</div>'
        ].join('');
    }
    let bsTable = {
        $el: tableSelector[0],
        tableSelector,
        scrollBooster: null
    };
    const tblOptions = {
        height: (window.innerHeight - document.querySelector('#toolbar')
            .getBoundingClientRect().top) - 35,
        locale: 'es-CL',
        searchSelector: '#search_compact',
        icons,
        showPaginationSwitch: false,
        filterControlSwitchShow: false,
        showExport: true,
        addrBar: true,
        iconsPrefix: 'fa',
        pageSize: 25,
        queryParamsType: 'limit',
        buttonsClass: 'primary',
        columns: [
            [{
                    field: 'nombre_completo',
                    title: 'Nombre',
                    sortable: true,
                    align: 'left',
                    formatter: (value, row, index) => {
                        return '<span style="font-size:1.07em;">' + value +
                            '</span>';
                    }
                },
                {
                    field: 'email',
                    title: 'Email',
                    url: 'mailto:',
                    link: true,
                    sortable: true,
                    align: 'center',
                    formatter: emailFormatter
                },
                {
                    field: 'telefono',
                    title: 'Telefono',
                    sortable: true,
                    align: 'center',
                    formatter: telFormatter
                },
                {
                    field: 'rut',
                    title: 'Rut',
                    sortable: true,
                    class: 'text-right pr-3',
                    formatter: rutFormatter
                },
                {
                    filterControl: "input",
                    field: 'roles_negocio',
                    title: 'Roles',
                    align: 'left',
                    filterable: true,
                    clickToSelect: false,
                    formatter: function (value, row) {
                        var roles = value.split(', ');
                        var formattedRoles = roles.join('</li><li>');
                        return `<ul class="ml-2 pl-1" style="list-style:disc"><li>${formattedRoles}</li></ul>`;
                    }
                },
                {
                    field: 'operate',
                    title: 'Acciones',
                    align: 'center',
                    clickToSelect: false,
                    width: 115,
                    events: operateEvents,
                    formatter: operateFormatter
                }
            ]
        ]
    };
    globalThis.initPersonsTable = () => {
        // @ts-ignore
        current_user = current_user || $store.user;
        tableSelector.bootstrapTable('destroy');
        tableSelector.bootstrapTable(tblOptions);
        bsTable.destroy = () => {
            tableSelector.bootstrapTable('destroy');
            bsTable.scrollBooster?.destroy();
            bsTable.scrollBooster = null;
        };
        tableSelector.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
            $remove.prop('disabled', !tableSelector.bootstrapTable('getSelections').length);
            // save your data, here just save the current page
            selections = getIdSelections();
            // push or splice the selections if you want to save all data selections
        });
        tableSelector.on('all.bs.table', function (e, name, args) {
            console.log(name, args);
        });
        $remove.click(function () {
            var ids = getIdSelections();
            tableSelector.bootstrapTable('remove', {
                field: 'id',
                values: ids
            });
            $remove.prop('disabled', true);
        });
        if (false && document.querySelector('.fixed-table-body')) {
            bsTable.scrollBooster = new ScrollBooster({
                viewport: document.querySelector('.fixed-table-body'),
                content: bsTable.$el,
                direction: 'horizontal',
                scrollMode: 'native',
                friction: 0.01,
                bounce: false,
                allowTextSelection: true,
                bounceForce: 0.00
            });
        }
    };
    return globalThis.initPersonsTable;
}
//# sourceMappingURL=personasDataTableFactory.js.map