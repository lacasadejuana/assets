
import { AlpineDataComponent } from "@lacasadejuana/types";



const comunas = [
    "Lo Barnechea",
    "Las Condes",
    "La Reina",
    "Ñuñoa",
    "Providencia",
    "Vitacura",
    "Santiago",
];

import { ILayerData, ILayerDefinition, IMapStore } from '@lacasadejuana/types';

export const saveLayer = ({ slug_name, layer_options }) => ({


    layer_options,
    _checked: false,
    slug_name,
    _length: 0,
    debouncedSaveLayer() {

    },
    get length() {
        return this._length
    },
    set length(value) {
        this._length = value
    },
    get icon() {
        return this.getIconOptions()
    },
    get label() {
        return this.getMarkerLabel()
    },
    iconPreview: null,
    isSaving: false,
    watch() {
        this.debouncedSetStyle = Alpine.debounce(this.setStyle.bind(this), 200)

        this.debouncedSaveLayer = Alpine.debounce(this.saveLayer)



        this.$watch('layer_options', (layer_options, previous_options) => {
            console.log('layer_options changed', { [this.slug_name]: layer_options })




            layer_options = {
                ...layer_options,
                icon: this.updateIcon ? this.updateIcon() : this.icon
            }
            this.getLayer()?.setMap(this.layer_options.checked ? globalThis.gmap : null)
            if (this.isSaving) return
            this.isSaving = true
            this.layer_options = layer_options
            this.length = this.getLayer()?.getLength()
            this.debouncedSaveLayer({ layer_options })
        })

        google.maps.event.addListener(this.getLayer(), 'map_changed', () => {
            console.log('map_changed')
            this.checked = globalThis.layers[slug_name].getMap() ? true : false
        })
        // this._checked = globalThis.layers[slug_name].getMap() ? true : false

    },
    getNameLabel(text = '', className = 'markerLabel bg-white border radius-4 p-1  ') {
        return {
            text,
            color: '#444',
            fontSize: '14px',
            className,
        };
    },
    get dealsWithCoords() {
        //@ts-ignore
        return Alpine.store('public_maps').dealsWithCoords;
    },

    save() {
        this.saveLayer({ layer_options: this.layer_options })
    },
    init() {
        console.log('init SaveLayer   ')
    },
    get featuresMatchingSearch(): google.maps.Data.Feature[] {
        return [] as google.maps.Data.Feature[]
    },
    saveLayer({ layer_options }) {

        // if the layer offer an icon preview UI, set the generated preview image
        // as the icon url
        if (this.iconPreview && this.iconPreview.url) {
            this.iconPreview = this.updateIcon()

            layer_options.icon.url = this.iconPreview.url

        }
        // in case the icon is an SVG path
        else if (this.layer_options.icon && this.layer_options.icon.path) {
            let {

                scale,
                fillColor,
                strokeColor,
                strokeOpacity,
                fillOpacity
            } = this.layer_options
            layer_options.path = this.layer_options.icon.path
            layer_options.icon = {
                path: this.layer_options.icon.path,
                scale: scale / 10,
                fillColor,
                strokeColor: strokeColor || fillColor,
                strokeOpacity,
                fillOpacity: fillOpacity || strokeOpacity,
                anchor: new google.maps.Point(-96, 46)
            }

        }


        let {
            layer_options: nested_options, ...newOptions } = layer_options,
            mergedOptions = {
                layer_options: {
                    ...newOptions,

                }
            };
        // console.log({ mergedOptions });

        (Alpine.store('public_maps') as IMapStore).saveLayer(this.slug_name, mergedOptions as ILayerDefinition)
            //@ts-ignore    
            .then(() => {
                this.debouncedSetStyle()
                this.isSaving = false;
            });

    },

    get checked() {
        return this.layer_options.checked
    },
    getBounds() {
        return this.getLayer().getBounds()
    },
    set checked(value) {

        this.getLayer()?.setMap(value ? globalThis.gmap : null)

        this.layer_options.checked = value
        //console.log('checked changing:', value)


    },
    getLayer() {
        return globalThis.layers[this.slug_name]
    },
    toggleMap() {
        //console.log('toggleMap ' + this.slug_name)
        const map = this.getLayer().getMap() ? null : globalThis.gmap
        this.getLayer().setMap(map)
        this._map = map
    },
    addMouseOverBehavior(layer: google.maps.Data) {
        if (this.mouseover_added) {
            //console.log(this.slug_name + ' mouseover behavior already added')

            return
        }
        this.mouseover_added = true
        //console.log(this.slug_name + ' adding mouseover behavior')

        google.maps.event.addListener(layer, 'mouseover', this.mouseOverListener);
        google.maps.event.addListener(layer, 'mouseout', this.mouseOutListener);
    },

    removeMouseOverBehavior(layer: google.maps.Data) {
        if (!this.mouseover_added) {
            // console.log(this.slug_name + ' mouseover behavior already removed')
            return
        }
        console.log(this.slug_name + ' removing mouseover behavior')
        this.mouseover_added = false
        google.maps.event.clearListeners(layer, 'mouseover');
        google.maps.event.clearListeners(layer, 'mouseout');
    },

    removeInfoWindowBehavior(layer: google.maps.Data): void {
        if (!this.infowindow_added) return
        this.infowindow_added = false

        google.maps.event.clearListeners(layer, 'click');
    },
    addInfoWindowBehavior(layer: google.maps.Data): void {
        if (this.infowindow_added) return
        this.infowindow_added = true

        google.maps.event.addListener(layer, 'click', this.clickListener);
    },
    getIconOptions(defaultScale = 1) {
        let iconUrl = this.iconUrl

        if (iconUrl) {

            //   console.log({ url, slug_name: this.slug_name })
            defaultScale = defaultScale * Number(this.layer_options.scale)
            let width = 54 * defaultScale,
                height = 54 * defaultScale;
            return {
                scale: defaultScale,
                url: iconUrl,
                size: { width: 54, height: 54 },
                anchor: { x: width / 2, y: height },
                scaledSize: { width, height },

            }
        }




    },
    getMarkerLabel(text) {

        return {
            text: text || 'HOLA ',
            //className: 'marker_label border border-green-600 p-1 -mt-2 h-12 w-12 -ml-4',//+*/ ' border  radius-full bg-white',
            className: '  border     bg-gray-300 border-2 translate-y-full  mb-3 mt-6 mr-1   -ml-2 h-4 w-8 z-0   border-top-0',
            // fontFamily: 'fontello',// "Font Awesome 5 Free",//"fontello",
            fontSize: 12,//Number(25 * this.layer_options.scale / 0.05).toFixed(1) + 'px',

            strokeColor: this.layer_options.fillColor,
            //@ts-ignore
            // color: 'transparent',
            //strokeColor: '#ccc',
            fillColor: '#ffffff',
            strokeOpacity: Number(this.layer_options.fillOpacity),
            fillOpacity: 2 * Number(this.layer_options.fillOpacity),
        }
    },




} as AlpineDataComponent<ILayerData<google.maps.Data | google.maps.visualization.HeatmapLayer>>)

