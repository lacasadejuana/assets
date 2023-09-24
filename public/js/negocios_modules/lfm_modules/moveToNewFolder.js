import { dialog, getFolderStore, performLfmRequest, refreshFoldersAndItems } from "./flm_iframe";
export function loadFoldersForMovingFiles() {
    const folderStore = getFolderStore();
    const endpoint = `/${folderStore.api_prefix2}/${folderStore.id_negocio}/folder_list?working_dir=${folderStore.working_dir}&show_enabled=true`;
    console.log({ loadFoldersForMovingFiles: endpoint });
    $('#dialog .modal-header').addClass('flex-column');
    const modal_tree = $('<div class="modaltree d-flex"></div>');
    $('#dialog #moving_file_disclaimer').remove();
    $('#dialog .modal-body .modaltree').remove();
    $('#dialog .modal-body input').hide();
    $('#dialog .modal-body').append(modal_tree);
    $('#dialog .modal-footer').show();
    console.log({ modal_tree });
    fetch(decodeURIComponent(endpoint), {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + folderStore.token
        }
    }).then(res => res.json())
        .then(data => {
        //@ts-ignore
        modal_tree.jstree({
            'core': {
                data,
                "themes": {
                    "variant": "large"
                }
            }
        });
        $('#dialog .modal-content').append('<input type="hidden" name="new_working_dir" value="' + folderStore.working_dir + '">');
        let moveTo = folderStore.working_dir;
        const disclaimer = '<h6 id="moving_file_disclaimer" style="color:#555;font-size:1.2em;margin-top:0.2em;line-height:1.5em" ><i style="font-size:1.1em;" class="fa fa-info-circle"></i> Recuerde: Las carpetas base (en gris) no pueden alojar archivos directamente</h6>';
        setTimeout(() => $('#dialog .modal-header').append(disclaimer), 200);
        modal_tree.on('click', '.jstree-anchor', function (e) {
            let { working_dir } = e.target.dataset;
            if (working_dir && /^\/\d+\//.test(working_dir)) {
                moveTo = working_dir;
                $('[name="new_working_dir"]').val(moveTo);
            }
        });
        dialog('Seleccione la nueva ubicación', '', function () {
            console.log('new dir: ' + moveTo);
            $('#dialog #moving_file_disclaimer').remove();
            $('#dialog .modal-header').removeClass('flex-column');
            $('[name="new_working_dir"]').remove();
            moveToNewFolder(moveTo);
        });
    });
}
export function moveToNewFolder($folder, items = null) {
    $("#notify").modal('hide');
    const folderStore = getFolderStore();
    items = (items || folderStore.selectedFiles);
    let fileNames = items.map(f => f.name);
    Promise.resolve(performLfmRequest(`/${folderStore.api_prefix2}/move`, {
        items: fileNames,
        goToFolder: $folder
    })).then((data) => {
        if (data === 'OK') {
            items.forEach(file => folderStore.removeFileFromList(file));
            return;
        }
        else {
            return refreshFoldersAndItems(data);
        }
    });
}
//# sourceMappingURL=moveToNewFolder.js.map