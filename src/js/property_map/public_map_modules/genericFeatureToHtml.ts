import { Wrapper } from "./Wrapper";

export class genericFeatureToHtml {
    container: Wrapper;
    feature: google.maps.Data.Feature;
    campos: Record<string, string>;
    constructor(feature: google.maps.Data.Feature, campos: Record<string, string>) {
        this.feature = feature;
        this.campos = campos
        console.log({ feature, campos })
        this.container = new Wrapper('flex flex-col')

        this.container.addClass('flex')
            .addClass('flex-col')
            .addStyle('lineHeight', '1.5em')
            .addStyle('fontSize', '13px')
            .addStyle('fontFamily', 'Inter, sans-serif')
            .addStyle('fontWeight', '400')
        this.appendProperties()
    }
    get content() {
        this.container.div.classList.add('flex')
        this.container.div.classList.add('flex-col')


        return this.container.div
    }
    get innerHTML() {
        return this.content.innerHTML
    }
    get linkWeb() {

        const postId = this.feature.getProperty('codigo-wordpress') || this.feature.getProperty('codigo_wordpress')
        return this.feature.getProperty('link-publicacion-web') || (postId && `"https://lacasadejuana.cl/?p=${postId}"`) || null
    }
    appendProperties() {
        this.feature.forEachProperty((value, slug_name) => {
            if (!value
                || slug_name.includes('etapa')
                || slug_name === 'lat'
                || slug_name === 'searchstring'
                || slug_name === 'Color'
                || slug_name === 'lng'
                || slug_name === 'codigo_interno'
                || slug_name.includes('codigo-wordpress')
                || slug_name.includes('codigo_wordpress')
                || slug_name.includes('link-publicacion')
                || (!this.campos[slug_name] && slug_name !== 'thumbnail')) return

            let wrapper = new Wrapper('flex w-full justify-between ' + slug_name);

            if (slug_name.includes('thumbnail') || slug_name.includes('img-portada-wordpress')) {
                const link = `<img src="${value}" style="width:100%;height:200px;object-fit:cover;"/>`;
                wrapper.setInnerHTML(link)
                    .addStyle('fontWeight', '600')
                    .addStyle('fontSize', '1.1em')
                    .addStyle('marginBottom', '0.3em')
                    .addStyle('order', '1')
                    .appendTo(this.container.div);

            } else if (slug_name.includes('seudonimo')) {
                if (this.linkWeb) {
                    wrapper.setInnerHTML(`<a href=${this.linkWeb} target="_blank"><i class="fas fa-link"></i> ${value}</a>`)
                }
                wrapper.addStyle('fontWeight', '600')
                    .addStyle('order', '2')
                    .addStyle('fontSize', '1.5em')
                    .addStyle('marginTop', '0.7em')
                    .addStyle('marginBottom', '0.3em')
                    .prependTo(this.container.div);
            } else if (slug_name.includes('post_title')) {
                if (this.linkWeb) {
                    wrapper.setInnerHTML(`<a href=${this.linkWeb} target="_blank"><i class="fas fa-link"></i> ${value}</a>`)
                }
                wrapper.addStyle('fontWeight', '600')
                    .addStyle('order', '2')
                    .addStyle('fontSize', '1.35em')
                    .addStyle('maxWidth', '400px')
                    .addStyle('marginTop', '0.7em')
                    .addStyle('marginBottom', '0.3em')
                    .prependTo(this.container.div);
            } else if (slug_name.includes('titulo-resumen-web')) {
                wrapper.setTextContent(value)
                wrapper.addStyle('fontWeight', '500')
                    .addStyle('order', '3')
                    .addStyle('fontSize', '1.05em')
                    .addStyle('maxWidth', '350px')
                    .addStyle('white-space', 'normal')
                    .addStyle('marginTop', '0.2em')
                    .addStyle('marginBottom', '0.7em')
                    .prependTo(this.container.div);
            } else {
                new Wrapper('py-1 flex border min-w-[135px]')
                    .addStyle('fontFamily', 'Inter, sans-serif')
                    .addStyle('minWidth', '135px')
                    .setTextContent(this.campos[slug_name])
                    .appendTo(wrapper.div)
                new Wrapper('py-1 flex border pl-2 max-w-[350px] min-w-[170px] flex-grow overflow-hidden whitespace-nowrap')
                    .addStyle('fontFamily', 'Inter, sans-serif')
                    .addStyle('minWidth', '170px')
                    .setTextContent(value)
                    .appendTo(wrapper.div)


                wrapper.addStyle('order', '3')
                    .addStyle('fontWeight', '500')
                    .appendTo(this.container.div);

            }
        });


    }
}
