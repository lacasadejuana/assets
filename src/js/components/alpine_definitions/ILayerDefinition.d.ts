export interface ILayerDefinition {
    type: 'deals' | 'heatmap' | 'kmz' | 'geojson';
    slug_name: string;
    name: string;
    criteria?: Criteria;
    disabled?: boolean

    layer_options: ILayerOptions;
}

export interface Criteria {
    id_tipo_propiedad: number;
    id_tipo_negocio: number;
}

export interface ILayerOptions {
    fillColor?: string;
    strokeColor?: string;
    radio?: number;
    scale?: number;
    className?: string;
    text?: string;
    strokeOpacity?: number
    fillOpacity?: number;
    fontSize?: number | string;
    radius?: number;
    checked?: boolean;
    clickable?: boolean;
    labelProperty?: string;
    infoWindow?: boolean;
    strokeWeight?: number;
    url?: string,
    campos?: Record<string, string>;
    icon?: {
        url?: string
        path?: string
        [s: string]: any
    } | string
    [s: string]: any;

}
export interface IDealsLayerOptions extends ILayerOptions {
    className: string,
    text: string;
    scale: number;
}

export interface Path {
    prefix: string;
    iconName: string;
    icon: Array<any[] | number | string>;
}
