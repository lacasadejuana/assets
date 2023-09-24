export function areasFormatter(value) {
    const areasArray = (value || 'N/A').split(', ');
    let areasUnique = Array.from(new Set(areasArray.map(area => area.replace('Subarea', 'Sub.').replace('Area', '').replace('Área', '').trim()))), areasLi = areasUnique.map(area => `<li>${String(area).trim()}</li>`);
    return `<div class="py-2 inner-cell -my-2 capitalize min-w-[200px] max-h-[180px]" style="white-space:break-spaces">${areasUnique.join(', ')}</div>`;
}
;
export function areasDetailFormatter(value) {
    const areasArray = (value || 'N/A').split(', ');
    let areasUnique = Array.from(new Set(areasArray.map(area => area.replace('Subarea', 'Sub.').replace('Area', '').replace('Área', '').trim()))), areasLi = areasUnique.map(area => `<li>${String(area).trim()}</li>`);
    return areasLi;
}
;
//# sourceMappingURL=areasFormatter.js.map