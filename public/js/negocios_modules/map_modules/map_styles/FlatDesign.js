/// <reference types="google.maps" />
export const FlatDesign = {
    name: 'Flat Map',
    alt: 'Flat Design Map Without Labels',
    styles: [
        {
            featureType: 'all',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'administrative',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'simplified',
                },
                {
                    color: '#5b6571',
                },
                {
                    lightness: '35',
                },
            ],
        },
        {
            featureType: 'administrative.neighborhood',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on',
                },
                {
                    color: '#f3f4f4',
                },
            ],
        },
        {
            featureType: 'landscape.man_made',
            elementType: 'geometry',
            stylers: [
                {
                    weight: 0.9,
                },
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [
                {
                    visibility: 'on',
                },
                {
                    color: '#83cead',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on',
                },
                {
                    color: '#ffffff',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on',
                },
                {
                    color: '#fee379',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
                {
                    visibility: 'on',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'simplified',
                },
                {
                    color: '#ffffff',
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on',
                },
                {
                    color: '#7fc8ed',
                },
            ],
        },
    ],
};
//# sourceMappingURL=FlatDesign.js.map