"use strict";
(() => {
  // resources/js/negocios_modules/fetch_negocios.ts
  var fetchNegocios = async () => {
    const tokenElement = document.querySelector(
      '[name="_token"]'
    );
    if (!tokenElement)
      throw new Error('no element matching [name="_token"]');
    if (!globalThis.backendPaginator || !globalThis.backendPaginator.total) {
      console.warn("globalThis.backendPaginator is not defined");
      return [];
    }
    console.timerInfo("Firing fetchNegocios");
    const limit = globalThis.backendPaginator.total + 12;
    if (isNaN(limit)) {
      const json = () => ({
        current_page: 1,
        data: [],
        first_page_url: location.origin + "/api/negocios?page=1&exp=1&dtt=1&limit=1&skip=0",
        from: 1,
        last_page: 13,
        last_page_url: null
      });
      return json;
    }
    let negocios_url = new URL(location.origin);
    negocios_url.pathname = "/api/negocios";
    negocios_url.searchParams.set(
      "skip",
      globalThis.backendPaginator.data.length.toString()
    );
    negocios_url.searchParams.set("limit", limit.toString());
    negocios_url.searchParams.set("exp", "1");
    negocios_url.searchParams.set("dtt", "1");
    negocios_url.searchParams.set("page", "1");
    console.time("fetch " + limit + " records");
    const token = tokenElement.value;
    return fetch(negocios_url.toString(), {
      headers: {
        "Content-Type": "application/json",
        expect: "application/json",
        "X-CSRF-TOKEN": token
      }
    }).then((res) => {
      console.timerInfo("fetchNegocios complete");
      return res;
    });
  };
  var fetch_negocios_default = fetchNegocios;
  globalThis.fetchNegocios = fetchNegocios;
})();
