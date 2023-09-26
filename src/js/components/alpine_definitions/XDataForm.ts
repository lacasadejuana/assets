import { TStoreParams } from '../TStoreParams';
import { ISingleFileInput } from './ISingleFileInput';

export type XDataForm = (TStoreParams[1]) & {
    className: string;
    properties: Record<string, unknown>;
    set: (key: string, value: unknown) => void;
    get: (key: string) => unknown;
    isEqual?: (key: string, value: unknown) => boolean;
    save_property?: (frm: HTMLFormElement) => void;
    populatePropertyForm?: (form: FormData, empty: boolean) => FormData;
    updateFromPlace?: (place: google.maps.places.PlaceResult) => void;
    updateAddressComponents?: (addrress_components: google.maps.GeocoderAddressComponent[]) => Record<string, unknown>;
    updateFromLatLng?: (location: google.maps.LatLngLiteral, currentValue?: string) => void;
    createAutoCompleter: (autocompleteInput: HTMLInputElement) => void;
};

export type IFormStore = XDataForm & {

    current?: number | string | null;
    className: string;





    pushFile(name: string, file: (File | ISingleFileInput) & { slug_name: string }): void;
    pruneFilesBy(name: string): void;
    deleteFileById(name: string, id: string): void;
    updateFile(name: string, id: string, properties: Record<string, unknown>): void;
    uploadedFiles(name: string): Record<string, unknown>
}
