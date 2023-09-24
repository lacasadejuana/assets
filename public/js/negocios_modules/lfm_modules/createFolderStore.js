import { getIcon } from './getIcon';
import { loadItems } from './loadItems';
import slugify from 'slugify';
export function createFolderStore() {
    return {
        _id_negocio: '',
        slug_name: '',
        hashid_negocio: '',
        hashid_campo: '',
        printTable() {
            console.table(this.sortedList, ['id', 'name', 'icon', 'mimeType']);
        },
        breadcrumbs: [],
        multi_selection_enabled: false,
        findById(id) {
            return this.files.find((item) => item.id === id);
        },
        token: null,
        get id_negocio() {
            if (!/^\d+$/.test(this._id_negocio)) {
                this._id_negocio = location.pathname.replace('/lfm/', '').split('/')[0];
            }
            return this._id_negocio;
        },
        set id_negocio(id_negocio) {
            if (/^\d+$/.test(id_negocio)) {
                this._id_negocio = id_negocio;
            }
            else {
                this._id_negocio = location.pathname.replace('/lfm/', '').split('/')[0];
            }
        },
        get api_prefix() {
            return this._api_prefix ?? (this.api_prefix2 ?? 'api/lfm');
        },
        set api_prefix(api_prefix) {
            this._api_prefix = api_prefix;
        },
        _api_prefix: null,
        setOptions({ lang, userCanEdit, api_prefix, userCanDelete, token, working_dir, id_negocio }) {
            this.lang = lang;
            this.token = token;
            this.userCanEdit = userCanEdit;
            this.userCanDelete = userCanDelete;
            this.api_prefix = api_prefix ?? 'lfm/api';
            if (working_dir)
                this.working_dir = working_dir;
            if (id_negocio)
                this.id_negocio = id_negocio;
            if (userCanDelete) {
                this.actions.push({
                    name: 'trash',
                    icon: 'trash',
                    label: lang['menu-delete'],
                    multiple: true,
                });
            }
            if (userCanEdit) {
                this.actions.push({
                    name: 'move',
                    icon: 'paste',
                    label: this.lang['menu-move'],
                    multiple: true,
                });
            }
            this.sortings = [
                {
                    by: 'alphabetic',
                    icon: 'sort-alpha-down',
                    label: lang['nav-sort-alphabetic'],
                },
                {
                    by: 'time',
                    icon: 'sort-numeric-down',
                    label: lang['nav-sort-time'],
                },
            ];
        },
        lang: null,
        sortBy: 'name',
        get tree() {
            return $('#tree').data('jstree');
        },
        get sortedList() {
            if (this.sortBy === 'name') {
                return this.files.slice(0).sort((a, b) => {
                    return a.name.replace(/^(\d{1})\s/, '0$1 ').localeCompare(b.name.replace(/^(\d{1})\s/, '0$1 '));
                });
            }
            return this.files.slice(0)
                .sort((a, b) => a[this.sortBy].localeCompare(b[this.sortBy]));
        },
        get sortedChecksums() {
            return Array.from(new Set(this.sortedList.map((f) => f.checksum)));
        },
        loading: false,
        sortings: [],
        actions: [],
        get selected() {
            return this.files.filter((f) => f.selected).map((f) => f.id);
        },
        get selectedFiles() {
            return this.files.filter((f) => f.selected);
        },
        clearSelected() {
            this.selectedFiles.forEach((f) => (f.selected = false));
        },
        set propertes(value) {
            this.files = value;
        },
        init() {
            this.debouncedLoadItems = Alpine.debounce(loadItems, 300);
            setTimeout(() => {
                let toastElement = $('.toast');
                if (!toastElement.length) {
                    console.warn(`$('.toast') not found`);
                    return;
                }
                if (typeof $.fn.toast !== 'function') {
                    console.warn(`$.fn.toast is not a function`);
                    return;
                }
                try {
                    toastElement.toast({ animation: true, autohide: true, delay: 3000 });
                }
                catch (e) {
                    console.warn(e);
                }
            }, 1500);
        },
        files: [],
        get properties() {
            return this.files;
        },
        isEditable: false,
        nombre_campo: '',
        _working_dir: '',
        _real_path: '',
        workingDirToNodeId(working_dir) {
            return working_dir.replace(/\//g, ':').replace(/^:/, '#');
        },
        get current_node_id() {
            return this.workingDirToNodeId(this.working_dir);
        },
        updateSelectedNode() {
            this.tree.deselect_node(this.previous_node);
            this.tree.select_node(this.current_node);
        },
        get previous_node() {
            return this.tree.get_node(this.workingDirToNodeId(this.old_working_dir || this.working_dir));
        },
        get current_node() {
            return this.tree.get_node(this.current_node_id);
        },
        get working_dir() {
            return this._working_dir;
        },
        set working_dir(new_dir) {
            let folder_slug = this.getFolderSlug(new_dir, '/');
            if (folder_slug === this._working_dir) {
                console.warn('working_dir is already set to', folder_slug);
                return;
            }
            if (!/^\/\d+/.test(folder_slug)) {
                console.warn(`Tried to navigate to unsupported working dir ${folder_slug}`);
                return;
            }
            this.echoInstance?.leave(this.channelName);
            this.tree?.deselect_node(this.current_node);
            //            if (folder_slug.startsWith(`/${this.id_negocio}/`) && (new_dir.length - folder_slug.length) < 10) new_dir = folder_slug
            new_dir = decodeURIComponent(new_dir);
            console.log({ folder_slug, new_dir });
            this._working_dir = folder_slug;
            $('#working_dir').val(folder_slug);
            let url = new URL(location.href);
            url.pathname = `/lfm${folder_slug}`;
            history.pushState({ working_dir: folder_slug }, null, url.toString());
            this.tree && this.tree.open_node(this.current_node);
            this.files = [];
            loadItems().then(() => {
                this.echoInstance
                    .channel(this.channelName)
                    .listen('.lfm.file-uploaded', ({ file }) => this.onFileUploaded(file))
                    .listen('.lfm.google-files', ({ files }) => this.onGoogleFiles(files))
                    .listen('.lfm.file-moved', ({ old_path, new_path }) => this.onFileMoved({ old_path, new_path }))
                    .listen('.lfm.file-moved-into', ({ file }) => this.onFileMovedIn(file))
                    .listen('.lfm.file-deleted', ({ fileName }) => this.onFileDeleted({ fileName }))
                    .listen('.lfm.file-renamed', (e) => this.onFileRenamed(e));
                this.refreshGallery();
            });
        },
        getFolderSlug(folder, separator = '.') {
            folder = folder || this.working_dir;
            if (this.folder_dict) {
                Object.entries(this.folder_dict).forEach(([key, value]) => {
                    folder = folder.replace(key, value);
                });
                return folder;
            }
            return decodeURIComponent(folder).split('/').map(part => slugify(part, '_')).join(separator).toLowerCase().replace(/^\./, '');
        },
        get channelName() {
            return this.getFolderSlug(); // this.working_dir.replace(/\//g, '.');
        },
        echoInstance: null,
        configureBroadCast({ echoInstance }) {
            this.echoInstance = echoInstance;
        },
        removeFileFromList(file) {
            if (!file)
                return;
            file.removing = true;
            setTimeout(() => {
                this.files = this.files.filter((f) => f.name !== file.name);
            }, 200);
        },
        toast_message: '',
        toast_title: '',
        get galleryFiles() {
            return this.sortedList.filter(f => f.is_image || f.is_video).map((f, index) => {
                //@ts-ignore
                f.gallery_id = index;
                return f;
            });
        },
        onFileDeleted({ fileName }) {
            console.log('pusher event: file deleted', { fileName });
            let target_file = this.files.find(f => f.name === fileName);
            if (!target_file)
                return;
            this.toast_title = 'Archivo eliminado';
            this.toast_message = `El archivo <b>${fileName}</b> fue eliminado`;
            $('.toast').toast('show');
            this.removeFileFromList(target_file);
        },
        onFileMoved({ old_path, new_path }) {
            let fileName = old_path.split('/').pop();
            console.log('pusher event: file moved', { fileName });
            let target_file = this.files.find(f => f.name === fileName);
            if (!target_file)
                return;
            this.toast_title = 'Archivo movido';
            this.toast_message = `Archivo <b>${fileName}</b> fue movido a otra carpeta`;
            $('.toast').toast('show');
            this.removeFileFromList(target_file);
        },
        onFileRenamed({ old_path, new_path }) {
            let old_name = old_path.split('/').pop(), new_name = new_path.split('/').pop(), target_file = this.files.find(f => f.name === old_name);
            console.log('pusher event: file renamed', { old_name, new_name });
            if (!target_file)
                return;
            this.toast_title = 'Archivo renombrado';
            this.toast_message = `Archivo <b>${old_name}</b> fue renombrado a <b>${new_name}</b>`;
            target_file.renaming = true;
            target_file.highlighted = true;
            $('.toast').toast('show');
            setTimeout(() => {
                target_file.new_name = new_name;
                target_file.name = new_name;
                target_file.highlighted = false;
                target_file.renaming = false;
            }, 200);
        },
        onFileMovedIn(file) {
            let existing = this.files.find(f => f.name === file.fileName);
            console.log('pusher event: file moved in', { file });
            if (existing && Math.abs(existing.time - file.time || file.timestamp) < 5000)
                return;
            this.toast_title = 'Archivo Movido';
            this.toast_message = `Se movió un archivo a esta carpeta: <b>${name}</b>.`;
            $('.toast').toast('show');
            this.appendFile(file);
            this.files.filter(f => f.removing).forEach(f => f.removing = false);
            this.debouncedLoadItems();
        },
        onFileUploaded(file, reload = true) {
            let existing = this.files.find(f => f.name === file.fileName);
            console.log('pusher event: file uploaded', { file });
            if (existing && Math.abs(existing.time - file.time || file.timestamp) < 5000)
                return;
            this.toast_title = 'Nuevo Archivo';
            this.toast_message = `Se subió un nuevo archivo: <b>${name}</b>.`;
            $('.toast').toast('show');
            this.appendFile(file);
            this.files.filter(f => f.removing).forEach(f => f.removing = false);
            if (reload)
                this.debouncedLoadItems();
        },
        onGoogleFiles(files) {
            console.log('pusher event: google file list', { files });
            files.forEach((file) => {
                this.onFileUploaded(file, false);
            });
        },
        async appendFile(file) {
            let { name, time, mimeType, negocio_id, 
            //@ts-ignore
            id_negocio, 
            //@ts-ignore    
            folder, 
            //@ts-ignore   
            subfolder, url, checksum, 
            //@ts-ignore
            contentType, } = file;
            if (name === '.directory_mark')
                return;
            console.log({ file });
            let creationDate;
            mimeType = mimeType || contentType || 'inode/directory';
            if (time && /^\d{10}$/.test(String(time))) {
                creationDate = new Date(time * 1000);
            }
            else {
                creationDate = new Date();
            }
            file.created_at = creationDate.toISOString();
            file.date = creationDate.toLocaleString('en-GB');
            file.new_name = file.name;
            url = url || `/lfm/media/${id_negocio || negocio_id}/${folder}/${subfolder}/${name}`.replace('//', '/');
            let newFile = {
                ...file,
                checksum: checksum || btoa(name + time),
                url: decodeURIComponent(url),
                id: this.files.length,
                original_name: name,
                new_name: name,
                time,
                mimeType,
                ready: true,
                icon: null,
                selected: false,
                is_image: (mimeType || '').includes('image'),
                is_video: (mimeType || '').includes('video'),
                slug_name: ''
            };
            newFile.slug_name = newFile.url.replace(this.real_path, this.working_dir);
            if (newFile.is_image) {
                newFile.thumb_url = url;
            }
            newFile.icon = getIcon(newFile);
            setTimeout(() => {
                newFile.removing = false;
            });
            this.refreshGallery();
            return this.files.push(newFile);
        },
        refreshGallery() {
            if (this.gallery) {
                this.gallery.props.sources = this.galleryFiles.map(f => f.url);
                //@ts-ignore
                refreshFsLightbox();
            }
        },
        get gallery() {
            return globalThis.fsLightboxInstances?.gallery;
        },
    };
}
//# sourceMappingURL=createFolderStore.js.map