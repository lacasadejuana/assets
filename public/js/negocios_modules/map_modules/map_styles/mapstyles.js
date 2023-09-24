// @ts-check
/**
 * @typedef {{name:string, alt:string, img:string, styles: google.maps.MapTypeStyle[] }} styleEntry
 */
/**
 * @type {Record<string, styleEntry>}
 */
export const mapStyles = {
    AquaMap: {
        name: 'Aqua Map',
        alt: 'A cool two tone map that looks great when zoomed in',
        img: '/img/maptypes/aquamap_100.png',
        styles: [
            {
                featureType: 'landscape',
                stylers: [
                    {
                        color: '#6c8080',
                    },
                    {
                        visibility: 'simplified',
                    },
                ],
            },
            {
                elementType: 'labels.text',
                featureType: 'administrative',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road',
                stylers: [
                    {
                        visibility: 'simplified',
                    },
                ],
            },
            {
                featureType: 'poi',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                elementType: 'labels',
                featureType: 'road.highway',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                elementType: 'labels',
                featureType: 'road.highway',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                elementType: 'labels.icon',
                featureType: 'road',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                elementType: 'labels',
                featureType: 'transit',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                elementType: 'labels',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                stylers: [
                    {
                        color: '#d98080',
                    },
                    {
                        hue: '#eeff00',
                    },
                    {
                        lightness: 100,
                    },
                    {
                        weight: 1.5,
                    },
                ],
            },
        ],
    },
    BlueMap: {
        name: 'Blue Map',
        alt: 'Example provided by Google showcasing their style API.',
        img: '/img/maptypes/bluemap_100.png',
        styles: [
            {
                featureType: 'all',
                stylers: [
                    {
                        hue: '#0000b0',
                    },
                    {
                        invert_lightness: 'true',
                    },
                    {
                        saturation: -30,
                    },
                ],
            },
        ],
    },
    GreyscaleMap: {
        name: 'Greyscale Map',
        alt: 'Greyscale colour scheme that looks great when zoomed in.',
        img: '/img/maptypes/greyscalemap_100.png',
        styles: [
            {
                featureType: 'all',
                stylers: [
                    {
                        saturation: -100,
                    },
                    {
                        gamma: 0.5,
                    },
                ],
            },
        ],
    },
    NightMap: {
        name: 'Night Map',
        alt: 'Dark themed map, useful to emphasize data points',
        img: '/img/maptypes/nightmap_100.png',
        styles: [
            {
                featureType: 'all',
                stylers: [
                    {
                        gamma: 1.15,
                    },
                    {
                        invert_lightness: true,
                    },
                    {
                        lightness: -40,
                    },
                    {
                        saturation: -60,
                    },
                ],
            },
            {
                elementType: 'labels',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road',
                stylers: [
                    {
                        visibility: 'simplified',
                    },
                ],
            },
            {
                featureType: 'poi',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
        ],
    },
    RetroMap: {
        name: 'Retro Map',
        alt: 'A retro style map from Google with a ton of detail',
        img: '/img/maptypes/retromap_100.png',
        styles: [
            {
                featureType: 'administrative',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'poi',
                stylers: [
                    {
                        visibility: 'simplified',
                    },
                ],
            },
            {
                elementType: 'labels',
                featureType: 'road',
                stylers: [
                    {
                        visibility: 'simplified',
                    },
                ],
            },
            {
                featureType: 'transit',
                stylers: [
                    {
                        visibility: 'simplified',
                    },
                ],
            },
            {
                featureType: 'landscape',
                stylers: [
                    {
                        visibility: 'simplified',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road.local',
                stylers: [
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                elementType: 'geometry',
                featureType: 'road.highway',
                stylers: [
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'water',
                stylers: [
                    {
                        color: '#84aff0',
                    },
                    {
                        lightness: 52,
                    },
                ],
            },
            {
                stylers: [
                    {
                        saturation: -17,
                    },
                    {
                        gamma: 0.36,
                    },
                ],
            },
            {
                elementType: 'geometry',
                featureType: 'transit.line',
                stylers: [
                    {
                        color: '#3f518c',
                    },
                ],
            },
        ],
    },
    WhiteMap: {
        name: 'White Map',
        alt: 'Display only place labels, their circle markers and a couple of borders. Wonderful for thematic overlaying',
        img: '/img/maptypes/whitemap_100.png',
        styles: [
            {
                elementType: 'geometry',
                featureType: 'road',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                elementType: 'geometry',
                featureType: 'poi',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                elementType: 'geometry',
                featureType: 'landscape',
                stylers: [
                    {
                        color: '#fffffa',
                    },
                ],
            },
            {
                featureType: 'water',
                stylers: [
                    {
                        lightness: 50,
                    },
                ],
            },
            {
                elementType: 'labels',
                featureType: 'road',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'transit',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                elementType: 'geometry',
                featureType: 'administrative',
                stylers: [
                    {
                        lightness: 40,
                    },
                ],
            },
        ],
    },
};
/**
 * @type Record<string, google.maps.MapTypeStyle[]>
 */
const styles = {
    default: [],
    silver: [
        {
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }],
        },
        {
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
        },
        {
            elementType: 'labels.text.fill',
            stylers: [{ color: '#616161' }],
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#f5f5f5' }],
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#bdbdbd' }],
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#eeeeee' }],
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#757575' }],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#e5e5e5' }],
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9e9e9e' }],
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }],
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#757575' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#dadada' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#616161' }],
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9e9e9e' }],
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{ color: '#e5e5e5' }],
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{ color: '#eeeeee' }],
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9c9c9' }],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9e9e9e' }],
        },
    ],
    night: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }],
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }],
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }],
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }],
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }],
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }],
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }],
        },
    ],
    retro: [
        { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#c9b2a6' }],
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#dcd2be' }],
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#ae9e90' }],
        },
        {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }],
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }],
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#93817c' }],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{ color: '#a5b076' }],
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#447530' }],
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#f5f1e6' }],
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{ color: '#fdfcf8' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#f8c967' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#e9bc62' }],
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{ color: '#e98d58' }],
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#db8555' }],
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#806b63' }],
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }],
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#8f7d77' }],
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ebe3cd' }],
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }],
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#b9d3c2' }],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#92998d' }],
        },
    ],
    hiding: [
        {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }],
        },
        {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
        },
    ],
};
export default mapStyles;
//# sourceMappingURL=mapstyles.js.map