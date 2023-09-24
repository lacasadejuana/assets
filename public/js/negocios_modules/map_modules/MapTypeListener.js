import screenShooter from 'front_screenshot';
import { v4 as uuidv4 } from 'uuid';
import { cloneFullScreenButton } from "./cloneFullScreenButton";
import { BentleyMap, FlatDesign, Grass, LightBlueMap, PaperMap, ShiftWorker, defaultStyles } from "./map_styles";
import { BaseClass } from '../../components/stores';
import { waitFor } from '../../components';
export class MapTypeListener extends BaseClass {
    constructor(gmap) {
        super();
        this.onChangedHandlers = [];
        this.onSaveHandlers = [];
        this.buttonpromises = [];
        this.gmap = gmap;
        this.addCustomStyles().then(async () => {
            const saveMapButton = await cloneFullScreenButton(this.gmap, 0, '.gm-fullscreen-control', google.maps.ControlPosition.RIGHT_TOP);
            const screenshotButton = saveMapButton.cloneNode(true);
            const firboundsButton = saveMapButton.cloneNode(true);
            this.createSaveMapButton(saveMapButton);
            this.createScreenShotButton(screenshotButton);
            this.createFirboundsButton(firboundsButton);
            this.addClickListener();
            const mapName = document.createElement('div');
            mapName.id = 'map_name';
            mapName.setAttribute('x-text', "'Viendo mapa: '+$store.maps.map_name");
            mapName.className = 'flex map_name py-1 px-3 bg-gradient  text-black h8 min-w[200px] justify-center items-center';
            this.gmap.controls[google.maps.ControlPosition.TOP_CENTER].push(mapName);
            return this;
        });
    }
    onClickSave(handler) {
        this.on('save', handler);
        return this;
    }
    onChanged(handler) {
        this.on('changed', handler);
        return this;
    }
    createSaveMapButton(saveMapButton) {
        if (saveMapButton) {
            saveMapButton.parentElement.classList.add('corner_buttons');
            saveMapButton.id = 'save_map';
            saveMapButton.setAttribute('x-tooltip', 'tooltip');
            saveMapButton.setAttribute('x-data', 'saveMapButton');
            saveMapButton.setAttribute('x-on:keyup.escape.window', 'keyUpEscape');
            saveMapButton.setAttribute('x-on:closesavemaptooltip.window', 'keyUpEscape');
            saveMapButton.title = 'Guardar Mapa';
            this.saveMapButton = saveMapButton;
            saveMapButton.innerHTML = '<i class="far fa-save  "></i>';
            this.saveMapButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.processEventListeners('save', this);
            });
        }
    }
    createScreenShotButton(screenshotButton) {
        if (screenshotButton) {
            screenshotButton.id = 'take_screenshot';
            screenshotButton.title = 'Captura de Pantalla Mapa';
            screenshotButton.innerHTML = '<i class="fas fa-camera  "></i>';
            screenshotButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                globalThis.mapFrameData.screenShot();
            });
            screenshotButton.style.display = 'none';
            setTimeout(() => {
                screenshotButton.style.top = '0px !important';
                screenshotButton.style.right = '50px !important';
                setTimeout(() => {
                    screenshotButton.style.display = 'block';
                }, 100);
            }, 500);
            this.gmap.controls[google.maps.ControlPosition.RIGHT_TOP].push(screenshotButton);
            screenshotButton.parentElement.classList.add('corner_buttons');
        }
    }
    createFirboundsButton(firboundsButton) {
        if (firboundsButton) {
            firboundsButton.id = 'fit_bounds';
            firboundsButton.title = 'Ajustar encuadre a los marcadores';
            firboundsButton.innerHTML = '<i class="fas fa-crosshairs"></i>';
            firboundsButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const bounds = new google.maps.LatLngBounds();
                this.$store.maps.dataLayers.forEach((layer) => {
                    if (layer) {
                        let gmapLayer = layer.getLayer();
                        //@ts-ignore
                        if (gmapLayer.getBounds)
                            //@ts-ignore
                            bounds.union(gmapLayer.getBounds());
                    }
                });
                this.gmap.fitBounds(bounds);
                return bounds;
            });
            firboundsButton.style.display = 'none';
            setTimeout(() => {
                firboundsButton.style.top = '0px !important';
                firboundsButton.style.right = '90px !important';
                setTimeout(() => {
                    firboundsButton.style.display = 'block';
                }, 100);
            }, 500);
            this.gmap.controls[google.maps.ControlPosition.RIGHT_TOP].push(firboundsButton);
            firboundsButton.parentElement.classList.add('corner_buttons');
        }
    }
    addCustomStyles() {
        if (this.buttonpromises.length)
            return Promise.all(this.buttonpromises);
        Object.entries({ BentleyMap, ShiftWorker, LightBlueMap, Grass, FlatDesign, PaperMap })
            .forEach(([id, { name, alt, img, styles }]) => {
            const promise = new Promise((resolve) => {
                const styledMapType = new google.maps.StyledMapType(styles, { alt, name });
                console.log(`Adding mapType ${name}`);
                this.gmap.mapTypes.set(id, styledMapType);
                resolve(id);
            });
            this.buttonpromises.push(promise);
        });
        return Promise.all(this.buttonpromises);
    }
    addClickListener() {
        this.gmnoPrint = this.gmnoPrint || document.querySelector('.gmnoprint.custom_maps');
        this.gmnoPrint && this.gmnoPrint.addEventListener('click', (e) => {
            const button = e.target, 
            //@ts-ignore
            { id, rel, name } = button;
            this.gmap.setMapTypeId(button.id);
        });
    }
    addMapTypeChangedListener() {
        google.maps.event.addListener(this.gmap, 'maptypeid_changed', () => {
            const id = this.gmap.getMapTypeId();
            this.processEventListeners('changed', id);
            const gmnoPrint = this.gmnoPrint || document.querySelector('.gmnoprint.custom_maps');
            if (!gmnoPrint)
                return;
            gmnoPrint.className = `gmnoprint custom_maps ${id}`;
            const mapButtons = Array.from(gmnoPrint.querySelectorAll('button'));
            const mapTypeButtons = Array.from(gmnoPrint.querySelectorAll('button.mapType'));
            const button = gmnoPrint.querySelector(`#${id}`);
            if (button) {
                mapButtons.forEach(button => {
                    button.style.fontWeight = 'normal';
                    button.classList.remove('font-bold');
                });
                button.style.fontWeight = '500';
                //button.classList.add('font-bold')
            }
            else {
                mapTypeButtons.forEach(button => {
                    button.style.fontWeight = 'normal';
                    button.classList.remove('font-bold');
                });
            }
        });
    }
    async prepareScreenShot({ map_container, mapHeight }) {
        this.$store.user.displayLoadingMessage =
            'Generando Captura de Pantalla';
        const previousWidth = map_container.getBoundingClientRect().width;
        map_container.style.height = `${2 * mapHeight}px`;
        map_container.style.width = `calc(${3 * previousWidth}px - 300px)`;
        map_container.querySelector('.corner_buttons').classList.add('hidden');
        google.maps.event.trigger(this.gmap, 'resize');
        await waitFor(500);
        const map_outer_container = document
            .querySelector('.map_outer_container');
        if (map_outer_container) {
            map_outer_container
                .classList?.add('animated');
        }
        this.gmap.setOptions({
            //@ts-ignore
            mapTypeControls: true,
            disableDefaultUI: true,
            mapId: null,
        });
        return this.screenShot().then(() => {
            this.gmap.setOptions({
                //@ts-ignore
                mapTypeControls: true,
                disableDefaultUI: false,
                mapId: '918f8abc9ae2727a',
            });
            if (map_outer_container)
                map_outer_container.classList.remove('animated');
            map_container.style.height = `${mapHeight}px`;
            map_container.style.width = `${previousWidth}px`;
            google.maps.event.trigger(this.gmap, 'resize');
            this.$store.user.displayLoadingMessage = null;
            map_container.querySelector('.corner_buttons').classList.remove('hidden');
            return;
        });
    }
    canvasToImg(selector, subselector) {
        jQuery(selector).find('.temp_image').remove();
        jQuery(selector)
            .find(subselector || 'canvas')
            .each(function () {
            var canvas = jQuery(this);
            if (!canvas.attr('id')) {
                canvas.attr('id', uuidv4());
            }
            var theid = canvas.attr('id');
            var src = canvas[0].toDataURL();
            var img = jQuery('<img/>');
            img
                .attr('src', src)
                .attr('class', 'temp_image')
                .attr('rel', theid)
                .attr('style', canvas.attr('style'));
            canvas.addClass('invisible').hide().parent().append(img);
            img.show();
        });
    }
    restoreCanvas(selector) {
        jQuery(selector)
            .find('.temp_image')
            .each(function () {
            var img = jQuery(this), canvasid = img.attr('rel'), canvas = jQuery('#' + canvasid);
            img.remove();
            canvas.show().removeClass('invisible');
        });
    }
    async screenShot() {
        var _this = this;
        jQuery('canvas', '.markerLayer').each(function (index) {
            jQuery(this).attr('id', 'canvas' + index);
        });
        var controlsToHide = jQuery('#map_controls, .btn-toolbar,.gm-fullscreen-control,.gm-bundled-control');
        var a = document.createElement('a');
        controlsToHide.addClass('invisible');
        jQuery('.table_outer_container').addClass('animated');
        google.maps.event.trigger(this.gmap, 'resize');
        //   this.canvasToImg('.overlayLayer', '.DotLayer');
        return new Promise((resolve, reject) => {
            google.maps.event.addListenerOnce(_this.gmap, 'tilesloaded', () => {
                screenShooter.html2canvas(document.querySelector('.map_outer_container'), {
                    useCORS: true,
                    allowTaint: false,
                    logging: false,
                })
                    .then((canvas) => {
                    jQuery('#table_outer_container').addClass('flash');
                    controlsToHide.removeClass('invisible');
                    if (jQuery('#clickphoto').length === 1) {
                        var audio = jQuery('#clickphoto')[0];
                        jQuery('.take-picture').fadeIn().delay(2000).fadeOut();
                    }
                    var dataUrl = canvas
                        .toDataURL('image/png')
                        .replace('image/png', 'image/octet-stream');
                    a.href = dataUrl;
                    a.target = '_blank';
                    a.download = 'lcdj_screenshot' + Date.now() + '.png';
                    document.body.appendChild(a);
                    //console.zdebug(a);
                    a.click();
                    this.gmap.set('styles', null);
                    _this.restoreCanvas('.overlayLayer');
                    //@ts-ignore
                    this.gmap && this.gmap.setZoom(this.gmap.getZoom() - 1);
                    return dataUrl;
                })
                    .then((dataUrl) => {
                    jQuery('#table_outer_container').removeClass('animated flash');
                    document.body.removeChild(a);
                    resolve(dataUrl);
                })
                    .catch((err) => {
                    _this.restoreCanvas('.overlayLayer');
                    console.zwarn(err);
                    reject(err);
                });
            });
            //@ts-ignore
            this.gmap.setZoom(this.gmap.getZoom() + 1);
            //@ts-ignore
            this.gmap.setCenter(this.gmap.getCenter());
            this.gmap.set('styles', defaultStyles);
        });
    }
}
//# sourceMappingURL=MapTypeListener.js.map