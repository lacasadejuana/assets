import { AlpineContext } from '.';
import { CampoFiltro } from './definitions.filters';


export type TFilterContext = AlpineContext & {
    $id?: (namespace: string, element: string) => void;
    'x-show'?: string;
    'x-id'?: string;
    'x-trap.noscroll.inert'?: string;
    '@dialog.window'?: string;
    '@keydown.escape.prevent.stop'?: string;
    ':id'?: string;
    ':role'?: string;
} & {
    campos_busqueda?: Record<string, CampoFiltro>;
};
