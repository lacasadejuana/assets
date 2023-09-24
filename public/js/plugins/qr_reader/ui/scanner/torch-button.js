/**
 * @fileoverview
 * File for torch related UI components and handling.
 *
 * @author mebjas <minhazav@gmail.com>
 *
 * The word "QR Code" is registered trademark of DENSO WAVE INCORPORATED
 * http://www.denso-wave.com/qrcode/faqpatent-e.html
 */
import { Html5QrcodeScannerStrings } from "../../strings";
import { BaseUiElementFactory, PublicUiElementIdAndClasses } from "./base";
/** Controller class for handling torch / flash. */
class TorchController {
    constructor(torchCapability, buttonController, onTorchActionFailureCallback) {
        // Mutable states.
        this.isTorchOn = false;
        this.torchCapability = torchCapability;
        this.buttonController = buttonController;
        this.onTorchActionFailureCallback = onTorchActionFailureCallback;
    }
    /** Returns {@code true} if torch is enabled. */
    isTorchEnabled() {
        return this.isTorchOn;
    }
    /**
     * Flips the state of the torch.
     *
     * <p> Turns torch On if current state is Off and vice-versa.
     * <p> Modifies the UI state accordingly.
     *
     * @returns Promise that finishes when the async action is done.
     */
    async flipState() {
        this.buttonController.disable();
        let isTorchOnExpected = !this.isTorchOn;
        try {
            await this.torchCapability.apply(isTorchOnExpected);
            this.updateUiBasedOnLatestSettings(this.torchCapability.value(), isTorchOnExpected);
        }
        catch (error) {
            this.propagateFailure(isTorchOnExpected, error);
            this.buttonController.enable();
        }
    }
    updateUiBasedOnLatestSettings(isTorchOn, isTorchOnExpected) {
        if (isTorchOn === isTorchOnExpected) {
            // Action succeeded, flip the state.
            this.buttonController.setText(isTorchOnExpected
                ? Html5QrcodeScannerStrings.torchOffButton()
                : Html5QrcodeScannerStrings.torchOnButton());
            this.isTorchOn = isTorchOnExpected;
        }
        else {
            // Torch didn't get set as expected.
            // Show warning.
            this.propagateFailure(isTorchOnExpected);
        }
        this.buttonController.enable();
    }
    propagateFailure(isTorchOnExpected, error) {
        let errorMessage = isTorchOnExpected
            ? Html5QrcodeScannerStrings.torchOnFailedMessage()
            : Html5QrcodeScannerStrings.torchOffFailedMessage();
        if (error) {
            errorMessage += "; Error = " + error;
        }
        this.onTorchActionFailureCallback(errorMessage);
    }
    /**
     * Resets the state.
     *
     * <p>Note: Doesn't turn off the torch implicitly.
     */
    reset() {
        this.isTorchOn = false;
    }
}
/** Helper class for creating Torch UI component. */
export class TorchButton {
    constructor(torchCapability, onTorchActionFailureCallback) {
        this.onTorchActionFailureCallback = onTorchActionFailureCallback;
        this.torchButton
            = BaseUiElementFactory.createElement("button", PublicUiElementIdAndClasses.TORCH_BUTTON_ID);
        this.torchController = new TorchController(torchCapability, 
        /* buttonController= */ this, onTorchActionFailureCallback);
    }
    render(parentElement, torchButtonOptions) {
        this.torchButton.innerText
            = Html5QrcodeScannerStrings.torchOnButton();
        this.torchButton.style.display = torchButtonOptions.display;
        this.torchButton.style.marginLeft = torchButtonOptions.marginLeft;
        let $this = this;
        this.torchButton.addEventListener("click", async (_) => {
            await $this.torchController.flipState();
            if ($this.torchController.isTorchEnabled()) {
                $this.torchButton.classList.remove(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_OFF);
                $this.torchButton.classList.add(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_ON);
            }
            else {
                $this.torchButton.classList.remove(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_ON);
                $this.torchButton.classList.add(PublicUiElementIdAndClasses.TORCH_BUTTON_CLASS_TORCH_OFF);
            }
        });
        parentElement.appendChild(this.torchButton);
    }
    updateTorchCapability(torchCapability) {
        this.torchController = new TorchController(torchCapability, 
        /* buttonController= */ this, this.onTorchActionFailureCallback);
    }
    /** Returns the torch button. */
    getTorchButton() {
        return this.torchButton;
    }
    hide() {
        this.torchButton.style.display = "none";
    }
    show() {
        this.torchButton.style.display = "inline-block";
    }
    disable() {
        this.torchButton.disabled = true;
    }
    enable() {
        this.torchButton.disabled = false;
    }
    setText(text) {
        this.torchButton.innerText = text;
    }
    /**
     * Resets the state.
     *
     * <p>Note: Doesn't turn off the torch implicitly.
     */
    reset() {
        this.torchButton.innerText = Html5QrcodeScannerStrings.torchOnButton();
        this.torchController.reset();
    }
    /**
     * Factory method for creating torch button.
     *
     * @param parentElement parent HTML element to render torch button into
     * @param torchCapability torch capability of the camera
     * @param torchButtonOptions options for creating torch
     * @param onTorchActionFailureCallback callback to be called in case of
     *  torch action failure.
     */
    static create(parentElement, torchCapability, torchButtonOptions, onTorchActionFailureCallback) {
        let button = new TorchButton(torchCapability, onTorchActionFailureCallback);
        button.render(parentElement, torchButtonOptions);
        return button;
    }
}
//# sourceMappingURL=torch-button.js.map