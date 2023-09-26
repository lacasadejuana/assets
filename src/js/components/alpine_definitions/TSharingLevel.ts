import { ILayerDefinition } from './ILayerDefinition';


export type IMapPayload = {
    id: number;
    user_id: number;
    last_modified_by: number;
    filter_id: number;
    name: string;
    description: string;
    sharing_level: 'private' | 'shared' | 'public' | 'collaborative';
    layer_object: Record<string, ILayerDefinition>;
    map_status: IStoredStatus;
};
export type IStoredStatus = {
    center?: {
        lat: number;
        lng: number;
    };
    zoom?: number;
    mapTypeId?: string;
};

export type TSharingLevel = {
    id: string;
    title: string;
    description: string;
    icon: string;
};
