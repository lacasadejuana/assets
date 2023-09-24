/**
 * @module
 * Complete Scanner build on top of {@link Html5Qrcode}.
 * - Decode QR Code using web cam or smartphone camera
 *
 * @author mebjas <minhazav@gmail.com>
 *
 * The word "QR Code" is registered trademark of DENSO WAVE INCORPORATED
 * http://www.denso-wave.com/qrcode/faqpatent-e.html
 */
import { Html5QrcodeConstants, Html5QrcodeScanType, Html5QrcodeErrorFactory, BaseLoggger, isNullOrUndefined, clip, } from "./core";
import { Html5Qrcode, } from "./html5-qrcode";
import { Html5QrcodeScannerStrings, } from "./strings";
import { ASSET_FILE_SCAN, ASSET_CAMERA_SCAN, } from "./image-assets";
import { PersistedDataManager } from "./storage";
import { LibraryInfoContainer } from "./ui";
import { CameraPermissions } from "./camera/permissions";
import { ScanTypeSelector } from "./ui/scanner/scan-type-selector";
import { TorchButton } from "./ui/scanner/torch-button";
import { FileSelectionUi } from "./ui/scanner/file-selection-ui";
import { BaseUiElementFactory, PublicUiElementIdAndClasses } from "./ui/scanner/base";
import { CameraSelectionUi } from "./ui/scanner/camera-selection-ui";
import { CameraZoomUi } from "./ui/scanner/camera-zoom-ui";
/**
 * Different states of QR Code Scanner.
 */
var Html5QrcodeScannerStatus;
(function (Html5QrcodeScannerStatus) {
    Html5QrcodeScannerStatus[Html5QrcodeScannerStatus["STATUS_DEFAULT"] = 0] = "STATUS_DEFAULT";
    Html5QrcodeScannerStatus[Html5QrcodeScannerStatus["STATUS_SUCCESS"] = 1] = "STATUS_SUCCESS";
    Html5QrcodeScannerStatus[Html5QrcodeScannerStatus["STATUS_WARNING"] = 2] = "STATUS_WARNING";
    Html5QrcodeScannerStatus[Html5QrcodeScannerStatus["STATUS_REQUESTING_PERMISSION"] = 3] = "STATUS_REQUESTING_PERMISSION";
})(Html5QrcodeScannerStatus || (Html5QrcodeScannerStatus = {}));
function toHtml5QrcodeCameraScanConfig(config) {
    return {
        fps: config.fps,
        qrbox: config.qrbox,
        aspectRatio: config.aspectRatio,
        disableFlip: config.disableFlip,
        videoConstraints: config.videoConstraints
    };
}
function toHtml5QrcodeFullConfig(config, verbose) {
    return {
        formatsToSupport: config.formatsToSupport,
        useBarCodeDetectorIfSupported: config.useBarCodeDetectorIfSupported,
        experimentalFeatures: config.experimentalFeatures,
        verbose: verbose
    };
}
/**
 * End to end web based QR and Barcode Scanner.
 *
 * Use this class for setting up QR scanner in your web application with
 * few lines of codes.
 *
 * -   Supports camera as well as file based scanning.
 * -   Depending on device supports camera selection, zoom and torch features.
 * -   Supports different kind of 2D and 1D codes {@link Html5QrcodeSupportedFormats}.
 */
export class Html5QrcodeScanner {
    //#endregion
    /**
     * Creates instance of this class.
     *
     * @param elementId Id of the HTML element.
     * @param config Extra configurations to tune the code scanner.
     * @param verbose - If true, all logs would be printed to console.
     */
    constructor(elementId, config, verbose) {
        this.lastMatchFound = null;
        this.cameraScanImage = null;
        this.fileScanImage = null;
        this.fileSelectionUi = null;
        this.elementId = elementId;
        this.config = this.createConfig(config);
        this.verbose = verbose === true;
        if (!document.getElementById(elementId)) {
            throw `HTML Element with id=${elementId} not found`;
        }
        this.scanTypeSelector = new ScanTypeSelector(this.config.supportedScanTypes);
        this.currentScanType = this.scanTypeSelector.getDefaultScanType();
        this.sectionSwapAllowed = true;
        this.logger = new BaseLoggger(this.verbose);
        this.persistedDataManager = new PersistedDataManager();
        if (config.rememberLastUsedCamera !== true) {
            this.persistedDataManager.reset();
        }
    }
    /**
     * Renders the User Interface.
     *
     * @param qrCodeSuccessCallback Callback called when an instance of a QR
     * code or any other supported bar code is found.
     * @param qrCodeErrorCallback optional, callback called in cases where no
     * instance of QR code or any other supported bar code is found.
     */
    render(qrCodeSuccessCallback, qrCodeErrorCallback) {
        this.lastMatchFound = null;
        // Add wrapper to success callback.
        this.qrCodeSuccessCallback
            = (decodedText, result) => {
                if (qrCodeSuccessCallback) {
                    qrCodeSuccessCallback(decodedText, result);
                }
                else {
                    if (this.lastMatchFound === decodedText) {
                        return;
                    }
                    this.lastMatchFound = decodedText;
                    this.setHeaderMessage(Html5QrcodeScannerStrings.lastMatch(decodedText), Html5QrcodeScannerStatus.STATUS_SUCCESS);
                }
            };
        // Add wrapper to failure callback
        this.qrCodeErrorCallback =
            (errorMessage, error) => {
                if (qrCodeErrorCallback) {
                    qrCodeErrorCallback(errorMessage, error);
                }
            };
        const container = document.getElementById(this.elementId);
        if (!container) {
            throw `HTML Element with id=${this.elementId} not found`;
        }
        container.innerHTML = "";
        this.createBasicLayout(container);
        this.html5Qrcode = new Html5Qrcode(this.getScanRegionId(), toHtml5QrcodeFullConfig(this.config, this.verbose));
    }
    //#region State related public APIs
    /**
     * Pauses the ongoing scan.
     *
     * Notes:
     * -   Should only be called if camera scan is ongoing.
     *
     * @param shouldPauseVideo (Optional, default = false) If `true`
     * the video will be paused.
     *
     * @throws error if method is called when scanner is not in scanning state.
     */
    pause(shouldPauseVideo) {
        if (isNullOrUndefined(shouldPauseVideo) || shouldPauseVideo !== true) {
            shouldPauseVideo = false;
        }
        this.getHtml5QrcodeOrFail().pause(shouldPauseVideo);
    }
    /**
     * Resumes the paused scan.
     *
     * If the video was previously paused by setting `shouldPauseVideo`
     * to `true` in {@link Html5QrcodeScanner#pause(shouldPauseVideo)},
     * calling this method will resume the video.
     *
     * Notes:
     * -   Should only be called if camera scan is ongoing.
     * -   With this caller will start getting results in success and error
     * callbacks.
     *
     * @throws error if method is called when scanner is not in paused state.
     */
    resume() {
        this.getHtml5QrcodeOrFail().resume();
    }
    /**
     * Gets state of the camera scan.
     *
     * @returns state of type {@link Html5QrcodeScannerState}.
     */
    getState() {
        return this.getHtml5QrcodeOrFail().getState();
    }
    /**
     * Removes the QR Code scanner UI.
     *
     * @returns Promise which succeeds if the cleanup is complete successfully,
     *  fails otherwise.
     */
    clear() {
        const emptyHtmlContainer = () => {
            const mainContainer = document.getElementById(this.elementId);
            if (mainContainer) {
                mainContainer.innerHTML = "";
                this.resetBasicLayout(mainContainer);
            }
        };
        if (this.html5Qrcode) {
            return new Promise((resolve, reject) => {
                if (!this.html5Qrcode) {
                    resolve();
                    return;
                }
                if (this.html5Qrcode.isScanning) {
                    this.html5Qrcode.stop().then((_) => {
                        if (!this.html5Qrcode) {
                            resolve();
                            return;
                        }
                        this.html5Qrcode.clear();
                        emptyHtmlContainer();
                        resolve();
                    }).catch((error) => {
                        if (this.verbose) {
                            this.logger.logError("Unable to stop qrcode scanner", error);
                        }
                        reject(error);
                    });
                }
                else {
                    // Assuming file based scan was ongoing.
                    this.html5Qrcode.clear();
                    emptyHtmlContainer();
                    resolve();
                }
            });
        }
        return Promise.resolve();
    }
    //#endregion
    //#region Beta APIs to modify running stream state.
    /**
     * Returns the capabilities of the running video track.
     *
     * Read more: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getConstraints
     *
     * Note: Should only be called if {@link Html5QrcodeScanner#getState()}
     *   returns {@link Html5QrcodeScannerState#SCANNING} or
     *   {@link Html5QrcodeScannerState#PAUSED}.
     *
     * @returns the capabilities of a running video track.
     * @throws error if the scanning is not in running state.
     */
    getRunningTrackCapabilities() {
        return this.getHtml5QrcodeOrFail().getRunningTrackCapabilities();
    }
    /**
     * Returns the object containing the current values of each constrainable
     * property of the running video track.
     *
     * Read more: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getSettings
     *
     * Note: Should only be called if {@link Html5QrcodeScanner#getState()}
     *   returns {@link Html5QrcodeScannerState#SCANNING} or
     *   {@link Html5QrcodeScannerState#PAUSED}.
     *
     * @returns the supported settings of the running video track.
     * @throws error if the scanning is not in running state.
     */
    getRunningTrackSettings() {
        return this.getHtml5QrcodeOrFail().getRunningTrackSettings();
    }
    /**
     * Apply a video constraints on running video track from camera.
     *
     * Note: Should only be called if {@link Html5QrcodeScanner#getState()}
     *   returns {@link Html5QrcodeScannerState#SCANNING} or
     *   {@link Html5QrcodeScannerState#PAUSED}.
     *
     * @param {MediaTrackConstraints} specifies a variety of video or camera
     *  controls as defined in
     *  https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints
     * @returns a Promise which succeeds if the passed constraints are applied,
     *  fails otherwise.
     * @throws error if the scanning is not in running state.
     */
    applyVideoConstraints(videoConstaints) {
        return this.getHtml5QrcodeOrFail().applyVideoConstraints(videoConstaints);
    }
    //#endregion
    //#region Private methods
    getHtml5QrcodeOrFail() {
        if (!this.html5Qrcode) {
            throw "Code scanner not initialized.";
        }
        return this.html5Qrcode;
    }
    createConfig(config) {
        if (config) {
            if (!config.fps) {
                config.fps = Html5QrcodeConstants.SCAN_DEFAULT_FPS;
            }
            if (config.rememberLastUsedCamera !== (!Html5QrcodeConstants.DEFAULT_REMEMBER_LAST_CAMERA_USED)) {
                config.rememberLastUsedCamera
                    = Html5QrcodeConstants.DEFAULT_REMEMBER_LAST_CAMERA_USED;
            }
            if (!config.supportedScanTypes) {
                config.supportedScanTypes
                    = Html5QrcodeConstants.DEFAULT_SUPPORTED_SCAN_TYPE;
            }
            return config;
        }
        return {
            fps: Html5QrcodeConstants.SCAN_DEFAULT_FPS,
            rememberLastUsedCamera: Html5QrcodeConstants.DEFAULT_REMEMBER_LAST_CAMERA_USED,
            supportedScanTypes: Html5QrcodeConstants.DEFAULT_SUPPORTED_SCAN_TYPE
        };
    }
    createBasicLayout(parent) {
        parent.style.position = "relative";
        parent.style.padding = "0px";
        parent.style.border = "1px solid silver";
        this.createHeader(parent);
        const qrCodeScanRegion = document.createElement("div");
        const scanRegionId = this.getScanRegionId();
        qrCodeScanRegion.id = scanRegionId;
        qrCodeScanRegion.style.width = "100%";
        qrCodeScanRegion.style.minHeight = "100px";
        qrCodeScanRegion.style.textAlign = "center";
        parent.appendChild(qrCodeScanRegion);
        if (ScanTypeSelector.isCameraScanType(this.currentScanType)) {
            this.insertCameraScanImageToScanRegion();
        }
        else {
            this.insertFileScanImageToScanRegion();
        }
        const qrCodeDashboard = document.createElement("div");
        const dashboardId = this.getDashboardId();
        qrCodeDashboard.id = dashboardId;
        qrCodeDashboard.style.width = "100%";
        parent.appendChild(qrCodeDashboard);
        this.setupInitialDashboard(qrCodeDashboard);
    }
    resetBasicLayout(mainContainer) {
        mainContainer.style.border = "none";
    }
    setupInitialDashboard(dashboard) {
        this.createSection(dashboard);
        this.createSectionControlPanel();
        if (this.scanTypeSelector.hasMoreThanOneScanType()) {
            this.createSectionSwap();
        }
    }
    createHeader(dashboard) {
        const header = document.createElement("div");
        header.style.textAlign = "left";
        header.style.margin = "0px";
        dashboard.appendChild(header);
        let libraryInfo = new LibraryInfoContainer();
        libraryInfo.renderInto(header);
        const headerMessageContainer = document.createElement("div");
        headerMessageContainer.id = this.getHeaderMessageContainerId();
        headerMessageContainer.style.display = "none";
        headerMessageContainer.style.textAlign = "center";
        headerMessageContainer.style.fontSize = "14px";
        headerMessageContainer.style.padding = "2px 10px";
        headerMessageContainer.style.margin = "4px";
        headerMessageContainer.style.borderTop = "1px solid #f6f6f6";
        header.appendChild(headerMessageContainer);
    }
    createSection(dashboard) {
        const section = document.createElement("div");
        section.id = this.getDashboardSectionId();
        section.style.width = "100%";
        section.style.padding = "10px 0px 10px 0px";
        section.style.textAlign = "left";
        dashboard.appendChild(section);
    }
    createCameraListUi(scpCameraScanRegion, requestPermissionContainer, requestPermissionButton) {
        const $this = this;
        $this.showHideScanTypeSwapLink(false);
        $this.setHeaderMessage(Html5QrcodeScannerStrings.cameraPermissionRequesting());
        const createPermissionButtonIfNotExists = () => {
            if (!requestPermissionButton) {
                $this.createPermissionButton(scpCameraScanRegion, requestPermissionContainer);
            }
        };
        Html5Qrcode.getCameras().then((cameras) => {
            // By this point the user has granted camera permissions.
            $this.persistedDataManager.setHasPermission(
            /* hasPermission */ true);
            $this.showHideScanTypeSwapLink(true);
            $this.resetHeaderMessage();
            if (cameras && cameras.length > 0) {
                scpCameraScanRegion.removeChild(requestPermissionContainer);
                $this.renderCameraSelection(cameras);
            }
            else {
                $this.setHeaderMessage(Html5QrcodeScannerStrings.noCameraFound(), Html5QrcodeScannerStatus.STATUS_WARNING);
                createPermissionButtonIfNotExists();
            }
        }).catch((error) => {
            $this.persistedDataManager.setHasPermission(
            /* hasPermission */ false);
            if (requestPermissionButton) {
                requestPermissionButton.disabled = false;
            }
            else {
                // Case when the permission button generation was skipped
                // likely due to persistedDataManager indicated permissions
                // exists.
                // This should ideally never happen, but if it so happened that
                // the camera retrieval failed, we want to create button this
                // time.
                createPermissionButtonIfNotExists();
            }
            $this.setHeaderMessage(error, Html5QrcodeScannerStatus.STATUS_WARNING);
            $this.showHideScanTypeSwapLink(true);
        });
    }
    createPermissionButton(scpCameraScanRegion, requestPermissionContainer) {
        const $this = this;
        const requestPermissionButton = BaseUiElementFactory
            .createElement("button", this.getCameraPermissionButtonId());
        requestPermissionButton.innerText
            = Html5QrcodeScannerStrings.cameraPermissionTitle();
        requestPermissionButton.addEventListener("click", function () {
            requestPermissionButton.disabled = true;
            $this.createCameraListUi(scpCameraScanRegion, requestPermissionContainer, requestPermissionButton);
        });
        requestPermissionContainer.appendChild(requestPermissionButton);
    }
    createPermissionsUi(scpCameraScanRegion, requestPermissionContainer) {
        const $this = this;
        // Only render last selected camera by default if the default scant type
        // is camera.
        if (ScanTypeSelector.isCameraScanType(this.currentScanType)
            && this.persistedDataManager.hasCameraPermissions()) {
            CameraPermissions.hasPermissions().then((hasPermissions) => {
                if (hasPermissions) {
                    $this.createCameraListUi(scpCameraScanRegion, requestPermissionContainer);
                }
                else {
                    $this.persistedDataManager.setHasPermission(
                    /* hasPermission */ false);
                    $this.createPermissionButton(scpCameraScanRegion, requestPermissionContainer);
                }
            }).catch((_) => {
                $this.persistedDataManager.setHasPermission(
                /* hasPermission */ false);
                $this.createPermissionButton(scpCameraScanRegion, requestPermissionContainer);
            });
            return;
        }
        this.createPermissionButton(scpCameraScanRegion, requestPermissionContainer);
    }
    createSectionControlPanel() {
        const section = document.getElementById(this.getDashboardSectionId());
        const sectionControlPanel = document.createElement("div");
        section.appendChild(sectionControlPanel);
        const scpCameraScanRegion = document.createElement("div");
        scpCameraScanRegion.id = this.getDashboardSectionCameraScanRegionId();
        scpCameraScanRegion.style.display
            = ScanTypeSelector.isCameraScanType(this.currentScanType)
                ? "block" : "none";
        sectionControlPanel.appendChild(scpCameraScanRegion);
        // Web browsers require the users to grant explicit permissions before
        // giving camera access. We need to render a button to request user
        // permission.
        // Assuming when the object is created permission is needed.
        const requestPermissionContainer = document.createElement("div");
        requestPermissionContainer.style.textAlign = "center";
        scpCameraScanRegion.appendChild(requestPermissionContainer);
        // TODO(minhazav): If default scan type is file, the permission or
        // camera access shouldn't start unless user explicitly switches to
        // camera based scan. @priority: high.
        if (this.scanTypeSelector.isCameraScanRequired()) {
            this.createPermissionsUi(scpCameraScanRegion, requestPermissionContainer);
        }
        this.renderFileScanUi(sectionControlPanel);
    }
    renderFileScanUi(parent) {
        let showOnRender = ScanTypeSelector.isFileScanType(this.currentScanType);
        const $this = this;
        let onFileSelected = (file) => {
            if (!$this.html5Qrcode) {
                throw "html5Qrcode not defined";
            }
            if (!ScanTypeSelector.isFileScanType($this.currentScanType)) {
                return;
            }
            $this.setHeaderMessage(Html5QrcodeScannerStrings.loadingImage());
            $this.html5Qrcode.scanFileV2(file, /* showImage= */ true)
                .then((html5qrcodeResult) => {
                $this.resetHeaderMessage();
                $this.qrCodeSuccessCallback(html5qrcodeResult.decodedText, html5qrcodeResult);
            })
                .catch((error) => {
                $this.setHeaderMessage(error, Html5QrcodeScannerStatus.STATUS_WARNING);
                $this.qrCodeErrorCallback(error, Html5QrcodeErrorFactory.createFrom(error));
            });
        };
        this.fileSelectionUi = FileSelectionUi.create(parent, showOnRender, onFileSelected);
    }
    renderCameraSelection(cameras) {
        const $this = this;
        const scpCameraScanRegion = document.getElementById(this.getDashboardSectionCameraScanRegionId());
        scpCameraScanRegion.style.textAlign = "center";
        // Hide by default.
        let cameraZoomUi = CameraZoomUi.create(scpCameraScanRegion, /* renderOnCreate= */ false);
        const renderCameraZoomUiIfSupported = (cameraCapabilities) => {
            let zoomCapability = cameraCapabilities.zoomFeature();
            if (!zoomCapability.isSupported()) {
                return;
            }
            // Supported.
            cameraZoomUi.setOnCameraZoomValueChangeCallback((zoomValue) => {
                zoomCapability.apply(zoomValue);
            });
            let defaultZoom = 1;
            if (this.config.defaultZoomValueIfSupported) {
                defaultZoom = this.config.defaultZoomValueIfSupported;
            }
            defaultZoom = clip(defaultZoom, zoomCapability.min(), zoomCapability.max());
            cameraZoomUi.setValues(zoomCapability.min(), zoomCapability.max(), defaultZoom, zoomCapability.step());
            cameraZoomUi.show();
        };
        let cameraSelectUi = CameraSelectionUi.create(scpCameraScanRegion, cameras);
        // Camera Action Buttons.
        const cameraActionContainer = document.createElement("span");
        const cameraActionStartButton = BaseUiElementFactory.createElement("button", PublicUiElementIdAndClasses.CAMERA_START_BUTTON_ID);
        cameraActionStartButton.innerText
            = Html5QrcodeScannerStrings.scanButtonStartScanningText();
        cameraActionContainer.appendChild(cameraActionStartButton);
        const cameraActionStopButton = BaseUiElementFactory.createElement("button", PublicUiElementIdAndClasses.CAMERA_STOP_BUTTON_ID);
        cameraActionStopButton.innerText
            = Html5QrcodeScannerStrings.scanButtonStopScanningText();
        cameraActionStopButton.style.display = "none";
        cameraActionStopButton.disabled = true;
        cameraActionContainer.appendChild(cameraActionStopButton);
        // Optional torch button support.
        let torchButton;
        const createAndShowTorchButtonIfSupported = (cameraCapabilities) => {
            if (!cameraCapabilities.torchFeature().isSupported()) {
                // Torch not supported, ignore.
                if (torchButton) {
                    torchButton.hide();
                }
                return;
            }
            if (!torchButton) {
                torchButton = TorchButton.create(cameraActionContainer, cameraCapabilities.torchFeature(), { display: "none", marginLeft: "5px" }, 
                // Callback in case of torch action failure.
                (errorMessage) => {
                    $this.setHeaderMessage(errorMessage, Html5QrcodeScannerStatus.STATUS_WARNING);
                });
            }
            else {
                torchButton.updateTorchCapability(cameraCapabilities.torchFeature());
            }
            torchButton.show();
        };
        scpCameraScanRegion.appendChild(cameraActionContainer);
        const resetCameraActionStartButton = (shouldShow) => {
            if (!shouldShow) {
                cameraActionStartButton.style.display = "none";
            }
            cameraActionStartButton.innerText
                = Html5QrcodeScannerStrings
                    .scanButtonStartScanningText();
            cameraActionStartButton.style.opacity = "1";
            cameraActionStartButton.disabled = false;
            if (shouldShow) {
                cameraActionStartButton.style.display = "inline-block";
            }
        };
        cameraActionStartButton.addEventListener("click", (_) => {
            // Update the UI.
            cameraActionStartButton.innerText
                = Html5QrcodeScannerStrings.scanButtonScanningStarting();
            cameraSelectUi.disable();
            cameraActionStartButton.disabled = true;
            cameraActionStartButton.style.opacity = "0.5";
            // Swap link is available only when both scan types are required.
            if (this.scanTypeSelector.hasMoreThanOneScanType()) {
                $this.showHideScanTypeSwapLink(false);
            }
            $this.resetHeaderMessage();
            // Attempt starting the camera.
            const cameraId = cameraSelectUi.getValue();
            $this.persistedDataManager.setLastUsedCameraId(cameraId);
            $this.html5Qrcode.start(cameraId, toHtml5QrcodeCameraScanConfig($this.config), $this.qrCodeSuccessCallback, $this.qrCodeErrorCallback)
                .then((_) => {
                cameraActionStopButton.disabled = false;
                cameraActionStopButton.style.display = "inline-block";
                resetCameraActionStartButton(/* shouldShow= */ false);
                const cameraCapabilities = $this.html5Qrcode.getRunningTrackCameraCapabilities();
                // Show torch button if needed.
                if (this.config.showTorchButtonIfSupported === true) {
                    createAndShowTorchButtonIfSupported(cameraCapabilities);
                }
                // Show zoom slider if needed.
                if (this.config.showZoomSliderIfSupported === true) {
                    renderCameraZoomUiIfSupported(cameraCapabilities);
                }
            })
                .catch((error) => {
                $this.showHideScanTypeSwapLink(true);
                cameraSelectUi.enable();
                resetCameraActionStartButton(/* shouldShow= */ true);
                $this.setHeaderMessage(error, Html5QrcodeScannerStatus.STATUS_WARNING);
            });
        });
        if (cameraSelectUi.hasSingleItem()) {
            // If there is only one camera, start scanning directly.
            cameraActionStartButton.click();
        }
        cameraActionStopButton.addEventListener("click", (_) => {
            if (!$this.html5Qrcode) {
                throw "html5Qrcode not defined";
            }
            cameraActionStopButton.disabled = true;
            $this.html5Qrcode.stop()
                .then((_) => {
                // Swap link is required if more than one scan types are
                // required.
                if (this.scanTypeSelector.hasMoreThanOneScanType()) {
                    $this.showHideScanTypeSwapLink(true);
                }
                cameraSelectUi.enable();
                cameraActionStartButton.disabled = false;
                cameraActionStopButton.style.display = "none";
                cameraActionStartButton.style.display = "inline-block";
                // Reset torch state.
                if (torchButton) {
                    torchButton.reset();
                    torchButton.hide();
                }
                cameraZoomUi.removeOnCameraZoomValueChangeCallback();
                cameraZoomUi.hide();
                $this.insertCameraScanImageToScanRegion();
            }).catch((error) => {
                cameraActionStopButton.disabled = false;
                $this.setHeaderMessage(error, Html5QrcodeScannerStatus.STATUS_WARNING);
            });
        });
        if ($this.persistedDataManager.getLastUsedCameraId()) {
            const cameraId = $this.persistedDataManager.getLastUsedCameraId();
            if (cameraSelectUi.hasValue(cameraId)) {
                cameraSelectUi.setValue(cameraId);
                cameraActionStartButton.click();
            }
            else {
                $this.persistedDataManager.resetLastUsedCameraId();
            }
        }
    }
    createSectionSwap() {
        const $this = this;
        const TEXT_IF_CAMERA_SCAN_SELECTED = Html5QrcodeScannerStrings.textIfCameraScanSelected();
        const TEXT_IF_FILE_SCAN_SELECTED = Html5QrcodeScannerStrings.textIfFileScanSelected();
        // TODO(minhaz): Export this as an UI element.
        const section = document.getElementById(this.getDashboardSectionId());
        const switchContainer = document.createElement("div");
        switchContainer.style.textAlign = "center";
        const switchScanTypeLink = BaseUiElementFactory.createElement("span", this.getDashboardSectionSwapLinkId());
        switchScanTypeLink.style.textDecoration = "none";
        switchScanTypeLink.style.cursor = "pointer";
        switchScanTypeLink.innerText
            = ScanTypeSelector.isCameraScanType(this.currentScanType)
                ? TEXT_IF_CAMERA_SCAN_SELECTED : TEXT_IF_FILE_SCAN_SELECTED;
        switchScanTypeLink.addEventListener("click", function () {
            // TODO(minhazav): Abstract this to a different library.
            if (!$this.sectionSwapAllowed) {
                if ($this.verbose) {
                    $this.logger.logError("Section swap called when not allowed");
                }
                return;
            }
            // Cleanup states
            $this.resetHeaderMessage();
            $this.fileSelectionUi.resetValue();
            $this.sectionSwapAllowed = false;
            if (ScanTypeSelector.isCameraScanType($this.currentScanType)) {
                // Swap to file based scanning.
                $this.clearScanRegion();
                $this.getCameraScanRegion().style.display = "none";
                $this.fileSelectionUi.show();
                switchScanTypeLink.innerText = TEXT_IF_FILE_SCAN_SELECTED;
                $this.currentScanType = Html5QrcodeScanType.SCAN_TYPE_FILE;
                $this.insertFileScanImageToScanRegion();
            }
            else {
                // Swap to camera based scanning.
                $this.clearScanRegion();
                $this.getCameraScanRegion().style.display = "block";
                $this.fileSelectionUi.hide();
                switchScanTypeLink.innerText = TEXT_IF_CAMERA_SCAN_SELECTED;
                $this.currentScanType = Html5QrcodeScanType.SCAN_TYPE_CAMERA;
                $this.insertCameraScanImageToScanRegion();
                $this.startCameraScanIfPermissionExistsOnSwap();
            }
            $this.sectionSwapAllowed = true;
        });
        switchContainer.appendChild(switchScanTypeLink);
        section.appendChild(switchContainer);
    }
    // Start camera scanning automatically when swapping to camera based scan
    // if set in config and has permission.
    startCameraScanIfPermissionExistsOnSwap() {
        const $this = this;
        if (this.persistedDataManager.hasCameraPermissions()) {
            CameraPermissions.hasPermissions().then((hasPermissions) => {
                if (hasPermissions) {
                    // Start feed.
                    // Assuming at this point the permission button exists.
                    let permissionButton = document.getElementById($this.getCameraPermissionButtonId());
                    if (!permissionButton) {
                        this.logger.logError("Permission button not found, fail;");
                        throw "Permission button not found";
                    }
                    permissionButton.click();
                }
                else {
                    $this.persistedDataManager.setHasPermission(
                    /* hasPermission */ false);
                }
            }).catch((_) => {
                $this.persistedDataManager.setHasPermission(
                /* hasPermission */ false);
            });
            return;
        }
    }
    resetHeaderMessage() {
        const messageDiv = document.getElementById(this.getHeaderMessageContainerId());
        messageDiv.style.display = "none";
    }
    setHeaderMessage(messageText, scannerStatus) {
        if (!scannerStatus) {
            scannerStatus = Html5QrcodeScannerStatus.STATUS_DEFAULT;
        }
        const messageDiv = this.getHeaderMessageDiv();
        messageDiv.innerText = messageText;
        messageDiv.style.display = "block";
        switch (scannerStatus) {
            case Html5QrcodeScannerStatus.STATUS_SUCCESS:
                messageDiv.style.background = "rgba(106, 175, 80, 0.26)";
                messageDiv.style.color = "#477735";
                break;
            case Html5QrcodeScannerStatus.STATUS_WARNING:
                messageDiv.style.background = "rgba(203, 36, 49, 0.14)";
                messageDiv.style.color = "#cb2431";
                break;
            case Html5QrcodeScannerStatus.STATUS_DEFAULT:
            default:
                messageDiv.style.background = "rgba(0, 0, 0, 0)";
                messageDiv.style.color = "rgb(17, 17, 17)";
                break;
        }
    }
    showHideScanTypeSwapLink(shouldDisplay) {
        if (this.scanTypeSelector.hasMoreThanOneScanType()) {
            if (shouldDisplay !== true) {
                shouldDisplay = false;
            }
            this.sectionSwapAllowed = shouldDisplay;
            this.getDashboardSectionSwapLink().style.display
                = shouldDisplay ? "inline-block" : "none";
        }
    }
    insertCameraScanImageToScanRegion() {
        const $this = this;
        const qrCodeScanRegion = document.getElementById(this.getScanRegionId());
        if (this.cameraScanImage) {
            qrCodeScanRegion.innerHTML = "<br>";
            qrCodeScanRegion.appendChild(this.cameraScanImage);
            return;
        }
        this.cameraScanImage = new Image;
        this.cameraScanImage.onload = (_) => {
            qrCodeScanRegion.innerHTML = "<br>";
            qrCodeScanRegion.appendChild($this.cameraScanImage);
        };
        this.cameraScanImage.width = 64;
        this.cameraScanImage.style.opacity = "0.8";
        this.cameraScanImage.src = ASSET_CAMERA_SCAN;
        this.cameraScanImage.alt = Html5QrcodeScannerStrings.cameraScanAltText();
    }
    insertFileScanImageToScanRegion() {
        const $this = this;
        const qrCodeScanRegion = document.getElementById(this.getScanRegionId());
        if (this.fileScanImage) {
            qrCodeScanRegion.innerHTML = "<br>";
            qrCodeScanRegion.appendChild(this.fileScanImage);
            return;
        }
        this.fileScanImage = new Image;
        this.fileScanImage.onload = (_) => {
            qrCodeScanRegion.innerHTML = "<br>";
            qrCodeScanRegion.appendChild($this.fileScanImage);
        };
        this.fileScanImage.width = 64;
        this.fileScanImage.style.opacity = "0.8";
        this.fileScanImage.src = ASSET_FILE_SCAN;
        this.fileScanImage.alt = Html5QrcodeScannerStrings.fileScanAltText();
    }
    clearScanRegion() {
        const qrCodeScanRegion = document.getElementById(this.getScanRegionId());
        qrCodeScanRegion.innerHTML = "";
    }
    //#region state getters
    getDashboardSectionId() {
        return `${this.elementId}__dashboard_section`;
    }
    getDashboardSectionCameraScanRegionId() {
        return `${this.elementId}__dashboard_section_csr`;
    }
    getDashboardSectionSwapLinkId() {
        return PublicUiElementIdAndClasses.SCAN_TYPE_CHANGE_ANCHOR_ID;
    }
    getScanRegionId() {
        return `${this.elementId}__scan_region`;
    }
    getDashboardId() {
        return `${this.elementId}__dashboard`;
    }
    getHeaderMessageContainerId() {
        return `${this.elementId}__header_message`;
    }
    getCameraPermissionButtonId() {
        return PublicUiElementIdAndClasses.CAMERA_PERMISSION_BUTTON_ID;
    }
    getCameraScanRegion() {
        return document.getElementById(this.getDashboardSectionCameraScanRegionId());
    }
    getDashboardSectionSwapLink() {
        return document.getElementById(this.getDashboardSectionSwapLinkId());
    }
    getHeaderMessageDiv() {
        return document.getElementById(this.getHeaderMessageContainerId());
    }
}
//# sourceMappingURL=html5-qrcode-scanner.js.map