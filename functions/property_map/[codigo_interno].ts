import {html} from './index'
export function onRequest(context) {
    return new Response(html(context.params.codigo_interno),{headers:{'content-type':'text/html; charset=utf-8'}})
  }