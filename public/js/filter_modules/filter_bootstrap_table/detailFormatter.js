import { Wrapper } from '../../negocios_modules/map_modules/Wrapper';
export function detailFormatter(index, row, $element) {
    let keyOrder = {
        name: 1,
        author: 2,
        created_at: 5,
        updated_at: 5,
        public: 5,
        columnas_visibles: 6,
        cant_filtros: 6,
        estimate: 6
    }, reemplazos = {
        categoria: '<i class="text-gray-400 fab fa-elementor mr-2"></i><span> Categoría</span>',
        author: '<i class="text-gray-400 fa fa-user mr-2"></i><span> Autor</span>',
        updated_at: '<i class="text-gray-400 fas fa-calendar mr-2"></i><span> F. Modificación</span>',
        public: '<i class="text-gray-400 fa fa-lock-open  mr-2">&nbsp;</i> <span>Público</span>',
        cant_filtros: '<i class="text-gray-400 fas fa-filter mr-2"></i><span> Filtros</span>',
        areas_subareas: '<i class="text-gray-400 fas fa-sitemap mr-2"></i><span> Áreas o Subáreas</span>',
        created_at: '<i class="text-gray-400 fa fa-calendar mr-2"></i><span> F. Creación</span>',
        name: '<i class="text-gray-400 fas fa-edit mr-2"></i><span> Nombre</span>',
        estimate: '<i class="text-gray-400 fas fa-bars mr-2"></i><span> Registros</span>',
        columnas_visibles: '<i class="text-gray-400 fa fa-columns mr-2"></i><span> Columnas Visibles</span>',
    }, hiddenProps = ['opt_group', 'id', 'user_id', 'extra_attributes', 'query_string', 'user'];
    console.log({ reemplazos });
    const getContainer = () => {
        return new Wrapper('flex justify-space-between flex-wrap mb-2 pb-2')
            .addStyle('lineHeight', '1.5em')
            .addStyle('fontSize', '13px')
            .addStyle('fontFamily', 'Inter, sans-serif')
            .addStyle('fontWeight', '400')
            .addStyle('justifyContent', 'space-around');
    };
    const rowProcessor = (container) => {
        return ([key, value]) => {
            if (hiddenProps.includes(key))
                return;
            if (key === 'created_at' || key === 'updated_at') {
                try {
                    //@ts-ignore
                    value = new Date(value).toLocaleString('es-CL').replace(',', '').substr(0, 16);
                }
                catch (e) {
                }
            }
            let wrapper = new Wrapper('flex mt-1  justify-start w-half align-items-center ' + key);
            wrapper.addStyle('minWidth', '45%')
                .addStyle('maxWidth', '45%');
            let keyWrapper = new Wrapper('ml-2 pt-1 h-6 flex align-items-center min-w-[155px]  pl-2 ')
                .addStyle('fontFamily', 'Inter, sans-serif')
                .addStyle('fontWeight', '400')
                .addStyle('lineHeight', '1.5em');
            let keyname = (reemplazos || {})[key] || key;
            if (key === 'public' && value === false) {
                keyname = keyname.replace('fa-lock-open', 'fa-lock');
            }
            keyWrapper
                .setInnerHTML(keyname.substr(0, 1).toUpperCase() + keyname.slice(1).replace(/_/g, ' '));
            keyWrapper.appendTo(wrapper.div);
            let valueWrapper = new Wrapper('py-0 h-6 flex align-items-center  pl-2 max-w-[350px] min-w-[200px] flex-grow overflow-hidden whitespace-nowrap')
                .addStyle('fontFamily', 'Inter, sans-serif')
                .addStyle('minWidth', 'calc(100% - 165px)')
                .addStyle('fontSize', (key === 'name' ? '1.15em' : '1em'))
                .addStyle('fontWeight', '500');
            if (key === 'public') {
                valueWrapper.setInnerHTML(value === true ? '<i class="fa mt-1 fa-check text-success"></i>' : '<i class="fa mt-1 fa-times text-gray-400"></i>');
            }
            else {
                valueWrapper.setTextContent(String(value ?? ''));
            }
            valueWrapper.appendTo(wrapper.div);
            wrapper.addStyle('order', keyOrder[key] || '3')
                .appendTo(container.div);
        };
    };
    const areasSubAreasProcessor = (container) => {
        return ([key, value]) => {
            let wrapper = new Wrapper('flex mt-1  justify-start w-full align-items-center ' + key);
            wrapper.addStyle('minWidth', '100%');
            let keyWrapper = new Wrapper('ml-2 pt-1 h-6 flex align-items-center min-w-[155px]  pl-2 ')
                .addStyle('fontFamily', 'Inter, sans-serif')
                .addStyle('fontWeight', '400')
                .addStyle('lineHeight', '1.5em');
            let keyname = (reemplazos || {})[key] || key;
            keyWrapper
                .setInnerHTML(keyname.substr(0, 1).toUpperCase() + keyname.slice(1).replace(/_/g, ' '));
            keyWrapper.appendTo(wrapper.div);
            let valueWrapper = new Wrapper('py-0 h-6 flex align-items-center  pl-2  min-w-[200px] flex-grow  ')
                .addStyle('fontFamily', 'Inter, sans-serif')
                .addStyle('minWidth', 'calc(100% - 165px)')
                .addStyle('fontWeight', '500');
            console.info({ areas_subareas: value });
            const areasArray = (value || 'N/A').split(', ');
            let areas = Array.from(new Set(areasArray.map(area => area.replace('Subarea', 'Sub.').replace('Area', '').replace('Área', '').trim()))), areasLine1 = areas.slice(0, Math.ceil(areas.length / 2)), areasLine2 = areas.slice(Math.ceil(areas.length / 2), areas.length);
            valueWrapper.setInnerHTML(areasLine1.join(', ') + '<br>' + areasLine2.join(', '));
            valueWrapper.appendTo(wrapper.div);
            wrapper.addStyle('order', keyOrder[key] || '3')
                .appendTo(container.div);
        };
    };
    const filterProcessor = (container) => {
        return ([key, value]) => {
            const filtrosArray = value.map(f => {
                f.valor_stringified = JSON.stringify(f.valor_busqueda);
                return f;
            });
            let wrapper = new Wrapper('flex mt-2  justify-start w-full align-items-center ' + key);
            wrapper.addStyle('minWidth', '100%');
            let keyWrapper = new Wrapper('ml-2 pt-1  flex align-items-center min-w-[155px]  pl-2 ')
                .addStyle('fontFamily', 'Inter, sans-serif')
                .addStyle('fontWeight', '400')
                .addStyle('minHeight', (filtrosArray.length || 1) * 30 + 'px')
                .addStyle('lineHeight', '1.5em');
            let filterValueWrapper = new Wrapper('ml-2 pt-1  flex align-items-center min-w-[555px]  pl-2 ')
                .addStyle('fontFamily', 'Inter, sans-serif')
                .addStyle('fontWeight', '400')
                .addStyle('lineHeight', '1.5em');
            /**
             * Row title
             */
            let keyname = (reemplazos || {})[key] || key;
            keyWrapper
                .setInnerHTML(keyname.substr(0, 1).toUpperCase() + keyname.slice(1).replace(/_/g, ' '));
            keyWrapper.appendTo(wrapper.div);
            let valueWrapper = new Wrapper('py-0  flex flex-col align-items-center  pl-2  min-w-[200px] flex-grow  ')
                .addStyle('fontFamily', 'Inter, sans-serif')
                .addStyle('minWidth', 'calc(100% - 165px)')
                .addStyle('height', filtrosArray.length * 30 + 'px')
                .addStyle('fontWeight', '500');
            console.log({ filtrosArray });
            console.table(filtrosArray, ['campo_busqueda', 'conector', 'operation', 'valor_stringified']);
            if (filtrosArray.length === 0) {
                let filtroContainer = `<div class="flex w-full h-8 ">
                Sin filtros
                </div>`;
                valueWrapper.div.appendChild($(filtroContainer)[0]);
            }
            else {
                filtrosArray.forEach(filtro => {
                    let { campo_busqueda, conector, operation, valor_stringified } = filtro;
                    let filtroContainer = `<div class="flex w-full h-8 ">
                <input type="text" value="${conector}" class="border border-gray-300 rounded-md px-2 py-1 mb-1 w-14" readonly>
                <input type="text" value="${campo_busqueda.split(',')[0]}" class="border border-gray-300 rounded-md px-2 py-1 mb-1" readonly>
                <input type="text" value="${operation}" class="border border-gray-300 rounded-md px-2 py-1 mb-1" readonly>
                <pre   class="border border-gray-300 bg-white rounded-md px-2 py-1 mb-1 flex flex-grow min-w-fit" >${valor_stringified}</pre>
                </div>`;
                    valueWrapper.div.appendChild($(filtroContainer)[0]);
                });
            }
            ///  valueWrapper.setInnerHTML(areasLine1.join(', ') + '<br>' + areasLine2.join(', '))
            valueWrapper.appendTo(filterValueWrapper.div);
            filterValueWrapper.appendTo(wrapper.div);
            wrapper.addStyle('order', keyOrder[key] || '3')
                .appendTo(container.div);
        };
    };
    let topContainer = getContainer(), middleContainer = getContainer(), bottomContainer = getContainer(), finalContainer = getContainer();
    const group2 = ['estimate', 'columnas_visibles', 'updated_at', 'created_at'];
    /**
     * Append every key-value pair except those in group2 OR equal to `areas_subareas` to container1
     */
    Object.entries(row).filter(([key, value]) => key != 'areas_subareas' && key != 'columnas_actuales' && key != 'filtros' && !group2.includes(key)).forEach(rowProcessor(topContainer));
    Object.entries(row).filter(([key, value]) => key == 'areas_subareas')
        .forEach(areasSubAreasProcessor(middleContainer));
    Object.entries(row).filter(([key, value]) => group2.includes(key)).forEach(rowProcessor(bottomContainer));
    Object.entries(row).filter(([key, value]) => key == 'columnas_actuales')
        .forEach(areasSubAreasProcessor(finalContainer));
    Object.entries(row).filter(([key, value]) => key == 'filtros')
        .forEach(filterProcessor(finalContainer));
    let mainWrapper = new Wrapper('flex my-2  w-full pl-4 ml-2  flex-col');
    mainWrapper.addStyle('minWidth', '100%');
    topContainer
        .addClass('grid')
        .addClass('grid-cols-2')
        .appendTo(mainWrapper.div);
    middleContainer.appendTo(mainWrapper.div)
        .addClass('-mt-2')
        .addClass('pt-3')
        .addStyle('borderTop', '1px solid #eee')
        .appendTo(mainWrapper.div);
    bottomContainer
        .addClass('grid')
        .addClass('grid-cols-2')
        .addClass('-mt-2')
        .addClass('pt-3')
        .addStyle('borderTop', '1px solid #eee')
        .appendTo(mainWrapper.div);
    finalContainer
        .addClass('-mt-2')
        .addClass('pt-3')
        .addStyle('borderTop', '1px solid #eee')
        .appendTo(mainWrapper.div);
    return mainWrapper.div.outerHTML;
}
//# sourceMappingURL=detailFormatter.js.map