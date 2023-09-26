import { TOption } from "@/components/alpine_definitions/definitions.filters";
import { PropertyClass } from '../alpine_definitions';
import { TContactOption } from "../alpine_definitions/TContactOption";

export function processOption(option: string | PropertyClass | TOption): TOption {
    //@ts-ignore
    let entry = typeof option === 'string' ? { name: option, value: option, id: option } : {
        //@ts-ignore
        name: option.name || option.label || option.value || option,
        //@ts-ignore
        label: option.label || option.name || option.value || option,
        //@ts-ignore
        value: option.value || option.id || option.name || option,
        //@ts-ignore
        id: option.value || option.id || option.name || option
    };
    //@ts-ignore
    if (typeof option === 'object' && option && option.opt_group) entry.opt_group = option.opt_group

    if (/^\d+$/.test(entry.id)) entry.id = Number(entry.id);
    if (/^\d+$/.test(entry.value)) entry.value = Number(entry.value);
    return entry;
}
export function processContactOption(option: TContactOption): TContactOption {

    const optionObject = typeof option === 'string' ? { nombre_completo: option, id: option, name: option } : {
        nombre_completo: option.nombre_completo,
        id: option.id,
        email: option.email,
        name: option.nombre_completo
    };
    return optionObject;
}
