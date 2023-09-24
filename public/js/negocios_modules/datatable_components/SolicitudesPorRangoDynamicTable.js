import ScrollBooster from 'scrollbooster';
import { bootstrapTableBaseOptions, ifDefined } from '../../components';
import { sprColumns } from './spr_dynamic/sprColumns';
import { initChart } from './spr_dynamic/chart';
import { pivot } from './spr_dynamic/pivot';
import { getSeriesData } from './spr_dynamic/sprData';
import { initDropdownsBs } from "@/components/plugins/initDropdownsBs";
import { waitFor } from '../../components';
export { NegociosChartSeries, SolicitudesChartSeries, SprChartComponent } from './spr_dynamic';
function headerStyle(column) {
    return {
        classes: 'sticky top-0 break-words',
        'x-init': "console.log('headerStyle', $el)"
    };
}
export const InstanceChart = (dataStore, chartContainer) => {
    let seriesData = getSeriesData(dataStore.properties);
    if (!chartContainer)
        throw new Error('chartContainer is null');
    return initChart(seriesData, chartContainer);
};
/**
 * Represents a data component for a table of solicitudes por rango.
 * @param dataStore - The data store for the component.
 * @returns An AlpineDataComponent object for the SolicitudesPorRangoDynamicTable.
 */
export const SolicitudesPorRangoDynamicTable = ({ dataStore, column_prefix, name }) => ({
    name: name || 'SolicitudesPorRangoDynamicTable',
    dataStore,
    column_prefix: column_prefix || 'visitas',
    initChart() {
        //$el.getBoundingClientRect()
        ifDefined(document.getElementById('chart_container'), chartContainer => {
            let chartParent = chartContainer.parentElement, parentWidth = chartContainer.parentElement.getBoundingClientRect().width;
            chartContainer.style.height = this.minHeight;
            chartContainer.style.width = parentWidth + 'px';
            chartParent.style.minHeight = this.minHeight;
            let dimensions = {
                height: (this.minHeight - 190) + 'px',
                width: (parentWidth - 40) + 'px'
            };
            console.info('initializing with dimensions', { dimensions });
            initChart(this.seriesData, chartContainer, dimensions);
        });
    },
    initPivot() {
        return pivot.initPivot(this.data);
    },
    get seriesData() {
        return getSeriesData(this.data);
    },
    bttColumns: [],
    columnVisibility: {},
    hasCheckbox: window.innerWidth > 768,
    scrollBooster: null,
    scrollableClass: '.fixed-table-body',
    get wrapperElement() {
        return document.querySelector('.card-style-2.mb-2.py-2') || this.$el;
    },
    get wrapperHeight() {
        let wrapper = this.wrapperElement, boundingRect = wrapper.getBoundingClientRect(), windowHeight = window.innerHeight;
        return windowHeight - (boundingRect.top + 30);
    },
    destroy() {
        // globalThis.bsTable = null;
        this.bsTable.bootstrapTable('destroy');
        if ((this.scrollBooster)) {
            this.scrollBooster.destroy();
        }
        this.resizeObserver.disconnect();
    },
    init() {
        //@ts-ignore
        this.debouncedCreateScrollBooster = Alpine.debounce(this.createScrollBooster, 500);
        this.debouncedResetHeight = Alpine.debounce(this.resetHeight.bind(this), 500);
        this.dataStore.dataTables = this.dataStore.dataTables || {};
        this.dataStore.dataTables[this.name] = this;
        //globalThis.sprTable = this
        //Export twice to globalmap to avoid touching other references to "compact table"
        //globalThis.bsTable = this
        this.bsTable = this.createBsTable();
        // const fetchPagePromise = this.fetchPage()
        this.bsTable.reload = this.reload.bind(this);
        this.createScrollBooster();
        this.createResizeObserver();
        console.timerInfo(this.name + '  ready');
        setTimeout(() => {
            ifDefined(this.wrapperElement, (wrapper) => {
                wrapper.style.height = this.wrapperHeight + 'px';
                this.minHeight = wrapper.style.height;
                ifDefined(document.getElementById('spr_tabs_content'), tabsContent => tabsContent.style.height = this.minHeight);
            });
        }, 500);
        this.$store.columnas_actuales.once('ready', () => {
            this.$store.columnas_actuales.on('columns_updated', () => {
                //@ts-ignore
                this.refreshColumns();
                this.createScrollBooster();
                requestAnimationFrame(() => { this.debouncedResetHeight(); });
            });
        });
    },
    minHeight: 0,
    bsTable: null,
    buffer: [],
    get data() {
        return this.dataStore.properties.map((row) => {
            //return globalThis.backendPaginator.data.map(row => {
            //@ts-ignore
            row = {
                ...row,
                //@ts-ignore
                ...row._extra_props
            };
            row.tipo_negocio = this.$store.tipos_negocio.get(row.id_tipo_negocio);
            row.tipo_propiedad = this.$store.tipos_propiedad.get(row.id_tipo_propiedad);
            row.etapa_negocio = this.$store.etapas_negocio.get(row.id_etapa_negocio);
            return row;
        });
    },
    get columns() {
        return sprColumns(this.$store.columnas_actuales.columnDefs, this.column_prefix);
    },
    get tblOptions() {
        let self = this;
        return {
            ...bootstrapTableBaseOptions,
            //   filterControl: true,
            columns: this.columns,
            //            height: this.tableHeight,
            searchAccentNeutralise: true,
            trimOnSearch: false,
            searchOnEnterKey: true,
            showColumnsSearch: true,
            alternativeContainer: true,
            fixedColumns: false,
            //fixedNumber: 1,
            //stickyHeader: true,
            idTable: this.$el.id,
            exportTypes: null,
            showExport: false,
            showRefresh: true,
            onRefresh: () => {
                this.reload();
            },
            headerStyle: (headerColumn) => {
                //   console.log({ headerColumn })
                return {
                    classes: 'sticky top-0 break-words bs_table_header_cell',
                    css: {
                        'font-weight': 'normal',
                        'min-width': headerColumn.checkbox ? '50px' : (headerColumn.field === 'nombre' ? '270px' : '125px')
                    },
                };
            },
            ...this.onCkeckOptions(),
            rowAttributes: (row, index) => {
                return {
                    'x-data': `NegocioData($store.negocios.get(${row.id}))`,
                    "x-id": `['negocio_tr','negocio-${row.id}']`,
                    class: 'negocio_row ' + (self.hasCheckbox ? 'has_checkbox ' : ''),
                    'data-toggle': 'popover',
                    'data-placement': 'bottom',
                    'data-trigger': 'hover',
                    'data-content': [
                        'Index: ' + index,
                        'ID: ' + row.id,
                        'Name: ' + row.name,
                        'Price: ' + row.price
                    ].join(', ')
                };
            }
        };
    },
    bootstrapTable(...args) {
        return this.bsTable.bootstrapTable(...args);
    },
    /**
     * Method to inspect what exactly was passed to the table
     */
    getOptions() {
        return this.bsTable.bootstrapTable('getOptions');
    },
    removeAll() {
        this.bsTable.bootstrapTable('removeAll');
        return this;
    },
    showLoading() {
        this.bsTable.bootstrapTable('showLoading');
        return this;
    },
    get pendingNegocios() {
        return this.dataStore.total - this.dataStore.properties.length;
    },
    createBsTable() {
        this.bsTable = $(this.$el).bootstrapTable({
            ...this.tblOptions,
        });
        const bsTableOptions = this.getOptions();
        bsTableOptions.showButtonText = true;
        this.append(this.data);
        this.resetContainerSize();
        initDropdownsBs(document.querySelector('#barebone_container'));
        this.dataStore.on('complete', (records) => this.reload(this.dataStore.properties));
        return this.bsTable;
    },
    hideLoading() {
        this.bsTable.bootstrapTable('hideLoading');
        return this;
    },
    get mappedColumns() {
        return sprColumns(this.$store.columnas_actuales.columnDefs);
    },
    refreshColumns() {
        this.bsTable.bootstrapTable('refreshOptions', {
            //@ts-ignore
            columns: this.mappedColumns
        });
        return this;
    },
    append(data) {
        this.bsTable.bootstrapTable('append', data);
        return this;
    },
    reload(data, columnsDefs) {
        this.showLoading();
        this.bsTable.bootstrapTable('load', [])
            //@ts-ignore    
            .bootstrapTable('refreshOptions', {
            //@ts-ignore
            columns: this.mappedColumns
        });
        waitFor(100).then(() => {
            this.bsTable
                //.bootstrapTable('showAllColumns')
                //.bootstrapTable('hideColumn', 'id')
                .bootstrapTable('hideLoading')
                .bootstrapTable('load', data ?? this.data);
            this.createScrollBooster();
            this.debouncedResetHeight();
            this.hideLoading();
        });
        return this.bsTable;
    },
    createResizeObserver() {
        this.resizeObserver = new ResizeObserver((entries) => {
            //   console.log('resizeObserver detected change');
            this.debouncedResetHeight(this.tableHeight);
        });
        ifDefined(this.fixedTableBody, body => this.resizeObserver.observe(body));
        return this.resizeObserver;
    },
    createScrollBooster() {
        if ((this.scrollBooster)) {
            this.scrollBooster.destroy();
        }
        if (!this.scrollableElement || !this.$el)
            return;
        const self = this;
        this.scrollBooster = new ScrollBooster({
            viewport: this.scrollableElement,
            content: this.$el,
            direction: 'horizontal',
            scrollMode: 'native',
            friction: 0.01,
            bounce: false,
            allowTextSelection: true,
            bounceForce: 0.00
        });
        return this.scrollBooster;
    },
    get loadingContainer() {
        return this.fixedTableBody.querySelector('.fixed-table-loading');
    },
    get loadingText() {
        return this.loadingContainer.querySelector('.loading-text');
    },
    /**
     * Methods that deal with table related HTMLElement (containers) end their heights
     */
    get scrollableElement() {
        return this.$el.closest(this.scrollableClass);
    },
    get tableHeight() {
        if (!(this.scrollableElement instanceof HTMLElement))
            return 'auto';
        let offsetTop = 10;
        return (window.innerHeight - this.scrollableElement.getBoundingClientRect().top) - offsetTop;
    },
    get fixedTableContainer() {
        let container = this.$el.closest('.fixed-table-container');
        if (container instanceof HTMLElement)
            return container;
        return null;
    },
    resetContainerSize() {
        if (this.fixedTableContainer instanceof HTMLElement) {
            this.$nextTick(() => {
                this.fixedTableContainer.style.maxHeight = 'unset !important';
                this.fixedTableContainer.style.height = 'unset !important';
            });
        }
    },
    get fixedTableBody() {
        return document.querySelector('.fixed-table-body');
    },
    resetHeight(height) {
        if (this.scrollableClass !== '.fixed-table-body')
            return;
        height = height ?? this.tableHeight;
        requestAnimationFrame(() => {
            ifDefined(this.fixedTableBody, fixed_table_body => {
                fixed_table_body.style.maxHeight = this.tableHeight + 'px';
                fixed_table_body.style.height = 'auto';
            });
            ifDefined(this.$el.querySelector('tbody'), tbody => tbody.style.transform = 'translateY(0)');
            ifDefined(this.fixedTableContainer, container => container.style.paddingBottom = '0px !important');
            this.bsTable?.bootstrapTable('resetView', { height });
            this.debouncedCreateScrollBooster();
            this.resetContainerSize();
        });
    },
    onCkeckOptions() {
        const self = this;
        return {
            onCheckAll: (rowsAfter, rowsBefore) => {
                const selection = this.bsTable.bootstrapTable('getSelections');
                selection.forEach((row) => {
                    //@ts-ignore
                    this.$store.negocios.get(row.id).checked = true;
                });
            },
            onUncheckAll: (rowsAfter, rowsBefore) => {
                const selection = this.bsTable.bootstrapTable('getSelections');
                selection.forEach((row) => {
                    //@ts-ignore
                    this.$store.negocios.get(row.id).checked = false;
                });
            },
            onCheck: (row, $element) => {
                const selection = this.bsTable.bootstrapTable('getSelections');
                //@ts-ignore
                this.$store.negocios.get(row.id).checked = true;
                //console.info({ row, $element, selection })
            },
            onUncheck: (row, $element) => {
                const selection = this.bsTable.bootstrapTable('getSelections');
                this.$store.negocios.get(row.id).checked = false;
                console.info({ row, $element, selection });
            },
            onColumnSwitch: (field, checked) => {
                console.log({ field, checked });
                self.createScrollBooster();
            },
        };
    }
});
export default SolicitudesPorRangoDynamicTable;
//# sourceMappingURL=SolicitudesPorRangoDynamicTable.js.map