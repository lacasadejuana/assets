import { Negocio } from "../entities/Negocio";
import { NegocioColumn } from "../entities/NegocioColumn";
import { ILayerData } from "./ILayerData";

export interface IMapLayerData extends ILayerData<google.maps.Data> {
    campos: NegocioColumn[];
    get infowindow(): google.maps.InfoWindow;
    getInfoWindow(): google.maps.InfoWindow;
    addInfoWindowBehavior(layer: google.maps.Data): void;
    dealsWithCoords: Negocio[];
    searchValue: string;
    marker: google.maps.Marker;
    name: string;
    mouseOverListener: (event: google.maps.Data.MouseEvent) => void;
    mouseOutListener: (event: google.maps.Data.MouseEvent) => void;
    clickListener: (event: google.maps.Data.MouseEvent) => void;

}
