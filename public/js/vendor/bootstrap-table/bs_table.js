(function (g, f) {
    if ("object" == typeof exports && "object" == typeof module) {
      module.exports = f();
    } else if ("function" == typeof define && define.amd) {
      define("bs_table", [], f);
    } else if ("object" == typeof exports) {
      exports["bs_table"] = f();
    } else {
      g["bs_table"] = f();
    }
  }(this, () => {
var exports = {};
var module = { exports };
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// resources/js/plugins/bs_table.ts
var bs_table_exports = {};
__export(bs_table_exports, {
  BootstrapTable: () => bootstrap_table_default2,
  default: () => bs_table_default
});
module.exports = __toCommonJS(bs_table_exports);

// node_modules/bootstrap-table/src/utils/index.js
var utils_default = {
  getBootstrapVersion() {
    let bootstrapVersion2 = 5;
    try {
      const rawVersion = $.fn.dropdown.Constructor.VERSION;
      if (rawVersion !== void 0) {
        bootstrapVersion2 = parseInt(rawVersion, 10);
      }
    } catch (e) {
    }
    try {
      const rawVersion = bootstrap.Tooltip.VERSION;
      if (rawVersion !== void 0) {
        bootstrapVersion2 = parseInt(rawVersion, 10);
      }
    } catch (e) {
    }
    return bootstrapVersion2;
  },
  getIconsPrefix(theme2) {
    return {
      bootstrap3: "glyphicon",
      bootstrap4: "fa",
      bootstrap5: "bi",
      "bootstrap-table": "icon",
      bulma: "fa",
      foundation: "fa",
      materialize: "material-icons",
      semantic: "fa"
    }[theme2] || "fa";
  },
  getIcons(prefix) {
    return {
      glyphicon: {
        paginationSwitchDown: "glyphicon-collapse-down icon-chevron-down",
        paginationSwitchUp: "glyphicon-collapse-up icon-chevron-up",
        refresh: "glyphicon-refresh icon-refresh",
        toggleOff: "glyphicon-list-alt icon-list-alt",
        toggleOn: "glyphicon-list-alt icon-list-alt",
        columns: "glyphicon-th icon-th",
        detailOpen: "glyphicon-plus icon-plus",
        detailClose: "glyphicon-minus icon-minus",
        fullscreen: "glyphicon-fullscreen",
        search: "glyphicon-search",
        clearSearch: "glyphicon-trash"
      },
      fa: {
        paginationSwitchDown: "fa-caret-square-down",
        paginationSwitchUp: "fa-caret-square-up",
        refresh: "fa-sync",
        toggleOff: "fa-toggle-off",
        toggleOn: "fa-toggle-on",
        columns: "fa-th-list",
        detailOpen: "fa-plus",
        detailClose: "fa-minus",
        fullscreen: "fa-arrows-alt",
        search: "fa-search",
        clearSearch: "fa-trash"
      },
      bi: {
        paginationSwitchDown: "bi-caret-down-square",
        paginationSwitchUp: "bi-caret-up-square",
        refresh: "bi-arrow-clockwise",
        toggleOff: "bi-toggle-off",
        toggleOn: "bi-toggle-on",
        columns: "bi-list-ul",
        detailOpen: "bi-plus",
        detailClose: "bi-dash",
        fullscreen: "bi-arrows-move",
        search: "bi-search",
        clearSearch: "bi-trash"
      },
      icon: {
        paginationSwitchDown: "icon-arrow-up-circle",
        paginationSwitchUp: "icon-arrow-down-circle",
        refresh: "icon-refresh-cw",
        toggleOff: "icon-toggle-right",
        toggleOn: "icon-toggle-right",
        columns: "icon-list",
        detailOpen: "icon-plus",
        detailClose: "icon-minus",
        fullscreen: "icon-maximize",
        search: "icon-search",
        clearSearch: "icon-trash-2"
      },
      "material-icons": {
        paginationSwitchDown: "grid_on",
        paginationSwitchUp: "grid_off",
        refresh: "refresh",
        toggleOff: "tablet",
        toggleOn: "tablet_android",
        columns: "view_list",
        detailOpen: "add",
        detailClose: "remove",
        fullscreen: "fullscreen",
        sort: "sort",
        search: "search",
        clearSearch: "delete"
      }
    }[prefix];
  },
  getSearchInput(that) {
    if (typeof that.options.searchSelector === "string") {
      return $(that.options.searchSelector);
    }
    return that.$toolbar.find(".search input");
  },
  // $.extend: https://github.com/jquery/jquery/blob/3.6.2/src/core.js#L132
  extend(...args) {
    let target = args[0] || {};
    let i = 1;
    let deep = false;
    let clone;
    if (typeof target === "boolean") {
      deep = target;
      target = args[i] || {};
      i++;
    }
    if (typeof target !== "object" && typeof target !== "function") {
      target = {};
    }
    for (; i < args.length; i++) {
      const options = args[i];
      if (typeof options === "undefined" || options === null) {
        continue;
      }
      for (const name in options) {
        const copy = options[name];
        if (name === "__proto__" || target === copy) {
          continue;
        }
        const copyIsArray = Array.isArray(copy);
        if (deep && copy && (this.isObject(copy) || copyIsArray)) {
          const src = target[name];
          if (copyIsArray && Array.isArray(src)) {
            if (src.every((it) => !this.isObject(it) && !Array.isArray(it))) {
              target[name] = copy;
              continue;
            }
          }
          if (copyIsArray && !Array.isArray(src)) {
            clone = [];
          } else if (!copyIsArray && !this.isObject(src)) {
            clone = {};
          } else {
            clone = src;
          }
          target[name] = this.extend(deep, clone, copy);
        } else if (copy !== void 0) {
          target[name] = copy;
        }
      }
    }
    return target;
  },
  // it only does '%s', and return '' when arguments are undefined
  sprintf(_str, ...args) {
    let flag = true;
    let i = 0;
    const str = _str.replace(/%s/g, () => {
      const arg = args[i++];
      if (typeof arg === "undefined") {
        flag = false;
        return "";
      }
      return arg;
    });
    return flag ? str : "";
  },
  isObject(obj) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }
    let proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
  },
  isEmptyObject(obj = {}) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  },
  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  getFieldTitle(list, value) {
    for (const item of list) {
      if (item.field === value) {
        return item.title;
      }
    }
    return "";
  },
  setFieldIndex(columns) {
    let totalCol = 0;
    const flag = [];
    for (const column of columns[0]) {
      totalCol += column.colspan || 1;
    }
    for (let i = 0; i < columns.length; i++) {
      flag[i] = [];
      for (let j = 0; j < totalCol; j++) {
        flag[i][j] = false;
      }
    }
    for (let i = 0; i < columns.length; i++) {
      for (const r of columns[i]) {
        const rowspan = r.rowspan || 1;
        const colspan = r.colspan || 1;
        const index = flag[i].indexOf(false);
        r.colspanIndex = index;
        if (colspan === 1) {
          r.fieldIndex = index;
          if (typeof r.field === "undefined") {
            r.field = index;
          }
        } else {
          r.colspanGroup = r.colspan;
        }
        for (let j = 0; j < rowspan; j++) {
          for (let k = 0; k < colspan; k++) {
            flag[i + j][index + k] = true;
          }
        }
      }
    }
  },
  normalizeAccent(value) {
    if (typeof value !== "string") {
      return value;
    }
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },
  updateFieldGroup(columns, fieldColumns) {
    const allColumns = [].concat(...columns);
    for (const c of columns) {
      for (const r of c) {
        if (r.colspanGroup > 1) {
          let colspan = 0;
          for (let i = r.colspanIndex; i < r.colspanIndex + r.colspanGroup; i++) {
            const column = allColumns.find((col) => col.fieldIndex === i);
            if (column.visible) {
              colspan++;
            }
          }
          r.colspan = colspan;
          r.visible = colspan > 0;
        }
      }
    }
    if (columns.length < 2) {
      return;
    }
    for (const column of fieldColumns) {
      const sameColumns = allColumns.filter((col) => col.fieldIndex === column.fieldIndex);
      if (sameColumns.length > 1) {
        for (const c of sameColumns) {
          c.visible = column.visible;
        }
      }
    }
  },
  getScrollBarWidth() {
    if (this.cachedWidth === void 0) {
      const $inner = $("<div/>").addClass("fixed-table-scroll-inner");
      const $outer = $("<div/>").addClass("fixed-table-scroll-outer");
      $outer.append($inner);
      $("body").append($outer);
      const w1 = $inner[0].offsetWidth;
      $outer.css("overflow", "scroll");
      let w2 = $inner[0].offsetWidth;
      if (w1 === w2) {
        w2 = $outer[0].clientWidth;
      }
      $outer.remove();
      this.cachedWidth = w1 - w2;
    }
    return this.cachedWidth;
  },
  calculateObjectValue(self, name, args, defaultValue) {
    let func = name;
    if (typeof name === "string") {
      const names = name.split(".");
      if (names.length > 1) {
        func = window;
        for (const f of names) {
          func = func[f];
        }
      } else {
        func = window[name];
      }
    }
    if (func !== null && typeof func === "object") {
      return func;
    }
    if (typeof func === "function") {
      return func.apply(self, args || []);
    }
    if (!func && typeof name === "string" && args && this.sprintf(name, ...args)) {
      return this.sprintf(name, ...args);
    }
    return defaultValue;
  },
  compareObjects(objectA, objectB, compareLength) {
    const aKeys = Object.keys(objectA);
    const bKeys = Object.keys(objectB);
    if (compareLength && aKeys.length !== bKeys.length) {
      return false;
    }
    for (const key of aKeys) {
      if (bKeys.includes(key) && objectA[key] !== objectB[key]) {
        return false;
      }
    }
    return true;
  },
  regexCompare(value, search) {
    try {
      const regexpParts = search.match(/^\/(.*?)\/([gim]*)$/);
      if (value.toString().search(regexpParts ? new RegExp(regexpParts[1], regexpParts[2]) : new RegExp(search, "gim")) !== -1) {
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  },
  escapeApostrophe(value) {
    return value.toString().replace(/'/g, "&#39;");
  },
  escapeHTML(text) {
    if (!text) {
      return text;
    }
    return text.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  },
  unescapeHTML(text) {
    if (typeof text !== "string" || !text) {
      return text;
    }
    return text.toString().replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  },
  removeHTML(text) {
    if (!text) {
      return text;
    }
    return text.toString().replace(/(<([^>]+)>)/ig, "").replace(/&[#A-Za-z0-9]+;/gi, "").trim();
  },
  getRealDataAttr(dataAttr) {
    for (const [attr, value] of Object.entries(dataAttr)) {
      const auxAttr = attr.split(/(?=[A-Z])/).join("-").toLowerCase();
      if (auxAttr !== attr) {
        dataAttr[auxAttr] = value;
        delete dataAttr[attr];
      }
    }
    return dataAttr;
  },
  getItemField(item, field, escape, columnEscape = void 0) {
    let value = item;
    if (typeof columnEscape !== "undefined") {
      escape = columnEscape;
    }
    if (typeof field !== "string" || item.hasOwnProperty(field)) {
      return escape ? this.escapeHTML(item[field]) : item[field];
    }
    const props = field.split(".");
    for (const p of props) {
      value = value && value[p];
    }
    return escape ? this.escapeHTML(value) : value;
  },
  isIEBrowser() {
    return navigator.userAgent.includes("MSIE ") || /Trident.*rv:11\./.test(navigator.userAgent);
  },
  findIndex(items, item) {
    for (const it of items) {
      if (JSON.stringify(it) === JSON.stringify(item)) {
        return items.indexOf(it);
      }
    }
    return -1;
  },
  trToData(columns, $els) {
    const data = [];
    const m = [];
    $els.each((y, el) => {
      const $el = $(el);
      const row = {};
      row._id = $el.attr("id");
      row._class = $el.attr("class");
      row._data = this.getRealDataAttr($el.data());
      row._style = $el.attr("style");
      $el.find(">td,>th").each((_x, el2) => {
        const $el2 = $(el2);
        const cspan = +$el2.attr("colspan") || 1;
        const rspan = +$el2.attr("rowspan") || 1;
        let x = _x;
        for (; m[y] && m[y][x]; x++) {
        }
        for (let tx = x; tx < x + cspan; tx++) {
          for (let ty = y; ty < y + rspan; ty++) {
            if (!m[ty]) {
              m[ty] = [];
            }
            m[ty][tx] = true;
          }
        }
        const field = columns[x].field;
        row[field] = this.escapeApostrophe($el2.html().trim());
        row[`_${field}_id`] = $el2.attr("id");
        row[`_${field}_class`] = $el2.attr("class");
        row[`_${field}_rowspan`] = $el2.attr("rowspan");
        row[`_${field}_colspan`] = $el2.attr("colspan");
        row[`_${field}_title`] = $el2.attr("title");
        row[`_${field}_data`] = this.getRealDataAttr($el2.data());
        row[`_${field}_style`] = $el2.attr("style");
      });
      data.push(row);
    });
    return data;
  },
  sort(a, b, order, options, aPosition, bPosition) {
    if (a === void 0 || a === null) {
      a = "";
    }
    if (b === void 0 || b === null) {
      b = "";
    }
    if (options.sortStable && a === b) {
      a = aPosition;
      b = bPosition;
    }
    if (this.isNumeric(a) && this.isNumeric(b)) {
      a = parseFloat(a);
      b = parseFloat(b);
      if (a < b) {
        return order * -1;
      }
      if (a > b) {
        return order;
      }
      return 0;
    }
    if (options.sortEmptyLast) {
      if (a === "") {
        return 1;
      }
      if (b === "") {
        return -1;
      }
    }
    if (a === b) {
      return 0;
    }
    if (typeof a !== "string") {
      a = a.toString();
    }
    if (a.localeCompare(b) === -1) {
      return order * -1;
    }
    return order;
  },
  getEventName(eventPrefix, id = "") {
    id = id || `${+/* @__PURE__ */ new Date()}${~~(Math.random() * 1e6)}`;
    return `${eventPrefix}-${id}`;
  },
  hasDetailViewIcon(options) {
    return options.detailView && options.detailViewIcon && !options.cardView;
  },
  getDetailViewIndexOffset(options) {
    return this.hasDetailViewIcon(options) && options.detailViewAlign !== "right" ? 1 : 0;
  },
  checkAutoMergeCells(data) {
    for (const row of data) {
      for (const key of Object.keys(row)) {
        if (key.startsWith("_") && (key.endsWith("_rowspan") || key.endsWith("_colspan"))) {
          return true;
        }
      }
    }
    return false;
  },
  deepCopy(arg) {
    if (arg === void 0) {
      return arg;
    }
    return this.extend(true, Array.isArray(arg) ? [] : {}, arg);
  },
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate)
          func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow)
        func.apply(context, args);
    };
  }
};

// node_modules/bootstrap-table/src/constants/index.js
var VERSION = "1.22.1";
var bootstrapVersion = utils_default.getBootstrapVersion();
var CONSTANTS = {
  3: {
    classes: {
      buttonsPrefix: "btn",
      buttons: "default",
      buttonsGroup: "btn-group",
      buttonsDropdown: "btn-group",
      pull: "pull",
      inputGroup: "input-group",
      inputPrefix: "input-",
      input: "form-control",
      select: "form-control",
      paginationDropdown: "btn-group dropdown",
      dropup: "dropup",
      dropdownActive: "active",
      paginationActive: "active",
      buttonActive: "active"
    },
    html: {
      toolbarDropdown: ['<ul class="dropdown-menu" role="menu">', "</ul>"],
      toolbarDropdownItem: '<li class="dropdown-item-marker" role="menuitem"><label>%s</label></li>',
      toolbarDropdownSeparator: '<li class="divider"></li>',
      pageDropdown: ['<ul class="dropdown-menu" role="menu">', "</ul>"],
      pageDropdownItem: '<li role="menuitem" class="%s"><a href="#">%s</a></li>',
      dropdownCaret: '<span class="caret"></span>',
      pagination: ['<ul class="pagination%s">', "</ul>"],
      paginationItem: '<li class="page-item%s"><a class="page-link" aria-label="%s" href="javascript:void(0)">%s</a></li>',
      icon: '<i class="%s %s"></i>',
      inputGroup: '<div class="input-group">%s<span class="input-group-btn">%s</span></div>',
      searchInput: '<input class="%s%s" type="text" placeholder="%s">',
      searchButton: '<button class="%s" type="button" name="search" title="%s">%s %s</button>',
      searchClearButton: '<button class="%s" type="button" name="clearSearch" title="%s">%s %s</button>'
    }
  },
  4: {
    classes: {
      buttonsPrefix: "btn",
      buttons: "secondary",
      buttonsGroup: "btn-group",
      buttonsDropdown: "btn-group",
      pull: "float",
      inputGroup: "btn-group",
      inputPrefix: "form-control-",
      input: "form-control",
      select: "form-control",
      paginationDropdown: "btn-group dropdown",
      dropup: "dropup",
      dropdownActive: "active",
      paginationActive: "active",
      buttonActive: "active"
    },
    html: {
      toolbarDropdown: ['<div class="dropdown-menu dropdown-menu-right">', "</div>"],
      toolbarDropdownItem: '<label class="dropdown-item dropdown-item-marker">%s</label>',
      pageDropdown: ['<div class="dropdown-menu">', "</div>"],
      pageDropdownItem: '<a class="dropdown-item %s" href="#">%s</a>',
      toolbarDropdownSeparator: '<div class="dropdown-divider"></div>',
      dropdownCaret: '<span class="caret"></span>',
      pagination: ['<ul class="pagination%s">', "</ul>"],
      paginationItem: '<li class="page-item%s"><a class="page-link" aria-label="%s" href="javascript:void(0)">%s</a></li>',
      icon: '<i class="%s %s"></i>',
      inputGroup: '<div class="input-group">%s<div class="input-group-append">%s</div></div>',
      searchInput: '<input class="%s%s" type="text" placeholder="%s">',
      searchButton: '<button class="%s" type="button" name="search" title="%s">%s %s</button>',
      searchClearButton: '<button class="%s" type="button" name="clearSearch" title="%s">%s %s</button>'
    }
  },
  5: {
    classes: {
      buttonsPrefix: "btn",
      buttons: "secondary",
      buttonsGroup: "btn-group",
      buttonsDropdown: "btn-group",
      pull: "float",
      inputGroup: "btn-group",
      inputPrefix: "form-control-",
      input: "form-control",
      select: "form-select",
      paginationDropdown: "btn-group dropdown",
      dropup: "dropup",
      dropdownActive: "active",
      paginationActive: "active",
      buttonActive: "active"
    },
    html: {
      dataToggle: "data-bs-toggle",
      toolbarDropdown: ['<div class="dropdown-menu dropdown-menu-end">', "</div>"],
      toolbarDropdownItem: '<label class="dropdown-item dropdown-item-marker">%s</label>',
      pageDropdown: ['<div class="dropdown-menu">', "</div>"],
      pageDropdownItem: '<a class="dropdown-item %s" href="#">%s</a>',
      toolbarDropdownSeparator: '<div class="dropdown-divider"></div>',
      dropdownCaret: '<span class="caret"></span>',
      pagination: ['<ul class="pagination%s">', "</ul>"],
      paginationItem: '<li class="page-item%s"><a class="page-link" aria-label="%s" href="javascript:void(0)">%s</a></li>',
      icon: '<i class="%s %s"></i>',
      inputGroup: '<div class="input-group">%s%s</div>',
      searchInput: '<input class="%s%s" type="text" placeholder="%s">',
      searchButton: '<button class="%s" type="button" name="search" title="%s">%s %s</button>',
      searchClearButton: '<button class="%s" type="button" name="clearSearch" title="%s">%s %s</button>'
    }
  }
}[bootstrapVersion];
var DEFAULTS = {
  height: void 0,
  classes: "table table-bordered table-hover",
  buttons: {},
  theadClasses: "",
  headerStyle(column) {
    return {};
  },
  rowStyle(row, index) {
    return {};
  },
  rowAttributes(row, index) {
    return {};
  },
  undefinedText: "-",
  locale: void 0,
  virtualScroll: false,
  virtualScrollItemHeight: void 0,
  sortable: true,
  sortClass: void 0,
  silentSort: true,
  sortEmptyLast: false,
  sortName: void 0,
  sortOrder: void 0,
  sortReset: false,
  sortStable: false,
  sortResetPage: false,
  rememberOrder: false,
  serverSort: true,
  customSort: void 0,
  columns: [
    []
  ],
  data: [],
  url: void 0,
  method: "get",
  cache: true,
  contentType: "application/json",
  dataType: "json",
  ajax: void 0,
  ajaxOptions: {},
  queryParams(params) {
    return params;
  },
  queryParamsType: "limit",
  // 'limit', undefined
  responseHandler(res) {
    return res;
  },
  totalField: "total",
  totalNotFilteredField: "totalNotFiltered",
  dataField: "rows",
  footerField: "footer",
  pagination: false,
  paginationParts: ["pageInfo", "pageSize", "pageList"],
  showExtendedPagination: false,
  paginationLoop: true,
  sidePagination: "client",
  // client or server
  totalRows: 0,
  totalNotFiltered: 0,
  pageNumber: 1,
  pageSize: 10,
  pageList: [10, 25, 50, 100],
  paginationHAlign: "right",
  // right, left
  paginationVAlign: "bottom",
  // bottom, top, both
  paginationDetailHAlign: "left",
  // right, left
  paginationPreText: "&lsaquo;",
  paginationNextText: "&rsaquo;",
  paginationSuccessivelySize: 5,
  // Maximum successively number of pages in a row
  paginationPagesBySide: 1,
  // Number of pages on each side (right, left) of the current page.
  paginationUseIntermediate: false,
  // Calculate intermediate pages for quick access
  search: false,
  searchable: false,
  searchHighlight: false,
  searchOnEnterKey: false,
  strictSearch: false,
  regexSearch: false,
  searchSelector: false,
  visibleSearch: false,
  showButtonIcons: true,
  showButtonText: false,
  showSearchButton: false,
  showSearchClearButton: false,
  trimOnSearch: true,
  searchAlign: "right",
  searchTimeOut: 500,
  searchText: "",
  customSearch: void 0,
  showHeader: true,
  showFooter: false,
  footerStyle(column) {
    return {};
  },
  searchAccentNeutralise: false,
  showColumns: false,
  showColumnsToggleAll: false,
  showColumnsSearch: false,
  minimumCountColumns: 1,
  showPaginationSwitch: false,
  showRefresh: false,
  showToggle: false,
  showFullscreen: false,
  smartDisplay: true,
  escape: false,
  escapeTitle: true,
  filterOptions: {
    filterAlgorithm: "and"
  },
  idField: void 0,
  selectItemName: "btSelectItem",
  clickToSelect: false,
  ignoreClickToSelectOn({ tagName }) {
    return ["A", "BUTTON"].includes(tagName);
  },
  singleSelect: false,
  checkboxHeader: true,
  maintainMetaData: false,
  multipleSelectRow: false,
  uniqueId: void 0,
  cardView: false,
  detailView: false,
  detailViewIcon: true,
  detailViewByClick: false,
  detailViewAlign: "left",
  detailFormatter(index, row) {
    return "";
  },
  detailFilter(index, row) {
    return true;
  },
  toolbar: void 0,
  toolbarAlign: "left",
  buttonsToolbar: void 0,
  buttonsAlign: "right",
  buttonsOrder: ["paginationSwitch", "refresh", "toggle", "fullscreen", "columns"],
  buttonsPrefix: CONSTANTS.classes.buttonsPrefix,
  buttonsClass: CONSTANTS.classes.buttons,
  iconsPrefix: void 0,
  // init in initConstants
  icons: {},
  // init in initConstants
  iconSize: void 0,
  loadingFontSize: "auto",
  loadingTemplate(loadingMessage) {
    return `<span class="loading-wrap">
      <span class="loading-text">${loadingMessage}</span>
      <span class="animation-wrap"><span class="animation-dot"></span></span>
      </span>
    `;
  },
  onAll(name, args) {
    return false;
  },
  onClickCell(field, value, row, $element) {
    return false;
  },
  onDblClickCell(field, value, row, $element) {
    return false;
  },
  onClickRow(item, $element) {
    return false;
  },
  onDblClickRow(item, $element) {
    return false;
  },
  onSort(name, order) {
    return false;
  },
  onCheck(row) {
    return false;
  },
  onUncheck(row) {
    return false;
  },
  onCheckAll(rows) {
    return false;
  },
  onUncheckAll(rows) {
    return false;
  },
  onCheckSome(rows) {
    return false;
  },
  onUncheckSome(rows) {
    return false;
  },
  onLoadSuccess(data) {
    return false;
  },
  onLoadError(status) {
    return false;
  },
  onColumnSwitch(field, checked) {
    return false;
  },
  onColumnSwitchAll(checked) {
    return false;
  },
  onPageChange(number, size) {
    return false;
  },
  onSearch(text) {
    return false;
  },
  onToggle(cardView) {
    return false;
  },
  onPreBody(data) {
    return false;
  },
  onPostBody() {
    return false;
  },
  onPostHeader() {
    return false;
  },
  onPostFooter() {
    return false;
  },
  onExpandRow(index, row, $detail) {
    return false;
  },
  onCollapseRow(index, row) {
    return false;
  },
  onRefreshOptions(options) {
    return false;
  },
  onRefresh(params) {
    return false;
  },
  onResetView() {
    return false;
  },
  onScrollBody() {
    return false;
  },
  onTogglePagination(newState) {
    return false;
  },
  onVirtualScroll(startIndex, endIndex) {
    return false;
  }
};
var EN = {
  formatLoadingMessage() {
    return "Loading, please wait";
  },
  formatRecordsPerPage(pageNumber) {
    return `${pageNumber} rows per page`;
  },
  formatShowingRows(pageFrom, pageTo, totalRows, totalNotFiltered) {
    if (totalNotFiltered !== void 0 && totalNotFiltered > 0 && totalNotFiltered > totalRows) {
      return `Showing ${pageFrom} to ${pageTo} of ${totalRows} rows (filtered from ${totalNotFiltered} total rows)`;
    }
    return `Showing ${pageFrom} to ${pageTo} of ${totalRows} rows`;
  },
  formatSRPaginationPreText() {
    return "previous page";
  },
  formatSRPaginationPageText(page) {
    return `to page ${page}`;
  },
  formatSRPaginationNextText() {
    return "next page";
  },
  formatDetailPagination(totalRows) {
    return `Showing ${totalRows} rows`;
  },
  formatSearch() {
    return "Search";
  },
  formatClearSearch() {
    return "Clear Search";
  },
  formatNoMatches() {
    return "No matching records found";
  },
  formatPaginationSwitch() {
    return "Hide/Show pagination";
  },
  formatPaginationSwitchDown() {
    return "Show pagination";
  },
  formatPaginationSwitchUp() {
    return "Hide pagination";
  },
  formatRefresh() {
    return "Refresh";
  },
  formatToggleOn() {
    return "Show card view";
  },
  formatToggleOff() {
    return "Hide card view";
  },
  formatColumns() {
    return "Columns";
  },
  formatColumnsToggleAll() {
    return "Toggle all";
  },
  formatFullscreen() {
    return "Fullscreen";
  },
  formatAllRows() {
    return "All";
  }
};
var COLUMN_DEFAULTS = {
  field: void 0,
  title: void 0,
  titleTooltip: void 0,
  class: void 0,
  width: void 0,
  widthUnit: "px",
  rowspan: void 0,
  colspan: void 0,
  align: void 0,
  // left, right, center
  halign: void 0,
  // left, right, center
  falign: void 0,
  // left, right, center
  valign: void 0,
  // top, middle, bottom
  cellStyle: void 0,
  radio: false,
  checkbox: false,
  checkboxEnabled: true,
  clickToSelect: true,
  showSelectTitle: false,
  sortable: false,
  sortName: void 0,
  order: "asc",
  // asc, desc
  sorter: void 0,
  visible: true,
  switchable: true,
  switchableLabel: void 0,
  cardVisible: true,
  searchable: true,
  formatter: void 0,
  footerFormatter: void 0,
  detailFormatter: void 0,
  searchFormatter: true,
  searchHighlightFormatter: false,
  escape: void 0,
  events: void 0
};
var METHODS = [
  "getOptions",
  "refreshOptions",
  "getData",
  "getSelections",
  "load",
  "append",
  "prepend",
  "remove",
  "removeAll",
  "insertRow",
  "updateRow",
  "getRowByUniqueId",
  "updateByUniqueId",
  "removeByUniqueId",
  "updateCell",
  "updateCellByUniqueId",
  "showRow",
  "hideRow",
  "getHiddenRows",
  "showColumn",
  "hideColumn",
  "getVisibleColumns",
  "getHiddenColumns",
  "showAllColumns",
  "hideAllColumns",
  "mergeCells",
  "checkAll",
  "uncheckAll",
  "checkInvert",
  "check",
  "uncheck",
  "checkBy",
  "uncheckBy",
  "refresh",
  "destroy",
  "resetView",
  "showLoading",
  "hideLoading",
  "togglePagination",
  "toggleFullscreen",
  "toggleView",
  "resetSearch",
  "filterBy",
  "sortBy",
  "scrollTo",
  "getScrollPosition",
  "selectPage",
  "prevPage",
  "nextPage",
  "toggleDetailView",
  "expandRow",
  "collapseRow",
  "expandRowByUniqueId",
  "collapseRowByUniqueId",
  "expandAllRows",
  "collapseAllRows",
  "updateColumnTitle",
  "updateFormatText"
];
var EVENTS = {
  "all.bs.table": "onAll",
  "click-row.bs.table": "onClickRow",
  "dbl-click-row.bs.table": "onDblClickRow",
  "click-cell.bs.table": "onClickCell",
  "dbl-click-cell.bs.table": "onDblClickCell",
  "sort.bs.table": "onSort",
  "check.bs.table": "onCheck",
  "uncheck.bs.table": "onUncheck",
  "check-all.bs.table": "onCheckAll",
  "uncheck-all.bs.table": "onUncheckAll",
  "check-some.bs.table": "onCheckSome",
  "uncheck-some.bs.table": "onUncheckSome",
  "load-success.bs.table": "onLoadSuccess",
  "load-error.bs.table": "onLoadError",
  "column-switch.bs.table": "onColumnSwitch",
  "column-switch-all.bs.table": "onColumnSwitchAll",
  "page-change.bs.table": "onPageChange",
  "search.bs.table": "onSearch",
  "toggle.bs.table": "onToggle",
  "pre-body.bs.table": "onPreBody",
  "post-body.bs.table": "onPostBody",
  "post-header.bs.table": "onPostHeader",
  "post-footer.bs.table": "onPostFooter",
  "expand-row.bs.table": "onExpandRow",
  "collapse-row.bs.table": "onCollapseRow",
  "refresh-options.bs.table": "onRefreshOptions",
  "reset-view.bs.table": "onResetView",
  "refresh.bs.table": "onRefresh",
  "scroll-body.bs.table": "onScrollBody",
  "toggle-pagination.bs.table": "onTogglePagination",
  "virtual-scroll.bs.table": "onVirtualScroll"
};
Object.assign(DEFAULTS, EN);
var constants_default = {
  VERSION,
  THEME: `bootstrap${bootstrapVersion}`,
  CONSTANTS,
  DEFAULTS,
  COLUMN_DEFAULTS,
  METHODS,
  EVENTS,
  LOCALES: {
    en: EN,
    "en-US": EN
  }
};

// node_modules/bootstrap-table/src/virtual-scroll/index.js
var BLOCK_ROWS = 50;
var CLUSTER_BLOCKS = 4;
var VirtualScroll = class {
  constructor(options) {
    this.rows = options.rows;
    this.scrollEl = options.scrollEl;
    this.contentEl = options.contentEl;
    this.callback = options.callback;
    this.itemHeight = options.itemHeight;
    this.cache = {};
    this.scrollTop = this.scrollEl.scrollTop;
    this.initDOM(this.rows, options.fixedScroll);
    this.scrollEl.scrollTop = this.scrollTop;
    this.lastCluster = 0;
    const onScroll = () => {
      if (this.lastCluster !== (this.lastCluster = this.getNum())) {
        this.initDOM(this.rows);
        this.callback(this.startIndex, this.endIndex);
      }
    };
    this.scrollEl.addEventListener("scroll", onScroll, false);
    this.destroy = () => {
      this.contentEl.innerHtml = "";
      this.scrollEl.removeEventListener("scroll", onScroll, false);
    };
  }
  initDOM(rows, fixedScroll) {
    if (typeof this.clusterHeight === "undefined") {
      this.cache.scrollTop = this.scrollEl.scrollTop;
      this.cache.data = this.contentEl.innerHTML = rows[0] + rows[0] + rows[0];
      this.getRowsHeight(rows);
    }
    const data = this.initData(rows, this.getNum(fixedScroll));
    const thisRows = data.rows.join("");
    const dataChanged = this.checkChanges("data", thisRows);
    const topOffsetChanged = this.checkChanges("top", data.topOffset);
    const bottomOffsetChanged = this.checkChanges("bottom", data.bottomOffset);
    const html = [];
    if (dataChanged && topOffsetChanged) {
      if (data.topOffset) {
        html.push(this.getExtra("top", data.topOffset));
      }
      html.push(thisRows);
      if (data.bottomOffset) {
        html.push(this.getExtra("bottom", data.bottomOffset));
      }
      this.startIndex = data.start;
      this.endIndex = data.end;
      this.contentEl.innerHTML = html.join("");
      if (fixedScroll) {
        this.contentEl.scrollTop = this.cache.scrollTop;
      }
    } else if (bottomOffsetChanged) {
      this.contentEl.lastChild.style.height = `${data.bottomOffset}px`;
    }
  }
  getRowsHeight() {
    if (typeof this.itemHeight === "undefined") {
      const nodes = this.contentEl.children;
      const node = nodes[Math.floor(nodes.length / 2)];
      this.itemHeight = node.offsetHeight;
    }
    this.blockHeight = this.itemHeight * BLOCK_ROWS;
    this.clusterRows = BLOCK_ROWS * CLUSTER_BLOCKS;
    this.clusterHeight = this.blockHeight * CLUSTER_BLOCKS;
  }
  getNum(fixedScroll) {
    this.scrollTop = fixedScroll ? this.cache.scrollTop : this.scrollEl.scrollTop;
    return Math.floor(this.scrollTop / (this.clusterHeight - this.blockHeight)) || 0;
  }
  initData(rows, num) {
    if (rows.length < BLOCK_ROWS) {
      return {
        topOffset: 0,
        bottomOffset: 0,
        rowsAbove: 0,
        rows
      };
    }
    const start = Math.max((this.clusterRows - BLOCK_ROWS) * num, 0);
    const end = start + this.clusterRows;
    const topOffset = Math.max(start * this.itemHeight, 0);
    const bottomOffset = Math.max((rows.length - end) * this.itemHeight, 0);
    const thisRows = [];
    let rowsAbove = start;
    if (topOffset < 1) {
      rowsAbove++;
    }
    for (let i = start; i < end; i++) {
      rows[i] && thisRows.push(rows[i]);
    }
    return {
      start,
      end,
      topOffset,
      bottomOffset,
      rowsAbove,
      rows: thisRows
    };
  }
  checkChanges(type, value) {
    const changed = value !== this.cache[type];
    this.cache[type] = value;
    return changed;
  }
  getExtra(className, height) {
    const tag = document.createElement("tr");
    tag.className = `virtual-scroll-${className}`;
    if (height) {
      tag.style.height = `${height}px`;
    }
    return tag.outerHTML;
  }
};
var virtual_scroll_default = VirtualScroll;

// node_modules/bootstrap-table/src/bootstrap-table.js
var BootstrapTable = class {
  constructor(el, options) {
    this.options = options;
    this.$el = $(el);
    this.$el_ = this.$el.clone();
    this.timeoutId_ = 0;
    this.timeoutFooter_ = 0;
  }
  init() {
    this.initConstants();
    this.initLocale();
    this.initContainer();
    this.initTable();
    this.initHeader();
    this.initData();
    this.initHiddenRows();
    this.initToolbar();
    this.initPagination();
    this.initBody();
    this.initSearchText();
    this.initServer();
  }
  initConstants() {
    const opts = this.options;
    this.constants = constants_default.CONSTANTS;
    this.constants.theme = $.fn.bootstrapTable.theme;
    this.constants.dataToggle = this.constants.html.dataToggle || "data-toggle";
    const iconsPrefix = utils_default.getIconsPrefix($.fn.bootstrapTable.theme);
    const icons = utils_default.getIcons(iconsPrefix);
    if (typeof opts.icons === "string") {
      opts.icons = utils_default.calculateObjectValue(null, opts.icons);
    }
    opts.iconsPrefix = opts.iconsPrefix || $.fn.bootstrapTable.defaults.iconsPrefix || iconsPrefix;
    opts.icons = Object.assign(icons, $.fn.bootstrapTable.defaults.icons, opts.icons);
    const buttonsPrefix = opts.buttonsPrefix ? `${opts.buttonsPrefix}-` : "";
    this.constants.buttonsClass = [
      opts.buttonsPrefix,
      buttonsPrefix + opts.buttonsClass,
      utils_default.sprintf(`${buttonsPrefix}%s`, opts.iconSize)
    ].join(" ").trim();
    this.buttons = utils_default.calculateObjectValue(this, opts.buttons, [], {});
    if (typeof this.buttons !== "object") {
      this.buttons = {};
    }
  }
  initLocale() {
    if (this.options.locale) {
      const locales = $.fn.bootstrapTable.locales;
      const parts = this.options.locale.split(/-|_/);
      parts[0] = parts[0].toLowerCase();
      if (parts[1]) {
        parts[1] = parts[1].toUpperCase();
      }
      let localesToExtend = {};
      if (locales[this.options.locale]) {
        localesToExtend = locales[this.options.locale];
      } else if (locales[parts.join("-")]) {
        localesToExtend = locales[parts.join("-")];
      } else if (locales[parts[0]]) {
        localesToExtend = locales[parts[0]];
      }
      for (const [formatName, func] of Object.entries(localesToExtend)) {
        if (this.options[formatName] !== BootstrapTable.DEFAULTS[formatName]) {
          continue;
        }
        this.options[formatName] = func;
      }
    }
  }
  initContainer() {
    const topPagination = ["top", "both"].includes(this.options.paginationVAlign) ? '<div class="fixed-table-pagination clearfix"></div>' : "";
    const bottomPagination = ["bottom", "both"].includes(this.options.paginationVAlign) ? '<div class="fixed-table-pagination"></div>' : "";
    const loadingTemplate = utils_default.calculateObjectValue(
      this.options,
      this.options.loadingTemplate,
      [this.options.formatLoadingMessage()]
    );
    this.$container = $(`
      <div class="bootstrap-table ${this.constants.theme}">
      <div class="fixed-table-toolbar"></div>
      ${topPagination}
      <div class="fixed-table-container">
      <div class="fixed-table-header"><table></table></div>
      <div class="fixed-table-body">
      <div class="fixed-table-loading">
      ${loadingTemplate}
      </div>
      </div>
      <div class="fixed-table-footer"></div>
      </div>
      ${bottomPagination}
      </div>
    `);
    this.$container.insertAfter(this.$el);
    this.$tableContainer = this.$container.find(".fixed-table-container");
    this.$tableHeader = this.$container.find(".fixed-table-header");
    this.$tableBody = this.$container.find(".fixed-table-body");
    this.$tableLoading = this.$container.find(".fixed-table-loading");
    this.$tableFooter = this.$el.find("tfoot");
    if (this.options.buttonsToolbar) {
      this.$toolbar = $("body").find(this.options.buttonsToolbar);
    } else {
      this.$toolbar = this.$container.find(".fixed-table-toolbar");
    }
    this.$pagination = this.$container.find(".fixed-table-pagination");
    this.$tableBody.append(this.$el);
    this.$container.after('<div class="clearfix"></div>');
    this.$el.addClass(this.options.classes);
    this.$tableLoading.addClass(this.options.classes);
    if (this.options.height) {
      this.$tableContainer.addClass("fixed-height");
      if (this.options.showFooter) {
        this.$tableContainer.addClass("has-footer");
      }
      if (this.options.classes.split(" ").includes("table-bordered")) {
        this.$tableBody.append('<div class="fixed-table-border"></div>');
        this.$tableBorder = this.$tableBody.find(".fixed-table-border");
        this.$tableLoading.addClass("fixed-table-border");
      }
      this.$tableFooter = this.$container.find(".fixed-table-footer");
    }
  }
  initTable() {
    const columns = [];
    this.$header = this.$el.find(">thead");
    if (!this.$header.length) {
      this.$header = $(`<thead class="${this.options.theadClasses}"></thead>`).appendTo(this.$el);
    } else if (this.options.theadClasses) {
      this.$header.addClass(this.options.theadClasses);
    }
    this._headerTrClasses = [];
    this._headerTrStyles = [];
    this.$header.find("tr").each((i, el) => {
      const $tr = $(el);
      const column = [];
      $tr.find("th").each((i2, el2) => {
        const $th = $(el2);
        if (typeof $th.data("field") !== "undefined") {
          $th.data("field", `${$th.data("field")}`);
        }
        const _data = Object.assign({}, $th.data());
        for (const key in _data) {
          if ($.fn.bootstrapTable.columnDefaults.hasOwnProperty(key)) {
            delete _data[key];
          }
        }
        column.push(utils_default.extend({}, {
          _data: utils_default.getRealDataAttr(_data),
          title: $th.html(),
          class: $th.attr("class"),
          titleTooltip: $th.attr("title"),
          rowspan: $th.attr("rowspan") ? +$th.attr("rowspan") : void 0,
          colspan: $th.attr("colspan") ? +$th.attr("colspan") : void 0
        }, $th.data()));
      });
      columns.push(column);
      if ($tr.attr("class")) {
        this._headerTrClasses.push($tr.attr("class"));
      }
      if ($tr.attr("style")) {
        this._headerTrStyles.push($tr.attr("style"));
      }
    });
    if (!Array.isArray(this.options.columns[0])) {
      this.options.columns = [this.options.columns];
    }
    this.options.columns = utils_default.extend(true, [], columns, this.options.columns);
    this.columns = [];
    this.fieldsColumnsIndex = [];
    utils_default.setFieldIndex(this.options.columns);
    this.options.columns.forEach((columns2, i) => {
      columns2.forEach((_column, j) => {
        const column = utils_default.extend({}, BootstrapTable.COLUMN_DEFAULTS, _column, { passed: _column });
        if (typeof column.fieldIndex !== "undefined") {
          this.columns[column.fieldIndex] = column;
          this.fieldsColumnsIndex[column.field] = column.fieldIndex;
        }
        this.options.columns[i][j] = column;
      });
    });
    if (!this.options.data.length) {
      const htmlData = utils_default.trToData(this.columns, this.$el.find(">tbody>tr"));
      if (htmlData.length) {
        this.options.data = htmlData;
        this.fromHtml = true;
      }
    }
    if (!(this.options.pagination && this.options.sidePagination !== "server")) {
      this.footerData = utils_default.trToData(this.columns, this.$el.find(">tfoot>tr"));
    }
    if (this.footerData) {
      this.$el.find("tfoot").html("<tr></tr>");
    }
    if (!this.options.showFooter || this.options.cardView) {
      this.$tableFooter.hide();
    } else {
      this.$tableFooter.show();
    }
  }
  initHeader() {
    const visibleColumns = {};
    const headerHtml = [];
    this.header = {
      fields: [],
      styles: [],
      classes: [],
      formatters: [],
      detailFormatters: [],
      events: [],
      sorters: [],
      sortNames: [],
      cellStyles: [],
      searchables: []
    };
    utils_default.updateFieldGroup(this.options.columns, this.columns);
    this.options.columns.forEach((columns, i) => {
      const html = [];
      html.push(`<tr${utils_default.sprintf(' class="%s"', this._headerTrClasses[i])} ${utils_default.sprintf(' style="%s"', this._headerTrStyles[i])}>`);
      let detailViewTemplate = "";
      if (i === 0 && utils_default.hasDetailViewIcon(this.options)) {
        const rowspan = this.options.columns.length > 1 ? ` rowspan="${this.options.columns.length}"` : "";
        detailViewTemplate = `<th class="detail"${rowspan}>
          <div class="fht-cell"></div>
          </th>`;
      }
      if (detailViewTemplate && this.options.detailViewAlign !== "right") {
        html.push(detailViewTemplate);
      }
      columns.forEach((column, j) => {
        const class_ = utils_default.sprintf(' class="%s"', column["class"]);
        const unitWidth = column.widthUnit;
        const width = parseFloat(column.width);
        const columnHalign = column.halign ? column.halign : column.align;
        const halign = utils_default.sprintf("text-align: %s; ", columnHalign);
        const align = utils_default.sprintf("text-align: %s; ", column.align);
        let style = utils_default.sprintf("vertical-align: %s; ", column.valign);
        style += utils_default.sprintf("width: %s; ", (column.checkbox || column.radio) && !width ? !column.showSelectTitle ? "36px" : void 0 : width ? width + unitWidth : void 0);
        if (typeof column.fieldIndex === "undefined" && !column.visible) {
          return;
        }
        const headerStyle = utils_default.calculateObjectValue(null, this.options.headerStyle, [column]);
        const csses = [];
        const data_ = [];
        let classes = "";
        if (headerStyle && headerStyle.css) {
          for (const [key, value] of Object.entries(headerStyle.css)) {
            csses.push(`${key}: ${value}`);
          }
        }
        if (headerStyle && headerStyle.classes) {
          classes = utils_default.sprintf(' class="%s"', column["class"] ? [column["class"], headerStyle.classes].join(" ") : headerStyle.classes);
        }
        if (typeof column.fieldIndex !== "undefined") {
          this.header.fields[column.fieldIndex] = column.field;
          this.header.styles[column.fieldIndex] = align + style;
          this.header.classes[column.fieldIndex] = class_;
          this.header.formatters[column.fieldIndex] = column.formatter;
          this.header.detailFormatters[column.fieldIndex] = column.detailFormatter;
          this.header.events[column.fieldIndex] = column.events;
          this.header.sorters[column.fieldIndex] = column.sorter;
          this.header.sortNames[column.fieldIndex] = column.sortName;
          this.header.cellStyles[column.fieldIndex] = column.cellStyle;
          this.header.searchables[column.fieldIndex] = column.searchable;
          if (!column.visible) {
            return;
          }
          if (this.options.cardView && !column.cardVisible) {
            return;
          }
          visibleColumns[column.field] = column;
        }
        if (Object.keys(column._data || {}).length > 0) {
          for (const [k, v] of Object.entries(column._data)) {
            data_.push(`data-${k}='${typeof v === "object" ? JSON.stringify(v) : v}'`);
          }
        }
        html.push(
          `<th${utils_default.sprintf(' title="%s"', column.titleTooltip)}`,
          column.checkbox || column.radio ? utils_default.sprintf(' class="bs-checkbox %s"', column["class"] || "") : classes || class_,
          utils_default.sprintf(' style="%s"', halign + style + csses.join("; ")),
          utils_default.sprintf(' rowspan="%s"', column.rowspan),
          utils_default.sprintf(' colspan="%s"', column.colspan),
          utils_default.sprintf(' data-field="%s"', column.field),
          // If `column` is not the first element of `this.options.columns[0]`, then className 'data-not-first-th' should be added.
          j === 0 && i > 0 ? " data-not-first-th" : "",
          data_.length > 0 ? data_.join(" ") : "",
          ">"
        );
        html.push(utils_default.sprintf(
          '<div class="th-inner %s">',
          this.options.sortable && column.sortable ? `sortable${columnHalign === "center" ? " sortable-center" : ""} both` : ""
        ));
        let text = this.options.escape && this.options.escapeTitle ? utils_default.escapeHTML(column.title) : column.title;
        const title = text;
        if (column.checkbox) {
          text = "";
          if (!this.options.singleSelect && this.options.checkboxHeader) {
            text = '<label><input name="btSelectAll" type="checkbox" /><span></span></label>';
          }
          this.header.stateField = column.field;
        }
        if (column.radio) {
          text = "";
          this.header.stateField = column.field;
        }
        if (!text && column.showSelectTitle) {
          text += title;
        }
        html.push(text);
        html.push("</div>");
        html.push('<div class="fht-cell"></div>');
        html.push("</div>");
        html.push("</th>");
      });
      if (detailViewTemplate && this.options.detailViewAlign === "right") {
        html.push(detailViewTemplate);
      }
      html.push("</tr>");
      if (html.length > 3) {
        headerHtml.push(html.join(""));
      }
    });
    this.$header.html(headerHtml.join(""));
    this.$header.find("th[data-field]").each((i, el) => {
      $(el).data(visibleColumns[$(el).data("field")]);
    });
    this.$container.off("click", ".th-inner").on("click", ".th-inner", (e) => {
      const $this = $(e.currentTarget);
      if (this.options.detailView && !$this.parent().hasClass("bs-checkbox")) {
        if ($this.closest(".bootstrap-table")[0] !== this.$container[0]) {
          return false;
        }
      }
      if (this.options.sortable && $this.parent().data().sortable) {
        this.onSort(e);
      }
    });
    const resizeEvent = utils_default.getEventName("resize.bootstrap-table", this.$el.attr("id"));
    $(window).off(resizeEvent);
    if (!this.options.showHeader || this.options.cardView) {
      this.$header.hide();
      this.$tableHeader.hide();
      this.$tableLoading.css("top", 0);
    } else {
      this.$header.show();
      this.$tableHeader.show();
      this.$tableLoading.css("top", this.$header.outerHeight() + 1);
      this.getCaret();
      $(window).on(resizeEvent, () => this.resetView());
    }
    this.$selectAll = this.$header.find('[name="btSelectAll"]');
    this.$selectAll.off("click").on("click", (e) => {
      e.stopPropagation();
      const checked = $(e.currentTarget).prop("checked");
      this[checked ? "checkAll" : "uncheckAll"]();
      this.updateSelected();
    });
  }
  initData(data, type) {
    if (type === "append") {
      this.options.data = this.options.data.concat(data);
    } else if (type === "prepend") {
      this.options.data = [].concat(data).concat(this.options.data);
    } else {
      data = data || utils_default.deepCopy(this.options.data);
      this.options.data = Array.isArray(data) ? data : data[this.options.dataField];
    }
    this.data = [...this.options.data];
    if (this.options.sortReset) {
      this.unsortedData = [...this.data];
    }
    if (this.options.sidePagination === "server") {
      return;
    }
    this.initSort();
  }
  initSort() {
    let name = this.options.sortName;
    const order = this.options.sortOrder === "desc" ? -1 : 1;
    const index = this.header.fields.indexOf(this.options.sortName);
    let timeoutId = 0;
    if (index !== -1) {
      if (this.options.sortStable) {
        this.data.forEach((row, i) => {
          if (!row.hasOwnProperty("_position")) {
            row._position = i;
          }
        });
      }
      if (this.options.customSort) {
        utils_default.calculateObjectValue(this.options, this.options.customSort, [
          this.options.sortName,
          this.options.sortOrder,
          this.data
        ]);
      } else {
        this.data.sort((a, b) => {
          if (this.header.sortNames[index]) {
            name = this.header.sortNames[index];
          }
          const aa = utils_default.getItemField(a, name, this.options.escape);
          const bb = utils_default.getItemField(b, name, this.options.escape);
          const value = utils_default.calculateObjectValue(this.header, this.header.sorters[index], [aa, bb, a, b]);
          if (value !== void 0) {
            if (this.options.sortStable && value === 0) {
              return order * (a._position - b._position);
            }
            return order * value;
          }
          return utils_default.sort(aa, bb, order, this.options, a._position, b._position);
        });
      }
      if (this.options.sortClass !== void 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          this.$el.removeClass(this.options.sortClass);
          const index2 = this.$header.find(`[data-field="${this.options.sortName}"]`).index();
          this.$el.find(`tr td:nth-child(${index2 + 1})`).addClass(this.options.sortClass);
        }, 250);
      }
    } else if (this.options.sortReset) {
      this.data = [...this.unsortedData];
    }
  }
  sortBy(params) {
    this.options.sortName = params.field;
    this.options.sortOrder = params.hasOwnProperty("sortOrder") ? params.sortOrder : "asc";
    this._sort();
  }
  onSort({ type, currentTarget }) {
    const $this = type === "keypress" ? $(currentTarget) : $(currentTarget).parent();
    const $this_ = this.$header.find("th").eq($this.index());
    this.$header.add(this.$header_).find("span.order").remove();
    if (this.options.sortName === $this.data("field")) {
      const currentSortOrder = this.options.sortOrder;
      const initialSortOrder = this.columns[this.fieldsColumnsIndex[$this.data("field")]].sortOrder || this.columns[this.fieldsColumnsIndex[$this.data("field")]].order;
      if (currentSortOrder === void 0) {
        this.options.sortOrder = "asc";
      } else if (currentSortOrder === "asc") {
        this.options.sortOrder = this.options.sortReset ? initialSortOrder === "asc" ? "desc" : void 0 : "desc";
      } else if (this.options.sortOrder === "desc") {
        this.options.sortOrder = this.options.sortReset ? initialSortOrder === "desc" ? "asc" : void 0 : "asc";
      }
      if (this.options.sortOrder === void 0) {
        this.options.sortName = void 0;
      }
    } else {
      this.options.sortName = $this.data("field");
      if (this.options.rememberOrder) {
        this.options.sortOrder = $this.data("order") === "asc" ? "desc" : "asc";
      } else {
        this.options.sortOrder = this.columns[this.fieldsColumnsIndex[$this.data("field")]].sortOrder || this.columns[this.fieldsColumnsIndex[$this.data("field")]].order;
      }
    }
    $this.add($this_).data("order", this.options.sortOrder);
    this.getCaret();
    this._sort();
  }
  _sort() {
    this.trigger("sort", this.options.sortName, this.options.sortOrder);
    if (this.options.sidePagination === "server" && this.options.serverSort) {
      this.options.pageNumber = 1;
      this.initServer(this.options.silentSort);
      return;
    }
    if (this.options.pagination && this.options.sortResetPage) {
      this.options.pageNumber = 1;
      this.initPagination();
    }
    this.initSort();
    this.initBody();
  }
  initToolbar() {
    const opts = this.options;
    let html = [];
    let timeoutId = 0;
    let $keepOpen;
    let switchableCount = 0;
    if (this.$toolbar.find(".bs-bars").children().length) {
      $("body").append($(opts.toolbar));
    }
    this.$toolbar.html("");
    if (typeof opts.toolbar === "string" || typeof opts.toolbar === "object") {
      $(utils_default.sprintf('<div class="bs-bars %s-%s"></div>', this.constants.classes.pull, opts.toolbarAlign)).appendTo(this.$toolbar).append($(opts.toolbar));
    }
    html = [`<div class="${[
      "columns",
      `columns-${opts.buttonsAlign}`,
      this.constants.classes.buttonsGroup,
      `${this.constants.classes.pull}-${opts.buttonsAlign}`
    ].join(" ")}">`];
    if (typeof opts.buttonsOrder === "string") {
      opts.buttonsOrder = opts.buttonsOrder.replace(/\[|\]| |'/g, "").split(",");
    }
    this.buttons = Object.assign(this.buttons, {
      paginationSwitch: {
        text: opts.pagination ? opts.formatPaginationSwitchUp() : opts.formatPaginationSwitchDown(),
        icon: opts.pagination ? opts.icons.paginationSwitchDown : opts.icons.paginationSwitchUp,
        render: false,
        event: this.togglePagination,
        attributes: {
          "aria-label": opts.formatPaginationSwitch(),
          title: opts.formatPaginationSwitch()
        }
      },
      refresh: {
        text: opts.formatRefresh(),
        icon: opts.icons.refresh,
        render: false,
        event: this.refresh,
        attributes: {
          "aria-label": opts.formatRefresh(),
          title: opts.formatRefresh()
        }
      },
      toggle: {
        text: opts.formatToggleOn(),
        icon: opts.icons.toggleOff,
        render: false,
        event: this.toggleView,
        attributes: {
          "aria-label": opts.formatToggleOn(),
          title: opts.formatToggleOn()
        }
      },
      fullscreen: {
        text: opts.formatFullscreen(),
        icon: opts.icons.fullscreen,
        render: false,
        event: this.toggleFullscreen,
        attributes: {
          "aria-label": opts.formatFullscreen(),
          title: opts.formatFullscreen()
        }
      },
      columns: {
        render: false,
        html: () => {
          const html2 = [];
          html2.push(`<div class="keep-open ${this.constants.classes.buttonsDropdown}">
            <button class="${this.constants.buttonsClass} dropdown-toggle" type="button" ${this.constants.dataToggle}="dropdown"
            aria-label="${opts.formatColumns()}" title="${opts.formatColumns()}">
            ${opts.showButtonIcons ? utils_default.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.columns) : ""}
            ${opts.showButtonText ? opts.formatColumns() : ""}
            ${this.constants.html.dropdownCaret}
            </button>
            ${this.constants.html.toolbarDropdown[0]}`);
          if (opts.showColumnsSearch) {
            html2.push(
              utils_default.sprintf(
                this.constants.html.toolbarDropdownItem,
                utils_default.sprintf('<input type="text" class="%s" name="columnsSearch" placeholder="%s" autocomplete="off">', this.constants.classes.input, opts.formatSearch())
              )
            );
            html2.push(this.constants.html.toolbarDropdownSeparator);
          }
          if (opts.showColumnsToggleAll) {
            const allFieldsVisible = this.getVisibleColumns().length === this.columns.filter((column) => !this.isSelectionColumn(column)).length;
            html2.push(
              utils_default.sprintf(
                this.constants.html.toolbarDropdownItem,
                utils_default.sprintf(
                  '<input type="checkbox" class="toggle-all" %s> <span>%s</span>',
                  allFieldsVisible ? 'checked="checked"' : "",
                  opts.formatColumnsToggleAll()
                )
              )
            );
            html2.push(this.constants.html.toolbarDropdownSeparator);
          }
          let visibleColumns = 0;
          this.columns.forEach((column) => {
            if (column.visible) {
              visibleColumns++;
            }
          });
          this.columns.forEach((column, i) => {
            if (this.isSelectionColumn(column)) {
              return;
            }
            if (opts.cardView && !column.cardVisible) {
              return;
            }
            const checked = column.visible ? ' checked="checked"' : "";
            const disabled = visibleColumns <= opts.minimumCountColumns && checked ? ' disabled="disabled"' : "";
            if (column.switchable) {
              html2.push(utils_default.sprintf(
                this.constants.html.toolbarDropdownItem,
                utils_default.sprintf(
                  '<input type="checkbox" data-field="%s" value="%s"%s%s> <span>%s</span>',
                  column.field,
                  i,
                  checked,
                  disabled,
                  column.switchableLabel ? column.switchableLabel : column.title
                )
              ));
              switchableCount++;
            }
          });
          html2.push(this.constants.html.toolbarDropdown[1], "</div>");
          return html2.join("");
        }
      }
    });
    const buttonsHtml = {};
    for (const [buttonName, buttonConfig] of Object.entries(this.buttons)) {
      let buttonHtml;
      if (buttonConfig.hasOwnProperty("html")) {
        if (typeof buttonConfig.html === "function") {
          buttonHtml = buttonConfig.html();
        } else if (typeof buttonConfig.html === "string") {
          buttonHtml = buttonConfig.html;
        }
      } else {
        let buttonClass = this.constants.buttonsClass;
        if (buttonConfig.hasOwnProperty("attributes") && buttonConfig.attributes.class) {
          buttonClass += ` ${buttonConfig.attributes.class}`;
        }
        buttonHtml = `<button class="${buttonClass}" type="button" name="${buttonName}"`;
        if (buttonConfig.hasOwnProperty("attributes")) {
          for (const [attributeName, value] of Object.entries(buttonConfig.attributes)) {
            if (attributeName === "class") {
              continue;
            }
            buttonHtml += ` ${attributeName}="${value}"`;
          }
        }
        buttonHtml += ">";
        if (opts.showButtonIcons && buttonConfig.hasOwnProperty("icon")) {
          buttonHtml += `${utils_default.sprintf(this.constants.html.icon, opts.iconsPrefix, buttonConfig.icon)} `;
        }
        if (opts.showButtonText && buttonConfig.hasOwnProperty("text")) {
          buttonHtml += buttonConfig.text;
        }
        buttonHtml += "</button>";
      }
      buttonsHtml[buttonName] = buttonHtml;
      const optionName = `show${buttonName.charAt(0).toUpperCase()}${buttonName.substring(1)}`;
      const showOption = opts[optionName];
      if ((!buttonConfig.hasOwnProperty("render") || buttonConfig.hasOwnProperty("render") && buttonConfig.render) && (showOption === void 0 || showOption === true)) {
        opts[optionName] = true;
      }
      if (!opts.buttonsOrder.includes(buttonName)) {
        opts.buttonsOrder.push(buttonName);
      }
    }
    for (const button of opts.buttonsOrder) {
      const showOption = opts[`show${button.charAt(0).toUpperCase()}${button.substring(1)}`];
      if (showOption) {
        html.push(buttonsHtml[button]);
      }
    }
    html.push("</div>");
    if (this.showToolbar || html.length > 2) {
      this.$toolbar.append(html.join(""));
    }
    for (const [buttonName, buttonConfig] of Object.entries(this.buttons)) {
      if (buttonConfig.hasOwnProperty("event")) {
        if (typeof buttonConfig.event === "function" || typeof buttonConfig.event === "string") {
          const event = typeof buttonConfig.event === "string" ? window[buttonConfig.event] : buttonConfig.event;
          this.$toolbar.find(`button[name="${buttonName}"]`).off("click").on("click", () => event.call(this));
          continue;
        }
        for (const [eventType, eventFunction] of Object.entries(buttonConfig.event)) {
          const event = typeof eventFunction === "string" ? window[eventFunction] : eventFunction;
          this.$toolbar.find(`button[name="${buttonName}"]`).off(eventType).on(eventType, () => event.call(this));
        }
      }
    }
    if (opts.showColumns) {
      $keepOpen = this.$toolbar.find(".keep-open");
      const $checkboxes = $keepOpen.find('input[type="checkbox"]:not(".toggle-all")');
      const $toggleAll = $keepOpen.find('input[type="checkbox"].toggle-all');
      if (switchableCount <= opts.minimumCountColumns) {
        $keepOpen.find("input").prop("disabled", true);
      }
      $keepOpen.find("li, label").off("click").on("click", (e) => {
        e.stopImmediatePropagation();
      });
      $checkboxes.off("click").on("click", ({ currentTarget }) => {
        const $this = $(currentTarget);
        this._toggleColumn($this.val(), $this.prop("checked"), false);
        this.trigger("column-switch", $this.data("field"), $this.prop("checked"));
        $toggleAll.prop("checked", $checkboxes.filter(":checked").length === this.columns.filter((column) => !this.isSelectionColumn(column)).length);
      });
      $toggleAll.off("click").on("click", ({ currentTarget }) => {
        this._toggleAllColumns($(currentTarget).prop("checked"));
        this.trigger("column-switch-all", $(currentTarget).prop("checked"));
      });
      if (opts.showColumnsSearch) {
        const $columnsSearch = $keepOpen.find('[name="columnsSearch"]');
        const $listItems = $keepOpen.find(".dropdown-item-marker");
        $columnsSearch.on("keyup paste change", ({ currentTarget }) => {
          const $this = $(currentTarget);
          const searchValue = $this.val().toLowerCase();
          $listItems.show();
          $checkboxes.each((i, el) => {
            const $checkbox = $(el);
            const $listItem = $checkbox.parents(".dropdown-item-marker");
            const text = $listItem.text().toLowerCase();
            if (!text.includes(searchValue)) {
              $listItem.hide();
            }
          });
        });
      }
    }
    const handleInputEvent = ($searchInput) => {
      const eventTriggers = $searchInput.is("select") ? "change" : "keyup drop blur mouseup";
      $searchInput.off(eventTriggers).on(eventTriggers, (event) => {
        if (opts.searchOnEnterKey && event.keyCode !== 13) {
          return;
        }
        if ([37, 38, 39, 40].includes(event.keyCode)) {
          return;
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          this.onSearch({ currentTarget: event.currentTarget });
        }, opts.searchTimeOut);
      });
    };
    if ((opts.search || this.showSearchClearButton) && typeof opts.searchSelector !== "string") {
      html = [];
      const showSearchButton = utils_default.sprintf(
        this.constants.html.searchButton,
        this.constants.buttonsClass,
        opts.formatSearch(),
        opts.showButtonIcons ? utils_default.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.search) : "",
        opts.showButtonText ? opts.formatSearch() : ""
      );
      const showSearchClearButton = utils_default.sprintf(
        this.constants.html.searchClearButton,
        this.constants.buttonsClass,
        opts.formatClearSearch(),
        opts.showButtonIcons ? utils_default.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.clearSearch) : "",
        opts.showButtonText ? opts.formatClearSearch() : ""
      );
      const searchInputHtml = `<input class="${this.constants.classes.input}
        ${utils_default.sprintf(" %s%s", this.constants.classes.inputPrefix, opts.iconSize)}
        search-input" type="search" aria-label="${opts.formatSearch()}" placeholder="${opts.formatSearch()}" autocomplete="off">`;
      let searchInputFinalHtml = searchInputHtml;
      if (opts.showSearchButton || opts.showSearchClearButton) {
        const buttonsHtml2 = (opts.showSearchButton ? showSearchButton : "") + (opts.showSearchClearButton ? showSearchClearButton : "");
        searchInputFinalHtml = opts.search ? utils_default.sprintf(
          this.constants.html.inputGroup,
          searchInputHtml,
          buttonsHtml2
        ) : buttonsHtml2;
      }
      html.push(utils_default.sprintf(`
        <div class="${this.constants.classes.pull}-${opts.searchAlign} search ${this.constants.classes.inputGroup}">
          %s
        </div>
      `, searchInputFinalHtml));
      this.$toolbar.append(html.join(""));
      const $searchInput = utils_default.getSearchInput(this);
      if (opts.showSearchButton) {
        this.$toolbar.find(".search button[name=search]").off("click").on("click", () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            this.onSearch({ currentTarget: $searchInput });
          }, opts.searchTimeOut);
        });
        if (opts.searchOnEnterKey) {
          handleInputEvent($searchInput);
        }
      } else {
        handleInputEvent($searchInput);
      }
      if (opts.showSearchClearButton) {
        this.$toolbar.find(".search button[name=clearSearch]").click(() => {
          this.resetSearch();
        });
      }
    } else if (typeof opts.searchSelector === "string") {
      const $searchInput = utils_default.getSearchInput(this);
      handleInputEvent($searchInput);
    }
  }
  onSearch({ currentTarget, firedByInitSearchText } = {}, overwriteSearchText = true) {
    if (currentTarget !== void 0 && $(currentTarget).length && overwriteSearchText) {
      const text = $(currentTarget).val().trim();
      if (this.options.trimOnSearch && $(currentTarget).val() !== text) {
        $(currentTarget).val(text);
      }
      if (this.searchText === text) {
        return;
      }
      const $searchInput = utils_default.getSearchInput(this);
      const $currentTarget = currentTarget instanceof jQuery ? currentTarget : $(currentTarget);
      if ($currentTarget.is($searchInput) || $currentTarget.hasClass("search-input")) {
        this.searchText = text;
        this.options.searchText = text;
      }
    }
    if (!firedByInitSearchText) {
      this.options.pageNumber = 1;
    }
    this.initSearch();
    if (firedByInitSearchText) {
      if (this.options.sidePagination === "client") {
        this.updatePagination();
      }
    } else {
      this.updatePagination();
    }
    this.trigger("search", this.searchText);
  }
  initSearch() {
    this.filterOptions = this.filterOptions || this.options.filterOptions;
    if (this.options.sidePagination !== "server") {
      if (this.options.customSearch) {
        this.data = utils_default.calculateObjectValue(
          this.options,
          this.options.customSearch,
          [this.options.data, this.searchText, this.filterColumns]
        );
        if (this.options.sortReset) {
          this.unsortedData = [...this.data];
        }
        this.initSort();
        return;
      }
      const rawSearchText = this.searchText && (this.fromHtml ? utils_default.escapeHTML(this.searchText) : this.searchText);
      let searchText = rawSearchText ? rawSearchText.toLowerCase() : "";
      const f = utils_default.isEmptyObject(this.filterColumns) ? null : this.filterColumns;
      if (this.options.searchAccentNeutralise) {
        searchText = utils_default.normalizeAccent(searchText);
      }
      if (typeof this.filterOptions.filterAlgorithm === "function") {
        this.data = this.options.data.filter((item) => this.filterOptions.filterAlgorithm.apply(null, [item, f]));
      } else if (typeof this.filterOptions.filterAlgorithm === "string") {
        this.data = f ? this.options.data.filter((item) => {
          const filterAlgorithm = this.filterOptions.filterAlgorithm;
          if (filterAlgorithm === "and") {
            for (const key in f) {
              if (Array.isArray(f[key]) && !f[key].includes(item[key]) || !Array.isArray(f[key]) && item[key] !== f[key]) {
                return false;
              }
            }
          } else if (filterAlgorithm === "or") {
            let match = false;
            for (const key in f) {
              if (Array.isArray(f[key]) && f[key].includes(item[key]) || !Array.isArray(f[key]) && item[key] === f[key]) {
                match = true;
              }
            }
            return match;
          }
          return true;
        }) : [...this.options.data];
      }
      const visibleFields = this.getVisibleFields();
      this.data = searchText ? this.data.filter((item, i) => {
        for (let j = 0; j < this.header.fields.length; j++) {
          if (!this.header.searchables[j] || this.options.visibleSearch && visibleFields.indexOf(this.header.fields[j]) === -1) {
            continue;
          }
          const key = utils_default.isNumeric(this.header.fields[j]) ? parseInt(this.header.fields[j], 10) : this.header.fields[j];
          const column = this.columns[this.fieldsColumnsIndex[key]];
          let value;
          if (typeof key === "string") {
            value = item;
            const props = key.split(".");
            for (let i2 = 0; i2 < props.length; i2++) {
              if (value[props[i2]] !== null) {
                value = value[props[i2]];
              } else {
                value = null;
                break;
              }
            }
          } else {
            value = item[key];
          }
          if (this.options.searchAccentNeutralise) {
            value = utils_default.normalizeAccent(value);
          }
          if (column && column.searchFormatter) {
            value = utils_default.calculateObjectValue(
              column,
              this.header.formatters[j],
              [value, item, i, column.field],
              value
            );
          }
          if (typeof value === "string" || typeof value === "number") {
            if (this.options.strictSearch && `${value}`.toLowerCase() === searchText || this.options.regexSearch && utils_default.regexCompare(value, rawSearchText)) {
              return true;
            }
            const largerSmallerEqualsRegex = /(?:(<=|=>|=<|>=|>|<)(?:\s+)?(-?\d+)?|(-?\d+)?(\s+)?(<=|=>|=<|>=|>|<))/gm;
            const matches = largerSmallerEqualsRegex.exec(this.searchText);
            let comparisonCheck = false;
            if (matches) {
              const operator = matches[1] || `${matches[5]}l`;
              const comparisonValue = matches[2] || matches[3];
              const int = parseInt(value, 10);
              const comparisonInt = parseInt(comparisonValue, 10);
              switch (operator) {
                case ">":
                case "<l":
                  comparisonCheck = int > comparisonInt;
                  break;
                case "<":
                case ">l":
                  comparisonCheck = int < comparisonInt;
                  break;
                case "<=":
                case "=<":
                case ">=l":
                case "=>l":
                  comparisonCheck = int <= comparisonInt;
                  break;
                case ">=":
                case "=>":
                case "<=l":
                case "=<l":
                  comparisonCheck = int >= comparisonInt;
                  break;
                default:
                  break;
              }
            }
            if (comparisonCheck || `${value}`.toLowerCase().includes(searchText)) {
              return true;
            }
          }
        }
        return false;
      }) : this.data;
      if (this.options.sortReset) {
        this.unsortedData = [...this.data];
      }
      this.initSort();
    }
  }
  initPagination() {
    const opts = this.options;
    if (!opts.pagination) {
      this.$pagination.hide();
      return;
    }
    this.$pagination.show();
    const html = [];
    let allSelected = false;
    let i;
    let from;
    let to;
    let $pageList;
    let $pre;
    let $next;
    let $number;
    const data = this.getData({ includeHiddenRows: false });
    let pageList = opts.pageList;
    if (typeof pageList === "string") {
      pageList = pageList.replace(/\[|\]| /g, "").toLowerCase().split(",");
    }
    pageList = pageList.map((value) => {
      if (typeof value === "string") {
        return value.toLowerCase() === opts.formatAllRows().toLowerCase() || ["all", "unlimited"].includes(value.toLowerCase()) ? opts.formatAllRows() : +value;
      }
      return value;
    });
    this.paginationParts = opts.paginationParts;
    if (typeof this.paginationParts === "string") {
      this.paginationParts = this.paginationParts.replace(/\[|\]| |'/g, "").split(",");
    }
    if (opts.sidePagination !== "server") {
      opts.totalRows = data.length;
    }
    this.totalPages = 0;
    if (opts.totalRows) {
      if (opts.pageSize === opts.formatAllRows()) {
        opts.pageSize = opts.totalRows;
        allSelected = true;
      }
      this.totalPages = ~~((opts.totalRows - 1) / opts.pageSize) + 1;
      opts.totalPages = this.totalPages;
    }
    if (this.totalPages > 0 && opts.pageNumber > this.totalPages) {
      opts.pageNumber = this.totalPages;
    }
    this.pageFrom = (opts.pageNumber - 1) * opts.pageSize + 1;
    this.pageTo = opts.pageNumber * opts.pageSize;
    if (this.pageTo > opts.totalRows) {
      this.pageTo = opts.totalRows;
    }
    if (this.options.pagination && this.options.sidePagination !== "server") {
      this.options.totalNotFiltered = this.options.data.length;
    }
    if (!this.options.showExtendedPagination) {
      this.options.totalNotFiltered = void 0;
    }
    if (this.paginationParts.includes("pageInfo") || this.paginationParts.includes("pageInfoShort") || this.paginationParts.includes("pageSize")) {
      html.push(`<div class="${this.constants.classes.pull}-${opts.paginationDetailHAlign} pagination-detail">`);
    }
    if (this.paginationParts.includes("pageInfo") || this.paginationParts.includes("pageInfoShort")) {
      const paginationInfo = this.paginationParts.includes("pageInfoShort") ? opts.formatDetailPagination(opts.totalRows) : opts.formatShowingRows(this.pageFrom, this.pageTo, opts.totalRows, opts.totalNotFiltered);
      html.push(`<span class="pagination-info">
      ${paginationInfo}
      </span>`);
    }
    if (this.paginationParts.includes("pageSize")) {
      html.push('<div class="page-list">');
      const pageNumber = [
        `<div class="${this.constants.classes.paginationDropdown}">
        <button class="${this.constants.buttonsClass} dropdown-toggle" type="button" ${this.constants.dataToggle}="dropdown">
        <span class="page-size">
        ${allSelected ? opts.formatAllRows() : opts.pageSize}
        </span>
        ${this.constants.html.dropdownCaret}
        </button>
        ${this.constants.html.pageDropdown[0]}`
      ];
      pageList.forEach((page, i2) => {
        if (!opts.smartDisplay || i2 === 0 || pageList[i2 - 1] < opts.totalRows || page === opts.formatAllRows()) {
          let active;
          if (allSelected) {
            active = page === opts.formatAllRows() ? this.constants.classes.dropdownActive : "";
          } else {
            active = page === opts.pageSize ? this.constants.classes.dropdownActive : "";
          }
          pageNumber.push(utils_default.sprintf(this.constants.html.pageDropdownItem, active, page));
        }
      });
      pageNumber.push(`${this.constants.html.pageDropdown[1]}</div>`);
      html.push(opts.formatRecordsPerPage(pageNumber.join("")));
    }
    if (this.paginationParts.includes("pageInfo") || this.paginationParts.includes("pageInfoShort") || this.paginationParts.includes("pageSize")) {
      html.push("</div></div>");
    }
    if (this.paginationParts.includes("pageList")) {
      html.push(
        `<div class="${this.constants.classes.pull}-${opts.paginationHAlign} pagination">`,
        utils_default.sprintf(this.constants.html.pagination[0], utils_default.sprintf(" pagination-%s", opts.iconSize)),
        utils_default.sprintf(this.constants.html.paginationItem, " page-pre", opts.formatSRPaginationPreText(), opts.paginationPreText)
      );
      if (this.totalPages < opts.paginationSuccessivelySize) {
        from = 1;
        to = this.totalPages;
      } else {
        from = opts.pageNumber - opts.paginationPagesBySide;
        to = from + opts.paginationPagesBySide * 2;
      }
      if (opts.pageNumber < opts.paginationSuccessivelySize - 1) {
        to = opts.paginationSuccessivelySize;
      }
      if (opts.paginationSuccessivelySize > this.totalPages - from) {
        from = from - (opts.paginationSuccessivelySize - (this.totalPages - from)) + 1;
      }
      if (from < 1) {
        from = 1;
      }
      if (to > this.totalPages) {
        to = this.totalPages;
      }
      const middleSize = Math.round(opts.paginationPagesBySide / 2);
      const pageItem = (i2, classes = "") => utils_default.sprintf(
        this.constants.html.paginationItem,
        classes + (i2 === opts.pageNumber ? ` ${this.constants.classes.paginationActive}` : ""),
        opts.formatSRPaginationPageText(i2),
        i2
      );
      if (from > 1) {
        let max = opts.paginationPagesBySide;
        if (max >= from)
          max = from - 1;
        for (i = 1; i <= max; i++) {
          html.push(pageItem(i));
        }
        if (from - 1 === max + 1) {
          i = from - 1;
          html.push(pageItem(i));
        } else if (from - 1 > max) {
          if (from - opts.paginationPagesBySide * 2 > opts.paginationPagesBySide && opts.paginationUseIntermediate) {
            i = Math.round((from - middleSize) / 2 + middleSize);
            html.push(pageItem(i, " page-intermediate"));
          } else {
            html.push(utils_default.sprintf(
              this.constants.html.paginationItem,
              " page-first-separator disabled",
              "",
              "..."
            ));
          }
        }
      }
      for (i = from; i <= to; i++) {
        html.push(pageItem(i));
      }
      if (this.totalPages > to) {
        let min = this.totalPages - (opts.paginationPagesBySide - 1);
        if (to >= min)
          min = to + 1;
        if (to + 1 === min - 1) {
          i = to + 1;
          html.push(pageItem(i));
        } else if (min > to + 1) {
          if (this.totalPages - to > opts.paginationPagesBySide * 2 && opts.paginationUseIntermediate) {
            i = Math.round((this.totalPages - middleSize - to) / 2 + to);
            html.push(pageItem(i, " page-intermediate"));
          } else {
            html.push(utils_default.sprintf(
              this.constants.html.paginationItem,
              " page-last-separator disabled",
              "",
              "..."
            ));
          }
        }
        for (i = min; i <= this.totalPages; i++) {
          html.push(pageItem(i));
        }
      }
      html.push(utils_default.sprintf(this.constants.html.paginationItem, " page-next", opts.formatSRPaginationNextText(), opts.paginationNextText));
      html.push(this.constants.html.pagination[1], "</div>");
    }
    this.$pagination.html(html.join(""));
    const dropupClass = ["bottom", "both"].includes(opts.paginationVAlign) ? ` ${this.constants.classes.dropup}` : "";
    this.$pagination.last().find(".page-list > div").addClass(dropupClass);
    if (!opts.onlyInfoPagination) {
      $pageList = this.$pagination.find(".page-list a");
      $pre = this.$pagination.find(".page-pre");
      $next = this.$pagination.find(".page-next");
      $number = this.$pagination.find(".page-item").not(".page-next, .page-pre, .page-last-separator, .page-first-separator");
      if (this.totalPages <= 1) {
        this.$pagination.find("div.pagination").hide();
      }
      if (opts.smartDisplay) {
        if (pageList.length < 2 || opts.totalRows <= pageList[0]) {
          this.$pagination.find("div.page-list").hide();
        }
      }
      this.$pagination[this.getData().length ? "show" : "hide"]();
      if (!opts.paginationLoop) {
        if (opts.pageNumber === 1) {
          $pre.addClass("disabled");
        }
        if (opts.pageNumber === this.totalPages) {
          $next.addClass("disabled");
        }
      }
      if (allSelected) {
        opts.pageSize = opts.formatAllRows();
      }
      $pageList.off("click").on("click", (e) => this.onPageListChange(e));
      $pre.off("click").on("click", (e) => this.onPagePre(e));
      $next.off("click").on("click", (e) => this.onPageNext(e));
      $number.off("click").on("click", (e) => this.onPageNumber(e));
    }
  }
  updatePagination(event) {
    if (event && $(event.currentTarget).hasClass("disabled")) {
      return;
    }
    if (!this.options.maintainMetaData) {
      this.resetRows();
    }
    this.initPagination();
    this.trigger("page-change", this.options.pageNumber, this.options.pageSize);
    if (this.options.sidePagination === "server") {
      this.initServer();
    } else {
      this.initBody();
    }
  }
  onPageListChange(event) {
    event.preventDefault();
    const $this = $(event.currentTarget);
    $this.parent().addClass(this.constants.classes.dropdownActive).siblings().removeClass(this.constants.classes.dropdownActive);
    this.options.pageSize = $this.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ? this.options.formatAllRows() : +$this.text();
    this.$toolbar.find(".page-size").text(this.options.pageSize);
    this.updatePagination(event);
    return false;
  }
  onPagePre(event) {
    if ($(event.target).hasClass("disabled")) {
      return;
    }
    event.preventDefault();
    if (this.options.pageNumber - 1 === 0) {
      this.options.pageNumber = this.options.totalPages;
    } else {
      this.options.pageNumber--;
    }
    this.updatePagination(event);
    return false;
  }
  onPageNext(event) {
    if ($(event.target).hasClass("disabled")) {
      return;
    }
    event.preventDefault();
    if (this.options.pageNumber + 1 > this.options.totalPages) {
      this.options.pageNumber = 1;
    } else {
      this.options.pageNumber++;
    }
    this.updatePagination(event);
    return false;
  }
  onPageNumber(event) {
    event.preventDefault();
    if (this.options.pageNumber === +$(event.currentTarget).text()) {
      return;
    }
    this.options.pageNumber = +$(event.currentTarget).text();
    this.updatePagination(event);
    return false;
  }
  // eslint-disable-next-line no-unused-vars
  initRow(item, i, data, trFragments) {
    const html = [];
    let style = {};
    const csses = [];
    let data_ = "";
    let attributes = {};
    const htmlAttributes = [];
    if (utils_default.findIndex(this.hiddenRows, item) > -1) {
      return;
    }
    style = utils_default.calculateObjectValue(this.options, this.options.rowStyle, [item, i], style);
    if (style && style.css) {
      for (const [key, value] of Object.entries(style.css)) {
        csses.push(`${key}: ${value}`);
      }
    }
    attributes = utils_default.calculateObjectValue(
      this.options,
      this.options.rowAttributes,
      [item, i],
      attributes
    );
    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        htmlAttributes.push(`${key}="${utils_default.escapeHTML(value)}"`);
      }
    }
    if (item._data && !utils_default.isEmptyObject(item._data)) {
      for (const [k, v] of Object.entries(item._data)) {
        if (k === "index") {
          return;
        }
        data_ += ` data-${k}='${typeof v === "object" ? JSON.stringify(v) : v}'`;
      }
    }
    html.push(
      "<tr",
      utils_default.sprintf(" %s", htmlAttributes.length ? htmlAttributes.join(" ") : void 0),
      utils_default.sprintf(' id="%s"', Array.isArray(item) ? void 0 : item._id),
      utils_default.sprintf(' class="%s"', style.classes || (Array.isArray(item) ? void 0 : item._class)),
      utils_default.sprintf(' style="%s"', Array.isArray(item) ? void 0 : item._style),
      ` data-index="${i}"`,
      utils_default.sprintf(' data-uniqueid="%s"', utils_default.getItemField(item, this.options.uniqueId, false)),
      utils_default.sprintf(' data-has-detail-view="%s"', this.options.detailView && utils_default.calculateObjectValue(null, this.options.detailFilter, [i, item]) ? "true" : void 0),
      utils_default.sprintf("%s", data_),
      ">"
    );
    if (this.options.cardView) {
      html.push(`<td colspan="${this.header.fields.length}"><div class="card-views">`);
    }
    let detailViewTemplate = "";
    if (utils_default.hasDetailViewIcon(this.options)) {
      detailViewTemplate = "<td>";
      if (utils_default.calculateObjectValue(null, this.options.detailFilter, [i, item])) {
        detailViewTemplate += `
          <a class="detail-icon" href="#">
          ${utils_default.sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailOpen)}
          </a>
        `;
      }
      detailViewTemplate += "</td>";
    }
    if (detailViewTemplate && this.options.detailViewAlign !== "right") {
      html.push(detailViewTemplate);
    }
    this.header.fields.forEach((field, j) => {
      const column = this.columns[j];
      let text = "";
      const value_ = utils_default.getItemField(item, field, this.options.escape, column.escape);
      let value = "";
      let type = "";
      let cellStyle = {};
      let id_ = "";
      let class_ = this.header.classes[j];
      let style_ = "";
      let styleToAdd_ = "";
      let data_2 = "";
      let rowspan_ = "";
      let colspan_ = "";
      let title_ = "";
      if ((this.fromHtml || this.autoMergeCells) && typeof value_ === "undefined") {
        if (!column.checkbox && !column.radio) {
          return;
        }
      }
      if (!column.visible) {
        return;
      }
      if (this.options.cardView && !column.cardVisible) {
        return;
      }
      if (csses.concat([this.header.styles[j]]).length) {
        styleToAdd_ += `${csses.concat([this.header.styles[j]]).join("; ")}`;
      }
      if (item[`_${field}_style`]) {
        styleToAdd_ += `${item[`_${field}_style`]}`;
      }
      if (styleToAdd_) {
        style_ = ` style="${styleToAdd_}"`;
      }
      if (item[`_${field}_id`]) {
        id_ = utils_default.sprintf(' id="%s"', item[`_${field}_id`]);
      }
      if (item[`_${field}_class`]) {
        class_ = utils_default.sprintf(' class="%s"', item[`_${field}_class`]);
      }
      if (item[`_${field}_rowspan`]) {
        rowspan_ = utils_default.sprintf(' rowspan="%s"', item[`_${field}_rowspan`]);
      }
      if (item[`_${field}_colspan`]) {
        colspan_ = utils_default.sprintf(' colspan="%s"', item[`_${field}_colspan`]);
      }
      if (item[`_${field}_title`]) {
        title_ = utils_default.sprintf(' title="%s"', item[`_${field}_title`]);
      }
      cellStyle = utils_default.calculateObjectValue(
        this.header,
        this.header.cellStyles[j],
        [value_, item, i, field],
        cellStyle
      );
      if (cellStyle.classes) {
        class_ = ` class="${cellStyle.classes}"`;
      }
      if (cellStyle.css) {
        const csses_ = [];
        for (const [key, value2] of Object.entries(cellStyle.css)) {
          csses_.push(`${key}: ${value2}`);
        }
        style_ = ` style="${csses_.concat(this.header.styles[j]).join("; ")}"`;
      }
      value = utils_default.calculateObjectValue(
        column,
        this.header.formatters[j],
        [value_, item, i, field],
        value_
      );
      if (!(column.checkbox || column.radio)) {
        value = typeof value === "undefined" || value === null ? this.options.undefinedText : value;
      }
      if (column.searchable && this.searchText && this.options.searchHighlight && !(column.checkbox || column.radio)) {
        let defValue = "";
        let searchText = this.searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        if (this.options.searchAccentNeutralise) {
          const indexRegex = new RegExp(`${utils_default.normalizeAccent(searchText)}`, "gmi");
          const match = indexRegex.exec(utils_default.normalizeAccent(value));
          if (match) {
            searchText = value.substring(match.index, match.index + searchText.length);
          }
        }
        const regExp = new RegExp(`(${searchText})`, "gim");
        const marker = "<mark>$1</mark>";
        const isHTML = value && /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(value);
        if (isHTML) {
          let textContent = new DOMParser().parseFromString(value.toString(), "text/html").documentElement.textContent;
          const textReplaced = textContent.replace(regExp, marker);
          textContent = textContent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          defValue = value.replace(new RegExp(`(>\\s*)(${textContent})(\\s*)`, "gm"), `$1${textReplaced}$3`);
        } else {
          defValue = value.toString().replace(regExp, marker);
        }
        value = utils_default.calculateObjectValue(column, column.searchHighlightFormatter, [value, this.searchText], defValue);
      }
      if (item[`_${field}_data`] && !utils_default.isEmptyObject(item[`_${field}_data`])) {
        for (const [k, v] of Object.entries(item[`_${field}_data`])) {
          if (k === "index") {
            return;
          }
          data_2 += ` data-${k}="${v}"`;
        }
      }
      if (column.checkbox || column.radio) {
        type = column.checkbox ? "checkbox" : type;
        type = column.radio ? "radio" : type;
        const c = column["class"] || "";
        const isChecked = utils_default.isObject(value) && value.hasOwnProperty("checked") ? value.checked : (value === true || value_) && value !== false;
        const isDisabled = !column.checkboxEnabled || value && value.disabled;
        text = [
          this.options.cardView ? `<div class="card-view ${c}">` : `<td class="bs-checkbox ${c}"${class_}${style_}>`,
          `<label>
            <input
            data-index="${i}"
            name="${this.options.selectItemName}"
            type="${type}"
            ${utils_default.sprintf('value="%s"', item[this.options.idField])}
            ${utils_default.sprintf('checked="%s"', isChecked ? "checked" : void 0)}
            ${utils_default.sprintf('disabled="%s"', isDisabled ? "disabled" : void 0)} />
            <span></span>
            </label>`,
          this.header.formatters[j] && typeof value === "string" ? value : "",
          this.options.cardView ? "</div>" : "</td>"
        ].join("");
        item[this.header.stateField] = value === true || (!!value_ || value && value.checked);
      } else if (this.options.cardView) {
        const cardTitle = this.options.showHeader ? `<span class="card-view-title ${cellStyle.classes || ""}"${style_}>${utils_default.getFieldTitle(this.columns, field)}</span>` : "";
        text = `<div class="card-view">${cardTitle}<span class="card-view-value ${cellStyle.classes || ""}"${style_}>${value}</span></div>`;
        if (this.options.smartDisplay && value === "") {
          text = '<div class="card-view"></div>';
        }
      } else {
        text = `<td${id_}${class_}${style_}${data_2}${rowspan_}${colspan_}${title_}>${value}</td>`;
      }
      html.push(text);
    });
    if (detailViewTemplate && this.options.detailViewAlign === "right") {
      html.push(detailViewTemplate);
    }
    if (this.options.cardView) {
      html.push("</div></td>");
    }
    html.push("</tr>");
    return html.join("");
  }
  initBody(fixedScroll, updatedUid) {
    const data = this.getData();
    this.trigger("pre-body", data);
    this.$body = this.$el.find(">tbody");
    if (!this.$body.length) {
      this.$body = $("<tbody></tbody>").appendTo(this.$el);
    }
    if (!this.options.pagination || this.options.sidePagination === "server") {
      this.pageFrom = 1;
      this.pageTo = data.length;
    }
    const rows = [];
    const trFragments = $(document.createDocumentFragment());
    let hasTr = false;
    const toExpand = [];
    this.autoMergeCells = utils_default.checkAutoMergeCells(data.slice(this.pageFrom - 1, this.pageTo));
    for (let i = this.pageFrom - 1; i < this.pageTo; i++) {
      const item = data[i];
      let tr = this.initRow(item, i, data, trFragments);
      hasTr = hasTr || !!tr;
      if (tr && typeof tr === "string") {
        const uniqueId = this.options.uniqueId;
        if (uniqueId && item.hasOwnProperty(uniqueId)) {
          const itemUniqueId = item[uniqueId];
          const oldTr = this.$body.find(utils_default.sprintf('> tr[data-uniqueid="%s"][data-has-detail-view]', itemUniqueId));
          const oldTrNext = oldTr.next();
          if (oldTrNext.is("tr.detail-view")) {
            toExpand.push(i);
            if (!updatedUid || itemUniqueId !== updatedUid) {
              tr += oldTrNext[0].outerHTML;
            }
          }
        }
        if (!this.options.virtualScroll) {
          trFragments.append(tr);
        } else {
          rows.push(tr);
        }
      }
    }
    if (!hasTr) {
      this.$body.html(`<tr class="no-records-found">${utils_default.sprintf(
        '<td colspan="%s">%s</td>',
        this.getVisibleFields().length + utils_default.getDetailViewIndexOffset(this.options),
        this.options.formatNoMatches()
      )}</tr>`);
    } else if (!this.options.virtualScroll) {
      this.$body.html(trFragments);
    } else {
      if (this.virtualScroll) {
        this.virtualScroll.destroy();
      }
      this.virtualScroll = new virtual_scroll_default({
        rows,
        fixedScroll,
        scrollEl: this.$tableBody[0],
        contentEl: this.$body[0],
        itemHeight: this.options.virtualScrollItemHeight,
        callback: (startIndex, endIndex) => {
          this.fitHeader();
          this.initBodyEvent();
          this.trigger("virtual-scroll", startIndex, endIndex);
        }
      });
    }
    toExpand.forEach((index) => {
      this.expandRow(index);
    });
    if (!fixedScroll) {
      this.scrollTo(0);
    }
    this.initBodyEvent();
    this.initFooter();
    this.resetView();
    this.updateSelected();
    if (this.options.sidePagination !== "server") {
      this.options.totalRows = data.length;
    }
    this.trigger("post-body", data);
  }
  initBodyEvent() {
    this.$body.find("> tr[data-index] > td").off("click dblclick").on("click dblclick", (e) => {
      const $td = $(e.currentTarget);
      if ($td.find(".detail-icon").length || $td.index() - utils_default.getDetailViewIndexOffset(this.options) < 0) {
        return;
      }
      const $tr = $td.parent();
      const $cardViewArr = $(e.target).parents(".card-views").children();
      const $cardViewTarget = $(e.target).parents(".card-view");
      const rowIndex = $tr.data("index");
      const item = this.data[rowIndex];
      const index = this.options.cardView ? $cardViewArr.index($cardViewTarget) : $td[0].cellIndex;
      const fields = this.getVisibleFields();
      const field = fields[index - utils_default.getDetailViewIndexOffset(this.options)];
      const column = this.columns[this.fieldsColumnsIndex[field]];
      const value = utils_default.getItemField(item, field, this.options.escape, column.escape);
      this.trigger(e.type === "click" ? "click-cell" : "dbl-click-cell", field, value, item, $td);
      this.trigger(e.type === "click" ? "click-row" : "dbl-click-row", item, $tr, field);
      if (e.type === "click" && this.options.clickToSelect && column.clickToSelect && !utils_default.calculateObjectValue(this.options, this.options.ignoreClickToSelectOn, [e.target])) {
        const $selectItem = $tr.find(utils_default.sprintf('[name="%s"]', this.options.selectItemName));
        if ($selectItem.length) {
          $selectItem[0].click();
        }
      }
      if (e.type === "click" && this.options.detailViewByClick) {
        this.toggleDetailView(rowIndex, this.header.detailFormatters[this.fieldsColumnsIndex[field]]);
      }
    }).off("mousedown").on("mousedown", (e) => {
      this.multipleSelectRowCtrlKey = e.ctrlKey || e.metaKey;
      this.multipleSelectRowShiftKey = e.shiftKey;
    });
    this.$body.find("> tr[data-index] > td > .detail-icon").off("click").on("click", (e) => {
      e.preventDefault();
      this.toggleDetailView($(e.currentTarget).parent().parent().data("index"));
      return false;
    });
    this.$selectItem = this.$body.find(utils_default.sprintf('[name="%s"]', this.options.selectItemName));
    this.$selectItem.off("click").on("click", (e) => {
      e.stopImmediatePropagation();
      const $this = $(e.currentTarget);
      this._toggleCheck($this.prop("checked"), $this.data("index"));
    });
    this.header.events.forEach((_events, i) => {
      let events = _events;
      if (!events) {
        return;
      }
      if (typeof events === "string") {
        events = utils_default.calculateObjectValue(null, events);
      }
      if (!events) {
        throw new Error(`Unknown event in the scope: ${_events}`);
      }
      const field = this.header.fields[i];
      let fieldIndex = this.getVisibleFields().indexOf(field);
      if (fieldIndex === -1) {
        return;
      }
      fieldIndex += utils_default.getDetailViewIndexOffset(this.options);
      for (const key in events) {
        if (!events.hasOwnProperty(key)) {
          continue;
        }
        const event = events[key];
        this.$body.find(">tr:not(.no-records-found)").each((i2, tr) => {
          const $tr = $(tr);
          const $td = $tr.find(this.options.cardView ? ".card-views>.card-view" : ">td").eq(fieldIndex);
          const index = key.indexOf(" ");
          const name = key.substring(0, index);
          const el = key.substring(index + 1);
          $td.find(el).off(name).on(name, (e) => {
            const index2 = $tr.data("index");
            const row = this.data[index2];
            const value = row[field];
            event.apply(this, [e, value, row, index2]);
          });
        });
      }
    });
  }
  initServer(silent, query, url) {
    let data = {};
    const index = this.header.fields.indexOf(this.options.sortName);
    let params = {
      searchText: this.searchText,
      sortName: this.options.sortName,
      sortOrder: this.options.sortOrder
    };
    if (this.header.sortNames[index]) {
      params.sortName = this.header.sortNames[index];
    }
    if (this.options.pagination && this.options.sidePagination === "server") {
      params.pageSize = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;
      params.pageNumber = this.options.pageNumber;
    }
    if (!(url || this.options.url) && !this.options.ajax) {
      return;
    }
    if (this.options.queryParamsType === "limit") {
      params = {
        search: params.searchText,
        sort: params.sortName,
        order: params.sortOrder
      };
      if (this.options.pagination && this.options.sidePagination === "server") {
        params.offset = this.options.pageSize === this.options.formatAllRows() ? 0 : this.options.pageSize * (this.options.pageNumber - 1);
        params.limit = this.options.pageSize;
        if (params.limit === 0 || this.options.pageSize === this.options.formatAllRows()) {
          delete params.limit;
        }
      }
    }
    if (this.options.search && this.options.sidePagination === "server" && this.options.searchable && this.columns.filter((column) => column.searchable).length) {
      params.searchable = [];
      for (const column of this.columns) {
        if (!column.checkbox && column.searchable && (this.options.visibleSearch && column.visible || !this.options.visibleSearch)) {
          params.searchable.push(column.field);
        }
      }
    }
    if (!utils_default.isEmptyObject(this.filterColumnsPartial)) {
      params.filter = JSON.stringify(this.filterColumnsPartial, null);
    }
    utils_default.extend(params, query || {});
    data = utils_default.calculateObjectValue(this.options, this.options.queryParams, [params], data);
    if (data === false) {
      return;
    }
    if (!silent) {
      this.showLoading();
    }
    const request = utils_default.extend({}, utils_default.calculateObjectValue(null, this.options.ajaxOptions), {
      type: this.options.method,
      url: url || this.options.url,
      data: this.options.contentType === "application/json" && this.options.method === "post" ? JSON.stringify(data) : data,
      cache: this.options.cache,
      contentType: this.options.contentType,
      dataType: this.options.dataType,
      success: (_res, textStatus, jqXHR) => {
        const res = utils_default.calculateObjectValue(
          this.options,
          this.options.responseHandler,
          [_res, jqXHR],
          _res
        );
        this.load(res);
        this.trigger("load-success", res, jqXHR && jqXHR.status, jqXHR);
        if (!silent) {
          this.hideLoading();
        }
        if (this.options.sidePagination === "server" && this.options.pageNumber > 1 && res[this.options.totalField] > 0 && !res[this.options.dataField].length) {
          this.updatePagination();
        }
      },
      error: (jqXHR) => {
        if (jqXHR && jqXHR.status === 0 && this._xhrAbort) {
          this._xhrAbort = false;
          return;
        }
        let data2 = [];
        if (this.options.sidePagination === "server") {
          data2 = {};
          data2[this.options.totalField] = 0;
          data2[this.options.dataField] = [];
        }
        this.load(data2);
        this.trigger("load-error", jqXHR && jqXHR.status, jqXHR);
        if (!silent) {
          this.hideLoading();
        }
      }
    });
    if (this.options.ajax) {
      utils_default.calculateObjectValue(this, this.options.ajax, [request], null);
    } else {
      if (this._xhr && this._xhr.readyState !== 4) {
        this._xhrAbort = true;
        this._xhr.abort();
      }
      this._xhr = $.ajax(request);
    }
    return data;
  }
  initSearchText() {
    if (this.options.search) {
      this.searchText = "";
      if (this.options.searchText !== "") {
        const $search = utils_default.getSearchInput(this);
        $search.val(this.options.searchText);
        this.onSearch({ currentTarget: $search, firedByInitSearchText: true });
      }
    }
  }
  getCaret() {
    this.$header.find("th").each((i, th) => {
      $(th).find(".sortable").removeClass("desc asc").addClass($(th).data("field") === this.options.sortName ? this.options.sortOrder : "both");
    });
  }
  updateSelected() {
    const checkAll = this.$selectItem.filter(":enabled").length && this.$selectItem.filter(":enabled").length === this.$selectItem.filter(":enabled").filter(":checked").length;
    this.$selectAll.add(this.$selectAll_).prop("checked", checkAll);
    this.$selectItem.each((i, el) => {
      $(el).closest("tr")[$(el).prop("checked") ? "addClass" : "removeClass"]("selected");
    });
  }
  updateRows() {
    this.$selectItem.each((i, el) => {
      this.data[$(el).data("index")][this.header.stateField] = $(el).prop("checked");
    });
  }
  resetRows() {
    for (const row of this.data) {
      this.$selectAll.prop("checked", false);
      this.$selectItem.prop("checked", false);
      if (this.header.stateField) {
        row[this.header.stateField] = false;
      }
    }
    this.initHiddenRows();
  }
  trigger(_name, ...args) {
    const name = `${_name}.bs.table`;
    this.options[BootstrapTable.EVENTS[name]](...[...args, this]);
    this.$el.trigger($.Event(name, { sender: this }), args);
    this.options.onAll(name, ...[...args, this]);
    this.$el.trigger($.Event("all.bs.table", { sender: this }), [name, args]);
  }
  resetHeader() {
    clearTimeout(this.timeoutId_);
    this.timeoutId_ = setTimeout(() => this.fitHeader(), this.$el.is(":hidden") ? 100 : 0);
  }
  fitHeader() {
    if (this.$el.is(":hidden")) {
      this.timeoutId_ = setTimeout(() => this.fitHeader(), 100);
      return;
    }
    const fixedBody = this.$tableBody.get(0);
    const scrollWidth = this.hasScrollBar && fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight() ? utils_default.getScrollBarWidth() : 0;
    this.$el.css("margin-top", -this.$header.outerHeight());
    const focused = this.$tableHeader.find(":focus");
    if (focused.length > 0) {
      const $th = focused.parents("th");
      if ($th.length > 0) {
        const dataField = $th.attr("data-field");
        if (dataField !== void 0) {
          const $headerTh = this.$header.find(`[data-field='${dataField}']`);
          if ($headerTh.length > 0) {
            $headerTh.find(":input").addClass("focus-temp");
          }
        }
      }
    }
    this.$header_ = this.$header.clone(true, true);
    this.$selectAll_ = this.$header_.find('[name="btSelectAll"]');
    this.$tableHeader.css("margin-right", scrollWidth).find("table").css("width", this.$el.outerWidth()).html("").attr("class", this.$el.attr("class")).append(this.$header_);
    this.$tableLoading.css("width", this.$el.outerWidth());
    const focusedTemp = $(".focus-temp:visible:eq(0)");
    if (focusedTemp.length > 0) {
      focusedTemp.focus();
      this.$header.find(".focus-temp").removeClass("focus-temp");
    }
    this.$header.find("th[data-field]").each((i, el) => {
      this.$header_.find(utils_default.sprintf('th[data-field="%s"]', $(el).data("field"))).data($(el).data());
    });
    const visibleFields = this.getVisibleFields();
    const $ths = this.$header_.find("th");
    let $tr = this.$body.find(">tr:not(.no-records-found,.virtual-scroll-top)").eq(0);
    while ($tr.length && $tr.find('>td[colspan]:not([colspan="1"])').length) {
      $tr = $tr.next();
    }
    const trLength = $tr.find("> *").length;
    $tr.find("> *").each((i, el) => {
      const $this = $(el);
      if (utils_default.hasDetailViewIcon(this.options)) {
        if (i === 0 && this.options.detailViewAlign !== "right" || i === trLength - 1 && this.options.detailViewAlign === "right") {
          const $thDetail = $ths.filter(".detail");
          const zoomWidth2 = $thDetail.innerWidth() - $thDetail.find(".fht-cell").width();
          $thDetail.find(".fht-cell").width($this.innerWidth() - zoomWidth2);
          return;
        }
      }
      const index = i - utils_default.getDetailViewIndexOffset(this.options);
      let $th = this.$header_.find(utils_default.sprintf('th[data-field="%s"]', visibleFields[index]));
      if ($th.length > 1) {
        $th = $($ths[$this[0].cellIndex]);
      }
      const zoomWidth = $th.innerWidth() - $th.find(".fht-cell").width();
      $th.find(".fht-cell").width($this.innerWidth() - zoomWidth);
    });
    this.horizontalScroll();
    this.trigger("post-header");
  }
  initFooter() {
    if (!this.options.showFooter || this.options.cardView) {
      return;
    }
    const data = this.getData();
    const html = [];
    let detailTemplate = "";
    if (utils_default.hasDetailViewIcon(this.options)) {
      detailTemplate = '<th class="detail"><div class="th-inner"></div><div class="fht-cell"></div></th>';
    }
    if (detailTemplate && this.options.detailViewAlign !== "right") {
      html.push(detailTemplate);
    }
    for (const column of this.columns) {
      let falign = "";
      let valign = "";
      const csses = [];
      let style = {};
      let class_ = utils_default.sprintf(' class="%s"', column["class"]);
      if (!column.visible || this.footerData && this.footerData.length > 0 && !(column.field in this.footerData[0])) {
        continue;
      }
      if (this.options.cardView && !column.cardVisible) {
        return;
      }
      falign = utils_default.sprintf("text-align: %s; ", column.falign ? column.falign : column.align);
      valign = utils_default.sprintf("vertical-align: %s; ", column.valign);
      style = utils_default.calculateObjectValue(null, this.options.footerStyle, [column]);
      if (style && style.css) {
        for (const [key, value2] of Object.entries(style.css)) {
          csses.push(`${key}: ${value2}`);
        }
      }
      if (style && style.classes) {
        class_ = utils_default.sprintf(' class="%s"', column["class"] ? [column["class"], style.classes].join(" ") : style.classes);
      }
      html.push("<th", class_, utils_default.sprintf(' style="%s"', falign + valign + csses.concat().join("; ")));
      let colspan = 0;
      if (this.footerData && this.footerData.length > 0) {
        colspan = this.footerData[0][`_${column.field}_colspan`] || 0;
      }
      if (colspan) {
        html.push(` colspan="${colspan}" `);
      }
      html.push(">");
      html.push('<div class="th-inner">');
      let value = "";
      if (this.footerData && this.footerData.length > 0) {
        value = this.footerData[0][column.field] || "";
      }
      html.push(utils_default.calculateObjectValue(
        column,
        column.footerFormatter,
        [data, value],
        value
      ));
      html.push("</div>");
      html.push('<div class="fht-cell"></div>');
      html.push("</div>");
      html.push("</th>");
    }
    if (detailTemplate && this.options.detailViewAlign === "right") {
      html.push(detailTemplate);
    }
    if (!this.options.height && !this.$tableFooter.length) {
      this.$el.append("<tfoot><tr></tr></tfoot>");
      this.$tableFooter = this.$el.find("tfoot");
    }
    if (!this.$tableFooter.find("tr").length) {
      this.$tableFooter.html("<table><thead><tr></tr></thead></table>");
    }
    this.$tableFooter.find("tr").html(html.join(""));
    this.trigger("post-footer", this.$tableFooter);
  }
  fitFooter() {
    if (this.$el.is(":hidden")) {
      setTimeout(() => this.fitFooter(), 100);
      return;
    }
    const fixedBody = this.$tableBody.get(0);
    const scrollWidth = this.hasScrollBar && fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight() ? utils_default.getScrollBarWidth() : 0;
    this.$tableFooter.css("margin-right", scrollWidth).find("table").css("width", this.$el.outerWidth()).attr("class", this.$el.attr("class"));
    const $ths = this.$tableFooter.find("th");
    let $tr = this.$body.find(">tr:first-child:not(.no-records-found)");
    $ths.find(".fht-cell").width("auto");
    while ($tr.length && $tr.find('>td[colspan]:not([colspan="1"])').length) {
      $tr = $tr.next();
    }
    const trLength = $tr.find("> *").length;
    $tr.find("> *").each((i, el) => {
      const $this = $(el);
      if (utils_default.hasDetailViewIcon(this.options)) {
        if (i === 0 && this.options.detailViewAlign === "left" || i === trLength - 1 && this.options.detailViewAlign === "right") {
          const $thDetail = $ths.filter(".detail");
          const zoomWidth2 = $thDetail.innerWidth() - $thDetail.find(".fht-cell").width();
          $thDetail.find(".fht-cell").width($this.innerWidth() - zoomWidth2);
          return;
        }
      }
      const $th = $ths.eq(i);
      const zoomWidth = $th.innerWidth() - $th.find(".fht-cell").width();
      $th.find(".fht-cell").width($this.innerWidth() - zoomWidth);
    });
    this.horizontalScroll();
  }
  horizontalScroll() {
    this.$tableBody.off("scroll").on("scroll", () => {
      const scrollLeft = this.$tableBody.scrollLeft();
      if (this.options.showHeader && this.options.height) {
        this.$tableHeader.scrollLeft(scrollLeft);
      }
      if (this.options.showFooter && !this.options.cardView) {
        this.$tableFooter.scrollLeft(scrollLeft);
      }
      this.trigger("scroll-body", this.$tableBody);
    });
  }
  getVisibleFields() {
    const visibleFields = [];
    for (const field of this.header.fields) {
      const column = this.columns[this.fieldsColumnsIndex[field]];
      if (!column || !column.visible || this.options.cardView && !column.cardVisible) {
        continue;
      }
      visibleFields.push(field);
    }
    return visibleFields;
  }
  initHiddenRows() {
    this.hiddenRows = [];
  }
  // PUBLIC FUNCTION DEFINITION
  // =======================
  getOptions() {
    const options = utils_default.extend({}, this.options);
    delete options.data;
    return utils_default.extend(true, {}, options);
  }
  refreshOptions(options) {
    if (utils_default.compareObjects(this.options, options, true)) {
      return;
    }
    this.options = utils_default.extend(this.options, options);
    this.trigger("refresh-options", this.options);
    this.destroy();
    this.init();
  }
  getData(params) {
    let data = this.options.data;
    if ((this.searchText || this.options.customSearch || this.options.sortName !== void 0 || this.enableCustomSort || // Fix #4616: this.enableCustomSort is for extensions
    !utils_default.isEmptyObject(this.filterColumns) || typeof this.options.filterOptions.filterAlgorithm === "function" || !utils_default.isEmptyObject(this.filterColumnsPartial)) && (!params || !params.unfiltered)) {
      data = this.data;
    }
    if (params && !params.includeHiddenRows) {
      const hiddenRows = this.getHiddenRows();
      data = data.filter((row) => utils_default.findIndex(hiddenRows, row) === -1);
    }
    if (params && params.useCurrentPage) {
      data = data.slice(this.pageFrom - 1, this.pageTo);
    }
    if (params && params.formatted) {
      data.forEach((row) => {
        for (const [key, value] of Object.entries(row)) {
          const column = this.columns[this.fieldsColumnsIndex[key]];
          if (!column) {
            return;
          }
          row[key] = utils_default.calculateObjectValue(column, this.header.formatters[column.fieldIndex], [value, row, row.index, column.field], value);
        }
      });
    }
    return data;
  }
  getSelections() {
    return (this.options.maintainMetaData ? this.options.data : this.data).filter((row) => row[this.header.stateField] === true);
  }
  load(_data) {
    let fixedScroll = false;
    let data = _data;
    if (this.options.pagination && this.options.sidePagination === "server") {
      this.options.totalRows = data[this.options.totalField];
      this.options.totalNotFiltered = data[this.options.totalNotFilteredField];
      this.footerData = data[this.options.footerField] ? [data[this.options.footerField]] : void 0;
    }
    fixedScroll = data.fixedScroll;
    data = Array.isArray(data) ? data : data[this.options.dataField];
    this.initData(data);
    this.initSearch();
    this.initPagination();
    this.initBody(fixedScroll);
  }
  append(data) {
    this.initData(data, "append");
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true);
  }
  prepend(data) {
    this.initData(data, "prepend");
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true);
  }
  remove(params) {
    let removed = 0;
    for (let i = this.options.data.length - 1; i >= 0; i--) {
      const row = this.options.data[i];
      const value = utils_default.getItemField(row, params.field, this.options.escape, row.escape);
      if (value === void 0 && params.field !== "$index") {
        continue;
      }
      if (!row.hasOwnProperty(params.field) && params.field === "$index" && params.values.includes(i) || params.values.includes(value)) {
        removed++;
        this.options.data.splice(i, 1);
      }
    }
    if (!removed) {
      return;
    }
    if (this.options.sidePagination === "server") {
      this.options.totalRows -= removed;
      this.data = [...this.options.data];
    }
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true);
  }
  removeAll() {
    if (this.options.data.length > 0) {
      this.options.data.splice(0, this.options.data.length);
      this.initSearch();
      this.initPagination();
      this.initBody(true);
    }
  }
  insertRow(params) {
    if (!params.hasOwnProperty("index") || !params.hasOwnProperty("row")) {
      return;
    }
    this.options.data.splice(params.index, 0, params.row);
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true);
  }
  updateRow(params) {
    const allParams = Array.isArray(params) ? params : [params];
    for (const params2 of allParams) {
      if (!params2.hasOwnProperty("index") || !params2.hasOwnProperty("row")) {
        continue;
      }
      if (params2.hasOwnProperty("replace") && params2.replace) {
        this.options.data[params2.index] = params2.row;
      } else {
        utils_default.extend(this.options.data[params2.index], params2.row);
      }
    }
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true);
  }
  getRowByUniqueId(_id) {
    const uniqueId = this.options.uniqueId;
    const len = this.options.data.length;
    let id = _id;
    let dataRow = null;
    let i;
    let row;
    for (i = len - 1; i >= 0; i--) {
      row = this.options.data[i];
      const rowUniqueId = utils_default.getItemField(row, uniqueId, this.options.escape, row.escape);
      if (rowUniqueId === void 0) {
        continue;
      }
      if (typeof rowUniqueId === "string") {
        id = id.toString();
      } else if (typeof rowUniqueId === "number") {
        if (Number(rowUniqueId) === rowUniqueId && rowUniqueId % 1 === 0) {
          id = parseInt(id, 10);
        } else if (rowUniqueId === Number(rowUniqueId) && rowUniqueId !== 0) {
          id = parseFloat(id);
        }
      }
      if (rowUniqueId === id) {
        dataRow = row;
        break;
      }
    }
    return dataRow;
  }
  updateByUniqueId(params) {
    const allParams = Array.isArray(params) ? params : [params];
    let updatedUid = null;
    for (const params2 of allParams) {
      if (!params2.hasOwnProperty("id") || !params2.hasOwnProperty("row")) {
        continue;
      }
      const rowId = this.options.data.indexOf(this.getRowByUniqueId(params2.id));
      if (rowId === -1) {
        continue;
      }
      if (params2.hasOwnProperty("replace") && params2.replace) {
        this.options.data[rowId] = params2.row;
      } else {
        utils_default.extend(this.options.data[rowId], params2.row);
      }
      updatedUid = params2.id;
    }
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true, updatedUid);
  }
  removeByUniqueId(id) {
    const len = this.options.data.length;
    const row = this.getRowByUniqueId(id);
    if (row) {
      this.options.data.splice(this.options.data.indexOf(row), 1);
    }
    if (len === this.options.data.length) {
      return;
    }
    if (this.options.sidePagination === "server") {
      this.options.totalRows -= 1;
      this.data = [...this.options.data];
    }
    this.initSearch();
    this.initPagination();
    this.initBody(true);
  }
  _updateCellOnly(field, index) {
    const rowHtml = this.initRow(this.options.data[index], index);
    let fieldIndex = this.getVisibleFields().indexOf(field);
    if (fieldIndex === -1) {
      return;
    }
    fieldIndex += utils_default.getDetailViewIndexOffset(this.options);
    this.$body.find(`>tr[data-index=${index}]`).find(`>td:eq(${fieldIndex})`).replaceWith($(rowHtml).find(`>td:eq(${fieldIndex})`));
    this.initBodyEvent();
    this.initFooter();
    this.resetView();
    this.updateSelected();
  }
  updateCell(params) {
    if (!params.hasOwnProperty("index") || !params.hasOwnProperty("field") || !params.hasOwnProperty("value")) {
      return;
    }
    this.options.data[params.index][params.field] = params.value;
    if (params.reinit === false) {
      this._updateCellOnly(params.field, params.index);
      return;
    }
    this.initSort();
    this.initBody(true);
  }
  updateCellByUniqueId(params) {
    const allParams = Array.isArray(params) ? params : [params];
    allParams.forEach(({ id, field, value }) => {
      const index = this.options.data.indexOf(this.getRowByUniqueId(id));
      if (index === -1) {
        return;
      }
      this.options.data[index][field] = value;
    });
    if (params.reinit === false) {
      this._updateCellOnly(
        params.field,
        this.options.data.indexOf(this.getRowByUniqueId(params.id))
      );
      return;
    }
    this.initSort();
    this.initBody(true);
  }
  showRow(params) {
    this._toggleRow(params, true);
  }
  hideRow(params) {
    this._toggleRow(params, false);
  }
  _toggleRow(params, visible) {
    let row;
    if (params.hasOwnProperty("index")) {
      row = this.getData()[params.index];
    } else if (params.hasOwnProperty("uniqueId")) {
      row = this.getRowByUniqueId(params.uniqueId);
    }
    if (!row) {
      return;
    }
    const index = utils_default.findIndex(this.hiddenRows, row);
    if (!visible && index === -1) {
      this.hiddenRows.push(row);
    } else if (visible && index > -1) {
      this.hiddenRows.splice(index, 1);
    }
    this.initBody(true);
    this.initPagination();
  }
  getHiddenRows(show) {
    if (show) {
      this.initHiddenRows();
      this.initBody(true);
      this.initPagination();
      return;
    }
    const data = this.getData();
    const rows = [];
    for (const row of data) {
      if (this.hiddenRows.includes(row)) {
        rows.push(row);
      }
    }
    this.hiddenRows = rows;
    return rows;
  }
  showColumn(field) {
    const fields = Array.isArray(field) ? field : [field];
    fields.forEach((field2) => {
      this._toggleColumn(this.fieldsColumnsIndex[field2], true, true);
    });
  }
  hideColumn(field) {
    const fields = Array.isArray(field) ? field : [field];
    fields.forEach((field2) => {
      this._toggleColumn(this.fieldsColumnsIndex[field2], false, true);
    });
  }
  _toggleColumn(index, checked, needUpdate) {
    if (index === -1 || this.columns[index].visible === checked) {
      return;
    }
    this.columns[index].visible = checked;
    this.initHeader();
    this.initSearch();
    this.initPagination();
    this.initBody();
    if (this.options.showColumns) {
      const $items = this.$toolbar.find('.keep-open input:not(".toggle-all")').prop("disabled", false);
      if (needUpdate) {
        $items.filter(utils_default.sprintf('[value="%s"]', index)).prop("checked", checked);
      }
      if ($items.filter(":checked").length <= this.options.minimumCountColumns) {
        $items.filter(":checked").prop("disabled", true);
      }
    }
  }
  getVisibleColumns() {
    return this.columns.filter((column) => column.visible && !this.isSelectionColumn(column));
  }
  getHiddenColumns() {
    return this.columns.filter(({ visible }) => !visible);
  }
  isSelectionColumn(column) {
    return column.radio || column.checkbox;
  }
  showAllColumns() {
    this._toggleAllColumns(true);
  }
  hideAllColumns() {
    this._toggleAllColumns(false);
  }
  _toggleAllColumns(visible) {
    for (const column of this.columns.slice().reverse()) {
      if (column.switchable) {
        if (!visible && this.options.showColumns && this.getVisibleColumns().filter((it) => it.switchable).length === this.options.minimumCountColumns) {
          continue;
        }
        column.visible = visible;
      }
    }
    this.initHeader();
    this.initSearch();
    this.initPagination();
    this.initBody();
    if (this.options.showColumns) {
      const $items = this.$toolbar.find('.keep-open input[type="checkbox"]:not(".toggle-all")').prop("disabled", false);
      if (visible) {
        $items.prop("checked", visible);
      } else {
        $items.get().reverse().forEach((item) => {
          if ($items.filter(":checked").length > this.options.minimumCountColumns) {
            $(item).prop("checked", visible);
          }
        });
      }
      if ($items.filter(":checked").length <= this.options.minimumCountColumns) {
        $items.filter(":checked").prop("disabled", true);
      }
    }
  }
  mergeCells(options) {
    const row = options.index;
    let col = this.getVisibleFields().indexOf(options.field);
    const rowspan = options.rowspan || 1;
    const colspan = options.colspan || 1;
    let i;
    let j;
    const $tr = this.$body.find(">tr[data-index]");
    col += utils_default.getDetailViewIndexOffset(this.options);
    const $td = $tr.eq(row).find(">td").eq(col);
    if (row < 0 || col < 0 || row >= this.data.length) {
      return;
    }
    for (i = row; i < row + rowspan; i++) {
      for (j = col; j < col + colspan; j++) {
        $tr.eq(i).find(">td").eq(j).hide();
      }
    }
    $td.attr("rowspan", rowspan).attr("colspan", colspan).show();
  }
  checkAll() {
    this._toggleCheckAll(true);
  }
  uncheckAll() {
    this._toggleCheckAll(false);
  }
  _toggleCheckAll(checked) {
    const rowsBefore = this.getSelections();
    this.$selectAll.add(this.$selectAll_).prop("checked", checked);
    this.$selectItem.filter(":enabled").prop("checked", checked);
    this.updateRows();
    this.updateSelected();
    const rowsAfter = this.getSelections();
    if (checked) {
      this.trigger("check-all", rowsAfter, rowsBefore);
      return;
    }
    this.trigger("uncheck-all", rowsAfter, rowsBefore);
  }
  checkInvert() {
    const $items = this.$selectItem.filter(":enabled");
    let checked = $items.filter(":checked");
    $items.each((i, el) => {
      $(el).prop("checked", !$(el).prop("checked"));
    });
    this.updateRows();
    this.updateSelected();
    this.trigger("uncheck-some", checked);
    checked = this.getSelections();
    this.trigger("check-some", checked);
  }
  check(index) {
    this._toggleCheck(true, index);
  }
  uncheck(index) {
    this._toggleCheck(false, index);
  }
  _toggleCheck(checked, index) {
    const $el = this.$selectItem.filter(`[data-index="${index}"]`);
    const row = this.data[index];
    if ($el.is(":radio") || this.options.singleSelect || this.options.multipleSelectRow && !this.multipleSelectRowCtrlKey && !this.multipleSelectRowShiftKey) {
      for (const r of this.options.data) {
        r[this.header.stateField] = false;
      }
      this.$selectItem.filter(":checked").not($el).prop("checked", false);
    }
    row[this.header.stateField] = checked;
    if (this.options.multipleSelectRow) {
      if (this.multipleSelectRowShiftKey && this.multipleSelectRowLastSelectedIndex >= 0) {
        const [fromIndex, toIndex] = this.multipleSelectRowLastSelectedIndex < index ? [this.multipleSelectRowLastSelectedIndex, index] : [index, this.multipleSelectRowLastSelectedIndex];
        for (let i = fromIndex + 1; i < toIndex; i++) {
          this.data[i][this.header.stateField] = true;
          this.$selectItem.filter(`[data-index="${i}"]`).prop("checked", true);
        }
      }
      this.multipleSelectRowCtrlKey = false;
      this.multipleSelectRowShiftKey = false;
      this.multipleSelectRowLastSelectedIndex = checked ? index : -1;
    }
    $el.prop("checked", checked);
    this.updateSelected();
    this.trigger(checked ? "check" : "uncheck", this.data[index], $el);
  }
  checkBy(obj) {
    this._toggleCheckBy(true, obj);
  }
  uncheckBy(obj) {
    this._toggleCheckBy(false, obj);
  }
  _toggleCheckBy(checked, obj) {
    if (!obj.hasOwnProperty("field") || !obj.hasOwnProperty("values")) {
      return;
    }
    const rows = [];
    this.data.forEach((row, i) => {
      if (!row.hasOwnProperty(obj.field)) {
        return false;
      }
      if (obj.values.includes(row[obj.field])) {
        let $el = this.$selectItem.filter(":enabled").filter(utils_default.sprintf('[data-index="%s"]', i));
        const onlyCurrentPage = obj.hasOwnProperty("onlyCurrentPage") ? obj.onlyCurrentPage : false;
        $el = checked ? $el.not(":checked") : $el.filter(":checked");
        if (!$el.length && onlyCurrentPage) {
          return;
        }
        $el.prop("checked", checked);
        row[this.header.stateField] = checked;
        rows.push(row);
        this.trigger(checked ? "check" : "uncheck", row, $el);
      }
    });
    this.updateSelected();
    this.trigger(checked ? "check-some" : "uncheck-some", rows);
  }
  refresh(params) {
    if (params && params.url) {
      this.options.url = params.url;
    }
    if (params && params.pageNumber) {
      this.options.pageNumber = params.pageNumber;
    }
    if (params && params.pageSize) {
      this.options.pageSize = params.pageSize;
    }
    this.trigger("refresh", this.initServer(
      params && params.silent,
      params && params.query,
      params && params.url
    ));
  }
  destroy() {
    this.$el.insertBefore(this.$container);
    $(this.options.toolbar).insertBefore(this.$el);
    this.$container.next().remove();
    this.$container.remove();
    this.$el.html(this.$el_.html()).css("margin-top", "0").attr("class", this.$el_.attr("class") || "");
    const resizeEvent = utils_default.getEventName("resize.bootstrap-table", this.$el.attr("id"));
    $(window).off(resizeEvent);
  }
  resetView(params) {
    let padding = 0;
    if (params && params.height) {
      this.options.height = params.height;
    }
    this.$tableContainer.toggleClass("has-card-view", this.options.cardView);
    if (this.options.height) {
      const fixedBody = this.$tableBody.get(0);
      this.hasScrollBar = fixedBody.scrollWidth > fixedBody.clientWidth;
    }
    if (!this.options.cardView && this.options.showHeader && this.options.height) {
      this.$tableHeader.show();
      this.resetHeader();
      padding += this.$header.outerHeight(true) + 1;
    } else {
      this.$tableHeader.hide();
      this.trigger("post-header");
    }
    if (!this.options.cardView && this.options.showFooter) {
      this.$tableFooter.show();
      this.fitFooter();
      if (this.options.height) {
        padding += this.$tableFooter.outerHeight(true);
      }
    }
    if (this.$container.hasClass("fullscreen")) {
      this.$tableContainer.css("height", "");
      this.$tableContainer.css("width", "");
    } else if (this.options.height) {
      if (this.$tableBorder) {
        this.$tableBorder.css("width", "");
        this.$tableBorder.css("height", "");
      }
      const toolbarHeight = this.$toolbar.outerHeight(true);
      const paginationHeight = this.$pagination.outerHeight(true);
      const height = this.options.height - toolbarHeight - paginationHeight;
      const $bodyTable = this.$tableBody.find(">table");
      const tableHeight = $bodyTable.outerHeight();
      this.$tableContainer.css("height", `${height}px`);
      if (this.$tableBorder && $bodyTable.is(":visible")) {
        let tableBorderHeight = height - tableHeight - 2;
        if (this.hasScrollBar) {
          tableBorderHeight -= utils_default.getScrollBarWidth();
        }
        this.$tableBorder.css("width", `${$bodyTable.outerWidth()}px`);
        this.$tableBorder.css("height", `${tableBorderHeight}px`);
      }
    }
    if (this.options.cardView) {
      this.$el.css("margin-top", "0");
      this.$tableContainer.css("padding-bottom", "0");
      this.$tableFooter.hide();
    } else {
      this.getCaret();
      this.$tableContainer.css("padding-bottom", `${padding}px`);
    }
    this.trigger("reset-view");
  }
  showLoading() {
    this.$tableLoading.toggleClass("open", true);
    let fontSize = this.options.loadingFontSize;
    if (this.options.loadingFontSize === "auto") {
      fontSize = this.$tableLoading.width() * 0.04;
      fontSize = Math.max(12, fontSize);
      fontSize = Math.min(32, fontSize);
      fontSize = `${fontSize}px`;
    }
    this.$tableLoading.find(".loading-text").css("font-size", fontSize);
  }
  hideLoading() {
    this.$tableLoading.toggleClass("open", false);
  }
  togglePagination() {
    this.options.pagination = !this.options.pagination;
    const icon = this.options.showButtonIcons ? this.options.pagination ? this.options.icons.paginationSwitchDown : this.options.icons.paginationSwitchUp : "";
    const text = this.options.showButtonText ? this.options.pagination ? this.options.formatPaginationSwitchUp() : this.options.formatPaginationSwitchDown() : "";
    this.$toolbar.find('button[name="paginationSwitch"]').html(`${utils_default.sprintf(this.constants.html.icon, this.options.iconsPrefix, icon)} ${text}`);
    this.updatePagination();
    this.trigger("toggle-pagination", this.options.pagination);
  }
  toggleFullscreen() {
    this.$el.closest(".bootstrap-table").toggleClass("fullscreen");
    this.resetView();
  }
  toggleView() {
    this.options.cardView = !this.options.cardView;
    this.initHeader();
    const icon = this.options.showButtonIcons ? this.options.cardView ? this.options.icons.toggleOn : this.options.icons.toggleOff : "";
    const text = this.options.showButtonText ? this.options.cardView ? this.options.formatToggleOff() : this.options.formatToggleOn() : "";
    this.$toolbar.find('button[name="toggle"]').html(`${utils_default.sprintf(this.constants.html.icon, this.options.iconsPrefix, icon)} ${text}`).attr("aria-label", text).attr("title", text);
    this.initBody();
    this.trigger("toggle", this.options.cardView);
  }
  resetSearch(text) {
    const $search = utils_default.getSearchInput(this);
    const textToUse = text || "";
    $search.val(textToUse);
    this.searchText = textToUse;
    this.onSearch({ currentTarget: $search }, false);
  }
  filterBy(columns, options) {
    this.filterOptions = utils_default.isEmptyObject(options) ? this.options.filterOptions : utils_default.extend(this.options.filterOptions, options);
    this.filterColumns = utils_default.isEmptyObject(columns) ? {} : columns;
    this.options.pageNumber = 1;
    this.initSearch();
    this.updatePagination();
  }
  scrollTo(params) {
    let options = { unit: "px", value: 0 };
    if (typeof params === "object") {
      options = Object.assign(options, params);
    } else if (typeof params === "string" && params === "bottom") {
      options.value = this.$tableBody[0].scrollHeight;
    } else if (typeof params === "string" || typeof params === "number") {
      options.value = params;
    }
    let scrollTo = options.value;
    if (options.unit === "rows") {
      scrollTo = 0;
      this.$body.find(`> tr:lt(${options.value})`).each((i, el) => {
        scrollTo += $(el).outerHeight(true);
      });
    }
    this.$tableBody.scrollTop(scrollTo);
  }
  getScrollPosition() {
    return this.$tableBody.scrollTop();
  }
  selectPage(page) {
    if (page > 0 && page <= this.options.totalPages) {
      this.options.pageNumber = page;
      this.updatePagination();
    }
  }
  prevPage() {
    if (this.options.pageNumber > 1) {
      this.options.pageNumber--;
      this.updatePagination();
    }
  }
  nextPage() {
    if (this.options.pageNumber < this.options.totalPages) {
      this.options.pageNumber++;
      this.updatePagination();
    }
  }
  toggleDetailView(index, _columnDetailFormatter) {
    const $tr = this.$body.find(utils_default.sprintf('> tr[data-index="%s"]', index));
    if ($tr.next().is("tr.detail-view")) {
      this.collapseRow(index);
    } else {
      this.expandRow(index, _columnDetailFormatter);
    }
    this.resetView();
  }
  expandRow(index, _columnDetailFormatter) {
    const row = this.data[index];
    const $tr = this.$body.find(utils_default.sprintf('> tr[data-index="%s"][data-has-detail-view]', index));
    if (this.options.detailViewIcon) {
      $tr.find("a.detail-icon").html(utils_default.sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailClose));
    }
    if ($tr.next().is("tr.detail-view")) {
      return;
    }
    $tr.after(utils_default.sprintf('<tr class="detail-view"><td colspan="%s"></td></tr>', $tr.children("td").length));
    const $element = $tr.next().find("td");
    const detailFormatter = _columnDetailFormatter || this.options.detailFormatter;
    const content = utils_default.calculateObjectValue(this.options, detailFormatter, [index, row, $element], "");
    if ($element.length === 1) {
      $element.append(content);
    }
    this.trigger("expand-row", index, row, $element);
  }
  expandRowByUniqueId(uniqueId) {
    const row = this.getRowByUniqueId(uniqueId);
    if (!row) {
      return;
    }
    this.expandRow(this.data.indexOf(row));
  }
  collapseRow(index) {
    const row = this.data[index];
    const $tr = this.$body.find(utils_default.sprintf('> tr[data-index="%s"][data-has-detail-view]', index));
    if (!$tr.next().is("tr.detail-view")) {
      return;
    }
    if (this.options.detailViewIcon) {
      $tr.find("a.detail-icon").html(utils_default.sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailOpen));
    }
    this.trigger("collapse-row", index, row, $tr.next());
    $tr.next().remove();
  }
  collapseRowByUniqueId(uniqueId) {
    const row = this.getRowByUniqueId(uniqueId);
    if (!row) {
      return;
    }
    this.collapseRow(this.data.indexOf(row));
  }
  expandAllRows() {
    const trs = this.$body.find("> tr[data-index][data-has-detail-view]");
    for (let i = 0; i < trs.length; i++) {
      this.expandRow($(trs[i]).data("index"));
    }
  }
  collapseAllRows() {
    const trs = this.$body.find("> tr[data-index][data-has-detail-view]");
    for (let i = 0; i < trs.length; i++) {
      this.collapseRow($(trs[i]).data("index"));
    }
  }
  updateColumnTitle(params) {
    if (!params.hasOwnProperty("field") || !params.hasOwnProperty("title")) {
      return;
    }
    this.columns[this.fieldsColumnsIndex[params.field]].title = this.options.escape && this.options.escapeTitle ? utils_default.escapeHTML(params.title) : params.title;
    if (this.columns[this.fieldsColumnsIndex[params.field]].visible) {
      this.$header.find("th[data-field]").each((i, el) => {
        if ($(el).data("field") === params.field) {
          $($(el).find(".th-inner")[0]).text(params.title);
          return false;
        }
      });
      this.resetView();
    }
  }
  updateFormatText(formatName, text) {
    if (!/^format/.test(formatName) || !this.options[formatName]) {
      return;
    }
    if (typeof text === "string") {
      this.options[formatName] = () => text;
    } else if (typeof text === "function") {
      this.options[formatName] = text;
    }
    this.initToolbar();
    this.initPagination();
    this.initBody();
  }
};
BootstrapTable.VERSION = constants_default.VERSION;
BootstrapTable.DEFAULTS = constants_default.DEFAULTS;
BootstrapTable.LOCALES = constants_default.LOCALES;
BootstrapTable.COLUMN_DEFAULTS = constants_default.COLUMN_DEFAULTS;
BootstrapTable.METHODS = constants_default.METHODS;
BootstrapTable.EVENTS = constants_default.EVENTS;
$.BootstrapTable = BootstrapTable;
$.fn.bootstrapTable = function(option, ...args) {
  let value;
  this.each((i, el) => {
    let data = $(el).data("bootstrap.table");
    if (typeof option === "string") {
      if (!constants_default.METHODS.includes(option)) {
        throw new Error(`Unknown method: ${option}`);
      }
      if (!data) {
        return;
      }
      value = data[option](...args);
      if (option === "destroy") {
        $(el).removeData("bootstrap.table");
      }
      return;
    }
    if (data) {
      console.warn("You cannot initialize the table more than once!");
      return;
    }
    const options = utils_default.extend(
      true,
      {},
      BootstrapTable.DEFAULTS,
      $(el).data(),
      typeof option === "object" && option
    );
    data = new $.BootstrapTable(el, options);
    $(el).data("bootstrap.table", data);
    data.init();
  });
  return typeof value === "undefined" ? this : value;
};
$.fn.bootstrapTable.Constructor = BootstrapTable;
$.fn.bootstrapTable.theme = constants_default.THEME;
$.fn.bootstrapTable.VERSION = constants_default.VERSION;
$.fn.bootstrapTable.defaults = BootstrapTable.DEFAULTS;
$.fn.bootstrapTable.columnDefaults = BootstrapTable.COLUMN_DEFAULTS;
$.fn.bootstrapTable.events = BootstrapTable.EVENTS;
$.fn.bootstrapTable.locales = BootstrapTable.LOCALES;
$.fn.bootstrapTable.methods = BootstrapTable.METHODS;
$.fn.bootstrapTable.utils = utils_default;
$(() => {
  $('[data-toggle="table"]').bootstrapTable();
});
var bootstrap_table_default = BootstrapTable;

// resources/js/plugins/bootstrap-table.ts
var BootstrapTable2 = class extends bootstrap_table_default {
  constructor(el, options) {
    super(el, options);
    this.options = options;
    this.$el = $(el);
    this.$el_ = this.$el.clone();
    this.timeoutId_ = 0;
    this.timeoutFooter_ = 0;
  }
  init() {
    this.initConstants();
    this.initLocale();
    if (this.options.alternativeContainer) {
      this.initAlternativeContainer();
    } else {
      this.initContainer();
    }
    this.initTable();
    this.initHeader();
    this.initData();
    this.initHiddenRows();
    this.initToolbar();
    this.initPagination();
    this.initBody();
    this.initSearchText();
    this.initServer();
  }
  initConstants() {
    const opts = this.options;
    this.constants = constants_default.CONSTANTS;
    this.constants.theme = $.fn.bootstrapTable.theme;
    this.constants.dataToggle = this.constants.html.dataToggle || "data-toggle";
    const iconsPrefix = utils_default.getIconsPrefix($.fn.bootstrapTable.theme);
    const icons = utils_default.getIcons(iconsPrefix);
    if (typeof opts.icons === "string") {
      opts.icons = utils_default.calculateObjectValue(null, opts.icons);
    }
    opts.iconsPrefix = opts.iconsPrefix || $.fn.bootstrapTable.defaults.iconsPrefix || iconsPrefix;
    opts.icons = Object.assign(icons, $.fn.bootstrapTable.defaults.icons, opts.icons);
    const buttonsPrefix = opts.buttonsPrefix ? `${opts.buttonsPrefix}-` : "";
    this.constants.buttonsClass = [
      opts.buttonsPrefix,
      buttonsPrefix + opts.buttonsClass,
      utils_default.sprintf(`${buttonsPrefix}%s`, opts.iconSize)
    ].join(" ").trim();
    this.buttons = utils_default.calculateObjectValue(this, opts.buttons, [], {});
    if (typeof this.buttons !== "object") {
      this.buttons = {};
    }
  }
  initLocale() {
    if (this.options.locale) {
      const locales = $.fn.bootstrapTable.locales;
      const parts = this.options.locale.split(/-|_/);
      parts[0] = parts[0].toLowerCase();
      if (parts[1]) {
        parts[1] = parts[1].toUpperCase();
      }
      let localesToExtend = {};
      if (locales[this.options.locale]) {
        localesToExtend = locales[this.options.locale];
      } else if (locales[parts.join("-")]) {
        localesToExtend = locales[parts.join("-")];
      } else if (locales[parts[0]]) {
        localesToExtend = locales[parts[0]];
      }
      for (const [formatName, func] of Object.entries(localesToExtend)) {
        if (this.options[formatName] !== BootstrapTable2.DEFAULTS[formatName]) {
          continue;
        }
        this.options[formatName] = func;
      }
    }
  }
  initAlternativeContainer() {
    const topPagination = ["top", "both"].includes(this.options.paginationVAlign) ? '<div class="fixed-table-pagination"></div>' : "";
    const bottomPagination = ["bottom", "both"].includes(this.options.paginationVAlign) ? '<div class="fixed-table-pagination float-end"  style="width:calc(100% - 390px);"></div>' : "";
    const loadingTemplate = $.fn.bootstrapTable.utils.calculateObjectValue(
      this.options,
      this.options.loadingTemplate,
      [this.options.formatLoadingMessage()]
    );
    this.$container = $(`
          <div class="bootstrap-table ${this.constants.theme}">
          <div class="justify-content-between flex toolbar_parent">
            <div class="fixed-table-toolbar""></div>
            ${topPagination}
          </div>
          <div class="fixed-table-container">
          <div class="fixed-table-header"><table></table></div>
          <div class="fixed-table-body">
          <div class="fixed-table-loading">
          ${loadingTemplate}
          </div>
          </div>
          <div class="fixed-table-footer"></div>
          </div>
          ${bottomPagination}
          </div>
        `);
    this.$container.insertAfter(this.$el);
    this.$tableContainer = this.$container.find(".fixed-table-container");
    this.$tableHeader = this.$container.find(".fixed-table-header");
    this.$tableBody = this.$container.find(".fixed-table-body");
    this.$tableLoading = this.$container.find(".fixed-table-loading");
    this.$tableFooter = this.$el.find("tfoot");
    if (this.options.buttonsToolbar) {
      this.$toolbar = $("body").find(this.options.buttonsToolbar);
    } else {
      this.$toolbar = this.$container.find(".fixed-table-toolbar");
    }
    this.$pagination = this.$container.find(".fixed-table-pagination");
    this.$tableBody.append(this.$el);
    this.$container.after('<div class="clearfix"></div>');
    this.$el.addClass(this.options.classes);
    this.$tableLoading.addClass(this.options.classes);
    if (this.options.height) {
      this.$tableContainer.addClass("fixed-height");
      if (this.options.showFooter) {
        this.$tableContainer.addClass("has-footer");
      }
      if (this.options.classes.split(" ").includes("table-bordered")) {
        this.$tableBody.append('<div class="fixed-table-border"></div>');
        this.$tableBorder = this.$tableBody.find(".fixed-table-border");
        this.$tableLoading.addClass("fixed-table-border");
      }
      this.$tableFooter = this.$container.find(".fixed-table-footer");
    }
  }
  initTable() {
    const columns = [];
    this.$header = this.$el.find(">thead");
    if (!this.$header.length) {
      this.$header = $(`<thead class="${this.options.theadClasses}"></thead>`).appendTo(this.$el);
    } else if (this.options.theadClasses) {
      this.$header.addClass(this.options.theadClasses);
    }
    this._headerTrClasses = [];
    this._headerTrStyles = [];
    this.$header.find("tr").each((i, el) => {
      const $tr = $(el);
      const column = [];
      $tr.find("th").each((i2, el2) => {
        const $th = $(el2);
        if (typeof $th.data("field") !== "undefined") {
          $th.data("field", `${$th.data("field")}`);
        }
        column.push($.extend({}, {
          title: $th.html(),
          class: $th.attr("class"),
          titleTooltip: $th.attr("title"),
          rowspan: $th.attr("rowspan") ? +$th.attr("rowspan") : void 0,
          colspan: $th.attr("colspan") ? +$th.attr("colspan") : void 0
        }, $th.data()));
      });
      columns.push(column);
      if ($tr.attr("class")) {
        this._headerTrClasses.push($tr.attr("class"));
      }
      if ($tr.attr("style")) {
        this._headerTrStyles.push($tr.attr("style"));
      }
    });
    if (!Array.isArray(this.options.columns[0])) {
      this.options.columns = [this.options.columns];
    }
    this.options.columns = $.extend(true, [], columns, this.options.columns);
    this.columns = [];
    this.fieldsColumnsIndex = [];
    utils_default.setFieldIndex(this.options.columns);
    this.options.columns.forEach((columns2, i) => {
      columns2.forEach((_column, j) => {
        const column = $.extend({}, BootstrapTable2.COLUMN_DEFAULTS, _column, { passed: _column });
        if (typeof column.fieldIndex !== "undefined") {
          this.columns[column.fieldIndex] = column;
          this.fieldsColumnsIndex[column.field] = column.fieldIndex;
        }
        this.options.columns[i][j] = column;
      });
    });
    if (!this.options.data.length) {
      const htmlData = utils_default.trToData(this.columns, this.$el.find(">tbody>tr"));
      if (htmlData.length) {
        this.options.data = htmlData;
        this.fromHtml = true;
      }
    }
    if (!(this.options.pagination && this.options.sidePagination !== "server")) {
      this.footerData = utils_default.trToData(this.columns, this.$el.find(">tfoot>tr"));
    }
    if (this.footerData) {
      this.$el.find("tfoot").html("<tr></tr>");
    }
    if (!this.options.showFooter || this.options.cardView) {
      this.$tableFooter.hide();
    } else {
      this.$tableFooter.show();
    }
  }
  initHeader() {
    const visibleColumns = {};
    const headerHtml = [];
    this.header = {
      fields: [],
      styles: [],
      classes: [],
      formatters: [],
      detailFormatters: [],
      events: [],
      sorters: [],
      sortNames: [],
      cellStyles: [],
      searchables: []
    };
    utils_default.updateFieldGroup(this.options.columns, this.columns);
    this.options.columns.forEach((columns, i) => {
      const html = [];
      html.push(`<tr${utils_default.sprintf(' class="%s"', this._headerTrClasses[i])} ${utils_default.sprintf(' style="%s"', this._headerTrStyles[i])}>`);
      let detailViewTemplate = "";
      if (i === 0 && utils_default.hasDetailViewIcon(this.options)) {
        const rowspan = this.options.columns.length > 1 ? ` rowspan="${this.options.columns.length}"` : "";
        detailViewTemplate = `<th class="detail"${rowspan}>
          <div class="fht-cell"></div>
          </th>`;
      }
      if (detailViewTemplate && this.options.detailViewAlign !== "right") {
        html.push(detailViewTemplate);
      }
      columns.forEach((column, j) => {
        const class_ = utils_default.sprintf(' class="%s"', column["class"]);
        const unitWidth = column.widthUnit;
        const width = parseFloat(column.width);
        const columnHalign = column.halign ? column.halign : column.align;
        const halign = utils_default.sprintf("text-align: %s; ", columnHalign);
        const align = utils_default.sprintf("text-align: %s; ", column.align);
        let style = utils_default.sprintf("vertical-align: %s; ", column.valign);
        style += utils_default.sprintf("width: %s; ", (column.checkbox || column.radio) && !width ? !column.showSelectTitle ? "36px" : void 0 : width ? width + unitWidth : void 0);
        if (typeof column.fieldIndex === "undefined" && !column.visible) {
          return;
        }
        const headerStyle = utils_default.calculateObjectValue(null, this.options.headerStyle, [column]);
        const csses = [];
        let classes = "";
        if (headerStyle && headerStyle.css) {
          for (const [key, value] of Object.entries(headerStyle.css)) {
            csses.push(`${key}: ${value}`);
          }
        }
        if (headerStyle && headerStyle.classes) {
          classes = utils_default.sprintf(' class="%s"', column["class"] ? [column["class"], headerStyle.classes].join(" ") : headerStyle.classes);
        }
        if (typeof column.fieldIndex !== "undefined") {
          this.header.fields[column.fieldIndex] = column.field;
          this.header.styles[column.fieldIndex] = align + style;
          this.header.classes[column.fieldIndex] = class_;
          this.header.formatters[column.fieldIndex] = column.formatter;
          this.header.detailFormatters[column.fieldIndex] = column.detailFormatter;
          this.header.events[column.fieldIndex] = column.events;
          this.header.sorters[column.fieldIndex] = column.sorter;
          this.header.sortNames[column.fieldIndex] = column.sortName;
          this.header.cellStyles[column.fieldIndex] = column.cellStyle;
          this.header.searchables[column.fieldIndex] = column.searchable;
          if (!column.visible) {
            return;
          }
          if (this.options.cardView && !column.cardVisible) {
            return;
          }
          visibleColumns[column.field] = column;
        }
        html.push(
          `<th${utils_default.sprintf(' title="%s"', column.titleTooltip)}`,
          column.checkbox || column.radio ? utils_default.sprintf(' class="bs-checkbox %s"', column["class"] || "") : classes || class_,
          utils_default.sprintf(' style="%s"', halign + style + csses.join("; ")),
          utils_default.sprintf(' rowspan="%s"', column.rowspan),
          utils_default.sprintf(' colspan="%s"', column.colspan),
          utils_default.sprintf(' data-field="%s"', column.field),
          // If `column` is not the first element of `this.options.columns[0]`, then className 'data-not-first-th' should be added.
          j === 0 && i > 0 ? " data-not-first-th" : "",
          ">"
        );
        html.push(utils_default.sprintf(
          '<div class="th-inner %s">',
          this.options.sortable && column.sortable ? `sortable${columnHalign === "center" ? " sortable-center" : ""} both` : ""
        ));
        let text = this.options.escape ? utils_default.escapeHTML(column.title) : column.title;
        const title = text;
        if (column.checkbox) {
          text = "";
          if (!this.options.singleSelect && this.options.checkboxHeader) {
            text = '<label><input name="btSelectAll" type="checkbox" /><span></span></label>';
          }
          this.header.stateField = column.field;
        }
        if (column.radio) {
          text = "";
          this.header.stateField = column.field;
        }
        if (!text && column.showSelectTitle) {
          text += title;
        }
        html.push(text);
        html.push("</div>");
        html.push('<div class="fht-cell"></div>');
        html.push("</div>");
        html.push("</th>");
      });
      if (detailViewTemplate && this.options.detailViewAlign === "right") {
        html.push(detailViewTemplate);
      }
      html.push("</tr>");
      if (html.length > 3) {
        headerHtml.push(html.join(""));
      }
    });
    this.$header.html(headerHtml.join(""));
    this.$header.find("th[data-field]").each((i, el) => {
      $(el).data(visibleColumns[$(el).data("field")]);
    });
    this.$container.off("click", ".th-inner").on("click", ".th-inner", (e) => {
      const $this = $(e.currentTarget);
      if (this.options.detailView && !$this.parent().hasClass("bs-checkbox")) {
        if ($this.closest(".bootstrap-table")[0] !== this.$container[0]) {
          return false;
        }
      }
      if (this.options.sortable && $this.parent().data().sortable) {
        this.onSort(e);
      }
    });
    const resizeEvent = utils_default.getEventName("resize.bootstrap-table", this.$el.attr("id"));
    $(window).off(resizeEvent);
    if (!this.options.showHeader || this.options.cardView) {
      this.$header.hide();
      this.$tableHeader.hide();
      this.$tableLoading.css("top", 0);
    } else {
      this.$header.show();
      this.$tableHeader.show();
      this.$tableLoading.css("top", this.$header.outerHeight() + 1);
      this.getCaret();
      $(window).on(resizeEvent, () => this.resetView());
    }
    this.$selectAll = this.$header.find('[name="btSelectAll"]');
    this.$selectAll.off("click").on("click", (e) => {
      e.stopPropagation();
      const checked = $(e.currentTarget).prop("checked");
      this[checked ? "checkAll" : "uncheckAll"]();
      this.updateSelected();
    });
  }
  initData(data, type) {
    if (type === "append") {
      this.options.data = this.options.data.concat(data);
    } else if (type === "prepend") {
      this.options.data = [].concat(data).concat(this.options.data);
    } else {
      data = data || utils_default.deepCopy(this.options.data);
      this.options.data = Array.isArray(data) ? data : data[this.options.dataField];
    }
    this.data = [...this.options.data];
    if (this.options.sortReset) {
      this.unsortedData = [...this.data];
    }
    if (this.options.sidePagination === "server") {
      return;
    }
    this.initSort();
  }
  initSort() {
    let name = this.options.sortName;
    const order = this.options.sortOrder === "desc" ? -1 : 1;
    const index = this.header.fields.indexOf(this.options.sortName);
    let timeoutId = 0;
    if (index !== -1) {
      if (this.options.sortStable) {
        this.data.forEach((row, i) => {
          if (!row.hasOwnProperty("_position")) {
            row._position = i;
          }
        });
      }
      if (this.options.customSort) {
        utils_default.calculateObjectValue(this.options, this.options.customSort, [
          this.options.sortName,
          this.options.sortOrder,
          this.data
        ]);
      } else {
        this.data.sort((a, b) => {
          if (this.header.sortNames[index]) {
            name = this.header.sortNames[index];
          }
          const aa = utils_default.getItemField(a, name, this.options.escape);
          const bb = utils_default.getItemField(b, name, this.options.escape);
          const value = utils_default.calculateObjectValue(this.header, this.header.sorters[index], [aa, bb, a, b]);
          if (value !== void 0) {
            if (this.options.sortStable && value === 0) {
              return order * (a._position - b._position);
            }
            return order * value;
          }
          return utils_default.sort(aa, bb, order, this.options, a._position, b._position);
        });
      }
      if (this.options.sortClass !== void 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          this.$el.removeClass(this.options.sortClass);
          const index2 = this.$header.find(`[data-field="${this.options.sortName}"]`).index();
          this.$el.find(`tr td:nth-child(${index2 + 1})`).addClass(this.options.sortClass);
        }, 250);
      }
    } else if (this.options.sortReset) {
      this.data = [...this.unsortedData];
    }
  }
  onSort({ type, currentTarget }) {
    const $this = type === "keypress" ? $(currentTarget) : $(currentTarget).parent();
    const $this_ = this.$header.find("th").eq($this.index());
    this.$header.add(this.$header_).find("span.order").remove();
    if (this.options.sortName === $this.data("field")) {
      const currentSortOrder = this.options.sortOrder;
      if (currentSortOrder === void 0) {
        this.options.sortOrder = "asc";
      } else if (currentSortOrder === "asc") {
        this.options.sortOrder = "desc";
      } else if (this.options.sortOrder === "desc") {
        this.options.sortOrder = this.options.sortReset ? void 0 : "asc";
      }
      if (this.options.sortOrder === void 0) {
        this.options.sortName = void 0;
      }
    } else {
      this.options.sortName = $this.data("field");
      if (this.options.rememberOrder) {
        this.options.sortOrder = $this.data("order") === "asc" ? "desc" : "asc";
      } else {
        this.options.sortOrder = this.columns[this.fieldsColumnsIndex[$this.data("field")]].sortOrder || this.columns[this.fieldsColumnsIndex[$this.data("field")]].order;
      }
    }
    this.trigger("sort", this.options.sortName, this.options.sortOrder);
    $this.add($this_).data("order", this.options.sortOrder);
    this.getCaret();
    if (this.options.sidePagination === "server" && this.options.serverSort) {
      this.options.pageNumber = 1;
      this.initServer(this.options.silentSort);
      return;
    }
    this.initSort();
    this.initBody();
  }
  initToolbar() {
    const opts = this.options;
    let html = [];
    let timeoutId = 0;
    let $keepOpen;
    let switchableCount = 0;
    if (this.$toolbar.find(".bs-bars").children().length) {
      $("body").append($(opts.toolbar));
    }
    this.$toolbar.html("");
    if (typeof opts.toolbar === "string" || typeof opts.toolbar === "object") {
      $(utils_default.sprintf('<div class="bs-bars %s-%s"></div>', this.constants.classes.pull, opts.toolbarAlign)).appendTo(this.$toolbar).append($(opts.toolbar));
    }
    html = [`<div class="${[
      "columns",
      `columns-${opts.buttonsAlign}`,
      this.constants.classes.buttonsGroup,
      `${this.constants.classes.pull}-${opts.buttonsAlign}`
    ].join(" ")}">`];
    if (typeof opts.buttonsOrder === "string") {
      opts.buttonsOrder = opts.buttonsOrder.replace(/\[|\]| |'/g, "").split(",");
    }
    this.buttons = Object.assign(this.buttons, {
      paginationSwitch: {
        text: opts.pagination ? opts.formatPaginationSwitchUp() : opts.formatPaginationSwitchDown(),
        icon: opts.pagination ? opts.icons.paginationSwitchDown : opts.icons.paginationSwitchUp,
        render: false,
        event: this.togglePagination,
        attributes: {
          "aria-label": opts.formatPaginationSwitch(),
          title: opts.formatPaginationSwitch()
        }
      },
      refresh: {
        text: opts.formatRefresh(),
        icon: opts.icons.refresh,
        render: false,
        event: this.refresh,
        attributes: {
          "aria-label": opts.formatRefresh(),
          title: opts.formatRefresh()
        }
      },
      toggle: {
        text: opts.formatToggleOn(),
        icon: opts.icons.toggleOff,
        render: false,
        event: this.toggleView,
        attributes: {
          "aria-label": opts.formatToggleOn(),
          title: opts.formatToggleOn()
        }
      },
      fullscreen: {
        text: opts.formatFullscreen(),
        icon: opts.icons.fullscreen,
        render: false,
        event: this.toggleFullscreen,
        attributes: {
          "aria-label": opts.formatFullscreen(),
          title: opts.formatFullscreen()
        }
      },
      columns: {
        render: false,
        html: () => {
          const html2 = [];
          html2.push(`<div class="keep-open ${this.constants.classes.buttonsDropdown}" title="${opts.formatColumns()}">
            <button class="${this.constants.buttonsClass} dropdown-toggle" type="button" ${this.constants.dataToggle}="dropdown"
            aria-label="${opts.formatColumns()}" title="${opts.formatColumns()}">
            ${opts.showButtonIcons ? utils_default.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.columns) : ""}
            ${opts.showButtonText ? opts.formatColumns() : ""}
            ${this.constants.html.dropdownCaret}
            </button>
            ${this.constants.html.toolbarDropdown[0]}`);
          if (opts.showColumnsSearch) {
            html2.push(
              utils_default.sprintf(
                this.constants.html.toolbarDropdownItem,
                utils_default.sprintf('<input type="text" class="%s" name="columnsSearch" placeholder="%s" autocomplete="off">', this.constants.classes.input, opts.formatSearch())
              )
            );
            html2.push(this.constants.html.toolbarDropdownSeparator);
          }
          if (opts.showColumnsToggleAll) {
            const allFieldsVisible = this.getVisibleColumns().length === this.columns.filter((column) => !this.isSelectionColumn(column)).length;
            html2.push(
              utils_default.sprintf(
                this.constants.html.toolbarDropdownItem,
                utils_default.sprintf(
                  '<input type="checkbox" class="toggle-all" %s> <span>%s</span>',
                  allFieldsVisible ? 'checked="checked"' : "",
                  opts.formatColumnsToggleAll()
                )
              )
            );
            html2.push(this.constants.html.toolbarDropdownSeparator);
          }
          let visibleColumns = 0;
          this.columns.forEach((column) => {
            if (column.visible) {
              visibleColumns++;
            }
          });
          this.columns.forEach((column, i) => {
            if (this.isSelectionColumn(column)) {
              return;
            }
            if (opts.cardView && !column.cardVisible) {
              return;
            }
            const checked = column.visible ? ' checked="checked"' : "";
            const disabled = visibleColumns <= opts.minimumCountColumns && checked ? ' disabled="disabled"' : "";
            if (column.switchable) {
              html2.push(utils_default.sprintf(
                this.constants.html.toolbarDropdownItem,
                utils_default.sprintf(
                  '<input type="checkbox" data-field="%s" value="%s"%s%s> <span>%s</span>',
                  column.field,
                  i,
                  checked,
                  disabled,
                  column.title
                )
              ));
              switchableCount++;
            }
          });
          html2.push(this.constants.html.toolbarDropdown[1], "</div>");
          return html2.join("");
        }
      }
    });
    const buttonsHtml = {};
    for (const [buttonName, buttonConfig] of Object.entries(this.buttons)) {
      let buttonHtml;
      if (buttonConfig.hasOwnProperty("html")) {
        if (typeof buttonConfig.html === "function") {
          buttonHtml = buttonConfig.html();
        } else if (typeof buttonConfig.html === "string") {
          buttonHtml = buttonConfig.html;
        }
      } else {
        buttonHtml = `<button class="${this.constants.buttonsClass}" type="button" name="${buttonName}"`;
        if (buttonConfig.hasOwnProperty("attributes")) {
          for (const [attributeName, value] of Object.entries(buttonConfig.attributes)) {
            buttonHtml += ` ${attributeName}="${value}"`;
          }
        }
        buttonHtml += ">";
        if (opts.showButtonIcons && buttonConfig.hasOwnProperty("icon")) {
          buttonHtml += `${utils_default.sprintf(this.constants.html.icon, opts.iconsPrefix, buttonConfig.icon)} `;
        }
        if (opts.showButtonText && buttonConfig.hasOwnProperty("text")) {
          buttonHtml += buttonConfig.text;
        }
        buttonHtml += "</button>";
      }
      buttonsHtml[buttonName] = buttonHtml;
      const optionName = `show${buttonName.charAt(0).toUpperCase()}${buttonName.substring(1)}`;
      const showOption = opts[optionName];
      if ((!buttonConfig.hasOwnProperty("render") || buttonConfig.hasOwnProperty("render") && buttonConfig.render) && (showOption === void 0 || showOption === true)) {
        opts[optionName] = true;
      }
      if (!opts.buttonsOrder.includes(buttonName)) {
        opts.buttonsOrder.push(buttonName);
      }
    }
    for (const button of opts.buttonsOrder) {
      const showOption = opts[`show${button.charAt(0).toUpperCase()}${button.substring(1)}`];
      if (showOption) {
        html.push(buttonsHtml[button]);
      }
    }
    html.push("</div>");
    if (this.showToolbar || html.length > 2) {
      this.$toolbar.append(html.join(""));
    }
    for (const [buttonName, buttonConfig] of Object.entries(this.buttons)) {
      if (buttonConfig.hasOwnProperty("event")) {
        if (typeof buttonConfig.event === "function" || typeof buttonConfig.event === "string") {
          const event = typeof buttonConfig.event === "string" ? window[buttonConfig.event] : buttonConfig.event;
          this.$toolbar.find(`button[name="${buttonName}"]`).off("click").on("click", () => event.call(this));
          continue;
        }
        for (const [eventType, eventFunction] of Object.entries(buttonConfig.event)) {
          const event = typeof eventFunction === "string" ? window[eventFunction] : eventFunction;
          this.$toolbar.find(`button[name="${buttonName}"]`).off(eventType).on(eventType, () => event.call(this));
        }
      }
    }
    if (opts.showColumns) {
      $keepOpen = this.$toolbar.find(".keep-open");
      const $checkboxes = $keepOpen.find('input[type="checkbox"]:not(".toggle-all")');
      const $toggleAll = $keepOpen.find('input[type="checkbox"].toggle-all');
      if (switchableCount <= opts.minimumCountColumns) {
        $keepOpen.find("input").prop("disabled", true);
      }
      $keepOpen.find("li, label").off("click").on("click", (e) => {
        e.stopImmediatePropagation();
      });
      $checkboxes.off("click").on("click", ({ currentTarget }) => {
        const $this = $(currentTarget);
        this._toggleColumn($this.val(), $this.prop("checked"), false);
        this.trigger("column-switch", $this.data("field"), $this.prop("checked"));
        $toggleAll.prop("checked", $checkboxes.filter(":checked").length === this.columns.filter((column) => !this.isSelectionColumn(column)).length);
      });
      $toggleAll.off("click").on("click", ({ currentTarget }) => {
        this._toggleAllColumns($(currentTarget).prop("checked"));
        this.trigger("column-switch-all", $(currentTarget).prop("checked"));
      });
      if (opts.showColumnsSearch) {
        const $columnsSearch = $keepOpen.find('[name="columnsSearch"]');
        const $listItems = $keepOpen.find(".dropdown-item-marker");
        $columnsSearch.on("keyup paste change", ({ currentTarget }) => {
          const $this = $(currentTarget);
          const searchValue = $this.val().toLowerCase();
          $listItems.show();
          $checkboxes.each((i, el) => {
            const $checkbox = $(el);
            const $listItem = $checkbox.parents(".dropdown-item-marker");
            const text = $listItem.text().toLowerCase();
            if (!text.includes(searchValue)) {
              $listItem.hide();
            }
          });
        });
      }
    }
    const handleInputEvent = ($searchInput) => {
      const eventTriggers = "keyup drop blur mouseup";
      $searchInput.off(eventTriggers).on(eventTriggers, (event) => {
        if (opts.searchOnEnterKey && event.keyCode !== 13) {
          return;
        }
        if ([37, 38, 39, 40].includes(event.keyCode)) {
          return;
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          this.onSearch({ currentTarget: event.currentTarget });
        }, opts.searchTimeOut);
      });
    };
    if ((opts.search || this.showSearchClearButton) && typeof opts.searchSelector !== "string") {
      html = [];
      const showSearchButton = utils_default.sprintf(
        this.constants.html.searchButton,
        this.constants.buttonsClass,
        opts.formatSearch(),
        opts.showButtonIcons ? utils_default.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.search) : "",
        opts.showButtonText ? opts.formatSearch() : ""
      );
      const showSearchClearButton = utils_default.sprintf(
        this.constants.html.searchClearButton,
        this.constants.buttonsClass,
        opts.formatClearSearch(),
        opts.showButtonIcons ? utils_default.sprintf(this.constants.html.icon, opts.iconsPrefix, opts.icons.clearSearch) : "",
        opts.showButtonText ? opts.formatClearSearch() : ""
      );
      const searchInputHtml = `<input class="${this.constants.classes.input}
        ${utils_default.sprintf(" %s%s", this.constants.classes.inputPrefix, opts.iconSize)}
        search-input" type="search" placeholder="${opts.formatSearch()}" autocomplete="off">`;
      let searchInputFinalHtml = searchInputHtml;
      if (opts.showSearchButton || opts.showSearchClearButton) {
        const buttonsHtml2 = (opts.showSearchButton ? showSearchButton : "") + (opts.showSearchClearButton ? showSearchClearButton : "");
        searchInputFinalHtml = opts.search ? utils_default.sprintf(
          this.constants.html.inputGroup,
          searchInputHtml,
          buttonsHtml2
        ) : buttonsHtml2;
      }
      html.push(utils_default.sprintf(`
        <div class="${this.constants.classes.pull}-${opts.searchAlign} search ${this.constants.classes.inputGroup}">
          %s
        </div>
      `, searchInputFinalHtml));
      this.$toolbar.append(html.join(""));
      const $searchInput = utils_default.getSearchInput(this);
      if (opts.showSearchButton) {
        this.$toolbar.find(".search button[name=search]").off("click").on("click", () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            this.onSearch({ currentTarget: $searchInput });
          }, opts.searchTimeOut);
        });
        if (opts.searchOnEnterKey) {
          handleInputEvent($searchInput);
        }
      } else {
        handleInputEvent($searchInput);
      }
      if (opts.showSearchClearButton) {
        this.$toolbar.find(".search button[name=clearSearch]").click(() => {
          this.resetSearch();
        });
      }
    } else if (typeof opts.searchSelector === "string") {
      const $searchInput = utils_default.getSearchInput(this);
      handleInputEvent($searchInput);
    }
  }
  onSearch({ currentTarget, firedByInitSearchText } = {}, overwriteSearchText = true) {
    if (currentTarget !== void 0 && $(currentTarget).length && overwriteSearchText) {
      const text = $(currentTarget).val().trim();
      if (this.options.trimOnSearch && $(currentTarget).val() !== text) {
        $(currentTarget).val(text);
      }
      if (this.searchText === text) {
        return;
      }
      const $searchInput = utils_default.getSearchInput(this);
      const $currentTarget = currentTarget instanceof jQuery ? currentTarget : $(currentTarget);
      if ($currentTarget.is($searchInput) || $currentTarget.hasClass("search-input")) {
        this.searchText = text;
        this.options.searchText = text;
      }
    }
    if (!firedByInitSearchText && !this.options.cookie) {
      this.options.pageNumber = 1;
    }
    this.initSearch();
    if (firedByInitSearchText) {
      if (this.options.sidePagination === "client") {
        this.updatePagination();
      }
    } else {
      this.updatePagination();
    }
    this.trigger("search", this.searchText);
  }
  initSearch() {
    this.filterOptions = this.filterOptions || this.options.filterOptions;
    if (this.options.sidePagination !== "server") {
      if (this.options.customSearch) {
        this.data = utils_default.calculateObjectValue(
          this.options,
          this.options.customSearch,
          [this.options.data, this.searchText, this.filterColumns]
        );
        if (this.options.sortReset) {
          this.unsortedData = [...this.data];
        }
        this.initSort();
        return;
      }
      const rawSearchText = this.searchText && (this.fromHtml ? utils_default.escapeHTML(this.searchText) : this.searchText);
      let searchText = rawSearchText ? rawSearchText.toLowerCase() : "";
      const f = utils_default.isEmptyObject(this.filterColumns) ? null : this.filterColumns;
      if (this.options.searchAccentNeutralise) {
        searchText = utils_default.normalizeAccent(searchText);
      }
      if (typeof this.filterOptions.filterAlgorithm === "function") {
        this.data = this.options.data.filter((item) => this.filterOptions.filterAlgorithm.apply(null, [item, f]));
      } else if (typeof this.filterOptions.filterAlgorithm === "string") {
        this.data = f ? this.options.data.filter((item) => {
          const filterAlgorithm = this.filterOptions.filterAlgorithm;
          if (filterAlgorithm === "and") {
            for (const key in f) {
              if (Array.isArray(f[key]) && !f[key].includes(item[key]) || !Array.isArray(f[key]) && item[key] !== f[key]) {
                return false;
              }
            }
          } else if (filterAlgorithm === "or") {
            let match = false;
            for (const key in f) {
              if (Array.isArray(f[key]) && f[key].includes(item[key]) || !Array.isArray(f[key]) && item[key] === f[key]) {
                match = true;
              }
            }
            return match;
          }
          return true;
        }) : [...this.options.data];
      }
      const visibleFields = this.getVisibleFields();
      this.data = searchText ? this.data.filter((item, i) => {
        for (let j = 0; j < this.header.fields.length; j++) {
          if (!this.header.searchables[j] || this.options.visibleSearch && visibleFields.indexOf(this.header.fields[j]) === -1) {
            continue;
          }
          const key = utils_default.isNumeric(this.header.fields[j]) ? parseInt(this.header.fields[j], 10) : this.header.fields[j];
          const column = this.columns[this.fieldsColumnsIndex[key]];
          let value;
          if (typeof key === "string") {
            value = item;
            const props = key.split(".");
            for (let i2 = 0; i2 < props.length; i2++) {
              if (value[props[i2]] !== null) {
                value = value[props[i2]];
              } else {
                value = null;
                break;
              }
            }
          } else {
            value = item[key];
          }
          if (this.options.searchAccentNeutralise) {
            value = utils_default.normalizeAccent(value);
          }
          if (column && column.searchFormatter) {
            value = utils_default.calculateObjectValue(
              column,
              this.header.formatters[j],
              [value, item, i, column.field],
              value
            );
          }
          if (typeof value === "string" || typeof value === "number") {
            if (this.options.strictSearch && `${value}`.toLowerCase() === searchText || this.options.regexSearch && utils_default.regexCompare(value, rawSearchText)) {
              return true;
            }
            const largerSmallerEqualsRegex = /(?:(<=|=>|=<|>=|>|<)(?:\s+)?(-?\d+)?|(-?\d+)?(\s+)?(<=|=>|=<|>=|>|<))/gm;
            const matches = largerSmallerEqualsRegex.exec(this.searchText);
            let comparisonCheck = false;
            if (matches) {
              const operator = matches[1] || `${matches[5]}l`;
              const comparisonValue = matches[2] || matches[3];
              const int = parseInt(value, 10);
              const comparisonInt = parseInt(comparisonValue, 10);
              switch (operator) {
                case ">":
                case "<l":
                  comparisonCheck = int > comparisonInt;
                  break;
                case "<":
                case ">l":
                  comparisonCheck = int < comparisonInt;
                  break;
                case "<=":
                case "=<":
                case ">=l":
                case "=>l":
                  comparisonCheck = int <= comparisonInt;
                  break;
                case ">=":
                case "=>":
                case "<=l":
                case "=<l":
                  comparisonCheck = int >= comparisonInt;
                  break;
                default:
                  break;
              }
            }
            if (comparisonCheck || `${value}`.toLowerCase().includes(searchText)) {
              return true;
            }
          }
        }
        return false;
      }) : this.data;
      if (this.options.sortReset) {
        this.unsortedData = [...this.data];
      }
      this.initSort();
    }
  }
  initPagination() {
    const opts = this.options;
    if (!opts.pagination) {
      this.$pagination.hide();
      return;
    }
    this.$pagination.show();
    const html = [];
    let allSelected = false;
    let i;
    let from;
    let to;
    let $pageList;
    let $pre;
    let $next;
    let $number;
    const data = this.getData({ includeHiddenRows: false });
    let pageList = opts.pageList;
    if (typeof pageList === "string") {
      pageList = pageList.replace(/\[|\]| /g, "").toLowerCase().split(",");
    }
    pageList = pageList.map((value) => {
      if (typeof value === "string") {
        return value.toLowerCase() === opts.formatAllRows().toLowerCase() || ["all", "unlimited"].includes(value.toLowerCase()) ? opts.formatAllRows() : +value;
      }
      return value;
    });
    this.paginationParts = opts.paginationParts;
    if (typeof this.paginationParts === "string") {
      this.paginationParts = this.paginationParts.replace(/\[|\]| |'/g, "").split(",");
    }
    if (opts.sidePagination !== "server") {
      opts.totalRows = data.length;
    }
    this.totalPages = 0;
    if (opts.totalRows) {
      if (opts.pageSize === opts.formatAllRows()) {
        opts.pageSize = opts.totalRows;
        allSelected = true;
      }
      this.totalPages = ~~((opts.totalRows - 1) / opts.pageSize) + 1;
      opts.totalPages = this.totalPages;
    }
    if (this.totalPages > 0 && opts.pageNumber > this.totalPages) {
      opts.pageNumber = this.totalPages;
    }
    this.pageFrom = (opts.pageNumber - 1) * opts.pageSize + 1;
    this.pageTo = opts.pageNumber * opts.pageSize;
    if (this.pageTo > opts.totalRows) {
      this.pageTo = opts.totalRows;
    }
    if (this.options.pagination && this.options.sidePagination !== "server") {
      this.options.totalNotFiltered = this.options.data.length;
    }
    if (!this.options.showExtendedPagination) {
      this.options.totalNotFiltered = void 0;
    }
    if (this.paginationParts.includes("pageInfo") || this.paginationParts.includes("pageInfoShort") || this.paginationParts.includes("pageSize")) {
      html.push(`<div class="${this.constants.classes.pull}-${opts.paginationDetailHAlign} pagination-detail">`);
    }
    if (this.paginationParts.includes("pageInfo") || this.paginationParts.includes("pageInfoShort")) {
      const paginationInfo = this.paginationParts.includes("pageInfoShort") ? opts.formatDetailPagination(opts.totalRows) : opts.formatShowingRows(this.pageFrom, this.pageTo, opts.totalRows, opts.totalNotFiltered);
      html.push(`<span class="pagination-info">
      ${paginationInfo}
      </span>`);
    }
    if (this.paginationParts.includes("pageSize")) {
      html.push('<div class="page-list">');
      const pageNumber = [
        `<div class="${this.constants.classes.paginationDropdown}">
        <button class="${this.constants.buttonsClass} dropdown-toggle" type="button" ${this.constants.dataToggle}="dropdown">
        <span class="page-size">
        ${allSelected ? opts.formatAllRows() : opts.pageSize}
        </span>
        ${this.constants.html.dropdownCaret}
        </button>
        ${this.constants.html.pageDropdown[0]}`
      ];
      pageList.forEach((page, i2) => {
        if (!opts.smartDisplay || i2 === 0 || pageList[i2 - 1] < opts.totalRows || page === opts.formatAllRows()) {
          let active;
          if (allSelected) {
            active = page === opts.formatAllRows() ? this.constants.classes.dropdownActive : "";
          } else {
            active = page === opts.pageSize ? this.constants.classes.dropdownActive : "";
          }
          pageNumber.push(utils_default.sprintf(this.constants.html.pageDropdownItem, active, page));
        }
      });
      pageNumber.push(`${this.constants.html.pageDropdown[1]}</div>`);
      html.push(opts.formatRecordsPerPage(pageNumber.join("")));
    }
    if (this.paginationParts.includes("pageInfo") || this.paginationParts.includes("pageInfoShort") || this.paginationParts.includes("pageSize")) {
      html.push("</div></div>");
    }
    if (this.paginationParts.includes("pageList")) {
      html.push(
        `<div class="${this.constants.classes.pull}-${opts.paginationHAlign} pagination">`,
        utils_default.sprintf(this.constants.html.pagination[0], utils_default.sprintf(" pagination-%s", opts.iconSize)),
        utils_default.sprintf(this.constants.html.paginationItem, " page-pre", opts.formatSRPaginationPreText(), opts.paginationPreText)
      );
      if (this.totalPages < opts.paginationSuccessivelySize) {
        from = 1;
        to = this.totalPages;
      } else {
        from = opts.pageNumber - opts.paginationPagesBySide;
        to = from + opts.paginationPagesBySide * 2;
      }
      if (opts.pageNumber < opts.paginationSuccessivelySize - 1) {
        to = opts.paginationSuccessivelySize;
      }
      if (opts.paginationSuccessivelySize > this.totalPages - from) {
        from = from - (opts.paginationSuccessivelySize - (this.totalPages - from)) + 1;
      }
      if (from < 1) {
        from = 1;
      }
      if (to > this.totalPages) {
        to = this.totalPages;
      }
      const middleSize = Math.round(opts.paginationPagesBySide / 2);
      const pageItem = (i2, classes = "") => utils_default.sprintf(
        this.constants.html.paginationItem,
        classes + (i2 === opts.pageNumber ? ` ${this.constants.classes.paginationActive}` : ""),
        opts.formatSRPaginationPageText(i2),
        i2
      );
      if (from > 1) {
        let max = opts.paginationPagesBySide;
        if (max >= from)
          max = from - 1;
        for (i = 1; i <= max; i++) {
          html.push(pageItem(i));
        }
        if (from - 1 === max + 1) {
          i = from - 1;
          html.push(pageItem(i));
        } else if (from - 1 > max) {
          if (from - opts.paginationPagesBySide * 2 > opts.paginationPagesBySide && opts.paginationUseIntermediate) {
            i = Math.round((from - middleSize) / 2 + middleSize);
            html.push(pageItem(i, " page-intermediate"));
          } else {
            html.push(utils_default.sprintf(
              this.constants.html.paginationItem,
              " page-first-separator disabled",
              "",
              "..."
            ));
          }
        }
      }
      for (i = from; i <= to; i++) {
        html.push(pageItem(i));
      }
      if (this.totalPages > to) {
        let min = this.totalPages - (opts.paginationPagesBySide - 1);
        if (to >= min)
          min = to + 1;
        if (to + 1 === min - 1) {
          i = to + 1;
          html.push(pageItem(i));
        } else if (min > to + 1) {
          if (this.totalPages - to > opts.paginationPagesBySide * 2 && opts.paginationUseIntermediate) {
            i = Math.round((this.totalPages - middleSize - to) / 2 + to);
            html.push(pageItem(i, " page-intermediate"));
          } else {
            html.push(utils_default.sprintf(
              this.constants.html.paginationItem,
              " page-last-separator disabled",
              "",
              "..."
            ));
          }
        }
        for (i = min; i <= this.totalPages; i++) {
          html.push(pageItem(i));
        }
      }
      html.push(utils_default.sprintf(this.constants.html.paginationItem, " page-next", opts.formatSRPaginationNextText(), opts.paginationNextText));
      html.push(this.constants.html.pagination[1], "</div>");
    }
    this.$pagination.html(html.join(""));
    const dropupClass = ["bottom", "both"].includes(opts.paginationVAlign) ? ` ${this.constants.classes.dropup}` : "";
    this.$pagination.last().find(".page-list > div").addClass(dropupClass);
    if (!opts.onlyInfoPagination) {
      $pageList = this.$pagination.find(".page-list a");
      $pre = this.$pagination.find(".page-pre");
      $next = this.$pagination.find(".page-next");
      $number = this.$pagination.find(".page-item").not(".page-next, .page-pre, .page-last-separator, .page-first-separator");
      if (this.totalPages <= 1) {
        this.$pagination.find("div.pagination").hide();
      }
      if (opts.smartDisplay) {
        if (pageList.length < 2 || opts.totalRows <= pageList[0]) {
          this.$pagination.find("div.page-list").hide();
        }
      }
      this.$pagination[this.getData().length ? "show" : "hide"]();
      if (!opts.paginationLoop) {
        if (opts.pageNumber === 1) {
          $pre.addClass("disabled");
        }
        if (opts.pageNumber === this.totalPages) {
          $next.addClass("disabled");
        }
      }
      if (allSelected) {
        opts.pageSize = opts.formatAllRows();
      }
      $pageList.off("click").on("click", (e) => this.onPageListChange(e));
      $pre.off("click").on("click", (e) => this.onPagePre(e));
      $next.off("click").on("click", (e) => this.onPageNext(e));
      $number.off("click").on("click", (e) => this.onPageNumber(e));
    }
  }
  updatePagination(event) {
    if (event && $(event.currentTarget).hasClass("disabled")) {
      return;
    }
    if (!this.options.maintainMetaData) {
      this.resetRows();
    }
    this.initPagination();
    this.trigger("page-change", this.options.pageNumber, this.options.pageSize);
    if (this.options.sidePagination === "server") {
      this.initServer();
    } else {
      this.initBody();
    }
  }
  onPageListChange(event) {
    event.preventDefault();
    const $this = $(event.currentTarget);
    $this.parent().addClass(this.constants.classes.dropdownActive).siblings().removeClass(this.constants.classes.dropdownActive);
    this.options.pageSize = $this.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ? this.options.formatAllRows() : +$this.text();
    this.$toolbar.find(".page-size").text(this.options.pageSize);
    this.updatePagination(event);
    return false;
  }
  onPagePre(event) {
    if ($(event.target).hasClass("disabled")) {
      return;
    }
    event.preventDefault();
    if (this.options.pageNumber - 1 === 0) {
      this.options.pageNumber = this.options.totalPages;
    } else {
      this.options.pageNumber--;
    }
    this.updatePagination(event);
    return false;
  }
  onPageNext(event) {
    if ($(event.target).hasClass("disabled")) {
      return;
    }
    event.preventDefault();
    if (this.options.pageNumber + 1 > this.options.totalPages) {
      this.options.pageNumber = 1;
    } else {
      this.options.pageNumber++;
    }
    this.updatePagination(event);
    return false;
  }
  onPageNumber(event) {
    event.preventDefault();
    if (this.options.pageNumber === +$(event.currentTarget).text()) {
      return;
    }
    this.options.pageNumber = +$(event.currentTarget).text();
    this.updatePagination(event);
    return false;
  }
  // eslint-disable-next-line no-unused-vars
  initRow(item, i, data, trFragments) {
    const html = [];
    let style = {};
    const csses = [];
    let data_ = "";
    let attributes = {};
    const htmlAttributes = [];
    if (utils_default.findIndex(this.hiddenRows, item) > -1) {
      return;
    }
    style = utils_default.calculateObjectValue(this.options, this.options.rowStyle, [item, i], style);
    if (style && style.css) {
      for (const [key, value] of Object.entries(style.css)) {
        csses.push(`${key}: ${value}`);
      }
    }
    attributes = utils_default.calculateObjectValue(
      this.options,
      this.options.rowAttributes,
      [item, i],
      attributes
    );
    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        htmlAttributes.push(`${key}="${utils_default.escapeHTML(value)}"`);
      }
    }
    if (item._data && !utils_default.isEmptyObject(item._data)) {
      for (const [k, v] of Object.entries(item._data)) {
        if (k === "index") {
          return;
        }
        data_ += ` data-${k}='${typeof v === "object" ? JSON.stringify(v) : v}'`;
      }
    }
    html.push(
      "<tr",
      utils_default.sprintf(" %s", htmlAttributes.length ? htmlAttributes.join(" ") : void 0),
      utils_default.sprintf(' id="%s"', Array.isArray(item) ? void 0 : item._id),
      utils_default.sprintf(' class="%s"', style.classes || (Array.isArray(item) ? void 0 : item._class)),
      utils_default.sprintf(' style="%s"', Array.isArray(item) ? void 0 : item._style),
      ` data-index="${i}"`,
      utils_default.sprintf(' data-uniqueid="%s"', utils_default.getItemField(item, this.options.uniqueId, false)),
      utils_default.sprintf(' data-has-detail-view="%s"', this.options.detailView && utils_default.calculateObjectValue(null, this.options.detailFilter, [i, item]) ? "true" : void 0),
      utils_default.sprintf("%s", data_),
      ">"
    );
    if (this.options.cardView) {
      html.push(`<td colspan="${this.header.fields.length}"><div class="card-views">`);
    }
    let detailViewTemplate = "";
    if (utils_default.hasDetailViewIcon(this.options)) {
      detailViewTemplate = "<td>";
      if (utils_default.calculateObjectValue(null, this.options.detailFilter, [i, item])) {
        detailViewTemplate += `
          <a class="detail-icon" href="#">
          ${utils_default.sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailOpen)}
          </a>
        `;
      }
      detailViewTemplate += "</td>";
    }
    if (detailViewTemplate && this.options.detailViewAlign !== "right") {
      html.push(detailViewTemplate);
    }
    this.header.fields.forEach((field, j) => {
      const column = this.columns[j];
      let text = "";
      const value_ = utils_default.getItemField(item, field, this.options.escape, column.escape);
      let value = "";
      let type = "";
      let cellStyle = {};
      let id_ = "";
      let class_ = this.header.classes[j];
      let style_ = "";
      let styleToAdd_ = "";
      let data_2 = "";
      let rowspan_ = "";
      let colspan_ = "";
      let title_ = "";
      if ((this.fromHtml || this.autoMergeCells) && typeof value_ === "undefined") {
        if (!column.checkbox && !column.radio) {
          return;
        }
      }
      if (!column.visible) {
        return;
      }
      if (this.options.cardView && !column.cardVisible) {
        return;
      }
      if (csses.concat([this.header.styles[j]]).length) {
        styleToAdd_ += `${csses.concat([this.header.styles[j]]).join("; ")}`;
      }
      if (item[`_${field}_style`]) {
        styleToAdd_ += `${item[`_${field}_style`]}`;
      }
      if (styleToAdd_) {
        style_ = ` style="${styleToAdd_}"`;
      }
      if (item[`_${field}_id`]) {
        id_ = utils_default.sprintf(' id="%s"', item[`_${field}_id`]);
      }
      if (item[`_${field}_class`]) {
        class_ = utils_default.sprintf(' class="%s"', item[`_${field}_class`]);
      }
      if (item[`_${field}_rowspan`]) {
        rowspan_ = utils_default.sprintf(' rowspan="%s"', item[`_${field}_rowspan`]);
      }
      if (item[`_${field}_colspan`]) {
        colspan_ = utils_default.sprintf(' colspan="%s"', item[`_${field}_colspan`]);
      }
      if (item[`_${field}_title`]) {
        title_ = utils_default.sprintf(' title="%s"', item[`_${field}_title`]);
      }
      cellStyle = utils_default.calculateObjectValue(
        this.header,
        this.header.cellStyles[j],
        [value_, item, i, field],
        cellStyle
      );
      if (cellStyle.classes) {
        class_ = ` class="${cellStyle.classes}"`;
      }
      if (cellStyle.css) {
        const csses_ = [];
        for (const [key, value2] of Object.entries(cellStyle.css)) {
          csses_.push(`${key}: ${value2}`);
        }
        style_ = ` style="${csses_.concat(this.header.styles[j]).join("; ")}"`;
      }
      value = utils_default.calculateObjectValue(
        column,
        this.header.formatters[j],
        [value_, item, i, field],
        value_
      );
      if (!(column.checkbox || column.radio)) {
        value = typeof value === "undefined" || value === null ? this.options.undefinedText : value;
      }
      if (column.searchable && this.searchText && this.options.searchHighlight && !(column.checkbox || column.radio)) {
        let defValue = "";
        let searchText = this.searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        if (this.options.searchAccentNeutralise) {
          const indexRegex = new RegExp(`${utils_default.normalizeAccent(searchText)}`, "gmi");
          const match = indexRegex.exec(utils_default.normalizeAccent(value));
          if (match) {
            searchText = value.substring(match.index, match.index + searchText.length);
          }
        }
        const regExp = new RegExp(`(${searchText})`, "gim");
        const marker = "<mark>$1</mark>";
        const isHTML = value && /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(value);
        if (isHTML) {
          let textContent = new DOMParser().parseFromString(value.toString(), "text/html").documentElement.textContent;
          const textReplaced = textContent.replace(regExp, marker);
          textContent = textContent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          defValue = value.replace(new RegExp(`(>\\s*)(${textContent})(\\s*)`, "gm"), `$1${textReplaced}$3`);
        } else {
          defValue = value.toString().replace(regExp, marker);
        }
        value = utils_default.calculateObjectValue(column, column.searchHighlightFormatter, [value, this.searchText], defValue);
      }
      if (item[`_${field}_data`] && !utils_default.isEmptyObject(item[`_${field}_data`])) {
        for (const [k, v] of Object.entries(item[`_${field}_data`])) {
          if (k === "index") {
            return;
          }
          data_2 += ` data-${k}="${v}"`;
        }
      }
      if (column.checkbox || column.radio) {
        type = column.checkbox ? "checkbox" : type;
        type = column.radio ? "radio" : type;
        const c = column["class"] || "";
        const isChecked = utils_default.isObject(value) && value.hasOwnProperty("checked") ? value.checked : (value === true || value_) && value !== false;
        const isDisabled = !column.checkboxEnabled || value && value.disabled;
        text = [
          this.options.cardView ? `<div class="card-view ${c}">` : `<td class="bs-checkbox ${c}"${class_}${style_}>`,
          `<label>
            <input
            data-index="${i}"
            name="${this.options.selectItemName}"
            type="${type}"
            ${utils_default.sprintf('value="%s"', item[this.options.idField])}
            ${utils_default.sprintf('checked="%s"', isChecked ? "checked" : void 0)}
            ${utils_default.sprintf('disabled="%s"', isDisabled ? "disabled" : void 0)} />
            <span></span>
            </label>`,
          this.header.formatters[j] && typeof value === "string" ? value : "",
          this.options.cardView ? "</div>" : "</td>"
        ].join("");
        item[this.header.stateField] = value === true || (!!value_ || value && value.checked);
      } else if (this.options.cardView) {
        const cardTitle = this.options.showHeader ? `<span class="card-view-title ${cellStyle.classes || ""}"${style_}>${utils_default.getFieldTitle(this.columns, field)}</span>` : "";
        text = `<div class="card-view">${cardTitle}<span class="card-view-value ${cellStyle.classes || ""}"${style_}>${value}</span></div>`;
        if (this.options.smartDisplay && value === "") {
          text = '<div class="card-view"></div>';
        }
      } else {
        text = `<td${id_}${class_}${style_}${data_2}${rowspan_}${colspan_}${title_}>${value}</td>`;
      }
      html.push(text);
    });
    if (detailViewTemplate && this.options.detailViewAlign === "right") {
      html.push(detailViewTemplate);
    }
    if (this.options.cardView) {
      html.push("</div></td>");
    }
    html.push("</tr>");
    return html.join("");
  }
  initBody(fixedScroll, updatedUid) {
    const data = this.getData();
    this.trigger("pre-body", data);
    this.$body = this.$el.find(">tbody");
    if (!this.$body.length) {
      this.$body = $("<tbody></tbody>").appendTo(this.$el);
    }
    if (!this.options.pagination || this.options.sidePagination === "server") {
      this.pageFrom = 1;
      this.pageTo = data.length;
    }
    const rows = [];
    const trFragments = $(document.createDocumentFragment());
    let hasTr = false;
    const toExpand = [];
    this.autoMergeCells = utils_default.checkAutoMergeCells(data.slice(this.pageFrom - 1, this.pageTo));
    for (let i = this.pageFrom - 1; i < this.pageTo; i++) {
      const item = data[i];
      let tr = this.initRow(item, i, data, trFragments);
      hasTr = hasTr || !!tr;
      if (tr && typeof tr === "string") {
        const uniqueId = this.options.uniqueId;
        if (uniqueId && item.hasOwnProperty(uniqueId)) {
          const itemUniqueId = item[uniqueId];
          const oldTr = this.$body.find(utils_default.sprintf('> tr[data-uniqueid="%s"][data-has-detail-view]', itemUniqueId));
          const oldTrNext = oldTr.next();
          if (oldTrNext.is("tr.detail-view")) {
            toExpand.push(i);
            if (!updatedUid || itemUniqueId !== updatedUid) {
              tr += oldTrNext[0].outerHTML;
            }
          }
        }
        if (!this.options.virtualScroll) {
          trFragments.append(tr);
        } else {
          rows.push(tr);
        }
      }
    }
    if (!hasTr) {
      this.$body.html(`<tr class="no-records-found">${utils_default.sprintf(
        '<td colspan="%s">%s</td>',
        this.getVisibleFields().length + utils_default.getDetailViewIndexOffset(this.options),
        this.options.formatNoMatches()
      )}</tr>`);
    } else if (!this.options.virtualScroll) {
      this.$body.html(trFragments);
    } else {
      if (this.virtualScroll) {
        this.virtualScroll.destroy();
      }
      this.virtualScroll = new virtual_scroll_default({
        rows,
        fixedScroll,
        scrollEl: this.$tableBody[0],
        contentEl: this.$body[0],
        itemHeight: this.options.virtualScrollItemHeight,
        callback: (startIndex, endIndex) => {
          this.fitHeader();
          this.initBodyEvent();
          this.trigger("virtual-scroll", startIndex, endIndex);
        }
      });
    }
    toExpand.forEach((index) => {
      this.expandRow(index);
    });
    if (!fixedScroll) {
      this.scrollTo(0);
    }
    this.initBodyEvent();
    this.initFooter();
    this.resetView();
    this.updateSelected();
    if (this.options.sidePagination !== "server") {
      this.options.totalRows = data.length;
    }
    this.trigger("post-body", data);
  }
  initBodyEvent() {
    this.$body.find("> tr[data-index] > td").off("click dblclick").on("click dblclick", (e) => {
      const $td = $(e.currentTarget);
      if ($td.find(".detail-icon").length || $td.index() - utils_default.getDetailViewIndexOffset(this.options) < 0) {
        return;
      }
      const $tr = $td.parent();
      const $cardViewArr = $(e.target).parents(".card-views").children();
      const $cardViewTarget = $(e.target).parents(".card-view");
      const rowIndex = $tr.data("index");
      const item = this.data[rowIndex];
      const index = this.options.cardView ? $cardViewArr.index($cardViewTarget) : $td[0].cellIndex;
      const fields = this.getVisibleFields();
      const field = fields[index - utils_default.getDetailViewIndexOffset(this.options)];
      const column = this.columns[this.fieldsColumnsIndex[field]];
      const value = utils_default.getItemField(item, field, this.options.escape, column.escape);
      this.trigger(e.type === "click" ? "click-cell" : "dbl-click-cell", field, value, item, $td);
      this.trigger(e.type === "click" ? "click-row" : "dbl-click-row", item, $tr, field);
      if (e.type === "click" && this.options.clickToSelect && column.clickToSelect && !utils_default.calculateObjectValue(this.options, this.options.ignoreClickToSelectOn, [e.target])) {
        const $selectItem = $tr.find(utils_default.sprintf('[name="%s"]', this.options.selectItemName));
        if ($selectItem.length) {
          $selectItem[0].click();
        }
      }
      if (e.type === "click" && this.options.detailViewByClick) {
        this.toggleDetailView(rowIndex, this.header.detailFormatters[this.fieldsColumnsIndex[field]]);
      }
    }).off("mousedown").on("mousedown", (e) => {
      this.multipleSelectRowCtrlKey = e.ctrlKey || e.metaKey;
      this.multipleSelectRowShiftKey = e.shiftKey;
    });
    this.$body.find("> tr[data-index] > td > .detail-icon").off("click").on("click", (e) => {
      e.preventDefault();
      this.toggleDetailView($(e.currentTarget).parent().parent().data("index"));
      return false;
    });
    this.$selectItem = this.$body.find(utils_default.sprintf('[name="%s"]', this.options.selectItemName));
    this.$selectItem.off("click").on("click", (e) => {
      e.stopImmediatePropagation();
      const $this = $(e.currentTarget);
      this._toggleCheck($this.prop("checked"), $this.data("index"));
    });
    this.header.events.forEach((_events, i) => {
      let events = _events;
      if (!events) {
        return;
      }
      if (typeof events === "string") {
        events = utils_default.calculateObjectValue(null, events);
      }
      if (!events) {
        throw new Error(`Unknown event in the scope: ${_events}`);
      }
      const field = this.header.fields[i];
      let fieldIndex = this.getVisibleFields().indexOf(field);
      if (fieldIndex === -1) {
        return;
      }
      fieldIndex += utils_default.getDetailViewIndexOffset(this.options);
      for (const key in events) {
        if (!events.hasOwnProperty(key)) {
          continue;
        }
        const event = events[key];
        this.$body.find(">tr:not(.no-records-found)").each((i2, tr) => {
          const $tr = $(tr);
          const $td = $tr.find(this.options.cardView ? ".card-views>.card-view" : ">td").eq(fieldIndex);
          const index = key.indexOf(" ");
          const name = key.substring(0, index);
          const el = key.substring(index + 1);
          $td.find(el).off(name).on(name, (e) => {
            const index2 = $tr.data("index");
            const row = this.data[index2];
            const value = row[field];
            event.apply(this, [e, value, row, index2]);
          });
        });
      }
    });
  }
  initServer(silent, query, url) {
    let data = {};
    const index = this.header.fields.indexOf(this.options.sortName);
    let params = {
      searchText: this.searchText,
      sortName: this.options.sortName,
      sortOrder: this.options.sortOrder
    };
    if (this.header.sortNames[index]) {
      params.sortName = this.header.sortNames[index];
    }
    if (this.options.pagination && this.options.sidePagination === "server") {
      params.pageSize = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;
      params.pageNumber = this.options.pageNumber;
    }
    if (!(url || this.options.url) && !this.options.ajax) {
      return;
    }
    if (this.options.queryParamsType === "limit") {
      params = {
        search: params.searchText,
        sort: params.sortName,
        order: params.sortOrder
      };
      if (this.options.pagination && this.options.sidePagination === "server") {
        params.offset = this.options.pageSize === this.options.formatAllRows() ? 0 : this.options.pageSize * (this.options.pageNumber - 1);
        params.limit = this.options.pageSize;
        if (params.limit === 0 || this.options.pageSize === this.options.formatAllRows()) {
          delete params.limit;
        }
      }
    }
    if (this.options.search && this.options.sidePagination === "server" && this.columns.filter((column) => !column.searchable).length) {
      params.searchable = [];
      for (const column of this.columns) {
        if (!column.checkbox && column.searchable && (this.options.visibleSearch && column.visible || !this.options.visibleSearch)) {
          params.searchable.push(column.field);
        }
      }
    }
    if (!utils_default.isEmptyObject(this.filterColumnsPartial)) {
      params.filter = JSON.stringify(this.filterColumnsPartial, null);
    }
    $.extend(params, query || {});
    data = utils_default.calculateObjectValue(this.options, this.options.queryParams, [params], data);
    if (data === false) {
      return;
    }
    if (!silent) {
      this.showLoading();
    }
    const request = $.extend({}, utils_default.calculateObjectValue(null, this.options.ajaxOptions), {
      type: this.options.method,
      url: url || this.options.url,
      data: this.options.contentType === "application/json" && this.options.method === "post" ? JSON.stringify(data) : data,
      cache: this.options.cache,
      contentType: this.options.contentType,
      dataType: this.options.dataType,
      success: (_res, textStatus, jqXHR) => {
        const res = utils_default.calculateObjectValue(
          this.options,
          this.options.responseHandler,
          [_res, jqXHR],
          _res
        );
        this.load(res);
        this.trigger("load-success", res, jqXHR && jqXHR.status, jqXHR);
        if (!silent) {
          this.hideLoading();
        }
        if (this.options.sidePagination === "server" && this.options.pageNumber > 1 && res[this.options.totalField] > 0 && !res[this.options.dataField].length) {
          this.updatePagination();
        }
      },
      error: (jqXHR) => {
        if (jqXHR && jqXHR.status === 0 && this._xhrAbort) {
          this._xhrAbort = false;
          return;
        }
        let data2 = [];
        if (this.options.sidePagination === "server") {
          data2 = {};
          data2[this.options.totalField] = 0;
          data2[this.options.dataField] = [];
        }
        this.load(data2);
        this.trigger("load-error", jqXHR && jqXHR.status, jqXHR);
        if (!silent) {
          this.hideLoading();
        }
      }
    });
    if (this.options.ajax) {
      utils_default.calculateObjectValue(this, this.options.ajax, [request], null);
    } else {
      if (this._xhr && this._xhr.readyState !== 4) {
        this._xhrAbort = true;
        this._xhr.abort();
      }
      this._xhr = $.ajax(request);
    }
    return data;
  }
  initSearchText() {
    if (this.options.search) {
      this.searchText = "";
      if (this.options.searchText !== "") {
        const $search = utils_default.getSearchInput(this);
        $search.val(this.options.searchText);
        this.onSearch({ currentTarget: $search, firedByInitSearchText: true });
      }
    }
  }
  getCaret() {
    this.$header.find("th").each((i, th) => {
      $(th).find(".sortable").removeClass("desc asc").addClass($(th).data("field") === this.options.sortName ? this.options.sortOrder : "both");
    });
  }
  updateSelected() {
    const checkAll = this.$selectItem.filter(":enabled").length && this.$selectItem.filter(":enabled").length === this.$selectItem.filter(":enabled").filter(":checked").length;
    this.$selectAll.add(this.$selectAll_).prop("checked", checkAll);
    this.$selectItem.each((i, el) => {
      $(el).closest("tr")[$(el).prop("checked") ? "addClass" : "removeClass"]("selected");
    });
  }
  updateRows() {
    this.$selectItem.each((i, el) => {
      this.data[$(el).data("index")][this.header.stateField] = $(el).prop("checked");
    });
  }
  resetRows() {
    for (const row of this.data) {
      this.$selectAll.prop("checked", false);
      this.$selectItem.prop("checked", false);
      if (this.header.stateField) {
        row[this.header.stateField] = false;
      }
    }
    this.initHiddenRows();
  }
  trigger(_name, ...args) {
    const name = `${_name}.bs.table`;
    this.options[BootstrapTable2.EVENTS[name]](...[...args, this]);
    this.$el.trigger($.Event(name, { sender: this }), args);
    this.options.onAll(name, ...[...args, this]);
    this.$el.trigger($.Event("all.bs.table", { sender: this }), [name, args]);
  }
  resetHeader() {
    clearTimeout(this.timeoutId_);
    this.timeoutId_ = setTimeout(() => this.fitHeader(), this.$el.is(":hidden") ? 100 : 0);
  }
  fitHeader() {
    if (this.$el.is(":hidden")) {
      this.timeoutId_ = setTimeout(() => this.fitHeader(), 100);
      return;
    }
    const fixedBody = this.$tableBody.get(0);
    const scrollWidth = this.hasScrollBar && fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight() ? utils_default.getScrollBarWidth() : 0;
    this.$el.css("margin-top", -this.$header.outerHeight());
    const focused = $(":focus");
    if (focused.length > 0) {
      const $th = focused.parents("th");
      if ($th.length > 0) {
        const dataField = $th.attr("data-field");
        if (dataField !== void 0) {
          const $headerTh = this.$header.find(`[data-field='${dataField}']`);
          if ($headerTh.length > 0) {
            $headerTh.find(":input").addClass("focus-temp");
          }
        }
      }
    }
    this.$header_ = this.$header.clone(true, true);
    this.$selectAll_ = this.$header_.find('[name="btSelectAll"]');
    this.$tableHeader.css("margin-right", scrollWidth).find("table").css("width", this.$el.outerWidth()).html("").attr("class", this.$el.attr("class")).append(this.$header_);
    this.$tableLoading.css("width", this.$el.outerWidth());
    const focusedTemp = $(".focus-temp:visible:eq(0)");
    if (focusedTemp.length > 0) {
      focusedTemp.focus();
      this.$header.find(".focus-temp").removeClass("focus-temp");
    }
    this.$header.find("th[data-field]").each((i, el) => {
      this.$header_.find(utils_default.sprintf('th[data-field="%s"]', $(el).data("field"))).data($(el).data());
    });
    const visibleFields = this.getVisibleFields();
    const $ths = this.$header_.find("th");
    let $tr = this.$body.find(">tr:not(.no-records-found,.virtual-scroll-top)").eq(0);
    while ($tr.length && $tr.find('>td[colspan]:not([colspan="1"])').length) {
      $tr = $tr.next();
    }
    const trLength = $tr.find("> *").length;
    $tr.find("> *").each((i, el) => {
      const $this = $(el);
      if (utils_default.hasDetailViewIcon(this.options)) {
        if (i === 0 && this.options.detailViewAlign !== "right" || i === trLength - 1 && this.options.detailViewAlign === "right") {
          const $thDetail = $ths.filter(".detail");
          const zoomWidth2 = $thDetail.innerWidth() - $thDetail.find(".fht-cell").width();
          $thDetail.find(".fht-cell").width($this.innerWidth() - zoomWidth2);
          return;
        }
      }
      const index = i - utils_default.getDetailViewIndexOffset(this.options);
      let $th = this.$header_.find(utils_default.sprintf('th[data-field="%s"]', visibleFields[index]));
      if ($th.length > 1) {
        $th = $($ths[$this[0].cellIndex]);
      }
      const zoomWidth = $th.innerWidth() - $th.find(".fht-cell").width();
      $th.find(".fht-cell").width($this.innerWidth() - zoomWidth);
    });
    this.horizontalScroll();
    this.trigger("post-header");
  }
  initFooter() {
    if (!this.options.showFooter || this.options.cardView) {
      return;
    }
    const data = this.getData();
    const html = [];
    let detailTemplate = "";
    if (utils_default.hasDetailViewIcon(this.options)) {
      detailTemplate = '<th class="detail"><div class="th-inner"></div><div class="fht-cell"></div></th>';
    }
    if (detailTemplate && this.options.detailViewAlign !== "right") {
      html.push(detailTemplate);
    }
    for (const column of this.columns) {
      let falign = "";
      let valign = "";
      const csses = [];
      let style = {};
      let class_ = utils_default.sprintf(' class="%s"', column["class"]);
      if (!column.visible || this.footerData && this.footerData.length > 0 && !(column.field in this.footerData[0])) {
        continue;
      }
      if (this.options.cardView && !column.cardVisible) {
        return;
      }
      falign = utils_default.sprintf("text-align: %s; ", column.falign ? column.falign : column.align);
      valign = utils_default.sprintf("vertical-align: %s; ", column.valign);
      style = utils_default.calculateObjectValue(null, this.options.footerStyle, [column]);
      if (style && style.css) {
        for (const [key, value2] of Object.entries(style.css)) {
          csses.push(`${key}: ${value2}`);
        }
      }
      if (style && style.classes) {
        class_ = utils_default.sprintf(' class="%s"', column["class"] ? [column["class"], style.classes].join(" ") : style.classes);
      }
      html.push("<th", class_, utils_default.sprintf(' style="%s"', falign + valign + csses.concat().join("; ")));
      let colspan = 0;
      if (this.footerData && this.footerData.length > 0) {
        colspan = this.footerData[0][`_${column.field}_colspan`] || 0;
      }
      if (colspan) {
        html.push(` colspan="${colspan}" `);
      }
      html.push(">");
      html.push('<div class="th-inner">');
      let value = "";
      if (this.footerData && this.footerData.length > 0) {
        value = this.footerData[0][column.field] || "";
      }
      html.push(utils_default.calculateObjectValue(
        column,
        column.footerFormatter,
        [data, value],
        value
      ));
      html.push("</div>");
      html.push('<div class="fht-cell"></div>');
      html.push("</div>");
      html.push("</th>");
    }
    if (detailTemplate && this.options.detailViewAlign === "right") {
      html.push(detailTemplate);
    }
    if (!this.options.height && !this.$tableFooter.length) {
      this.$el.append("<tfoot><tr></tr></tfoot>");
      this.$tableFooter = this.$el.find("tfoot");
    }
    if (!this.$tableFooter.find("tr").length) {
      this.$tableFooter.html("<table><thead><tr></tr></thead></table>");
    }
    this.$tableFooter.find("tr").html(html.join(""));
    this.trigger("post-footer", this.$tableFooter);
  }
  fitFooter() {
    if (this.$el.is(":hidden")) {
      setTimeout(() => this.fitFooter(), 100);
      return;
    }
    const fixedBody = this.$tableBody.get(0);
    const scrollWidth = this.hasScrollBar && fixedBody.scrollHeight > fixedBody.clientHeight + this.$header.outerHeight() ? utils_default.getScrollBarWidth() : 0;
    this.$tableFooter.css("margin-right", scrollWidth).find("table").css("width", this.$el.outerWidth()).attr("class", this.$el.attr("class"));
    const $ths = this.$tableFooter.find("th");
    let $tr = this.$body.find(">tr:first-child:not(.no-records-found)");
    $ths.find(".fht-cell").width("auto");
    while ($tr.length && $tr.find('>td[colspan]:not([colspan="1"])').length) {
      $tr = $tr.next();
    }
    const trLength = $tr.find("> *").length;
    $tr.find("> *").each((i, el) => {
      const $this = $(el);
      if (utils_default.hasDetailViewIcon(this.options)) {
        if (i === 0 && this.options.detailViewAlign === "left" || i === trLength - 1 && this.options.detailViewAlign === "right") {
          const $thDetail = $ths.filter(".detail");
          const zoomWidth2 = $thDetail.innerWidth() - $thDetail.find(".fht-cell").width();
          $thDetail.find(".fht-cell").width($this.innerWidth() - zoomWidth2);
          return;
        }
      }
      const $th = $ths.eq(i);
      const zoomWidth = $th.innerWidth() - $th.find(".fht-cell").width();
      $th.find(".fht-cell").width($this.innerWidth() - zoomWidth);
    });
    this.horizontalScroll();
  }
  horizontalScroll() {
    this.$tableBody.off("scroll").on("scroll", () => {
      const scrollLeft = this.$tableBody.scrollLeft();
      if (this.options.showHeader && this.options.height) {
        this.$tableHeader.scrollLeft(scrollLeft);
      }
      if (this.options.showFooter && !this.options.cardView) {
        this.$tableFooter.scrollLeft(scrollLeft);
      }
      this.trigger("scroll-body", this.$tableBody);
    });
  }
  getVisibleFields() {
    const visibleFields = [];
    for (const field of this.header.fields) {
      const column = this.columns[this.fieldsColumnsIndex[field]];
      if (!column || !column.visible || this.options.cardView && !column.cardVisible) {
        continue;
      }
      visibleFields.push(field);
    }
    return visibleFields;
  }
  initHiddenRows() {
    this.hiddenRows = [];
  }
  // PUBLIC FUNCTION DEFINITION
  // =======================
  getOptions() {
    const options = $.extend({}, this.options);
    delete options.data;
    return $.extend(true, {}, options);
  }
  refreshOptions(options) {
    if (utils_default.compareObjects(this.options, options, true)) {
      return;
    }
    this.options = $.extend(this.options, options);
    this.trigger("refresh-options", this.options);
    this.destroy();
    this.init();
  }
  getData(params) {
    let data = this.options.data;
    if ((this.searchText || this.options.customSearch || this.options.sortName !== void 0 || this.enableCustomSort || // Fix #4616: this.enableCustomSort is for extensions
    !utils_default.isEmptyObject(this.filterColumns) || typeof this.options.filterOptions.filterAlgorithm === "function" || !utils_default.isEmptyObject(this.filterColumnsPartial)) && (!params || !params.unfiltered)) {
      data = this.data;
    }
    if (params && params.useCurrentPage) {
      data = data.slice(this.pageFrom - 1, this.pageTo);
    }
    if (params && !params.includeHiddenRows) {
      const hiddenRows = this.getHiddenRows();
      data = data.filter((row) => utils_default.findIndex(hiddenRows, row) === -1);
    }
    if (params && params.formatted) {
      data.forEach((row) => {
        for (const [key, value] of Object.entries(row)) {
          const column = this.columns[this.fieldsColumnsIndex[key]];
          if (!column) {
            return;
          }
          row[key] = utils_default.calculateObjectValue(column, this.header.formatters[column.fieldIndex], [value, row, row.index, column.field], value);
        }
      });
    }
    return data;
  }
  getSelections() {
    return (this.options.maintainMetaData ? this.options.data : this.data).filter((row) => row[this.header.stateField] === true);
  }
  load(_data) {
    let fixedScroll = false;
    let data = _data;
    if (this.options.pagination && this.options.sidePagination === "server") {
      this.options.totalRows = data[this.options.totalField];
      this.options.totalNotFiltered = data[this.options.totalNotFilteredField];
      this.footerData = data[this.options.footerField] ? [data[this.options.footerField]] : void 0;
    }
    fixedScroll = data.fixedScroll;
    data = Array.isArray(data) ? data : data[this.options.dataField];
    this.initData(data);
    this.initSearch();
    this.initPagination();
    this.initBody(fixedScroll);
  }
  append(data) {
    this.initData(data, "append");
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true);
  }
  prepend(data) {
    this.initData(data, "prepend");
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true);
  }
  remove(params) {
    let removed = 0;
    for (let i = this.options.data.length - 1; i >= 0; i--) {
      const row = this.options.data[i];
      const value = utils_default.getItemField(row, params.field, this.options.escape, row.escape);
      if (value === void 0 && params.field !== "$index") {
        continue;
      }
      if (!row.hasOwnProperty(params.field) && params.field === "$index" && params.values.includes(i) || params.values.includes(value)) {
        removed++;
        this.options.data.splice(i, 1);
      }
    }
    if (!removed) {
      return;
    }
    if (this.options.sidePagination === "server") {
      this.options.totalRows -= removed;
      this.data = [...this.options.data];
    }
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true);
  }
  removeAll() {
    if (this.options.data.length > 0) {
      this.options.data.splice(0, this.options.data.length);
      this.initSearch();
      this.initPagination();
      this.initBody(true);
    }
  }
  insertRow(params) {
    if (!params.hasOwnProperty("index") || !params.hasOwnProperty("row")) {
      return;
    }
    this.options.data.splice(params.index, 0, params.row);
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true);
  }
  updateRow(params) {
    const allParams = Array.isArray(params) ? params : [params];
    for (const params2 of allParams) {
      if (!params2.hasOwnProperty("index") || !params2.hasOwnProperty("row")) {
        continue;
      }
      if (params2.hasOwnProperty("replace") && params2.replace) {
        this.options.data[params2.index] = params2.row;
      } else {
        $.extend(this.options.data[params2.index], params2.row);
      }
    }
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true);
  }
  getRowByUniqueId(_id) {
    const uniqueId = this.options.uniqueId;
    const len = this.options.data.length;
    let id = _id;
    let dataRow = null;
    let i;
    let row;
    for (i = len - 1; i >= 0; i--) {
      row = this.options.data[i];
      const rowUniqueId = utils_default.getItemField(row, uniqueId, this.options.escape, row.escape);
      if (rowUniqueId === void 0) {
        continue;
      }
      if (typeof rowUniqueId === "string") {
        id = id.toString();
      } else if (typeof rowUniqueId === "number") {
        if (Number(rowUniqueId) === rowUniqueId && rowUniqueId % 1 === 0) {
          id = parseInt(id, 10);
        } else if (rowUniqueId === Number(rowUniqueId) && rowUniqueId !== 0) {
          id = parseFloat(id);
        }
      }
      if (rowUniqueId === id) {
        dataRow = row;
        break;
      }
    }
    return dataRow;
  }
  updateByUniqueId(params) {
    const allParams = Array.isArray(params) ? params : [params];
    let updatedUid = null;
    for (const params2 of allParams) {
      if (!params2.hasOwnProperty("id") || !params2.hasOwnProperty("row")) {
        continue;
      }
      const rowId = this.options.data.indexOf(this.getRowByUniqueId(params2.id));
      if (rowId === -1) {
        continue;
      }
      if (params2.hasOwnProperty("replace") && params2.replace) {
        this.options.data[rowId] = params2.row;
      } else {
        $.extend(this.options.data[rowId], params2.row);
      }
      updatedUid = params2.id;
    }
    this.initSearch();
    this.initPagination();
    this.initSort();
    this.initBody(true, updatedUid);
  }
  removeByUniqueId(id) {
    const len = this.options.data.length;
    const row = this.getRowByUniqueId(id);
    if (row) {
      this.options.data.splice(this.options.data.indexOf(row), 1);
    }
    if (len === this.options.data.length) {
      return;
    }
    if (this.options.sidePagination === "server") {
      this.options.totalRows -= 1;
      this.data = [...this.options.data];
    }
    this.initSearch();
    this.initPagination();
    this.initBody(true);
  }
  _updateCellOnly(field, index) {
    const rowHtml = this.initRow(this.options.data[index], index);
    let fieldIndex = this.getVisibleFields().indexOf(field);
    if (fieldIndex === -1) {
      return;
    }
    fieldIndex += utils_default.getDetailViewIndexOffset(this.options);
    this.$body.find(`>tr[data-index=${index}]`).find(`>td:eq(${fieldIndex})`).replaceWith($(rowHtml).find(`>td:eq(${fieldIndex})`));
    this.initBodyEvent();
    this.initFooter();
    this.resetView();
    this.updateSelected();
  }
  updateCell(params) {
    if (!params.hasOwnProperty("index") || !params.hasOwnProperty("field") || !params.hasOwnProperty("value")) {
      return;
    }
    this.options.data[params.index][params.field] = params.value;
    if (params.reinit === false) {
      this._updateCellOnly(params.field, params.index);
      return;
    }
    this.initSort();
    this.initBody(true);
  }
  updateCellByUniqueId(params) {
    const allParams = Array.isArray(params) ? params : [params];
    allParams.forEach(({ id, field, value }) => {
      const index = this.options.data.indexOf(this.getRowByUniqueId(id));
      if (index === -1) {
        return;
      }
      this.options.data[index][field] = value;
    });
    if (params.reinit === false) {
      this._updateCellOnly(
        params.field,
        this.options.data.indexOf(this.getRowByUniqueId(params.id))
      );
      return;
    }
    this.initSort();
    this.initBody(true);
  }
  showRow(params) {
    this._toggleRow(params, true);
  }
  hideRow(params) {
    this._toggleRow(params, false);
  }
  _toggleRow(params, visible) {
    let row;
    if (params.hasOwnProperty("index")) {
      row = this.getData()[params.index];
    } else if (params.hasOwnProperty("uniqueId")) {
      row = this.getRowByUniqueId(params.uniqueId);
    }
    if (!row) {
      return;
    }
    const index = utils_default.findIndex(this.hiddenRows, row);
    if (!visible && index === -1) {
      this.hiddenRows.push(row);
    } else if (visible && index > -1) {
      this.hiddenRows.splice(index, 1);
    }
    this.initBody(true);
    this.initPagination();
  }
  getHiddenRows(show) {
    if (show) {
      this.initHiddenRows();
      this.initBody(true);
      this.initPagination();
      return;
    }
    const data = this.getData();
    const rows = [];
    for (const row of data) {
      if (this.hiddenRows.includes(row)) {
        rows.push(row);
      }
    }
    this.hiddenRows = rows;
    return rows;
  }
  showColumn(field) {
    const fields = Array.isArray(field) ? field : [field];
    fields.forEach((field2) => {
      this._toggleColumn(this.fieldsColumnsIndex[field2], true, true);
    });
  }
  hideColumn(field) {
    const fields = Array.isArray(field) ? field : [field];
    fields.forEach((field2) => {
      this._toggleColumn(this.fieldsColumnsIndex[field2], false, true);
    });
  }
  _toggleColumn(index, checked, needUpdate) {
    if (index === -1 || this.columns[index].visible === checked) {
      return;
    }
    this.columns[index].visible = checked;
    this.initHeader();
    this.initSearch();
    this.initPagination();
    this.initBody();
    if (this.options.showColumns) {
      const $items = this.$toolbar.find('.keep-open input:not(".toggle-all")').prop("disabled", false);
      if (needUpdate) {
        $items.filter(utils_default.sprintf('[value="%s"]', index)).prop("checked", checked);
      }
      if ($items.filter(":checked").length <= this.options.minimumCountColumns) {
        $items.filter(":checked").prop("disabled", true);
      }
    }
  }
  getVisibleColumns() {
    return this.columns.filter((column) => column.visible && !this.isSelectionColumn(column));
  }
  getHiddenColumns() {
    return this.columns.filter(({ visible }) => !visible);
  }
  isSelectionColumn(column) {
    return column.radio || column.checkbox;
  }
  showAllColumns() {
    this._toggleAllColumns(true);
  }
  hideAllColumns() {
    this._toggleAllColumns(false);
  }
  _toggleAllColumns(visible) {
    for (const column of this.columns.slice().reverse()) {
      if (column.switchable) {
        if (!visible && this.options.showColumns && this.getVisibleColumns().filter((it) => it.switchable).length === this.options.minimumCountColumns) {
          continue;
        }
        column.visible = visible;
      }
    }
    this.initHeader();
    this.initSearch();
    this.initPagination();
    this.initBody();
    if (this.options.showColumns) {
      const $items = this.$toolbar.find('.keep-open input[type="checkbox"]:not(".toggle-all")').prop("disabled", false);
      if (visible) {
        $items.prop("checked", visible);
      } else {
        $items.get().reverse().forEach((item) => {
          if ($items.filter(":checked").length > this.options.minimumCountColumns) {
            $(item).prop("checked", visible);
          }
        });
      }
      if ($items.filter(":checked").length <= this.options.minimumCountColumns) {
        $items.filter(":checked").prop("disabled", true);
      }
    }
  }
  mergeCells(options) {
    const row = options.index;
    let col = this.getVisibleFields().indexOf(options.field);
    const rowspan = options.rowspan || 1;
    const colspan = options.colspan || 1;
    let i;
    let j;
    const $tr = this.$body.find(">tr[data-index]");
    col += utils_default.getDetailViewIndexOffset(this.options);
    const $td = $tr.eq(row).find(">td").eq(col);
    if (row < 0 || col < 0 || row >= this.data.length) {
      return;
    }
    for (i = row; i < row + rowspan; i++) {
      for (j = col; j < col + colspan; j++) {
        $tr.eq(i).find(">td").eq(j).hide();
      }
    }
    $td.attr("rowspan", rowspan).attr("colspan", colspan).show();
  }
  checkAll() {
    this._toggleCheckAll(true);
  }
  uncheckAll() {
    this._toggleCheckAll(false);
  }
  _toggleCheckAll(checked) {
    const rowsBefore = this.getSelections();
    this.$selectAll.add(this.$selectAll_).prop("checked", checked);
    this.$selectItem.filter(":enabled").prop("checked", checked);
    this.updateRows();
    this.updateSelected();
    const rowsAfter = this.getSelections();
    if (checked) {
      this.trigger("check-all", rowsAfter, rowsBefore);
      return;
    }
    this.trigger("uncheck-all", rowsAfter, rowsBefore);
  }
  checkInvert() {
    const $items = this.$selectItem.filter(":enabled");
    let checked = $items.filter(":checked");
    $items.each((i, el) => {
      $(el).prop("checked", !$(el).prop("checked"));
    });
    this.updateRows();
    this.updateSelected();
    this.trigger("uncheck-some", checked);
    checked = this.getSelections();
    this.trigger("check-some", checked);
  }
  check(index) {
    this._toggleCheck(true, index);
  }
  uncheck(index) {
    this._toggleCheck(false, index);
  }
  _toggleCheck(checked, index) {
    const $el = this.$selectItem.filter(`[data-index="${index}"]`);
    const row = this.data[index];
    if ($el.is(":radio") || this.options.singleSelect || this.options.multipleSelectRow && !this.multipleSelectRowCtrlKey && !this.multipleSelectRowShiftKey) {
      for (const r of this.options.data) {
        r[this.header.stateField] = false;
      }
      this.$selectItem.filter(":checked").not($el).prop("checked", false);
    }
    row[this.header.stateField] = checked;
    if (this.options.multipleSelectRow) {
      if (this.multipleSelectRowShiftKey && this.multipleSelectRowLastSelectedIndex >= 0) {
        const [fromIndex, toIndex] = this.multipleSelectRowLastSelectedIndex < index ? [this.multipleSelectRowLastSelectedIndex, index] : [index, this.multipleSelectRowLastSelectedIndex];
        for (let i = fromIndex + 1; i < toIndex; i++) {
          this.data[i][this.header.stateField] = true;
          this.$selectItem.filter(`[data-index="${i}"]`).prop("checked", true);
        }
      }
      this.multipleSelectRowCtrlKey = false;
      this.multipleSelectRowShiftKey = false;
      this.multipleSelectRowLastSelectedIndex = checked ? index : -1;
    }
    $el.prop("checked", checked);
    this.updateSelected();
    this.trigger(checked ? "check" : "uncheck", this.data[index], $el);
  }
  checkBy(obj) {
    this._toggleCheckBy(true, obj);
  }
  uncheckBy(obj) {
    this._toggleCheckBy(false, obj);
  }
  _toggleCheckBy(checked, obj) {
    if (!obj.hasOwnProperty("field") || !obj.hasOwnProperty("values")) {
      return;
    }
    const rows = [];
    this.data.forEach((row, i) => {
      if (!row.hasOwnProperty(obj.field)) {
        return false;
      }
      if (obj.values.includes(row[obj.field])) {
        let $el = this.$selectItem.filter(":enabled").filter(utils_default.sprintf('[data-index="%s"]', i));
        const onlyCurrentPage = obj.hasOwnProperty("onlyCurrentPage") ? obj.onlyCurrentPage : false;
        $el = checked ? $el.not(":checked") : $el.filter(":checked");
        if (!$el.length && onlyCurrentPage) {
          return;
        }
        $el.prop("checked", checked);
        row[this.header.stateField] = checked;
        rows.push(row);
        this.trigger(checked ? "check" : "uncheck", row, $el);
      }
    });
    this.updateSelected();
    this.trigger(checked ? "check-some" : "uncheck-some", rows);
  }
  refresh(params) {
    if (params && params.url) {
      this.options.url = params.url;
    }
    if (params && params.pageNumber) {
      this.options.pageNumber = params.pageNumber;
    }
    if (params && params.pageSize) {
      this.options.pageSize = params.pageSize;
    }
    this.trigger("refresh", this.initServer(
      params && params.silent,
      params && params.query,
      params && params.url
    ));
  }
  destroy() {
    this.$el.insertBefore(this.$container);
    $(this.options.toolbar).insertBefore(this.$el);
    this.$container.next().remove();
    this.$container.remove();
    this.$el.html(this.$el_.html()).css("margin-top", "0").attr("class", this.$el_.attr("class") || "");
    const resizeEvent = utils_default.getEventName("resize.bootstrap-table", this.$el.attr("id"));
    $(window).off(resizeEvent);
  }
  resetView(params) {
    let padding = 0;
    if (params && params.height) {
      this.options.height = params.height;
    }
    this.$tableContainer.toggleClass("has-card-view", this.options.cardView);
    if (this.options.height) {
      const fixedBody = this.$tableBody.get(0);
      this.hasScrollBar = fixedBody.scrollWidth > fixedBody.clientWidth;
    }
    if (!this.options.cardView && this.options.showHeader && this.options.height) {
      this.$tableHeader.show();
      this.resetHeader();
      padding += this.$header.outerHeight(true) + 1;
    } else {
      this.$tableHeader.hide();
      this.trigger("post-header");
    }
    if (!this.options.cardView && this.options.showFooter) {
      this.$tableFooter.show();
      this.fitFooter();
      if (this.options.height) {
        padding += this.$tableFooter.outerHeight(true);
      }
    }
    if (this.$container.hasClass("fullscreen")) {
      this.$tableContainer.css("height", "");
      this.$tableContainer.css("width", "");
    } else if (this.options.height) {
      if (this.$tableBorder) {
        this.$tableBorder.css("width", "");
        this.$tableBorder.css("height", "");
      }
      const toolbarHeight = this.$toolbar.outerHeight(true);
      const paginationHeight = this.$pagination.outerHeight(true);
      const height = this.options.height - toolbarHeight - paginationHeight;
      const $bodyTable = this.$tableBody.find(">table");
      const tableHeight = $bodyTable.outerHeight();
      this.$tableContainer.css("height", `${height}px`);
      if (this.$tableBorder && $bodyTable.is(":visible")) {
        let tableBorderHeight = height - tableHeight - 2;
        if (this.hasScrollBar) {
          tableBorderHeight -= utils_default.getScrollBarWidth();
        }
        this.$tableBorder.css("width", `${$bodyTable.outerWidth()}px`);
        this.$tableBorder.css("height", `${tableBorderHeight}px`);
      }
    }
    if (this.options.cardView) {
      this.$el.css("margin-top", "0");
      this.$tableContainer.css("padding-bottom", "0");
      this.$tableFooter.hide();
    } else {
      this.getCaret();
      this.$tableContainer.css("padding-bottom", `${padding}px`);
    }
    this.trigger("reset-view");
  }
  showLoading() {
    this.$tableLoading.toggleClass("open", true);
    let fontSize = this.options.loadingFontSize;
    if (this.options.loadingFontSize === "auto") {
      fontSize = this.$tableLoading.width() * 0.04;
      fontSize = Math.max(12, fontSize);
      fontSize = Math.min(32, fontSize);
      fontSize = `${fontSize}px`;
    }
    this.$tableLoading.find(".loading-text").css("font-size", fontSize);
  }
  hideLoading() {
    this.$tableLoading.toggleClass("open", false);
  }
  togglePagination() {
    this.options.pagination = !this.options.pagination;
    const icon = this.options.showButtonIcons ? this.options.pagination ? this.options.icons.paginationSwitchDown : this.options.icons.paginationSwitchUp : "";
    const text = this.options.showButtonText ? this.options.pagination ? this.options.formatPaginationSwitchUp() : this.options.formatPaginationSwitchDown() : "";
    this.$toolbar.find('button[name="paginationSwitch"]').html(`${utils_default.sprintf(this.constants.html.icon, this.options.iconsPrefix, icon)} ${text}`);
    this.updatePagination();
    this.trigger("toggle-pagination", this.options.pagination);
  }
  toggleFullscreen() {
    this.$el.closest(".bootstrap-table").toggleClass("fullscreen");
    this.resetView();
  }
  toggleView() {
    this.options.cardView = !this.options.cardView;
    this.initHeader();
    const icon = this.options.showButtonIcons ? this.options.cardView ? this.options.icons.toggleOn : this.options.icons.toggleOff : "";
    const text = this.options.showButtonText ? this.options.cardView ? this.options.formatToggleOff() : this.options.formatToggleOn() : "";
    this.$toolbar.find('button[name="toggle"]').html(`${utils_default.sprintf(this.constants.html.icon, this.options.iconsPrefix, icon)} ${text}`).attr("aria-label", text).attr("title", text);
    this.initBody();
    this.trigger("toggle", this.options.cardView);
  }
  resetSearch(text) {
    const $search = utils_default.getSearchInput(this);
    const textToUse = text || "";
    $search.val(textToUse);
    this.searchText = textToUse;
    this.onSearch({ currentTarget: $search }, false);
  }
  filterBy(columns, options) {
    this.filterOptions = utils_default.isEmptyObject(options) ? this.options.filterOptions : $.extend(this.options.filterOptions, options);
    this.filterColumns = utils_default.isEmptyObject(columns) ? {} : columns;
    this.options.pageNumber = 1;
    this.initSearch();
    this.updatePagination();
  }
  scrollTo(params) {
    let options = { unit: "px", value: 0 };
    if (typeof params === "object") {
      options = Object.assign(options, params);
    } else if (typeof params === "string" && params === "bottom") {
      options.value = this.$tableBody[0].scrollHeight;
    } else if (typeof params === "string" || typeof params === "number") {
      options.value = params;
    }
    let scrollTo = options.value;
    if (options.unit === "rows") {
      scrollTo = 0;
      this.$body.find(`> tr:lt(${options.value})`).each((i, el) => {
        scrollTo += $(el).outerHeight(true);
      });
    }
    this.$tableBody.scrollTop(scrollTo);
  }
  getScrollPosition() {
    return this.$tableBody.scrollTop();
  }
  selectPage(page) {
    if (page > 0 && page <= this.options.totalPages) {
      this.options.pageNumber = page;
      this.updatePagination();
    }
  }
  prevPage() {
    if (this.options.pageNumber > 1) {
      this.options.pageNumber--;
      this.updatePagination();
    }
  }
  nextPage() {
    if (this.options.pageNumber < this.options.totalPages) {
      this.options.pageNumber++;
      this.updatePagination();
    }
  }
  toggleDetailView(index, _columnDetailFormatter) {
    const $tr = this.$body.find(utils_default.sprintf('> tr[data-index="%s"]', index));
    if ($tr.next().is("tr.detail-view")) {
      this.collapseRow(index);
    } else {
      this.expandRow(index, _columnDetailFormatter);
    }
    this.resetView();
  }
  expandRow(index, _columnDetailFormatter) {
    const row = this.data[index];
    const $tr = this.$body.find(utils_default.sprintf('> tr[data-index="%s"][data-has-detail-view]', index));
    if (this.options.detailViewIcon) {
      $tr.find("a.detail-icon").html(utils_default.sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailClose));
    }
    if ($tr.next().is("tr.detail-view")) {
      return;
    }
    $tr.after(utils_default.sprintf('<tr class="detail-view"><td colspan="%s"></td></tr>', $tr.children("td").length));
    const $element = $tr.next().find("td");
    const detailFormatter = _columnDetailFormatter || this.options.detailFormatter;
    const content = utils_default.calculateObjectValue(this.options, detailFormatter, [index, row, $element], "");
    if ($element.length === 1) {
      $element.append(content);
    }
    this.trigger("expand-row", index, row, $element);
  }
  expandRowByUniqueId(uniqueId) {
    const row = this.getRowByUniqueId(uniqueId);
    if (!row) {
      return;
    }
    this.expandRow(this.data.indexOf(row));
  }
  collapseRow(index) {
    const row = this.data[index];
    const $tr = this.$body.find(utils_default.sprintf('> tr[data-index="%s"][data-has-detail-view]', index));
    if (!$tr.next().is("tr.detail-view")) {
      return;
    }
    if (this.options.detailViewIcon) {
      $tr.find("a.detail-icon").html(utils_default.sprintf(this.constants.html.icon, this.options.iconsPrefix, this.options.icons.detailOpen));
    }
    this.trigger("collapse-row", index, row, $tr.next());
    $tr.next().remove();
  }
  collapseRowByUniqueId(uniqueId) {
    const row = this.getRowByUniqueId(uniqueId);
    if (!row) {
      return;
    }
    this.collapseRow(this.data.indexOf(row));
  }
  expandAllRows() {
    const trs = this.$body.find("> tr[data-index][data-has-detail-view]");
    for (let i = 0; i < trs.length; i++) {
      this.expandRow($(trs[i]).data("index"));
    }
  }
  collapseAllRows() {
    const trs = this.$body.find("> tr[data-index][data-has-detail-view]");
    for (let i = 0; i < trs.length; i++) {
      this.collapseRow($(trs[i]).data("index"));
    }
  }
  updateColumnTitle(params) {
    if (!params.hasOwnProperty("field") || !params.hasOwnProperty("title")) {
      return;
    }
    this.columns[this.fieldsColumnsIndex[params.field]].title = this.options.escape ? utils_default.escapeHTML(params.title) : params.title;
    if (this.columns[this.fieldsColumnsIndex[params.field]].visible) {
      this.$header.find("th[data-field]").each((i, el) => {
        if ($(el).data("field") === params.field) {
          $($(el).find(".th-inner")[0]).text(params.title);
          return false;
        }
      });
      this.resetView();
    }
  }
  updateFormatText(formatName, text) {
    if (!/^format/.test(formatName) || !this.options[formatName]) {
      return;
    }
    if (typeof text === "string") {
      this.options[formatName] = () => text;
    } else if (typeof text === "function") {
      this.options[formatName] = text;
    }
    this.initToolbar();
    this.initPagination();
    this.initBody();
  }
};
BootstrapTable2.VERSION = constants_default.VERSION;
BootstrapTable2.DEFAULTS = constants_default.DEFAULTS;
BootstrapTable2.LOCALES = constants_default.LOCALES;
BootstrapTable2.COLUMN_DEFAULTS = constants_default.COLUMN_DEFAULTS;
BootstrapTable2.METHODS = constants_default.METHODS;
BootstrapTable2.EVENTS = constants_default.EVENTS;
$.BootstrapTable = BootstrapTable2;
$.fn.bootstrapTable = function(option, ...args) {
  let value;
  this.each((i, el) => {
    let data = $(el).data("bootstrap.table");
    const options = $.extend(
      {},
      BootstrapTable2.DEFAULTS,
      $(el).data(),
      typeof option === "object" && option
    );
    if (typeof option === "string") {
      if (!constants_default.METHODS.includes(option)) {
        throw new Error(`Unknown method: ${option}`);
      }
      if (!data) {
        return;
      }
      value = data[option](...args);
      if (option === "destroy") {
        $(el).removeData("bootstrap.table");
      }
    }
    if (!data) {
      data = new $.BootstrapTable(el, options);
      $(el).data("bootstrap.table", data);
      data.init();
    }
  });
  return typeof value === "undefined" ? this : value;
};
$.fn.bootstrapTable.Constructor = BootstrapTable2;
$.fn.bootstrapTable.theme = constants_default.THEME;
$.fn.bootstrapTable.VERSION = constants_default.VERSION;
$.fn.bootstrapTable.defaults = BootstrapTable2.DEFAULTS;
$.fn.bootstrapTable.columnDefaults = BootstrapTable2.COLUMN_DEFAULTS;
$.fn.bootstrapTable.events = BootstrapTable2.EVENTS;
$.fn.bootstrapTable.locales = BootstrapTable2.LOCALES;
$.fn.bootstrapTable.methods = BootstrapTable2.METHODS;
$.fn.bootstrapTable.utils = utils_default;
$(() => {
  $('[data-toggle="table"]').bootstrapTable();
});
var bootstrap_table_default2 = BootstrapTable2;

// node_modules/bootstrap-table/src/extensions/export/bootstrap-table-export.js
var Utils = $.fn.bootstrapTable.utils;
var TYPE_NAME = {
  json: "JSON",
  xml: "XML",
  png: "PNG",
  csv: "CSV",
  txt: "TXT",
  sql: "SQL",
  doc: "MS-Word",
  excel: "MS-Excel",
  xlsx: "MS-Excel (OpenXML)",
  powerpoint: "MS-Powerpoint",
  pdf: "PDF"
};
Object.assign($.fn.bootstrapTable.defaults, {
  showExport: false,
  exportDataType: "basic",
  // basic, all, selected
  exportTypes: ["json", "xml", "csv", "txt", "sql", "excel"],
  exportOptions: {},
  exportFooter: false
});
Object.assign($.fn.bootstrapTable.columnDefaults, {
  forceExport: false,
  forceHide: false
});
Object.assign($.fn.bootstrapTable.defaults.icons, {
  export: {
    bootstrap3: "glyphicon-export icon-share",
    bootstrap5: "bi-download",
    materialize: "file_download",
    "bootstrap-table": "icon-download"
  }[$.fn.bootstrapTable.theme] || "fa-download"
});
Object.assign($.fn.bootstrapTable.locales, {
  formatExport() {
    return "Export data";
  }
});
Object.assign($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);
$.fn.bootstrapTable.methods.push("exportTable");
Object.assign($.fn.bootstrapTable.defaults, {
  // eslint-disable-next-line no-unused-vars
  onExportSaved(exportedRows) {
    return false;
  },
  onExportStarted() {
    return false;
  }
});
Object.assign($.fn.bootstrapTable.events, {
  "export-saved.bs.table": "onExportSaved",
  "export-started.bs.table": "onExportStarted"
});
$.BootstrapTable = class extends $.BootstrapTable {
  initToolbar(...args) {
    const o = this.options;
    let exportTypes = o.exportTypes;
    this.showToolbar = this.showToolbar || o.showExport;
    if (this.options.showExport) {
      if (typeof exportTypes === "string") {
        const types = exportTypes.slice(1, -1).replace(/ /g, "").split(",");
        exportTypes = types.map((t) => t.slice(1, -1));
      }
      if (typeof o.exportOptions === "string") {
        o.exportOptions = Utils.calculateObjectValue(null, o.exportOptions);
      }
      this.$export = this.$toolbar.find(">.columns div.export");
      if (this.$export.length) {
        this.updateExportButton();
        return;
      }
      this.buttons = Object.assign(this.buttons, {
        export: {
          html: () => {
            if (exportTypes.length === 1) {
              return `
                  <div class="export ${this.constants.classes.buttonsDropdown}"
                  data-type="${exportTypes[0]}">
                  <button class="${this.constants.buttonsClass}"
                  aria-label="${o.formatExport()}"
                  type="button"
                  title="${o.formatExport()}">
                  ${o.showButtonIcons ? Utils.sprintf(this.constants.html.icon, o.iconsPrefix, o.icons.export) : ""}
                  ${o.showButtonText ? o.formatExport() : ""}
                  </button>
                  </div>
                `;
            }
            const html = [];
            html.push(`
                <div class="export ${this.constants.classes.buttonsDropdown}">
                <button class="${this.constants.buttonsClass} dropdown-toggle"
                aria-label="${o.formatExport()}"
                ${this.constants.dataToggle}="dropdown"
                type="button"
                title="${o.formatExport()}">
                ${o.showButtonIcons ? Utils.sprintf(this.constants.html.icon, o.iconsPrefix, o.icons.export) : ""}
                ${o.showButtonText ? o.formatExport() : ""}
                ${this.constants.html.dropdownCaret}
                </button>
                ${this.constants.html.toolbarDropdown[0]}
              `);
            for (const type of exportTypes) {
              if (TYPE_NAME.hasOwnProperty(type)) {
                const $item = $(Utils.sprintf(this.constants.html.pageDropdownItem, "", TYPE_NAME[type]));
                $item.attr("data-type", type);
                html.push($item.prop("outerHTML"));
              }
            }
            html.push(this.constants.html.toolbarDropdown[1], "</div>");
            return html.join("");
          }
        }
      });
    }
    super.initToolbar(...args);
    this.$export = this.$toolbar.find(">.columns div.export");
    if (!this.options.showExport) {
      return;
    }
    this.updateExportButton();
    let $exportButtons = this.$export.find("[data-type]");
    if (exportTypes.length === 1) {
      $exportButtons = this.$export;
    }
    $exportButtons.click((e) => {
      e.preventDefault();
      this.exportTable({
        type: $(e.currentTarget).data("type")
      });
    });
    this.handleToolbar();
  }
  handleToolbar() {
    if (!this.$export) {
      return;
    }
    if (super.handleToolbar) {
      super.handleToolbar();
    }
  }
  exportTable(options) {
    const o = this.options;
    const stateField = this.header.stateField;
    const isCardView = o.cardView;
    const doExport = (callback) => {
      this.trigger("export-started");
      if (stateField) {
        this.hideColumn(stateField);
      }
      if (isCardView) {
        this.toggleView();
      }
      this.columns.forEach((row) => {
        if (row.forceHide) {
          this.hideColumn(row.field);
        }
      });
      const data = this.getData();
      if (o.detailView && o.detailViewIcon) {
        const detailViewIndex = o.detailViewAlign === "left" ? 0 : this.getVisibleFields().length + Utils.getDetailViewIndexOffset(this.options);
        o.exportOptions.ignoreColumn = [detailViewIndex].concat(o.exportOptions.ignoreColumn || []);
      }
      if (o.exportFooter && o.height) {
        const $footerRow = this.$tableFooter.find("tr").first();
        const footerData = {};
        const footerHtml = [];
        $.each($footerRow.children(), (index, footerCell) => {
          const footerCellHtml = $(footerCell).children(".th-inner").first().html();
          footerData[this.columns[index].field] = footerCellHtml === "&nbsp;" ? null : footerCellHtml;
          footerHtml.push(footerCellHtml);
        });
        this.$body.append(this.$body.children().last()[0].outerHTML);
        const $lastTableRow = this.$body.children().last();
        $.each($lastTableRow.children(), (index, lastTableRowCell) => {
          $(lastTableRowCell).html(footerHtml[index]);
        });
      }
      const hiddenColumns = this.getHiddenColumns();
      hiddenColumns.forEach((row) => {
        if (row.forceExport) {
          this.showColumn(row.field);
        }
      });
      if (typeof o.exportOptions.fileName === "function") {
        options.fileName = o.exportOptions.fileName();
      }
      this.$el.tableExport(Utils.extend({
        onAfterSaveToFile: () => {
          if (o.exportFooter) {
            this.load(data);
          }
          if (stateField) {
            this.showColumn(stateField);
          }
          if (isCardView) {
            this.toggleView();
          }
          hiddenColumns.forEach((row) => {
            if (row.forceExport) {
              this.hideColumn(row.field);
            }
          });
          this.columns.forEach((row) => {
            if (row.forceHide) {
              this.showColumn(row.field);
            }
          });
          if (callback)
            callback();
        }
      }, o.exportOptions, options));
    };
    if (o.exportDataType === "all" && o.pagination) {
      const eventName = o.sidePagination === "server" ? "post-body.bs.table" : "page-change.bs.table";
      const virtualScroll = this.options.virtualScroll;
      this.$el.one(eventName, () => {
        setTimeout(() => {
          doExport(() => {
            this.options.virtualScroll = virtualScroll;
            this.togglePagination();
          });
        }, 0);
      });
      this.options.virtualScroll = false;
      this.togglePagination();
      this.trigger("export-saved", this.getData());
    } else if (o.exportDataType === "selected") {
      let data = this.getData();
      let selectedData = this.getSelections();
      const pagination = o.pagination;
      if (!selectedData.length) {
        return;
      }
      if (o.sidePagination === "server") {
        data = {
          total: o.totalRows,
          [this.options.dataField]: data
        };
        selectedData = {
          total: selectedData.length,
          [this.options.dataField]: selectedData
        };
      }
      this.load(selectedData);
      if (pagination) {
        this.togglePagination();
      }
      doExport(() => {
        if (pagination) {
          this.togglePagination();
        }
        this.load(data);
      });
      this.trigger("export-saved", selectedData);
    } else {
      doExport();
      this.trigger("export-saved", this.getData(true));
    }
  }
  updateSelected() {
    super.updateSelected();
    this.updateExportButton();
  }
  updateExportButton() {
    if (this.options.exportDataType === "selected") {
      this.$export.find("> button").prop("disabled", !this.getSelections().length);
    }
  }
};

// node_modules/bootstrap-table/src/extensions/mobile/bootstrap-table-mobile.js
var debounce = (func, wait) => {
  let timeout = 0;
  return (...args) => {
    const later = () => {
      timeout = 0;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
Object.assign($.fn.bootstrapTable.defaults, {
  mobileResponsive: false,
  minWidth: 562,
  minHeight: void 0,
  heightThreshold: 100,
  // just slightly larger than mobile chrome's auto-hiding toolbar
  checkOnInit: true,
  columnsHidden: []
});
$.BootstrapTable = class extends $.BootstrapTable {
  init(...args) {
    super.init(...args);
    if (!this.options.mobileResponsive || !this.options.minWidth) {
      return;
    }
    if (this.options.minWidth < 100 && this.options.resizable) {
      console.warn("The minWidth when the resizable extension is active should be greater or equal than 100");
      this.options.minWidth = 100;
    }
    let old = {
      width: $(window).width(),
      height: $(window).height()
    };
    $(window).on("resize orientationchange", debounce(() => {
      const width = $(window).width();
      const height = $(window).height();
      const $activeElement = $(document.activeElement);
      if ($activeElement.length && ["INPUT", "SELECT", "TEXTAREA"].includes($activeElement.prop("nodeName"))) {
        return;
      }
      if (Math.abs(old.height - height) > this.options.heightThreshold || old.width !== width) {
        this.changeView(width, height);
        old = {
          width,
          height
        };
      }
    }, 200));
    if (this.options.checkOnInit) {
      const width = $(window).width();
      const height = $(window).height();
      this.changeView(width, height);
      old = {
        width,
        height
      };
    }
  }
  conditionCardView() {
    this.changeTableView(false);
    this.showHideColumns(false);
  }
  conditionFullView() {
    this.changeTableView(true);
    this.showHideColumns(true);
  }
  changeTableView(cardViewState) {
    this.options.cardView = cardViewState;
    this.toggleView();
  }
  showHideColumns(checked) {
    if (this.options.columnsHidden.length > 0) {
      this.columns.forEach((column) => {
        if (this.options.columnsHidden.includes(column.field)) {
          if (column.visible !== checked) {
            this._toggleColumn(this.fieldsColumnsIndex[column.field], checked, true);
          }
        }
      });
    }
  }
  changeView(width, height) {
    if (this.options.minHeight) {
      if (width <= this.options.minWidth && height <= this.options.minHeight) {
        this.conditionCardView();
      } else if (width > this.options.minWidth && height > this.options.minHeight) {
        this.conditionFullView();
      }
    } else if (width <= this.options.minWidth) {
      this.conditionCardView();
    } else if (width > this.options.minWidth) {
      this.conditionFullView();
    }
    this.resetView();
  }
};

// node_modules/bootstrap-table/src/extensions/i18n-enhance/bootstrap-table-i18n-enhance.js
$.fn.bootstrapTable.methods.push("changeTitle");
$.fn.bootstrapTable.methods.push("changeLocale");
$.BootstrapTable = class extends $.BootstrapTable {
  changeTitle(locale) {
    $.each(this.options.columns, (idx, columnList) => {
      $.each(columnList, (idx2, column) => {
        if (column.field) {
          column.title = locale[column.field];
        }
      });
    });
    this.initHeader();
    this.initBody();
    this.initToolbar();
  }
  changeLocale(localeId) {
    this.options.locale = localeId;
    this.initLocale();
    this.initPagination();
    this.initBody();
    this.initToolbar();
  }
};

// node_modules/bootstrap-table/src/extensions/sticky-header/bootstrap-table-sticky-header.js
var Utils2 = $.fn.bootstrapTable.utils;
Object.assign($.fn.bootstrapTable.defaults, {
  stickyHeader: false,
  stickyHeaderOffsetY: 0,
  stickyHeaderOffsetLeft: 0,
  stickyHeaderOffsetRight: 0
});
$.BootstrapTable = class extends $.BootstrapTable {
  initHeader(...args) {
    super.initHeader(...args);
    if (!this.options.stickyHeader) {
      return;
    }
    this.$tableBody.find(".sticky-header-container,.sticky_anchor_begin,.sticky_anchor_end").remove();
    this.$el.before('<div class="sticky-header-container"></div>');
    this.$el.before('<div class="sticky_anchor_begin"></div>');
    this.$el.after('<div class="sticky_anchor_end"></div>');
    this.$header.addClass("sticky-header");
    this.$stickyContainer = this.$tableBody.find(".sticky-header-container");
    this.$stickyBegin = this.$tableBody.find(".sticky_anchor_begin");
    this.$stickyEnd = this.$tableBody.find(".sticky_anchor_end");
    this.$stickyHeader = this.$header.clone(true, true);
    const resizeEvent = Utils2.getEventName("resize.sticky-header-table", this.$el.attr("id"));
    const scrollEvent = Utils2.getEventName("scroll.sticky-header-table", this.$el.attr("id"));
    $(window).off(resizeEvent).on(resizeEvent, () => this.renderStickyHeader());
    $(window).off(scrollEvent).on(scrollEvent, () => this.renderStickyHeader());
    this.$tableBody.off("scroll").on("scroll", () => this.matchPositionX());
  }
  onColumnSearch({ currentTarget, keyCode }) {
    super.onColumnSearch({ currentTarget, keyCode });
    this.renderStickyHeader();
  }
  resetView(...args) {
    super.resetView(...args);
    $(".bootstrap-table.fullscreen").off("scroll").on("scroll", () => this.renderStickyHeader());
  }
  getCaret(...args) {
    super.getCaret(...args);
    if (this.$stickyHeader) {
      const $ths = this.$stickyHeader.find("th");
      this.$header.find("th").each((i, th) => {
        $ths.eq(i).find(".sortable").attr("class", $(th).find(".sortable").attr("class"));
      });
    }
  }
  horizontalScroll() {
    super.horizontalScroll();
    this.$tableBody.on("scroll", () => this.matchPositionX());
  }
  renderStickyHeader() {
    const that = this;
    this.$stickyHeader = this.$header.clone(true, true);
    if (this.options.filterControl) {
      $(this.$stickyHeader).off("keyup change mouseup").on("keyup change mouse", function(e) {
        const $target = $(e.target);
        const value = $target.val();
        const field = $target.parents("th").data("field");
        const $coreTh = that.$header.find(`th[data-field="${field}"]`);
        if ($target.is("input")) {
          $coreTh.find("input").val(value);
        } else if ($target.is("select")) {
          const $select = $coreTh.find("select");
          $select.find("option[selected]").removeAttr("selected");
          $select.find(`option[value="${value}"]`).attr("selected", true);
        }
        that.triggerSearch();
      });
    }
    const top = $(window).scrollTop();
    const start = this.$stickyBegin.offset().top - this.options.stickyHeaderOffsetY;
    const end = this.$stickyEnd.offset().top - this.options.stickyHeaderOffsetY - this.$header.height();
    if (top > start && top <= end) {
      this.$stickyHeader.find("tr").each((indexRows, rows) => {
        const columns = $(rows).find("th");
        columns.each((indexColumns, celd) => {
          $(celd).css("min-width", this.$header.find(`tr:eq(${indexRows})`).find(`th:eq(${indexColumns})`).css("width"));
        });
      });
      this.$stickyContainer.show().addClass("fix-sticky fixed-table-container");
      const coords = this.$tableBody[0].getBoundingClientRect();
      let width = "100%";
      let stickyHeaderOffsetLeft = this.options.stickyHeaderOffsetLeft;
      let stickyHeaderOffsetRight = this.options.stickyHeaderOffsetRight;
      if (!stickyHeaderOffsetLeft) {
        stickyHeaderOffsetLeft = coords.left;
      }
      if (!stickyHeaderOffsetRight) {
        width = `${coords.width}px`;
      }
      if (this.$el.closest(".bootstrap-table").hasClass("fullscreen")) {
        stickyHeaderOffsetLeft = 0;
        stickyHeaderOffsetRight = 0;
        width = "100%";
      }
      this.$stickyContainer.css("top", `${this.options.stickyHeaderOffsetY}px`);
      this.$stickyContainer.css("left", `${stickyHeaderOffsetLeft}px`);
      this.$stickyContainer.css("right", `${stickyHeaderOffsetRight}px`);
      this.$stickyContainer.css("width", `${width}`);
      this.$stickyTable = $("<table/>");
      this.$stickyTable.addClass(this.options.classes);
      this.$stickyContainer.html(this.$stickyTable.append(this.$stickyHeader));
      this.matchPositionX();
    } else {
      this.$stickyContainer.removeClass("fix-sticky").hide();
    }
  }
  matchPositionX() {
    this.$stickyContainer.scrollLeft(this.$tableBody.scrollLeft());
  }
};

// node_modules/bootstrap-table/src/extensions/toolbar/bootstrap-table-toolbar.js
var Utils3 = $.fn.bootstrapTable.utils;
var theme = {
  bootstrap3: {
    icons: {
      advancedSearchIcon: "glyphicon-chevron-down"
    },
    classes: {},
    html: {
      modal: `
        <div id="avdSearchModal_%s"  class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xs">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">%s</h4>
              </div>
              <div class="modal-body modal-body-custom">
                <div class="container-fluid" id="avdSearchModalContent_%s"
                  style="padding-right: 0px; padding-left: 0px;" >
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" id="btnCloseAvd_%s" class="btn btn-%s">%s</button>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  bootstrap4: {
    icons: {
      advancedSearchIcon: "fa-chevron-down"
    },
    classes: {},
    html: {
      modal: `
        <div id="avdSearchModal_%s"  class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xs">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">%s</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body modal-body-custom">
                <div class="container-fluid" id="avdSearchModalContent_%s"
                  style="padding-right: 0; padding-left: 0;" >
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" id="btnCloseAvd_%s" class="btn btn-%s">%s</button>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  bootstrap5: {
    icons: {
      advancedSearchIcon: "bi-chevron-down"
    },
    classes: {
      formGroup: "mb-3"
    },
    html: {
      modal: `
        <div id="avdSearchModal_%s" class="modal fade" tabindex="-1" aria-labelledby="mySmallModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xs">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">%s</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body modal-body-custom">
                <div class="container-fluid" id="avdSearchModalContent_%s"
                  style="padding-right: 0; padding-left: 0;" >
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" id="btnCloseAvd_%s" class="btn btn-%s">%s</button>
              </div>
            </div>
          </div>
        </div>
      `
    }
  },
  bulma: {
    icons: {
      advancedSearchIcon: "fa-chevron-down"
    },
    classes: {},
    html: {
      modal: `
        <div class="modal" id="avdSearchModal_%s">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">%s</p>
              <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body" id="avdSearchModalContent_%s"></section>
            <footer class="modal-card-foot">
              <button class="button" id="btnCloseAvd_%s" data-close="btn btn-%s">%s</button>
            </footer>
          </div>
        </div>
      `
    }
  },
  foundation: {
    icons: {
      advancedSearchIcon: "fa-chevron-down"
    },
    classes: {},
    html: {
      modal: `
        <div class="reveal" id="avdSearchModal_%s" data-reveal>
          <h1>%s</h1>
          <div id="avdSearchModalContent_%s">

          </div>
          <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
          </button>

          <button id="btnCloseAvd_%s" class="%s" type="button">%s</button>
        </div>
      `
    }
  },
  materialize: {
    icons: {
      advancedSearchIcon: "expand_more"
    },
    classes: {},
    html: {
      modal: `
        <div id="avdSearchModal_%s" class="modal">
          <div class="modal-content">
            <h4>%s</h4>
            <div id="avdSearchModalContent_%s">

            </div>
          </div>
          <div class="modal-footer">
            <a href="javascript:void(0)"" id="btnCloseAvd_%s" class="modal-close waves-effect waves-green btn-flat %s">%s</a>
          </div>
        </div>
      `
    }
  },
  semantic: {
    icons: {
      advancedSearchIcon: "fa-chevron-down"
    },
    classes: {},
    html: {
      modal: `
        <div class="ui modal" id="avdSearchModal_%s">
          <i class="close icon"></i>
          <div class="header">
            %s
          </div>
          <div class="image content ui form" id="avdSearchModalContent_%s"></div>
          <div class="actions">
            <div id="btnCloseAvd_%s" class="ui black deny button %s">%s</div>
          </div>
        </div>
      `
    }
  }
}[$.fn.bootstrapTable.theme];
Object.assign($.fn.bootstrapTable.defaults, {
  advancedSearch: false,
  idForm: "advancedSearch",
  actionForm: "",
  idTable: void 0,
  // eslint-disable-next-line no-unused-vars
  onColumnAdvancedSearch(field, text) {
    return false;
  }
});
Object.assign($.fn.bootstrapTable.defaults.icons, {
  advancedSearchIcon: theme.icons.advancedSearchIcon
});
Object.assign($.fn.bootstrapTable.events, {
  "column-advanced-search.bs.table": "onColumnAdvancedSearch"
});
Object.assign($.fn.bootstrapTable.locales, {
  formatAdvancedSearch() {
    return "Advanced search";
  },
  formatAdvancedCloseButton() {
    return "Close";
  }
});
Object.assign($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);
$.BootstrapTable = class extends $.BootstrapTable {
  initToolbar() {
    const o = this.options;
    this.showToolbar = this.showToolbar || o.search && o.advancedSearch && o.idTable;
    if (o.search && o.advancedSearch && o.idTable) {
      this.buttons = Object.assign(this.buttons, {
        advancedSearch: {
          text: this.options.formatAdvancedSearch(),
          icon: this.options.icons.advancedSearchIcon,
          event: this.showAvdSearch,
          attributes: {
            "aria-label": this.options.formatAdvancedSearch(),
            title: this.options.formatAdvancedSearch()
          }
        }
      });
    }
    super.initToolbar();
  }
  showAvdSearch() {
    const o = this.options;
    const modalSelector = `#avdSearchModal_${o.idTable}`;
    if ($(modalSelector).length <= 0) {
      $("body").append(Utils3.sprintf(theme.html.modal, o.idTable, o.formatAdvancedSearch(), o.idTable, o.idTable, o.buttonsClass, o.formatAdvancedCloseButton()));
      let timeoutId = 0;
      $(`#avdSearchModalContent_${o.idTable}`).append(this.createFormAvd().join(""));
      $(`#${o.idForm}`).off("keyup blur", "input").on("keyup blur", "input", (e) => {
        if (o.sidePagination === "server") {
          this.onColumnAdvancedSearch(e);
        } else {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            this.onColumnAdvancedSearch(e);
          }, o.searchTimeOut);
        }
      });
      $(`#btnCloseAvd_${o.idTable}`).click(() => this.hideModal());
      if ($.fn.bootstrapTable.theme === "bulma") {
        $(modalSelector).find(".delete").off("click").on("click", () => this.hideModal());
      }
      this.showModal();
    } else {
      this.showModal();
    }
  }
  showModal() {
    const modalSelector = `#avdSearchModal_${this.options.idTable}`;
    if ($.inArray($.fn.bootstrapTable.theme, ["bootstrap3", "bootstrap4"]) !== -1) {
      $(modalSelector).modal();
    } else if ($.fn.bootstrapTable.theme === "bootstrap5") {
      if (!this.toolbarModal) {
        this.toolbarModal = new bootstrap.Modal(document.getElementById(`avdSearchModal_${this.options.idTable}`), {});
      }
      this.toolbarModal.show();
    } else if ($.fn.bootstrapTable.theme === "bulma") {
      $(modalSelector).toggleClass("is-active");
    } else if ($.fn.bootstrapTable.theme === "foundation") {
      if (!this.toolbarModal) {
        this.toolbarModal = new Foundation.Reveal($(modalSelector));
      }
      this.toolbarModal.open();
    } else if ($.fn.bootstrapTable.theme === "materialize") {
      $(modalSelector).modal();
      $(modalSelector).modal("open");
    } else if ($.fn.bootstrapTable.theme === "semantic") {
      $(modalSelector).modal("show");
    }
  }
  hideModal() {
    const $closeModalButton = $(`#avdSearchModal_${this.options.idTable}`);
    const modalSelector = `#avdSearchModal_${this.options.idTable}`;
    if ($.inArray($.fn.bootstrapTable.theme, ["bootstrap3", "bootstrap4"]) !== -1) {
      $closeModalButton.modal("hide");
    } else if ($.fn.bootstrapTable.theme === "bootstrap5") {
      this.toolbarModal.hide();
    } else if ($.fn.bootstrapTable.theme === "bulma") {
      $("html").toggleClass("is-clipped");
      $(modalSelector).toggleClass("is-active");
    } else if ($.fn.bootstrapTable.theme === "foundation") {
      this.toolbarModal.close();
    } else if ($.fn.bootstrapTable.theme === "materialize") {
      $(modalSelector).modal("open");
    } else if ($.fn.bootstrapTable.theme === "semantic") {
      $(modalSelector).modal("close");
    }
    if (this.options.sidePagination === "server") {
      this.options.pageNumber = 1;
      this.updatePagination();
      this.trigger("column-advanced-search", this.filterColumnsPartial);
    }
  }
  createFormAvd() {
    const o = this.options;
    const html = [`<form class="form-horizontal" id="${o.idForm}" action="${o.actionForm}">`];
    for (const column of this.columns) {
      if (!column.checkbox && column.visible && column.searchable) {
        html.push(`
          <div class="form-group row ${theme.classes.formGroup || ""}">
            <label class="col-sm-4 control-label">${column.title}</label>
            <div class="col-sm-6">
              <input type="text" class="form-control ${this.constants.classes.input}" name="${column.field}" placeholder="${column.title}" id="${column.field}">
            </div>
          </div>
        `);
      }
    }
    html.push("</form>");
    return html;
  }
  initSearch() {
    super.initSearch();
    if (!this.options.advancedSearch || this.options.sidePagination === "server") {
      return;
    }
    const fp = $.isEmptyObject(this.filterColumnsPartial) ? null : this.filterColumnsPartial;
    this.data = fp ? this.data.filter((item, i) => {
      for (const [key, v] of Object.entries(fp)) {
        const fval = v.toLowerCase();
        let value = item[key];
        const index = this.header.fields.indexOf(key);
        value = Utils3.calculateObjectValue(
          this.header,
          this.header.formatters[index],
          [value, item, i],
          value
        );
        if (!(index !== -1 && (typeof value === "string" || typeof value === "number") && `${value}`.toLowerCase().includes(fval))) {
          return false;
        }
      }
      return true;
    }) : this.data;
    this.unsortedData = [...this.data];
  }
  onColumnAdvancedSearch(e) {
    const text = $(e.currentTarget).val().trim();
    const $field = $(e.currentTarget)[0].id;
    if ($.isEmptyObject(this.filterColumnsPartial)) {
      this.filterColumnsPartial = {};
    }
    if (text) {
      this.filterColumnsPartial[$field] = text;
    } else {
      delete this.filterColumnsPartial[$field];
    }
    if (this.options.sidePagination !== "server") {
      this.options.pageNumber = 1;
      this.initSearch();
      this.updatePagination();
      this.trigger("column-advanced-search", $field, text);
    }
  }
};

// node_modules/bootstrap-table/src/extensions/cookie/bootstrap-table-cookie.js
var Utils4 = $.fn.bootstrapTable.utils;
var UtilsCookie = {
  cookieIds: {
    sortOrder: "bs.table.sortOrder",
    sortName: "bs.table.sortName",
    sortPriority: "bs.table.sortPriority",
    pageNumber: "bs.table.pageNumber",
    pageList: "bs.table.pageList",
    columns: "bs.table.columns",
    hiddenColumns: "bs.table.hiddenColumns",
    cardView: "bs.table.cardView",
    searchText: "bs.table.searchText",
    reorderColumns: "bs.table.reorderColumns",
    filterControl: "bs.table.filterControl",
    filterBy: "bs.table.filterBy"
  },
  getCurrentHeader(that) {
    return that.options.height ? that.$tableHeader : that.$header;
  },
  getCurrentSearchControls(that) {
    return that.options.height ? "table select, table input" : "select, input";
  },
  isCookieSupportedByBrowser() {
    return navigator.cookieEnabled;
  },
  isCookieEnabled(that, cookieName) {
    return that.options.cookiesEnabled.includes(cookieName);
  },
  setCookie(that, cookieName, cookieValue) {
    if (!that.options.cookie || !UtilsCookie.isCookieEnabled(that, cookieName)) {
      return;
    }
    return that._storage.setItem(`${that.options.cookieIdTable}.${cookieName}`, cookieValue);
  },
  getCookie(that, cookieName) {
    if (!cookieName || !UtilsCookie.isCookieEnabled(that, cookieName)) {
      return null;
    }
    return that._storage.getItem(`${that.options.cookieIdTable}.${cookieName}`);
  },
  deleteCookie(that, cookieName) {
    return that._storage.removeItem(`${that.options.cookieIdTable}.${cookieName}`);
  },
  calculateExpiration(cookieExpire) {
    const time = cookieExpire.replace(/[0-9]*/, "");
    cookieExpire = cookieExpire.replace(/[A-Za-z]{1,2}/, "");
    switch (time.toLowerCase()) {
      case "s":
        cookieExpire = +cookieExpire;
        break;
      case "mi":
        cookieExpire *= 60;
        break;
      case "h":
        cookieExpire = cookieExpire * 60 * 60;
        break;
      case "d":
        cookieExpire = cookieExpire * 24 * 60 * 60;
        break;
      case "m":
        cookieExpire = cookieExpire * 30 * 24 * 60 * 60;
        break;
      case "y":
        cookieExpire = cookieExpire * 365 * 24 * 60 * 60;
        break;
      default:
        cookieExpire = void 0;
        break;
    }
    if (!cookieExpire) {
      return "";
    }
    const d = /* @__PURE__ */ new Date();
    d.setTime(d.getTime() + cookieExpire * 1e3);
    return d.toGMTString();
  },
  initCookieFilters(bootstrapTable) {
    setTimeout(() => {
      const parsedCookieFilters = JSON.parse(
        UtilsCookie.getCookie(bootstrapTable, UtilsCookie.cookieIds.filterControl)
      );
      if (!bootstrapTable._filterControlValuesLoaded && parsedCookieFilters) {
        const cachedFilters = {};
        const header = UtilsCookie.getCurrentHeader(bootstrapTable);
        const searchControls = UtilsCookie.getCurrentSearchControls(bootstrapTable);
        const applyCookieFilters = (element, filteredCookies) => {
          filteredCookies.forEach((cookie) => {
            const value = element.value.toString();
            const text = cookie.text;
            if (text === "" || element.type === "radio" && value !== text) {
              return;
            }
            if (element.tagName === "INPUT" && element.type === "radio" && value === text) {
              element.checked = true;
              cachedFilters[cookie.field] = text;
            } else if (element.tagName === "INPUT") {
              element.value = text;
              cachedFilters[cookie.field] = text;
            } else if (element.tagName === "SELECT" && bootstrapTable.options.filterControlContainer) {
              element.value = text;
              cachedFilters[cookie.field] = text;
            } else if (text !== "" && element.tagName === "SELECT") {
              cachedFilters[cookie.field] = text;
              for (const currentElement of element) {
                if (currentElement.value === text) {
                  currentElement.selected = true;
                  return;
                }
              }
              const option = document.createElement("option");
              option.value = text;
              option.text = text;
              element.add(option, element[1]);
              element.selectedIndex = 1;
            }
          });
        };
        let filterContainer = header;
        if (bootstrapTable.options.filterControlContainer) {
          filterContainer = $(`${bootstrapTable.options.filterControlContainer}`);
        }
        filterContainer.find(searchControls).each(function() {
          const field = $(this).closest("[data-field]").data("field");
          const filteredCookies = parsedCookieFilters.filter((cookie) => cookie.field === field);
          applyCookieFilters(this, filteredCookies);
        });
        bootstrapTable.initColumnSearch(cachedFilters);
        bootstrapTable._filterControlValuesLoaded = true;
        bootstrapTable.initServer();
      }
    }, 250);
  }
};
Object.assign($.fn.bootstrapTable.defaults, {
  cookie: false,
  cookieExpire: "2h",
  cookiePath: null,
  cookieDomain: null,
  cookieSecure: null,
  cookieSameSite: "Lax",
  cookieIdTable: "",
  cookiesEnabled: [
    "bs.table.sortOrder",
    "bs.table.sortName",
    "bs.table.sortPriority",
    "bs.table.pageNumber",
    "bs.table.pageList",
    "bs.table.hiddenColumns",
    "bs.table.columns",
    "bs.table.searchText",
    "bs.table.filterControl",
    "bs.table.filterBy",
    "bs.table.reorderColumns",
    "bs.table.cardView"
  ],
  cookieStorage: "cookieStorage",
  // localStorage, sessionStorage, customStorage
  cookieCustomStorageGet: null,
  cookieCustomStorageSet: null,
  cookieCustomStorageDelete: null,
  // internal variable
  _filterControls: [],
  _filterControlValuesLoaded: false,
  _storage: {
    setItem: void 0,
    getItem: void 0,
    removeItem: void 0
  }
});
$.fn.bootstrapTable.methods.push("getCookies");
$.fn.bootstrapTable.methods.push("deleteCookie");
Object.assign($.fn.bootstrapTable.utils, {
  setCookie: UtilsCookie.setCookie,
  getCookie: UtilsCookie.getCookie
});
$.BootstrapTable = class extends $.BootstrapTable {
  init() {
    if (this.options.cookie) {
      if (this.options.cookieStorage === "cookieStorage" && !UtilsCookie.isCookieSupportedByBrowser()) {
        throw new Error("Cookies are not enabled in this browser.");
      }
      this.configureStorage();
      const filterByCookieValue = UtilsCookie.getCookie(this, UtilsCookie.cookieIds.filterBy);
      if (typeof filterByCookieValue === "boolean" && !filterByCookieValue) {
        throw new Error("The cookie value of filterBy must be a json!");
      }
      let filterByCookie = {};
      try {
        filterByCookie = JSON.parse(filterByCookieValue);
      } catch (e) {
        throw new Error("Could not parse the json of the filterBy cookie!");
      }
      this.filterColumns = filterByCookie ? filterByCookie : {};
      this._filterControls = [];
      this._filterControlValuesLoaded = false;
      this.options.cookiesEnabled = typeof this.options.cookiesEnabled === "string" ? this.options.cookiesEnabled.replace("[", "").replace("]", "").replace(/'/g, "").replace(/ /g, "").split(",") : this.options.cookiesEnabled;
      if (this.options.filterControl) {
        const that = this;
        this.$el.on("column-search.bs.table", (e, field, text) => {
          let isNewField = true;
          for (let i = 0; i < that._filterControls.length; i++) {
            if (that._filterControls[i].field === field) {
              that._filterControls[i].text = text;
              isNewField = false;
              break;
            }
          }
          if (isNewField) {
            that._filterControls.push({
              field,
              text
            });
          }
          UtilsCookie.setCookie(that, UtilsCookie.cookieIds.filterControl, JSON.stringify(that._filterControls));
        }).on("created-controls.bs.table", UtilsCookie.initCookieFilters(that));
      }
    }
    super.init();
  }
  initServer(...args) {
    if (this.options.cookie && this.options.filterControl && !this._filterControlValuesLoaded) {
      const cookie = JSON.parse(UtilsCookie.getCookie(this, UtilsCookie.cookieIds.filterControl));
      if (cookie) {
        return;
      }
    }
    super.initServer(...args);
  }
  initTable(...args) {
    super.initTable(...args);
    this.initCookie();
  }
  onSort(...args) {
    super.onSort(...args);
    if (!this.options.cookie) {
      return;
    }
    if (this.options.sortName === void 0 || this.options.sortOrder === void 0) {
      UtilsCookie.deleteCookie(this, UtilsCookie.cookieIds.sortName);
      UtilsCookie.deleteCookie(this, UtilsCookie.cookieIds.sortOrder);
    } else {
      this.options.sortPriority = null;
      UtilsCookie.deleteCookie(this, UtilsCookie.cookieIds.sortPriority);
      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.sortOrder, this.options.sortOrder);
      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.sortName, this.options.sortName);
    }
  }
  onMultipleSort(...args) {
    super.onMultipleSort(...args);
    if (!this.options.cookie) {
      return;
    }
    if (this.options.sortPriority === void 0) {
      UtilsCookie.deleteCookie(this, UtilsCookie.cookieIds.sortPriority);
    } else {
      this.options.sortName = void 0;
      this.options.sortOrder = void 0;
      UtilsCookie.deleteCookie(this, UtilsCookie.cookieIds.sortName);
      UtilsCookie.deleteCookie(this, UtilsCookie.cookieIds.sortOrder);
      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.sortPriority, JSON.stringify(this.options.sortPriority));
    }
  }
  onPageNumber(...args) {
    super.onPageNumber(...args);
    if (!this.options.cookie) {
      return;
    }
    UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, this.options.pageNumber);
  }
  onPageListChange(...args) {
    super.onPageListChange(...args);
    if (!this.options.cookie) {
      return;
    }
    UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageList, this.options.pageSize);
    UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, this.options.pageNumber);
  }
  onPagePre(...args) {
    super.onPagePre(...args);
    if (!this.options.cookie) {
      return;
    }
    UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, this.options.pageNumber);
  }
  onPageNext(...args) {
    super.onPageNext(...args);
    if (!this.options.cookie) {
      return;
    }
    UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, this.options.pageNumber);
  }
  _toggleColumn(...args) {
    super._toggleColumn(...args);
    if (!this.options.cookie) {
      return;
    }
    UtilsCookie.setCookie(this, UtilsCookie.cookieIds.hiddenColumns, JSON.stringify(this.getHiddenColumns().map((column) => column.field)));
  }
  _toggleAllColumns(...args) {
    super._toggleAllColumns(...args);
    if (!this.options.cookie) {
      return;
    }
    UtilsCookie.setCookie(this, UtilsCookie.cookieIds.hiddenColumns, JSON.stringify(this.getHiddenColumns().map((column) => column.field)));
  }
  toggleView() {
    super.toggleView();
    UtilsCookie.setCookie(this, UtilsCookie.cookieIds.cardView, this.options.cardView);
  }
  selectPage(page) {
    super.selectPage(page);
    if (!this.options.cookie) {
      return;
    }
    UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, page);
  }
  onSearch(event) {
    super.onSearch(event, arguments.length > 1 ? arguments[1] : true);
    if (!this.options.cookie) {
      return;
    }
    if (this.options.search) {
      UtilsCookie.setCookie(this, UtilsCookie.cookieIds.searchText, this.searchText);
    }
    UtilsCookie.setCookie(this, UtilsCookie.cookieIds.pageNumber, this.options.pageNumber);
  }
  initHeader(...args) {
    if (this.options.reorderableColumns && this.options.cookie) {
      this.columnsSortOrder = JSON.parse(UtilsCookie.getCookie(this, UtilsCookie.cookieIds.reorderColumns));
    }
    super.initHeader(...args);
  }
  persistReorderColumnsState(that) {
    UtilsCookie.setCookie(that, UtilsCookie.cookieIds.reorderColumns, JSON.stringify(that.columnsSortOrder));
  }
  filterBy(...args) {
    super.filterBy(...args);
    if (!this.options.cookie) {
      return;
    }
    UtilsCookie.setCookie(this, UtilsCookie.cookieIds.filterBy, JSON.stringify(this.filterColumns));
  }
  initCookie() {
    if (!this.options.cookie) {
      return;
    }
    if (this.options.cookieIdTable === "" || this.options.cookieExpire === "") {
      console.error("Configuration error. Please review the cookieIdTable and the cookieExpire property. If the properties are correct, then this browser does not support cookies.");
      this.options.cookie = false;
      return;
    }
    const sortOrderCookie = UtilsCookie.getCookie(this, UtilsCookie.cookieIds.sortOrder);
    const sortOrderNameCookie = UtilsCookie.getCookie(this, UtilsCookie.cookieIds.sortName);
    let sortPriorityCookie = UtilsCookie.getCookie(this, UtilsCookie.cookieIds.sortPriority);
    const pageNumberCookie = UtilsCookie.getCookie(this, UtilsCookie.cookieIds.pageNumber);
    const pageListCookie = UtilsCookie.getCookie(this, UtilsCookie.cookieIds.pageList);
    const searchTextCookie = UtilsCookie.getCookie(this, UtilsCookie.cookieIds.searchText);
    const cardViewCookie = UtilsCookie.getCookie(this, UtilsCookie.cookieIds.cardView);
    const columnsCookieValue = UtilsCookie.getCookie(this, UtilsCookie.cookieIds.columns);
    const hiddenColumnsCookieValue = UtilsCookie.getCookie(this, UtilsCookie.cookieIds.hiddenColumns);
    if (typeof columnsCookieValue === "boolean" && !columnsCookieValue) {
      throw new Error("The cookie value of filterBy must be a json!");
    }
    let columnsCookie = {};
    try {
      columnsCookie = JSON.parse(columnsCookieValue);
    } catch (e) {
      throw new Error("Could not parse the json of the columns cookie!", columnsCookieValue);
    }
    let hiddenColumnsCookie = {};
    try {
      hiddenColumnsCookie = JSON.parse(hiddenColumnsCookieValue);
    } catch (e) {
      throw new Error("Could not parse the json of the hidden columns cookie!", hiddenColumnsCookieValue);
    }
    try {
      sortPriorityCookie = JSON.parse(sortPriorityCookie);
    } catch (e) {
      throw new Error("Could not parse the json of the sortPriority cookie!", sortPriorityCookie);
    }
    if (!sortPriorityCookie) {
      this.options.sortOrder = sortOrderCookie ? sortOrderCookie : this.options.sortOrder;
      this.options.sortName = sortOrderNameCookie ? sortOrderNameCookie : this.options.sortName;
    } else {
      this.options.sortOrder = void 0;
      this.options.sortName = void 0;
    }
    this.options.sortPriority = sortPriorityCookie ? sortPriorityCookie : this.options.sortPriority;
    if (this.options.sortOrder || this.options.sortName) {
      this.options.sortPriority = null;
    }
    this.options.pageNumber = pageNumberCookie ? +pageNumberCookie : this.options.pageNumber;
    this.options.pageSize = pageListCookie ? pageListCookie === this.options.formatAllRows() ? pageListCookie : +pageListCookie : this.options.pageSize;
    if (UtilsCookie.isCookieEnabled(this, UtilsCookie.cookieIds.searchText) && this.options.searchText === "") {
      this.options.searchText = searchTextCookie ? searchTextCookie : "";
    }
    this.options.cardView = cardViewCookie === "true" ? cardViewCookie : false;
    if (hiddenColumnsCookie) {
      for (const column of this.columns) {
        column.visible = !hiddenColumnsCookie.filter((columnField) => {
          if (this.isSelectionColumn(column)) {
            return false;
          }
          return columnField === column.field;
        }).length > 0 || !column.switchable;
      }
    } else if (columnsCookie) {
      for (const column of this.columns) {
        if (!column.switchable) {
          continue;
        }
        column.visible = columnsCookie.filter((columnField) => {
          if (this.isSelectionColumn(column)) {
            return true;
          }
          if (columnField instanceof Object) {
            return columnField.field === column.field;
          }
          return columnField === column.field;
        }).length > 0;
      }
    }
  }
  getCookies() {
    const bootstrapTable = this;
    const cookies = {};
    $.each(UtilsCookie.cookieIds, (key, value) => {
      cookies[key] = UtilsCookie.getCookie(bootstrapTable, value);
      if (key === "columns" || key === "hiddenColumns" || key === "sortPriority") {
        cookies[key] = JSON.parse(cookies[key]);
      }
    });
    return cookies;
  }
  deleteCookie(cookieName) {
    if (!cookieName) {
      return;
    }
    UtilsCookie.deleteCookie(this, UtilsCookie.cookieIds[cookieName]);
  }
  configureStorage() {
    const that = this;
    this._storage = {};
    switch (this.options.cookieStorage) {
      case "cookieStorage":
        this._storage.setItem = function(cookieName, cookieValue) {
          document.cookie = [
            cookieName,
            "=",
            encodeURIComponent(cookieValue),
            `; expires=${UtilsCookie.calculateExpiration(that.options.cookieExpire)}`,
            that.options.cookiePath ? `; path=${that.options.cookiePath}` : "",
            that.options.cookieDomain ? `; domain=${that.options.cookieDomain}` : "",
            that.options.cookieSecure ? "; secure" : "",
            `;SameSite=${that.options.cookieSameSite}`
          ].join("");
        };
        this._storage.getItem = function(cookieName) {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${cookieName}=`);
          return parts.length === 2 ? decodeURIComponent(parts.pop().split(";").shift()) : null;
        };
        this._storage.removeItem = function(cookieName) {
          document.cookie = [
            encodeURIComponent(cookieName),
            "=",
            "; expires=Thu, 01 Jan 1970 00:00:00 GMT",
            that.options.cookiePath ? `; path=${that.options.cookiePath}` : "",
            that.options.cookieDomain ? `; domain=${that.options.cookieDomain}` : "",
            `;SameSite=${that.options.cookieSameSite}`
          ].join("");
        };
        break;
      case "localStorage":
        this._storage.setItem = function(cookieName, cookieValue) {
          localStorage.setItem(cookieName, cookieValue);
        };
        this._storage.getItem = function(cookieName) {
          return localStorage.getItem(cookieName);
        };
        this._storage.removeItem = function(cookieName) {
          localStorage.removeItem(cookieName);
        };
        break;
      case "sessionStorage":
        this._storage.setItem = function(cookieName, cookieValue) {
          sessionStorage.setItem(cookieName, cookieValue);
        };
        this._storage.getItem = function(cookieName) {
          return sessionStorage.getItem(cookieName);
        };
        this._storage.removeItem = function(cookieName) {
          sessionStorage.removeItem(cookieName);
        };
        break;
      case "customStorage":
        if (!this.options.cookieCustomStorageSet || !this.options.cookieCustomStorageGet || !this.options.cookieCustomStorageDelete) {
          throw new Error("The following options must be set while using the customStorage: cookieCustomStorageSet, cookieCustomStorageGet and cookieCustomStorageDelete");
        }
        this._storage.setItem = function(cookieName, cookieValue) {
          Utils4.calculateObjectValue(that.options, that.options.cookieCustomStorageSet, [cookieName, cookieValue], "");
        };
        this._storage.getItem = function(cookieName) {
          return Utils4.calculateObjectValue(that.options, that.options.cookieCustomStorageGet, [cookieName], "");
        };
        this._storage.removeItem = function(cookieName) {
          Utils4.calculateObjectValue(that.options, that.options.cookieCustomStorageDelete, [cookieName], "");
        };
        break;
      default:
        throw new Error("Storage method not supported.");
    }
  }
};

// node_modules/bootstrap-table/src/extensions/fixed-columns/bootstrap-table-fixed-columns.js
var Utils5 = $.fn.bootstrapTable.utils;
var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;
function normalizeWheel(event) {
  let sX = 0;
  let sY = 0;
  let pX = 0;
  let pY = 0;
  if ("detail" in event) {
    sY = event.detail;
  }
  if ("wheelDelta" in event) {
    sY = -event.wheelDelta / 120;
  }
  if ("wheelDeltaY" in event) {
    sY = -event.wheelDeltaY / 120;
  }
  if ("wheelDeltaX" in event) {
    sX = -event.wheelDeltaX / 120;
  }
  if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }
  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;
  if ("deltaY" in event) {
    pY = event.deltaY;
  }
  if ("deltaX" in event) {
    pX = event.deltaX;
  }
  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode === 1) {
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }
  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1;
  }
  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1;
  }
  return {
    spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY
  };
}
Object.assign($.fn.bootstrapTable.defaults, {
  fixedColumns: false,
  fixedNumber: 0,
  fixedRightNumber: 0
});
$.BootstrapTable = class extends $.BootstrapTable {
  fixedColumnsSupported() {
    return this.options.fixedColumns && !this.options.detailView && !this.options.cardView;
  }
  initContainer() {
    super.initContainer();
    if (!this.fixedColumnsSupported()) {
      return;
    }
    if (this.options.fixedNumber) {
      this.$tableContainer.append('<div class="fixed-columns"></div>');
      this.$fixedColumns = this.$tableContainer.find(".fixed-columns");
    }
    if (this.options.fixedRightNumber) {
      this.$tableContainer.append('<div class="fixed-columns-right"></div>');
      this.$fixedColumnsRight = this.$tableContainer.find(".fixed-columns-right");
    }
  }
  initBody(...args) {
    super.initBody(...args);
    if (this.$fixedColumns && this.$fixedColumns.length) {
      this.$fixedColumns.toggle(this.fixedColumnsSupported());
    }
    if (this.$fixedColumnsRight && this.$fixedColumnsRight.length) {
      this.$fixedColumnsRight.toggle(this.fixedColumnsSupported());
    }
    if (!this.fixedColumnsSupported()) {
      return;
    }
    if (this.options.showHeader && this.options.height) {
      return;
    }
    this.initFixedColumnsBody();
    this.initFixedColumnsEvents();
  }
  trigger(...args) {
    super.trigger(...args);
    if (!this.fixedColumnsSupported()) {
      return;
    }
    if (args[0] === "post-header") {
      this.initFixedColumnsHeader();
    } else if (args[0] === "scroll-body") {
      if (this.needFixedColumns && this.options.fixedNumber) {
        this.$fixedBody.scrollTop(this.$tableBody.scrollTop());
      }
      if (this.needFixedColumns && this.options.fixedRightNumber) {
        this.$fixedBodyRight.scrollTop(this.$tableBody.scrollTop());
      }
    }
  }
  updateSelected() {
    super.updateSelected();
    if (!this.fixedColumnsSupported()) {
      return;
    }
    this.$tableBody.find("tr").each((i, el) => {
      const $el = $(el);
      const index = $el.data("index");
      const classes = $el.attr("class");
      const inputSelector = `[name="${this.options.selectItemName}"]`;
      const $input = $el.find(inputSelector);
      if (typeof index === "undefined") {
        return;
      }
      const updateFixedBody = ($fixedHeader, $fixedBody) => {
        const $tr = $fixedBody.find(`tr[data-index="${index}"]`);
        $tr.attr("class", classes);
        if ($input.length) {
          $tr.find(inputSelector).prop("checked", $input.prop("checked"));
        }
        if (this.$selectAll.length) {
          $fixedHeader.add($fixedBody).find('[name="btSelectAll"]').prop("checked", this.$selectAll.prop("checked"));
        }
      };
      if (this.$fixedBody && this.options.fixedNumber) {
        updateFixedBody(this.$fixedHeader, this.$fixedBody);
      }
      if (this.$fixedBodyRight && this.options.fixedRightNumber) {
        updateFixedBody(this.$fixedHeaderRight, this.$fixedBodyRight);
      }
    });
  }
  hideLoading() {
    super.hideLoading();
    if (this.needFixedColumns && this.options.fixedNumber) {
      this.$fixedColumns.find(".fixed-table-loading").hide();
    }
    if (this.needFixedColumns && this.options.fixedRightNumber) {
      this.$fixedColumnsRight.find(".fixed-table-loading").hide();
    }
  }
  initFixedColumnsHeader() {
    if (this.options.height) {
      this.needFixedColumns = this.$tableHeader.outerWidth(true) < this.$tableHeader.find("table").outerWidth(true);
    } else {
      this.needFixedColumns = this.$tableBody.outerWidth(true) < this.$tableBody.find("table").outerWidth(true);
    }
    const initFixedHeader = ($fixedColumns, isRight) => {
      $fixedColumns.find(".fixed-table-header").remove();
      $fixedColumns.append(this.$tableHeader.clone(true));
      $fixedColumns.css({
        width: this.getFixedColumnsWidth(isRight)
      });
      return $fixedColumns.find(".fixed-table-header");
    };
    if (this.needFixedColumns && this.options.fixedNumber) {
      this.$fixedHeader = initFixedHeader(this.$fixedColumns);
      this.$fixedHeader.css("margin-right", "");
    } else if (this.$fixedColumns) {
      this.$fixedColumns.html("").css("width", "");
    }
    if (this.needFixedColumns && this.options.fixedRightNumber) {
      this.$fixedHeaderRight = initFixedHeader(this.$fixedColumnsRight, true);
      this.$fixedHeaderRight.scrollLeft(this.$fixedHeaderRight.find("table").width());
    } else if (this.$fixedColumnsRight) {
      this.$fixedColumnsRight.html("").css("width", "");
    }
    this.initFixedColumnsBody();
    this.initFixedColumnsEvents();
  }
  initFixedColumnsBody() {
    const initFixedBody = ($fixedColumns, $fixedHeader) => {
      $fixedColumns.find(".fixed-table-body").remove();
      $fixedColumns.append(this.$tableBody.clone(true));
      $fixedColumns.find(".fixed-table-body table").removeAttr("id");
      const $fixedBody = $fixedColumns.find(".fixed-table-body");
      const tableBody = this.$tableBody.get(0);
      const scrollHeight = tableBody.scrollWidth > tableBody.clientWidth ? Utils5.getScrollBarWidth() : 0;
      const height = this.$tableContainer.outerHeight(true) - scrollHeight - 1;
      $fixedColumns.css({
        height
      });
      $fixedBody.css({
        height: height - $fixedHeader.height()
      });
      return $fixedBody;
    };
    if (this.needFixedColumns && this.options.fixedNumber) {
      this.$fixedBody = initFixedBody(this.$fixedColumns, this.$fixedHeader);
    }
    if (this.needFixedColumns && this.options.fixedRightNumber) {
      this.$fixedBodyRight = initFixedBody(this.$fixedColumnsRight, this.$fixedHeaderRight);
      this.$fixedBodyRight.scrollLeft(this.$fixedBodyRight.find("table").width());
      this.$fixedBodyRight.css("overflow-y", this.options.height ? "auto" : "hidden");
    }
  }
  getFixedColumnsWidth(isRight) {
    let visibleFields = this.getVisibleFields();
    let width = 0;
    let fixedNumber = this.options.fixedNumber;
    let marginRight = 0;
    if (isRight) {
      visibleFields = visibleFields.reverse();
      fixedNumber = this.options.fixedRightNumber;
      marginRight = parseInt(this.$tableHeader.css("margin-right"), 10);
    }
    for (let i = 0; i < fixedNumber; i++) {
      width += this.$header.find(`th[data-field="${visibleFields[i]}"]`).outerWidth(true);
    }
    return width + marginRight + 1;
  }
  initFixedColumnsEvents() {
    const toggleHover = (e, toggle) => {
      const tr = `tr[data-index="${$(e.currentTarget).data("index")}"]`;
      let $trs = this.$tableBody.find(tr);
      if (this.$fixedBody) {
        $trs = $trs.add(this.$fixedBody.find(tr));
      }
      if (this.$fixedBodyRight) {
        $trs = $trs.add(this.$fixedBodyRight.find(tr));
      }
      $trs.css("background-color", toggle ? $(e.currentTarget).css("background-color") : "");
    };
    this.$tableBody.find("tr").hover((e) => {
      toggleHover(e, true);
    }, (e) => {
      toggleHover(e, false);
    });
    const isFirefox = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    const mousewheel = isFirefox ? "DOMMouseScroll" : "mousewheel";
    const updateScroll = (e, fixedBody) => {
      const normalized = normalizeWheel(e);
      const deltaY = Math.ceil(normalized.pixelY);
      const top = this.$tableBody.scrollTop() + deltaY;
      if (deltaY < 0 && top > 0 || deltaY > 0 && top < fixedBody.scrollHeight - fixedBody.clientHeight) {
        e.preventDefault();
      }
      this.$tableBody.scrollTop(top);
      if (this.$fixedBody) {
        this.$fixedBody.scrollTop(top);
      }
      if (this.$fixedBodyRight) {
        this.$fixedBodyRight.scrollTop(top);
      }
    };
    if (this.needFixedColumns && this.options.fixedNumber) {
      this.$fixedBody.find("tr").hover((e) => {
        toggleHover(e, true);
      }, (e) => {
        toggleHover(e, false);
      });
      this.$fixedBody[0].addEventListener(mousewheel, (e) => {
        updateScroll(e, this.$fixedBody[0]);
      });
    }
    if (this.needFixedColumns && this.options.fixedRightNumber) {
      this.$fixedBodyRight.find("tr").hover((e) => {
        toggleHover(e, true);
      }, (e) => {
        toggleHover(e, false);
      });
      this.$fixedBodyRight.off("scroll").on("scroll", () => {
        const top = this.$fixedBodyRight.scrollTop();
        this.$tableBody.scrollTop(top);
        if (this.$fixedBody) {
          this.$fixedBody.scrollTop(top);
        }
      });
    }
    if (this.options.filterControl) {
      $(this.$fixedColumns).off("keyup change").on("keyup change", (e) => {
        const $target = $(e.target);
        const value = $target.val();
        const field = $target.parents("th").data("field");
        const $coreTh = this.$header.find(`th[data-field="${field}"]`);
        if ($target.is("input")) {
          $coreTh.find("input").val(value);
        } else if ($target.is("select")) {
          const $select = $coreTh.find("select");
          $select.find("option[selected]").removeAttr("selected");
          $select.find(`option[value="${value}"]`).attr("selected", true);
        }
        this.triggerSearch();
      });
    }
  }
  renderStickyHeader() {
    if (!this.options.stickyHeader) {
      return;
    }
    this.$stickyContainer = this.$container.find(".sticky-header-container");
    super.renderStickyHeader();
    if (this.needFixedColumns && this.options.fixedNumber) {
      this.$fixedColumns.css("z-index", 101).find(".sticky-header-container").css("right", "").width(this.$fixedColumns.outerWidth());
    }
    if (this.needFixedColumns && this.options.fixedRightNumber) {
      const $stickyHeaderContainerRight = this.$fixedColumnsRight.find(".sticky-header-container");
      this.$fixedColumnsRight.css("z-index", 101);
      $stickyHeaderContainerRight.css("left", "").scrollLeft($stickyHeaderContainerRight.find(".table").outerWidth()).width(this.$fixedColumnsRight.outerWidth());
    }
  }
  matchPositionX() {
    if (!this.options.stickyHeader) {
      return;
    }
    this.$stickyContainer.eq(0).scrollLeft(this.$tableBody.scrollLeft());
  }
};

// node_modules/bootstrap-table/src/extensions/addrbar/bootstrap-table-addrbar.js
function _GET(key, url = window.location.search) {
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
  const result = url.substr(1).match(reg);
  if (result) {
    return decodeURIComponent(result[2]);
  }
  return null;
}
function _buildUrl(dict, url = window.location.search) {
  for (const [key, val] of Object.entries(dict)) {
    const pattern = `${key}=([^&]*)`;
    const targetStr = `${key}=${val}`;
    if (val === void 0)
      continue;
    if (url.match(pattern)) {
      const tmp = new RegExp(`(${key}=)([^&]*)`, "gi");
      url = url.replace(tmp, targetStr);
    } else {
      const seperator = url.match("[?]") ? "&" : "?";
      url = url + seperator + targetStr;
    }
  }
  if (location.hash) {
    url += location.hash;
  }
  return url;
}
function _updateHistoryState(table, _prefix) {
  const params = {};
  params[`${_prefix}page`] = table.options.pageNumber;
  params[`${_prefix}size`] = table.options.pageSize;
  params[`${_prefix}order`] = table.options.sortOrder;
  params[`${_prefix}sort`] = table.options.sortName;
  params[`${_prefix}search`] = table.options.searchText;
  window.history.pushState({}, "", _buildUrl(params));
}
Object.assign($.fn.bootstrapTable.defaults, {
  addrbar: false,
  addrPrefix: ""
});
$.BootstrapTable = class extends $.BootstrapTable {
  init(...args) {
    if (this.options.pagination && this.options.addrbar) {
      this.addrbarInit = true;
      this.options.pageNumber = +this.getDefaultOptionValue("pageNumber", "page");
      this.options.pageSize = +this.getDefaultOptionValue("pageSize", "size");
      this.options.sortOrder = this.getDefaultOptionValue("sortOrder", "order");
      this.options.sortName = this.getDefaultOptionValue("sortName", "sort");
      this.options.searchText = this.getDefaultOptionValue("searchText", "search");
      const _prefix = this.options.addrPrefix || "";
      const _onLoadSuccess = this.options.onLoadSuccess;
      const _onPageChange = this.options.onPageChange;
      this.options.onLoadSuccess = (data) => {
        if (this.addrbarInit) {
          this.addrbarInit = false;
        } else {
          _updateHistoryState(this, _prefix);
        }
        if (_onLoadSuccess) {
          _onLoadSuccess.call(this, data);
        }
      };
      this.options.onPageChange = (number, size) => {
        _updateHistoryState(this, _prefix);
        if (_onPageChange) {
          _onPageChange.call(this, number, size);
        }
      };
    }
    super.init(...args);
  }
  resetSearch(text) {
    super.resetSearch(text);
    this.options.searchText = text || "";
  }
  /*
   * Priority order:
   * The value specified by the user has the highest priority.
   * If it is not specified, it will be obtained from the address bar.
   * If it is not obtained, the default value will be used.
   */
  getDefaultOptionValue(optionName, prefixName) {
    if (this.options[optionName] !== $.BootstrapTable.DEFAULTS[optionName]) {
      return this.options[optionName];
    }
    return _GET(`${this.options.addrPrefix || ""}${prefixName}`) || $.BootstrapTable.DEFAULTS[optionName];
  }
};

// node_modules/bootstrap-table/src/extensions/pipeline/bootstrap-table-pipeline.js
var Utils6 = $.fn.bootstrapTable.utils;
Object.assign($.fn.bootstrapTable.defaults, {
  usePipeline: false,
  pipelineSize: 1e3,
  // eslint-disable-next-line no-unused-vars
  onCachedDataHit(data) {
    return false;
  },
  // eslint-disable-next-line no-unused-vars
  onCachedDataReset(data) {
    return false;
  }
});
Object.assign($.fn.bootstrapTable.events, {
  "cached-data-hit.bs.table": "onCachedDataHit",
  "cached-data-reset.bs.table": "onCachedDataReset"
});
var BootstrapTable3 = $.fn.bootstrapTable.Constructor;
var _init = BootstrapTable3.prototype.init;
var _onSearch = BootstrapTable3.prototype.onSearch;
var _onSort = BootstrapTable3.prototype.onSort;
var _onPageListChange = BootstrapTable3.prototype.onPageListChange;
BootstrapTable3.prototype.init = function(...args) {
  this.initPipeline();
  _init.apply(this, Array.prototype.slice.apply(args));
};
BootstrapTable3.prototype.initPipeline = function() {
  this.cacheRequestJSON = {};
  this.cacheWindows = [];
  this.currWindow = 0;
  this.resetCache = true;
};
BootstrapTable3.prototype.onSearch = function() {
  if (this.options.usePipeline) {
    this.resetCache = true;
  }
  _onSearch.apply(this, Array.prototype.slice.apply(arguments));
};
BootstrapTable3.prototype.onSort = function() {
  if (this.options.usePipeline) {
    this.resetCache = true;
  }
  _onSort.apply(this, Array.prototype.slice.apply(arguments));
};
BootstrapTable3.prototype.onPageListChange = function(event) {
  const target = $(event.currentTarget);
  const newPageSize = parseInt(target.text(), 10);
  this.options.pipelineSize = this.calculatePipelineSize(this.options.pipelineSize, newPageSize);
  this.resetCache = true;
  _onPageListChange.apply(this, Array.prototype.slice.apply(arguments));
};
BootstrapTable3.prototype.calculatePipelineSize = (pipelineSize, pageSize) => {
  if (pageSize === 0)
    return 0;
  return Math.ceil(pipelineSize / pageSize) * pageSize;
};
BootstrapTable3.prototype.setCacheWindows = function() {
  this.cacheWindows = [];
  const numWindows = this.options.totalRows / this.options.pipelineSize;
  for (let i = 0; i <= numWindows; i++) {
    const b = i * this.options.pipelineSize;
    this.cacheWindows[i] = { lower: b, upper: b + this.options.pipelineSize - 1 };
  }
};
BootstrapTable3.prototype.setCurrWindow = function(offset) {
  this.currWindow = 0;
  for (let i = 0; i < this.cacheWindows.length; i++) {
    if (this.cacheWindows[i].lower <= offset && offset <= this.cacheWindows[i].upper) {
      this.currWindow = i;
      break;
    }
  }
};
BootstrapTable3.prototype.drawFromCache = function(offset, limit) {
  const res = Utils6.extend(true, {}, this.cacheRequestJSON);
  const drawStart = offset - this.cacheWindows[this.currWindow].lower;
  const drawEnd = drawStart + limit;
  res.rows = res.rows.slice(drawStart, drawEnd);
  return res;
};
BootstrapTable3.prototype.initServer = function(silent, query, url) {
  let data = {};
  const index = this.header.fields.indexOf(this.options.sortName);
  let params = {
    searchText: this.searchText,
    sortName: this.options.sortName,
    sortOrder: this.options.sortOrder
  };
  let request = null;
  if (this.header.sortNames[index]) {
    params.sortName = this.header.sortNames[index];
  }
  if (this.options.pagination && this.options.sidePagination === "server") {
    params.pageSize = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;
    params.pageNumber = this.options.pageNumber;
  }
  if (!(url || this.options.url) && !this.options.ajax) {
    return;
  }
  let useAjax = true;
  if (this.options.queryParamsType === "limit") {
    params = {
      searchText: params.searchText,
      sortName: params.sortName,
      sortOrder: params.sortOrder
    };
    if (this.options.pagination && this.options.sidePagination === "server") {
      params.limit = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;
      params.offset = (this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize) * (this.options.pageNumber - 1);
      if (this.options.usePipeline) {
        if (!this.cacheWindows.length) {
          useAjax = true;
          params.drawOffset = params.offset;
        } else {
          const w = this.cacheWindows[this.currWindow];
          if (this.resetCache || (params.offset < w.lower || params.offset > w.upper)) {
            useAjax = true;
            this.setCurrWindow(params.offset);
            params.drawOffset = params.offset;
            params.offset = this.cacheWindows[this.currWindow].lower;
          } else {
            useAjax = false;
          }
        }
      } else if (params.limit === 0) {
        delete params.limit;
      }
    }
  }
  if (this.resetCache) {
    useAjax = true;
    this.resetCache = false;
  }
  if (this.options.usePipeline && useAjax) {
    params.drawLimit = params.limit;
    params.limit = this.options.pipelineSize;
  }
  if (!useAjax) {
    const res = this.drawFromCache(params.offset, params.limit);
    this.load(res);
    this.trigger("load-success", res);
    this.trigger("cached-data-hit", res);
    return;
  }
  if (!$.isEmptyObject(this.filterColumnsPartial)) {
    params.filter = JSON.stringify(this.filterColumnsPartial, null);
  }
  data = Utils6.calculateObjectValue(this.options, this.options.queryParams, [params], data);
  Utils6.extend(data, query || {});
  if (data === false) {
    return;
  }
  if (!silent) {
    this.$tableLoading.show();
  }
  const self = this;
  request = Utils6.extend({}, Utils6.calculateObjectValue(null, this.options.ajaxOptions), {
    type: this.options.method,
    url: url || this.options.url,
    data: this.options.contentType === "application/json" && this.options.method === "post" ? JSON.stringify(data) : data,
    cache: this.options.cache,
    contentType: this.options.contentType,
    dataType: this.options.dataType,
    success(res) {
      res = Utils6.calculateObjectValue(self.options, self.options.responseHandler, [res], res);
      if (self.options.usePipeline) {
        self.cacheRequestJSON = Utils6.extend(true, {}, res);
        self.options.totalRows = res[self.options.totalField];
        self.setCacheWindows();
        self.setCurrWindow(params.drawOffset);
        res = self.drawFromCache(params.drawOffset, params.drawLimit);
        self.trigger("cached-data-reset", res);
      }
      self.load(res);
      self.trigger("load-success", res);
      if (!silent) {
        self.hideLoading();
      }
    },
    error(res) {
      let data2 = [];
      if (self.options.sidePagination === "server") {
        data2 = {};
        data2[self.options.totalField] = 0;
        data2[self.options.dataField] = [];
      }
      self.load(data2);
      self.trigger("load-error", res.status, res);
      if (!silent) {
        self.hideLoading();
      }
    }
  });
  if (this.options.ajax) {
    Utils6.calculateObjectValue(this, this.options.ajax, [request], null);
  } else {
    if (this._xhr && this._xhr.readyState !== 4) {
      this._xhr.abort();
    }
    this._xhr = $.ajax(request);
  }
};

// node_modules/bootstrap-table/src/locale/bootstrap-table-es-CL.js
$.fn.bootstrapTable.locales["es-CL"] = {
  formatCopyRows() {
    return "Copiar Filas";
  },
  formatPrint() {
    return "Imprimir";
  },
  formatLoadingMessage() {
    return "Cargando, espere por favor";
  },
  formatRecordsPerPage(pageNumber) {
    return `${pageNumber} filas por p\xE1gina`;
  },
  formatShowingRows(pageFrom, pageTo, totalRows, totalNotFiltered) {
    if (totalNotFiltered !== void 0 && totalNotFiltered > 0 && totalNotFiltered > totalRows) {
      return `Mostrando ${pageFrom} a ${pageTo} de ${totalRows} filas (filtrado de ${totalNotFiltered} filas totales)`;
    }
    return `Mostrando ${pageFrom} a ${pageTo} de ${totalRows} filas`;
  },
  formatSRPaginationPreText() {
    return "p\xE1gina anterior";
  },
  formatSRPaginationPageText(page) {
    return `a la p\xE1gina ${page}`;
  },
  formatSRPaginationNextText() {
    return "siguiente p\xE1gina";
  },
  formatDetailPagination(totalRows) {
    return `Mostrando ${totalRows} filas`;
  },
  formatClearSearch() {
    return "Limpiar b\xFAsqueda";
  },
  formatSearch() {
    return "Buscar";
  },
  formatNoMatches() {
    return "No se encontraron registros";
  },
  formatPaginationSwitch() {
    return "Ocultar/Mostrar paginaci\xF3n";
  },
  formatPaginationSwitchDown() {
    return "Mostrar paginaci\xF3n";
  },
  formatPaginationSwitchUp() {
    return "Ocultar paginaci\xF3n";
  },
  formatRefresh() {
    return "Refrescar";
  },
  formatToggleOn() {
    return "Mostrar vista de carta";
  },
  formatToggleOff() {
    return "Ocultar vista de carta";
  },
  formatColumns() {
    return "Columnas";
  },
  formatColumnsToggleAll() {
    return "Cambiar todo";
  },
  formatFullscreen() {
    return "Pantalla completa";
  },
  formatAllRows() {
    return "Todo";
  },
  formatAutoRefresh() {
    return "Auto Recargar";
  },
  formatExport() {
    return "Exportar datos";
  },
  formatJumpTo() {
    return "IR";
  },
  formatAdvancedSearch() {
    return "B\xFAsqueda avanzada";
  },
  formatAdvancedCloseButton() {
    return "Cerrar";
  },
  formatFilterControlSwitch() {
    return "Ocultar/Mostrar controles";
  },
  formatFilterControlSwitchHide() {
    return "Ocultar controles";
  },
  formatFilterControlSwitchShow() {
    return "Mostrar controles";
  }
};
Object.assign($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales["es-CL"]);

// resources/js/plugins/bs_table.ts
var $2 = globalThis.jQuery;
var jQuery2 = globalThis.jQuery;
if (!window)
  window = globalThis;
$2.fn.bootstrapTable.locales["es-CL"].formatRecordsPerPage = (pageNumber) => {
  return `${pageNumber} <span>por p\xE1gina</span>`;
};
$2.fn.bootstrapTable.locales["es-CL"].formatShowingRows = (pageFrom, pageTo, totalRows, totalNotFiltered) => {
  return `Filas ${pageFrom} a ${pageTo} de ${totalRows}`;
};
var bs_table_default = bootstrap_table_default2;
if (typeof module.exports == "object" && typeof exports == "object") {
  var __cp = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of Object.getOwnPropertyNames(from)) {
        if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
        Object.defineProperty(to, key, {
          get: () => from[key],
          enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
        });
      }
    }
    return to;
  };
  module.exports = __cp(module.exports, exports);
}
return module.exports;
}))
//# sourceMappingURL=bs_table.js.map
