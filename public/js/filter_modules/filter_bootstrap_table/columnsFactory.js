import { actionsColumn } from './actionsColumn';
import { publicColumn } from './publicColumn';
import { areasFormatter } from './areasFormatter';
export const columnsFactory = (bsTable, token) => {
    return [
        actionsColumn(token),
        {
            field: 'id',
            title: 'ID',
            visible: false,
            formatter: (value) => `<div class="inner_cell -my-1 ">${value}</div>`,
            class: 'py-0   px-2 text-right pr-4',
            sortable: false,
            searchable: false,
        },
        {
            title: 'Nombre',
            sortable: true,
            field: 'name',
            class: ' h-4  px-2',
            visible: true,
            //@ts-ignore
            filterControl: 'input',
            formatter: (value) => `<div class="inner_cell min-w-[300px] max-w-[350px]  -my-2 " style="font-size:1.1em;white-space:pre-line;line-height:1.5em">${value}</div>`,
        },
        publicColumn,
        {
            title: 'Áreas/Subáreas',
            sortable: true,
            field: 'areas_subareas',
            class: 'py-0   px-2',
            //@ts-ignore
            filterControl: 'input',
            filterControlMultipleSearch: true,
            filterControlMultipleSearchDelimiter: ',',
            filterDataCollector: (field) => {
                let data = bsTable.bootstrapTable.getData();
                let areas = data.reduce((acc, row) => {
                    let areas = row.areas_subareas.split(', ');
                    areas.forEach(area => {
                        acc[area] = area.replace(/Subarea|Area|Subárea|Área/i, '').trim();
                    });
                    return acc;
                }, {});
                return Object.values(areas);
                console.tap(Object.entries(areas).map(([value, text]) => ({ value, text })));
            },
            formatter: areasFormatter,
            searchFormatter: true
        },
        {
            title: 'Autor',
            sortable: true,
            field: 'author',
            class: 'py-0 min-w-[165px]  px-2 h-4',
            //@ts-ignore
            filterControl: 'select',
            formatter: (value, row, index, field) => {
                return `<div class="inner-cell  max-width-[140px]   -my-2 " style="max-width:145px;white-space:pre-line;line-height:1.5em">${value ? value : row.user?.name}</div>`;
            }
        },
        {
            title: 'Filtros',
            sortable: true,
            field: 'filtros',
            class: 'text-center',
            formatter: (value) => `<div class="inner_cell -my-1 ">${value}</div>`,
            visible: false,
        },
        {
            title: 'Columnas',
            sortable: true,
            field: 'columnas_visibles',
            class: 'text-center',
            formatter: (value) => `<div class="inner_cell -my-1 ">${value}</div>`,
            visible: false,
        },
        {
            title: 'Registros',
            sortable: true,
            field: 'estimate',
            class: 'text-center',
            formatter: (value) => `<div class="inner_cell -my-1 ">${value}</div>`,
            visible: false,
        },
        {
            title: 'Categoría',
            sortable: true,
            field: 'categoria',
            class: 'py-0    px-2 h-4',
            //@ts-ignore
            filterControl: 'select',
            formatter: (value, row, index, field) => {
                return `<div class="inner-cell  max-width-[160px]   -my-2 " style="white-space:pre-line;line-height:1.5em">${value}</div>`;
            }
        }, {
            title: 'Modificado',
            sortable: true,
            field: 'updated_at',
            class: 'py-0 h-4  text-center',
            // filterControl: 'datePicker',
            formatter: (value, row, index, field) => {
                return `<div class="inner-cell -my-1 ">${value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1').replace('T', ' ').substr(0, 10)}</div>`;
            }
        }
    ];
};
//# sourceMappingURL=columnsFactory.js.map