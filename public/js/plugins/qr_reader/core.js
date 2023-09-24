/**
 * @fileoverview
 * Core libraries, interfaces, enums shared across {@class Html5Qrcode} & {@class Html5QrcodeScanner}
 *
 * @author mebjas <minhazav@gmail.com>
 *
 * The word "QR Code" is registered trademark of DENSO WAVE INCORPORATED
 * http://www.denso-wave.com/qrcode/faqpatent-e.html
 */
/**
 * Code formats supported by this library.
 */
export var Html5QrcodeSupportedFormats;
(function (Html5QrcodeSupportedFormats) {
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["QR_CODE"] = 0] = "QR_CODE";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["AZTEC"] = 1] = "AZTEC";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["CODABAR"] = 2] = "CODABAR";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["CODE_39"] = 3] = "CODE_39";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["CODE_93"] = 4] = "CODE_93";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["CODE_128"] = 5] = "CODE_128";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["DATA_MATRIX"] = 6] = "DATA_MATRIX";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["MAXICODE"] = 7] = "MAXICODE";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["ITF"] = 8] = "ITF";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["EAN_13"] = 9] = "EAN_13";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["EAN_8"] = 10] = "EAN_8";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["PDF_417"] = 11] = "PDF_417";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["RSS_14"] = 12] = "RSS_14";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["RSS_EXPANDED"] = 13] = "RSS_EXPANDED";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["UPC_A"] = 14] = "UPC_A";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["UPC_E"] = 15] = "UPC_E";
    Html5QrcodeSupportedFormats[Html5QrcodeSupportedFormats["UPC_EAN_EXTENSION"] = 16] = "UPC_EAN_EXTENSION";
})(Html5QrcodeSupportedFormats || (Html5QrcodeSupportedFormats = {}));
/** {@code Html5QrcodeSupportedFormats} to friendly name map. */
const html5QrcodeSupportedFormatsTextMap = new Map([
    [Html5QrcodeSupportedFormats.QR_CODE, "QR_CODE"],
    [Html5QrcodeSupportedFormats.AZTEC, "AZTEC"],
    [Html5QrcodeSupportedFormats.CODABAR, "CODABAR"],
    [Html5QrcodeSupportedFormats.CODE_39, "CODE_39"],
    [Html5QrcodeSupportedFormats.CODE_93, "CODE_93"],
    [Html5QrcodeSupportedFormats.CODE_128, "CODE_128"],
    [Html5QrcodeSupportedFormats.DATA_MATRIX, "DATA_MATRIX"],
    [Html5QrcodeSupportedFormats.MAXICODE, "MAXICODE"],
    [Html5QrcodeSupportedFormats.ITF, "ITF"],
    [Html5QrcodeSupportedFormats.EAN_13, "EAN_13"],
    [Html5QrcodeSupportedFormats.EAN_8, "EAN_8"],
    [Html5QrcodeSupportedFormats.PDF_417, "PDF_417"],
    [Html5QrcodeSupportedFormats.RSS_14, "RSS_14"],
    [Html5QrcodeSupportedFormats.RSS_EXPANDED, "RSS_EXPANDED"],
    [Html5QrcodeSupportedFormats.UPC_A, "UPC_A"],
    [Html5QrcodeSupportedFormats.UPC_E, "UPC_E"],
    [Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION, "UPC_EAN_EXTENSION"]
]);
/**
 * Indicates the type of decoded text.
 *
 * Note: this is very experimental in nature at the moment.
 */
export var DecodedTextType;
(function (DecodedTextType) {
    DecodedTextType[DecodedTextType["UNKNOWN"] = 0] = "UNKNOWN";
    DecodedTextType[DecodedTextType["URL"] = 1] = "URL";
})(DecodedTextType || (DecodedTextType = {}));
/** Returns true if the passed object instance is a valid format. */
export function isValidHtml5QrcodeSupportedFormats(format) {
    return Object.values(Html5QrcodeSupportedFormats).includes(format);
}
/**
 * Types of scans supported by the library
 */
export var Html5QrcodeScanType;
(function (Html5QrcodeScanType) {
    Html5QrcodeScanType[Html5QrcodeScanType["SCAN_TYPE_CAMERA"] = 0] = "SCAN_TYPE_CAMERA";
    Html5QrcodeScanType[Html5QrcodeScanType["SCAN_TYPE_FILE"] = 1] = "SCAN_TYPE_FILE"; // File based scanner.
})(Html5QrcodeScanType || (Html5QrcodeScanType = {}));
/**
 * Constants used in QR code library.
 */
export class Html5QrcodeConstants {
}
Html5QrcodeConstants.GITHUB_PROJECT_URL = "https://github.com/mebjas/html5-qrcode";
Html5QrcodeConstants.SCAN_DEFAULT_FPS = 2;
Html5QrcodeConstants.DEFAULT_DISABLE_FLIP = false;
Html5QrcodeConstants.DEFAULT_REMEMBER_LAST_CAMERA_USED = true;
Html5QrcodeConstants.DEFAULT_SUPPORTED_SCAN_TYPE = [
    Html5QrcodeScanType.SCAN_TYPE_CAMERA,
    Html5QrcodeScanType.SCAN_TYPE_FILE
];
/** Format of detected code. */
export class QrcodeResultFormat {
    constructor(format, formatName) {
        this.format = format;
        this.formatName = formatName;
    }
    toString() {
        return this.formatName;
    }
    static create(format) {
        if (!html5QrcodeSupportedFormatsTextMap.has(format)) {
            throw `${format} not in html5QrcodeSupportedFormatsTextMap`;
        }
        return new QrcodeResultFormat(format, html5QrcodeSupportedFormatsTextMap.get(format));
    }
}
/**
 * Static factory for creating {@interface Html5QrcodeResult} instance.
 */
export class Html5QrcodeResultFactory {
    static createFromText(decodedText) {
        let qrcodeResult = {
            text: decodedText
        };
        return {
            decodedText: decodedText,
            result: qrcodeResult
        };
    }
    static createFromQrcodeResult(qrcodeResult) {
        return {
            decodedText: qrcodeResult.text,
            result: qrcodeResult
        };
    }
}
/**
 * Different kind of errors that can lead to scanning error.
 */
export var Html5QrcodeErrorTypes;
(function (Html5QrcodeErrorTypes) {
    Html5QrcodeErrorTypes[Html5QrcodeErrorTypes["UNKWOWN_ERROR"] = 0] = "UNKWOWN_ERROR";
    Html5QrcodeErrorTypes[Html5QrcodeErrorTypes["IMPLEMENTATION_ERROR"] = 1] = "IMPLEMENTATION_ERROR";
    Html5QrcodeErrorTypes[Html5QrcodeErrorTypes["NO_CODE_FOUND_ERROR"] = 2] = "NO_CODE_FOUND_ERROR";
})(Html5QrcodeErrorTypes || (Html5QrcodeErrorTypes = {}));
/**
 * Static factory for creating {@interface Html5QrcodeError} instance.
 */
export class Html5QrcodeErrorFactory {
    static createFrom(error) {
        return {
            errorMessage: error,
            type: Html5QrcodeErrorTypes.UNKWOWN_ERROR
        };
    }
}
/**
 * Base logger implementation based on browser console.
 *
 * This can be replaced by a custom implementation of logger.
 *
 */
export class BaseLoggger {
    constructor(verbose) {
        this.verbose = verbose;
    }
    log(message) {
        if (this.verbose) {
            // eslint-disable-next-line no-console
            console.log(message);
        }
    }
    warn(message) {
        if (this.verbose) {
            // eslint-disable-next-line no-console
            console.warn(message);
        }
    }
    logError(message, isExperimental) {
        if (this.verbose || isExperimental === true) {
            // eslint-disable-next-line no-console
            console.error(message);
        }
    }
    logErrors(errors) {
        if (errors.length === 0) {
            throw "Logger#logError called without arguments";
        }
        if (this.verbose) {
            // eslint-disable-next-line no-console
            console.error(errors);
        }
    }
}
//#region global functions
/** Returns true if the {@param obj} is null or undefined. */
export function isNullOrUndefined(obj) {
    return (typeof obj === "undefined") || obj === null;
}
/** Clips the {@code value} between {@code minValue} and {@code maxValue}. */
export function clip(value, minValue, maxValue) {
    if (value > maxValue) {
        return maxValue;
    }
    if (value < minValue) {
        return minValue;
    }
    return value;
}
//#endregion
//# sourceMappingURL=core.js.map