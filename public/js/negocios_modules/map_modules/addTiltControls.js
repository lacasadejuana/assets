export function addTiltControls(map) {
    const buttons = [
        ["Rotate Left", "rotate", 20, google.maps.ControlPosition.BOTTOM_LEFT],
        ["Rotate Right", "rotate", -20, google.maps.ControlPosition.BOTTOM_RIGHT],
        ["Tilt Down", "tilt", 20, google.maps.ControlPosition.TOP_CENTER],
        ["Tilt Up", "tilt", -20, google.maps.ControlPosition.BOTTOM_CENTER],
    ];
    const adjustMap = function (mode, amount) {
        switch (mode) {
            case "tilt":
                map.setTilt(map.getTilt() + amount);
                break;
            case "rotate":
                map.setHeading(map.getHeading() + amount);
                break;
            default:
                break;
        }
    };
    buttons.forEach(([text, mode, amount, position]) => {
        //@ts-ignore
        const controlUI = this.pushControlButton(position, text);
        controlUI.addEventListener("click", () => {
            adjustMap(mode, amount);
        });
    });
}
//# sourceMappingURL=addTiltControls.js.map