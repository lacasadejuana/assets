import Alpine from 'alpinejs';
function toggleSidebarOriginal(event) {
    const sidebarNavWrapper = document.querySelector(".sidebar-nav-wrapper");
    const mainWrapper = document.querySelector("#main");
    if (sidebarNavWrapper && mainWrapper) {
        const className = 'active';
        sidebarNavWrapper.classList.toggle("active");
        const sidebarNavWrapperShown = sidebarNavWrapper.classList.contains(className), storedState = sidebarNavWrapperShown ? 'expanded' : 'collapsed';
        console.info('storedState is:' + storedState + ' sidebarNavWrapperShown ' + sidebarNavWrapperShown);
        //@ts-ignore
        if (sidebarNavWrapperShown) {
            sidebarNavWrapper.classList.remove('collapsed');
            mainWrapper.classList.add(className);
        }
        else {
            mainWrapper.classList.remove(className);
            sidebarNavWrapper.classList.remove(className);
        }
        if (event.type !== 'click') {
            console.warn('not a click event', event.type);
            return;
        }
        localStorage.setItem('sideBarClass', storedState);
    }
}
;
const toggleSidebar = Alpine.debounce(toggleSidebarOriginal, 200);
export { toggleSidebar };
//# sourceMappingURL=toggleSidebar.js.map