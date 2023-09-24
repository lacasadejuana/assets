/**
 * @fileoverview
 * Contains base classes for different UI elements used in the scanner.
 *
 * @author mebjas <minhazav@gmail.com>
 *
 * The word "QR Code" is registered trademark of DENSO WAVE INCORPORATED
 * http://www.denso-wave.com/qrcode/faqpatent-e.html
 */
/**
 * Id and classes of UI elements, for developers to configure the theme of
 * end to end scanner using css.
 */
export class PublicUiElementIdAndClasses {
}
//#region Public list of element IDs for major UI elements.
/** Class name added to all major UI elements used in scanner. */
PublicUiElementIdAndClasses.ALL_ELEMENT_CLASS = "html5-qrcode-element";
/** Id of the camera permission button. */
PublicUiElementIdAndClasses.CAMERA_PERMISSION_BUTTON_ID = "html5-qrcode-button-camera-permission";
/** Id of the camera start button. */
PublicUiElementIdAndClasses.CAMERA_START_BUTTON_ID = "html5-qrcode-button-camera-start";
/** Id of the camera stop button. */
PublicUiElementIdAndClasses.CAMERA_STOP_BUTTON_ID = "html5-qrcode-button-camera-stop";
/** Id of the torch button. */
PublicUiElementIdAndClasses.TORCH_BUTTON_ID = "html5-qrcode-button-torch";
/** Id of the select element used for camera selection. */
PublicUiElementIdAndClasses.CAMERA_SELECTION_SELECT_ID = "html5-qrcode-select-camera";
/** Id of the button used for file selection. */
PublicUiElementIdAndClasses.FILE_SELECTION_BUTTON_ID = "html5-qrcode-button-file-selection";
/** Id of the range input for zoom. */
PublicUiElementIdAndClasses.ZOOM_SLIDER_ID = "html5-qrcode-input-range-zoom";
/**
 * Id of the anchor {@code <a>} element used for swapping between file scan
 * and camera scan.
 */
PublicUiElementIdAndClasses.SCAN_TYPE_CHANGE_ANCHOR_ID = "html5-qrcode-anchor-scan-type-change";
//#endregion
//#region List of classes for specific use-cases.
/** Torch button class when torch is ON. */
PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_ON = "html5-qrcode-button-torch-on";
/** Torch button class when torch is OFF. */
PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_OFF = "html5-qrcode-button-torch-off";
/**
 * Factory class for creating different base UI elements used by the scanner.
 */
export class BaseUiElementFactory {
    /**
     * Creates {@link HTMLElement} of given {@param elementType}.
     *
     * @param elementType Type of element to create, example
     */
    static createElement(elementType, elementId) {
        let element = (document.createElement(elementType));
        element.id = elementId;
        element.classList.add(PublicUiElementIdAndClasses.ALL_ELEMENT_CLASS);
        if (elementType === "button") {
            element.setAttribute("type", "button");
        }
        return element;
    }
}
//# sourceMappingURL=base.js.map