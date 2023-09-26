import { IHeatMapLayerData, IMapLayerData } from '@/negocios_modules';
import {
    ICamposBusqueda,
    iCurrentColumns,
    IFilterStore,
    IMapData,
    IMapFrameData,
    INegocioStore
} from '.';
import { IUserStore } from '.';
import { AlpineDataComponent } from '..';
import { ILayerDefinition } from './ILayerDefinition';
import { IMapPayload, TSharingLevel, IStoredStatus } from "./TSharingLevel";
import { IKmzLayer } from "@/negocios_modules/map_modules/IKmzLayer";

export interface ISavedMap {
    name: string;
    user_id: number;
    created_at: string;
    id: number;
    sharing_level: string;
    description: null;
    map_status: null;
    layer_object: null;
    user: IUser;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
    can_be_impersonated: boolean;
}


export interface IMapStore {
    reloadSavedMaps(savedMaps: ISavedMap[]): void
    updateProperties(mapData: IMapData): void;
    map_name: string | null;
    map_description: string | null;
    sharing_level: string | null;
    map_type: string | null;
    layer_object: any | null;
    id: number | null;
    layerSlugs: string[];
    user_id: number | null;
    saveLayer: (slug_name: string, layer_options: ILayerDefinition) => void;
    init(): void;
    saveMap(): Promise<void | ISavedMap[]>
    cloneMap(): Promise<void | ISavedMap[]>
    savedMaps: ISavedMap[],
    pushLayer(options: ILayerDefinition): void;
    refreshSavedMaps(): Promise<void | ISavedMap[]>
    layer_array: ILayerDefinition[];
    createLayers(mapFrameData: AlpineDataComponent<IMapFrameData>): Promise<any>;
    dataLayers: (IMapLayerData | IHeatMapLayerData | IKmzLayer)[]
    token: string,
    get payload(): IMapPayload;
    get active_filter(): number;
    //sharingLevels?: Record<string, TSharingLevel>
    $store: {
        columnas_actuales: iCurrentColumns;
        campos_busqueda: ICamposBusqueda;
        negocios: INegocioStore;
        active_filter: IFilterStore;
        user: IUserStore;
    };
    url: URL;
    sharingLevels: Record<string, TSharingLevel>;
    filter_id: number | null;
    map_sharing_level: (string & 'private') |
    'shared' |
    'public' |
    'collaborative';
    storedStatus: IStoredStatus;
    get sharingLevelDescription(): string;
}
