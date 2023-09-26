import { ILayerOptions } from "./ILayerDefinition";

export interface ILayerData<TLayerType extends google.maps.Data | google.maps.visualization.HeatmapLayer> {
    gmap: google.maps.Map;
    layer_options: ILayerOptions

    init(): void;
    slug_name: string,
    name: string,
    _map: google.maps.Map;
    filters_open: boolean,
    saveLayer(newOptions: Record<string, unknown>): void;
    setStyle(): ILayerData;
    removeFeatures(): void;
    addLayerToMap({ slug_name: string }): void
    get map(): google.maps.Map;
    get gmap(): google.maps.Map;
    appendFeatures(): Promise<TLayerType>;
    getLayer(): TLayerType;
    controls: {
        property: string,
        name: string,
        min?: number,
        max?: number,
        step?: number,
        inputType: string
    }[]
    layer: TLayerType;
}