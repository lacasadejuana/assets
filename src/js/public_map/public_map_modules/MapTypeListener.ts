import { IBaseClass } from '@/components';
import { BaseClass } from '@/components/stores';
import { BentleyMap, FlatDesign, Grass, LightBlueMap, PaperMap, ShiftWorker } from "./map_styles";

export class MapTypeListener extends BaseClass implements IBaseClass<'changed' | 'save'> {
    gmap: google.maps.Map;
    gmnoPrint: HTMLElement;
    saveMapButton: HTMLElement;
    onChangedHandlers: ((mapTypeId: string) => void)[] = []
    onSaveHandlers: (() => void)[] = []
    buttonpromises: Promise<unknown>[] = []
    constructor(gmap: google.maps.Map) {
        super();
        this.gmap = gmap
        this.addCustomStyles().then(async () => {


            this.addClickListener()


            //@ts-ignore
            if (Alpine.store('public_maps').full_map) {
                let mapSearch = document.querySelector('#searchCampo');
                //  mapSearch.appendChild(styleTag2[0])

                //@ts-ignore
                this.gmap.controls[google.maps.ControlPosition.TOP_RIGHT].push(mapSearch);
            } else {
                console.log('inject styles to gmap')
                let styleTag2 = document.createElement('style')
                styleTag2.textContent = `@import url('/css/app.css')`

                this.gmap.controls[google.maps.ControlPosition.TOP_RIGHT].push(styleTag2);
            }

            return this
        })
    }

    onChanged(handler: (mapTypeId: string) => void) {
        this.on('changed', handler)

        return this
    }


    addCustomStyles() {
        if (this.buttonpromises.length) return Promise.all(this.buttonpromises)
        Object.entries({ BentleyMap, ShiftWorker, LightBlueMap, Grass, FlatDesign, PaperMap })
            .forEach(([id, { name, alt, img, styles }]) => {
                const promise = new Promise((resolve) => {
                    const styledMapType = new google.maps.StyledMapType(styles, { alt, name });
                    console.log(`Adding mapType ${name}`)
                    this.gmap.mapTypes.set(id, styledMapType);
                    resolve(id)
                });
                this.buttonpromises.push(
                    promise
                );
            })

        return Promise.all(this.buttonpromises)
    }
    addClickListener() {
        this.gmnoPrint = this.gmnoPrint || document.querySelector('.gmnoprint.custom_maps');
        this.gmnoPrint && this.gmnoPrint.addEventListener('click', (e: Event) => {
            const button: HTMLButtonElement = e.target as HTMLButtonElement,
                //@ts-ignore
                { id, rel, name } = button

            this.gmap.setMapTypeId(button.id)
        })
    }
    addMapTypeChangedListener() {
        google.maps.event.addListener(this.gmap, 'maptypeid_changed', () => {
            const id = 1;// this.gmap.getMapTypeId()
            this.processEventListeners('changed', id)

            const gmnoPrint = this.gmnoPrint || document.querySelector('.gmnoprint.custom_maps');
            if (!gmnoPrint) return

            gmnoPrint.className = `gmnoprint custom_maps ${id}`
            const mapButtons = Array.from(gmnoPrint.querySelectorAll('button'))
            const mapTypeButtons = Array.from(gmnoPrint.querySelectorAll('button.mapType')) as HTMLButtonElement[]
            const button = gmnoPrint.querySelector(`#${id}`) as HTMLButtonElement
            if (button) {
                mapButtons.forEach(button => {
                    button.style.fontWeight = 'normal'
                    button.classList.remove('font-bold')
                });
                button.style.fontWeight = '500'
                //button.classList.add('font-bold')
            } else {
                mapTypeButtons.forEach(button => {
                    button.style.fontWeight = 'normal'
                    button.classList.remove('font-bold')
                });

            }



        })
    }




}
