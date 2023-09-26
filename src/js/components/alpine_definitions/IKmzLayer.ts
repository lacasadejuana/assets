import { ILayerData } from "./ILayerData";

export interface IKmzLayer extends ILayerData<google.maps.visualization.HeatmapLayer> {

    getLayer(): google.maps.visualization.HeatmapLayer;

}
