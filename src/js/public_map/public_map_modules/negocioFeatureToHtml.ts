import { Wrapper } from './Wrapper';

export class negocioFeatureToHtml {
    container: Wrapper;
    feature: google.maps.Data.Feature & { id?: string };
    coordinates: google.maps.LatLngLiteral;
    id: string;
    campos: Record<string, string>;
    constructor(
        feature: google.maps.Data.Feature & { id?: string },
        campos: Record<string, string>,
    ) {
        this.feature = feature;
        campos = {
            'ubicacion': 'Ubicación',
            'tipo': 'Tipo',

            'dormitorios_total': 'Dormitorios',
            'banos_total': 'Baños',
            'servicios': 'Servicios',
            ...campos,
            tipo_negocio: 'Modalidad',
            tipo_propiedad: 'Tipo Propiedad',
            nombre: 'Nombre',
            comuna: 'Ubicación',
            'banos-completos': 'Baños',
            dormitorios_completos: 'Dormitorios',
            'precio': 'Precio',


        };
        this.campos = campos;
        this.normalizeProperties()
        // @ts-ignore
        this.id = feature.getId();
        // @ts-ignore
        this.coordinates = feature.getCenter().toJSON();
        this.container = new Wrapper('flex flex-col');
        console.log({ feature, campos, id: this.id });
        this.container
            .addClass('flex')
            .addClass('flex-col')
            .addStyle('lineHeight', '1.5em')
            .addStyle('fontSize', '13px')
            .addStyle('fontFamily', 'Inter, sans-serif')
            .addStyle('fontWeight', '400');

        this.appendProperties();
    }
    get content() {
        this.container.div.classList.add('flex');
        this.container.div.classList.add('flex-col');

        return this.container.div;
    }
    getProperty(slug_name) {
        return this.feature.getProperty(slug_name);
    }
    get innerHTML() {
        return this.content.innerHTML;
    }
    get linkWeb() {
        const postId =
            this.getProperty('codigo-wordpress') ||
            this.getProperty('codigo_wordpress');
        return (
            this.getProperty('link-publicacion-web') ||
            (postId && `"https://lacasadejuana.cl/?p=${postId}"`) ||
            null
        );
    }
    get ubicacion() {
        let barrio = this.getProperty('barrio').replace('Barrio ', ''),
            comuna = this.getProperty('comuna');
        return barrio ? `Barrio ${barrio}, ${comuna}` : comuna;
    }
    get precio() {

        return this.getProperty('precio-publicacion') + ' (UF)';
    }
    get tipo() {

        return `<span class="font-semibold">${this.getProperty('tipo_propiedad')}</span>
        <span style="margin-left:0.25em;margin-right:0.25em;">en</span>
        <span class="font-semibold">${this.getProperty('tipo_negocio')}</span>`;
    }
    get banos_total() {
        let banos = Number(this.getProperty('banos') || this.getProperty('banos-completos')).toFixed(0),
            banos_servicios = this.getProperty('banos-servicio'),
            texto_servicio = ((Number(banos_servicios) > 0) ? ` + ${Number(banos_servicios).toFixed(0)} servicio` : '');

        return `${Number(banos).toFixed(0)} baños ${texto_servicio}`
    }
    get dormitorios_total() {
        let dormitorios = Number(this.getProperty('dormitorios') || this.getProperty('dormitorios-completos')).toFixed(0),
            dormitorios_servicio = this.getProperty('dormitorios-servicio'),
            texto_servicio = (Number(dormitorios_servicio) > 0 ? ` + ${Number(dormitorios_servicio).toFixed(0)} servicio` : '')

        return `${dormitorios} dormitorios ${texto_servicio}`
    }
    get hiddenSlugs() {
        return [
            'lat',
            'lng',
            'searchstring',
            'id_etapa_negocio',
            'precio-publicacion',
            'codigo_interno',
            'codigo-wordpress',
            'codigo_wordpress',
            'link-publicacion',
            'thumbnail',
            'barrio',
            'img-portada-wordpress',
            'id_tipo_negocio',
            'id_tipo_propiedad',
            'dormitorios',
            'banos-completos',
            'banos-servicio',
            'banos',
            'tipo_negocio', 'tipo_propiedad',
            'comuna',
            'dormitorios-servicio'
        ];
    }
    normalizeProperties() {
        this.feature.setProperty('ubicacion', this.ubicacion);
        this.feature.setProperty('tipo', this.tipo);
        this.feature.setProperty('precio', this.precio);
        //this.feature.setProperty('banos_total', this.banos_total);
        //this.feature.setProperty('dormitorios_total', this.dormitorios_total);
        this.feature.setProperty('servicios', `${this.dormitorios_total}, ${this.banos_total}`);

        this.feature.setProperty('fecha-publicacion', this.getProperty('fecha-publicacion').split('-').reverse().join('-'));
    }
    appendProperties() {
        this.feature.forEachProperty((value, slug_name) => {
            if (slug_name === 'nombre') console.log({ value, slug_name });

            if (this.shouldSkip(slug_name, value)) return;

            let wrapper = new Wrapper(
                'flex w-full justify-between align-items-center ' + slug_name,
            );

            if (
                slug_name.includes('thumbnail') ||
                slug_name.includes('img-portada-wordpress')
            ) {
                this.printImagenPortada(wrapper, value);
            } else if (
                slug_name.includes('seudonimo') ||
                slug_name.includes('nombre')
            ) {
                this.printLinkWeb(wrapper, value);
            } else if (slug_name.includes('titulo-resumen-web')) {
                this.printTituloResumen(wrapper, value);
            } else if (slug_name.includes('tipo')) {
                this.printTipo(wrapper, value);
            } else if (slug_name.includes('servicios')) {
                this.printServicios(wrapper, value);
            } else if (slug_name.includes('ubicacion')) {
                this.printUbicacion(wrapper, value);
            } else {
                this.printOtherCampos(wrapper, slug_name, value);
            }
        });
    }
    printUbicacion(wrapper, value) {

        wrapper.setInnerHTML(value);
        wrapper
            .addStyle('fontWeight', '500')
            .addStyle('order', '3')
            .addStyle('fontSize', '1.15em')
            .addStyle('maxWidth', '350px')
            .addStyle('white-space', 'normal')
            .addStyle('marginTop', '0em')
            .addStyle('marginBottom', '0.3em')
            .prependTo(this.container.div);
    }
    printServicios(wrapper, value) {

        wrapper.setInnerHTML(value);
        wrapper
            .addStyle('fontWeight', '500')
            .addStyle('order', '4')
            .addStyle('fontSize', '1em')
            .addStyle('maxWidth', '350px')
            .addStyle('white-space', 'normal')
            .addStyle('marginTop', '0em')
            .addStyle('marginBottom', '0.5em')
            .prependTo(this.container.div);
    }
    shouldSkip(slug_name, value) {
        return (
            !value ||

            slug_name.includes('etapa') ||
            this.hiddenSlugs.includes(slug_name) ||
            slug_name.includes('codigo-wordpress') ||
            slug_name.includes('codigo_wordpress') ||
            slug_name.includes('link-publicacion') ||
            (!this.campos[slug_name] && slug_name !== 'thumbnail')
        );
    }


    printImagenPortada(wrapper, value) {
        const link = `<img src="${value}" style="width:100%;height:200px;object-fit:cover;"/>`;
        wrapper
            .setInnerHTML(link)
            .addStyle('fontWeight', '600')
            .addStyle('fontSize', '1.1em')
            .addStyle('marginBottom', '0.3em')
            .addStyle('order', '1')
            .appendTo(this.container.div);
    }
    printLinkWeb(wrapper, value) {
        if (this.linkWeb) {
            wrapper.setInnerHTML(
                ` <a href=${this.linkWeb} target="_blank"><i class="fas fa-link"></i> ${value}</a>`,
            );
        } else {
            wrapper.setInnerHTML(`  ${value}`);
        }
        wrapper
            .addStyle('fontWeight', '600')
            .addStyle('order', '2')
            .addStyle('fontSize', '1.5em')
            .addStyle('marginTop', '0.7em')
            .addStyle('marginBottom', '0.3em')
            .prependTo(this.container.div);
    }
    printTipo(wrapper, value) {

        wrapper.div.setAttribute('rel', 'tipo')
        new Wrapper('py-1 pl-1 flex border border-1/2 min-w-[165px]')
            .addStyle('fontFamily', 'Inter, sans-serif')
            .setTextContent(this.campos.tipo)
            .appendTo(wrapper.div);
        new Wrapper(
            'py-1 flex border border-1/2 pl-2 max-w-[350px] min-w-[200px] flex-grow overflow-hidden whitespace-nowrap',
        )
            .addStyle('fontFamily', 'Inter, sans-serif')
            .setInnerHTML(value)
            .appendTo(wrapper.div);

        wrapper
            .addStyle('order', '4')
            .addStyle('fontWeight', '500')
            .appendTo(this.container.div);
    }

    printTituloResumen(wrapper, value) {
        let words = value.split('|'),
            wordsQuantity = words.length,
            firstRow = words.slice(0, wordsQuantity / 2).join(' '),
            secondRow = words.slice(wordsQuantity / 2).join(' ');
        wrapper.setInnerHTML([firstRow, secondRow].join('<br>'));
        wrapper
            .addStyle('fontWeight', '500')
            .addStyle('order', '3')
            .addStyle('fontSize', '1.05em')
            .addStyle('maxWidth', '350px')
            .addStyle('white-space', 'normal')
            .addStyle('marginTop', '0.2em')
            .addStyle('marginBottom', '0.3em')
            .prependTo(this.container.div);
    }

    printOtherCampos(wrapper, slug_name, value) {
        wrapper.div.setAttribute('rel', slug_name)
        new Wrapper('py-1 pl-1 flex border border-1/2 min-w-[165px]')
            .addStyle('fontFamily', 'Inter, sans-serif')
            .addStyle('fontWeight', '400')
            .setTextContent(this.campos[slug_name])
            .appendTo(wrapper.div);
        new Wrapper(
            'py-1 flex border border-1/2 pl-2 max-w-[350px] min-w-[200px] flex-grow overflow-hidden whitespace-nowrap',
        )
            .addStyle('fontFamily', 'Inter, sans-serif')
            .setTextContent(value)
            .appendTo(wrapper.div);

        wrapper
            .addStyle('order', '5')
            .addStyle('fontWeight', '500')
            .appendTo(this.container.div);
    }
}
