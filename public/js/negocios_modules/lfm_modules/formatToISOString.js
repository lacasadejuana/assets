export function formatToISOString(dateString) {
    dateString = dateString ?? new Date().toISOString().substr(0, 19);
    if (isIsoFormat(dateString))
        return dateString;
    dateString = String(dateString).replace('null', '').replace('undefined', '');
    if (!dateString)
        return new Date().toISOString().substr(0, 19);
    dateString = dateString
        .replace(', ', ' ')
        .replace(' ', 'T')
        .replace(/\//g, '-')
        .replace(/^(\d{2})-(\d{2})-(\d{4})/, '$3-$2-$1');
    return ((dateString.substr(0, 10) + 'T' + dateString.substr(11, 5))
        .padEnd(19, ':00')
        .replace(/:0$/, ':00')
        .replace(/T:/, 'T') + 'Z');
    //.substr(0, (this || {}).input_is_datetime ? 16 : 10)
}
export function isIsoFormat(dateString) {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateString);
}
//# sourceMappingURL=formatToISOString.js.map