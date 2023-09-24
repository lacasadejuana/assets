export function addDraggableBehavior(container, handle) {
    let pos = { left: 0, x: 0, };
    handle = handle || container;
    console.log({
        container,
        handle
    });
    function mouseMoveHandler(e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        // Scroll the element
        container.scrollLeft = pos.left - dx;
        container.classList.add('moving_horizontal');
    }
    ;
    function mouseUpHandler() {
        handle.removeEventListener('mousemove', mouseMoveHandler);
        container.removeEventListener('mouseup', mouseUpHandler);
        handle.style.cursor = 'grab';
        container.classList.remove('grabbing_horizontal');
        handle.style.removeProperty('user-select');
    }
    ;
    function mouseDownHandler(e) {
        console.log(e);
        handle.style.cursor = 'grabbing';
        handle.style.userSelect = 'none';
        container.classList.add('grab_horizontal');
        pos = {
            // The current scroll
            left: container.scrollLeft,
            // Get the current mouse position
            x: e.clientX
        };
        handle.addEventListener('mousemove', mouseMoveHandler);
        container.addEventListener('mouseup', mouseUpHandler);
        container.classList.add('draggable_container');
    }
    ;
    console.info('adding draggable behavior', { container, handle });
    handle.addEventListener('mousedown', mouseDownHandler);
    return () => {
        console.warn('removing draggable behavior');
        container.classList.remove('moving_horizontal');
        handle.removeEventListener('mousedown', mouseDownHandler);
    };
}
//# sourceMappingURL=addDraggableBehavior.js.map