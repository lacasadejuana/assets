import tippy from 'tippy.js';
export const fileListData = () => ({
    items: [],
    get files() {
        return this.$store.folder.files.map(file => {
            file.background_image = `url('${file.thumb_url}');`;
            return file;
        });
    },
    tooltipOptions: {
        placement: 'bottom',
        trigger: 'hover',
        container: 'body',
    },
    get fileIds() {
        return this.$store.folder.files.map(f => f.id);
    },
    get sortedFiles() {
        return this.$store.folder.sortedChecksums.map(checksum => this.$store.folder.files.find(f => f.checksum === checksum)).filter(f => f.is_file);
    },
    get sortedFolders() {
        return this.$store.folder.sortedChecksums.map(checksum => this.$store.folder.files.find(f => f.checksum === checksum)).filter(f => !f.is_file);
    },
    init() {
        this.$watch('fileIds', (newValue, oldValue) => {
            console.table({ 'event': 'fileIds Changed', old: oldValue.join(', '), new: newValue.join(', ') });
        });
        globalThis.fileList = this;
    },
    onContextMenu(event, file) {
        this.$store.folder.clearSelected();
        this.openTooltip();
    },
    get xtooltip() {
        const self = this;
        // if (!this.file_entry.is_file) return null
        return {
            appendTo: this.$refs.square,
            content: document.querySelector('#contextmenu_blank_space').innerHTML.replace('id_file', '0'),
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
        this.tooltipInstance = tippy(this.$el, this.xtooltip);
        this.tooltipInstance.show();
    },
    get popoverClass() {
        return {
            'popover-header': true,
            'popover-header-file': false,
            'popover-header-folder': true
        };
    },
    closeFilesTooltip() {
        console.log('closeFilesTooltip', {
            tooltipInstance: this.tooltipInstance
        });
        this.tooltipInstance?.hide();
    },
    popover_handlers: {
        ['@click.stop'](e) {
            console.log('prevent click on blank space popover');
            console.log({ target: e.target });
        },
        ['style']: 'position:absolute;transform:translate(0,-55px);min-width:200px;'
    },
    popover_header: {
        ['@click.prevent']() {
            console.log('prevent click on popover title');
        },
    },
    folder_handlers: {
        ['@closefilestooltip'](e) {
            return this.closeFilesTooltip(e);
        },
        ['@closefilestooltip.window'](e) {
            return this.closeFilesTooltip(e);
        },
        ['@keyup.escape.window'](e) {
            return this.closeFilesTooltip(e);
        }
    }
});
//# sourceMappingURL=fileList.js.map