import { Wrapper } from "./Wrapper";
export class negocioFeatureToHtml {
    constructor(feature, campos) {
        this.feature = feature;
        this.campos = campos;
        this.coordinates = feature.getGeometry().get();
        this.container = new Wrapper('flex flex-col');
        console.log({ feature, campos });
        this.container.addClass('flex')
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
    get innerHTML() {
        return this.content.innerHTML;
    }
    get linkWeb() {
        const postId = this.feature.getProperty('codigo-wordpress') || this.feature.getProperty('codigo_wordpress');
        return this.feature.getProperty('link-publicacion-web') || (postId && `"https://lacasadejuana.cl/?p=${postId}"`) || null;
    }
    appendProperties() {
        let arrastre_btn = `<span><button x-data type="button" class="fs-1em px-2 py-0 make_draggable mr-2 btn border"
               title="Habilitar Arrastre" ><i class="fas fa-arrows-alt"></i></button>
               <a href="https://workers.lacasadejuana.cl/geo/coords/${lng}/${lat}"><i class="fas fa-map-marker-alt"></i></a>
            <a href="/negocio/${this.feature.id}/edit"><i class="fas fa-edit"></i></a></span>`;
        this.feature.forEachProperty((value, slug_name) => {
            if (!value
                || slug_name.includes('etapa')
                || slug_name === 'lat'
                || slug_name === 'searchstring'
                || slug_name === 'lng'
                || slug_name.includes('codigo-wordpress')
                || slug_name.includes('codigo_wordpress')
                || slug_name.includes('link-publicacion')
                || (!this.campos[slug_name] && slug_name !== 'thumbnail'))
                return;
            let wrapper = new Wrapper('flex w-full justify-between align-items-center ' + slug_name);
            if (slug_name.includes('thumbnail') || slug_name.includes('img-portada-wordpress')) {
                const link = `<img src="${value}" style="width:100%;height:200px;object-fit:cover;"/>`;
                wrapper.setInnerHTML(link)
                    .addStyle('fontWeight', '600')
                    .addStyle('fontSize', '1.1em')
                    .addStyle('marginBottom', '0.3em')
                    .addStyle('order', '1')
                    .appendTo(this.container.div);
            }
            else if (slug_name.includes('seudonimo')) {
                if (this.linkWeb) {
                    wrapper.setInnerHTML(`${arrastre_btn}<a href=${this.linkWeb} target="_blank"><i class="fas fa-link"></i> ${value}</a>`);
                }
                else {
                    wrapper.setInnerHTML(`${arrastre_btn} ${value}`);
                }
                wrapper.addStyle('fontWeight', '600')
                    .addStyle('order', '2')
                    .addStyle('fontSize', '1.5em')
                    .addStyle('marginTop', '0.7em')
                    .addStyle('marginBottom', '0.3em')
                    .prependTo(this.container.div);
            }
            else if (slug_name.includes('titulo-resumen-web')) {
                let words = value.split('|'), wordsQuantity = words.length, firstRow = words.slice(0, wordsQuantity / 2).join(' '), secondRow = words.slice(wordsQuantity / 2).join(' ');
                wrapper.setInnerHTML([firstRow, secondRow].join('<br>'));
                wrapper.addStyle('fontWeight', '500')
                    .addStyle('order', '3')
                    .addStyle('fontSize', '1.05em')
                    .addStyle('maxWidth', '350px')
                    .addStyle('white-space', 'normal')
                    .addStyle('marginTop', '0.2em')
                    .addStyle('marginBottom', '0.7em')
                    .prependTo(this.container.div);
            }
            else {
                new Wrapper('py-1 flex border min-w-[165px]')
                    .addStyle('fontFamily', 'Inter, sans-serif')
                    .setTextContent(this.campos[slug_name])
                    .appendTo(wrapper.div);
                new Wrapper('py-1 flex border pl-2 max-w-[350px] min-w-[200px] flex-grow overflow-hidden whitespace-nowrap')
                    .addStyle('fontFamily', 'Inter, sans-serif')
                    .setTextContent(value)
                    .appendTo(wrapper.div);
                wrapper.addStyle('order', '3')
                    .addStyle('fontWeight', '500')
                    .appendTo(this.container.div);
            }
        });
        $(this.container.div).on('click', '.make_draggable', (e) => {
            this.feature.setProperty('draggable', true);
        });
    }
}
//# sourceMappingURL=negocioFeatureToHtml.js.map