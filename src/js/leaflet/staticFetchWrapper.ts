import { openToast } from "./openToast";
import { ErrorResponse } from "./ErrorResponse";

globalThis.readCookie = (name: string): string => {
    return ((document.cookie || '')
        .split('; ')
        .find((row) => row.startsWith(`${name}=`)) || '')
        .split('=')[1];
}
globalThis.setCookie = (name: string, value: string, days: number = 365) => {

    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        //@ts-ignore
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/ ; SameSite=Lax; Secure";

}
export function getTokenValue(): string {
    //@ts-ignore
    let tokenMetaValue = document.querySelector('meta[name="csrf"]') && document.querySelector('meta[name="csrf"]').content
    //@ts-ignore
    let jwtMetaValue = document.querySelector('meta[name="jwt"]') && document.querySelector('meta[name="jwt"]').content
    let tokenElementValue = (document.querySelector('[name="_token"]') as HTMLInputElement) && (document.querySelector('[name="_token"]') as HTMLInputElement).value;
    return tokenMetaValue || tokenElementValue
}
export function getJwtValue(): string {
    //@ts-ignore
    return document.querySelector('meta[name="jwt"]') && document.querySelector('meta[name="jwt"]').content
}
export async function staticFetchWrapper<T extends unknown>(endpoint: string, options: RequestInit): Promise<T> {

    //@ts-ignore
    let tokenValue = getTokenValue()
    const sanctumToken = document.querySelector('meta[name="test_user_token"]') as HTMLMetaElement;

    if (!tokenValue && !sanctumToken) console.warn(endpoint + ': no token found (attempting anyway)');
    if (globalThis.readCookie('debug_lcdj')) {
        //@ts-ignore
        globalThis.setCookie('x-csrf-token', document.querySelector('meta[name="csrf"]') && document.querySelector('meta[name="csrf"]').content, 1)
    }

    let headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'charset': 'utf-8',

        'expect': 'application/json',
        'accept': 'application/json',
        ...options.headers
    }
    let jwtValue = getJwtValue()
    //@ts-ignore
    if (options.useJwt && jwtValue) {
        headers['Authorization'] = `Bearer ${jwtValue}`
    } else if (sanctumToken) {
        headers['Authorization'] = `Bearer ${sanctumToken.content}`
    } else {
        headers['X-CSRF-TOKEN'] = tokenValue
    }
    let mergedReqInit = {
        method: options.method ?? 'GET',
        headers,
        body: options.body
    };
    if (typeof options.body !== 'string') {
        mergedReqInit.body = JSON.stringify(options.body);
    }
    return fetch(endpoint, mergedReqInit).then(async (res) => {
        if (!location.href.includes('public') && !res.ok) {
            if (res.status == 401) {
                return location.href = '/logout'
            }
            throw new ErrorResponse(res.statusText, res.status);
        }

        return res.json();

    }).catch(err => {
        console.error(err)
        throw err
    })
}

/**
            * @param {string} formId
            */
export async function updateField(formId) {
    var form = $('#' + formId);
    return $.post("/negocio/updateSingleField", form.serialize()).then(
        res => {
            openToast({
                type: 'success',
                text: 'Se ha actualizado correctamente'
            })
            return res.success;
        }).catch(err => {
            console.warn(err)
            openToast({
                type: 'error',
                //@ts-ignore
                text: res.error
            })
            return false
        })
}

export async function patchNegocio(negocio, silent = false) {
    const {
        id,
        ...properties
    } = negocio;
    return staticFetchWrapper(`/api/negocios/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(properties)
    })
        .then(data => {
            console.log(data)
            //@ts-ignore
            if (data.success) {
                if (!silent) {
                    openToast({
                        type: 'success',
                        //@ts-ignore
                        text: data.message
                    })
                }
                return true;
            } else {
                openToast({
                    type: 'error',
                    //@ts-ignore
                    text: data.message
                })
                return false;
            }
        })
        .catch(error => {
            console.warn(error)
            openToast({
                type: 'error',
                text: error.message
            })
            return false;
        })
}
let patchTimeout = null
export async function debouncedPatchNegocio(negocio, silent) {
    clearTimeout(patchTimeout)
    patchTimeout = setTimeout(() => {
        patchNegocio(negocio, silent)
    }, 1000)
}