export const ShiftWorker = {
    name: 'Shift Worker',
    alt: 'Display streets with a minimum of distractions. Best used around zoom level 16 to show a local address.',
    img: '/img/maptypes/shiftworkermap_100.png',
    styles: [
        {
            stylers: [
                {
                    saturation: -100,
                },
                {
                    gamma: 1,
                },
            ],
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            elementType: 'labels.text',
            featureType: 'poi.business',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            elementType: 'labels.icon',
            featureType: 'poi.business',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            elementType: 'labels.text',
            featureType: 'poi.place_of_worship',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            elementType: 'labels.icon',
            featureType: 'poi.place_of_worship',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            elementType: 'geometry',
            featureType: 'road',
            stylers: [
                {
                    visibility: 'simplified',
                },
            ],
        },
        {
            featureType: 'water',
            stylers: [
                {
                    visibility: 'on',
                },
                {
                    saturation: 50,
                },
                {
                    gamma: 0,
                },
                {
                    hue: '#50a5d1',
                },
            ],
        },
        {
            elementType: 'labels.text.fill',
            featureType: 'administrative.neighborhood',
            stylers: [
                {
                    color: '#333333',
                },
            ],
        },
        {
            elementType: 'labels.text',
            featureType: 'road.local',
            stylers: [
                {
                    weight: 0.5,
                },
                {
                    color: '#333333',
                },
            ],
        },
        {
            elementType: 'labels.icon',
            featureType: 'transit.station',
            stylers: [
                {
                    gamma: 1,
                },
                {
                    saturation: 50,
                },
            ],
        },
    ],
};
//# sourceMappingURL=ShiftWorker.js.map