import { BaseClass } from "../stores";
import { IBaseClass, TeventType } from "./IBaseClass";

export interface IApiSortOrder extends IBaseClass<'ready'> {
    apiSortBy: 'id' | 'created_at';
}
