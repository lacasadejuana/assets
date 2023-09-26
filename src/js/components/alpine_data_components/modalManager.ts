export const modalManager = (options: { global: boolean }) => {
    return {
        closing: false,

        closeModal() {

            this.closing = true;
            this.showModal = false;
            this.playing = false;
            this.video_src = null;
            this.iframe_src = null;
            this.title = null;
            console.log('closeModal', {
                showModal: this.showModal,
                isShown: this.isShown,
                video_src: this.video_src
            })

        },
        title: null,
        windowWidth: (window.innerWidth - 80),
        get isShown() {
            return !this.closing && this.showModal == true
        },
        openFaqModal(options) {
            let { iframe_src, video_src, load_partial, title } = options;
            console.log('openFaqModal', options)
            if (load_partial) {
                video_src = null;
                iframe_src = null
            }
            if (video_src) {
                iframe_src = null;
                load_partial = null
            }
            if (!video_src && !iframe_src && !load_partial) {
                console.error('openFaqModal: no video_src or load_partial or iframe_src provided');
                return;
            }
            this.title = title;
            this.video_src = video_src;
            this.load_partial = load_partial
            this.iframe_src = iframe_src;
            this.closing = false;
            this.showModal = true;
            console.log('closeModal', {
                showModal: this.showModal,
                isShown: this.isShown,
                video_src: this.video_src,
                iframe_src: this.iframe_src
            })
        },
        load_partial: null,
        iframe_src: null,
        showModal: false,
        video_src: null,
        init() {
            if (options.global) {
                globalThis.modalManager = this;
            }
        },
        playing: false

    }
}