import { ILayerData } from "@lacasadejuana/types";




export interface IGeoJsonLayerData extends ILayerData<google.maps.Data> {
    getLayer(): google.maps.Data;

}
