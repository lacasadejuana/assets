import { CampoFiltro } from './definitions.filters';



export interface ITableHeader {
    inputWidth: number;
    colWidth: number;
    onMouseOver: () => void;
    campo: CampoFiltro;
    newColName: string;
    init: () => void;
    contextMenuHtml: string;
    contextMenuShow: boolean;
    apagarColumna: () => void;
    closeMenu: () => void;
    openMenu: () => void;

}
