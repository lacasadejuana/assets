import { Html5QrcodeScanner, Html5QrcodeScannerState, Html5QrcodeSupportedFormats } from "../plugins/qr_reader";
const Alpine = globalThis.Alpine;
function onScanError(decodedText, decodedResult) {
    // console.log(`Code scanned = ${decodedText}`, decodedResult);
}
const geoLocationOptions = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0,
};
function scanAnother(html5QrcodeScanner, onScanSuccess, onScanError) {
    return () => {
        document.querySelector('#success_container').classList.remove('flex');
        document.querySelector('#success_container').classList.add('hidden');
        document.querySelector('#consultar_solicitud').setAttribute('href', '#');
        setTimeout(() => {
            document.querySelector('#qr_container').classList.remove('hidden');
            document.querySelector('#qr_container').classList.add('flex');
            document.querySelector('#qr_title').classList.remove('hidden');
        }, 100);
        html5QrcodeScanner.render(onScanSuccess, onScanError);
    };
}
export const qrDataComponentFn = () => {
    return {
        gotScanResult: false,
        html5QrcodeScanner: null,
        resultsElement: null,
        geoLocationPermission: null,
        cameraPermission: null,
        componentReady: false,
        get showGeolocationDiv() {
            return !this.geoLocationPermission || this.geoLocationPermission === 'prompt';
        },
        get showCameraPermissionDiv() {
            return !this.showGeolocationDiv && (!this.cameraPermission || this.cameraPermission === 'prompt');
        },
        get showQrDashboard() {
            return !this.showGeolocationDiv && !this.showCameraPermissionDiv;
        },
        get scannerState() {
            return this.html5QrcodeScanner?.getState();
        },
        get scannerStatus() {
            return this.scannerState === Html5QrcodeScannerState.SCANNING ? 'scanner_scanning' : 'scanner_inactive';
        },
        request_position_text: '',
        init() {
            this.request_camera_text = this.requesting_camera_default_text;
            this.request_position_text = this.request_position_default_text;
            console.log('qrDataComponent initialized');
            this.resultsElement = this.$refs.result_message;
            if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
                console.marquee({
                    [Number(performance.now() / 1000).toFixed(1)]: 'color:blue;font-weight:bold',
                    ' feature support verified. ': 'color:green;font-weight:bold',
                    'passing to next step': ''
                });
                this.verifyGeolocationPermission();
            }
            else {
                console.warn('no camera detected');
            }
            globalThis.qrComponent = this;
        },
        verifyGeolocationPermission() {
            console.timerInfo(`checking geolocation permisions`);
            navigator.permissions.query({ name: 'geolocation' })
                .then((permissionObj) => {
                this.geoLocationPermission = permissionObj.state;
                this.resultsElement.innerText = `geolocation state: ${permissionObj.state}`;
                console.timerInfo(`geolocation state: ${permissionObj.state}`);
                if (permissionObj.state === 'prompt') {
                    this.componentReady = true;
                    // do nothing. wait for user to click on button
                }
                else if (permissionObj.state === 'granted') {
                    this.requestGeolocation();
                }
                else {
                    this.onGeolocationSuccess({ coords: { latitude: 0, longitude: 0 } });
                }
            })
                .catch((error) => {
                // onGeolocationSuccess({ coords: { latitude: 0, longitude: 0 } })
                console.error(error);
            });
        },
        request_position_default_text: 'Para comenzar, pediremos acceso a tu ubicación. <b>Asegúrate de aceptar</b> cuando el navegador te pida autorización',
        requesting_position: false,
        requesting_camera: false,
        requesting_camera_default_text: 'Para continuar, necesitamos acceso a tu cámara. <b>Asegúrate de aceptar</b> cuando el navegador te pida autorización',
        requestGeolocation() {
            this.requesting_position = true;
            this.request_position_text = 'Obteniendo ubicación...';
            console.timerInfo(`requesting geolocation`);
            navigator.geolocation.getCurrentPosition(this.onGeolocationSuccess.bind(this), this.geolocationError.bind(this), geoLocationOptions);
        },
        geolocationError(error) {
            console.log(error);
            console.timerInfo(`geolocation error`, error);
            this.requesting_position = false;
            this.$nextTick(() => {
                this.request_position_text = this.request_position_default_text;
            });
            this.resultsElement.innerHTML = 'Error. No se pudo obtener la ubicación.';
            this.onGeolocationSuccess({ coords: { latitude: 0, longitude: 0 } });
        },
        onGeolocationSuccess({ coords }) {
            this.requesting_position = false;
            console.timerInfo(`geolocation success`, coords);
            this.$nextTick(() => {
                this.request_position_text = this.request_position_default_text;
            });
            this.coords = coords;
            this.geoLocationPermission = 'granted';
            console.timerInfo(`checking camera permissions`);
            //@ts-ignore
            navigator.permissions.query({ name: 'camera' })
                .then((permissionObj) => {
                console.timerInfo('camera permissions ' + permissionObj.state);
                this.cameraPermission = permissionObj.state;
                this.resultsElement.innerText = `cameraPermission state: ${permissionObj.state}`;
                if (permissionObj.state === 'prompt') {
                    this.componentReady = true;
                    // do nothing. wait for user to click on button
                }
                else if (permissionObj.state === 'granted') {
                    this.renderQrScanner();
                }
                else {
                    this.renderQrScanner();
                    // display 'scan using the gallery'
                }
            })
                .catch((error) => {
                console.timerInfo('camera permissions error ', error);
                this.renderQrScanner();
                // display 'scan using the gallery'
                console.error(error);
            });
        },
        requestCameraAccess() {
            this.requesting_camera = true;
            this.request_camera_text = 'Obteniendo acceso a la cámara';
            console.timerInfo(`requesting camera access`);
            navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
                this.request_camera_text = this.requesting_camera_default_text;
                this.requesting_camera = false;
                console.timerInfo(`getUserMedia success`);
                if (mediaStream) {
                    this.cameraPermission = 'granted';
                    const tracks = mediaStream.getTracks();
                    console.log({ mediaStreamActive: mediaStream.active });
                    tracks.forEach(track => {
                        track.stop();
                        console.log({ mediaStreamActive: mediaStream.active });
                    });
                    console.log({ mediaStreamActive: mediaStream.active });
                    this.$nextTick(() => {
                        this.renderQrScanner();
                    });
                }
            }).catch(error => {
                console.timerInfo(`getUserMedia error`, error);
                this.request_camera_text = this.requesting_camera_default_text;
                this.requesting_camera = false;
                this.cameraPermission = 'denied';
                this.$nextTick(() => {
                    this.renderQrScanner();
                });
            });
        },
        renderQrScanner() {
            const coords = this.coords;
            console.timerInfo(`rendering html5QrcodeScanner`);
            this.html5QrcodeScanner = new Html5QrcodeScanner(this.$refs.qr_reader.id, {
                fps: 10,
                qrbox: 250,
                formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
            }, false);
            this.html5QrcodeScanner.render(this.onScanSuccess.bind(this), onScanError);
            globalThis.html5QrcodeScanner = this.html5QrcodeScanner;
            setTimeout(() => this.componentReady = true, 500);
        },
        scanAnother() {
            this.$nextTick(() => {
                this.innerSuccessMessage = '';
                this.innerSuccessClassName = '';
                this.innerSuccessLink = '';
            });
            this.gotScanResult = false;
            this.html5QrcodeScanner.render(this.onScanSuccess.bind(this), onScanError);
        },
        async onScanSuccess(decodedText, decodedResult) {
            this.gotScanResult = false;
            const tokenElement = document.querySelector('[name="_token"]');
            if (!tokenElement) {
                this.$refs.result_message.innerHTML = 'Error, no se pudo encontrar un token';
            }
            const token = tokenElement.value;
            const coords = this.coords;
            console.log(`Code scanned = ${decodedText}`, decodedResult);
            this.html5QrcodeScanner.clear();
            if (!/efectuar_visita/.test(decodedText) || !/solicitud_visita/.test(decodedText)) {
                this.showErrorUi('El código QR no es válido');
                return;
            }
            let url = new URL(decodedText), id_solicitud = url.pathname.split('/').pop();
            url.hostname = new URL(location.href).hostname;
            //resultsElement.innerHTML = decodedText
            const { latitude, longitude } = coords;
            let audio;
            try {
                audio = new Audio(`${location.origin}/audio/qr-complete.mp3`);
            }
            catch (err) {
            }
            return await fetch(`/api/solicitudes_visita/efectuar_visita/${id_solicitud}`, {
                method: 'POST',
                body: JSON.stringify({ lat: latitude, lng: longitude, time: new Date().toISOString() }),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    timelocal: new Date().toLocaleString('en-GB')
                }
            }).then(response => response.json())
                .then(data => {
                if (!/consultar/.test(data.redirect)) {
                    this.showErrorUi('El código QR no es válido');
                    return;
                }
                this.gotScanResult = true;
                try {
                    if (audio)
                        audio.play();
                }
                catch (err) {
                }
                this.showSuccessUI(data.redirect);
            });
        },
        innerSuccessMessage: '',
        innerSuccessClassName: '',
        innerSuccessLink: '',
        showSuccessUI(redirect) {
            let id_solicitud = redirect.split('/').pop();
            setTimeout(() => {
                this.innerSuccessClassName = 'flex lni lni-checkmark-circle text-green-500';
                this.innerSuccessMessage = `<h3>La solicitud de visita <b>${id_solicitud}</b> pasó al estado <b>Efectuada</b></h3>`;
                this.innerSuccessLink = redirect;
            }, 100);
        },
        showErrorUi(error_messagge) {
            setTimeout(() => {
                this.innerSuccessClassName = 'lni lni-close text-red-600';
                this.innerSuccessMessage = `${error_messagge}`;
            }, 100);
        }
    };
};
globalThis.qrDataComponentFn = qrDataComponentFn;
//# sourceMappingURL=qrCodeScanner.js.map