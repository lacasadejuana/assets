/**
 * @fileoverview
 * Core camera library implementations.
 *
 * @author mebjas <minhazav@gmail.com>
 */
/** Abstract camera capability class. */
class AbstractCameraCapability {
    constructor(name, track) {
        this.name = name;
        this.track = track;
    }
    isSupported() {
        // TODO(minhazav): Figure out fallback for getCapabilities()
        // in firefox.
        // https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Constraints
        if (!this.track.getCapabilities) {
            return false;
        }
        return this.name in this.track.getCapabilities();
    }
    apply(value) {
        let constraint = {};
        constraint[this.name] = value;
        let constraints = { advanced: [constraint] };
        return this.track.applyConstraints(constraints);
    }
    value() {
        let settings = this.track.getSettings();
        if (this.name in settings) {
            let settingValue = settings[this.name];
            return settingValue;
        }
        return null;
    }
}
class AbstractRangeCameraCapability extends AbstractCameraCapability {
    constructor(name, track) {
        super(name, track);
    }
    min() {
        return this.getCapabilities().min;
    }
    max() {
        return this.getCapabilities().max;
    }
    step() {
        return this.getCapabilities().step;
    }
    apply(value) {
        let constraint = {};
        constraint[this.name] = value;
        let constraints = { advanced: [constraint] };
        return this.track.applyConstraints(constraints);
    }
    getCapabilities() {
        this.failIfNotSupported();
        let capabilities = this.track.getCapabilities();
        let capability = capabilities[this.name];
        return {
            min: capability.min,
            max: capability.max,
            step: capability.step,
        };
    }
    failIfNotSupported() {
        if (!this.isSupported()) {
            throw new Error(`${this.name} capability not supported`);
        }
    }
}
/** Zoom feature. */
class ZoomFeatureImpl extends AbstractRangeCameraCapability {
    constructor(track) {
        super("zoom", track);
    }
}
/** Torch feature. */
class TorchFeatureImpl extends AbstractCameraCapability {
    constructor(track) {
        super("torch", track);
    }
}
/** Implementation of {@link CameraCapabilities}. */
class CameraCapabilitiesImpl {
    constructor(track) {
        this.track = track;
    }
    zoomFeature() {
        return new ZoomFeatureImpl(this.track);
    }
    torchFeature() {
        return new TorchFeatureImpl(this.track);
    }
}
/** Implementation of {@link RenderedCamera}. */
class RenderedCameraImpl {
    constructor(parentElement, mediaStream, callbacks) {
        this.isClosed = false;
        this.parentElement = parentElement;
        this.mediaStream = mediaStream;
        this.callbacks = callbacks;
        this.surface = this.createVideoElement(this.parentElement.clientWidth);
        // Setup
        parentElement.append(this.surface);
    }
    createVideoElement(width) {
        const videoElement = document.createElement("video");
        videoElement.style.width = `${width}px`;
        videoElement.style.display = "block";
        videoElement.muted = true;
        videoElement.setAttribute("muted", "true");
        videoElement.playsInline = true;
        return videoElement;
    }
    setupSurface() {
        this.surface.onabort = () => {
            throw "RenderedCameraImpl video surface onabort() called";
        };
        this.surface.onerror = () => {
            throw "RenderedCameraImpl video surface onerror() called";
        };
        let onVideoStart = () => {
            const videoWidth = this.surface.clientWidth;
            const videoHeight = this.surface.clientHeight;
            this.callbacks.onRenderSurfaceReady(videoWidth, videoHeight);
            this.surface.removeEventListener("playing", onVideoStart);
        };
        this.surface.addEventListener("playing", onVideoStart);
        this.surface.srcObject = this.mediaStream;
        this.surface.play();
    }
    static async create(parentElement, mediaStream, options, callbacks) {
        let renderedCamera = new RenderedCameraImpl(parentElement, mediaStream, callbacks);
        if (options.aspectRatio) {
            let aspectRatioConstraint = {
                aspectRatio: options.aspectRatio
            };
            await renderedCamera.getFirstTrackOrFail().applyConstraints(aspectRatioConstraint);
        }
        renderedCamera.setupSurface();
        return renderedCamera;
    }
    failIfClosed() {
        if (this.isClosed) {
            throw "The RenderedCamera has already been closed.";
        }
    }
    getFirstTrackOrFail() {
        this.failIfClosed();
        if (this.mediaStream.getVideoTracks().length === 0) {
            throw "No video tracks found";
        }
        return this.mediaStream.getVideoTracks()[0];
    }
    //#region Public APIs.
    pause() {
        this.failIfClosed();
        this.surface.pause();
    }
    resume(onResumeCallback) {
        this.failIfClosed();
        let $this = this;
        const onVideoResume = () => {
            // Transition after 200ms to avoid the previous canvas frame being
            // re-scanned.
            setTimeout(onResumeCallback, 200);
            $this.surface.removeEventListener("playing", onVideoResume);
        };
        this.surface.addEventListener("playing", onVideoResume);
        this.surface.play();
    }
    isPaused() {
        this.failIfClosed();
        return this.surface.paused;
    }
    getSurface() {
        this.failIfClosed();
        return this.surface;
    }
    getRunningTrackCapabilities() {
        return this.getFirstTrackOrFail().getCapabilities();
    }
    getRunningTrackSettings() {
        return this.getFirstTrackOrFail().getSettings();
    }
    async applyVideoConstraints(constraints) {
        if ("aspectRatio" in constraints) {
            throw "Changing 'aspectRatio' in run-time is not yet supported.";
        }
        return this.getFirstTrackOrFail().applyConstraints(constraints);
    }
    close() {
        if (this.isClosed) {
            // Already closed.
            return Promise.resolve();
        }
        let $this = this;
        return new Promise((resolve, _) => {
            let tracks = $this.mediaStream.getVideoTracks();
            const tracksToClose = tracks.length;
            var tracksClosed = 0;
            $this.mediaStream.getVideoTracks().forEach((videoTrack) => {
                $this.mediaStream.removeTrack(videoTrack);
                videoTrack.stop();
                ++tracksClosed;
                if (tracksClosed >= tracksToClose) {
                    $this.isClosed = true;
                    $this.parentElement.removeChild($this.surface);
                    resolve();
                }
            });
        });
    }
    getCapabilities() {
        return new CameraCapabilitiesImpl(this.getFirstTrackOrFail());
    }
}
/** Default implementation of {@link Camera} interface. */
export class CameraImpl {
    constructor(mediaStream) {
        this.mediaStream = mediaStream;
    }
    async render(parentElement, options, callbacks) {
        return RenderedCameraImpl.create(parentElement, this.mediaStream, options, callbacks);
    }
    static async create(videoConstraints) {
        if (!navigator.mediaDevices) {
            throw "navigator.mediaDevices not supported";
        }
        let constraints = {
            audio: false,
            video: videoConstraints
        };
        let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        return new CameraImpl(mediaStream);
    }
}
//# sourceMappingURL=core-impl.js.map