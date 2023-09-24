import { waitFor } from '@/components/plugins';
import { getFolderStore, goTo, loading, setOpenFolders } from './flm_iframe';
import { createPagination } from './generatePaginationHTML';
export function loadItems(page) {
    let folderStore = getFolderStore(), selected = folderStore.selected;
    loading(true);
    const endpoint = new URL(location.origin + '/' + folderStore.api_prefix + folderStore.working_dir);
    endpoint.searchParams.set('page', page || 1);
    endpoint.searchParams.set('working_dir', folderStore.working_dir);
    const loadItemsPromise = (fetch(decodeURIComponent(endpoint.toString()), {
        headers: {
            //@ts-ignore
            Authorization: 'Bearer ' + folderStore.token,
            'content-type': 'application/json',
        },
    }).then((res) => res.json())
        .then(function (data) {
        selected = [];
        let response = (data.original ?? data), items = response.items, working_dir = response.working_dir, folder_slug = response.folder_slug, slug_name = response.slug_name, hasItems = items && items.length !== 0, hasPaginator = !!response.paginator;
        for (let property of [
            'isEditable',
            'id_campo',
            'slug_name',
            'nombre_campo',
            'hashid_negocio',
            'hashid_campo',
        ]) {
            folderStore[property] = response[property];
        }
        folderStore.folder_slug = folder_slug;
        folderStore.real_path = working_dir;
        folderStore.working_dir = folder_slug;
        $('#empty').toggleClass('d-none', hasItems);
        $('#pagination').html('').removeAttr('class');
        const newURL = new URL(window.location.href);
        if (hasItems) {
            $('#pagination').addClass('preserve_actions_space');
        }
        if (hasPaginator) {
            createPagination(response.paginator);
            $('#pagination a').on('click', function (event) {
                event.preventDefault();
                loadItems($(this).closest('li')[0].getAttribute('data-num'));
                return false;
            });
        }
        $('#nav-buttons > ul').removeClass('d-none');
        $('#working_dir').val(working_dir);
        updateBreadCrumbs(working_dir);
        setOpenFolders();
        loading(false);
        return { items, until: response.until };
    }));
    folderStore.loading = true;
    return waitFor(150).then(async () => {
        folderStore.files = [];
        await waitFor(150);
        return loadItemsPromise.then(async ({ items, until }) => {
            folderStore.loading = false;
            for (let item of items) {
                //  item.original_name = item.name;
                //  item.new_name = item.name;
                //  item.date = (new Date(item.time * 1000)).toLocaleString('en-GB');
                //  item.created_at = (new Date(item.time * 1000)).toISOString();
                if (item.sharing_link) {
                    let sharing_link = new URL(item.sharing_link);
                    sharing_link.searchParams.set('until', until);
                    item.sharing_link = sharing_link.toString();
                }
                await folderStore.appendFile(item);
            }
        });
    });
}
export function updateBreadCrumbs(working_dir) {
    const folderStore = getFolderStore();
    console.log('Current working_dir : ' + working_dir);
    var breadcrumbs = [];
    folderStore.breadcrumbs = [];
    var validSegments = working_dir.split('/').filter(function (e) {
        return e;
    });
    validSegments.forEach(function (segment, index) {
        segment = segment.trim();
        if (index === 0)
            segment = 'Negocio ' + segment;
        breadcrumbs.push(segment);
    });
    $('#breadcrumbs > ol').html('');
    breadcrumbs.forEach(function (breadcrumb, index) {
        var li = $('<li>')
            .addClass('breadcrumb-item')
            .text(breadcrumb);
        if (index === breadcrumbs.length - 1) {
            li.addClass('active').attr('aria-current', 'page');
        }
        else {
            li.on('click', function () {
                goTo('/' +
                    validSegments.slice(0, 1 + index).join('/'));
            });
        }
        $('#breadcrumbs > ol').append(li);
    });
    folderStore.breadcrumbs = breadcrumbs;
}
//# sourceMappingURL=loadItems.js.map