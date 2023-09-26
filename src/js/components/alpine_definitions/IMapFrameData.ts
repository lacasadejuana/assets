import { AlpineDataComponent } from '@lacasadejuana/types';
import TomSelect from 'tom-select';
import { NegocioColumn } from '../../components/entities/NegocioColumn';
import { ILayerData } from './ILayerData';
import { ILayerDefinition } from './ILayerDefinition';
export type TLayerType = AlpineDataComponent<ILayerData<google.maps.Data | google.maps.visualization.HeatmapLayer>>;
export interface IMapFrameData {
    campos: NegocioColumn[];
    gmap: google.maps.Map | null;
    mapTypes: google.maps.MapType[];
    lastType: google.maps.MapType | null;
    mapTypesContainer: HTMLElement | null;
    onClick(): void;
    onMapTypeChange(): void;
    barriosLayer: google.maps.Data | null;
    negociosLayer: google.maps.Data | null;
    cloneControlsButton(attempt?: number): Promise<HTMLButtonElement>;
    init(): void;
    createMap(): Promise<google.maps.Map>;
    addNegociosToMap(): google.maps.Data;
    mapOptions: google.maps.MapOptions;
    barriosVisible: boolean;
    barriosButton: HTMLButtonElement | null;
    infowindow: google.maps.InfoWindow;
    dataLayers: TLayerType[];
    layers: ILayerDefinition[];
    tomSelect: TomSelect;
    storedStatus: {
        center: {
            lat: number;
            lng: number;
        };
        zoom: number;
        mapTypeId: string;
    };
}
