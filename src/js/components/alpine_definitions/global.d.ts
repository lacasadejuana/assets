import * as Popper from '@popperjs/core';
import Sentry from '@sentry/browser';
import { Alpine as AlpineType } from 'alpinejs';
import flatpickr from 'flatpickr';
import jQuery from 'jquery';
import { openToast } from '../openToast';
export { };


export declare global {
    var Alpine: AlpineType

    interface Window {
        jQuery: typeof jQuery
        $: JQueryStatic
        map: google.maps.Map;
        Alpine: AlpineType;
        Popper: typeof Popper
        Sentry: typeof Sentry
        flatpickr: typeof flatpickr
        openToast: typeof openToast
        moment: typeof moment

    }
    interface globalThis {
        map: google.maps.Map;
        marker: google.maps.Marker;
        featureMarker: google.maps.Marker
        geocode: google.maps.Geocoder;
        Alpine: AlpineType;
        Popper: typeof Popper;
        jQuery: typeof jQuery
        Sentry: typeof Sentry
        flatpickr: typeof flatpickr
        openToast: typeof openToast
        $: JQueryStatic,
    }
    interface Console {
        zdebug: (...args: any[]) => void
        zwarn: (...args: any[]) => void
        zerror: (...args: any[]) => void
        zsucces: (...args: any[]) => void
        timerInfo: (...args: any[]) => void
        zinfo: (...args: any[]) => void

        colorInfo: (arg: string, ...args: any[]) => void
        tap<T>(arg: T): T
        marquee(arg: any): void
    }
}

