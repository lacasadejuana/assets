import { getUrlParam } from "./flm_iframe";
import { loadFolders } from "./loadFolders";
export const dropZoneOptions = ($options) => {
    return {
        paramName: "doc[]",
        uploadMultiple: false,
        parallelUploads: 5,
        timeout: 0,
        clickable: '#upload-button',
        dictDefaultMessage: 'Arrástrelos acá',
        init: function () {
            var _this = this; // For the closure
            this.on('success', function (file, response) {
                if (typeof response === 'string' && response.endsWith('OK')) {
                    loadFolders($options.id_negocio);
                    Alpine.store('folder')
                        .debouncedLoadItems();
                    return $options.notifyUpload(file);
                }
                //@ts-ignore
                this.defaultOptions.error(file, JSON.stringify(response));
            });
        },
        headers: {
            'Authorization': 'Bearer ' + getUrlParam('token')
        },
        //   acceptedFiles: "{{ implode(',', $helper->availableMimeTypes()) }}",
    };
};
//# sourceMappingURL=dropZoneOptions.js.map