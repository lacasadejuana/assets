const comunas = [
    "Lo Barnechea",
    "Las Condes",
    "La Reina",
    "Ñuñoa",
    "Providencia",
    "Vitacura",
    "Santiago",
];
import { markerFactory } from "./marker_factory/markerFactory";
export const saveLayer = ({ slug_name, layer_options }) => ({
    layer_options,
    _checked: false,
    slug_name,
    _length: 0,
    debouncedSaveLayer() {
    },
    get length() {
        return this._length;
    },
    set length(value) {
        this._length = value;
    },
    get icon() {
        return this.getIconOptions();
    },
    get label() {
        return this.getMarkerLabel();
    },
    iconPreview: null,
    isSaving: false,
    watch() {
        this.debouncedSetStyle = Alpine.debounce(this.setStyle.bind(this), 200);
        this.debouncedSaveLayer = Alpine.debounce(this.saveLayer);
        this.$watch('layer_options', (layer_options, previous_options) => {
            console.log('layer_options changed', { [this.slug_name]: layer_options });
            layer_options = {
                ...layer_options,
                icon: this.updateIcon ? this.updateIcon() : this.icon
            };
            this.getLayer()?.setMap(this.layer_options.checked ? globalThis.gmap : null);
            if (this.isSaving)
                return;
            this.isSaving = true;
            this.layer_options = layer_options;
            this.length = this.getLayer()?.getLength();
            this.debouncedSaveLayer({ layer_options });
        });
        google.maps.event.addListener(this.getLayer(), 'map_changed', () => {
            console.log('map_changed');
            this.checked = globalThis.layers[slug_name].getMap() ? true : false;
        });
        // this._checked = globalThis.layers[slug_name].getMap() ? true : false
    },
    getNameLabel(text = '') {
        return {
            text,
            color: '#444',
            fontSize: '15px',
            className: 'markerLabel bg-white border radius-4 p-1  ',
        };
    },
    get dealsWithCoords() {
        //@ts-ignore
        return Alpine.store('maps').dealsWithCoords;
    },
    save() {
        this.saveLayer({ layer_options: this.layer_options });
    },
    init() {
        console.log('init SaveLayer   ');
    },
    get featuresMatchingSearch() {
        return [];
    },
    saveLayer({ layer_options }) {
        if (this.iconPreview) {
            this.iconPreview = this.updateIcon();
            layer_options.icon.url = this.iconPreview.url;
            if (layer_options.icon.url !== this.iconPreview.url) {
                this.layer_options.icon = this.iconPreview;
            }
        }
        else if (this.layer_options.icon && this.layer_options.icon.path) {
            let { scale, fillColor, strokeColor, strokeOpacity, fillOpacity } = this.layer_options;
            layer_options.path = this.layer_options.icon.path;
            layer_options.icon = {
                path: this.layer_options.icon.path,
                scale: scale / 10,
                fillColor,
                strokeColor: strokeColor || fillColor,
                strokeOpacity,
                fillOpacity: fillOpacity || strokeOpacity,
                anchor: new google.maps.Point(-96, 46)
            };
        }
        let { layer_options: nested_options, ...newOptions } = layer_options, mergedOptions = {
            layer_options: {
                ...newOptions,
            }
        };
        // console.log({ mergedOptions });
        Alpine.store('maps').saveLayer(this.slug_name, mergedOptions)
            //@ts-ignore    
            .then(() => {
            this.debouncedSetStyle();
            this.isSaving = false;
        });
    },
    getIconOptions(defaultScale = 1) {
        let { text, fontFamily, strokeColor, fillOpacity, fillColor, strokeOpacity, fontSize, scale, icon } = this.layer_options.markerOpts || this.layer_options;
        if (!icon) {
            return markerFactory({
                label: text,
                fontFamily: fontFamily || "fontello",
                strokeColor: strokeColor || '#0066aa',
                fillColor: fillColor || '#ffffff',
                strokeOpacity: Number(strokeOpacity || fillOpacity),
                fillOpacity: Number(fillOpacity || 1),
                fontSize: fontSize || 36,
                // no_cache: true,
                scale: Number(scale || defaultScale)
            });
        }
        if (icon.path) {
            let { scale, fillColor, strokeWeight, strokeColor, strokeOpacity, fillOpacity, icon, rotation } = this.layer_options;
            return {
                path: icon.path,
                scale: scale / 10,
                fillColor: strokeColor || icon.strokeColor || strokeColor,
                strokeColor: strokeColor,
                strokeOpacity: strokeOpacity,
                strokeWeight: strokeWeight || 1,
                fillOpacity: fillOpacity,
                rotation: rotation || 180
            };
        }
        if (icon.url) {
            //   console.log({ url, slug_name: this.slug_name })
            defaultScale = defaultScale * Number(this.layer_options.scale);
            let width = 84 * defaultScale, height = 96 * defaultScale;
            return {
                scale: defaultScale,
                url: icon.url,
                size: { width: 96, height: 96 },
                anchor: { x: width / 2, y: height },
                scaledSize: { width, height }
            };
        }
    },
    get checked() {
        return this.layer_options.checked;
    },
    getBounds() {
        return this.getLayer().getBounds();
    },
    set checked(value) {
        this.getLayer()?.setMap(value ? globalThis.gmap : null);
        this.layer_options.checked = value;
        //console.log('checked changing:', value)
    },
    getLayer() {
        return globalThis.layers[this.slug_name];
    },
    toggleMap() {
        //console.log('toggleMap ' + this.slug_name)
        const map = this.getLayer().getMap() ? null : globalThis.gmap;
        this.getLayer().setMap(map);
        this._map = map;
    },
    addMouseOverBehavior(layer) {
        if (this.mouseover_added) {
            //console.log(this.slug_name + ' mouseover behavior already added')
            return;
        }
        this.mouseover_added = true;
        //console.log(this.slug_name + ' adding mouseover behavior')
        google.maps.event.addListener(layer, 'mouseover', this.mouseOverListener);
        google.maps.event.addListener(layer, 'mouseout', this.mouseOutListener);
    },
    addDragBehavior(layer) {
        if (this.drag_behavior_added) {
            console.log(this.slug_name + ' drag behavior already added');
            return;
        }
        this.drag_behavior_added = true;
        //console.log(this.slug_name + ' adding drag behavior')
        google.maps.event.addListener(layer, 'mousedown', this.dragStartListener);
        google.maps.event.addListener(layer, 'mouseup', this.dragEndListener);
    },
    removeMouseOverBehavior(layer) {
        if (!this.mouseover_added) {
            // console.log(this.slug_name + ' mouseover behavior already removed')
            return;
        }
        console.log(this.slug_name + ' removing mouseover behavior');
        this.mouseover_added = false;
        google.maps.event.clearListeners(layer, 'mouseover');
        google.maps.event.clearListeners(layer, 'mouseout');
    },
    removeDragehavior(layer) {
        if (!this.drag_behavior_added) {
            //console.log(this.slug_name + ' drag behavior already removed')
            return;
        }
        //console.log(this.slug_name + ' removing drag behavior')
        this.drag_behavior_added = false;
        google.maps.event.clearListeners(layer, 'mousedown');
        google.maps.event.clearListeners(layer, 'setgeometry');
    },
    removeInfoWindowBehavior(layer) {
        if (!this.infowindow_added)
            return;
        this.infowindow_added = false;
        google.maps.event.clearListeners(layer, 'click');
    },
    addInfoWindowBehavior(layer) {
        if (this.infowindow_added)
            return;
        this.infowindow_added = true;
        google.maps.event.addListener(layer, 'click', this.clickListener);
    },
    getMarkerLabel() {
        return {
            //text: String.fromCharCode(parseInt(this.layer_options.text, 16)),
            text: ' ',
            //className: 'marker_label border border-green-600 p-1 -mt-2 h-12 w-12 -ml-4',//+*/ ' border  radius-full bg-white',
            className: 'marker_label border border-red-500  bg-gradient border-2 translate-y-full rounded-circle mb-3 mt-6 mr-1   -ml-2 h-4 w-8 z-0   border-top-0',
            fontFamily: "Font Awesome 5 Free",
            fontSize: Number(25 * this.layer_options.scale / 0.05).toFixed(1) + 'px',
            strokeColor: this.layer_options.fillColor,
            //@ts-ignore
            color: 'transparent',
            //strokeColor: '#ccc',
            fillColor: '#ffffff',
            strokeOpacity: Number(this.layer_options.fillOpacity),
            fillOpacity: 2 * Number(this.layer_options.fillOpacity),
        };
    },
});
//# sourceMappingURL=saveLayer.js.map