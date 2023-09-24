const normalizeText = (text) => {
    return (text || '').trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/_-/g, ' ');
};
export function turnOffLabelParents(label, searchValue) {
    let parentElement = label.parentElement, accordion_item = parentElement.closest('.accordion-item'), accordion_collapse = parentElement.closest('.accordion-collapse'), save_section = accordion_item.querySelector('.save_section'), normalizedSearchValue = normalizeText(searchValue);
    if (!normalizedSearchValue) {
        label.classList.remove('match_search');
        parentElement.classList.remove('hidden');
        accordion_item.classList.remove('opacity-25');
        save_section.classList.remove('hidden');
        return label;
    }
    parentElement.classList.add('hidden');
    save_section.classList.add('hidden');
    if (accordion_collapse.classList.contains('show')) {
        accordion_collapse.classList.remove('show');
        accordion_collapse.classList.add('x-show');
    }
    //max-h-[4rem]
    accordion_item.classList.add('opacity-25');
    let normalizedLabelContent = normalizeText(label.getAttribute('for')), firstSpanContent = label.querySelector('span') ? normalizeText(label.querySelector('span').textContent) : '', nextLabelContent = '', nextElementSibling = label.nextElementSibling, nextElementLabel = label.nextElementSibling.querySelector('label');
    if (nextElementLabel && nextElementLabel.classList.contains('form-check-label')) {
        nextLabelContent = normalizeText(nextElementLabel.textContent);
    }
    if (normalizedLabelContent.includes(normalizedSearchValue)
        || firstSpanContent.includes(normalizedSearchValue)
        || nextLabelContent.includes(normalizedSearchValue)) {
        label.classList.add('match_search');
    }
    return label;
}
export function turnOffSectionLabels(section, searchValue) {
    //@ts-ignore
    for (let xlabel of section.querySelectorAll('.x-label')) {
        turnOffLabelParents(xlabel, searchValue);
    }
}
export function turnOnMatchedLabels(section, searchValue) {
    //@ts-ignore
    for (let label of section.querySelectorAll('.x-label.match_search')) {
        let parentElement = label.parentElement, accordion_collapse = parentElement.closest('.accordion-collapse'), accordion_item = parentElement.closest('.accordion-item'), save_section = accordion_item
            .querySelector('.save_section');
        if (accordion_collapse.classList.contains('x-show')) {
            accordion_collapse.classList.remove('x-show');
            accordion_collapse.classList.add('show');
        }
        label.classList.remove('match_search');
        parentElement.classList.remove('hidden');
        save_section.classList.remove('hidden');
        accordion_item.classList
            .remove('opacity-25');
    }
}
/***
 * This function performs the manipulation of elements visibility and classes when running a search
 * operation on the negocio edit screen
 * @param {string} searchValue
 * @returns {void}
 */
export function editNegocioFilterInputs(searchValue) {
    //@ts-ignore
    for (let section of document.querySelectorAll('.accordion-item')) {
        turnOffSectionLabels(section, searchValue);
        turnOnMatchedLabels(section, searchValue);
    }
}
//# sourceMappingURL=editNegocioFilterInputs.js.map