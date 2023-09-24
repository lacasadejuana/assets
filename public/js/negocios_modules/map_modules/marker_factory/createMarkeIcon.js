export function createMarkeIcon(faIcon, maps, options = {
    fillOpacity: 1,
    fillColor: '#000000',
    strokeColor: '#ffffff',
    scale: 0.05,
    strokeWeight: 1,
    strokeOpacity: 1
}) {
    let [width, height, _, _2, path] = faIcon.icon;
    return {
        //@ts-ignore
        path,
        fillColor: options.fillColor,
        fillOpacity: options.fillOpacity ?? 1,
        anchor: new google.maps.Point(width / 2, // width
        height),
        strokeWeight: options.strokeWeight,
        strokeColor: options.strokeColor,
        scale: options.scale,
        labelOrigin: options.labelOrigin,
        strokeOpacity: options.strokeOpacity
    };
}
//# sourceMappingURL=createMarkeIcon.js.map