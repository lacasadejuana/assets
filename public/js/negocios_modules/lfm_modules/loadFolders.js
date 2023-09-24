import { staticFetchWrapper } from "@/components/decorators/staticFetchWrapper";
import { createDroppableOnNode, getFolderStore, goTo } from "./flm_iframe";
export var Icon;
(function (Icon) {
    Icon["FaFaFolder"] = "fa fa-folder";
})(Icon || (Icon = {}));
export function loadFolders(id_negocio, selector = '#tree', bust_cache = false) {
    const folderStore = getFolderStore();
    id_negocio = id_negocio || folderStore.id_negocio;
    let api_prefix = globalThis.prefix ?? folderStore.api_prefix ?? folderStore.api_prefix2 ?? 'lfm/api';
    const endpoint = new URL(`${location.origin}/lfm/api/${id_negocio}/folder_list`);
    endpoint.searchParams.append('show_enabled', 'true');
    if (folderStore.working_dir)
        endpoint.searchParams.append('working_dir', folderStore.working_dir);
    if (jQuery(selector).children().length === 0) {
        jQuery(selector).append('<i class="fa fa-spinner fa-spin" style="font-size: 4em;    width: 1em;    height: 1em;    margin: 5em auto;"></i>');
    }
    if (bust_cache) {
        endpoint.searchParams.append('bust_cache', 'true');
    }
    return staticFetchWrapper(decodeURIComponent(endpoint.toString()), {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + folderStore.token,
            'charset': 'utf8'
        }
    })
        .then(data => {
        data = data.sort((a, b) => {
            return a.text.replace(/^(\d{1})\s/, '0$1 ').localeCompare(b.text.replace(/^(\d{1})\s/, '0$1 '));
        });
        jQuery(selector).jstree('destroy');
        //@ts-ignore
        $(selector).jstree({
            'core': {
                data,
                "themes": {
                    "variant": "large"
                }
            }
        });
        setTimeout(() => {
            $('.jstree-anchor').not('.jstree-disabled').each((index, jsTreeAnchor) => {
                const jsTreeNode = jsTreeAnchor.parentElement;
                if (jsTreeNode.dataset.working_dir === folderStore.working_dir || jsTreeNode.dataset.has_sortable)
                    return;
                jsTreeNode.classList.add('enabled-node');
                createDroppableOnNode(jsTreeNode);
            });
        }, 1000);
        $(selector)
            .on('open_node.jstree', function (e, data) {
            const nodeElement = document.querySelector(`[data-id="${data.node.id}"]`);
            $(nodeElement).find('.jstree-anchor').not('.jstree-disabled').each((index, jsTreeAnchor) => {
                const jsTreeNode = jsTreeAnchor.parentElement;
                jsTreeNode.classList.add('enabled-node');
                createDroppableOnNode(jsTreeNode);
            });
            console.log({ e, data, nodeElement });
        })
            .on('dblclick', '.jstree-node', function (e) {
            let { working_dir } = e.target.dataset;
            if (working_dir)
                goTo(working_dir);
        });
        //  loadItems();
    });
}
//# sourceMappingURL=loadFolders.js.map