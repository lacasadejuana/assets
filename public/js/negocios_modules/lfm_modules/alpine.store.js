//@ts-ignore
console.zdebug = console.info.bind(console, '%cDEBUG:', 'color:#A39;font-weight:bold;');
//@ts-ignore
console.zsuccess = console.info.bind(console, '%cSUCCESS:', 'color:#16a34a;font-weight:bold;');
//@ts-ignore
console.zlog = console.log.bind(console, '%cLOG:', 'color:#090;font-weight:bold;');
//@ts-ignore
console.zinfo = console.info.bind(console, '%cINFO:', 'color:#33C;font-weight:bold;');
//@ts-ignore
console.zwarn = console.warn.bind(console, '%cWARN:', 'color:orange;font-weight:bold;');
//@ts-ignore
console.ztable = console.table.bind(console, '%cTABLE:', 'color:orange;font-weight:bold;');
console.timeEnd = console.timeEnd.bind(console, '%ctimeEnd:', 'color:cyan;font-weight:bold;');
export {};
//# sourceMappingURL=alpine.store.js.map