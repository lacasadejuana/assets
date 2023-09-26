export function extendMapDataProtoType() {
    let maps = google.maps

    console.info({ googleMaps: maps })


    // Define Marker Shapes
    var MAP_PIN = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z';
    var SQUARE_PIN = 'M22-48h-44v43h16l6 5 6-5h16z';
    var SHIELD = 'M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z';
    var ROUTE = 'M24-28.3c-.2-13.3-7.9-18.5-8.3-18.7l-1.2-.8-1.2.8c-2 1.4-4.1 2-6.1 2-3.4 0-5.8-1.9-5.9-1.9l-1.3-1.1-1.3 1.1c-.1.1-2.5 1.9-5.9 1.9-2.1 0-4.1-.7-6.1-2l-1.2-.8-1.2.8c-.8.6-8 5.9-8.2 18.7-.2 1.1 2.9 22.2 23.9 28.3 22.9-6.7 24.1-26.9 24-28.3z';
    var SQUARE = 'M-24-48h48v48h-48z';
    var SQUARE_ROUNDED = 'M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z';

    var inherits = function (childCtor, parentCtor) {
        /** @constructor */
        function tempCtor() { };
        tempCtor.prototype = parentCtor.prototype;
        childCtor.superClass_ = parentCtor.prototype;
        childCtor.prototype = new tempCtor();
        childCtor.prototype.constructor = childCtor;
    };

    // Marker Label Overlay
    class MarkerLabel extends maps.OverlayView {
        listeners: any[];
        constructor(options) {
            super()
            var self = this;
            this.setValues(options);

            // Create the label container
            this.div = document.createElement('div');
            this.div.className = 'map-icon-label';

            // Trigger the marker click handler if clicking on the label
            maps.event.addDomListener(this.div, 'click', function (e) {
                (e.stopPropagation) && e.stopPropagation();
                maps.event.trigger(self.marker, 'click');
            });
        }
        onAdd() {
            var pane = this.getPanes().overlayImage.appendChild(this.div);
            var self = this;

            this.listeners = [
                google.maps.event.addListener(this, 'position_changed', function () { self.draw(); }),
                google.maps.event.addListener(this, 'text_changed', function () { self.draw(); }),
                google.maps.event.addListener(this, 'zindex_changed', function () { self.draw(); })
            ];
        }

        // Marker Label onRemove
        onRemove() {
            this.div.parentNode.removeChild(this.div);

            for (var i = 0, I = this.listeners.length; i < I; ++i) {
                google.maps.event.removeListener(this.listeners[i]);
            }
        }
        draw() {
            var projection = this.getProjection();
            var position = projection.fromLatLngToDivPixel(this.get('position'));
            var div = this.div;

            this.div.innerHTML = this.get('text').toString();

            div.style.zIndex = this.get('zIndex'); // Allow label to overlay marker
            div.style.position = 'absolute';
            div.style.display = 'block';
            div.style.left = (position.x - (div.offsetWidth / 2)) + 'px';
            div.style.top = (position.y - div.offsetHeight) + 'px';
        }
    };
    maps.importLibrary('marker').then(() => {
        class Marker extends maps.Marker {
            constructor(options) {
                super();
                maps.Marker.apply(this, arguments);

                if (options.map_icon_label) {
                    this.MarkerLabel = new MarkerLabel({
                        map: this.map,
                        marker: this,
                        text: options.map_icon_label
                    });
                    this.MarkerLabel.bindTo('position', this, 'position');
                }
            }
            setMap() {
                maps.Marker.prototype.setMap.apply(this, arguments);
                (this.MarkerLabel) && this.MarkerLabel.setMap.apply(this.MarkerLabel, arguments);
            }
        }


    })
    // Custom Marker SetMap







    //@ts-ignore
    maps.Data.prototype.getBounds = function () {
        var featuresArray = [];
        var bounds = new maps.LatLngBounds();
        this.forEach(function (feature) {
            //@ts-ignore
            bounds.union(feature.getBounds());

        });
        return bounds;
    };
    maps.Data.prototype.removeFeatures = function () {

        this.forEach(feature => {
            this.remove(feature)
        });


    };
    //@ts-ignore
    maps.Data.prototype.getArray = function () {
        const featuresArray = [];

        this.forEach(function (feature) {
            featuresArray.push(feature);

        });
        return featuresArray;
    };
    //@ts-ignore
    maps.Data.Feature.prototype.getProperties = function () {
        const properties = {};

        this.forEachProperty((value, name) => {
            properties[name] = value;

        });
        return properties;
    };
    //@ts-ignore
    maps.Data.prototype.getLength = function () {
        let length = 0;

        this.forEach(function (feature) {
            //@ts-ignore
            length++;

        });
        return length;
    };
    /**
 *
 * @typedef {object} CustomMapOptions
 * @property {string} type
 * @property {string} name
 * @property {string} alt
 * @property {string} img
 */
    /**
     * Adds a mapType to the current InstaMap instance
     * @param {google.maps.MapTypeStyle[]} styles            [description]
     * @param {google.maps.StyledMapTypeOptions|CustomMapOptions} StyleConstructor [description]
     */
    /* maps.prototype.addMapType = function (
         styles,
         {
             type = 'styled_map',
             name = 'Styled Map',
             alt = 'A Styled Map',
             img = '/img/maptypes/roadmap_100.png',
         }
     ) {
         try {
             const styledMapType = new google.maps.StyledMapType(styles, { alt, name });
             this.mapTypes.set(type, styledMapType);
 
             // Esto se usa para alimentar la vista de handlebars
             var mapStyleAttrs = {
                 type,
                 img,
                 name,
                 description: alt,
             };
 
             this.mapTypeIds.push(type);
         } catch (e) {
             console.warn('Exception for maptype', type, e);
         }
         return this.mapTypes;
     }*/
    return maps
}
