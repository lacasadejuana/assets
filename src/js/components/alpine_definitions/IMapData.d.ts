import { ILayerDefinition } from "..";
import { Criteria } from './ILayerDefinition'
export interface IMapData {
    id: number;
    name: string;
    user_id: number;
    filter_id: number;
    sharing_level: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    description: null;
    map_type: string;
    sharing_level: string;
    map_status: IStoredStatus;
    layer_object: LayerObject;
    feature_collection?: GeoJSON.FeatureCollection;
}

export interface LayerObject {
    barrios: ILayerDefinition;
    heatmap: ILayerDefinition;
    ciclovias: ILayerDefinition;
    venta_casas: ILayerDefinition;
    arriendo_casas: ILayerDefinition;
    venta_departamentos: ILayerDefinition;
    arriendo_departamentos: ILayerDefinition;
    [key: string]: ILayerDefinition
}

export interface ArriendoCasas {
    name: string;
    type: string;
    criteria: Criteria;
    slug_name: string;
    layer_options: ArriendoCasasLayerOptions;
}



export interface ArriendoCasasLayerOptions {
    name: string;
    text: string;
    type: string;
    scale: number;
    criteria: Criteria;
    className: string;
    slug_name: string;
    fontFamily: string;
    fillOpacity: number;
    strokeColor: string;
    checked?: boolean;
}

export interface Barrios {
    name: string;
    type: string;
    slug_name: string;
    layer_options: BarriosLayerOptions;
}

export interface BarriosLayerOptions {
    url: string;
    name: string;
    type: string;
    checked: boolean;
    slug_name: string;
    fillOpacity: number;
    strokeColor: string;
}

export interface Ciclovias {
    name: string;
    type: string;
    slug_name: string;
    layer_options: CicloviasLayerOptions;
}

export interface CicloviasLayerOptions {
    url?: string;
    checked: boolean;
    fillOpacity: number;
    strokeColor: string;
    radius?: number;
}

export interface MapStatus {
    center: Center;
    mapTypeId: string;
    zoom: number;
}

export interface Center {
    lat: number;
    lng: number;
}
