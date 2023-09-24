import { waitFor } from '../../components/plugins';
export async function cloneControlsButton(gmap, text, attempt = 0, cloneFromSelector = '.gmnoprint .gm-style-mtc', controlPosition = google.maps.ControlPosition.TOP_LEFT, options = {}) {
    //@ts-ignore
    let mapTypes = Array.from(document.querySelectorAll(cloneFromSelector));
    let lastContainer = mapTypes[mapTypes.length - 1];
    return Promise.resolve().then(() => {
        if (!lastContainer) {
            if (attempt < 5)
                return waitFor(1000).then(() => cloneControlsButton(gmap, text, attempt++, cloneFromSelector, controlPosition, options));
            return Promise.reject(new Error('No se encontró el contenedor del botón de cambio de mapa'));
        }
        let gmnoPrint = gmap.controls[controlPosition].getAt(0);
        if (!gmnoPrint || !gmnoPrint.classList.contains('gmnoprint')) {
            gmnoPrint = document.createElement('div');
            gmnoPrint.className = 'gmnoprint custom_maps';
            gmnoPrint.id = 'custom_maps';
            gmnoPrint.style.cssText = lastContainer.parentElement?.style?.cssText;
            gmap.controls[controlPosition].push(gmnoPrint);
            gmnoPrint.style.marginLeft = `${-1 * Number(gmnoPrint.style.marginLeft.replace('px', ''))}px`;
        }
        let UIButton = lastContainer.cloneNode(true);
        gmnoPrint.appendChild(UIButton);
        //buttonBar.appendChild(UIButton)
        const button = UIButton.querySelector('button');
        button.textContent = text;
        Object.entries(options).forEach(([key, value]) => button[key] = value);
        button.classList.add((options.id));
        button.id = options.id;
        //@ts-ignore
        return gmnoPrint;
    }).catch(err => {
        console.warn(err.message);
        let UIButton = document.createElement('button');
        UIButton.className = 'bg-white border-white custom-map-control-button fs-5 px-3 py-2';
        UIButton.textContent = text;
        Object.entries(options).forEach(([key, value]) => UIButton[key] = value);
        //locationButton.classList.add('');
        globalThis.gmap.controls[controlPosition].push(UIButton);
        console.warn(`cloneFromClass not found. Appending ${options.name} to controlsPosition`);
        //@ts-ignore
        return UIButton;
    });
}
//# sourceMappingURL=cloneControlsButton.js.map