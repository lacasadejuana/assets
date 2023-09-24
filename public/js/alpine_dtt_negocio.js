"use strict";
(self["webpackChunk_lacasadejuana_negocios_panel"] = self["webpackChunk_lacasadejuana_negocios_panel"] || []).push([["/js/alpine_dtt_negocio"],{

/***/ "./resources/js/alpine_dtt_negocio.ts":
/*!********************************************!*\
  !*** ./resources/js/alpine_dtt_negocio.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dataTableFactory": () => (/* binding */ dataTableFactory),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tom_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tom-select */ "./node_modules/tom-select/dist/js/tom-select.complete.js");
/* harmony import */ var tom_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tom_select__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dtt_negocios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dtt_negocios */ "./resources/js/dtt_negocios.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

///import Alpine from 'alpinejs'


globalThis.addEditableBehavior = _dtt_negocios__WEBPACK_IMPORTED_MODULE_1__.addEditableBehavior;

var dataTableFactory = function dataTableFactory(tableData, columnas_visibles) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    perPage: 50,
    currentPage: 1
  };
  var modifiedTableData = tableData.map(function (row) {
    var searchstring = Object.values(row).join(' ').normalize('NFD').replace(/(?:[\^`\xA8\xAF\xB4\xB7\xB8\u02B0-\u034E\u0350-\u0357\u035D-\u0362\u0374\u0375\u037A\u0384\u0385\u0483-\u0487\u0559\u0591-\u05A1\u05A3-\u05BD\u05BF\u05C1\u05C2\u05C4\u064B-\u0652\u0657\u0658\u06DF\u06E0\u06E5\u06E6\u06EA-\u06EC\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F5\u0818\u0819\u0898-\u089F\u08C9-\u08D2\u08E3-\u08FE\u093C\u094D\u0951-\u0954\u0971\u09BC\u09CD\u0A3C\u0A4D\u0ABC\u0ACD\u0AFD-\u0AFF\u0B3C\u0B4D\u0B55\u0BCD\u0C3C\u0C4D\u0CBC\u0CCD\u0D3B\u0D3C\u0D4D\u0DCA\u0E47-\u0E4C\u0E4E\u0EBA\u0EC8-\u0ECC\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F82-\u0F84\u0F86\u0F87\u0FC6\u1037\u1039\u103A\u1063\u1064\u1069-\u106D\u1087-\u108D\u108F\u109A\u109B\u135D-\u135F\u1714\u1715\u17C9-\u17D3\u17DD\u1939-\u193B\u1A75-\u1A7C\u1A7F\u1AB0-\u1ABE\u1AC1-\u1ACB\u1B34\u1B44\u1B6B-\u1B73\u1BAA\u1BAB\u1C36\u1C37\u1C78-\u1C7D\u1CD0-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1D2C-\u1D6A\u1DC4-\u1DCF\u1DF5-\u1DFF\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2CEF-\u2CF1\u2E2F\u302A-\u302F\u3099-\u309C\u30FC\uA66F\uA67C\uA67D\uA67F\uA69C\uA69D\uA6F0\uA6F1\uA700-\uA721\uA788-\uA78A\uA7F8\uA7F9\uA8C4\uA8E0-\uA8F1\uA92B-\uA92E\uA953\uA9B3\uA9C0\uA9E5\uAA7B-\uAA7D\uAABF-\uAAC2\uAAF6\uAB5B-\uAB5F\uAB69-\uAB6B\uABEC\uABED\uFB1E\uFE20-\uFE2F\uFF3E\uFF40\uFF70\uFF9E\uFF9F\uFFE3]|\uD800\uDEE0|\uD801[\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDEE5\uDEE6]|\uD803[\uDD22-\uDD27\uDF46-\uDF50\uDF82-\uDF85]|\uD804[\uDC46\uDC70\uDCB9\uDCBA\uDD33\uDD34\uDD73\uDDC0\uDDCA-\uDDCC\uDE35\uDE36\uDEE9\uDEEA\uDF3C\uDF4D\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC42\uDC46\uDCC2\uDCC3\uDDBF\uDDC0\uDE3F\uDEB6\uDEB7\uDF2B]|\uD806[\uDC39\uDC3A\uDD3D\uDD3E\uDD43\uDDE0\uDE34\uDE47\uDE99]|\uD807[\uDC3F\uDD42\uDD44\uDD45\uDD97]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF9F\uDFF0\uDFF1]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD67-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD]|\uD838[\uDD30-\uDD36\uDEAE\uDEEC-\uDEEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD46\uDD48-\uDD4A])/g, '').toLowerCase();
    return _objectSpread({
      searchstring: searchstring
    }, row);
  });
  return {
    items: [],

    get perPage() {
      return config.perPage;
    },

    searchValue: '',
    columnas_visibles: columnas_visibles,
    // tableData: modifiedTableData,
    visible_pages: [],
    currentPage: config.currentPage,
    sorted: {
      field: 'id',
      rule: 'desc'
    },
    negociosStore: globalThis.Alpine.store('negocios'),

    get pagination() {
      var lastPage = Math.ceil(this.negociosStore.total / this.perPage),
          currentPage = Math.min(this.currentPage, lastPage);
      return {
        total: this.negociosStore.total,
        perPage: this.perPage,
        lastPage: lastPage,
        currentPage: currentPage,
        from: (currentPage - 1) * this.perPage + 1,
        to: currentPage * this.perPage
      };
    },

    get tableData() {
      return this.negociosStore.data;
    },

    get visibleItems() {
      return this.items.slice(this.pagination.from - 1, this.pagination.to);
    },

    get pages() {
      return Array.from({
        length: Math.ceil(this.pagination.total / this.perPage)
      }).map(function (_, i) {
        return i + 1;
      });
    },

    //fuse: createFuseInstance(tableData),
    initData: function initData() {
      var _this = this;

      //this.pages = Array.from({ length: this.pagination.lastPage })
      //  console.info({ tableData })
      //     this.tableData = modifiedTableData
      //this.fuse = createFuseInstance(this.tableData)
      this.items = this.tableData; //@ts-ignore
      //this.columnas_visibles = (Alpine.store('columnas_visibles') ).properties
      //  this.items = this.tableData.sort(this.compareOnKey('nombre', 'asc'))
      //@ts-ignore

      if (this.columnas_visibles['titulo-resumen-web']) this.columnas_visibles['titulo-resumen-web'].width = 300; //@ts-ignore

      if (this.columnas_visibles['canal-de-captacion']) this.columnas_visibles['canal-de-captacion'].width = 195;
      globalThis.debouncedAdjustHeight();
      this.fetchPage().then(function () {
        return _this.items = _this.tableData;
      }); //this.changePage(1)
    },
    fetchPage: function fetchPage() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this2.negociosStore.current_page < _this2.pagination.lastPage)) {
                  _context.next = 6;
                  break;
                }

                _this2.items = _this2.tableData;
                globalThis.debouncedAdjustHeight();
                return _context.abrupt("return", _this2.negociosStore.next().then(function () {
                  return _this2.fetchPage();
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    compareOnKey: function compareOnKey(key, rule) {
      this.sorted = {
        field: key,
        rule: rule
      };
      var input_type = columnas_visibles[key].input_type;
      return function (a, b) {
        var valueA = a[key],
            valueB = b[key];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          input_type = 'number';
        }

        if (['date', 'dateTime'].includes(input_type)) {
          valueA = new Date(a[key]);
          valueB = new Date(b[key]);
        } else if (['text', 'textArea', 'email', 'url'].includes(input_type)) {
          valueA = String(a[key]).toUpperCase();
          valueB = String(b[key]).toUpperCase();

          trigger: 'focus';
        } //console.log({ valueA, valueB })


        return (valueA === valueB ? 0 : valueA > valueB ? 1 : -1) * (rule === 'asc' ? 1 : -1);
      };
    },
    checkView: function checkView(index) {
      return index > this.pagination.from && index < this.pagination.to;
    },
    search: function search(term) {
      if (!term) {
        this.items = this.tableData.slice(0).sort(this.compareOnKey(this.sorted.field, this.sorted.rule));
      } else {
        this.items = this.tableData.filter(function (row) {
          return String(row.searchstring).includes(term);
        }).slice(0).sort(this.compareOnKey(this.sorted.field, this.sorted.rule));
        /* let results = this.fuse.search(term),
             items = results.map(r => r.item)
               this.items = items
         console.log({ term, results, fuse: this.fuse })*/
      } //this.changePage(1)

    },
    sort: function sort(field, rule) {
      //@ts-ignore
      var column = this.columnas_visibles[field];
      console.log(_objectSpread({
        field: field,
        rule: rule
      }, column));
      this.items.sort(this.compareOnKey(field, rule));
      this.sorted.field = field;
      this.sorted.rule = rule;
    },
    changePage: function changePage() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (page) {
        page = Math.max(1, Math.min(page, this.pagination.lastPage));
        this.currentPage = page;
      }

      var _this$pagination = this.pagination,
          currentPage = _this$pagination.currentPage,
          lastPage = _this$pagination.lastPage;
      var from = currentPage - 3,
          to = currentPage + 3;

      if (from < 1) {
        from = 1;
      }

      if (to > lastPage) {
        to = lastPage;
      }

      var pages = Array.from({
        length: Math.min(7, 1 + to - from)
      }).map(function (_, i) {
        return String(from + i);
      });
      console.log({
        currentPage: currentPage,
        lastPage: lastPage,
        from: from,
        to: to,
        pages: pages.join(',')
      });

      if (from > 2) {
        pages.unshift('...');
      }

      if (from > 1) {
        pages.unshift('1');
      }

      if (to < lastPage - 1) {
        pages.push('...');
      }

      if (to < lastPage) {
        pages.push(String(lastPage));
      }

      this.visible_pages = pages; // addEditableBehavior()

      setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var section, computedScroll;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                section = document.querySelector('body > main > section.section');

                if (section) {
                  computedScroll = section.clientHeight - 200;
                  jQuery('#negocios_full_wrapper').css('max-height', computedScroll);
                }

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })), 1000);
    },
    isEmpty: function isEmpty() {
      return this.pagination.total ? false : true;
    }
  };
};

var CreateStageDependentMorphToSelect = function CreateStageDependentMorphToSelect(_ref2) {
  var negocio = _ref2.negocio,
      field = _ref2.field,
      fieldtext = _ref2.fieldtext,
      columna = _ref2.columna,
      _onchange = _ref2.onchange,
      options = _ref2.options;
  return {
    cell_editing: false,
    negocio: negocio,
    field: field,
    visible: true,
    attr_type: '',
    tomselect: null,
    initTomSelect: function initTomSelect($el) {
      if (this.tomselect) return;
      var tsettings = {
        valueField: 'value',
        maxItems: 1,
        create: false,
        //dropdownParent: '#table_outer_container',
        labelField: 'name',
        options: Object.values(this.options).map(function (item) {
          return {
            //@ts-ignore
            value: String(item.id || item),
            //@ts-ignore
            name: item.name || item
          };
        }),
        items: negocio[this.field]
      };
      console.log({
        $el: $el,
        tsettings: tsettings
      });
      this.tomselect = new (tom_select__WEBPACK_IMPORTED_MODULE_0___default())($el, tsettings);
    },

    get id() {
      return 'select_' + this.field + '-' + this.negocio.id;
    },

    init: function init() {
      this.attr_type = columna.attr_type;
      this.visible = columna.visible;
    },
    fieldtext: fieldtext,
    onchange: function onchange(negocio) {
      return _onchange(negocio);
    },
    options: options,

    get editable() {
      return [1, 2].includes(Number(negocio.id_etapa_negocio));
    },

    get show_button() {
      return !this.cell_editing || !this.editable;
    },

    get show_form() {
      return this.cell_editing && this.editable;
    }

  };
};

globalThis.CreateStageDependentMorphToSelect = CreateStageDependentMorphToSelect;

var CreateMorphToSelect = function CreateMorphToSelect(_ref3) {
  var negocio = _ref3.negocio,
      field = _ref3.field,
      fieldtext = _ref3.fieldtext,
      columna = _ref3.columna,
      _onchange2 = _ref3.onchange,
      options = _ref3.options;
  return {
    cell_editing: false,
    negocio: negocio,
    field: field,
    visible: true,
    attr_type: '',
    tomselect: null,
    initTomSelect: function initTomSelect($el) {
      if (this.tomselect) return;
      var tsettings = {
        valueField: 'value',
        maxItems: 1,
        create: false,
        //dropdownParent: '#table_outer_container',
        labelField: 'name',
        options: Object.values(this.options).map(function (item) {
          return {
            //@ts-ignore
            value: String(item.id || item),
            //@ts-ignore
            name: item.name || item
          };
        }),
        items: negocio[this.field]
      };
      console.log({
        $el: $el,
        tsettings: tsettings
      });
      this.tomselect = new (tom_select__WEBPACK_IMPORTED_MODULE_0___default())($el, tsettings);
    },

    get id() {
      return 'select_' + this.field + '-' + this.negocio.id;
    },

    init: function init() {
      this.attr_type = columna.attr_type;
      this.visible = columna.visible;
    },
    fieldtext: fieldtext,
    onchange: function onchange(negocio) {
      return _onchange2(negocio);
    },
    options: options,

    get editable() {
      return true;
    },

    get show_button() {
      return !this.cell_editing || !this.editable;
    },

    get show_form() {
      return this.cell_editing && this.editable;
    }

  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dataTableFactory);

globalThis.dataTableFactory = dataTableFactory;
globalThis.CreateMorphToSelect = CreateMorphToSelect;

/***/ }),

/***/ "./resources/js/components/alpine_dtt_negocio.ts":
/*!*******************************************************!*\
  !*** ./resources/js/components/alpine_dtt_negocio.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateMorphToSelect": () => (/* binding */ CreateMorphToSelect),
/* harmony export */   "CreateStageDependentMorphToSelect": () => (/* binding */ CreateStageDependentMorphToSelect),
/* harmony export */   "dataTableFactory": () => (/* binding */ dataTableFactory),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tom_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tom-select */ "./node_modules/tom-select/dist/js/tom-select.complete.js");
/* harmony import */ var tom_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tom_select__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

///import Alpine from 'alpinejs'


var dataTableFactory = function dataTableFactory(tableData, columnas_visibles) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    perPage: 50,
    currentPage: 1
  };
  var modifiedTableData = tableData.map(function (row) {
    var searchstring = Object.values(row).join(' ').normalize('NFD').replace(/(?:[\^`\xA8\xAF\xB4\xB7\xB8\u02B0-\u034E\u0350-\u0357\u035D-\u0362\u0374\u0375\u037A\u0384\u0385\u0483-\u0487\u0559\u0591-\u05A1\u05A3-\u05BD\u05BF\u05C1\u05C2\u05C4\u064B-\u0652\u0657\u0658\u06DF\u06E0\u06E5\u06E6\u06EA-\u06EC\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F5\u0818\u0819\u0898-\u089F\u08C9-\u08D2\u08E3-\u08FE\u093C\u094D\u0951-\u0954\u0971\u09BC\u09CD\u0A3C\u0A4D\u0ABC\u0ACD\u0AFD-\u0AFF\u0B3C\u0B4D\u0B55\u0BCD\u0C3C\u0C4D\u0CBC\u0CCD\u0D3B\u0D3C\u0D4D\u0DCA\u0E47-\u0E4C\u0E4E\u0EBA\u0EC8-\u0ECC\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F82-\u0F84\u0F86\u0F87\u0FC6\u1037\u1039\u103A\u1063\u1064\u1069-\u106D\u1087-\u108D\u108F\u109A\u109B\u135D-\u135F\u1714\u1715\u17C9-\u17D3\u17DD\u1939-\u193B\u1A75-\u1A7C\u1A7F\u1AB0-\u1ABE\u1AC1-\u1ACB\u1B34\u1B44\u1B6B-\u1B73\u1BAA\u1BAB\u1C36\u1C37\u1C78-\u1C7D\u1CD0-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1D2C-\u1D6A\u1DC4-\u1DCF\u1DF5-\u1DFF\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2CEF-\u2CF1\u2E2F\u302A-\u302F\u3099-\u309C\u30FC\uA66F\uA67C\uA67D\uA67F\uA69C\uA69D\uA6F0\uA6F1\uA700-\uA721\uA788-\uA78A\uA7F8\uA7F9\uA8C4\uA8E0-\uA8F1\uA92B-\uA92E\uA953\uA9B3\uA9C0\uA9E5\uAA7B-\uAA7D\uAABF-\uAAC2\uAAF6\uAB5B-\uAB5F\uAB69-\uAB6B\uABEC\uABED\uFB1E\uFE20-\uFE2F\uFF3E\uFF40\uFF70\uFF9E\uFF9F\uFFE3]|\uD800\uDEE0|\uD801[\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDEE5\uDEE6]|\uD803[\uDD22-\uDD27\uDF46-\uDF50\uDF82-\uDF85]|\uD804[\uDC46\uDC70\uDCB9\uDCBA\uDD33\uDD34\uDD73\uDDC0\uDDCA-\uDDCC\uDE35\uDE36\uDEE9\uDEEA\uDF3C\uDF4D\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC42\uDC46\uDCC2\uDCC3\uDDBF\uDDC0\uDE3F\uDEB6\uDEB7\uDF2B]|\uD806[\uDC39\uDC3A\uDD3D\uDD3E\uDD43\uDDE0\uDE34\uDE47\uDE99]|\uD807[\uDC3F\uDD42\uDD44\uDD45\uDD97]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF9F\uDFF0\uDFF1]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD833[\uDF00-\uDF2D\uDF30-\uDF46]|\uD834[\uDD67-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD]|\uD838[\uDD30-\uDD36\uDEAE\uDEEC-\uDEEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD46\uDD48-\uDD4A])/g, '').toLowerCase();
    return _objectSpread({
      searchstring: searchstring
    }, row);
  });
  return {
    items: [],

    get perPage() {
      return config.perPage;
    },

    searchValue: '',
    columnas_visibles: columnas_visibles,
    // tableData: modifiedTableData,
    visible_pages: [],
    currentPage: config.currentPage,
    sorted: {
      field: 'id',
      rule: 'desc'
    },
    negociosStore: globalThis.Alpine.store('negocios'),

    get pagination() {
      var lastPage = Math.ceil(this.negociosStore.total / this.perPage),
          currentPage = Math.min(this.currentPage, lastPage);
      return {
        total: this.negociosStore.total,
        perPage: this.perPage,
        lastPage: lastPage,
        currentPage: currentPage,
        from: (currentPage - 1) * this.perPage + 1,
        to: currentPage * this.perPage
      };
    },

    get tableData() {
      return this.negociosStore.data;
    },

    get visibleItems() {
      return this.items.slice(this.pagination.from - 1, this.pagination.to);
    },

    get pages() {
      return Array.from({
        length: Math.ceil(this.pagination.total / this.perPage)
      }).map(function (_, i) {
        return i + 1;
      });
    },

    //fuse: createFuseInstance(tableData),
    initData: function initData() {
      var _this = this;

      //this.pages = Array.from({ length: this.pagination.lastPage })
      //  console.info({ tableData })
      //     this.tableData = modifiedTableData
      //this.fuse = createFuseInstance(this.tableData)
      this.items = this.tableData; //@ts-ignore
      //this.columnas_visibles = (Alpine.store('columnas_visibles') ).properties
      //  this.items = this.tableData.sort(this.compareOnKey('nombre', 'asc'))
      //@ts-ignore

      if (this.columnas_visibles['titulo-resumen-web']) this.columnas_visibles['titulo-resumen-web'].width = 300; //@ts-ignore

      if (this.columnas_visibles['canal-de-captacion']) this.columnas_visibles['canal-de-captacion'].width = 195;
      globalThis.debouncedAdjustHeight();
      this.fetchPage().then(function () {
        return _this.items = _this.tableData;
      }); //this.changePage(1)
    },
    fetchPage: function fetchPage() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this2.negociosStore.current_page < _this2.pagination.lastPage)) {
                  _context.next = 6;
                  break;
                }

                _this2.items = _this2.tableData;
                globalThis.debouncedAdjustHeight();
                return _context.abrupt("return", _this2.negociosStore.next().then(function () {
                  return _this2.fetchPage();
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    compareOnKey: function compareOnKey(key, rule) {
      this.sorted = {
        field: key,
        rule: rule
      };
      var input_type = columnas_visibles[key].input_type;
      return function (a, b) {
        var valueA = a[key],
            valueB = b[key];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          input_type = 'number';
        }

        if (['date', 'dateTime'].includes(input_type)) {
          valueA = new Date(a[key]);
          valueB = new Date(b[key]);
        } else if (['text', 'textArea', 'email', 'url'].includes(input_type)) {
          valueA = String(a[key]).toUpperCase();
          valueB = String(b[key]).toUpperCase();

          trigger: 'focus';
        } //console.log({ valueA, valueB })


        return (valueA === valueB ? 0 : valueA > valueB ? 1 : -1) * (rule === 'asc' ? 1 : -1);
      };
    },
    checkView: function checkView(index) {
      return index > this.pagination.from && index < this.pagination.to;
    },
    search: function search(term) {
      if (!term) {
        this.items = this.tableData.slice(0).sort(this.compareOnKey(this.sorted.field, this.sorted.rule));
      } else {
        this.items = this.tableData.filter(function (row) {
          return String(row.searchstring).includes(term);
        }).slice(0).sort(this.compareOnKey(this.sorted.field, this.sorted.rule));
        /* let results = this.fuse.search(term),
             items = results.map(r => r.item)
               this.items = items
         console.log({ term, results, fuse: this.fuse })*/
      } //this.changePage(1)

    },
    sort: function sort(field, rule) {
      //@ts-ignore
      var column = this.columnas_visibles[field];
      console.log(_objectSpread({
        field: field,
        rule: rule
      }, column));
      this.items.sort(this.compareOnKey(field, rule));
      this.sorted.field = field;
      this.sorted.rule = rule;
    },
    changePage: function changePage() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (page) {
        page = Math.max(1, Math.min(page, this.pagination.lastPage));
        this.currentPage = page;
      }

      var _this$pagination = this.pagination,
          currentPage = _this$pagination.currentPage,
          lastPage = _this$pagination.lastPage;
      var from = currentPage - 3,
          to = currentPage + 3;

      if (from < 1) {
        from = 1;
      }

      if (to > lastPage) {
        to = lastPage;
      }

      var pages = Array.from({
        length: Math.min(7, 1 + to - from)
      }).map(function (_, i) {
        return String(from + i);
      });
      console.log({
        currentPage: currentPage,
        lastPage: lastPage,
        from: from,
        to: to,
        pages: pages.join(',')
      });

      if (from > 2) {
        pages.unshift('...');
      }

      if (from > 1) {
        pages.unshift('1');
      }

      if (to < lastPage - 1) {
        pages.push('...');
      }

      if (to < lastPage) {
        pages.push(String(lastPage));
      }

      this.visible_pages = pages;
      setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var section, computedScroll;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                section = document.querySelector('body > main > section.section');

                if (section) {
                  computedScroll = section.clientHeight - 200;
                  jQuery('#negocios_full_wrapper').css('max-height', computedScroll);
                }

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })), 1000);
    },
    isEmpty: function isEmpty() {
      return this.pagination.total ? false : true;
    }
  };
};

var CreateStageDependentMorphToSelect = function CreateStageDependentMorphToSelect(_ref2) {
  var negocio = _ref2.negocio,
      field = _ref2.field,
      fieldtext = _ref2.fieldtext,
      columna = _ref2.columna,
      _onchange = _ref2.onchange,
      options = _ref2.options;
  return {
    cell_editing: false,
    negocio: negocio,
    field: field,
    visible: true,
    attr_type: '',
    tomselect: null,
    initTomSelect: function initTomSelect($el) {
      if (this.tomselect) return;
      var tsettings = {
        valueField: 'value',
        maxItems: 1,
        create: false,
        //dropdownParent: '#table_outer_container',
        labelField: 'name',
        options: Object.values(this.options).map(function (item) {
          return {
            //@ts-ignore
            value: String(item.id || item),
            //@ts-ignore
            name: item.name || item
          };
        }),
        items: negocio[this.field]
      };
      console.log({
        $el: $el,
        tsettings: tsettings
      });
      this.tomselect = new (tom_select__WEBPACK_IMPORTED_MODULE_0___default())($el, tsettings);
    },

    get id() {
      return 'select_' + this.field + '-' + this.negocio.id;
    },

    init: function init() {
      this.attr_type = columna.attr_type;
      this.visible = columna.visible;
    },
    fieldtext: fieldtext,
    onchange: function onchange(negocio) {
      return _onchange(negocio);
    },
    options: options,

    get editable() {
      return [1, 2].includes(Number(negocio.id_etapa_negocio));
    },

    get show_button() {
      return !this.cell_editing || !this.editable;
    },

    get show_form() {
      return this.cell_editing && this.editable;
    }

  };
};

var CreateMorphToSelect = function CreateMorphToSelect(_ref3) {
  var negocio = _ref3.negocio,
      field = _ref3.field,
      fieldtext = _ref3.fieldtext,
      columna = _ref3.columna,
      _onchange2 = _ref3.onchange,
      options = _ref3.options;
  return {
    cell_editing: false,
    negocio: negocio,
    field: field,
    visible: true,
    attr_type: '',
    tomselect: null,
    initTomSelect: function initTomSelect($el) {
      if (this.tomselect) return;
      var tsettings = {
        valueField: 'value',
        maxItems: 1,
        create: false,
        //dropdownParent: '#table_outer_container',
        labelField: 'name',
        options: Object.values(this.options).map(function (item) {
          return {
            //@ts-ignore
            value: String(item.id || item),
            //@ts-ignore
            name: item.name || item
          };
        }),
        items: negocio[this.field]
      };
      console.log({
        $el: $el,
        tsettings: tsettings
      });
      this.tomselect = new (tom_select__WEBPACK_IMPORTED_MODULE_0___default())($el, tsettings);
    },

    get id() {
      return 'select_' + this.field + '-' + this.negocio.id;
    },

    init: function init() {
      this.attr_type = columna.attr_type;
      this.visible = columna.visible;
    },
    fieldtext: fieldtext,
    onchange: function onchange(negocio) {
      return _onchange2(negocio);
    },
    options: options,

    get editable() {
      return true;
    },

    get show_button() {
      return !this.cell_editing || !this.editable;
    },

    get show_form() {
      return this.cell_editing && this.editable;
    }

  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dataTableFactory);


/***/ }),

/***/ "./resources/js/daterangepicker.ts":
/*!*****************************************!*\
  !*** ./resources/js/daterangepicker.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enableDateInputs": () => (/* binding */ enableDateInputs),
/* harmony export */   "initializeDateRangePickers": () => (/* binding */ initializeDateRangePickers),
/* harmony export */   "locale": () => (/* binding */ locale)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var moment = globalThis.moment;
var locale = {
  // cancelLabel: 'Clear',
  applyLabel: 'Guardar',
  cancelLabel: 'Cancelar',
  fromLabel: 'Desde',
  toLabel: 'Hasta',
  customRangeLabel: 'Personalizar',
  daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  firstDay: 1
};

function getMinScheduleableDate() {
  var tomorrowAt8Am = moment().endOf('day').add(8, 'hour').add(1, 'minute'),
      todayAt8Am = moment().startOf('day').add(8, 'hour').add(1, 'minute'),
      in1Hour = moment().add(1, 'hour').add(1, 'minute'),
      currentHour = moment().hour(); // The soonest possible is exactly one hour from now.
  // It can't be earlier than 8AM (so, before 7AM, 8AM is the fixed minimum)
  // It can't be after 22:00 (so after 21:00, 8AM of the next day becomes the next minimum)

  return currentHour >= 21 ? tomorrowAt8Am : currentHour < 7 ? todayAt8Am : in1Hour;
}

var enableDateInputs = function enableDateInputs(inputsHabilitables) {
  inputsHabilitables.on('click', function (e) {
    //@ts-ignore
    var $frm = $(e.target).closest('form'),
        $input = $frm.find('.agendar_input');
    $input.prop('readonly', false);
    var $picker = $input.data('daterangepicker');

    if (!$picker) {
      //@ts-ignore
      $input.daterangepicker({
        singleDatePicker: true,
        minDate: getMinScheduleableDate(),
        timePicker: true,
        autoUpdateInput: false,
        opens: 'left',
        drops: 'up',
        timePickerIncrement: 5,
        timePicker24Hour: true,
        locale: _objectSpread(_objectSpread({}, locale), {}, {
          format: 'DD-MM-YYYY HH:mm',
          applyLabel: 'Guardar'
        })
      });
    }

    $picker = $input.data('daterangepicker');
    var currentContent = $picker.element.val();
    var cancelBtn = $picker.container.find('.cancelBtn'),
        $aboveMonth = $picker.container.find('.calendar-table').closest('.drp-calendar.single');
    var $calendarHint = $aboveMonth.find('.calendar-hint');
    if ($calendarHint.length === 0) $calendarHint = $('<div class="calendar-hint"></div>').appendTo($aboveMonth);
    var autoSave = $input.hasClass('autosave');

    if (!currentContent) {
      $calendarHint.text('Agendar una fecha en este campo creará automáticamente la cita en Google Calendar');
    } else {
      $picker.setStartDate(currentContent);
      $calendarHint.text('Modificar la fecha agendada actualiza automáticamente la cita en Google Calendar');
    }

    $calendarHint.prepend('<i class="fa fa-info-circle" aria-hidden="true"></i>');
    console.log({
      $picker: $picker,
      $aboveMonth: $aboveMonth,
      $calendarHint: $calendarHint,
      click: '.habilitar_edicion_de_fecha_programada'
    });
    /**
     * If there's a value already, then add a clear btn
     */

    if (currentContent && cancelBtn.length === 1) {
      var clearBtn = cancelBtn.clone().addClass('dateClear btn-danger').text('Eliminar');
      clearBtn.on('click', function () {
        $input.val('');
      });
      clearBtn.prependTo(cancelBtn.parent());
    }

    $input.on('cancel.daterangepicker', function (ev, picker) {
      console.log('cancel datepicker', ev);
      $input.prop('readonly', true);
    });
    $input.on('apply.daterangepicker', function (ev, picker) {
      $input.val(picker.startDate.format('DD-MM-YYYY HH:mm'));
      if (autoSave) $frm.submit();
    });
    console.log({
      currentContent: currentContent,
      autoSave: autoSave
    });
  });
  console.info({
    inputsHabilitables: inputsHabilitables
  });
};
globalThis.enableDateInputs = enableDateInputs;
var initializeDateRangePickers = function initializeDateRangePickers() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#dateRange';
  var options = arguments.length > 1 ? arguments[1] : undefined;
  //@ts-ignore
  $(selector).daterangepicker(_objectSpread({
    // autoUpdateInput: false,
    singleDatePicker: false,
    timePicker: false,
    autoUpdateInput: true,
    locale: locale
  }, options));
  var $picker = $(selector).data('daterangepicker');
  var $input = $(selector);
  var $element = $picker.element; //@ts-ignore

  console.log({
    $picker: $picker,
    $input: $input,
    $element: $element
  }); //@ts-ignore

  var cancelBtn = $picker.container.find('.cancelBtn');
  cancelBtn.addClass('dateClear btn-danger').text('Eliminar');
  $input.on('cancel.daterangepicker', function (ev, picker) {
    console.log('cancel datepicker', $(this));
    $input.val('').trigger('change');
  });
};
globalThis.initializeDateRangePickers = initializeDateRangePickers;

/***/ }),

/***/ "./resources/js/dtt_negocios.ts":
/*!**************************************!*\
  !*** ./resources/js/dtt_negocios.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateMorphToSelect": () => (/* reexport safe */ _components_alpine_dtt_negocio__WEBPACK_IMPORTED_MODULE_2__.CreateMorphToSelect),
/* harmony export */   "CreateStageDependentMorphToSelect": () => (/* reexport safe */ _components_alpine_dtt_negocio__WEBPACK_IMPORTED_MODULE_2__.CreateStageDependentMorphToSelect),
/* harmony export */   "addEditableBehavior": () => (/* binding */ addEditableBehavior),
/* harmony export */   "dataTableFactory": () => (/* reexport safe */ _components_alpine_dtt_negocio__WEBPACK_IMPORTED_MODULE_2__.dataTableFactory),
/* harmony export */   "debouncedAdjustHeight": () => (/* binding */ debouncedAdjustHeight),
/* harmony export */   "declareColumns": () => (/* binding */ declareColumns),
/* harmony export */   "requestAnimationPromise": () => (/* binding */ requestAnimationPromise),
/* harmony export */   "waitFor": () => (/* binding */ waitFor)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _daterangepicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./daterangepicker */ "./resources/js/daterangepicker.ts");
/* harmony import */ var _components_alpine_dtt_negocio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/alpine_dtt_negocio */ "./resources/js/components/alpine_dtt_negocio.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




function waitFor() {
  return _waitFor.apply(this, arguments);
}

function _waitFor() {
  _waitFor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var delay,
        _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            delay = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 500;
            return _context2.abrupt("return", new Promise(function (res) {
              setTimeout(function () {
                return res;
              }, delay);
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _waitFor.apply(this, arguments);
}

function requestAnimationPromise() {
  return _requestAnimationPromise.apply(this, arguments);
}

function _requestAnimationPromise() {
  _requestAnimationPromise = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (res) {
              requestAnimationFrame(function () {
                return res;
              });
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _requestAnimationPromise.apply(this, arguments);
}

function addEditableBehavior() {
  //@ts-ignore
  $.fn.editable.defaults.mode = 'inline'; //@ts-ignore

  $.fn.editableform.template = "<form class=\"form-inline editableform\">\n        <div class=\"control-group\">\n            <div><div class=\"editable-input\"></div><div class=\"editable-buttons\"></div></div>\n            <div class=\"editable-error-block\"></div>\n        </div>\n    </form>"; //@ts-ignore

  $.fn.editableform.buttons = '<button type="submit" class="editable-submit btn btn-xs btn-success">Ok</button><button type="button" class="editable-cancel btn btn-xs btn-danger">Cancelar</button>';
  requestAnimationPromise().then(function () {
    //@ts-ignore
    $('td .update_record').editable({
      url: "/negocio/updateSingleField",
      emptytext: 'Sin datos',
      params: function params(_params) {
        _params.attr = $(this).data('attr');
        return _params;
      }
    });
  });
}
globalThis.addEditableBehavior = addEditableBehavior;

globalThis.generateCompactDtt = function (_ref) {
  var columnDefs = _ref.columnDefs,
      data = _ref.data,
      computedScroll = _ref.computedScroll;
  var dttSettings = {
    "order": [],
    dom: '<".row"Blf>rt<".row"ip>',
    //@ts-ignore
    buttons: [{
      extend: 'excel',
      className: 'btn btn-primary',
      text: 'Exportar a Excel',
      exportOptions: {
        columns: [0, ':visible']
      },
      title: 'Exportar a XLSX'
    }, {
      extend: 'print',
      className: 'btn btn-success',
      text: 'Imprimir',
      exportOptions: {
        columns: [0, ':visible']
      },
      title: 'Imprimir como PDF'
    }],
    initComplete: function initComplete() {
      var btns = $('.dt-button');
      btns.addClass('btn btn-primary btn-xs  py-1 px-3 mx-1');
      btns.removeClass('dt-button');
      setTimeout(function () {
        var $wrapper = $('.dataTables_wrapper');
        $('.dataTables_scrollHeadInner').find('th').addClass('fw-600 ').addClass('pl-2');
        $wrapper.find('.dt-buttons').addClass('col-4').appendTo('#above_toolbar');
        $wrapper.find('.dataTables_length select').addClass('small inline').css('width', 60).appendTo('#above_toolbar .dt-buttons ');
        $wrapper.find('.dataTables_filter ').addClass('col-6').appendTo('#search_contextual');
        $wrapper.find('.dataTables_length').remove();
        $('.dataTables_scrollBody').css({
          "max-height": "calc(100vh - 285px)"
        });
        $('.footer').remove();
        $.ready.then(function () {
          (0,_daterangepicker__WEBPACK_IMPORTED_MODULE_1__.initializeDateRangePickers)('#dateRange', {});
        });
      }, 1500);
    },
    data: Object.values(data),
    columnDefs: columnDefs,
    "language": {
      "url": "/js/dataTables/Spanish.json"
    },
    //@ts-ignore´
    scrollY: computedScroll,
    scrollX: true,
    //scrollCollapse: true,
    paging: true,
    pageLength: 25,
    fixedHeader: false
  };
  console.info(dttSettings);
  globalThis.negociosTable = $('#negocios_compact').DataTable(dttSettings);
};

function adjustHeight() {
  return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var outer_container, computedScroll;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            outer_container = document.querySelector('body > main #table_outer_container');

            if (outer_container) {
              computedScroll = outer_container.clientHeight - 140;
              jQuery('#negocios_full_wrapper').css('max-height', computedScroll);
            }

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}

var debouncedAdjustHeight = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.debounce)(adjustHeight(), 1000);
globalThis.debouncedAdjustHeight = debouncedAdjustHeight;
/**
 * Merge the default set of visible fields with the ones defined on a particular filter
 * @param param0
 * @returns
 */

function declareColumns(_ref3) {
  var default_columns = _ref3.default_columns,
      columnas_visibles = _ref3.columnas_visibles;
  var defaultSlugs = default_columns.map(function (c) {
    return c.slug_name;
  }),
      columnDefs = default_columns.concat(columnas_visibles.filter(function (col) {
    return !defaultSlugs.includes(col.slug_name.replace(/^id_/, ''));
  }) // don't add the columns that are already in the default set, or whose name is the dictionary for a given id (id_tipo_negocio, id_tipo_propiedad, etc)
  ).map(function (columna) {
    var title = columna.name,
        visible = columna.visible,
        name = columna.slug_name,
        attr_type = columna.attr_type,
        input_type = columna.input_type,
        width = columna.width;
    var data = name;

    if (['id_tipo_negocio', 'id_tipo_propiedad', 'id_etapa_negocio'].includes(name)) {
      data = name.replace(/^id_/, '');
    }

    return {
      title: title,
      name: name,
      visible: !!visible,
      className: [name].join(' '),
      width: width,
      data: data //  className:[slug_name,attr_type,input_type??''].join(' ')

    };
  }).map(function (column, index) {
    return _objectSpread(_objectSpread({}, column), {}, {
      targets: index
    });
  }),
      column_sections = {
    'generic_attr': [],
    'negocio_attr': [],
    'propiedad_attr': []
  },
      properties = default_columns.concat(columnas_visibles).reduce(function (accum, col) {
    var attr_type = col.attr_type,
        id_input_type = col.id_input_type;

    if (!['negocio_attr', 'propiedad_attr'].includes(attr_type) || ![1, 2, 7, 5, 6].includes(Number(id_input_type))) {
      col.id_input_type = 0;
      col.input_type = 'text';
    }

    accum[col.slug_name] = col;
    return accum;
  }, {}),
      store_columnas_visibles = {
    properties: properties,
    column_sections: column_sections,
    isVisible: function isVisible(slug_name) {
      //@ts-ignore
      var property = this.get(slug_name); // console.log(property)

      return property.visible;
    },
    get: function get(slug_name) {
      //@ts-ignore
      return this.properties[slug_name] || {};
    },
    toggle: function toggle(slug_name) {
      this.get(slug_name).visible = !this.get(slug_name).visible;
    },
    at: function at() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      //@ts-ignore
      return Object.values(this.properties)[index];
    }
  };
  return {
    columnas_visibles: columnas_visibles,
    columnDefs: columnDefs,
    store_columnas_visibles: store_columnas_visibles
  };
}
globalThis.declareColumns = declareColumns;

globalThis.CreateStageDependentMorphToSelect = _components_alpine_dtt_negocio__WEBPACK_IMPORTED_MODULE_2__.CreateStageDependentMorphToSelect;
globalThis.dataTableFactory = _components_alpine_dtt_negocio__WEBPACK_IMPORTED_MODULE_2__.dataTableFactory;
globalThis.CreateMorphToSelect = _components_alpine_dtt_negocio__WEBPACK_IMPORTED_MODULE_2__.CreateMorphToSelect;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor/jquery.related","vendor/alpine.related","/js/vendor"], () => (__webpack_exec__("./resources/js/alpine_dtt_negocio.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);