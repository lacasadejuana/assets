import tippy from 'tippy.js';
import { goTo } from './flm_iframe';
import { moveToNewFolder } from './moveToNewFolder';
/**
 * This component describes the behavior of a folder item in the file manager
 * It can be shown as part of a list or as part of a grid.
 *
 * This component is presented alongside its sibling component "fileItem".
 * They are treated differently and have separate contextmenus
 */
export const folderItemData = (file_id) => ({
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
            content: () => document.querySelector('#folder_contextmenu').innerHTML.replace('id_file', this.file_entry.id),
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
        return this.$store.folder.findById(file_id) || {};
    },
    set file_entry(file) {
        let storedFile = this.$store.folder.findById(file_id);
        storedFile = file;
    },
    square_inner: null,
    init() {
        this.file_entry.$el = this.$el;
        this.square_inner = this.$el.querySelector('.square_inner');
        if (this.square_inner) {
            this.square_inner.className = `square_inner d-flex fiv-ext fiv-icon-folder`;
        }
        this.createDroppable(this.square_inner);
        this.$nextTick(() => this.ready = true);
        setTimeout(() => {
            this.file_entry.ready = true;
        }, 500);
    },
    createDroppable(sortable) {
        const self = this;
        $.ready.then(() => {
            setTimeout(() => {
                //@ts-ignore
                $(this.$el).droppable({
                    accept: ".square_inner",
                    classes: {
                        "ui-droppable-active": "ui-state-default",
                        "ui-droppable-hover": "ui-state-hover"
                    },
                    scope: "file_entry",
                    drop: function (event, ui) {
                        let movedFile = self.$store.folder.files.find(f => f.moving);
                        let movedElement = self.$el.querySelector('.ui-widget');
                        self.$store.folder.moving = false;
                        let moveTo = self.file_entry.url;
                        console.log({ movedFile, moveTo });
                        setTimeout(() => {
                            moveToNewFolder(moveTo, [movedFile]);
                        }, 200);
                        //movedElement.remove()
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
    onContextMenu(e) {
        if (!e.ctrlKey) {
            this.$store.folder.clearSelected();
        }
        this.file.selected = true;
        this.openTooltip();
    },
    folder_handlers: {
        ['@keyup.escape.window'](e) {
            return this.closeFilesTooltip(e);
        },
        ['@closefilestooltip'](e) {
            return this.closeFilesTooltip(e);
        },
        ['@click.prevent.stop'](e) {
            return this.onClick(e);
        },
        ['@dblclick'](e) {
            return goTo(this.file_entry.url);
        },
    }
});
//# sourceMappingURL=folderItem.js.map