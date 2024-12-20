export const html=(codigo_interno)=>`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="csrf" content="" />

		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Negocios: Maps negocioslocal</title>
		<script>
			if (!console.timerInfo) {
				Object.defineProperty(console, 'timerInfo', {
					get: function () {
						return Function.prototype.bind.call(
							console.debug,
							console,
							'%c' + Number(performance.now() / 1000).toFixed(2) + ' Timer:',
							'color:#03C;font-weight:bold;'
						);
					},
				});
			}
			if (!console.marquee) {
				Object.defineProperty(console, 'marquee', {
					get: function () {
						return (obj, ...args) => {
							let colors = Object.values(obj),
								payload = [''].concat(Object.keys(obj));
							console.log(payload.join('%c '), ...colors, ...args);
						};
					},
				});
			}
		</script>
		<script src="./js/init_public_map.js"></script>

		<!-- ========== All CSS files linkup ========= -->
	</head>

	<body>
		<gmp-map
			class="outer_container w-full"
			style="height: 600px"
			id="custom_element_map"
			center="-33.398,-70.58"
			zoom="14"
			map-id="8f541b0e0f5f6c31"
			x-data="{
                    codigo_interno: ${codigo_interno},
                    extent: null,
                    init() {
                
                        this.importComponent();
                        let qs = new URL(location.href)
                        
                        if (qs.searchParams.get('extent')) {
                
                            this.extent = qs.searchParams.get('extent')
                
                            // this.full_map=false;
                            this.full_map = false;
                            this.$store.public_maps.full_map = this.full_map;
                        }
                
                    },
                    full_map: false,
                    get componentMap() {
                        return {
                            barrios: this.PublicMapComponents.PublicLayerBarrios,
                            deals: this.PublicMapComponents.PublicLayerDeals,
                            geojson: this.PublicMapComponents.PublicLayerGeoJson,
                
                        }
                    },
                    componentsReady: false,
                    PublicMapComponents: {},
                    importComponent() {
                
                        return import('./property_map.js').then((module) => {
                            console.log('PublicMapMoldules', module);
 
                
                            const { PublicLayerBarrios, PublicLayerDeals, PublicLayerGeoJson, PublicMapFrameData, PublicLayerBarriosWebGL } = module.PublicMapComponents
                            this.PublicMapComponents = module.PublicMapComponents
                
                            Object.entries(module.PublicMapComponents).forEach(([name, ctor]) => {
                                this[name] = ctor
                                Alpine.data(name, ctor)
                            });
                
                            this.componentsReady = true;
                            globalThis.DynamicLoader = this
                        });
                
                    } 
                }"
		>
			<gmp-advanced-marker position="-33.398,-70.58" title=""></gmp-advanced-marker>
			<template x-if="componentsReady">
				<div
					class="map_outer_container"
					id="map_container"
					style="text-align: center"
					x-ref="map_container"
					x-data="PublicMapFrameData({extent,codigo_interno})"
				>
					<template
						x-for="({checked, slug_name,url, name, path, layer_options, criteria,type},index) in                                         $store.public_maps.layer_array"
						:key="slug_name"
					>
						<div
							x-id="['map-layer']"
							x-data="componentMap[type]({ index, checked, slug_name, name, path, layer_options, criteria }, comunas)"
							class="border accordion flex flex-col"
						/>
					</template>
				</div>
			</template>
		</gmp-map>

		<script>
			const custom_element_map = document.querySelector('#custom_element_map');

			setTimeout(() => {
				customElements.whenDefined(custom_element_map.localName).then(async mapElement => {
					console.warn(mapElement);
					console.info('custom_element_map', custom_element_map.shadowRoot);
				});
			}, 400);
			const advancedMarker = document.querySelector('#custom_element_map gmp-advanced-marker');

			customElements.whenDefined(advancedMarker.localName).then(async () => {
				Alpine.store('public_maps').customElementsMap = advancedMarker.map;
				advancedMarker.map.setOptions({ streetViewControl: false, mapTypeControl: false });
				console.timerInfo('got reference to custom element map');
				//Alpine.initTree(advancedMap)

				advancedMarker.addEventListener('gmp-click', async () => {
					console.info('gmp-click');
					const { InfoWindow } = await google.maps.importLibrary('maps');
					const infoWindow = new InfoWindow({
						content: advancedMarker.title,
					});
					infoWindow.open({
						anchor: advancedMarker,
					});
				});
			});

			console.timerInfo('DOMContentLoaded');

			//google.maps.__ib__

			function cargamos() {
				console.trace('cagamos');
			}
			(g => {
				var h,
					a,
					k,
					p = 'The Google Maps JavaScript API',
					c = 'google',
					l = 'importLibrary',
					q = '__ib__',
					m = document,
					b = window;
				b = b[c] || (b[c] = {});
				var d = b.maps || (b.maps = {}),
					r = new Set(),
					e = new URLSearchParams(),
					u = () =>
						h ||
						(h = new Promise(async (f, n) => {
							await (a = m.createElement('script'));
							e.set('libraries', [...r] + '');
							for (k in g)
								e.set(
									k.replace(/[A-Z]/g, t => '_' + t[0].toLowerCase()),
									g[k]
								);
							e.set('callback', c + '.maps.' + q);
							a.src = 'https://maps.'+c+'apis.com/maps/api/js?' + e;
							d[q] = f;
							a.onerror = () => (h = n(Error(p + ' could not load.')));
							a.nonce = m.querySelector('script[nonce]')?.nonce || '';
							m.head.append(a);
						}));
				d[l]
					? console.warn(p + ' only loads once. Ignoring:', g)
					: (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
			})({
				key: 'AIzaSyAAnmNtArAHn42aA9BEyiuGDN2Y1J4lhV8',
				v: 'beta',
				// Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
				// Add other bootstrap parameters as needed, using camel case.
			});

			console.timerInfo('start: negocio common footer');

			globalThis.googleMapsOptions = {
				apiKey: 'AIzaSyAAnmNtArAHn42aA9BEyiuGDN2Y1J4lhV8',
				version: 'beta',
				region: 'CL',
				language: 'es',
				mapId: '8f541b0e0f5f6c31',
				libraries: ['places', 'localContext'],
			};
			const { campos_busqueda = [], default_columns = [] } = globalThis;

			const contactosArray = '';
			globalThis.backendPaginator = {
				has_take: true,
				count: 129,
				next_page_url: null,
				first_page_url: 'https:\/\/maps.lacasadejuana.cl\/api\/negocios',
				last_page_url: 'https:\/\/maps.lacasadejuana.cl\/api\/negocios',
				current_page: 1,
				from: 1695628584,
				cursor: 1695628584,
				last_page: 1,
				max_id: null,
				min_id: null,
				path: 'https:\/\/maps.lacasadejuana.cl\/api\/maps\/publicaciones?',
				per_page: 350,
				prev_page_url: null,
				query: { limit: 350, take: 1, api_base_path: '\/api\/maps\/publicaciones', total: 250 },
				request_id: 'dcdcbe64-d493-4c3d-8321-af0c2759be62',
				current_filter_id: null,
				to: 130,
				total: 129,
				links: [
					{ url: null, label: '&laquo; Anterior', active: false },
					{ url: null, label: '&laquo; Siguiente', active: false },
				],
				data: [],
			};
		</script>

		<span
			id="store"
			class="hidden invisible"
			x-data="{
    init() {



        let keys = JSON.parse(JSON.stringify([...Object.keys($store)]))
        const globalStore = {};
        for (let key of Object.values(keys)) {

            Object.defineProperty(globalStore, key, {
                enumerable: true,
                __proto__: null,
                get() {
                    return Alpine.store(key)
                }
            })
        }
        globalThis.$store = globalStore;
        Object.defineProperty(globalThis, '$store', {
            __proto__: null,
            enumerable: true,
            get() {
                return globalStore;
            }
        })
        setTimeout(()=>{
        $store.negocios.next_page_url='https://maps.lacasadejuana.cl/api/negocios'
        $store.negocios.complete =false;
        $store.public_maps.fetchPublicaciones()
        },8000)

    }
}"
		>
		</span>
		<script>
			function maploaded() {
				console.timerInfo('maploaded');
			}
			Alpine.start();
		</script>
	</body>
</html>
`