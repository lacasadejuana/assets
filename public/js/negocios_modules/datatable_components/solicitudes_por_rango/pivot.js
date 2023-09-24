import ScrollBooster from "scrollbooster";
import { sprColumns } from "./sprColumns";
export const pivot = {
    get pivotOptions() {
        return {
            //@ts-ignore
            cols: sprColumns.filter(c => c.quantity_column).map(column => {
                return column.field;
            }),
            rows: [
                'tipo_negocio',
                'tipo_propiedad'
            ]
        };
    },
    createPivotScrollBooster() {
        let pvtRendererArea = $('#pivot_container .pvtRendererArea')[0];
        pvtRendererArea.style.maxWidth = '100vw';
        pvtRendererArea.style.overflow = 'auto';
        //@ts-ignore
        const scrollBooster = new ScrollBooster({
            viewport: $("#pivot_container .pvtRendererArea")[0],
            content: $('#pivot_container .pvtRendererArea table')[0],
            direction: 'horizontal',
            scrollMode: 'native',
            friction: 0.01,
            bounce: false,
            allowTextSelection: true,
            bounceForce: 0.00
        });
        //@ts-ignore
        $("#pivot_container").scrollBooster = scrollBooster;
        return scrollBooster;
    },
    initPivot(negociosData) {
        setTimeout(() => this.createPivotScrollBooster(), 2000);
        //@ts-ignore
        var tpl = $.pivotUtilities.aggregatorTemplates;
        //@ts-ignore
        return $("#pivot_container").pivotUI(negociosData);
    }
};
//# sourceMappingURL=pivot.js.map