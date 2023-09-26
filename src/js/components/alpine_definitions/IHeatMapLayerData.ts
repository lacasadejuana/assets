import { ILayerData } from "@lacasadejuana/types";
import { Negocio } from "../entities/Negocio";

export interface IHeatMapLayerData extends ILayerData<google.maps.visualization.HeatmapLayer> {
    dealsWithCoords: Negocio[];
    getLayer(): google.maps.visualization.HeatmapLayer;

}
