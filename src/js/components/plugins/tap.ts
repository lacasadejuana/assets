

export const tap = (element, callback) => {
    if (callback) callback(element);
    return element;
}