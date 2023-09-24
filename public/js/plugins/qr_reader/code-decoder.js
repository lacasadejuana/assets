/**
 * @fileoverview
 * Shim layer for providing the decoding library.
 *
 * @author mebjas <minhazav@gmail.com>
 *
 * The word "QR Code" is registered trademark of DENSO WAVE INCORPORATED
 * http://www.denso-wave.com/qrcode/faqpatent-e.html
 */
import { ZXingHtml5QrcodeDecoder } from "./zxing-html5-qrcode-decoder";
import { BarcodeDetectorDelegate } from "./native-bar-code-detector";
/**
 * Shim layer for {@interface QrcodeDecoder}.
 *
 * Currently uses {@class ZXingHtml5QrcodeDecoder}, can be replace with another library.
 */
export class Html5QrcodeShim {
    constructor(requestedFormats, useBarCodeDetectorIfSupported, verbose, logger) {
        this.EXECUTIONS_TO_REPORT_PERFORMANCE = 100;
        this.executions = 0;
        this.executionResults = [];
        this.wasPrimaryDecoderUsedInLastDecode = false;
        this.verbose = verbose;
        // Use BarcodeDetector library if enabled by config and is supported.
        if (useBarCodeDetectorIfSupported
            && BarcodeDetectorDelegate.isSupported()) {
            this.primaryDecoder = new BarcodeDetectorDelegate(requestedFormats, verbose, logger);
            // If 'BarcodeDetector' is supported, the library will alternate
            // between 'BarcodeDetector' and 'zxing-js' to compensate for
            // quality gaps between the two.
            this.secondaryDecoder = new ZXingHtml5QrcodeDecoder(requestedFormats, verbose, logger);
        }
        else {
            this.primaryDecoder = new ZXingHtml5QrcodeDecoder(requestedFormats, verbose, logger);
        }
    }
    async decodeAsync(canvas) {
        let startTime = performance.now();
        try {
            return await this.getDecoder().decodeAsync(canvas);
        }
        finally {
            this.possiblyLogPerformance(startTime);
        }
    }
    async decodeRobustlyAsync(canvas) {
        let startTime = performance.now();
        try {
            return await this.primaryDecoder.decodeAsync(canvas);
        }
        catch (error) {
            if (this.secondaryDecoder) {
                // Try fallback.
                return this.secondaryDecoder.decodeAsync(canvas);
            }
            throw error;
        }
        finally {
            this.possiblyLogPerformance(startTime);
        }
    }
    getDecoder() {
        if (!this.secondaryDecoder) {
            return this.primaryDecoder;
        }
        if (this.wasPrimaryDecoderUsedInLastDecode === false) {
            this.wasPrimaryDecoderUsedInLastDecode = true;
            return this.primaryDecoder;
        }
        this.wasPrimaryDecoderUsedInLastDecode = false;
        return this.secondaryDecoder;
    }
    possiblyLogPerformance(startTime) {
        if (!this.verbose) {
            return;
        }
        let executionTime = performance.now() - startTime;
        this.executionResults.push(executionTime);
        this.executions++;
        this.possiblyFlushPerformanceReport();
    }
    // Dumps mean decoding latency to console for last
    // EXECUTIONS_TO_REPORT_PERFORMANCE runs.
    // TODO(mebjas): Can we automate instrumentation runs?
    possiblyFlushPerformanceReport() {
        if (this.executions < this.EXECUTIONS_TO_REPORT_PERFORMANCE) {
            return;
        }
        let sum = 0;
        for (let executionTime of this.executionResults) {
            sum += executionTime;
        }
        let mean = sum / this.executionResults.length;
        // eslint-disable-next-line no-console
        console.log(`${mean} ms for ${this.executionResults.length} last runs.`);
        this.executions = 0;
        this.executionResults = [];
    }
}
//# sourceMappingURL=code-decoder.js.map