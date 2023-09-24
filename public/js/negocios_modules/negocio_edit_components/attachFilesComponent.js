import { waitFor } from '../../components/plugins';
export const attachFileComponent = ({ inputName, negocio_id, slug_name, attr_type, isEditable, campo_id }) => ({
    get inputName() {
        return inputName;
    },
    negocio_id,
    slug_name,
    attr_type,
    isEditable,
    campo_id,
    get filesInputName() {
        return (this.inputName + '-files').replace('files-files', 'files');
    },
    get storedFiles() {
        return this.$store.theform.get(this.filesInputName);
    },
    get token() {
        //@ts-ignore
        return document.querySelector('[name="_token"]').value;
    },
    get storedCount() {
        return Object.keys(this.storedFiles || {}).length;
    },
    init() {
        globalThis.attachFilesComponent = globalThis.attachFilesComponent || {};
        globalThis.attachFilesComponent[this.slug_name] = this;
    },
    get fileInputs() {
        return Array.from(this.$el.closest('.modal-dialog').querySelectorAll('.modal-body input[type=file]'));
    },
    fileSelected(event) {
        const fileInput = event.target;
        for (let file of fileInput.files) {
            this.files.push(file);
        }
    },
    files: [],
    filledInputs: [],
    getFormData() {
        const formData = new FormData();
        this.fileInputs.forEach(fileInput => {
            /**
             * For each of them, select their sibling inputs
             */
            const inputRow = fileInput.closest('.input_group').querySelectorAll('input');
            Array.from(inputRow).forEach((input) => {
                if (input.getAttribute('type') === 'file') {
                    //@ts-ignore
                    for (let file of input.files) {
                        formData.append(input.name, file);
                        this.filledInputs.push(input);
                    }
                }
                else {
                    formData.append(input.name, input.value);
                }
            });
        });
        formData.append('_method', 'PATCH');
        return formData;
    },
    get commonConfig() {
        return {
            index: 0,
            negocio_id: this.negocio_id,
            slug_name: (this.slug_name + '-files').replace('files-files', 'files'),
            folder: this.slug_name,
            attr_type: this.attr_type,
            campo_id: this.campo_id,
            isEditable: this.isEditable,
            subfolder: '',
            readonly: false
        };
    },
    pushFile(file) {
        return this.$store.theform.pushFile(this.filesInputName, {
            index: file.id,
            ...file,
            ...this.commonConfig
        });
    },
    pushEmptyFile() {
        this.$store.theform.pushFile(this.filesInputName, {
            ...this.commonConfig
        });
    },
    upload() {
        fetch(`/api/lfm/${this.negocio_id}/${this.slug_name}`, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': this.token,
            },
            body: this.getFormData()
        }).then(res => res.json())
            .then(async (files) => {
            for (let file of files) {
                this.pushFile(file);
                this.files = this.files.filter(f => f.name !== file.fileName);
                await waitFor(200);
            }
            this.$store.theform.pruneFilesBy(this.filesInputName);
            this.filledInputs = [];
        });
    }
});
//# sourceMappingURL=attachFilesComponent.js.map