export * from './DttColumn';
export * from './alpine.store';
export * from './alpine_definitions';
export * from './hardCodedDateFields';
export * from './openToast';
export * from './plugins';
export * from './stores';


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
export const ifDefined = <T extends unknown>(element: T, callback: (arg: T) => void, fallback?: (arg: T) => void) => {
    if (element) {
        return callback(element);
    }
    //@ts-ignore
    return typeof fallback === 'function' ? fallback() : fallback;
}

globalThis.ifDefined = ifDefined
//@ts-ignore
export async function waitFor(delay = 500, cb = () => { }) {

    return new Promise((res) => {
        setTimeout(() => res(cb), delay)
    })
}
export async function requestAnimationPromise() {
    return new Promise((res) => {
        requestAnimationFrame(() => res(null))
    })
}
export const tap = (element, callback) => {
    if (callback) callback(element);
    return element;
}