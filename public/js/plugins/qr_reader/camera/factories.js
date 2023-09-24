/**
 * @fileoverview
 * Set of factory implementations around Camera.
 *
 * @author mebjas <minhazav@gmail.com>
 */
import { CameraImpl } from "./core-impl";
/** Factory class for creating Camera. */
export class CameraFactory {
    /**
     * Returns {@link CameraFactory} if {@link navigator.mediaDevices} is
     * supported else fails.
     */
    static async failIfNotSupported() {
        if (!navigator.mediaDevices) {
            throw "navigator.mediaDevices not supported";
        }
        return new CameraFactory();
    }
    constructor() { }
    /** Creates camera instance based on constraints. */
    async create(videoConstraints) {
        return CameraImpl.create(videoConstraints);
    }
}
//# sourceMappingURL=factories.js.map