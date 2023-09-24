import { folder } from 'jszip';
import { deleteFiles, dialog, getFolderStore, performLfmRequest, refreshFoldersAndItems, rename } from './flm_iframe';
export const fileWrapper = (id_file) => ({
    file_id: id_file,
    get file() {
        return this.$store.folder.properties.find(file => file.id === this.file_id);
    },
    copied_msg: false,
    get permalink() {
        return this.file.sharing_link;
    },
    copyPermalink() {
        this.copied_msg = true;
        // Copy the text inside the text field
        navigator.clipboard ? navigator.clipboard.writeText(this.permalink) : null;
        setTimeout(() => (this.copied_msg = false), 1500);
    },
    deleteFile() {
        //@ts-ignore
        deleteFiles([this.file]);
    },
    renameFile() {
        //@ts-ignore
        rename(this.file);
    },
    createFolder() {
        const folderStore = getFolderStore();
        $('#dialog #moving_file_disclaimer').remove();
        $('#dialog .modal-body .modaltree').remove();
        $('#dialog .modal-body input').show();
        dialog('Seleccione un nombre para el nuevo directorio', '', (new_name) => {
            performLfmRequest(`/${folder.api_prefix2}/new_folder`, {
                // file: item.name,
                new_name: new_name,
                // disk: item.disk
            }).done(data => {
                $('#dialog').hide();
                data = typeof data === 'string' ? JSON.parse(data) : data;
                console.warn({ data });
                data.name = new_name;
                data.is_file = false;
                data.is_folder = true;
                this.$store.folder.appendFile(data);
                refreshFoldersAndItems(data);
            });
        });
    },
    /*delete() {
        //@ts-ignore
        trash([this.file])
    },*/
    get popoverClass() {
        return {
            'popover-header': true,
            'popover-header-file': this.file?.is_file,
            'popover-header-folder': !this.file?.is_file,
        };
    },
    popover_handlers: {
        ['@click.stop']() {
            console.log('prevent click on popover');
        },
        ['style']: 'position:absolute;transform:translate(0,-55px);min-width:200px;'
    },
    popover_header: {
        ['@click.prevent']() {
            console.log('prevent click on popover title');
        },
    },
    init() {
        console.log({
            file: this.file,
            id: this.file_id
        });
    }
});
//# sourceMappingURL=fileWrapper.js.map