import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export function createMarkeIcon(
    faIcon: IconDefinition,
    maps,
    options: {
        fillColor: string;
        fillOpacity: number;
        strokeColor: string;
        strokeOpacity: number;
        scale: number;
        strokeWeight: number;
        labelOrigin?: google.maps.Point;
    } = {
            fillOpacity: 1,
            fillColor: '#000000',
            strokeColor: '#ffffff',
            scale: 0.05,
            strokeWeight: 1,
            strokeOpacity: 1

        },
): google.maps.Icon {
    let [width, height, _, _2, path] = faIcon.icon;
    return {
        //@ts-ignore
        path,
        fillColor: options.fillColor,
        fillOpacity: options.fillOpacity ?? 1,
        anchor: new google.maps.Point(
            width / 2, // width
            height, // height
        ),
        strokeWeight: options.strokeWeight,
        strokeColor: options.strokeColor,
        scale: options.scale,
        labelOrigin: options.labelOrigin,
        strokeOpacity: options.strokeOpacity
    };
}
