import { instanceAutoCompleter } from '../negocios_modules/map_modules';
import { loadScripts, requestAnimationPromise } from "../components/plugins";
import slugify from "slugify";
export function declareAlpineDirectives(Alpine) {
    Alpine.magic("slugify", (el) => {
        return slugify;
    });
    Alpine.directive('destroy', (el, { expression }, { evaluateLater, cleanup }) => {
        const clean = evaluateLater(expression);
        //console.log({ el, expression })
        cleanup(() => clean());
    });
    Alpine.directive('uppercase', el => {
        el.textContent = el.textContent.toUpperCase();
    });
    Alpine.directive('tomselect', (el, { value, modifiers, expression }, { evaluate }) => {
        //@ts-ignore
        const instance = new TomSelect(el, evaluate(expression));
        //@ts-ignore
        console.zinfo({ event: 'x-tomselect', el, expression });
    });
    function phoneToPrettyPhone(phone) {
        if (phone && /(\+*5*6*){0,1}([1-9])(\d{4})(\d{4})/.exec(phone
            .replace(/\s/g, ''))) {
            let [_, code, prefix, group1, group2] = /(\+*5*6*){0,1}([1-9])(\d{4})(\d{4})/.exec(phone.replace(/\s/g, ''));
            phone = ['+56', prefix, group1, group2].join(' ');
        }
        return phone;
    }
    globalThis.phoneToPrettyPhone = phoneToPrettyPhone;
    Alpine.directive('prettyphone', (el, { value, modifiers, expression }, { evaluate }) => {
        let options = evaluate(expression) || {}, input = (options.input || el);
        input.addEventListener('change', (e) => {
            //@ts-ignore
            e.target.value = phoneToPrettyPhone(e.target.value);
        });
    });
    Alpine.directive('address_autocompleter', (el, { value, modifiers, expression }, { evaluate }) => {
        let options = evaluate(expression) || {};
        let input = (options.input || el), targetObject = options.targetObject || {}, onPlaceChanged = options.onPlaceChanged;
        instanceAutoCompleter(input, (reducedComponents) => {
            let { formatted_address, direccion, comuna, lat, lng } = reducedComponents;
            //@ts-ignore
            reducedComponents.direccion = formatted_address || reducedComponents.direccion;
            console.log({ reducedComponents, onPlaceChanged });
            if (onPlaceChanged) {
                onPlaceChanged(reducedComponents);
            }
            else {
                targetObject.direccion = reducedComponents.direccion;
                targetObject.comuna = comuna;
                targetObject.lat = lat;
                targetObject.lng = lng;
            }
        });
    });
    Alpine.directive('delay', (el, { value, modifiers, expression }, { evaluate }) => {
        let template = el;
        const x_if = template.getAttribute('x-if'), x_data = template.getAttribute('x-data'), delay = parseInt(evaluate(expression), 10) || 0;
        if ((template.tagName !== 'TEMPLATE') || !delay || x_if || x_data)
            return;
        template.setAttribute('x-if', "delayComplete");
        template.setAttribute('x-data', `{
            delayComplete:false,
            async init() {
               waitFor(${delay}).then(()=>{
                this.delayComplete = true
               });
            }
        }`);
    });
    /**
     * Given an index and a purpose, it sets the name of the element
     * to something like filtros[0][campo_busqueda] or filtros[1][valor_busqueda][]
     */
    Alpine.directive('namefor', (el, { value, modifiers, expression }, { evaluate }) => {
        value = value || 'filtros';
        let multi = modifiers.includes('multi') ? '[]' : '', purpose = modifiers.map(f => f.replace(`:${value}`, '')).filter(f => f !== 'multi').join('_');
        //console.info({ value, purpose, modifiers })
        //@ts-ignore
        el.name = `${value}[${evaluate(expression)}][${purpose}]${multi}`;
    });
    Alpine.directive('load_datatable', (el, { value, modifiers, expression }, { evaluate }) => {
        console.info({ event: 'load_datatable', el, value, modifiers, expression });
        if (typeof $(el).bootstrapTable === 'function') {
            console.marquee({
                [Number(performance.now() / 1000).toFixed(1)]: '#33CC33',
                [String('load_datatable')]: '#33AA11',
                'bootstrap-table already loaded': '',
                //@ts-ignore
            });
            el._x_dataStack[0].dtt_loaded = true;
        }
        else {
            loadScripts([{ id: 'jspdf', src: '/js/vendor/bootstrap-table/jspdf.min.js' },
                { id: 'jspdf_autotable', src: '/js/vendor/bootstrap-table/jspdf.plugin.autotable.js' },
                { id: 'table_export', src: '/js/vendor/bootstrap-table/tableExport.min.js' },
                { id: 'bs_table', src: '/js/vendor/bootstrap-table/bs_table.js' }
            ]).then(() => {
                el._x_dataStack[0].dtt_loaded = true;
            });
        }
    });
    Alpine.directive('load_datatable_2', (el, { value, modifiers, expression }, { evaluate }) => {
        const importFn = evaluate(expression) || (() => requestAnimationPromise().then(() => el._x_dataStack[0].dtt_loaded = true)), promises = [];
        if (typeof $(el).bootstrapTable === 'function') {
            console.marquee({
                [Number(performance.now() / 1000).toFixed(1)]: '#33CC33',
                [String('load_datatable')]: '#33AA11',
                'bootstrap-table already loaded': '',
                //@ts-ignore
            });
            promises.push(importFn());
        }
        else {
            promises.push(loadScripts([{ id: 'jspdf', src: '/js/vendor/bootstrap-table/jspdf.min.js' },
                { id: 'jspdf_autotable', src: '/js/vendor/bootstrap-table/jspdf.plugin.autotable.js' },
                { id: 'table_export', src: '/js/vendor/bootstrap-table/tableExport.min.js' },
                { id: 'bs_table', src: '/js/vendor/bootstrap-table/bs_table.js' }
            ]));
            promises.push(importFn());
        }
        Promise.all(promises).then(() => {
            setTimeoutdtt_loaded: el._x_dataStack[0].dtt_loaded = true;
            console.info({ event: 'load_datatable', dtt_loaded: el._x_dataStack[0].dtt_loaded, importFn });
        });
    });
}
//# sourceMappingURL=alpine.directives.js.map