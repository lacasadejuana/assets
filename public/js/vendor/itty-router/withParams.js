"use strict";
const withParams = r => { r.proxy = new Proxy(r.proxy || r, { get: (t, e) => { let o; return void 0 !== (o = t[e]) ? o.bind?.(r) || o : t?.params?.[e]; } }); };
