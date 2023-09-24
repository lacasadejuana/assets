import { ifDefined, waitFor } from "..";
import { initDropdownsBs } from "./initDropdownsBs";
export function hideOnClickOutside(dropDownMenu) {
    const outsideClickListener = (event) => {
        const $target = $(event.target);
        if (!$target.closest(dropDownMenu).length && dropDownMenu.hasClass('show')) {
            dropDownMenu.removeClass('show');
            removeClickListener();
        }
    };
    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
}
export function loadPartial(endpoint, options = {}) {
    let { display_filters_accordion = false, container_selector = '#barebone_container', pushState = true, clear_container = true } = options;
    let endpointurl = new URL(endpoint, window.location.origin);
    let currentClassSlug = location.pathname.replace(/\//g, '_'), nextClassslug = endpointurl.pathname.replace(/\//g, '_'), mainSelector = document.querySelector('main');
    endpointurl.searchParams.set('barebone', 'true');
    //const navigatingToSelector = $('#navigating_to')
    // navigatingToSelector.html('<span><div class="p-1">url:  <b>' + endpointurl.pathname + '</b></div></span>')
    let t_ini = performance.now(), t_ini_2 = Date.now();
    let container = $(container_selector), barebone_container = document.querySelector(container_selector);
    container.addClass('opacity-50');
    //@ts-ignore
    if ($store && $store.active_filter) {
        //@ts-ignore
        $store.active_filter.display_filters_accordion = display_filters_accordion;
        //@ts-ignore
        $store.active_filter.reloadAvailableFilters().then(() => {
            //@ts-ignore
            if ($store.active_filter.id) {
                //@ts-ignore
                $store.active_filter.setActive();
            }
        });
    }
    return Promise.all([
        fetch(endpointurl.toString(), {
            method: 'get',
            headers: {
                'cache-control': 'no-cache',
                'accept': 'text/html',
            }
        }),
        waitFor(100)
    ]).then(([res, _]) => {
        console.colorInfo('#C00', 'loadPartial', endpointurl.pathname);
        // Cleanup contents and x-teleports
        endpointurl.searchParams.delete('barebone');
        $('#search_contextual').empty();
        Array.from(barebone_container.children).forEach(element => element.remove());
        if (clear_container)
            container.empty();
        return Promise.all([res.text(), waitFor(100)]);
    }).then(([html, _]) => {
        if (pushState) {
            ifDefined(mainSelector, (mainSlc) => {
                mainSlc.classList.remove(currentClassSlug);
                mainSlc.classList.add(nextClassslug);
            });
            if (globalThis.$store && globalThis.$store.user) {
                globalThis.$store.user.connect();
            }
            history.pushState({ pathname: location.pathname, url: location.href }, '', endpointurl.toString());
        }
        if (clear_container) {
            barebone_container.innerHTML = html;
        }
        else {
            container.append($(html));
        }
        setTimeout(() => {
            initDropdownsBs(barebone_container);
        }, 1500);
        container.removeClass('opacity-50');
        //navigatingToSelector.find('span').append(`<div class="p-1">time: <b>${((t_fin - t_ini)).toFixed(2)}ms</b></div>`)
        //@ts-ignore
        if ($store && $store.user)
            $store.user.pathname = endpointurl.pathname;
        // Alpine.initTree(document.querySelector('#barebone_container'))
    }).catch(err => {
        if (err.status && err.status == 401) {
            endpoint.pathname = '/logout';
            location.href = endpoint.toString();
        }
    });
}
//# sourceMappingURL=loadPartial.js.map