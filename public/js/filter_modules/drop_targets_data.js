/// <reference types="alpinejs" />
export const dropTargetsData = () => ({
    init() {
        setTimeout(() => {
            globalThis.Sortable.create(this.$el, {
                //handle: '.condition_handle',
                animation: 150,
                group: 'filters',
                draggable: '.condition_row',
                // filter: '.condition_section',
                // preventOnFilter: true,
                direction: 'vertical',
                onEnd: (evt) => {
                    let { to, from, oldIndex, newIndex } = evt;
                    let oldindexes = Array.from(document.querySelectorAll('.condition_row')).map(div => Number(div.dataset.index));
                    let filterElement = Array.from(to.querySelectorAll('.condition_row'))[newIndex];
                    let removeAtIndex = oldIndex ?? filterElement.dataset.index, insertAtIndex = newIndex ?? oldindexes.indexOf(Number(removeAtIndex));
                    if (filterElement) {
                        removeAtIndex = filterElement.dataset.index;
                        insertAtIndex = oldindexes.indexOf(Number(removeAtIndex));
                    }
                    console.info({ removeAtIndex, insertAtIndex, filterElement });
                },
            });
        }, 1000);
    }
});
export default dropTargetsData;
//# sourceMappingURL=drop_targets_data.js.map