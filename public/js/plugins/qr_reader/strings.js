/**
 * @fileoverview
 * Strings used by {@class Html5Qrcode} & {@class Html5QrcodeScanner}
 *
 * @author mebjas <minhazav@gmail.com>
 *
 * The word "QR Code" is registered trademark of DENSO WAVE INCORPORATED
 * http://www.denso-wave.com/qrcode/faqpatent-e.html
 */
/**
 * Strings used in {@class Html5Qrcode}.
 *
 * TODO(mebjas): Support internalization.
 */
export class Html5QrcodeStrings {
    static codeParseError(exception) {
        return `QR code parse error, error = ${exception}`;
    }
    static errorGettingUserMedia(error) {
        return `Error getting userMedia, error = ${error}`;
    }
    static onlyDeviceSupportedError() {
        return "The device doesn't support navigator.mediaDevices , only "
            + "supported cameraIdOrConfig in this case is deviceId parameter "
            + "(string).";
    }
    static cameraStreamingNotSupported() {
        return "Camera streaming not supported by the browser.";
    }
    static unableToQuerySupportedDevices() {
        return "Unable to query supported devices, unknown error.";
    }
    static insecureContextCameraQueryError() {
        return "Camera access is only supported in secure context like https "
            + "or localhost.";
    }
    static scannerPaused() {
        return "Scanner paused";
    }
}
/**
 * Strings used in {@class Html5QrcodeScanner}.
 *
 * TODO(mebjas): Support internalization.
 */
export class Html5QrcodeScannerStrings {
    static scanningStatus() {
        return "Escaneando...";
    }
    static idleStatus() {
        return "Esperando...";
    }
    static errorStatus() {
        return "Error";
    }
    static permissionStatus() {
        return "Permiso";
    }
    static noCameraFoundErrorStatus() {
        return "No se encontraron cámarar";
    }
    static lastMatch(decodedText) {
        return `Última lectura: ${decodedText}`;
    }
    static codeScannerTitle() {
        return "Scanner de Código QR";
    }
    static cameraPermissionTitle() {
        return "Escanear con tu cámara";
    }
    static cameraPermissionRequesting() {
        return "Solicitando permiso...";
    }
    static noCameraFound() {
        return "No se encontraron cámarar";
    }
    static scanButtonStopScanningText() {
        return "Detener escaneo";
    }
    static scanButtonStartScanningText() {
        return "Iniciar escaneo";
    }
    static torchOnButton() {
        return "Encender el flash";
    }
    static torchOffButton() {
        return "Apagar el flash";
    }
    static torchOnFailedMessage() {
        return "No se pudo activar el flash";
    }
    static torchOffFailedMessage() {
        return "No se pudo desactivar el flash";
    }
    static scanButtonScanningStarting() {
        return "Activando la cámara...";
    }
    /**
     * Text to show when camera scan is selected.
     *
     * This will be used to switch to file based scanning.
     */
    static textIfCameraScanSelected() {
        return "Escanear desde la galería";
    }
    /**
     * Text to show when file based scan is selected.
     *
     * This will be used to switch to camera based scanning.
     */
    static textIfFileScanSelected() {
        return "Escanear con la cámara";
    }
    static selectCamera() {
        return "Seleccione una cámara";
    }
    static fileSelectionChooseImage() {
        return "Seleccione una imagen";
    }
    static fileSelectionChooseAnother() {
        return "Seleccionar otra imagen";
    }
    static fileSelectionNoImageSelected() {
        return "No se ha seleccionado imagen";
    }
    /** Prefix to be given to anonymous cameras. */
    static anonymousCameraPrefix() {
        return "Anonymous Camera";
    }
    static dragAndDropMessage() {
        return "O arrastre una imagen al recuadro";
    }
    static dragAndDropMessageOnlyImages() {
        return "Sólo se permiten imágenes";
    }
    /** Value for zoom. */
    static zoom() {
        return "zoom";
    }
    static loadingImage() {
        return "Cargando imagen...";
    }
    static cameraScanAltText() {
        return "Escaneo con cámara";
    }
    static fileScanAltText() {
        return "Escaneo con archivo";
    }
}
/** Strings used in {@class LibraryInfoDiv} */
export class LibraryInfoStrings {
    static poweredBy() {
        return "Powered by ";
    }
    static reportIssues() {
        return "Reportar bugs";
    }
}
//# sourceMappingURL=strings.js.map