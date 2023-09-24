/** global: google */
export class IconObject {
    constructor(options) {
        this.url = options.url;
        let { fillColor, strokeColor, ...markerOpts } = options;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.markerOpts = markerOpts;
        Object.assign(this, markerOpts);
        if (window && window.google && window.google.maps) {
            this.origin = new google.maps.Point(this.markerOpts.origin.x, this.markerOpts.origin.y);
            this.anchor = new google.maps.Point(this.markerOpts.anchor.x, this.markerOpts.anchor.y);
            this.size = new google.maps.Size(this.markerOpts.size.width, this.markerOpts.size.height);
            this.scaledSize = new google.maps.Size(this.markerOpts.scaledSize.width, this.markerOpts.scaledSize.height);
        }
        return this;
    }
    toJSON() {
        let serialized = Object.fromEntries(Object.entries(this.markerOpts).filter(([key, value]) => {
            return !key.includes("gm_");
        }));
        serialized.url = this.url;
        serialized.text = serialized.label;
        serialized.fillColor = this.fillColor;
        serialized.strokeColor = this.strokeColor;
        return serialized;
    }
}
export function serializeOptions(options) {
    if (typeof options !== "object") {
        return null;
    }
    let cleanOptions = Object.entries(options).filter(([key, value]) => {
        return !key.includes("gm_")
            && !key.includes("url")
            && typeof value !== "function"
            && typeof value !== "object"
            && value !== null &&
            typeof value !== "undefined";
    }).map(([key, value]) => {
        key = key.replace('fillColor', 'fc')
            .replace('strokeColor', 'sc')
            .replace('fillOpacity', 'fo')
            .replace('strokeOpacity', 'so')
            .replace('fontSize', 'fs')
            .replace('scale', 'sc')
            .replace('fontFamily', 'ff');
        return [key, value].join(":");
    })
        .sort((a, b) => a.localeCompare(b));
    return JSON.stringify(cleanOptions.join('|'));
}
const generateFatCanvas = function (options) {
    let size = options.size || { width: 54, height: 48 };
    /**
     * @type {HTMLCanvasElement} canvas
     */
    let canvas = options.canvas || document.createElement("canvas"), anchorX = size.width / 2.5, anchorY = size.height - 1, radius = anchorX - 9, angulo = 1.1, fontFamily = options.fontFamily || "fontello", fontSize = options.fontSize || 14, context = canvas.getContext("2d"), grad = context.createLinearGradient(0, 0, 0, anchorY);
    canvas.width = anchorX * 2;
    canvas.height = anchorY + 1;
    context.clearRect(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0.72, `rgba(255,255,255,${options.strokeOpacity})`);
    grad.addColorStop(0.82, options.strokeColor);
    grad.addColorStop(1, options.strokeColor);
    context.fillStyle = grad;
    context.strokeStyle = options.strokeColor;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(anchorX, anchorY);
    let delta = 0.6;
    // arco superior
    /**
     * This part draws an arc from the point (anchorX, 2 + 0.5 * anchorY) to the point (anchorX, anchorY)
     * Playing with the `angulo` variable you can get narrower anchors or even circle the market's center twice
     */
    context.arc(anchorX - 2, 4 + 0.5 * anchorY, radius, angulo, (Math.PI / 2) - delta, true);
    context.arc(anchorX, 8 + 0.5 * anchorY, radius - 5, (Math.PI / 2) - delta, (Math.PI / 2) + delta, true);
    context.arc(anchorX + 2, 4 + 0.5 * anchorY, radius, (Math.PI / 2) + delta, Math.PI - angulo, true);
    //punta inferior
    context.lineTo(anchorX, anchorY);
    context.fill();
    context.stroke();
    delta = 0.3;
    // Círculo blanco
    context.beginPath();
    //context.arc(anchorX, 2 + 0.5 * anchorY, radius - 3, delta, Math.PI - delta, false);
    //context.arc(anchorX, 2 + 0.5 * anchorY, radius - 3, Math.PI + delta, (2 * Math.PI) - delta, false);
    context.ellipse(anchorX, 1 + 0.5 * anchorY, radius - 5, radius + 1, 0, 0, 2 * Math.PI, false);
    context.fillStyle = options.fillColor;
    context.fill();
    context.beginPath();
    context.font = "normal normal normal " + fontSize + "px " + fontFamily;
    //console.log('context fontFamily', context.fontFamily);
    context.fillStyle = options.strokeColor;
    context.textBaseline = "top";
    let textWidth = context.measureText(options.unicodelabel), text_x = options.unicodelabel, label_x = Math.floor(canvas.width / 2 - textWidth.width / 2), label_y = 1 + Math.floor(canvas.height / 2 - fontSize / 2);
    // centre the text.
    context.fillText(text_x, label_x, label_y);
    //@ts-ignore
    return canvas;
};
export const computeColorAlpha = (color, opacity) => {
    let colorHexAlpha = color, colorRgb = color, colorRgba = color;
    if (/#[a-fA-F0-9]{3}/.test(color)) {
        let alpha = (255 * Number(opacity)).toString(16).slice(0, 2);
        colorHexAlpha = color + alpha.padStart(2, '0');
        let [r, g, b] = [color.slice(1, 3), color.slice(3, 5), color.slice(5, 7)].map(c => parseInt(c, 16));
        colorRgba = `rgba(${r},${g},${b},${opacity})`;
        colorRgb = `rgb(${r},${g},${b})`;
    }
    return { colorRgba, colorRgb, colorHexAlpha };
};
function readCache(cacheKey, options) {
    if (options.no_cache) {
        return null;
    }
    var cached = window.sessionStorage.getItem(cacheKey);
    if (cached === null) {
        return null;
    }
    var cachedObj = JSON.parse(cached);
    //console.log('cache hit!')
    return new IconObject(cachedObj);
}
function setCache(cacheKey, iconObj) {
    sessionStorage.setItem(cacheKey, JSON.stringify(iconObj.toJSON()));
    return iconObj;
}
function numberToFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}
export function markerFactory(theoptions) {
    //console.log(JSON.stringify(theoptions))
    const cacheKey = serializeOptions(theoptions);
    const iconObj = readCache(cacheKey, theoptions);
    if (iconObj && !theoptions.no_cache)
        return iconObj;
    let size = { width: theoptions.canvasWidth || 96, height: theoptions.canvasHeight || 96 };
    let scale = theoptions.scale || 1, { fillColor, strokeColor, fillOpacity, strokeOpacity } = theoptions;
    if (theoptions.label.length === 4 ||
        theoptions.label.substring(0, 2) === "0x") {
        theoptions.fontFamily = theoptions.fontFamily || "fontello";
        theoptions.label = (theoptions.label || "e836").slice(-4);
        //@ts-ignore
        theoptions.unicodelabel = String.fromCharCode("0x" + theoptions.label);
        theoptions.scale = theoptions.scale || 1;
        theoptions.is_icon = true;
    }
    /**
     * Combine the colors with the opacity to generate an rgba color
     */
    strokeColor = computeColorAlpha(strokeColor, strokeOpacity).colorRgba;
    fillColor = computeColorAlpha(fillColor, fillOpacity).colorRgba;
    const markerCanvas = generateFatCanvas({ ...theoptions, fillColor, strokeColor, size });
    let markerOpts = { ...theoptions, fillColor, strokeColor, size };
    theoptions.type = "fatmarker";
    markerOpts = {
        ...markerOpts,
        origin: { x: 0, y: 0 },
        anchor: { x: numberToFixed(scale * size.width / 2, 0), y: numberToFixed(size.height * scale, 0) },
        size,
        scaledSize: { width: numberToFixed(size.width * scale, 0), height: numberToFixed(size.height * scale, 0) },
        scale
    };
    markerOpts.url = markerCanvas.toDataURL();
    // @ts-ignore
    return setCache(cacheKey, new IconObject(markerOpts));
}
//# sourceMappingURL=markerFactory.js.map