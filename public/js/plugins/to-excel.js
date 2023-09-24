//@ts-nocheck
function createtoExcel() {
    'use strict';
    var e = {};
    e.g = (function () {
        if ('object' == typeof globalThis)
            return globalThis;
        try {
            return this || new Function('return this')();
        }
        catch (e) {
            if ('object' == typeof window)
                return window;
        }
    })();
    var t, n = '\n</Row>', o = 'Ricard Fíguls', r = (function () {
        function e() { }
        return ((e.exportXLS = function (t, n, o) {
            'string' == typeof (o = o || { filename: void 0 }) &&
                (o = { filename: o }),
                (o.extension = o.extension || 'xls');
            var r = e.generateXML(t, n, o);
            return (!1 !== o.download &&
                e.download(o.filename + '.' + o.extension, r),
                r);
        }),
            (e.generateXML = function (t, r, a) {
                var s = '';
                return (t.length &&
                    r &&
                    ((s =
                        '<?xml version="1.0"?>\n<?mso-application progid="Excel.Sheet"?>\n<Workbook\nxmlns="urn:schemas-microsoft-com:office:spreadsheet"\nxmlns:o="urn:schemas-microsoft-com:office:office"\nxmlns:x="urn:schemas-microsoft-com:office:excel"\nxmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\nxmlns:html="http://www.w3.org/TR/REC-html40">\n'),
                        (s +=
                            '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\n<Author>%author</Author>\n<LastAuthor>%lastAuthor</LastAuthor>\n<Company>%company</Company>\n<Version>%version</Version>\n</DocumentProperties>\n'
                                .replace('%author', e.parseXML(a.author || o))
                                .replace('%lastAuthor', e.parseXML(a.lastAuthor || o))
                                .replace('%company', e.parseXML(a.company ||
                                'RFM Software (Ricard Figuls)'))
                                .replace('%version', e.parseXML(a.version || '1'))),
                        (s +=
                            '<Styles>\n<Style ss:ID="hdr"><Font ss:Color="#ffffff" ss:Bold="1" /><Interior ss:Color="#000000" ss:Pattern="Solid"/></Style>\n</Styles>'),
                        (s +=
                            '<Worksheet ss:Name="' +
                                a.filename +
                                '"><Table>'),
                        (s += '\n<Row>'),
                        (s += e.addHeaders(t)),
                        (s += n),
                        (s += e.addRows(r, t)),
                        (s += '\n</Table></Worksheet>\n</Workbook>')),
                    s);
            }),
            (e.addHeaders = function (t) {
                for (var n = '', o = 0, r = t; o < r.length; o++) {
                    var a = r[o];
                    n +=
                        '\n<Cell ss:StyleID="hdr"><Data ss:Type="String">' +
                            e.parseXML(a.label) +
                            '</Data></Cell>';
                }
                return n;
            }),
            (e.addRows = function (t, o) {
                for (var r = '', a = 0, s = t; a < s.length; a++) {
                    var l = s[a];
                    r += '\n<Row>';
                    for (var i = 0, c = o; i < c.length; i++) {
                        var u = c[i], f = u.type ? u.type : 'String', p = e.parseXML(e.getData(l, u.field));
                        r +=
                            '<Cell><Data ss:Type="' +
                                f +
                                '">' +
                                ('Number' === f ? +p : p) +
                                '</Data></Cell>';
                    }
                    r += n;
                }
                return r;
            }),
            (e.download = function (e, t) {
                try {
                    var n = new Blob([t], { type: 'text/csv' });
                    if (window.navigator.msSaveOrOpenBlob)
                        window.navigator.msSaveBlob(n, e);
                    else {
                        var o = window.document.createElement('a');
                        (o.href = window.URL.createObjectURL(n)),
                            (o.download = e),
                            document.body.appendChild(o),
                            o.click(),
                            document.body.removeChild(o);
                    }
                }
                catch (e) { }
            }),
            (e.getData = function (t, n) {
                var o = t;
                try {
                    n.toString()
                        .split('.')
                        .forEach(function (e) {
                        o = o[e];
                    });
                }
                catch (e) {
                    o = void 0;
                }
                return e.replaceValue(o);
            }),
            (e.setReplace = function (t, n) {
                e.replaceItems.push({ value: t, replacementValue: n });
            }),
            (e.parseXML = function (e) {
                return null == e
                    ? ''
                    : e
                        .toString()
                        .split('&')
                        .join('&amp;')
                        .split('<')
                        .join('&lt;')
                        .split('>')
                        .join('&gt;')
                        .split('"')
                        .join('&quot;');
            }),
            (e.replaceValue = function (t) {
                for (var n = 0, o = e.replaceItems; n < o.length; n++) {
                    var r = o[n];
                    if (r.value === t)
                        return r.replacementValue;
                }
                return t;
            }),
            (e.replaceItems = []),
            e);
    })(), a = ((t = function (e, n) {
        return ((t =
            Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                        e.__proto__ = t;
                    }) ||
                function (e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                            (e[n] = t[n]);
                }),
            t(e, n));
    }),
        function (e, n) {
            if ('function' != typeof n && null !== n)
                throw new TypeError('Class extends value ' +
                    String(n) +
                    ' is not a constructor or null');
            function o() {
                this.constructor = e;
            }
            t(e, n),
                (e.prototype =
                    null === n
                        ? Object.create(n)
                        : ((o.prototype = n.prototype), new o()));
        }), s = (function (e) {
        function t() {
            return (null !== e && e.apply(this, arguments)) || this;
        }
        return a(t, e), t;
    })(r);
    e.g.toExcel = s;
    return s;
}
export const toExcel = createtoExcel();
globalThis.toExcel = toExcel;
export default toExcel;
//# sourceMappingURL=to-excel.js.map