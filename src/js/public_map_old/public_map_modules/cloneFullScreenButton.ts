import { waitFor } from '../../../../../../../negocios-panel/resources/js/components/plugins';

export async function cloneFullScreenButton(
    gmap: google.maps.Map,
    attempt = 0,
    cloneFromSelector = '.gm-fullscreen-control',
    controlPosition: google.maps.ControlPosition = google.maps.ControlPosition.RIGHT_TOP,
    options = {} as { [key: string]: string }): Promise<HTMLElement> {
    //@ts-ignore
    let fullScreenControl = document.querySelector(cloneFromSelector);

    return Promise.resolve().then(() => {

        if (!fullScreenControl) {
            if (attempt < 5)
                return waitFor(1000).then(() => cloneFullScreenButton(
                    gmap,
                    attempt++,
                    cloneFromSelector,
                    controlPosition,
                    options
                ));
            return Promise.reject(new Error('No se encontró el el botón de pantalla completa'));
        }


        let saveMapButton = gmap.controls[controlPosition].getAt(0) as HTMLElement;
        if (!saveMapButton || !saveMapButton.classList.contains('save_map_button')) {
            saveMapButton = fullScreenControl.cloneNode(true) as HTMLElement

            saveMapButton.className = '  save_map_button hover:text-black hover:text-3xl text-2xl text-gray-600';

            gmap.controls[controlPosition].push(saveMapButton);
        }

        //@ts-ignore
        return saveMapButton;

    });

}
