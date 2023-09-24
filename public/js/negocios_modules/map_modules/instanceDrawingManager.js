export const instanceDrawingManager = (DrawingManager, map) => {
    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                google.maps.drawing.OverlayType.MARKER,
                google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYGON,
                google.maps.drawing.OverlayType.POLYLINE,
                google.maps.drawing.OverlayType.RECTANGLE,
            ],
        },
        markerOptions: {
            icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        },
        circleOptions: {
            fillColor: "#ffff00",
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
        },
    });
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
        if (event.type == 'circle') {
            var radius = event.overlay.getRadius();
        }
        drawingManager.setDrawingMode(null);
    });
    drawingManager.setMap(map);
    return drawingManager;
};
//# sourceMappingURL=instanceDrawingManager.js.map