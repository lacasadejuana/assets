import { waitFor } from '../../components/plugins';
export const singleFileInput = ({ index, slug_name, id, parent_folder, fileName, folder, subfolder, isEditable, readonly, attr_type, negocio_id, campo_id, mimeType, filepath, ...other }) => ({
    index,
    negocio_id,
    slug_name,
    id,
    readonly,
    campo_id,
    fileName,
    folder,
    subfolder: subfolder || '',
    attr_type,
    isEditable,
    parent_folder: parent_folder || '',
    mimeType,
    // if is env local replace 'ejemplo/negocios' with '/lfm/media' else replace '/public/negocios'
    filepath: process.env.MIX_APP_ENV === 'local'
        ? filepath.replace('ejemplo/negocios', '/lfm/media')
        : filepath.replace('public/negocios', '/lfm/media'),
    // filepath : filepath.replace('public/negocios', '/lfm/media'),
    get fileInfo() {
        return {
            id,
            fileName,
            folder,
            subfolder,
            isEditable,
            readonly,
            attr_type,
            negocio_id,
            parent_folder,
            campo_id
        };
    },
    get icon() {
        if (this.mimeType.includes('image'))
            return 'far fa-file-image';
        if (this.mimeType.includes('pdf'))
            return 'fas fa-file-pdf';
        if (this.mimeType.includes('spreadsheet'))
            return 'fas fa-file-excel';
        if (this.mimeType.includes('docx'))
            return 'fas fa-file-word';
        if (this.mimeType.includes('text'))
            return 'fas fa-file-csv';
        if (this.mimeType.includes('zip'))
            return 'fas fa-file-archive';
        //if(this.mimeType.includes('pdf')) return 'fas fa-file-pdf'
        return 'fa fa-file-download';
    },
    get filesInputName() {
        return (`${this.attr_type}-${this.slug_name}-files`).replace('files-files', 'files');
    },
    getFilenameId(suffix) {
        return `${this.campo_id}-${this.index}-${suffix}`;
    },
    get style() {
        return `transition:opacity 0.2s ease;${this.filepath ? '' : 'order:2;'}`;
    },
    getInputName(suffix) {
        return `${this.filesInputName}[${this.index}][${suffix}]`.replace('files-files', 'files');
    },
    get token() {
        //@ts-ignore
        return document.querySelector('[name="_token"]').value;
    },
    removeElement() {
        //@ts-ignore
        const file = this.storedFile, id = this.id || this.index;
        globalThis.deletingComponent = this;
        if (!file) {
            console.warn('No file to delete', {
                inputName: this.filesInputName,
                id: this.index,
                file
            });
            return;
        }
        if (!file.fileName || file.files) {
            return this.$store.theform.deleteFileById(this.filesInputName, id);
        }
        // const path = `/api/lfm/${this.negocio_id}/${this.slug_name}/${file.fileName}`
        const relativePath = process.env.MIX_APP_ENV === 'local'
            ? file.filepath.replace('ejemplo/negocios/', '')
            : file.filepath.replace('public/negocios/', '');
        console.log({ relativePath });
        const path = `/api/lfm/${relativePath}`;
        let icon = this.$el.querySelector('.fa-trash');
        icon.className = 'fa fa-spinner fa-spin';
        return fetch(path, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': this.token,
            },
        }).then(async () => {
            const { key, id } = file;
            console.log('File deleted', { key, id });
            waitFor(300);
            return this.$store.theform.deleteFileById(this.filesInputName, id);
        });
    },
    get storedFile() {
        //@ts-ignore
        return this.$store.theform.getFileById(this.filesInputName, this.id);
    },
    get storedFiles() {
        console.log({ filesInputName: this.filesInputName });
        return this.$store.theform.get(this.filesInputName);
    },
    get campo() {
        return this.$store.campos_busqueda.find(this.slug_name) || globalThis
            .campos[this.slug_name];
    },
    updateFile(properties) {
        this.$store.theform.updateFile(this.filesInputName, this.id, properties);
    },
    init() {
        this.mimeType = mimeType || '';
        //  console.log({ other })
    },
});
//# sourceMappingURL=singleFileInput.js.map