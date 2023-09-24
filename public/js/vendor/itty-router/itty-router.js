
// resources/js/components/plugins/itty-router.ts
const Router = ({ base = "", routes = [] } = {}) => (
  // @ts-expect-error TypeScript doesn't know that Proxy makes this work
  {
    __proto__: new Proxy({}, {
      // @ts-expect-error (we're adding an expected prop "path" to the get)
      get: (target, prop, receiver, path) => (route, ...handlers) => routes.push(
        [
          prop.toUpperCase(),
          RegExp(`^${(path = (base + route).replace(/\/+(\/|$)/g, "$1")).replace(/(\/?\.?):(\w+)\+/g, "($1(?<$2>*))").replace(/(\/?\.?):(\w+)/g, "($1(?<$2>[^$1/]+?))").replace(/\./g, "\\.").replace(/(\/?)\*/g, "($1.*)?")}/*$`),
          handlers,
          // embed handlers
          path
          // embed clean route path
        ]
      ) && receiver
    }),
    routes,
    async handle(request, ...args) {
      let response, match, url = new URL(request.url), query = request.query = { __proto__: null };
      for (let [k, v] of url.searchParams) {
        query[k] = query[k] === void 0 ? v : [query[k], v].flat();
      }
      for (let [method, regex, handlers, path] of routes) {
        if ((method === request.method || method === "ALL") && (match = url.pathname.match(regex))) {
          request.params = match.groups || {};
          request.route = path;
          for (let handler of handlers) {
            if ((response = await handler(request.proxy || request, ...args)) !== void 0)
              return response;
          }
        }
      }
    }
  }
);

const withParams = r => { r.proxy = new Proxy(r.proxy || r, { get: (t, e) => { let o; return void 0 !== (o = t[e]) ? o.bind?.(r) || o : t?.params?.[e]; } }); };