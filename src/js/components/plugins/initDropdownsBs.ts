export function initDropdownsBs(container: HTMLElement) {

    var dropdownElementList = [].slice.call($(container)[0].querySelectorAll('.dropdown-toggle'));
    console.info('initializing ' + dropdownElementList.length + ' dropdowns');
    dropdownElementList.forEach(function (dropdownToggleEl) {

        let dropdown_initialized = dropdownToggleEl.dataset.dropdown_initialized;
        if (dropdown_initialized || dropdownToggleEl.classList.contains('skip-dropdown')) return;
        let jqSelector = $(dropdownToggleEl);
        //@ts-ignore
        const dropdown = new bootstrap.Dropdown(jqSelector);
        jqSelector.data('drowndrop', dropdown)
        if (dropdown) {
            dropdownToggleEl.dataset.dropdown_initialized = true;

            jqSelector.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                jqSelector.dropdown('toggle');
            });
        } else {
            console.warn('dropdown not initialized', jqSelector)
        }
    });
    jQuery('.toolbar_parent').on('click', '.dropdown-toggle', function (e) {

    })

}


export function initDropdownsjQ(container: HTMLElement) {

    var dropdownElementList = [].slice.call($(container)[0].querySelectorAll('.dropdown-toggle'));
    dropdownElementList.forEach(function (dropdownToggleEl) {
        console.info('initializing ', dropdownToggleEl);

        let dropdown_initialized = dropdownToggleEl.dataset.dropdown_initialized;
        if (dropdown_initialized || dropdownToggleEl.classList.contains('skip-dropdown')) return;

        //@ts-ignore
        const dropdown = new bootstrap.Dropdown($(dropdownToggleEl));
        if (dropdown) {
            dropdownToggleEl.dataset.dropdown_initialized = true;

            $(dropdownToggleEl).on('click', function (e) {
                e.preventDefault();
                dropdown.toggle();
            });
        } else {
            console.warn('dropdown not initialized', dropdownToggleEl)
        }
    });

}
