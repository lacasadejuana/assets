import Alpine from 'alpinejs';
import TomSelect from 'tom-select';
import { getFolderStore } from './flm_iframe';
import { getIcon } from './getIcon';
export const inferPreviewFn = () => ({
    get contentSelector() {
        return document.querySelector('#content');
    },
    get selectedElement() {
        return this.contentSelector
            .querySelector('.selected');
    },
    get selectedImageStyle() {
        return this.firstChild ?
            this.firstChild.style.backgroundImage || '' : '';
    },
    get firstChild() {
        return (this.selectedElement ?
            this.selectedElement
                .firstChild :
            null);
    },
    get selectedImageRel() {
        return this.firstChild ? this.firstChild.getAttribute('rel') : '';
    },
    get imageUrl() {
        //return this.selectedImageRel
        return decodeURIComponent((this.selectedImageStyle || this
            .selectedImageRel)
            .replace('url(', '').replace(/['"\(\)]/g, ''));
    },
    opening: 0,
    openingTimeout: null,
    async initTomSelect($el, options) {
        const folderStore = getFolderStore();
        options = options.slice(0).map(e => {
            //@ts-ignore
            e.mimeType = e.extension;
            //@ts-ignore
            e.icon = getIcon(e);
            return e;
            //@ts-ignore
        }).sort((a, b) => a.fileName.localeCompare(b.fileName));
        const url = (term, id_negocio) => {
            const href = new URL(location.origin + `/${folderStore.api_prefix2}/${id_negocio}/file_optionlist`);
            href.search = new URLSearchParams({
                term,
                _type: 'query',
                q: term,
            }).toString();
            return href;
        };
        this.selectControl = new TomSelect($el, {
            valueField: 'fileName',
            maxItems: 1,
            create: false,
            labelField: 'fileName',
            searchField: ['fileName', 'folder'],
            options: [],
            onChange: (fileName) => {
                console.log({ fileName });
                //@ts-ignore
                const selectedOption = options.find(o => o.fileName === fileName);
                let working_dir = '';
                if (selectedOption.type === 'folder') {
                    working_dir = selectedOption.folder + '/' + selectedOption.fileName;
                }
                else {
                    working_dir = selectedOption.folder;
                }
                $('#dialog .modal-footer').removeClass('d-none');
                $('#dialog').modal('hide');
                this.$store.folder.working_dir = working_dir;
            },
            shouldLoad: (query) => {
                console.log(query);
                return query.length >= 3;
            },
            load: (query, callback) => {
                var self = this;
                if (self.loading > 1 || query.length < 2) {
                    //@ts-ignore
                    callback();
                    return;
                }
                query = query.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
                fetch(url(query, this.$store.folder.id_negocio))
                    .then(response => response.json())
                    .then((optionArray) => {
                    callback(Object.values(optionArray).map(f => {
                        f.icon_aux = f.icon;
                        f.icon = getIcon(f);
                        return f;
                    }));
                }).catch((err) => {
                    console.error(err);
                    //@ts-ignore
                    callback();
                });
            },
            render: {
                option: function (option, escape) {
                    return `<div class="d-flex">
                    <div class="d-flex" style="width:3em;justify-content:center;">
                        <i style="font-size: 2.5em;display: flex;align-items: center;margin-right: 0.2em; opacity:0.9"  class="${option.icon || option.icon_aux}"></i> 
                    </div>
                    <div class='d-flex align-items-center'   role='option'>
                             <span class='flex-grow-1' style="font-size:15px;">
                            ${escape(option.fileName)}
                            <span class='label d-block' style="font-size:0.85rem;color:#777;">${escape(option.folder)}</span>
                            </span>
                        </div></div>`;
                }
            }
        });
        return this.selectControl;
    },
    get fullImageUrl() {
        if (!this.imageUrl)
            return '';
        if (this.imageUrl.startsWith('http')) {
            return this.imageUrl;
        }
        return `${location.origin}${this.imageUrl}`;
    },
    openImage() {
        if (this.imageUrl) {
            console.log('opening ' + this.imageUrl);
            window.top.open(this.imageUrl, '_blank');
        }
        else {
            console.warn('no imageUrl');
        }
    },
    files: [],
    init() {
        globalThis.inferPreviewInstance = this;
        console.info('init: inferPreviewInstance', globalThis.inferPreviewInstance);
        this.debouncedOpenImage = Alpine.throttle(this.openImage, 1000);
    }
});
//# sourceMappingURL=indexPreview.js.map