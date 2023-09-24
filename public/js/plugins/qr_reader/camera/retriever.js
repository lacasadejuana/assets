/**
 * @fileoverview
 * Libraries associated with retrieving cameras.
 *
 * @author mebjas <minhazav@gmail.com>
 */
import { Html5QrcodeStrings } from "../strings";
/** Class for retrieving cameras on the device. */
export class CameraRetriever {
    /** Returns list of {@link CameraDevice} supported by the device. */
    static retrieve() {
        if (navigator.mediaDevices) {
            return CameraRetriever.getCamerasFromMediaDevices();
        }
        // Using deprecated api to support really old browsers.
        var mst = MediaStreamTrack;
        if (MediaStreamTrack && mst.getSources) {
            return CameraRetriever.getCamerasFromMediaStreamTrack();
        }
        return CameraRetriever.rejectWithError();
    }
    static rejectWithError() {
        // This can potentially happen if the page is loaded without SSL.
        let errorMessage = Html5QrcodeStrings.unableToQuerySupportedDevices();
        if (!CameraRetriever.isHttpsOrLocalhost()) {
            errorMessage = Html5QrcodeStrings.insecureContextCameraQueryError();
        }
        return Promise.reject(errorMessage);
    }
    static isHttpsOrLocalhost() {
        if (location.protocol === "https:") {
            return true;
        }
        const host = location.host.split(":")[0];
        return host === "127.0.0.1" || host === "localhost";
    }
    static async getCamerasFromMediaDevices() {
        // Hacky approach to close any active stream if they are  active.
        const closeActiveStreams = (stream) => {
            const tracks = stream.getVideoTracks();
            for (const track of tracks) {
                track.enabled = false;
                track.stop();
                stream.removeTrack(track);
            }
        };
        // This should trigger the permission flow if required.
        let mediaStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
        let devices = await navigator.mediaDevices.enumerateDevices();
        let results = [];
        for (const device of devices) {
            if (device.kind === "videoinput") {
                results.push({
                    id: device.deviceId,
                    label: device.label
                });
            }
        }
        closeActiveStreams(mediaStream);
        return results;
    }
    static getCamerasFromMediaStreamTrack() {
        return new Promise((resolve, _) => {
            const callback = (sourceInfos) => {
                const results = [];
                for (const sourceInfo of sourceInfos) {
                    if (sourceInfo.kind === "video") {
                        results.push({
                            id: sourceInfo.id,
                            label: sourceInfo.label
                        });
                    }
                }
                resolve(results);
            };
            var mst = MediaStreamTrack;
            mst.getSources(callback);
        });
    }
}
//# sourceMappingURL=retriever.js.map