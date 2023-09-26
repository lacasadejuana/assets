import { AlpineDataComponent } from '../alpine.store';
import { INegocioRow, TPropertyValue, TSeudoStore } from './INegocioRow';

export interface IDummyNegocio extends INegocioRow {
    readonly id: number;
    readonly nombre: string;
    readonly fecha_creacion_visual: string;
    id_tipo_negocio: number;
    id_tipo_propiedad: number;
    id_etapa_negocio: number;
    toJSON(): INegocioRow;
    searchstring: string;
    readonly _negocio: INegocioRow;
    readonly _extra_props: INegocioRow;
    readonly slugs: string[];
    readonly initial: Map<string, TPropertyValue>;
    match: (criteria: Record<string, TPropertyValue>) => boolean;
    changes: Record<string, TPropertyValue>;

    shown_value(slug_name: string): string;
    validateInputs({ property }: { property: string; }): Promise<{ prefixed_property: string; }>;
    save(): Promise<boolean>;
    syncInitialValues(): Record<string, unknown>;

    readonly className: 'DummyNegocio' | 'Negocio';
    controls: Map<string, AlpineDataComponent<unknown>>;

}
