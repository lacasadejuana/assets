/**
 * Receives an element, a callback and an optional fallback
 * If the element is defined, return the output of invoking the callback with the element as argument
 * Otherwise, return the output of the falalback (it it's a function) or the fallback itself if
 *
 * @param {any} element  The element to be checked
 * @param {Function} callback  IF the element is defined, this callback will be called with the element as argument
 * @param {Function|unknown|null} fallback  The value to be returned if the element is undefined
 * @returns
 */
export const ifDefined = (element, callback, fallback = null) => {
    if (element) {
        callback(element);
    }
    return typeof fallback === 'function' ? fallback() : fallback;
};
//# sourceMappingURL=ifDefined.js.map