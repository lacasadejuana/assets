export function processContactOption(option) {
    return typeof option === 'string'
        ? { nombre_completo: option, name: option, id: option } : {
        nombre_completo: option.nombre_completo,
        name: option.nombre_completo,
        id: option.id,
        email: option.email
    };
}
export function processOption(option) {
    //@ts-ignore
    return typeof option === 'string' ? { name: option, value: option, id: option } : {
        //@ts-ignore
        name: option.name || option.value || option,
        //@ts-ignore
        value: option.value || option.id || option.name || option,
        //@ts-ignore
        id: option.value || option.id || option.name || option
    };
}
//# sourceMappingURL=processOption.js.map