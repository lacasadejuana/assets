import { ifDefined } from "..";

/**
 * Appends a script to the head of the document.
 * Used for third party dependencies in loadPartial navigation
 */
export function appendScript(src, id) {
    if (document.getElementById(id)) return console.warn(`Script ${id} already appended`)
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.id = id
    s.src = src
    $("head").append(s);
}

export async function loadScripts(scripts: { id: string, src: string }[]): Promise<void> {
    for (let script of scripts) {
        await new Promise((res) => loadScript(script.src, script.id, res))
        console.log('loaded script: ', script.id)
    }

    return Promise.resolve()
}
export function loadScript(path, id, callback) {
    ifDefined(document.getElementById(id), element => {
        console.warn(`Script ${id} already appended`)
        callback(element)
    })

    var element = document.createElement('script');
    element.setAttribute("type", 'text/javascript');
    element.setAttribute("src", path);
    element.id = id;
    return loadElement(element, callback);
}

function loadElement(element, callback) {
    element.setAttribute("defer", "");
    // element.setAttribute("async", "false");

    element.loaded = false;

    if (element.readyState) {  // IE
        element.onreadystatechange = function () {
            if (element.readyState == "loaded" || element.readyState == "complete") {
                element.onreadystatechange = null;

                loadElementOnLoad(element, callback);
            }
        };
    } else {                 // Others
        element.onload = function () {
            loadElementOnLoad(element, callback);
        };
    }

    (document.head || document.getElementsByTagName('head')[0] || document.body).appendChild(element);

    return element;
}

function loadElementOnLoad(element, callback) {
    if (element.loaded != true) {
        element.loaded = true;
        if (callback) callback(element);
    }
}
