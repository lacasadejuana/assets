export const avatarUploader = (src = '') => ({
    imageUrl: src,
    fileLoaded: false,
    originalUrl: src,
    fileChosen(event) {
        this.fileToDataUrl(event, src => this.imageUrl = src);
        this.fileLoaded = true;
    },
    revert() {
        this.imageUrl = this.originalUrl;
        this.fileLoaded = false;
        this.$refs.file_input.value = null;
    },
    fileToDataUrl(event, callback) {
        if (!event.target.files.length)
            return;
        let file = event.target.files[0], reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => callback(e.target.result);
    },
});
export default avatarUploader;
//# sourceMappingURL=avatarUploader.js.map