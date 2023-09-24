export function getIcon(file) {
    if (!file)
        return file?.icon;
    if (!file.is_file)
        return 'fas fa-folder';
    if (file.mimeType === 'application/vnd.google-apps.document')
        return 'fiv-viv fiv-icon-word text-primary';
    if (file.mimeType === 'application/vnd.google-apps.spreadsheet')
        return 'fiv-viv fiv-icon-xlsx text-success';
    if (file.mimeType === 'application/vnd.google-apps.folder')
        return 'fas fa-folder';
    //@ts-ignore
    let extension = (file.name || file.fileName).split('.').pop();
    if (!extension || extension.length > 4) {
        if (!file.mimeType)
            return 'fas fa-file';
        extension = file.mimeType?.split('/').pop();
    }
    if (extension === 'octet-stream')
        return 'fiv-viv fiv-icon-browser';
    return ('fiv-viv fiv-icon-' +
        (extension || '').toLowerCase().replace('jpeg', 'jpg'));
}
//# sourceMappingURL=getIcon.js.map