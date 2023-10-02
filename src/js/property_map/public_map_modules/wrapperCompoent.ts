export const wrapperComponent = () => ({
    codigo_interno: null,
    extent: null,
    init() {

        this.importComponent();
        let qs = new URL(location.href)
        if (qs.searchParams.get('codigo_interno')) {
            this.codigo_interno = qs.searchParams.get('codigo_interno')
        }
        if (qs.searchParams.get('extent')) {

            this.extent = qs.searchParams.get('extent')

            // this.full_map=false;
            this.full_map = false;
            this.$store.public_maps.full_map = this.full_map;
        } else {
            this.full_map = true
            this.$store.public_maps.skipMapCreation = true
            this.$store.public_maps.full_map = this.full_map;
        }

    },
    full_map: false,

    componentsReady: false,
    get componentMap() {
        return {
            barrios: this.PublicLayerBarrios,
            deals: this.PublicLayerDeals,
            geojson: this.PublicLayerGeoJson,
        }
    },
    importComponent() {

        return import('/js/components/public_map.js').then((module) => {
            console.log('PublicMapMoldules', module);
            //Alpine.store('public_maps',()=>new module.createPublicMapStore())
            //this.$store.public_maps.$store.negocios=this.$store.negocios;
            //this.$store.public_maps.updateProperties([]).refreshSavedMaps();
            //globalThis.$store.public_maps=this.$store.public_maps


            const { PublicLayerBarriosmP, PublicLayerDeals, PublicLayerGeoJson, PublicMapFrameData } = module.PublicMapComponents

            Alpine.data('PublicLayerDeals', PublicLayerDeals);
            Alpine.data('PublicLayerGeoJson', .PublicLayerGeoJson);
        Alpine.data('PublicMapFrameData', PublicMapFrameData);
        Alpine.data('PublicLayerBarrios', PublicLayerBarrios);
        this.PublicLayerDeals = PublicLayerDeals;
        this.PublicLayerGeoJson = PublicLayerGeoJson
        this.PublicMapFrameData = PublicMapFrameData
        this.PublicLayerBarrios = PublicLayerBarrios
        this.componentsReady = true;
        globalThis.DynamicLoader = this
    });
    },
})