import Alpine from 'alpinejs'
//@ts-ignore
export type IOpenToastOptions = {
    type?: 'info' | 'success' | 'error' | 'warning',
    text?: string,
    delay?: number,
    from?: string,
    description?: string,
    callback?: () => void
}

function openToastRaw(options: IOpenToastOptions = {}): void {

    if (typeof options === 'string') {
        let textmsg = options;
        options = {
            type: 'info',
            text: textmsg,
            delay: 2000,
            from: null,
            description: '',
            callback: () => { }
        }
    }
    let {
        type = 'info',
        text = 'Solicitud guardada exitosamente',
        delay = 2000,
        from = null,
        description = '',
        callback = () => { }
    } = options


    if (from) console.info('openToast called from ' + from)
    globalThis.dispatchEvent(
        new CustomEvent('notice', {
            detail: {
                type,
                title: text,
                description,
                delay
            }
        })
    )
    if (callback) {
        setTimeout(callback, delay)
    }
}
export const openToast = Alpine.debounce(openToastRaw, 400)

globalThis.openToast = openToast;

