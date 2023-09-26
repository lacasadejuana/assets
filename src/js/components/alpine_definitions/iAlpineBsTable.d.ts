import { BootstrapTableOptions } from 'bootstrap-table';
import ScrollBooster from 'scrollbooster';
import { DttColumn } from '../DttColumn';
import { INegocioRow } from '../alpine.store';


export interface IAlpineBsTable {
    bsTable: IBsTable;
    columns: DttColumn<INegocioRow>[];
    bttColumns: DttColumn<INegocioRow>[];
    init: () => void;
    getOptions: () => Omit<BootstrapTableOptions, 'searchSelector'> & { searchSelector?: string; };
    get tableHeight(): number;
    get fixedTableBody(): HTMLDivElement;
    resetHeight: (height: number) => void;
    heightElement: HTMLElement;
    heightObserver: MutationObserver;

    createBsTable: () => IBsTable;

    scrollBooster: ScrollBooster;
    tblOptions: Omit<BootstrapTableOptions, 'searchSelector'> & { searchSelector?: string; };

    resizeObserver: ResizeObserver;

    debouncedCreateScrollBooster: () => void;
    columnVisibility: Record<string, boolean>;

    fetchPage: () => Promise<void>;
    append: (data: INegocioRow[]) => void;
    reload: (data: INegocioRow[], columns: DttColumn<INegocioRow>[]) => IBsTable;

    createResizeObserver: () => void;
    createScrollBooster: () => void;
    onDrag(stats, e: Event): void;
    printScrollBooster: () => void;
    mappedColumns: DttColumn<INegocioRow>[],
    columns: DttColumn<INegocioRow>[],
    bttColumns: DttColumn<INegocioRow>[],
    columnVisibility: Record<string, boolean>,
    hasCheckbox: boolean,
    data: INegocioRow[],
    buffer: INegocioRow[],
    tblOptions: Omit<BootstrapTableOptions, 'searchSelector'> & { searchSelector?: string },
    bootstrapTable(...args: any[]): any,
    getOptions(): Omit<BootstrapTableOptions, 'searchSelector'> & { searchSelector?: string },
    get bootstrapTableOptions(): BootstrapTableOptions,
    get bootstrapTableContainer(): HTMLElement,
    get bootstrapTableBody(): HTMLElement,
    get scrollableElement(): HTMLElement,
}

export interface IBsTable extends JQuery<HTMLElement> {
    showButtonText: boolean,
    scrollBooster: ScrollBooster,
    heightElement: HTMLElement,
    heightObserver: MutationObserver,
    reload: (data: INegocioRow[], columns: DttColumn<INegocioRow>[]) => void,
    resetContainerSize(): void,
    get bootstrap5Container(): HTMLElement,
    get fixedTableContainer(): HTMLElement,
    get tableHeight(): number,
    get fixedTableBody(): HTMLElement,
    resetHeight(): void,
    resizeObserver: ResizeObserver,
    createResizeObserver(): void,
    fetchPage(): Promise<void>,
    shouldScroll(): boolean,
    isBlacklisted(): boolean
    onDrag(): void
    printScrollBooster(): void
}