/* ========= sidebar toggle ======== */
export const sidebarComponent = () => {
    return {
        init() {
            this.sidebarNavWrapper = this.$el;
            if (!this.sidebarNavWrapper) {
                alert('no this.sidebarNavWrapper');
                return;
            }
            this.sidebarNavWrapper.classList.remove('no_transitions');
            this.mainWrapper = document.querySelector(".main-wrapper");
            if (this.mainWrapper)
                this.mainWrapper.classList.remove('no_transitions');
            this.menuToggleButton = document.querySelector("#menu-toggle");
            this.menuToggleButtonIcon = document.querySelector("#menu-toggle i");
            this.overlay = document.querySelector(".overlay");
            //@ts-ignore
            if (this.menuToggleButton && !this.menuToggleButton.hasListener) {
                this.menuToggleButton && this.menuToggleButton.addEventListener("click", (event) => globalThis.toggleSidebar(event));
                this.overlay && this.overlay.addEventListener("click", (e) => globalThis.toggleSidebar(new CustomEvent('click')));
                //@ts-ignore
                this.menuToggleButton.setAttribute('sidebar-listener', 'true');
            }
            /**
             * If the sizebar is shown, and my local
             * preferences mark it as hidden, hide it
             */
            const storedState = localStorage.getItem('sideBarClass'), className = 'active';
            let classList = this.sidebarNavWrapper.classList;
            this.sidebarNavWrapperShown = classList.contains(className);
            let shouldOpen = (storedState === 'expanded' && !this.sidebarNavWrapperShown), shouldClose = (storedState === 'collapsed' && this.sidebarNavWrapperShown);
            console.log(`storedState: ${storedState}, shouldOpen?: ${shouldOpen}, shouldClose?: ${shouldClose}`);
            if (shouldOpen || shouldClose) {
                globalThis.toggleSidebar(new CustomEvent('toggleSidebar'));
            }
        }
    };
};
//# sourceMappingURL=sidebarComponent.js.map