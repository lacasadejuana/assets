
function getTranslateX(myElement: Element) {
    var style = window.getComputedStyle(myElement);
    var matrix = new WebKitCSSMatrix(style.transform);
    return matrix

}

export function transformableBehavior(container: HTMLElement, handle?: HTMLElement) {
    let pos = { left: 0, x: 0, top: 0, y: 0 };
    handle = handle || container;
    let initialBoundingRect = container.getBoundingClientRect();
    //{x: 0, y: 0, width: 0, height: 0, top: 0, bottom:0}
    let minTx = -1 * initialBoundingRect.x,
        minTy = -1 * initialBoundingRect.y,
        maxTy = window.innerHeight - (initialBoundingRect.y + initialBoundingRect.height),
        maxTx = window.innerWidth - (initialBoundingRect.x + initialBoundingRect.width);

    console.log({ initialBoundingRect })
    let style = {
        'border': '0 none !important',
        'font-size': ' small',
        'left': '-10px',
        'top': '-0.5em',
        'background-color': 'transparent',
    }

    function mouseMoveHandler(e) {
        if (e.buttons == 0) return mouseUpHandler(e)
        let { clientX, clientY } = e;
        let { x, y, top, left } = pos
        // How far the mouse has been moved
        const dx = clientX - x;
        const dy = clientY - y;
        // Scroll the element
        const tx = Math.min(Math.max(minTx, dx + left), maxTx);
        const ty = Math.min(Math.max(minTy, dy + top), maxTy);
        const translate = `translate(${tx}px, ${ty}px)`;
        //console.log({ maxTx, maxTy, translate })

        container.style.transform = translate;

    };
    function mouseUpHandler(e) {
        handle.removeEventListener('mousemove', mouseMoveHandler);
        container.removeEventListener('mouseup', mouseUpHandler);
        container.dispatchEvent(new CustomEvent('transformed', {
            detail: { transform: container.style.transform }
        }));
        // How far the mouse has been moved
        handle.style.cursor = 'grab';
        container.classList.remove('grabbing_horizontal');
        handle.style.removeProperty('user-select');

    };
    function mouseDownHandler(e) {
        console.log(e)
        handle.style.cursor = 'grabbing';
        handle.style.userSelect = 'none';
        container.classList.add('grab_horizontal');
        let tranform = getTranslateX(container);

        initialBoundingRect = container.getBoundingClientRect();
        minTx = -1 * initialBoundingRect.x
        minTy = -1 * initialBoundingRect.y
        maxTy = window.innerHeight - (initialBoundingRect.y + initialBoundingRect.height)
        maxTx = window.innerWidth - (initialBoundingRect.x + initialBoundingRect.width);

        pos = {
            // The current scroll
            left: tranform.m41,
            top: tranform.m42,
            y: e.clientY,

            // Get the current mouse position
            x: e.clientX
        };
        console.log({ maxTy, maxTx })

        handle.addEventListener('mousemove', mouseMoveHandler);
        container.addEventListener('mouseup', mouseUpHandler);
        container.classList.add('draggable_container');
    };
    console.info('adding draggable behavior', { container, handle, maxTy, maxTx });
    handle.addEventListener('mousedown', mouseDownHandler);

    return () => {
        console.warn('removing draggable behavior')
        container.classList.remove('moving_horizontal');
        handle.removeEventListener('mousedown', mouseDownHandler);
    }
}


