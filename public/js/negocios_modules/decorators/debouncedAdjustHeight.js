import Alpine from 'alpinejs';
globalThis.adjustHeight = () => {
    return async () => {
        let headerHeight = document.querySelector('.header.h-flat').clientHeight, outer_section = document.querySelector('#outer_section');
        //@ts-ignore
        outer_section.style.minHeight = `calc(100vh - ${headerHeight + 10}px)`;
        //@ts-ignore
        outer_section.querySelector('.container-fluid').style.minHeight = `calc(100vh - ${headerHeight + 10}px)`;
        const outer_container = document.querySelector('body > main #table_outer_container');
        const section = document.querySelector('body > main > section');
        if (outer_container && section) {
            section.classList.add('fixed_section');
            const computedScroll = outer_container.clientHeight - 116;
            if (globalThis.alpineBsTable)
                globalThis.alpineBsTable.resetHeight();
            console.log({ computedScroll });
            jQuery('#negocios_full_wrapper').css('height', computedScroll);
            jQuery('.negocios_compact_container .fixed-table-container.fixed-height')
                .css('max-height', computedScroll)
                .addClass(`max-h-[${computedScroll}px]`);
            jQuery('#table_container > div.bootstrap-table.bootstrap5 > div.fixed-table-container.fixed-height')
                .css('max-height', computedScroll)
                .addClass(`max-h-[${computedScroll}px]`);
            section.classList.remove('fixed_section');
        }
        let containerFluid = document.querySelector('section > .container-fluid');
        containerFluid.style.marginLeft = '0px !important';
        containerFluid.style.marginRight = '0px !important';
        const topScroll = document.querySelector('#topscroll'), negocios_full = document.querySelector('#negocios_full');
        if (topScroll && negocios_full) {
            topScroll.querySelector('img').style.width = negocios_full.clientWidth + 'px';
        }
    };
};
export const debouncedAdjustHeight = Alpine.debounce(globalThis.adjustHeight(), 1000);
globalThis.debouncedAdjustHeight = debouncedAdjustHeight;
//# sourceMappingURL=debouncedAdjustHeight.js.map