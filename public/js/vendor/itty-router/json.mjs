const e=((e="text/plain; charset=utf-8",t)=>(n,s)=>{const{headers:o={},...r}=s||{};return"Response"===n?.constructor.name?n:new Response(t?t(n):n,{headers:{"content-type":e,...o},...r})})("application/json; charset=utf-8",JSON.stringify);export{e as json};
