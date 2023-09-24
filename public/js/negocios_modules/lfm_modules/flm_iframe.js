import { loadFolders } from "./loadFolders";
import { loadItems } from "./loadItems";
import { moveToNewFolder } from "./moveToNewFolder";
export function getFolderStore() {
    //@ts-ignore
    return Alpine.store('folder');
}
export function getAlpineStore() {
    return {
        folder: getFolderStore()
    };
}
globalThis.getFolderStore = getFolderStore;
export function getUrlParam(paramName) {
    var reParam = new RegExp('(?:[\?&]|&)' + paramName + '=([^&]+)', 'i');
    var match = window.location.search.match(reParam);
    return (match && match.length > 1) ? match[1] : null;
}
export function toggleMobileTree(should_display) {
    if (should_display === undefined) {
        should_display = !$('#tree').hasClass('in');
    }
    $('#tree').toggleClass('in', should_display);
}
export function selectText(node) {
    if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}
export function getOneSelectedElement(orderOfItem) {
    let $store = getAlpineStore(), selected = $store.folder.selected;
    var index = orderOfItem !== undefined ? orderOfItem : selected[0];
    return items[index];
}
export function getSelectedItems() {
    let $store = getAlpineStore(), selected = $store.folder.selected;
    return selected.reduce(function (arr_objects, id) {
        arr_objects.push(getOneSelectedElement(id));
        return arr_objects;
    }, []);
}
let show_list = localStorage.getItem('show_list') || 'list';
let sort_type = localStorage.getItem('sort_type') || 'alphabetic';
document.querySelector('#content').className = show_list;
document.querySelector('#content_alpine').className = show_list;
document.querySelector('#nav-buttons .navbar-nav').classList.add('show_' + show_list);
document.querySelector('#nav-buttons .navbar-nav').classList.add('sort_' + sort_type);
//@ts-ignore
export const tinyMCEPopup = window.tinyMCEPopup || null;
var items = [];
export function toggleActions() {
    let $store = getAlpineStore(), selected = $store.folder.selected;
    var one_selected = selected.length === 1;
    var many_selected = selected.length >= 1;
    var only_image = getSelectedItems()
        .filter(function (item) { return item && !item.is_image; })
        .length === 0;
    var only_file = getSelectedItems()
        .filter(function (item) { return item && !item.is_file; })
        .length === 0;
    console.log('toggling Actions');
    //$('#fab').toggleClass('d-none', selected.length !== 0);
}
$.fn.fab = function (options) {
    var menu = this;
    menu.addClass('fab-wrapper');
    var toggler = $('<a>')
        .addClass('fab-button fab-toggle')
        .append($('<i>').addClass('fas fa-plus'))
        .click(function () {
        menu.toggleClass('fab-expand');
    });
    const uploadBtn = $('<a>').addClass('fab-button fab-action')
        //.attr('data-label', lang['nav-upload'])
        .attr('id', 'upload')
        .append($('<i>').addClass('fas fa-upload'));
    menu.append(uploadBtn);
    //menu.append(toggler);
    menu.addClass('fab-expand');
};
$(document).ready(function () {
    const $store = getAlpineStore();
    const folderStore = getFolderStore();
    console.info('$store', globalThis.$store);
    let show_list = localStorage.getItem('show_list') || 'list';
    let sort_type = localStorage.getItem('sort_type') || 'alphabetic';
    document.querySelector('#content').className = show_list;
    document.querySelector('#content_alpine').className = show_list;
    document.querySelector('#nav-buttons .navbar-nav').classList.add('show_' + show_list);
    document.querySelector('#nav-buttons .navbar-nav').classList.add('sort_' + sort_type);
    addEventListener("popstate", ({ state }) => {
        console.log({ popstate: state });
        if (state && state.working_dir)
            goTo(state.working_dir);
    });
    $('#fab').fab({
        buttons: [
            {
                icon: 'fas fa-upload',
                label: folderStore.lang['nav-upload'],
                attrs: { id: 'upload' }
            },
            {
                icon: 'fas fa-folder',
                label: 'Nueva Carpeta',
                attrs: { id: 'add-folder' }
            }
        ]
    });
    performLfmRequest('errors')
        .done(function (response) {
        JSON.parse(response).forEach(function (message) {
            $('#alerts').append($('<div>').addClass('alert alert-warning')
                .append($('<i>').addClass('fas fa-exclamation-circle'))
                .append(' ' + message));
        });
    });
    $('#file_list').on('dragenter', function () {
        if (folderStore.moving || !folderStore.slug_name)
            return;
        $('#uploadModal').modal('show');
    });
    $(document).on('click', '#add-folder', function () {
        dialog(folderStore.lang['message-name'], '', createFolder);
    });
    // ======================
    // ==  Navbar actions  ==
    // ======================
    $(document).on('click', '#upload', function () {
        $('#uploadModal').modal('show');
    }).on('click', '[data-display]', function () {
        let current_show_list = show_list, current_navbar_show_list = 'show_' + current_show_list;
        show_list = $(this).data('display');
        const content_alpine = document.querySelector('#content_alpine'), navbar_nav = document.querySelector('#nav-buttons .navbar-nav');
        document.querySelector('#content').className = show_list;
        content_alpine.classList.remove(current_show_list);
        navbar_nav.classList.remove(current_navbar_show_list);
        navbar_nav.classList.add('show_' + show_list);
        content_alpine.classList.add(show_list);
        console.log('click data display');
        localStorage.setItem('show_list', show_list);
    }).on('click', '[data-action]', function () {
        let maybeFn = window[$(this).data('action')];
        if (typeof maybeFn === "function") {
            //@ts-ignore
            maybeFn($(this).data('multiple') ? getSelectedItems() : getOneSelectedElement());
        }
    });
});
// ==========================
// ==  Multiple Selection  ==
// ==========================
export function updateSelectedStyle() {
    let $store = getAlpineStore(), selected = $store.folder.selected;
    const items = selected.map(id => $store.folder.findById(id));
    items.forEach(function (item, index) {
        console.log({ item, index, selected });
        $('[data-id=' + index + ']')
            .find('.square')
            .toggleClass('selected', selected.indexOf(index) > -1);
    });
    toggleActions();
}
// ======================
// ==  Folder actions  ==
// ======================
$(document).ready(function ($) {
    var bsDefaults = {
        offset: false,
        overlay: true,
        width: '330px'
    }, bsMain = $('.bs-offset-main'), bsOverlay = $('.bs-canvas-overlay');
    $('.bs-canvas-close, .bs-canvas-overlay').on('click', function () {
        const $store = getAlpineStore();
        if (bsOverlay.length)
            bsOverlay.removeClass('show');
        $store.folder.show_tree = false;
        return false;
    });
});
export function goTo(new_dir) {
    const $store = getAlpineStore();
    const folderStore = $store.folder;
    folderStore.old_working_dir = folderStore.working_dir;
    folderStore.working_dir = new_dir;
    folderStore.updateSelectedNode();
}
export function getPreviousDir() {
    let previous_working_dir = ($('#working_dir').val() || '');
    return previous_working_dir.substring(0, previous_working_dir.lastIndexOf('/'));
}
export function setOpenFolders() {
    $('#tree [data-path]').each(function (index, folder) {
        // close folders that are not parent
        var should_open = ($('#working_dir').val() + '/').startsWith($(folder).data('path') + '/');
        $(folder).children('i')
            .toggleClass('fa-folder-open', should_open)
            .toggleClass('fa-folder', !should_open);
    });
    $('#tree .nav-item').removeClass('active');
    $('#tree [data-path="' + $('#working_dir').val() + '"]').parent('.nav-item').addClass('active');
}
// ====================
// ==  Ajax actions  ==
// ====================
export function displayErrorResponse(jqXHR) {
    notify('<div style="max-height:50vh;overflow: scroll;">' + jqXHR.responseText + '</div>');
}
export const refreshFoldersAndItems = function (data) {
    console.log({ refreshFoldersAndItems: data });
    loadFolders((getAlpineStore().folder).id_negocio).then(loadItems);
    if (data != 'OK') {
        data = Array.isArray(data) ? data.join('<br/>') : data;
        notify(data);
    }
    return;
};
export function loadPartial(endpoint) {
    let endpointurl = new URL(endpoint, window.location.origin);
    location.href = endpointurl.toString();
}
export function apiPathName(pathname) {
    const folderStore = getFolderStore();
    pathname = pathname.replace(folderStore.api_prefix, '').replaceAll('//', '');
    return ('/' + (folderStore.api_prefix + '/' + pathname)).replaceAll('//', '');
}
export function performLfmRequest(url, parameter, type) {
    var data = defaultParameters();
    if (parameter != null) {
        $.each(parameter, function (key, value) {
            data[key] = value;
        });
    }
    return $.ajax({
        type: 'GET',
        beforeSend: function (request) {
            var token = getUrlParam('token');
            if (token !== null) {
                request.setRequestHeader("Authorization", 'Bearer ' + token);
            }
        },
        dataType: type || 'text',
        url: apiPathName(url),
        data: data,
        cache: false
    })
        .then(function (response, textStatus, jqXHR) {
        let { status } = jqXHR;
        if (status > 400 && status < 500) {
            let locationHeader = jqXHR.getResponseHeader('Location');
            if (locationHeader)
                notify('Su sesión ha expirado. A continuación será redirigido a la pantalla de inicio de sesión').then(() => location.href = '/logout');
        }
        else {
            return response;
        }
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        displayErrorResponse(jqXHR);
    });
}
export function createDroppableOnNode(jsTreeNode) {
    const folderStore = getFolderStore();
    if (jsTreeNode.dataset.working_dir === folderStore.working_dir || jsTreeNode.classList.contains('sortable-target'))
        return;
    jsTreeNode.classList.add('sortable-target');
    let droppableSpan = jsTreeNode.cloneNode(true);
    jsTreeNode.classList.add('sortable-target');
    //jsTreeNode.after(droppableSpan)
    //@ts-ignore
    $(jsTreeNode).droppable({
        accept: ".square_inner",
        classes: {
            "ui-droppable-active": "ui-state-default",
            "ui-droppable-hover": "ui-state-hover"
        },
        scope: "file_entry",
        tolerance: 'pointer',
        greedy: true,
        drop: function (event, ui) {
            let movedFile = folderStore.files.find(f => f.moving);
            let movedElement = jsTreeNode.querySelector('.square_inner');
            folderStore.moving = false;
            let moveTo = jsTreeNode.dataset.working_dir;
            console.warn({ movedFile, moveTo });
            setTimeout(() => {
                moveToNewFolder(moveTo, [movedFile]);
            }, 200);
            $('#tree').removeClass('moving_file');
        }
    });
    return;
}
export function searchFile() {
    const folderStore = getFolderStore();
    $('#dialog #moving_file_disclaimer').remove();
    $('[name="new_working_dir"]').remove();
    $('#dialog .modal-body').empty().append('<select id="file_search" name="file_search"></select>');
    const endpoint = `/${folderStore.api_prefix2}/${folderStore.id_negocio}/file_optionlist?working_dir=${folderStore.working_dir}`;
    $('#dialog .modal-footer').addClass('d-none');
    fetch(endpoint, {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + folderStore.token
        }
    }).then(res => res.json())
        .then((optionList) => {
        console.info({ optionList });
        globalThis.inferPreviewInstance.initTomSelect(document.querySelector('#file_search'), optionList);
        dialog('Buscar archivo', '', function () {
        });
    });
}
export function deleteFiles(items) {
    const folderStore = getFolderStore();
    $('#notify').find('.modal-dialog').removeClass('modal-lg').removeClass('modal-md');
    return notify('<span style="font-size:1.2em">' + folderStore.lang['message-delete'] + '</span>').then(() => {
        return Promise.all(items.map(file => {
            const path = `/${folderStore.api_prefix}${folderStore.working_dir}/${file.name}?working_dir=${folderStore.working_dir}`;
            return fetch(path, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': folderStore.token,
                },
            }).then(async () => {
                return folderStore.removeFileFromList(file);
            });
        }));
    });
}
export function loading(show_loading) {
    $('#loading').toggleClass('d-none', !show_loading);
}
export function createFolder(folder_name) {
    performLfmRequest('newfolder', { name: folder_name })
        .done(refreshFoldersAndItems);
}
// ==================================
// ==         File Actions         ==
// ==================================
export function rename(item, new_name) {
    const folderStore = getFolderStore();
    // if a new name was passed, skip the prompt for a new name
    if (new_name) {
        if (item.name === new_name)
            return;
        const folderStore = getFolderStore();
        const endpoint = new URL(location.origin + `/${folderStore.api_prefix2}/rename`);
        endpoint.searchParams.append('new_name', new_name);
        endpoint.searchParams.append('file', item.name);
        endpoint.searchParams.append('disk', item.disk);
        endpoint.searchParams.append('working_dir', folderStore.working_dir);
        return fetch(endpoint.toString(), {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': folderStore.token,
            },
        }).then(response => response.text())
            .then(data => {
            item.name = new_name;
            item.original_name = new_name;
            item.new_name = new_name;
            item.renaming = false;
            return refreshFoldersAndItems(data);
        }).catch(err => {
            return notify(err.message);
        });
    }
    item.renaming = true;
    $('#dialog #moving_file_disclaimer').remove();
    $('#dialog .modal-body .modaltree').remove();
    $('#dialog .modal-body input').show();
    dialog(Alpine.store('folder').lang['message-rename'], item.name, function (new_name) {
        performLfmRequest(`/${folderStore.api_prefix2}/rename`, {
            file: item.name,
            new_name: new_name,
            disk: item.disk
        }).done(data => {
            item.name = new_name;
            item.original_name = new_name;
            item.new_name = new_name;
            item.renaming = false;
            refreshFoldersAndItems(data);
        });
    });
}
//https://localnegocios.juana.house/filemanager/delete?working_dir=/124/solicitudes-visita&type=&items[]=RecetaMedicaElectronica.pdf&_=1685400367259
export function download(items) {
    const folderStore = getFolderStore();
    items.forEach(function (item, index) {
        var data = defaultParameters();
        data['file'] = item.name;
        var token = getUrlParam('token');
        if (token) {
            data['token'] = token;
        }
        setTimeout(function () {
            let download_path = folderStore + '/download?' + $.param(data);
            console.log({ download_path });
            //location.href = download_path
        }, index * 100);
    });
}
export function open(item) {
    goTo(item.url);
}
// ==================================
// ==            Others            ==
// ==================================
export function defaultParameters() {
    return {
        working_dir: $('#working_dir').val(),
        type: $('#type').val()
    };
}
export function notImp() {
    notify('Not yet implemented!');
}
export function notify(body, callback) {
    //$('#notify').find('.btn-primary').toggle(callback !== undefined);
    $('#notify').find('.btn-primary').unbind().click(callback);
    $('#notify').modal('show').find('.modal-body').html(body);
    return new Promise((resolve, reject) => {
        $('#notify').find('.btn-primary').unbind().click(function (e) {
            resolve(e);
        });
    });
}
export function dialog(title, value, callback) {
    $('#dialog').find('input').val(value);
    $('#dialog').on('shown.bs.modal', function () {
        $('#dialog').find('input').focus();
    });
    $('#dialog').find('.btn-primary').unbind().click(function (e) {
        callback($('#dialog').find('input').val());
    });
    $('#dialog').modal('show').find('.modal-title').text(title);
}
//# sourceMappingURL=flm_iframe.js.map