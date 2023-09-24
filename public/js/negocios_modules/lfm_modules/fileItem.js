import tippy from 'tippy.js';
import { deleteFiles, selectText } from './flm_iframe';
/**
 * This component describes the behavior of a file item in the file manager
 * It can be shown as part of a list or as part of a grid.
 *
 * This component is presented alongside its sibling component "folderItem".
 * They are treated differently and have separate contextmenus
 */
export const fileItemData = (file_id) => ({
    tooltipInstance: null,
    closeFilesTooltip() {
        console.log('closeFilesTooltip', {
            tooltipInstance: this.tooltipInstance
        });
        this.tooltipInstance?.hide();
    },
    get ready() {
        return this.file_entry?.ready;
    },
    set ready(ready) {
        this.file_entry.ready = ready;
    },
    get xtooltip() {
        const self = this;
        // if (!this.file_entry.is_file) return null
        return {
            appendTo: this.$refs.square,
            content: () => (this.file_entry.is_file)
                ? document.querySelector('#file_context_menu').innerHTML.replace('id_file', this.file_entry.id)
                : document.querySelector('#folder_contextmenu').innerHTML.replace('id_file', this.file_entry.id),
            interactive: true,
            theme: 'light-border',
            followCursor: true,
            allowHTML: true,
            placement: 'right',
            trigger: 'click',
            onHide(instance) {
                self.tooltipInstance = null;
            },
            onShow(instance) {
                self.tooltipInstance = instance;
            },
        };
    },
    openTooltip() {
        const self = this;
        this.tooltipInstance = tippy(this.$refs.square, this.xtooltip);
        this.tooltipInstance.show();
    },
    get file_entry() {
        const file = this.$store.folder.findById(file_id) || {};
        if (file.thumb_url && file.is_image) {
            file.background_image = `url('${file.thumb_url}')`;
        }
        return file;
    },
    set file_entry(file) {
        let storedFile = this.$store.folder.findById(file_id);
        storedFile = file;
    },
    square_inner: null,
    editableElement: null,
    icon: '',
    init() {
        this.editableElement = this.$el.querySelector('.item_name');
        this.file_entry.$el = this.$el;
        this.square_inner = this.$refs.square_inner ?? this.$el.querySelector('.square_inner');
        if (this.square_inner) {
            this.square_inner.setAttribute('data-icon', this.file_entry.icon);
            if (this.file_entry.background_image) {
                this.square_inner.style.backgroundImage = this.file_entry.background_image;
            }
            else if (/^\s*(fiv-cla|fiv-viv|fiv-sqo|far|fas|fa|fa-solid|fa-regular) /.test(this.file_entry.icon)) {
                this.icon = this.file_entry.icon;
                this.square_inner.className = `square_inner d-flex ${this.file_entry.icon}`;
            }
            else {
                this.square_inner.className = `square_inner d-flex mime-icon ico-${this.file_entry.icon}`;
            }
            if (this.file_entry.is_file) {
                this.createSortable(this.square_inner);
            }
        }
        else {
            console.warn('no square_inner');
        }
        console.log('fileItem', {
            file_id,
            file_entry_icon: this.file_entry.icon,
            square_inner: this.square_inner,
        });
        this.$nextTick(() => this.ready = true);
        setTimeout(() => {
            this.file_entry.ready = true;
        }, 500);
    },
    createSortable(sortable) {
        $.ready.then(() => {
            setTimeout(() => {
                //@ts-ignore
                $(sortable).draggable({
                    scope: "file_entry",
                    helper: "clone",
                    start: () => {
                        this.$store.folder.tree.deselect_all();
                        console.info('start moving', this.file_entry.id);
                        this.file_entry.moving = true;
                        this.$store.folder.moving = true;
                        $('#tree').addClass('moving_file');
                    },
                    stop: () => {
                        this.file_entry.moving = false;
                        this.$store.folder.moving = false;
                        $('#tree').removeClass('moving_file');
                    }
                });
            }, 1000);
        });
    },
    file_id,
    onClick(e) {
        globalThis.currentFile = this.file_entry;
        if (this.file_entry.selected) {
            this.file_entry.selected = false;
            if (!e.ctrlKey)
                this.$store.folder.clearSelected();
            return;
        }
        if (!e.ctrlKey)
            this.$store.folder.clearSelected();
        this.file_entry.selected = true;
    },
    async checkIfSelected() {
        return new Promise((resolve, reject) => {
            if (!this.file_entry.selected) {
                reject(new Error('file not selected'));
            }
            if (this.$store.folder.selected.length !== 1) {
                reject(new Error('more than one file or zero selected'));
            }
            resolve(true);
        });
    },
    confirmDeletion(e) {
        return this.checkIfSelected()
            .then(() => {
            if (this.file.renaming)
                return false;
            deleteFiles([this.file]);
        }).catch(err => {
            //console.warn(err)
        });
    },
    setEditable(e) {
        return this.checkIfSelected()
            .then(() => {
            if (!this.editableElement) {
                console.log('no editable element  ', this.editableElement);
                return;
            }
            console.log('RENAMING');
            this.file_entry.renaming = true;
            this.editableElement.setAttribute('contenteditable', true);
            selectText(this.editableElement);
        }).catch(err => {
            //console.warn(err)
        });
    },
    onDblClick(e) {
        if (this.file_entry.renaming)
            return;
        if (!this.file_entry.is_image && !this.file_entry.is_video) {
            console.log('opening file in new tab ', this.$refs.hidden_link);
            if (window.CustomEvent) {
                var middleClick = new MouseEvent("click", { "button": 1, "which": 2 });
                jQuery(this.$refs.hidden_link)[0].dispatchEvent(middleClick);
            }
            return;
        }
        //@ts-ignore
        if (this.file_entry.gallery_id)
            return this.$store.folder.gallery.open(this.file_entry.gallery_id);
        this.$refs.hidden_link?.click();
        //console.log(this.$refs.hidden_link)
        //window.open(this.file_entry.url, '_blank')
        //@ts-ignore
        //preview([this.file])
    },
    onContextMenu(e) {
        if (!e.ctrlKey) {
            this.$store.folder.clearSelected();
        }
        this.file.selected = true;
        this.openTooltip();
    },
    file_handlers: {
        ['@keyup.escape.window'](e) {
            return this.closeFilesTooltip(e);
        },
        ['@click.prevent.stop'](e) {
            return this.onClick(e);
        },
        ['@closefilestooltip'](e) {
            return this.closeFilesTooltip(e);
        },
        ['@dblclick'](e) {
            return this.onDblClick(e);
        },
        ['@keyup.f2.window'](e) {
            this.setEditable(e);
        },
        ['@keyup.delete.window'](e) {
            if (this.file_entry.renaming)
                return;
            this.confirmDeletion(e);
        }
    }
});
//# sourceMappingURL=fileItem.js.map