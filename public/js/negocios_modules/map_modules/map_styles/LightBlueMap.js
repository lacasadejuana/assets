export const LightBlueMap = {
    name: 'Light Blue',
    alt: 'Light blue and white style.',
    img: '/img/maptypes/lightbluemap_100.png',
    styles: [
        {
            elementType: 'all',
            featureType: 'water',
            stylers: [
                {
                    hue: '#71d6ff',
                },
                {
                    saturation: 100,
                },
                {
                    lightness: -5,
                },
                {
                    visibility: 'on',
                },
            ],
        },
        {
            elementType: 'all',
            featureType: 'poi',
            stylers: [
                {
                    hue: '#ffffff',
                },
                {
                    saturation: -100,
                },
                {
                    lightness: 100,
                },
                {
                    visibility: 'off',
                },
            ],
        },
        {
            elementType: 'all',
            featureType: 'transit',
            stylers: [
                {
                    hue: '#ffffff',
                },
                {
                    saturation: 0,
                },
                {
                    lightness: 100,
                },
                {
                    visibility: 'off',
                },
            ],
        },
        {
            elementType: 'geometry',
            featureType: 'road.highway',
            stylers: [
                {
                    hue: '#deecec',
                },
                {
                    saturation: -73,
                },
                {
                    lightness: 72,
                },
                {
                    visibility: 'on',
                },
            ],
        },
        {
            elementType: 'labels',
            featureType: 'road.highway',
            stylers: [
                {
                    hue: '#bababa',
                },
                {
                    saturation: -100,
                },
                {
                    lightness: 25,
                },
                {
                    visibility: 'on',
                },
            ],
        },
        {
            elementType: 'geometry',
            featureType: 'landscape',
            stylers: [
                {
                    hue: '#e3e3e3',
                },
                {
                    saturation: -100,
                },
                {
                    lightness: 0,
                },
                {
                    visibility: 'on',
                },
            ],
        },
        {
            elementType: 'geometry',
            featureType: 'road',
            stylers: [
                {
                    hue: '#ffffff',
                },
                {
                    saturation: -100,
                },
                {
                    lightness: 100,
                },
                {
                    visibility: 'simplified',
                },
            ],
        },
        {
            elementType: 'labels',
            featureType: 'administrative',
            stylers: [
                {
                    hue: '#59cfff',
                },
                {
                    saturation: 100,
                },
                {
                    lightness: 34,
                },
                {
                    visibility: 'on',
                },
            ],
        },
    ],
};
//# sourceMappingURL=LightBlueMap.js.map