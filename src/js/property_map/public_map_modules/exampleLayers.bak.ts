import { ILayerDefinition } from "@lacasadejuana/types";

export const exampleLayers: ILayerDefinition[] = [
    {
        type: 'deals',
        slug_name: 'venta_departamentos',
        name: 'Venta Departamentos',
        criteria: {
            id_tipo_propiedad: 1,
            id_tipo_negocio: 1,
        },
        layer_options: {
            url: 'data:image/png;base64,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',
            icon: {
                url: 'data:image/png;base64,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',
            },
            name: 'Venta Departamentos',
            text: 'f1ad',
            type: 'deals',
            scale: 0.27,

            criteria: {
                id_tipo_negocio: 1,
                id_tipo_propiedad: 1,
            },
            className: 'icon-building-filled',
            slug_name: 'venta_departamentos',
            fontFamily: 'fontello',
            checked: false,
            fillOpacity: 0.85,
            strokeColor: '#3060cf',
        },
    },
    {
        type: 'deals',
        slug_name: 'arriendo_departamentos',
        name: 'Arriendo Departamentos',
        criteria: {
            id_tipo_propiedad: 1,
            id_tipo_negocio: 2,
        },
        layer_options: {
            icon: {
                url: 'data:image/png;base64,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',
                size: {
                    width: 96,
                    height: 96,
                },
                text: 'e811',
                label: 'e811',
                scale: 1,
                anchor: {
                    x: 48,
                    y: 96,
                },
                origin: {
                    x: 0,
                    y: 0,
                },
                is_icon: true,
                fontSize: 36,
                fillColor: 'rgba(255,255,255,1)',
                fontFamily: 'fontello',
                scaledSize: {
                    width: 96,
                    height: 96,
                },
                fillOpacity: 1,
                strokeColor: 'rgba(11,11,188,1)',
                unicodelabel: '',
                strokeOpacity: 1,
            },
            name: 'Arriendo Departamentos',
            text: 'e811',
            type: 'deals',
            scale: 0.5,
            checked: true,
            criteria: {
                id_tipo_negocio: 2,
                id_tipo_propiedad: 1,
            },
            className: 'icon-commerical-building',
            slug_name: 'arriendo_departamentos',
            fontFamily: 'fontello',

            fillOpacity: 0.85,
            strokeColor: '#0b0bbc',
        },
    },
    {
        type: 'deals',
        slug_name: 'venta_casas',
        name: 'Venta Casas',
        criteria: {
            id_tipo_propiedad: 2,
            id_tipo_negocio: 1,
        },

        layer_options: {
            strokeColor: '#107010',
            scale: 0.5,
            clickable: true,
            fontSize: 32,
            className: 'icon-home',
            text: 'e800',
            fillOpacity: 0.85,

            checked: false,
            icon: {
                url: 'data:image/png;base64,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',
            },
            name: 'Venta Casas',
            slug_name: 'venta_casas',
            fontFamily: 'fontello',
        },
    },
    {
        type: 'deals',
        slug_name: 'arriendo_casas',
        name: 'Arriendo Casas',
        criteria: {
            id_tipo_propiedad: 2,
            id_tipo_negocio: 2,
        },

        layer_options: {
            icon: {
                url: 'data:image/png;base64,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',
            },

            name: 'Arriendo Casas',
            text: 'e803',
            type: 'deals',
            scale: 0.5,

            className: 'icon-home-2',
            slug_name: 'arriendo_casas',
            fontFamily: 'fontello',
            checked: false,
            fillOpacity: 0.85,
            strokeColor: '#1e7b5c',
        },
    },
    {
        type: 'geojson',
        slug_name: 'barrios',
        name: 'Barrios',
        layer_options: {
            strokeColor: '#666666',
            strokeWeight: 1,
            text: 'e803',
            className: 'icon-leaf',
            scale: 0.84,
            clickable: true,
            labelProperty: 'Nombre_de_Barrio',
            fillOpacity: 0.7,
            url: '/json/barrios.json',
            checked: false,
            infoWindow: false,
            campos: {
                Nombre_de_Barrio: 'Nombre de Barrio',
            },
        },
    },
    {
        type: 'geojson',
        slug_name: 'publicaciones',
        name: 'Publicaciones',
        layer_options: {
            strokeColor: '#339933',
            scale: 0.8,
            clickable: true,
            fillOpacity: 0.85,
            url: '/json/deals_for_map.geojson',
            labelProperty: 'Nombre',

            infoWindow: true,

            checked: false,
            text: 'e803',
            type: 'deals',


            className: 'icon-home-2',
            icon: {
                url_depto: 'data:image/png;base64,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',
                url: 'data:image/png;base64,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'
            },
            campos: {

                barrio: "Barrio",
                seudonimo: "Nombre",
                status: "Status",
                precio_uf: "precio_uf",
                //thumbnail: "thumbnail",
                dormitorios: "Dormitorios",
                id_propiedad: "id_propiedad",
                tipo_negocio: "Modalidad",
                //comuna_barrio: "comuna_barrio",
                banos_servicio: "Baños servicio",
                //codigo_interno: "codigo_interno",
                tipo_propiedad: "Tipo propiedad",
                banos_completos: "Baños completos",
                comuna_propiedad: "Comuna",
                fecha_publicacion: "Fecha Publicacion",
                //precio_publicacion: "precio_publicacion",
                dormitorios_servicio: "Dormitorios servicio",
            },
        },
    },
    {
        type: 'geojson',
        slug_name: 'colegios',
        name: 'Colegios',
        layer_options: {
            strokeColor: '#2e2338',
            scale: 0.8,
            clickable: true,
            fillOpacity: 0.85,
            url: '/json/capa_colegios.geojson',
            className: 'icon-school',
            labelProperty: 'Nombre',

            infoWindow: true,
            text: 'e834',
            checked: false,

            icon: {
                url: 'data:image/png;base64,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',
            },
            campos: {
                Nombre: 'Nombre',
                Dirección_: 'Dirección',
                Comuna: 'Comuna',
                Formación: 'Formación',
                Género: 'Género',
                Bilingüe: 'Bilingüe',
                Playgroup: 'Playgroup',

                Cursos_por_nivel: 'Cursos por nivel',
                Alumnos_por_nivel: 'Alumnos por nivel',
                Superficie_terreno: 'Superficieterreno',
            },
        },
    },
    {
        type: 'geojson',
        slug_name: 'ejecutivas',
        name: 'Ejecutivas',
        layer_options: {
            strokeColor: '#2e2338',
            scale: 0.8,
            clickable: true,
            fillOpacity: 0.85,
            url: '/json/ejecutivas.geojson',
            className: 'icon-adult',
            labelProperty: 'nombre',

            infoWindow: true,
            text: 'e816',
            checked: true,

            icon: {
                rotation: 90,
                fillColor: '#ff8080',
                url: 'data:image/png;base64,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',
            },
            campos: {
                nombre: 'Nombre',
                direccion: 'Dirección',
                email: 'email',
                //telefono: 'Teléfono',
            },
        },
    },
    {
        type: 'geojson',
        slug_name: 'metro',
        name: 'Estaciones de Metro',
        layer_options: {
            strokeColor: '#993333',
            scale: 0.75,
            infoWindow: true,
            clickable: true,
            fillOpacity: 0.85,
            className: 'icon-subway',
            strokeWeight: 1,
            icon: {
                strokeWeight: 0.14,
                rotation: 0,
                url: 'data:image/png;base64,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',
                //path: 'm -0.06452214,-1300.3857 c -144.29784786,0 -258.43104786,33.1537 -344.50584786,94.9296 42.9233,-20.0324 91.3754,-30.1484 145.4707,-30.1484 h 383.41995 c 64.6672,0 120.9378,14.0824 168.8652,42.1621 -87.7094,-72.0803 -206.0617,-106.9433 -353.25000214,-106.9433 z M 353.18548,-1193.4424 c 37.2095,30.5791 68.9017,67.8605 94.8789,112.0938 -9.6712,-37.4905 -34.1898,-70.3022 -73.6465,-98.4082 -6.8766,-4.8985 -13.9716,-9.4316 -21.2324,-13.6856 z m 94.8789,112.0938 c 3.1403,12.1731 4.7559,24.8277 4.7559,37.9902 v 537.00004 c 0,50.8361 -25.0596,94.87145 -75.1797,132.10352 -50.1201,37.23207 -111.3382,56.92036 -183.6543,59.06836 l 127.8066,120.28906 c 1.0601,0.95406 1.7594,1.95596 2.584,2.94141 118.0796,-146.74362 210.8828,-311.40576 210.8828,-491.81055 0,-167.97517 -29.7021,-299.68413 -87.1953,-397.58204 z m -123.6875,889.39259 c -8.1862,10.17344 -16.325,20.35496 -24.7344,30.35351 h 9.2618 c 8.592,0 14.6777,-3.93844 18.2578,-11.81445 3.0499,-6.70994 1.9601,-12.86848 -2.7852,-18.53906 z m -24.7344,30.35351 H -305.83217 C -203.49037,-44.171958 -87.765672,59.410753 1.8065779,149.22955 91.460077,58.315253 202.24108,-45.794548 299.64248,-161.6025 Z m -605.47465,0 c -10.0972,-11.58587 -19.8542,-23.47198 -29.6523,-35.32812 l -2.1602,2.0332 c -5.728,6.44402 -7.1608,13.60446 -4.2968,21.48047 2.864,7.87601 8.9497,11.81445 18.2578,11.81445 z m -29.6523,-35.32812 125.6465,-118.25586 c -71.6002,-2.86401 -132.4619,-22.55229 -182.5821,-59.06836 -50.12,-36.51607 -75.1796,-80.55142 -75.1796,-132.10352 v -537.00004 c -0.1341,-10.0542 0.9879,-19.7242 2.7363,-29.2012 -58.5056,99.66164 -86.08977,229.31225 -85.16797,383.56257 1.1008,184.20416 95.50167,348.01696 214.54687,492.06641 z m -129.3789,-875.62898 c 31.1756,-53.1063 71.1793,-97.6475 120.293,-132.8965 -15.5941,7.2778 -30.5075,15.7774 -44.627,25.6993 -43.0639,30.2611 -68.0762,66.0574 -75.666,107.1972 z m 73.5176,-9.4629 v 307.16414 h 345.829998 v -307.16414 z m 422.083948,0 v 307.16414 H 357.23428 v -307.16414 z m -325.423848,441.41414 c -27.9241,0 -50.8363,9.3078 -68.7363,27.92383 -17.9001,18.61604 -27.2078,41.17007 -27.9238,67.66211 -0.716,26.49205 8.5917,49.04608 27.9238,67.66211 19.332,18.61603 42.2442,27.92383 68.7363,27.92383 25.0601,0 47.6141,-9.3078 67.6621,-27.92383 20.0481,-18.61603 29.3559,-41.17006 27.9239,-67.66211 -1.432,-26.49204 -10.7398,-49.04607 -27.9239,-67.66211 -17.184,-18.61603 -39.738,-27.92383 -67.6621,-27.92383 z m 574.59185,0 c -26.4921,0 -49.0461,9.3078 -67.6621,27.92383 -18.6161,18.61604 -27.9238,41.17007 -27.9238,67.66211 0,26.49205 9.3077,49.04608 27.9238,67.66211 18.616,18.61603 41.17,27.92383 67.6621,27.92383 25.06,0 47.6141,-9.3078 67.6621,-27.92383 20.048,-18.61603 29.7141,-41.17006 28.9981,-67.66211 -0.716,-26.49204 -10.3821,-49.04607 -28.9981,-67.66211 -18.616,-18.61603 -41.1701,-27.92383 -67.6621,-27.92383 z',
            },

            rotation: 0,
            //fontFamily: 'FontAwesome5Free',
            text: 'f239',
            labelProperty: 'Nombre',

            url: '/json/capa_metro.geojson',
            checked: true,
            campos: {
                Nombre: 'Nombre',
                Estación: 'Estación',
                Línea: 'Línea',
            },
        },
    } /*
    {
        type: 'heatmap',
        slug_name: 'heatmap',
        name: 'Heatmap',
        layer_options: {
            checked: false,
            strokeColor: '#c00',
            fillOpacity: 0.7,

            radius: 40,
        },
    },
    {
        type: 'kmz',
        slug_name: 'ciclovias',
        name: 'Ciclovías',
        layer_options: {
            checked: false,
            url: 'https://negocios.juana.house/layers/ciclovias.kmz',
            strokeColor: '#09F',
            fillOpacity: 0.7,
        },
    },*/,
];

export const exampleLayerObject: Record<string, ILayerDefinition> =
    exampleLayers.reduce((acc, layer) => {
        acc[layer.slug_name] = layer;
        return acc;
    }, {});
