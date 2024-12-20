(function (g, f) {
    if ("object" == typeof exports && "object" == typeof module) {
      module.exports = f();
    } else if ("function" == typeof define && define.amd) {
      define("init_public_map", [], f);
    } else if ("object" == typeof exports) {
      exports["init_public_map"] = f();
    } else {
      g["init_public_map"] = f();
    }
  }(this, () => {
var exports = {};
var module = { exports };
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/lodash/lodash.js
var require_lodash = __commonJS({
  "node_modules/lodash/lodash.js"(exports, module2) {
    "use strict";
    (function() {
      var undefined2;
      var VERSION = "4.17.21";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        // Latin Extended-A block.
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined2 : object[key];
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined2 : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined2) {
            result = result === undefined2 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap(props, function(key) {
          return [key, object[key]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? undefined2 : object[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data2, result = [];
        while (!(data2 = iterator.next()).done) {
          result.push(data2.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      function setToArray(set3) {
        var index = -1, result = Array(set3.size);
        set3.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      function setToPairs(set3) {
        var index = -1, result = Array(set3.size);
        set3.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = function runInContext2(context) {
        context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty2 = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = function() {
          var uid2 = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid2 ? "Symbol(src)_1." + uid2 : "";
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2(
          "^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
        var defineProperty = function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap2 && new WeakMap2();
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
        function lodash(value) {
          if (isObjectLike(value) && !isArray3(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty2.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = function() {
          function object() {
          }
          return function(proto) {
            if (!isObject2(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined2;
            return result2;
          };
        }();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined2;
        }
        lodash.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash
          }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray3(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start2 = view.start, end = view.end, length = end - start2, index = isRight ? end : start2 - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data2 = iteratees[iterIndex], iteratee2 = data2.iteratee, type = data2.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet(key) {
          var data2 = this.__data__;
          if (nativeCreate) {
            var result2 = data2[key];
            return result2 === HASH_UNDEFINED ? undefined2 : result2;
          }
          return hasOwnProperty2.call(data2, key) ? data2[key] : undefined2;
        }
        function hashHas(key) {
          var data2 = this.__data__;
          return nativeCreate ? data2[key] !== undefined2 : hasOwnProperty2.call(data2, key);
        }
        function hashSet(key, value) {
          var data2 = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data2[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete(key) {
          var data2 = this.__data__, index = assocIndexOf(data2, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data2.length - 1;
          if (index == lastIndex) {
            data2.pop();
          } else {
            splice.call(data2, index, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet(key) {
          var data2 = this.__data__, index = assocIndexOf(data2, key);
          return index < 0 ? undefined2 : data2[index][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data2 = this.__data__, index = assocIndexOf(data2, key);
          if (index < 0) {
            ++this.size;
            data2.push([key, value]);
          } else {
            data2[index][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          var data2 = getMapData(this, key), size3 = data2.size;
          data2.set(key, value);
          this.size += data2.size == size3 ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values2[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data2 = this.__data__ = new ListCache(entries);
          this.size = data2.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key) {
          var data2 = this.__data__, result2 = data2["delete"](key);
          this.size = data2.size;
          return result2;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data2 = this.__data__;
          if (data2 instanceof ListCache) {
            var pairs = data2.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data2.size;
              return this;
            }
            data2 = this.__data__ = new MapCache(pairs);
          }
          data2.set(key, value);
          this.size = data2.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray3(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined2;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty2.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index < length) {
            result2[index] = skip ? undefined2 : get3(object, paths[index]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined2) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined2) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined2) {
            return result2;
          }
          if (!isObject2(value)) {
            return value;
          }
          var isArr = isArray3(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap2(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined2 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined2 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined2, args);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed === undefined2 ? current === current && !isSymbol2(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start2, end) {
          var length = array.length;
          start2 = toInteger(start2);
          if (start2 < 0) {
            start2 = -start2 > length ? 0 : length + start2;
          }
          end = end === undefined2 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start2 > end ? 0 : toLength(end);
          while (start2 < end) {
            array[start2++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction(object[key]);
          });
        }
        function baseGet(object, path) {
          path = castPath(path, object);
          var index = 0, length = path.length;
          while (object != null && index < length) {
            object = object[toKey(path[index++])];
          }
          return index && index == length ? object : undefined2;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray3(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined2 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString2(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty2.call(object, key);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        function baseInRange(number, start2, end) {
          return number >= nativeMin(start2, end) && number < nativeMax(start2, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path, args) {
          path = castPath(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey(last(path))];
          return func == null ? undefined2 : apply(func, object, args);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray3(object), othIsArr = isArray3(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index--) {
            var data2 = matchData[index];
            if (noCustomizer && data2[2] ? data2[1] !== object[data2[0]] : !(data2[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data2 = matchData[index];
            var key = data2[0], objValue = object[key], srcValue = data2[1];
            if (noCustomizer && data2[2]) {
              if (objValue === undefined2 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject2(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray3(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty2.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn(object) {
          if (!isObject2(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty2.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object) {
            var objValue = get3(object, path);
            return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject2(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
              if (newValue === undefined2) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
          var isCommon = newValue === undefined2;
          if (isCommon) {
            var isArr = isArray3(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray3(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject2(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined2;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray3(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity];
          }
          var index = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path) {
            return hasIn(object, path);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path = paths[index], value = baseGet(object, path);
            if (predicate(value, path)) {
              baseSet(result2, castPath(path, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet(object, path);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start2, end, step, fromRight) {
          var index = -1, length = nativeMax(nativeCeil((end - start2) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start2;
            start2 += step;
          }
          return result2;
        }
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        function baseRest(func, start2) {
          return setToString(overRest(func, start2, identity), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path, value, customizer) {
          if (!isObject2(object)) {
            return object;
          }
          path = castPath(path, object);
          var index = -1, length = path.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index < length) {
            var key = toKey(path[index]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined2;
              if (newValue === undefined2) {
                newValue = isObject2(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity : function(func, data2) {
          metaMap.set(func, data2);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice(array, start2, end) {
          var index = -1, length = array.length;
          if (start2 < 0) {
            start2 = -start2 > length ? 0 : length + start2;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start2 > end ? 0 : end - start2 >>> 0;
          start2 >>>= 0;
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start2];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol2(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol2(value), valIsUndefined = value === undefined2;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol2(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol2(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray3(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol2(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set4 = iteratee2 ? null : createSet(array);
            if (set4) {
              return setToArray(set4);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path) {
          path = castPath(path, object);
          object = parent(object, path);
          return object == null || delete object[toKey(last(path))];
        }
        function baseUpdate(object, path, updater, customizer) {
          return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values2[index] : undefined2;
            assignFunc(result2, props[index], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity;
        }
        function castPath(value, object) {
          if (isArray3(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        var castRest = baseRest;
        function castSlice(array, start2, end) {
          var length = array.length;
          end = end === undefined2 ? length : end;
          return !start2 && end >= length ? array : baseSlice(array, start2, end);
        }
        var clearTimeout2 = ctxClearTimeout || function(id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol2(value);
            var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol2(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
            if (newValue === undefined2) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray3(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined2 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject2(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined2,
                args,
                holders,
                undefined2,
                undefined2,
                arity - length
              );
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data2 = funcName == "wrapper" ? getData(func) : undefined2;
              if (data2 && isLaziable(data2[0]) && data2[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data2[4].length && data2[9] == 1) {
                wrapper = wrapper[getFuncName(data2[0])].apply(wrapper, data2[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray3(value)) {
                return wrapper.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined2 && other === undefined2) {
              return defaultValue;
            }
            if (value !== undefined2) {
              result2 = value;
            }
            if (other !== undefined2) {
              if (result2 === undefined2) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined2 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start2, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start2, end, step)) {
              end = step = undefined2;
            }
            start2 = toFinite(start2);
            if (end === undefined2) {
              end = start2;
              start2 = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined2 ? start2 < end ? 1 : -1 : toFinite(step);
            return baseRange(start2, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined2, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
          return new Set2(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined2;
          }
          ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined2 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined2;
          }
          var data2 = isBindKey ? undefined2 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data2) {
            mergeData(newData, data2);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined2, newData);
          }
          var setter = data2 ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty2.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject2(objValue) && isObject2(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined2 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined2) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined2, flatten), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty2.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data2 = array[length], otherFunc = data2.func;
            if (otherFunc == null || otherFunc == func) {
              return data2.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty2.call(lodash, "placeholder") ? lodash : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData(map2, key) {
          var data2 = map2.__data__;
          return isKeyable(key) ? data2[typeof key == "string" ? "string" : "hash"] : data2.map;
        }
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined2;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty2.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined2;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start2, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data2 = transforms[index], size3 = data2.size;
            switch (data2.type) {
              case "drop":
                start2 += size3;
                break;
              case "dropRight":
                end -= size3;
                break;
              case "take":
                end = nativeMin(end, start2 + size3);
                break;
              case "takeRight":
                start2 = nativeMax(start2, end - size3);
                break;
            }
          }
          return { "start": start2, "end": end };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path, hasFunc) {
          path = castPath(path, object);
          var index = -1, length = path.length, result2 = false;
          while (++index < length) {
            var key = toKey(path[index]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray3(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray3(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object) {
          if (!isObject2(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray3(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol2(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data2 = getData(other);
          return !!data2 && func === data2[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject2(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data2, source) {
          var bitmask = data2[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data2[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data2;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data2[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data2[3];
            data2[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data2[4] = partials ? replaceHolders(data2[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data2[5];
            data2[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data2[6] = partials ? replaceHolders(data2[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data2[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data2[8] = data2[8] == null ? source[8] : nativeMin(data2[8], source[8]);
          }
          if (data2[9] == null) {
            data2[9] = source[9];
          }
          data2[0] = source[0];
          data2[1] = newBitmask;
          return data2;
        }
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString2(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start2, transform2) {
          start2 = nativeMax(start2 === undefined2 ? func.length - 1 : start2, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax(args.length - start2, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args[start2 + index];
            }
            index = -1;
            var otherArgs = Array2(start2 + 1);
            while (++index < start2) {
              otherArgs[index] = args[index];
            }
            otherArgs[start2] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object, path) {
          return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
          }
          return array;
        }
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined2, arguments);
          };
        }
        function shuffleSelf(array, size3) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size3 = size3 === undefined2 ? length : size3;
          while (++index < size3) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size3;
          return array;
        }
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol2(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size3, guard) {
          if (guard ? isIterateeCall(array, size3, guard) : size3 === undefined2) {
            size3 = 1;
          } else {
            size3 = nativeMax(toInteger(size3), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size3 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size3));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size3);
          }
          return result2;
        }
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush(isArray3(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start2, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start2 && typeof start2 != "number" && isIterateeCall(array, value, start2)) {
            start2 = 0;
            end = length;
          }
          return baseFill(array, value, start2, end);
        }
        function findIndex3(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined2;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined2;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined2;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start2, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start2, end)) {
            start2 = 0;
            end = length;
          } else {
            start2 = start2 == null ? 0 : toInteger(start2);
            end = end === undefined2 ? length : toInteger(end);
          }
          return baseSlice(array, start2, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return array && array.length ? baseUniq(array, undefined2, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined2, group);
          });
        }
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap2(value, interceptor2) {
          interceptor2(value);
          return value;
        }
        function thru(value, interceptor2) {
          return interceptor2(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start2 = length ? paths[0] : 0, value = this.__wrapped__, interceptor2 = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start2)) {
            return this.thru(interceptor2);
          }
          value = value.slice(start2, +start2 + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor2],
            "thisArg": undefined2
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined2);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined2) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone3 = wrapperClone(parent2);
            clone3.__index__ = 0;
            clone3.__values__ = undefined2;
            if (result2) {
              previous.__wrapped__ = clone3;
            } else {
              result2 = clone3;
            }
            var previous = clone3;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined2
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray3(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray3(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex3);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        function forEach(collection, iteratee2) {
          var func = isArray3(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray3(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString2(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path, args) {
          var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray3(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray3(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined2 : orders;
          if (!isArray3(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray3(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray3(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray3(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray3(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray3(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray3(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size2(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString2(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray3(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined2 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined2;
            }
            return result2;
          };
        }
        var bind3 = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind3));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce2(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject2(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined2;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined2;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined2;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined2) {
              clearTimeout2(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined2;
          }
          function flush() {
            return timerId === undefined2 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined2) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout2(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined2) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay3 = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once2(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray3(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index = -1, length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
        });
        function rest(func, start2) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start2 = start2 === undefined2 ? start2 : toInteger(start2);
          return baseRest(func, start2);
        }
        function spread(func, start2) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start2 = start2 == null ? 0 : nativeMax(toInteger(start2), 0);
          return baseRest(function(args) {
            var array = args[start2], otherArgs = castSlice(args, 0, start2);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle2(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject2(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce2(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray3(value) ? value : [value];
        }
        function clone2(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(function() {
          return arguments;
        }()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray3 = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray3(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty2.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          var result2 = customizer ? customizer(value, other) : undefined2;
          return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        function isFinite(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction(value) {
          if (!isObject2(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject2(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        var isMap2 = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN2(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty2.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString2(value) {
          return typeof value == "string" || !isArray3(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol2(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined2;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString2(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol2(value)) {
            return NAN;
          }
          if (isObject2(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject2(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString(value) {
          return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty2.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty2.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined2, customDefaultsMerge);
          return apply(mergeWith, undefined2, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get3(object, path, defaultValue) {
          var result2 = object == null ? undefined2 : baseGet(object, path);
          return result2 === undefined2 ? defaultValue : result2;
        }
        function has2(object, path) {
          return object != null && hasPath(object, path, baseHas);
        }
        function hasIn(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty2.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path) {
            path = castPath(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object, path, defaultValue) {
          path = castPath(path, object);
          var index = -1, length = path.length;
          if (!length) {
            length = 1;
            object = undefined2;
          }
          while (++index < length) {
            var value = object == null ? undefined2 : object[toKey(path[index])];
            if (value === undefined2) {
              index = length;
              value = defaultValue;
            }
            object = isFunction(value) ? value.call(object) : value;
          }
          return object;
        }
        function set3(object, path, value) {
          return object == null ? object : baseSet(object, path, value);
        }
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseSet(object, path, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray3(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject2(object)) {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
            return iteratee2(accumulator, value, index, object2);
          });
          return accumulator;
        }
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        function update(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined2) {
            upper = lower;
            lower = undefined2;
          }
          if (upper !== undefined2) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined2) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start2, end) {
          start2 = toFinite(start2);
          if (end === undefined2) {
            end = start2;
            start2 = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start2, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined2;
          }
          if (floating === undefined2) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined2;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined2;
            }
          }
          if (lower === undefined2 && upper === undefined2) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined2) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase3 = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize2(word) : word);
        });
        function capitalize2(string) {
          return upperFirst(toString(string).toLowerCase());
        }
        function deburr(string) {
          string = toString(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        var kebabCase3 = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString(string), n);
        }
        function replace() {
          var args = arguments, string = toString(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined2;
          }
          limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined2;
          }
          string = toString(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty2.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty2.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString(value).toLowerCase();
        }
        function toUpper(value) {
          return toString(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start2 = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start2, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start2 = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start2).join("");
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject2(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined2) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        function unescape(string) {
          string = toString(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString(string);
          pattern = guard ? undefined2 : pattern;
          if (pattern === undefined2) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined2, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object, key, bind3(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches2(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function(path, args) {
          return function(object) {
            return baseInvoke(object, path, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path) {
            return baseInvoke(object, path, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject2(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        function noop() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function(path) {
            return object == null ? undefined2 : baseGet(object, path);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n) {
            iteratee2(index);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray3(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol2(value) ? [value] : copyArray(stringToPath(toString(value)));
        }
        function uniqueId(prefix2) {
          var id = ++idCounter;
          return toString(prefix2) + id;
        }
        var add2 = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
        }
        function mean(array) {
          return baseMean(array, identity);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind3;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce2;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay3;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatMap = flatMap;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches2;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once2;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.reverse = reverse;
        lodash.sampleSize = sampleSize;
        lodash.set = set3;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap2;
        lodash.throttle = throttle2;
        lodash.thru = thru;
        lodash.toArray = toArray;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update;
        lodash.updateWith = updateWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin(lodash, lodash);
        lodash.add = add2;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase3;
        lodash.capitalize = capitalize2;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone2;
        lodash.cloneDeep = cloneDeep;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex3;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.floor = floor;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get3;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has2;
        lodash.hasIn = hasIn;
        lodash.head = head;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray3;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap2;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN2;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject2;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet;
        lodash.isString = isString2;
        lodash.isSymbol = isSymbol2;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join;
        lodash.kebabCase = kebabCase3;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.maxBy = maxBy;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min;
        lodash.minBy = minBy;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt2;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext2;
        lodash.sample = sample;
        lodash.size = size2;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin(lodash, function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!hasOwnProperty2.call(lodash.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start2, end) {
          start2 = toInteger(start2);
          var result2 = this;
          if (result2.__filtered__ && (start2 > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start2 < 0) {
            result2 = result2.takeRight(-start2);
          } else if (start2) {
            result2 = result2.drop(start2);
          }
          if (end !== undefined2) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start2);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray3(value);
            var interceptor2 = function(value2) {
              var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor2], "thisArg": undefined2 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor2);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray3(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray3(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty2.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined2
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
          lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
      };
      var _ = runInContext();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = _;
        define(function() {
          return _;
        });
      } else if (freeModule) {
        (freeModule.exports = _)._ = _;
        freeExports._ = _;
      } else {
        root._ = _;
      }
    }).call(exports);
  }
});

// node_modules/tom-select/dist/js/tom-select.complete.js
var require_tom_select_complete = __commonJS({
  "node_modules/tom-select/dist/js/tom-select.complete.js"(exports, module2) {
    "use strict";
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.TomSelect = factory());
    })(exports, function() {
      "use strict";
      function forEvents(events, callback) {
        events.split(/\s+/).forEach((event) => {
          callback(event);
        });
      }
      class MicroEvent {
        constructor() {
          this._events = void 0;
          this._events = {};
        }
        on(events, fct) {
          forEvents(events, (event) => {
            const event_array = this._events[event] || [];
            event_array.push(fct);
            this._events[event] = event_array;
          });
        }
        off(events, fct) {
          var n = arguments.length;
          if (n === 0) {
            this._events = {};
            return;
          }
          forEvents(events, (event) => {
            if (n === 1) {
              delete this._events[event];
              return;
            }
            const event_array = this._events[event];
            if (event_array === void 0)
              return;
            event_array.splice(event_array.indexOf(fct), 1);
            this._events[event] = event_array;
          });
        }
        trigger(events, ...args) {
          var self2 = this;
          forEvents(events, (event) => {
            const event_array = self2._events[event];
            if (event_array === void 0)
              return;
            event_array.forEach((fct) => {
              fct.apply(self2, args);
            });
          });
        }
      }
      function MicroPlugin(Interface) {
        Interface.plugins = {};
        return class extends Interface {
          constructor(...args) {
            super(...args);
            this.plugins = {
              names: [],
              settings: {},
              requested: {},
              loaded: {}
            };
          }
          /**
           * Registers a plugin.
           *
           * @param {function} fn
           */
          static define(name, fn) {
            Interface.plugins[name] = {
              "name": name,
              "fn": fn
            };
          }
          /**
           * Initializes the listed plugins (with options).
           * Acceptable formats:
           *
           * List (without options):
           *   ['a', 'b', 'c']
           *
           * List (with options):
           *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
           *
           * Hash (with options):
           *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
           *
           * @param {array|object} plugins
           */
          initializePlugins(plugins) {
            var key, name;
            const self2 = this;
            const queue2 = [];
            if (Array.isArray(plugins)) {
              plugins.forEach((plugin2) => {
                if (typeof plugin2 === "string") {
                  queue2.push(plugin2);
                } else {
                  self2.plugins.settings[plugin2.name] = plugin2.options;
                  queue2.push(plugin2.name);
                }
              });
            } else if (plugins) {
              for (key in plugins) {
                if (plugins.hasOwnProperty(key)) {
                  self2.plugins.settings[key] = plugins[key];
                  queue2.push(key);
                }
              }
            }
            while (name = queue2.shift()) {
              self2.require(name);
            }
          }
          loadPlugin(name) {
            var self2 = this;
            var plugins = self2.plugins;
            var plugin2 = Interface.plugins[name];
            if (!Interface.plugins.hasOwnProperty(name)) {
              throw new Error('Unable to find "' + name + '" plugin');
            }
            plugins.requested[name] = true;
            plugins.loaded[name] = plugin2.fn.apply(self2, [self2.plugins.settings[name] || {}]);
            plugins.names.push(name);
          }
          /**
           * Initializes a plugin.
           *
           */
          require(name) {
            var self2 = this;
            var plugins = self2.plugins;
            if (!self2.plugins.loaded.hasOwnProperty(name)) {
              if (plugins.requested[name]) {
                throw new Error('Plugin has circular dependency ("' + name + '")');
              }
              self2.loadPlugin(name);
            }
            return plugins.loaded[name];
          }
        };
      }
      const arrayToPattern = (chars) => {
        chars = chars.filter(Boolean);
        if (chars.length < 2) {
          return chars[0] || "";
        }
        return maxValueLength(chars) == 1 ? "[" + chars.join("") + "]" : "(?:" + chars.join("|") + ")";
      };
      const sequencePattern = (array) => {
        if (!hasDuplicates(array)) {
          return array.join("");
        }
        let pattern = "";
        let prev_char_count = 0;
        const prev_pattern = () => {
          if (prev_char_count > 1) {
            pattern += "{" + prev_char_count + "}";
          }
        };
        array.forEach((char, i) => {
          if (char === array[i - 1]) {
            prev_char_count++;
            return;
          }
          prev_pattern();
          pattern += char;
          prev_char_count = 1;
        });
        prev_pattern();
        return pattern;
      };
      const setToPattern = (chars) => {
        let array = toArray(chars);
        return arrayToPattern(array);
      };
      const hasDuplicates = (array) => {
        return new Set(array).size !== array.length;
      };
      const escape_regex = (str) => {
        return (str + "").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu, "\\$1");
      };
      const maxValueLength = (array) => {
        return array.reduce((longest, value) => Math.max(longest, unicodeLength(value)), 0);
      };
      const unicodeLength = (str) => {
        return toArray(str).length;
      };
      const toArray = (p) => Array.from(p);
      const allSubstrings = (input) => {
        if (input.length === 1)
          return [[input]];
        let result = [];
        const start2 = input.substring(1);
        const suba = allSubstrings(start2);
        suba.forEach(function(subresult) {
          let tmp = subresult.slice(0);
          tmp[0] = input.charAt(0) + tmp[0];
          result.push(tmp);
          tmp = subresult.slice(0);
          tmp.unshift(input.charAt(0));
          result.push(tmp);
        });
        return result;
      };
      const code_points = [[0, 65535]];
      const accent_pat = "[\u0300-\u036F\xB7\u02BE\u02BC]";
      let unicode_map;
      let multi_char_reg;
      const max_char_length = 3;
      const latin_convert = {};
      const latin_condensed = {
        "/": "\u2044\u2215",
        "0": "\u07C0",
        "a": "\u2C65\u0250\u0251",
        "aa": "\uA733",
        "ae": "\xE6\u01FD\u01E3",
        "ao": "\uA735",
        "au": "\uA737",
        "av": "\uA739\uA73B",
        "ay": "\uA73D",
        "b": "\u0180\u0253\u0183",
        "c": "\uA73F\u0188\u023C\u2184",
        "d": "\u0111\u0257\u0256\u1D05\u018C\uABB7\u0501\u0266",
        "e": "\u025B\u01DD\u1D07\u0247",
        "f": "\uA77C\u0192",
        "g": "\u01E5\u0260\uA7A1\u1D79\uA77F\u0262",
        "h": "\u0127\u2C68\u2C76\u0265",
        "i": "\u0268\u0131",
        "j": "\u0249\u0237",
        "k": "\u0199\u2C6A\uA741\uA743\uA745\uA7A3",
        "l": "\u0142\u019A\u026B\u2C61\uA749\uA747\uA781\u026D",
        "m": "\u0271\u026F\u03FB",
        "n": "\uA7A5\u019E\u0272\uA791\u1D0E\u043B\u0509",
        "o": "\xF8\u01FF\u0254\u0275\uA74B\uA74D\u1D11",
        "oe": "\u0153",
        "oi": "\u01A3",
        "oo": "\uA74F",
        "ou": "\u0223",
        "p": "\u01A5\u1D7D\uA751\uA753\uA755\u03C1",
        "q": "\uA757\uA759\u024B",
        "r": "\u024D\u027D\uA75B\uA7A7\uA783",
        "s": "\xDF\u023F\uA7A9\uA785\u0282",
        "t": "\u0167\u01AD\u0288\u2C66\uA787",
        "th": "\xFE",
        "tz": "\uA729",
        "u": "\u0289",
        "v": "\u028B\uA75F\u028C",
        "vy": "\uA761",
        "w": "\u2C73",
        "y": "\u01B4\u024F\u1EFF",
        "z": "\u01B6\u0225\u0240\u2C6C\uA763",
        "hv": "\u0195"
      };
      for (let latin in latin_condensed) {
        let unicode = latin_condensed[latin] || "";
        for (let i = 0; i < unicode.length; i++) {
          let char = unicode.substring(i, i + 1);
          latin_convert[char] = latin;
        }
      }
      const convert_pat = new RegExp(Object.keys(latin_convert).join("|") + "|" + accent_pat, "gu");
      const initialize = (_code_points) => {
        if (unicode_map !== void 0)
          return;
        unicode_map = generateMap(_code_points || code_points);
      };
      const normalize = (str, form = "NFKD") => str.normalize(form);
      const asciifold = (str) => {
        return toArray(str).reduce(
          /**
           * @param {string} result
           * @param {string} char
           */
          (result, char) => {
            return result + _asciifold(char);
          },
          ""
        );
      };
      const _asciifold = (str) => {
        str = normalize(str).toLowerCase().replace(convert_pat, (char) => {
          return latin_convert[char] || "";
        });
        return normalize(str, "NFC");
      };
      function* generator(code_points2) {
        for (const [code_point_min, code_point_max] of code_points2) {
          for (let i = code_point_min; i <= code_point_max; i++) {
            let composed = String.fromCharCode(i);
            let folded = asciifold(composed);
            if (folded == composed.toLowerCase()) {
              continue;
            }
            if (folded.length > max_char_length) {
              continue;
            }
            if (folded.length == 0) {
              continue;
            }
            yield {
              folded,
              composed,
              code_point: i
            };
          }
        }
      }
      const generateSets = (code_points2) => {
        const unicode_sets = {};
        const addMatching = (folded, to_add) => {
          const folded_set = unicode_sets[folded] || /* @__PURE__ */ new Set();
          const patt = new RegExp("^" + setToPattern(folded_set) + "$", "iu");
          if (to_add.match(patt)) {
            return;
          }
          folded_set.add(escape_regex(to_add));
          unicode_sets[folded] = folded_set;
        };
        for (let value of generator(code_points2)) {
          addMatching(value.folded, value.folded);
          addMatching(value.folded, value.composed);
        }
        return unicode_sets;
      };
      const generateMap = (code_points2) => {
        const unicode_sets = generateSets(code_points2);
        const unicode_map2 = {};
        let multi_char = [];
        for (let folded in unicode_sets) {
          let set3 = unicode_sets[folded];
          if (set3) {
            unicode_map2[folded] = setToPattern(set3);
          }
          if (folded.length > 1) {
            multi_char.push(escape_regex(folded));
          }
        }
        multi_char.sort((a, b) => b.length - a.length);
        const multi_char_patt = arrayToPattern(multi_char);
        multi_char_reg = new RegExp("^" + multi_char_patt, "u");
        return unicode_map2;
      };
      const mapSequence = (strings, min_replacement = 1) => {
        let chars_replaced = 0;
        strings = strings.map((str) => {
          if (unicode_map[str]) {
            chars_replaced += str.length;
          }
          return unicode_map[str] || str;
        });
        if (chars_replaced >= min_replacement) {
          return sequencePattern(strings);
        }
        return "";
      };
      const substringsToPattern = (str, min_replacement = 1) => {
        min_replacement = Math.max(min_replacement, str.length - 1);
        return arrayToPattern(allSubstrings(str).map((sub_pat) => {
          return mapSequence(sub_pat, min_replacement);
        }));
      };
      const sequencesToPattern = (sequences, all = true) => {
        let min_replacement = sequences.length > 1 ? 1 : 0;
        return arrayToPattern(sequences.map((sequence) => {
          let seq = [];
          const len = all ? sequence.length() : sequence.length() - 1;
          for (let j = 0; j < len; j++) {
            seq.push(substringsToPattern(sequence.substrs[j] || "", min_replacement));
          }
          return sequencePattern(seq);
        }));
      };
      const inSequences = (needle_seq, sequences) => {
        for (const seq of sequences) {
          if (seq.start != needle_seq.start || seq.end != needle_seq.end) {
            continue;
          }
          if (seq.substrs.join("") !== needle_seq.substrs.join("")) {
            continue;
          }
          let needle_parts = needle_seq.parts;
          const filter = (part) => {
            for (const needle_part of needle_parts) {
              if (needle_part.start === part.start && needle_part.substr === part.substr) {
                return false;
              }
              if (part.length == 1 || needle_part.length == 1) {
                continue;
              }
              if (part.start < needle_part.start && part.end > needle_part.start) {
                return true;
              }
              if (needle_part.start < part.start && needle_part.end > part.start) {
                return true;
              }
            }
            return false;
          };
          let filtered = seq.parts.filter(filter);
          if (filtered.length > 0) {
            continue;
          }
          return true;
        }
        return false;
      };
      class Sequence {
        constructor() {
          this.parts = [];
          this.substrs = [];
          this.start = 0;
          this.end = 0;
        }
        /**
         * @param {TSequencePart|undefined} part
         */
        add(part) {
          if (part) {
            this.parts.push(part);
            this.substrs.push(part.substr);
            this.start = Math.min(part.start, this.start);
            this.end = Math.max(part.end, this.end);
          }
        }
        last() {
          return this.parts[this.parts.length - 1];
        }
        length() {
          return this.parts.length;
        }
        /**
         * @param {number} position
         * @param {TSequencePart} last_piece
         */
        clone(position, last_piece) {
          let clone2 = new Sequence();
          let parts = JSON.parse(JSON.stringify(this.parts));
          let last_part = parts.pop();
          for (const part of parts) {
            clone2.add(part);
          }
          let last_substr = last_piece.substr.substring(0, position - last_part.start);
          let clone_last_len = last_substr.length;
          clone2.add({
            start: last_part.start,
            end: last_part.start + clone_last_len,
            length: clone_last_len,
            substr: last_substr
          });
          return clone2;
        }
      }
      const getPattern = (str) => {
        initialize();
        str = asciifold(str);
        let pattern = "";
        let sequences = [new Sequence()];
        for (let i = 0; i < str.length; i++) {
          let substr = str.substring(i);
          let match = substr.match(multi_char_reg);
          const char = str.substring(i, i + 1);
          const match_str = match ? match[0] : null;
          let overlapping = [];
          let added_types = /* @__PURE__ */ new Set();
          for (const sequence of sequences) {
            const last_piece = sequence.last();
            if (!last_piece || last_piece.length == 1 || last_piece.end <= i) {
              if (match_str) {
                const len = match_str.length;
                sequence.add({
                  start: i,
                  end: i + len,
                  length: len,
                  substr: match_str
                });
                added_types.add("1");
              } else {
                sequence.add({
                  start: i,
                  end: i + 1,
                  length: 1,
                  substr: char
                });
                added_types.add("2");
              }
            } else if (match_str) {
              let clone2 = sequence.clone(i, last_piece);
              const len = match_str.length;
              clone2.add({
                start: i,
                end: i + len,
                length: len,
                substr: match_str
              });
              overlapping.push(clone2);
            } else {
              added_types.add("3");
            }
          }
          if (overlapping.length > 0) {
            overlapping = overlapping.sort((a, b) => {
              return a.length() - b.length();
            });
            for (let clone2 of overlapping) {
              if (inSequences(clone2, sequences)) {
                continue;
              }
              sequences.push(clone2);
            }
            continue;
          }
          if (i > 0 && added_types.size == 1 && !added_types.has("3")) {
            pattern += sequencesToPattern(sequences, false);
            let new_seq = new Sequence();
            const old_seq = sequences[0];
            if (old_seq) {
              new_seq.add(old_seq.last());
            }
            sequences = [new_seq];
          }
        }
        pattern += sequencesToPattern(sequences, true);
        return pattern;
      };
      const getAttr = (obj, name) => {
        if (!obj)
          return;
        return obj[name];
      };
      const getAttrNesting = (obj, name) => {
        if (!obj)
          return;
        var part, names = name.split(".");
        while ((part = names.shift()) && (obj = obj[part]))
          ;
        return obj;
      };
      const scoreValue = (value, token, weight) => {
        var score, pos;
        if (!value)
          return 0;
        value = value + "";
        if (token.regex == null)
          return 0;
        pos = value.search(token.regex);
        if (pos === -1)
          return 0;
        score = token.string.length / value.length;
        if (pos === 0)
          score += 0.5;
        return score * weight;
      };
      const propToArray = (obj, key) => {
        var value = obj[key];
        if (typeof value == "function")
          return value;
        if (value && !Array.isArray(value)) {
          obj[key] = [value];
        }
      };
      const iterate$1 = (object, callback) => {
        if (Array.isArray(object)) {
          object.forEach(callback);
        } else {
          for (var key in object) {
            if (object.hasOwnProperty(key)) {
              callback(object[key], key);
            }
          }
        }
      };
      const cmp = (a, b) => {
        if (typeof a === "number" && typeof b === "number") {
          return a > b ? 1 : a < b ? -1 : 0;
        }
        a = asciifold(a + "").toLowerCase();
        b = asciifold(b + "").toLowerCase();
        if (a > b)
          return 1;
        if (b > a)
          return -1;
        return 0;
      };
      class Sifter {
        // []|{};
        /**
         * Textually searches arrays and hashes of objects
         * by property (or multiple properties). Designed
         * specifically for autocomplete.
         *
         */
        constructor(items, settings) {
          this.items = void 0;
          this.settings = void 0;
          this.items = items;
          this.settings = settings || {
            diacritics: true
          };
        }
        /**
         * Splits a search string into an array of individual
         * regexps to be used to match results.
         *
         */
        tokenize(query, respect_word_boundaries, weights) {
          if (!query || !query.length)
            return [];
          const tokens = [];
          const words = query.split(/\s+/);
          var field_regex;
          if (weights) {
            field_regex = new RegExp("^(" + Object.keys(weights).map(escape_regex).join("|") + "):(.*)$");
          }
          words.forEach((word) => {
            let field_match;
            let field = null;
            let regex = null;
            if (field_regex && (field_match = word.match(field_regex))) {
              field = field_match[1];
              word = field_match[2];
            }
            if (word.length > 0) {
              if (this.settings.diacritics) {
                regex = getPattern(word) || null;
              } else {
                regex = escape_regex(word);
              }
              if (regex && respect_word_boundaries)
                regex = "\\b" + regex;
            }
            tokens.push({
              string: word,
              regex: regex ? new RegExp(regex, "iu") : null,
              field
            });
          });
          return tokens;
        }
        /**
         * Returns a function to be used to score individual results.
         *
         * Good matches will have a higher score than poor matches.
         * If an item is not a match, 0 will be returned by the function.
         *
         * @returns {T.ScoreFn}
         */
        getScoreFunction(query, options) {
          var search = this.prepareSearch(query, options);
          return this._getScoreFunction(search);
        }
        /**
         * @returns {T.ScoreFn}
         *
         */
        _getScoreFunction(search) {
          const tokens = search.tokens, token_count = tokens.length;
          if (!token_count) {
            return function() {
              return 0;
            };
          }
          const fields = search.options.fields, weights = search.weights, field_count = fields.length, getAttrFn = search.getAttrFn;
          if (!field_count) {
            return function() {
              return 1;
            };
          }
          const scoreObject = function() {
            if (field_count === 1) {
              return function(token, data2) {
                const field = fields[0].field;
                return scoreValue(getAttrFn(data2, field), token, weights[field] || 1);
              };
            }
            return function(token, data2) {
              var sum = 0;
              if (token.field) {
                const value = getAttrFn(data2, token.field);
                if (!token.regex && value) {
                  sum += 1 / field_count;
                } else {
                  sum += scoreValue(value, token, 1);
                }
              } else {
                iterate$1(weights, (weight, field) => {
                  sum += scoreValue(getAttrFn(data2, field), token, weight);
                });
              }
              return sum / field_count;
            };
          }();
          if (token_count === 1) {
            return function(data2) {
              return scoreObject(tokens[0], data2);
            };
          }
          if (search.options.conjunction === "and") {
            return function(data2) {
              var score, sum = 0;
              for (let token of tokens) {
                score = scoreObject(token, data2);
                if (score <= 0)
                  return 0;
                sum += score;
              }
              return sum / token_count;
            };
          } else {
            return function(data2) {
              var sum = 0;
              iterate$1(tokens, (token) => {
                sum += scoreObject(token, data2);
              });
              return sum / token_count;
            };
          }
        }
        /**
         * Returns a function that can be used to compare two
         * results, for sorting purposes. If no sorting should
         * be performed, `null` will be returned.
         *
         * @return function(a,b)
         */
        getSortFunction(query, options) {
          var search = this.prepareSearch(query, options);
          return this._getSortFunction(search);
        }
        _getSortFunction(search) {
          var implicit_score, sort_flds = [];
          const self2 = this, options = search.options, sort = !search.query && options.sort_empty ? options.sort_empty : options.sort;
          if (typeof sort == "function") {
            return sort.bind(this);
          }
          const get_field = function get_field2(name, result) {
            if (name === "$score")
              return result.score;
            return search.getAttrFn(self2.items[result.id], name);
          };
          if (sort) {
            for (let s of sort) {
              if (search.query || s.field !== "$score") {
                sort_flds.push(s);
              }
            }
          }
          if (search.query) {
            implicit_score = true;
            for (let fld of sort_flds) {
              if (fld.field === "$score") {
                implicit_score = false;
                break;
              }
            }
            if (implicit_score) {
              sort_flds.unshift({
                field: "$score",
                direction: "desc"
              });
            }
          } else {
            sort_flds = sort_flds.filter((fld) => fld.field !== "$score");
          }
          const sort_flds_count = sort_flds.length;
          if (!sort_flds_count) {
            return null;
          }
          return function(a, b) {
            var result, field;
            for (let sort_fld of sort_flds) {
              field = sort_fld.field;
              let multiplier = sort_fld.direction === "desc" ? -1 : 1;
              result = multiplier * cmp(get_field(field, a), get_field(field, b));
              if (result)
                return result;
            }
            return 0;
          };
        }
        /**
         * Parses a search query and returns an object
         * with tokens and fields ready to be populated
         * with results.
         *
         */
        prepareSearch(query, optsUser) {
          const weights = {};
          var options = Object.assign({}, optsUser);
          propToArray(options, "sort");
          propToArray(options, "sort_empty");
          if (options.fields) {
            propToArray(options, "fields");
            const fields = [];
            options.fields.forEach((field) => {
              if (typeof field == "string") {
                field = {
                  field,
                  weight: 1
                };
              }
              fields.push(field);
              weights[field.field] = "weight" in field ? field.weight : 1;
            });
            options.fields = fields;
          }
          return {
            options,
            query: query.toLowerCase().trim(),
            tokens: this.tokenize(query, options.respect_word_boundaries, weights),
            total: 0,
            items: [],
            weights,
            getAttrFn: options.nesting ? getAttrNesting : getAttr
          };
        }
        /**
         * Searches through all items and returns a sorted array of matches.
         *
         */
        search(query, options) {
          var self2 = this, score, search;
          search = this.prepareSearch(query, options);
          options = search.options;
          query = search.query;
          const fn_score = options.score || self2._getScoreFunction(search);
          if (query.length) {
            iterate$1(self2.items, (item, id) => {
              score = fn_score(item);
              if (options.filter === false || score > 0) {
                search.items.push({
                  "score": score,
                  "id": id
                });
              }
            });
          } else {
            iterate$1(self2.items, (_, id) => {
              search.items.push({
                "score": 1,
                "id": id
              });
            });
          }
          const fn_sort = self2._getSortFunction(search);
          if (fn_sort)
            search.items.sort(fn_sort);
          search.total = search.items.length;
          if (typeof options.limit === "number") {
            search.items = search.items.slice(0, options.limit);
          }
          return search;
        }
      }
      const iterate = (object, callback) => {
        if (Array.isArray(object)) {
          object.forEach(callback);
        } else {
          for (var key in object) {
            if (object.hasOwnProperty(key)) {
              callback(object[key], key);
            }
          }
        }
      };
      const getDom = (query) => {
        if (query.jquery) {
          return query[0];
        }
        if (query instanceof HTMLElement) {
          return query;
        }
        if (isHtmlString(query)) {
          var tpl = document.createElement("template");
          tpl.innerHTML = query.trim();
          return tpl.content.firstChild;
        }
        return document.querySelector(query);
      };
      const isHtmlString = (arg) => {
        if (typeof arg === "string" && arg.indexOf("<") > -1) {
          return true;
        }
        return false;
      };
      const escapeQuery = (query) => {
        return query.replace(/['"\\]/g, "\\$&");
      };
      const triggerEvent = (dom_el, event_name) => {
        var event = document.createEvent("HTMLEvents");
        event.initEvent(event_name, true, false);
        dom_el.dispatchEvent(event);
      };
      const applyCSS = (dom_el, css) => {
        Object.assign(dom_el.style, css);
      };
      const addClasses = (elmts, ...classes) => {
        var norm_classes = classesArray(classes);
        elmts = castAsArray(elmts);
        elmts.map((el) => {
          norm_classes.map((cls) => {
            el.classList.add(cls);
          });
        });
      };
      const removeClasses = (elmts, ...classes) => {
        var norm_classes = classesArray(classes);
        elmts = castAsArray(elmts);
        elmts.map((el) => {
          norm_classes.map((cls) => {
            el.classList.remove(cls);
          });
        });
      };
      const classesArray = (args) => {
        var classes = [];
        iterate(args, (_classes) => {
          if (typeof _classes === "string") {
            _classes = _classes.trim().split(/[\11\12\14\15\40]/);
          }
          if (Array.isArray(_classes)) {
            classes = classes.concat(_classes);
          }
        });
        return classes.filter(Boolean);
      };
      const castAsArray = (arg) => {
        if (!Array.isArray(arg)) {
          arg = [arg];
        }
        return arg;
      };
      const parentMatch = (target, selector, wrapper) => {
        if (wrapper && !wrapper.contains(target)) {
          return;
        }
        while (target && target.matches) {
          if (target.matches(selector)) {
            return target;
          }
          target = target.parentNode;
        }
      };
      const getTail = (list, direction = 0) => {
        if (direction > 0) {
          return list[list.length - 1];
        }
        return list[0];
      };
      const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
      };
      const nodeIndex = (el, amongst) => {
        if (!el)
          return -1;
        amongst = amongst || el.nodeName;
        var i = 0;
        while (el = el.previousElementSibling) {
          if (el.matches(amongst)) {
            i++;
          }
        }
        return i;
      };
      const setAttr = (el, attrs) => {
        iterate(attrs, (val, attr) => {
          if (val == null) {
            el.removeAttribute(attr);
          } else {
            el.setAttribute(attr, "" + val);
          }
        });
      };
      const replaceNode = (existing, replacement) => {
        if (existing.parentNode)
          existing.parentNode.replaceChild(replacement, existing);
      };
      const highlight = (element, regex) => {
        if (regex === null)
          return;
        if (typeof regex === "string") {
          if (!regex.length)
            return;
          regex = new RegExp(regex, "i");
        }
        const highlightText = (node) => {
          var match = node.data.match(regex);
          if (match && node.data.length > 0) {
            var spannode = document.createElement("span");
            spannode.className = "highlight";
            var middlebit = node.splitText(match.index);
            middlebit.splitText(match[0].length);
            var middleclone = middlebit.cloneNode(true);
            spannode.appendChild(middleclone);
            replaceNode(middlebit, spannode);
            return 1;
          }
          return 0;
        };
        const highlightChildren = (node) => {
          if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && (node.className !== "highlight" || node.tagName !== "SPAN")) {
            Array.from(node.childNodes).forEach((element2) => {
              highlightRecursive(element2);
            });
          }
        };
        const highlightRecursive = (node) => {
          if (node.nodeType === 3) {
            return highlightText(node);
          }
          highlightChildren(node);
          return 0;
        };
        highlightRecursive(element);
      };
      const removeHighlight = (el) => {
        var elements = el.querySelectorAll("span.highlight");
        Array.prototype.forEach.call(elements, function(el2) {
          var parent = el2.parentNode;
          parent.replaceChild(el2.firstChild, el2);
          parent.normalize();
        });
      };
      const KEY_A = 65;
      const KEY_RETURN = 13;
      const KEY_ESC = 27;
      const KEY_LEFT = 37;
      const KEY_UP = 38;
      const KEY_RIGHT = 39;
      const KEY_DOWN = 40;
      const KEY_BACKSPACE = 8;
      const KEY_DELETE = 46;
      const KEY_TAB = 9;
      const IS_MAC = typeof navigator === "undefined" ? false : /Mac/.test(navigator.userAgent);
      const KEY_SHORTCUT = IS_MAC ? "metaKey" : "ctrlKey";
      var defaults = {
        options: [],
        optgroups: [],
        plugins: [],
        delimiter: ",",
        splitOn: null,
        // regexp or string for splitting up values from a paste command
        persist: true,
        diacritics: true,
        create: null,
        createOnBlur: false,
        createFilter: null,
        highlight: true,
        openOnFocus: true,
        shouldOpen: null,
        maxOptions: 50,
        maxItems: null,
        hideSelected: null,
        duplicates: false,
        addPrecedence: false,
        selectOnTab: false,
        preload: null,
        allowEmptyOption: false,
        //closeAfterSelect: false,
        loadThrottle: 300,
        loadingClass: "loading",
        dataAttr: null,
        //'data-data',
        optgroupField: "optgroup",
        valueField: "value",
        labelField: "text",
        disabledField: "disabled",
        optgroupLabelField: "label",
        optgroupValueField: "value",
        lockOptgroupOrder: false,
        sortField: "$order",
        searchField: ["text"],
        searchConjunction: "and",
        mode: null,
        wrapperClass: "ts-wrapper",
        controlClass: "ts-control",
        dropdownClass: "ts-dropdown",
        dropdownContentClass: "ts-dropdown-content",
        itemClass: "item",
        optionClass: "option",
        dropdownParent: null,
        controlInput: '<input type="text" autocomplete="off" size="1" />',
        copyClassesToDropdown: false,
        placeholder: null,
        hidePlaceholder: null,
        shouldLoad: function(query) {
          return query.length > 0;
        },
        /*
        load                 : null, // function(query, callback) { ... }
        score                : null, // function(search) { ... }
        onInitialize         : null, // function() { ... }
        onChange             : null, // function(value) { ... }
        onItemAdd            : null, // function(value, $item) { ... }
        onItemRemove         : null, // function(value) { ... }
        onClear              : null, // function() { ... }
        onOptionAdd          : null, // function(value, data) { ... }
        onOptionRemove       : null, // function(value) { ... }
        onOptionClear        : null, // function() { ... }
        onOptionGroupAdd     : null, // function(id, data) { ... }
        onOptionGroupRemove  : null, // function(id) { ... }
        onOptionGroupClear   : null, // function() { ... }
        onDropdownOpen       : null, // function(dropdown) { ... }
        onDropdownClose      : null, // function(dropdown) { ... }
        onType               : null, // function(str) { ... }
        onDelete             : null, // function(values) { ... }
        */
        render: {
          /*
          item: null,
          optgroup: null,
          optgroup_header: null,
          option: null,
          option_create: null
          */
        }
      };
      const hash_key = (value) => {
        if (typeof value === "undefined" || value === null)
          return null;
        return get_hash(value);
      };
      const get_hash = (value) => {
        if (typeof value === "boolean")
          return value ? "1" : "0";
        return value + "";
      };
      const escape_html = (str) => {
        return (str + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      };
      const loadDebounce = (fn, delay3) => {
        var timeout;
        return function(value, callback) {
          var self2 = this;
          if (timeout) {
            self2.loading = Math.max(self2.loading - 1, 0);
            clearTimeout(timeout);
          }
          timeout = setTimeout(function() {
            timeout = null;
            self2.loadedSearches[value] = true;
            fn.call(self2, value, callback);
          }, delay3);
        };
      };
      const debounce_events = (self2, types, fn) => {
        var type;
        var trigger2 = self2.trigger;
        var event_args = {};
        self2.trigger = function() {
          var type2 = arguments[0];
          if (types.indexOf(type2) !== -1) {
            event_args[type2] = arguments;
          } else {
            return trigger2.apply(self2, arguments);
          }
        };
        fn.apply(self2, []);
        self2.trigger = trigger2;
        for (type of types) {
          if (type in event_args) {
            trigger2.apply(self2, event_args[type]);
          }
        }
      };
      const getSelection = (input) => {
        return {
          start: input.selectionStart || 0,
          length: (input.selectionEnd || 0) - (input.selectionStart || 0)
        };
      };
      const preventDefault = (evt, stop2 = false) => {
        if (evt) {
          evt.preventDefault();
          if (stop2) {
            evt.stopPropagation();
          }
        }
      };
      const addEvent = (target, type, callback, options) => {
        target.addEventListener(type, callback, options);
      };
      const isKeyDown = (key_name, evt) => {
        if (!evt) {
          return false;
        }
        if (!evt[key_name]) {
          return false;
        }
        var count = (evt.altKey ? 1 : 0) + (evt.ctrlKey ? 1 : 0) + (evt.shiftKey ? 1 : 0) + (evt.metaKey ? 1 : 0);
        if (count === 1) {
          return true;
        }
        return false;
      };
      const getId = (el, id) => {
        const existing_id = el.getAttribute("id");
        if (existing_id) {
          return existing_id;
        }
        el.setAttribute("id", id);
        return id;
      };
      const addSlashes = (str) => {
        return str.replace(/[\\"']/g, "\\$&");
      };
      const append = (parent, node) => {
        if (node)
          parent.append(node);
      };
      function getSettings(input, settings_user) {
        var settings = Object.assign({}, defaults, settings_user);
        var attr_data = settings.dataAttr;
        var field_label = settings.labelField;
        var field_value = settings.valueField;
        var field_disabled = settings.disabledField;
        var field_optgroup = settings.optgroupField;
        var field_optgroup_label = settings.optgroupLabelField;
        var field_optgroup_value = settings.optgroupValueField;
        var tag_name = input.tagName.toLowerCase();
        var placeholder = input.getAttribute("placeholder") || input.getAttribute("data-placeholder");
        if (!placeholder && !settings.allowEmptyOption) {
          let option = input.querySelector('option[value=""]');
          if (option) {
            placeholder = option.textContent;
          }
        }
        var settings_element = {
          placeholder,
          options: [],
          optgroups: [],
          items: [],
          maxItems: null
        };
        var init_select = () => {
          var tagName;
          var options = settings_element.options;
          var optionsMap = {};
          var group_count = 1;
          var readData = (el) => {
            var data2 = Object.assign({}, el.dataset);
            var json = attr_data && data2[attr_data];
            if (typeof json === "string" && json.length) {
              data2 = Object.assign(data2, JSON.parse(json));
            }
            return data2;
          };
          var addOption = (option, group) => {
            var value = hash_key(option.value);
            if (value == null)
              return;
            if (!value && !settings.allowEmptyOption)
              return;
            if (optionsMap.hasOwnProperty(value)) {
              if (group) {
                var arr = optionsMap[value][field_optgroup];
                if (!arr) {
                  optionsMap[value][field_optgroup] = group;
                } else if (!Array.isArray(arr)) {
                  optionsMap[value][field_optgroup] = [arr, group];
                } else {
                  arr.push(group);
                }
              }
            } else {
              var option_data = readData(option);
              option_data[field_label] = option_data[field_label] || option.textContent;
              option_data[field_value] = option_data[field_value] || value;
              option_data[field_disabled] = option_data[field_disabled] || option.disabled;
              option_data[field_optgroup] = option_data[field_optgroup] || group;
              option_data.$option = option;
              optionsMap[value] = option_data;
              options.push(option_data);
            }
            if (option.selected) {
              settings_element.items.push(value);
            }
          };
          var addGroup = (optgroup) => {
            var id, optgroup_data;
            optgroup_data = readData(optgroup);
            optgroup_data[field_optgroup_label] = optgroup_data[field_optgroup_label] || optgroup.getAttribute("label") || "";
            optgroup_data[field_optgroup_value] = optgroup_data[field_optgroup_value] || group_count++;
            optgroup_data[field_disabled] = optgroup_data[field_disabled] || optgroup.disabled;
            settings_element.optgroups.push(optgroup_data);
            id = optgroup_data[field_optgroup_value];
            iterate(optgroup.children, (option) => {
              addOption(option, id);
            });
          };
          settings_element.maxItems = input.hasAttribute("multiple") ? null : 1;
          iterate(input.children, (child) => {
            tagName = child.tagName.toLowerCase();
            if (tagName === "optgroup") {
              addGroup(child);
            } else if (tagName === "option") {
              addOption(child);
            }
          });
        };
        var init_textbox = () => {
          const data_raw = input.getAttribute(attr_data);
          if (!data_raw) {
            var value = input.value.trim() || "";
            if (!settings.allowEmptyOption && !value.length)
              return;
            const values = value.split(settings.delimiter);
            iterate(values, (value2) => {
              const option = {};
              option[field_label] = value2;
              option[field_value] = value2;
              settings_element.options.push(option);
            });
            settings_element.items = values;
          } else {
            settings_element.options = JSON.parse(data_raw);
            iterate(settings_element.options, (opt) => {
              settings_element.items.push(opt[field_value]);
            });
          }
        };
        if (tag_name === "select") {
          init_select();
        } else {
          init_textbox();
        }
        return Object.assign({}, defaults, settings_element, settings_user);
      }
      var instance_i = 0;
      class TomSelect3 extends MicroPlugin(MicroEvent) {
        // @deprecated 1.8
        constructor(input_arg, user_settings) {
          super();
          this.control_input = void 0;
          this.wrapper = void 0;
          this.dropdown = void 0;
          this.control = void 0;
          this.dropdown_content = void 0;
          this.focus_node = void 0;
          this.order = 0;
          this.settings = void 0;
          this.input = void 0;
          this.tabIndex = void 0;
          this.is_select_tag = void 0;
          this.rtl = void 0;
          this.inputId = void 0;
          this._destroy = void 0;
          this.sifter = void 0;
          this.isOpen = false;
          this.isDisabled = false;
          this.isRequired = void 0;
          this.isInvalid = false;
          this.isValid = true;
          this.isLocked = false;
          this.isFocused = false;
          this.isInputHidden = false;
          this.isSetup = false;
          this.ignoreFocus = false;
          this.ignoreHover = false;
          this.hasOptions = false;
          this.currentResults = void 0;
          this.lastValue = "";
          this.caretPos = 0;
          this.loading = 0;
          this.loadedSearches = {};
          this.activeOption = null;
          this.activeItems = [];
          this.optgroups = {};
          this.options = {};
          this.userOptions = {};
          this.items = [];
          instance_i++;
          var dir;
          var input = getDom(input_arg);
          if (input.tomselect) {
            throw new Error("Tom Select already initialized on this element");
          }
          input.tomselect = this;
          var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
          dir = computedStyle.getPropertyValue("direction");
          const settings = getSettings(input, user_settings);
          this.settings = settings;
          this.input = input;
          this.tabIndex = input.tabIndex || 0;
          this.is_select_tag = input.tagName.toLowerCase() === "select";
          this.rtl = /rtl/i.test(dir);
          this.inputId = getId(input, "tomselect-" + instance_i);
          this.isRequired = input.required;
          this.sifter = new Sifter(this.options, {
            diacritics: settings.diacritics
          });
          settings.mode = settings.mode || (settings.maxItems === 1 ? "single" : "multi");
          if (typeof settings.hideSelected !== "boolean") {
            settings.hideSelected = settings.mode === "multi";
          }
          if (typeof settings.hidePlaceholder !== "boolean") {
            settings.hidePlaceholder = settings.mode !== "multi";
          }
          var filter = settings.createFilter;
          if (typeof filter !== "function") {
            if (typeof filter === "string") {
              filter = new RegExp(filter);
            }
            if (filter instanceof RegExp) {
              settings.createFilter = (input2) => filter.test(input2);
            } else {
              settings.createFilter = (value) => {
                return this.settings.duplicates || !this.options[value];
              };
            }
          }
          this.initializePlugins(settings.plugins);
          this.setupCallbacks();
          this.setupTemplates();
          const wrapper = getDom("<div>");
          const control = getDom("<div>");
          const dropdown = this._render("dropdown");
          const dropdown_content = getDom(`<div role="listbox" tabindex="-1">`);
          const classes = this.input.getAttribute("class") || "";
          const inputMode = settings.mode;
          var control_input;
          addClasses(wrapper, settings.wrapperClass, classes, inputMode);
          addClasses(control, settings.controlClass);
          append(wrapper, control);
          addClasses(dropdown, settings.dropdownClass, inputMode);
          if (settings.copyClassesToDropdown) {
            addClasses(dropdown, classes);
          }
          addClasses(dropdown_content, settings.dropdownContentClass);
          append(dropdown, dropdown_content);
          getDom(settings.dropdownParent || wrapper).appendChild(dropdown);
          if (isHtmlString(settings.controlInput)) {
            control_input = getDom(settings.controlInput);
            var attrs = ["autocorrect", "autocapitalize", "autocomplete"];
            iterate$1(attrs, (attr) => {
              if (input.getAttribute(attr)) {
                setAttr(control_input, {
                  [attr]: input.getAttribute(attr)
                });
              }
            });
            control_input.tabIndex = -1;
            control.appendChild(control_input);
            this.focus_node = control_input;
          } else if (settings.controlInput) {
            control_input = getDom(settings.controlInput);
            this.focus_node = control_input;
          } else {
            control_input = getDom("<input/>");
            this.focus_node = control;
          }
          this.wrapper = wrapper;
          this.dropdown = dropdown;
          this.dropdown_content = dropdown_content;
          this.control = control;
          this.control_input = control_input;
          this.setup();
        }
        /**
         * set up event bindings.
         *
         */
        setup() {
          const self2 = this;
          const settings = self2.settings;
          const control_input = self2.control_input;
          const dropdown = self2.dropdown;
          const dropdown_content = self2.dropdown_content;
          const wrapper = self2.wrapper;
          const control = self2.control;
          const input = self2.input;
          const focus_node = self2.focus_node;
          const passive_event = {
            passive: true
          };
          const listboxId = self2.inputId + "-ts-dropdown";
          setAttr(dropdown_content, {
            id: listboxId
          });
          setAttr(focus_node, {
            role: "combobox",
            "aria-haspopup": "listbox",
            "aria-expanded": "false",
            "aria-controls": listboxId
          });
          const control_id = getId(focus_node, self2.inputId + "-ts-control");
          const query = "label[for='" + escapeQuery(self2.inputId) + "']";
          const label = document.querySelector(query);
          const label_click = self2.focus.bind(self2);
          if (label) {
            addEvent(label, "click", label_click);
            setAttr(label, {
              for: control_id
            });
            const label_id = getId(label, self2.inputId + "-ts-label");
            setAttr(focus_node, {
              "aria-labelledby": label_id
            });
            setAttr(dropdown_content, {
              "aria-labelledby": label_id
            });
          }
          wrapper.style.width = input.style.width;
          if (self2.plugins.names.length) {
            const classes_plugins = "plugin-" + self2.plugins.names.join(" plugin-");
            addClasses([wrapper, dropdown], classes_plugins);
          }
          if ((settings.maxItems === null || settings.maxItems > 1) && self2.is_select_tag) {
            setAttr(input, {
              multiple: "multiple"
            });
          }
          if (settings.placeholder) {
            setAttr(control_input, {
              placeholder: settings.placeholder
            });
          }
          if (!settings.splitOn && settings.delimiter) {
            settings.splitOn = new RegExp("\\s*" + escape_regex(settings.delimiter) + "+\\s*");
          }
          if (settings.load && settings.loadThrottle) {
            settings.load = loadDebounce(settings.load, settings.loadThrottle);
          }
          self2.control_input.type = input.type;
          addEvent(dropdown, "mousemove", () => {
            self2.ignoreHover = false;
          });
          addEvent(dropdown, "mouseenter", (e) => {
            var target_match = parentMatch(e.target, "[data-selectable]", dropdown);
            if (target_match)
              self2.onOptionHover(e, target_match);
          }, {
            capture: true
          });
          addEvent(dropdown, "click", (evt) => {
            const option = parentMatch(evt.target, "[data-selectable]");
            if (option) {
              self2.onOptionSelect(evt, option);
              preventDefault(evt, true);
            }
          });
          addEvent(control, "click", (evt) => {
            var target_match = parentMatch(evt.target, "[data-ts-item]", control);
            if (target_match && self2.onItemSelect(evt, target_match)) {
              preventDefault(evt, true);
              return;
            }
            if (control_input.value != "") {
              return;
            }
            self2.onClick();
            preventDefault(evt, true);
          });
          addEvent(focus_node, "keydown", (e) => self2.onKeyDown(e));
          addEvent(control_input, "keypress", (e) => self2.onKeyPress(e));
          addEvent(control_input, "input", (e) => self2.onInput(e));
          addEvent(focus_node, "blur", (e) => self2.onBlur(e));
          addEvent(focus_node, "focus", (e) => self2.onFocus(e));
          addEvent(control_input, "paste", (e) => self2.onPaste(e));
          const doc_mousedown = (evt) => {
            const target = evt.composedPath()[0];
            if (!wrapper.contains(target) && !dropdown.contains(target)) {
              if (self2.isFocused) {
                self2.blur();
              }
              self2.inputState();
              return;
            }
            if (target == control_input && self2.isOpen) {
              evt.stopPropagation();
            } else {
              preventDefault(evt, true);
            }
          };
          const win_scroll = () => {
            if (self2.isOpen) {
              self2.positionDropdown();
            }
          };
          addEvent(document, "mousedown", doc_mousedown);
          addEvent(window, "scroll", win_scroll, passive_event);
          addEvent(window, "resize", win_scroll, passive_event);
          this._destroy = () => {
            document.removeEventListener("mousedown", doc_mousedown);
            window.removeEventListener("scroll", win_scroll);
            window.removeEventListener("resize", win_scroll);
            if (label)
              label.removeEventListener("click", label_click);
          };
          this.revertSettings = {
            innerHTML: input.innerHTML,
            tabIndex: input.tabIndex
          };
          input.tabIndex = -1;
          input.insertAdjacentElement("afterend", self2.wrapper);
          self2.sync(false);
          settings.items = [];
          delete settings.optgroups;
          delete settings.options;
          addEvent(input, "invalid", () => {
            if (self2.isValid) {
              self2.isValid = false;
              self2.isInvalid = true;
              self2.refreshState();
            }
          });
          self2.updateOriginalInput();
          self2.refreshItems();
          self2.close(false);
          self2.inputState();
          self2.isSetup = true;
          if (input.disabled) {
            self2.disable();
          } else {
            self2.enable();
          }
          self2.on("change", this.onChange);
          addClasses(input, "tomselected", "ts-hidden-accessible");
          self2.trigger("initialize");
          if (settings.preload === true) {
            self2.preload();
          }
        }
        /**
         * Register options and optgroups
         *
         */
        setupOptions(options = [], optgroups2 = []) {
          this.addOptions(options);
          iterate$1(optgroups2, (optgroup) => {
            this.registerOptionGroup(optgroup);
          });
        }
        /**
         * Sets up default rendering functions.
         */
        setupTemplates() {
          var self2 = this;
          var field_label = self2.settings.labelField;
          var field_optgroup = self2.settings.optgroupLabelField;
          var templates = {
            "optgroup": (data2) => {
              let optgroup = document.createElement("div");
              optgroup.className = "optgroup";
              optgroup.appendChild(data2.options);
              return optgroup;
            },
            "optgroup_header": (data2, escape) => {
              return '<div class="optgroup-header">' + escape(data2[field_optgroup]) + "</div>";
            },
            "option": (data2, escape) => {
              return "<div>" + escape(data2[field_label]) + "</div>";
            },
            "item": (data2, escape) => {
              return "<div>" + escape(data2[field_label]) + "</div>";
            },
            "option_create": (data2, escape) => {
              return '<div class="create">Add <strong>' + escape(data2.input) + "</strong>&hellip;</div>";
            },
            "no_results": () => {
              return '<div class="no-results">No results found</div>';
            },
            "loading": () => {
              return '<div class="spinner"></div>';
            },
            "not_loading": () => {
            },
            "dropdown": () => {
              return "<div></div>";
            }
          };
          self2.settings.render = Object.assign({}, templates, self2.settings.render);
        }
        /**
         * Maps fired events to callbacks provided
         * in the settings used when creating the control.
         */
        setupCallbacks() {
          var key, fn;
          var callbacks = {
            "initialize": "onInitialize",
            "change": "onChange",
            "item_add": "onItemAdd",
            "item_remove": "onItemRemove",
            "item_select": "onItemSelect",
            "clear": "onClear",
            "option_add": "onOptionAdd",
            "option_remove": "onOptionRemove",
            "option_clear": "onOptionClear",
            "optgroup_add": "onOptionGroupAdd",
            "optgroup_remove": "onOptionGroupRemove",
            "optgroup_clear": "onOptionGroupClear",
            "dropdown_open": "onDropdownOpen",
            "dropdown_close": "onDropdownClose",
            "type": "onType",
            "load": "onLoad",
            "focus": "onFocus",
            "blur": "onBlur"
          };
          for (key in callbacks) {
            fn = this.settings[callbacks[key]];
            if (fn)
              this.on(key, fn);
          }
        }
        /**
         * Sync the Tom Select instance with the original input or select
         *
         */
        sync(get_settings = true) {
          const self2 = this;
          const settings = get_settings ? getSettings(self2.input, {
            delimiter: self2.settings.delimiter
          }) : self2.settings;
          self2.setupOptions(settings.options, settings.optgroups);
          self2.setValue(settings.items || [], true);
          self2.lastQuery = null;
        }
        /**
         * Triggered when the main control element
         * has a click event.
         *
         */
        onClick() {
          var self2 = this;
          if (self2.activeItems.length > 0) {
            self2.clearActiveItems();
            self2.focus();
            return;
          }
          if (self2.isFocused && self2.isOpen) {
            self2.blur();
          } else {
            self2.focus();
          }
        }
        /**
         * @deprecated v1.7
         *
         */
        onMouseDown() {
        }
        /**
         * Triggered when the value of the control has been changed.
         * This should propagate the event to the original DOM
         * input / select element.
         */
        onChange() {
          triggerEvent(this.input, "input");
          triggerEvent(this.input, "change");
        }
        /**
         * Triggered on <input> paste.
         *
         */
        onPaste(e) {
          var self2 = this;
          if (self2.isInputHidden || self2.isLocked) {
            preventDefault(e);
            return;
          }
          if (!self2.settings.splitOn) {
            return;
          }
          setTimeout(() => {
            var pastedText = self2.inputValue();
            if (!pastedText.match(self2.settings.splitOn)) {
              return;
            }
            var splitInput = pastedText.trim().split(self2.settings.splitOn);
            iterate$1(splitInput, (piece) => {
              const hash = hash_key(piece);
              if (hash) {
                if (this.options[piece]) {
                  self2.addItem(piece);
                } else {
                  self2.createItem(piece);
                }
              }
            });
          }, 0);
        }
        /**
         * Triggered on <input> keypress.
         *
         */
        onKeyPress(e) {
          var self2 = this;
          if (self2.isLocked) {
            preventDefault(e);
            return;
          }
          var character = String.fromCharCode(e.keyCode || e.which);
          if (self2.settings.create && self2.settings.mode === "multi" && character === self2.settings.delimiter) {
            self2.createItem();
            preventDefault(e);
            return;
          }
        }
        /**
         * Triggered on <input> keydown.
         *
         */
        onKeyDown(e) {
          var self2 = this;
          self2.ignoreHover = true;
          if (self2.isLocked) {
            if (e.keyCode !== KEY_TAB) {
              preventDefault(e);
            }
            return;
          }
          switch (e.keyCode) {
            case KEY_A:
              if (isKeyDown(KEY_SHORTCUT, e)) {
                if (self2.control_input.value == "") {
                  preventDefault(e);
                  self2.selectAll();
                  return;
                }
              }
              break;
            case KEY_ESC:
              if (self2.isOpen) {
                preventDefault(e, true);
                self2.close();
              }
              self2.clearActiveItems();
              return;
            case KEY_DOWN:
              if (!self2.isOpen && self2.hasOptions) {
                self2.open();
              } else if (self2.activeOption) {
                let next = self2.getAdjacent(self2.activeOption, 1);
                if (next)
                  self2.setActiveOption(next);
              }
              preventDefault(e);
              return;
            case KEY_UP:
              if (self2.activeOption) {
                let prev = self2.getAdjacent(self2.activeOption, -1);
                if (prev)
                  self2.setActiveOption(prev);
              }
              preventDefault(e);
              return;
            case KEY_RETURN:
              if (self2.canSelect(self2.activeOption)) {
                self2.onOptionSelect(e, self2.activeOption);
                preventDefault(e);
              } else if (self2.settings.create && self2.createItem()) {
                preventDefault(e);
              } else if (document.activeElement == self2.control_input && self2.isOpen) {
                preventDefault(e);
              }
              return;
            case KEY_LEFT:
              self2.advanceSelection(-1, e);
              return;
            case KEY_RIGHT:
              self2.advanceSelection(1, e);
              return;
            case KEY_TAB:
              if (self2.settings.selectOnTab) {
                if (self2.canSelect(self2.activeOption)) {
                  self2.onOptionSelect(e, self2.activeOption);
                  preventDefault(e);
                }
                if (self2.settings.create && self2.createItem()) {
                  preventDefault(e);
                }
              }
              return;
            case KEY_BACKSPACE:
            case KEY_DELETE:
              self2.deleteSelection(e);
              return;
          }
          if (self2.isInputHidden && !isKeyDown(KEY_SHORTCUT, e)) {
            preventDefault(e);
          }
        }
        /**
         * Triggered on <input> keyup.
         *
         */
        onInput(e) {
          var self2 = this;
          if (self2.isLocked) {
            return;
          }
          var value = self2.inputValue();
          if (self2.lastValue !== value) {
            self2.lastValue = value;
            if (self2.settings.shouldLoad.call(self2, value)) {
              self2.load(value);
            }
            self2.refreshOptions();
            self2.trigger("type", value);
          }
        }
        /**
         * Triggered when the user rolls over
         * an option in the autocomplete dropdown menu.
         *
         */
        onOptionHover(evt, option) {
          if (this.ignoreHover)
            return;
          this.setActiveOption(option, false);
        }
        /**
         * Triggered on <input> focus.
         *
         */
        onFocus(e) {
          var self2 = this;
          var wasFocused = self2.isFocused;
          if (self2.isDisabled) {
            self2.blur();
            preventDefault(e);
            return;
          }
          if (self2.ignoreFocus)
            return;
          self2.isFocused = true;
          if (self2.settings.preload === "focus")
            self2.preload();
          if (!wasFocused)
            self2.trigger("focus");
          if (!self2.activeItems.length) {
            self2.showInput();
            self2.refreshOptions(!!self2.settings.openOnFocus);
          }
          self2.refreshState();
        }
        /**
         * Triggered on <input> blur.
         *
         */
        onBlur(e) {
          if (document.hasFocus() === false)
            return;
          var self2 = this;
          if (!self2.isFocused)
            return;
          self2.isFocused = false;
          self2.ignoreFocus = false;
          var deactivate = () => {
            self2.close();
            self2.setActiveItem();
            self2.setCaret(self2.items.length);
            self2.trigger("blur");
          };
          if (self2.settings.create && self2.settings.createOnBlur) {
            self2.createItem(null, deactivate);
          } else {
            deactivate();
          }
        }
        /**
         * Triggered when the user clicks on an option
         * in the autocomplete dropdown menu.
         *
         */
        onOptionSelect(evt, option) {
          var value, self2 = this;
          if (option.parentElement && option.parentElement.matches("[data-disabled]")) {
            return;
          }
          if (option.classList.contains("create")) {
            self2.createItem(null, () => {
              if (self2.settings.closeAfterSelect) {
                self2.close();
              }
            });
          } else {
            value = option.dataset.value;
            if (typeof value !== "undefined") {
              self2.lastQuery = null;
              self2.addItem(value);
              if (self2.settings.closeAfterSelect) {
                self2.close();
              }
              if (!self2.settings.hideSelected && evt.type && /click/.test(evt.type)) {
                self2.setActiveOption(option);
              }
            }
          }
        }
        /**
         * Return true if the given option can be selected
         *
         */
        canSelect(option) {
          if (this.isOpen && option && this.dropdown_content.contains(option)) {
            return true;
          }
          return false;
        }
        /**
         * Triggered when the user clicks on an item
         * that has been selected.
         *
         */
        onItemSelect(evt, item) {
          var self2 = this;
          if (!self2.isLocked && self2.settings.mode === "multi") {
            preventDefault(evt);
            self2.setActiveItem(item, evt);
            return true;
          }
          return false;
        }
        /**
         * Determines whether or not to invoke
         * the user-provided option provider / loader
         *
         * Note, there is a subtle difference between
         * this.canLoad() and this.settings.shouldLoad();
         *
         *	- settings.shouldLoad() is a user-input validator.
         *	When false is returned, the not_loading template
         *	will be added to the dropdown
         *
         *	- canLoad() is lower level validator that checks
         * 	the Tom Select instance. There is no inherent user
         *	feedback when canLoad returns false
         *
         */
        canLoad(value) {
          if (!this.settings.load)
            return false;
          if (this.loadedSearches.hasOwnProperty(value))
            return false;
          return true;
        }
        /**
         * Invokes the user-provided option provider / loader.
         *
         */
        load(value) {
          const self2 = this;
          if (!self2.canLoad(value))
            return;
          addClasses(self2.wrapper, self2.settings.loadingClass);
          self2.loading++;
          const callback = self2.loadCallback.bind(self2);
          self2.settings.load.call(self2, value, callback);
        }
        /**
         * Invoked by the user-provided option provider
         *
         */
        loadCallback(options, optgroups2) {
          const self2 = this;
          self2.loading = Math.max(self2.loading - 1, 0);
          self2.lastQuery = null;
          self2.clearActiveOption();
          self2.setupOptions(options, optgroups2);
          self2.refreshOptions(self2.isFocused && !self2.isInputHidden);
          if (!self2.loading) {
            removeClasses(self2.wrapper, self2.settings.loadingClass);
          }
          self2.trigger("load", options, optgroups2);
        }
        preload() {
          var classList = this.wrapper.classList;
          if (classList.contains("preloaded"))
            return;
          classList.add("preloaded");
          this.load("");
        }
        /**
         * Sets the input field of the control to the specified value.
         *
         */
        setTextboxValue(value = "") {
          var input = this.control_input;
          var changed = input.value !== value;
          if (changed) {
            input.value = value;
            triggerEvent(input, "update");
            this.lastValue = value;
          }
        }
        /**
         * Returns the value of the control. If multiple items
         * can be selected (e.g. <select multiple>), this returns
         * an array. If only one item can be selected, this
         * returns a string.
         *
         */
        getValue() {
          if (this.is_select_tag && this.input.hasAttribute("multiple")) {
            return this.items;
          }
          return this.items.join(this.settings.delimiter);
        }
        /**
         * Resets the selected items to the given value.
         *
         */
        setValue(value, silent) {
          var events = silent ? [] : ["change"];
          debounce_events(this, events, () => {
            this.clear(silent);
            this.addItems(value, silent);
          });
        }
        /**
         * Resets the number of max items to the given value
         *
         */
        setMaxItems(value) {
          if (value === 0)
            value = null;
          this.settings.maxItems = value;
          this.refreshState();
        }
        /**
         * Sets the selected item.
         *
         */
        setActiveItem(item, e) {
          var self2 = this;
          var eventName;
          var i, begin, end, swap;
          var last;
          if (self2.settings.mode === "single")
            return;
          if (!item) {
            self2.clearActiveItems();
            if (self2.isFocused) {
              self2.showInput();
            }
            return;
          }
          eventName = e && e.type.toLowerCase();
          if (eventName === "click" && isKeyDown("shiftKey", e) && self2.activeItems.length) {
            last = self2.getLastActive();
            begin = Array.prototype.indexOf.call(self2.control.children, last);
            end = Array.prototype.indexOf.call(self2.control.children, item);
            if (begin > end) {
              swap = begin;
              begin = end;
              end = swap;
            }
            for (i = begin; i <= end; i++) {
              item = self2.control.children[i];
              if (self2.activeItems.indexOf(item) === -1) {
                self2.setActiveItemClass(item);
              }
            }
            preventDefault(e);
          } else if (eventName === "click" && isKeyDown(KEY_SHORTCUT, e) || eventName === "keydown" && isKeyDown("shiftKey", e)) {
            if (item.classList.contains("active")) {
              self2.removeActiveItem(item);
            } else {
              self2.setActiveItemClass(item);
            }
          } else {
            self2.clearActiveItems();
            self2.setActiveItemClass(item);
          }
          self2.hideInput();
          if (!self2.isFocused) {
            self2.focus();
          }
        }
        /**
         * Set the active and last-active classes
         *
         */
        setActiveItemClass(item) {
          const self2 = this;
          const last_active = self2.control.querySelector(".last-active");
          if (last_active)
            removeClasses(last_active, "last-active");
          addClasses(item, "active last-active");
          self2.trigger("item_select", item);
          if (self2.activeItems.indexOf(item) == -1) {
            self2.activeItems.push(item);
          }
        }
        /**
         * Remove active item
         *
         */
        removeActiveItem(item) {
          var idx = this.activeItems.indexOf(item);
          this.activeItems.splice(idx, 1);
          removeClasses(item, "active");
        }
        /**
         * Clears all the active items
         *
         */
        clearActiveItems() {
          removeClasses(this.activeItems, "active");
          this.activeItems = [];
        }
        /**
         * Sets the selected item in the dropdown menu
         * of available options.
         *
         */
        setActiveOption(option, scroll = true) {
          if (option === this.activeOption) {
            return;
          }
          this.clearActiveOption();
          if (!option)
            return;
          this.activeOption = option;
          setAttr(this.focus_node, {
            "aria-activedescendant": option.getAttribute("id")
          });
          setAttr(option, {
            "aria-selected": "true"
          });
          addClasses(option, "active");
          if (scroll)
            this.scrollToOption(option);
        }
        /**
         * Sets the dropdown_content scrollTop to display the option
         *
         */
        scrollToOption(option, behavior) {
          if (!option)
            return;
          const content = this.dropdown_content;
          const height_menu = content.clientHeight;
          const scrollTop = content.scrollTop || 0;
          const height_item = option.offsetHeight;
          const y = option.getBoundingClientRect().top - content.getBoundingClientRect().top + scrollTop;
          if (y + height_item > height_menu + scrollTop) {
            this.scroll(y - height_menu + height_item, behavior);
          } else if (y < scrollTop) {
            this.scroll(y, behavior);
          }
        }
        /**
         * Scroll the dropdown to the given position
         *
         */
        scroll(scrollTop, behavior) {
          const content = this.dropdown_content;
          if (behavior) {
            content.style.scrollBehavior = behavior;
          }
          content.scrollTop = scrollTop;
          content.style.scrollBehavior = "";
        }
        /**
         * Clears the active option
         *
         */
        clearActiveOption() {
          if (this.activeOption) {
            removeClasses(this.activeOption, "active");
            setAttr(this.activeOption, {
              "aria-selected": null
            });
          }
          this.activeOption = null;
          setAttr(this.focus_node, {
            "aria-activedescendant": null
          });
        }
        /**
         * Selects all items (CTRL + A).
         */
        selectAll() {
          const self2 = this;
          if (self2.settings.mode === "single")
            return;
          const activeItems = self2.controlChildren();
          if (!activeItems.length)
            return;
          self2.hideInput();
          self2.close();
          self2.activeItems = activeItems;
          iterate$1(activeItems, (item) => {
            self2.setActiveItemClass(item);
          });
        }
        /**
         * Determines if the control_input should be in a hidden or visible state
         *
         */
        inputState() {
          var self2 = this;
          if (!self2.control.contains(self2.control_input))
            return;
          setAttr(self2.control_input, {
            placeholder: self2.settings.placeholder
          });
          if (self2.activeItems.length > 0 || !self2.isFocused && self2.settings.hidePlaceholder && self2.items.length > 0) {
            self2.setTextboxValue();
            self2.isInputHidden = true;
          } else {
            if (self2.settings.hidePlaceholder && self2.items.length > 0) {
              setAttr(self2.control_input, {
                placeholder: ""
              });
            }
            self2.isInputHidden = false;
          }
          self2.wrapper.classList.toggle("input-hidden", self2.isInputHidden);
        }
        /**
         * Hides the input element out of view, while
         * retaining its focus.
         * @deprecated 1.3
         */
        hideInput() {
          this.inputState();
        }
        /**
         * Restores input visibility.
         * @deprecated 1.3
         */
        showInput() {
          this.inputState();
        }
        /**
         * Get the input value
         */
        inputValue() {
          return this.control_input.value.trim();
        }
        /**
         * Gives the control focus.
         */
        focus() {
          var self2 = this;
          if (self2.isDisabled)
            return;
          self2.ignoreFocus = true;
          if (self2.control_input.offsetWidth) {
            self2.control_input.focus();
          } else {
            self2.focus_node.focus();
          }
          setTimeout(() => {
            self2.ignoreFocus = false;
            self2.onFocus();
          }, 0);
        }
        /**
         * Forces the control out of focus.
         *
         */
        blur() {
          this.focus_node.blur();
          this.onBlur();
        }
        /**
         * Returns a function that scores an object
         * to show how good of a match it is to the
         * provided query.
         *
         * @return {function}
         */
        getScoreFunction(query) {
          return this.sifter.getScoreFunction(query, this.getSearchOptions());
        }
        /**
         * Returns search options for sifter (the system
         * for scoring and sorting results).
         *
         * @see https://github.com/orchidjs/sifter.js
         * @return {object}
         */
        getSearchOptions() {
          var settings = this.settings;
          var sort = settings.sortField;
          if (typeof settings.sortField === "string") {
            sort = [{
              field: settings.sortField
            }];
          }
          return {
            fields: settings.searchField,
            conjunction: settings.searchConjunction,
            sort,
            nesting: settings.nesting
          };
        }
        /**
         * Searches through available options and returns
         * a sorted array of matches.
         *
         */
        search(query) {
          var result, calculateScore;
          var self2 = this;
          var options = this.getSearchOptions();
          if (self2.settings.score) {
            calculateScore = self2.settings.score.call(self2, query);
            if (typeof calculateScore !== "function") {
              throw new Error('Tom Select "score" setting must be a function that returns a function');
            }
          }
          if (query !== self2.lastQuery) {
            self2.lastQuery = query;
            result = self2.sifter.search(query, Object.assign(options, {
              score: calculateScore
            }));
            self2.currentResults = result;
          } else {
            result = Object.assign({}, self2.currentResults);
          }
          if (self2.settings.hideSelected) {
            result.items = result.items.filter((item) => {
              let hashed = hash_key(item.id);
              return !(hashed && self2.items.indexOf(hashed) !== -1);
            });
          }
          return result;
        }
        /**
         * Refreshes the list of available options shown
         * in the autocomplete dropdown menu.
         *
         */
        refreshOptions(triggerDropdown = true) {
          var i, j, k, n, optgroup, optgroups2, html, has_create_option, active_group;
          var create;
          const groups = {};
          const groups_order = [];
          var self2 = this;
          var query = self2.inputValue();
          const same_query = query === self2.lastQuery || query == "" && self2.lastQuery == null;
          var results = self2.search(query);
          var active_option = null;
          var show_dropdown = self2.settings.shouldOpen || false;
          var dropdown_content = self2.dropdown_content;
          if (same_query) {
            active_option = self2.activeOption;
            if (active_option) {
              active_group = active_option.closest("[data-group]");
            }
          }
          n = results.items.length;
          if (typeof self2.settings.maxOptions === "number") {
            n = Math.min(n, self2.settings.maxOptions);
          }
          if (n > 0) {
            show_dropdown = true;
          }
          for (i = 0; i < n; i++) {
            let item = results.items[i];
            if (!item)
              continue;
            let opt_value = item.id;
            let option = self2.options[opt_value];
            if (option === void 0)
              continue;
            let opt_hash = get_hash(opt_value);
            let option_el = self2.getOption(opt_hash, true);
            if (!self2.settings.hideSelected) {
              option_el.classList.toggle("selected", self2.items.includes(opt_hash));
            }
            optgroup = option[self2.settings.optgroupField] || "";
            optgroups2 = Array.isArray(optgroup) ? optgroup : [optgroup];
            for (j = 0, k = optgroups2 && optgroups2.length; j < k; j++) {
              optgroup = optgroups2[j];
              if (!self2.optgroups.hasOwnProperty(optgroup)) {
                optgroup = "";
              }
              let group_fragment = groups[optgroup];
              if (group_fragment === void 0) {
                group_fragment = document.createDocumentFragment();
                groups_order.push(optgroup);
              }
              if (j > 0) {
                option_el = option_el.cloneNode(true);
                setAttr(option_el, {
                  id: option.$id + "-clone-" + j,
                  "aria-selected": null
                });
                option_el.classList.add("ts-cloned");
                removeClasses(option_el, "active");
                if (self2.activeOption && self2.activeOption.dataset.value == opt_value) {
                  if (active_group && active_group.dataset.group === optgroup.toString()) {
                    active_option = option_el;
                  }
                }
              }
              group_fragment.appendChild(option_el);
              groups[optgroup] = group_fragment;
            }
          }
          if (self2.settings.lockOptgroupOrder) {
            groups_order.sort((a, b) => {
              const grp_a = self2.optgroups[a];
              const grp_b = self2.optgroups[b];
              const a_order = grp_a && grp_a.$order || 0;
              const b_order = grp_b && grp_b.$order || 0;
              return a_order - b_order;
            });
          }
          html = document.createDocumentFragment();
          iterate$1(groups_order, (optgroup2) => {
            let group_fragment = groups[optgroup2];
            if (!group_fragment || !group_fragment.children.length)
              return;
            let group_heading = self2.optgroups[optgroup2];
            if (group_heading !== void 0) {
              let group_options = document.createDocumentFragment();
              let header = self2.render("optgroup_header", group_heading);
              append(group_options, header);
              append(group_options, group_fragment);
              let group_html = self2.render("optgroup", {
                group: group_heading,
                options: group_options
              });
              append(html, group_html);
            } else {
              append(html, group_fragment);
            }
          });
          dropdown_content.innerHTML = "";
          append(dropdown_content, html);
          if (self2.settings.highlight) {
            removeHighlight(dropdown_content);
            if (results.query.length && results.tokens.length) {
              iterate$1(results.tokens, (tok) => {
                highlight(dropdown_content, tok.regex);
              });
            }
          }
          var add_template = (template) => {
            let content = self2.render(template, {
              input: query
            });
            if (content) {
              show_dropdown = true;
              dropdown_content.insertBefore(content, dropdown_content.firstChild);
            }
            return content;
          };
          if (self2.loading) {
            add_template("loading");
          } else if (!self2.settings.shouldLoad.call(self2, query)) {
            add_template("not_loading");
          } else if (results.items.length === 0) {
            add_template("no_results");
          }
          has_create_option = self2.canCreate(query);
          if (has_create_option) {
            create = add_template("option_create");
          }
          self2.hasOptions = results.items.length > 0 || has_create_option;
          if (show_dropdown) {
            if (results.items.length > 0) {
              if (!active_option && self2.settings.mode === "single" && self2.items[0] != void 0) {
                active_option = self2.getOption(self2.items[0]);
              }
              if (!dropdown_content.contains(active_option)) {
                let active_index = 0;
                if (create && !self2.settings.addPrecedence) {
                  active_index = 1;
                }
                active_option = self2.selectable()[active_index];
              }
            } else if (create) {
              active_option = create;
            }
            if (triggerDropdown && !self2.isOpen) {
              self2.open();
              self2.scrollToOption(active_option, "auto");
            }
            self2.setActiveOption(active_option);
          } else {
            self2.clearActiveOption();
            if (triggerDropdown && self2.isOpen) {
              self2.close(false);
            }
          }
        }
        /**
         * Return list of selectable options
         *
         */
        selectable() {
          return this.dropdown_content.querySelectorAll("[data-selectable]");
        }
        /**
         * Adds an available option. If it already exists,
         * nothing will happen. Note: this does not refresh
         * the options list dropdown (use `refreshOptions`
         * for that).
         *
         * Usage:
         *
         *   this.addOption(data)
         *
         */
        addOption(data2, user_created = false) {
          const self2 = this;
          if (Array.isArray(data2)) {
            self2.addOptions(data2, user_created);
            return false;
          }
          const key = hash_key(data2[self2.settings.valueField]);
          if (key === null || self2.options.hasOwnProperty(key)) {
            return false;
          }
          data2.$order = data2.$order || ++self2.order;
          data2.$id = self2.inputId + "-opt-" + data2.$order;
          self2.options[key] = data2;
          self2.lastQuery = null;
          if (user_created) {
            self2.userOptions[key] = user_created;
            self2.trigger("option_add", key, data2);
          }
          return key;
        }
        /**
         * Add multiple options
         *
         */
        addOptions(data2, user_created = false) {
          iterate$1(data2, (dat) => {
            this.addOption(dat, user_created);
          });
        }
        /**
         * @deprecated 1.7.7
         */
        registerOption(data2) {
          return this.addOption(data2);
        }
        /**
         * Registers an option group to the pool of option groups.
         *
         * @return {boolean|string}
         */
        registerOptionGroup(data2) {
          var key = hash_key(data2[this.settings.optgroupValueField]);
          if (key === null)
            return false;
          data2.$order = data2.$order || ++this.order;
          this.optgroups[key] = data2;
          return key;
        }
        /**
         * Registers a new optgroup for options
         * to be bucketed into.
         *
         */
        addOptionGroup(id, data2) {
          var hashed_id;
          data2[this.settings.optgroupValueField] = id;
          if (hashed_id = this.registerOptionGroup(data2)) {
            this.trigger("optgroup_add", hashed_id, data2);
          }
        }
        /**
         * Removes an existing option group.
         *
         */
        removeOptionGroup(id) {
          if (this.optgroups.hasOwnProperty(id)) {
            delete this.optgroups[id];
            this.clearCache();
            this.trigger("optgroup_remove", id);
          }
        }
        /**
         * Clears all existing option groups.
         */
        clearOptionGroups() {
          this.optgroups = {};
          this.clearCache();
          this.trigger("optgroup_clear");
        }
        /**
         * Updates an option available for selection. If
         * it is visible in the selected items or options
         * dropdown, it will be re-rendered automatically.
         *
         */
        updateOption(value, data2) {
          const self2 = this;
          var item_new;
          var index_item;
          const value_old = hash_key(value);
          const value_new = hash_key(data2[self2.settings.valueField]);
          if (value_old === null)
            return;
          const data_old = self2.options[value_old];
          if (data_old == void 0)
            return;
          if (typeof value_new !== "string")
            throw new Error("Value must be set in option data");
          const option = self2.getOption(value_old);
          const item = self2.getItem(value_old);
          data2.$order = data2.$order || data_old.$order;
          delete self2.options[value_old];
          self2.uncacheValue(value_new);
          self2.options[value_new] = data2;
          if (option) {
            if (self2.dropdown_content.contains(option)) {
              const option_new = self2._render("option", data2);
              replaceNode(option, option_new);
              if (self2.activeOption === option) {
                self2.setActiveOption(option_new);
              }
            }
            option.remove();
          }
          if (item) {
            index_item = self2.items.indexOf(value_old);
            if (index_item !== -1) {
              self2.items.splice(index_item, 1, value_new);
            }
            item_new = self2._render("item", data2);
            if (item.classList.contains("active"))
              addClasses(item_new, "active");
            replaceNode(item, item_new);
          }
          self2.lastQuery = null;
        }
        /**
         * Removes a single option.
         *
         */
        removeOption(value, silent) {
          const self2 = this;
          value = get_hash(value);
          self2.uncacheValue(value);
          delete self2.userOptions[value];
          delete self2.options[value];
          self2.lastQuery = null;
          self2.trigger("option_remove", value);
          self2.removeItem(value, silent);
        }
        /**
         * Clears all options.
         */
        clearOptions(filter) {
          const boundFilter = (filter || this.clearFilter).bind(this);
          this.loadedSearches = {};
          this.userOptions = {};
          this.clearCache();
          const selected = {};
          iterate$1(this.options, (option, key) => {
            if (boundFilter(option, key)) {
              selected[key] = option;
            }
          });
          this.options = this.sifter.items = selected;
          this.lastQuery = null;
          this.trigger("option_clear");
        }
        /**
         * Used by clearOptions() to decide whether or not an option should be removed
         * Return true to keep an option, false to remove
         *
         */
        clearFilter(option, value) {
          if (this.items.indexOf(value) >= 0) {
            return true;
          }
          return false;
        }
        /**
         * Returns the dom element of the option
         * matching the given value.
         *
         */
        getOption(value, create = false) {
          const hashed = hash_key(value);
          if (hashed === null)
            return null;
          const option = this.options[hashed];
          if (option != void 0) {
            if (option.$div) {
              return option.$div;
            }
            if (create) {
              return this._render("option", option);
            }
          }
          return null;
        }
        /**
         * Returns the dom element of the next or previous dom element of the same type
         * Note: adjacent options may not be adjacent DOM elements (optgroups)
         *
         */
        getAdjacent(option, direction, type = "option") {
          var self2 = this, all;
          if (!option) {
            return null;
          }
          if (type == "item") {
            all = self2.controlChildren();
          } else {
            all = self2.dropdown_content.querySelectorAll("[data-selectable]");
          }
          for (let i = 0; i < all.length; i++) {
            if (all[i] != option) {
              continue;
            }
            if (direction > 0) {
              return all[i + 1];
            }
            return all[i - 1];
          }
          return null;
        }
        /**
         * Returns the dom element of the item
         * matching the given value.
         *
         */
        getItem(item) {
          if (typeof item == "object") {
            return item;
          }
          var value = hash_key(item);
          return value !== null ? this.control.querySelector(`[data-value="${addSlashes(value)}"]`) : null;
        }
        /**
         * "Selects" multiple items at once. Adds them to the list
         * at the current caret position.
         *
         */
        addItems(values, silent) {
          var self2 = this;
          var items = Array.isArray(values) ? values : [values];
          items = items.filter((x) => self2.items.indexOf(x) === -1);
          const last_item = items[items.length - 1];
          items.forEach((item) => {
            self2.isPending = item !== last_item;
            self2.addItem(item, silent);
          });
        }
        /**
         * "Selects" an item. Adds it to the list
         * at the current caret position.
         *
         */
        addItem(value, silent) {
          var events = silent ? [] : ["change", "dropdown_close"];
          debounce_events(this, events, () => {
            var item, wasFull;
            const self2 = this;
            const inputMode = self2.settings.mode;
            const hashed = hash_key(value);
            if (hashed && self2.items.indexOf(hashed) !== -1) {
              if (inputMode === "single") {
                self2.close();
              }
              if (inputMode === "single" || !self2.settings.duplicates) {
                return;
              }
            }
            if (hashed === null || !self2.options.hasOwnProperty(hashed))
              return;
            if (inputMode === "single")
              self2.clear(silent);
            if (inputMode === "multi" && self2.isFull())
              return;
            item = self2._render("item", self2.options[hashed]);
            if (self2.control.contains(item)) {
              item = item.cloneNode(true);
            }
            wasFull = self2.isFull();
            self2.items.splice(self2.caretPos, 0, hashed);
            self2.insertAtCaret(item);
            if (self2.isSetup) {
              if (!self2.isPending && self2.settings.hideSelected) {
                let option = self2.getOption(hashed);
                let next = self2.getAdjacent(option, 1);
                if (next) {
                  self2.setActiveOption(next);
                }
              }
              if (!self2.isPending && !self2.settings.closeAfterSelect) {
                self2.refreshOptions(self2.isFocused && inputMode !== "single");
              }
              if (self2.settings.closeAfterSelect != false && self2.isFull()) {
                self2.close();
              } else if (!self2.isPending) {
                self2.positionDropdown();
              }
              self2.trigger("item_add", hashed, item);
              if (!self2.isPending) {
                self2.updateOriginalInput({
                  silent
                });
              }
            }
            if (!self2.isPending || !wasFull && self2.isFull()) {
              self2.inputState();
              self2.refreshState();
            }
          });
        }
        /**
         * Removes the selected item matching
         * the provided value.
         *
         */
        removeItem(item = null, silent) {
          const self2 = this;
          item = self2.getItem(item);
          if (!item)
            return;
          var i, idx;
          const value = item.dataset.value;
          i = nodeIndex(item);
          item.remove();
          if (item.classList.contains("active")) {
            idx = self2.activeItems.indexOf(item);
            self2.activeItems.splice(idx, 1);
            removeClasses(item, "active");
          }
          self2.items.splice(i, 1);
          self2.lastQuery = null;
          if (!self2.settings.persist && self2.userOptions.hasOwnProperty(value)) {
            self2.removeOption(value, silent);
          }
          if (i < self2.caretPos) {
            self2.setCaret(self2.caretPos - 1);
          }
          self2.updateOriginalInput({
            silent
          });
          self2.refreshState();
          self2.positionDropdown();
          self2.trigger("item_remove", value, item);
        }
        /**
         * Invokes the `create` method provided in the
         * TomSelect options that should provide the data
         * for the new item, given the user input.
         *
         * Once this completes, it will be added
         * to the item list.
         *
         */
        createItem(input = null, callback = () => {
        }) {
          if (arguments.length === 3) {
            callback = arguments[2];
          }
          if (typeof callback != "function") {
            callback = () => {
            };
          }
          var self2 = this;
          var caret = self2.caretPos;
          var output;
          input = input || self2.inputValue();
          if (!self2.canCreate(input)) {
            callback();
            return false;
          }
          self2.lock();
          var created = false;
          var create = (data2) => {
            self2.unlock();
            if (!data2 || typeof data2 !== "object")
              return callback();
            var value = hash_key(data2[self2.settings.valueField]);
            if (typeof value !== "string") {
              return callback();
            }
            self2.setTextboxValue();
            self2.addOption(data2, true);
            self2.setCaret(caret);
            self2.addItem(value);
            callback(data2);
            created = true;
          };
          if (typeof self2.settings.create === "function") {
            output = self2.settings.create.call(this, input, create);
          } else {
            output = {
              [self2.settings.labelField]: input,
              [self2.settings.valueField]: input
            };
          }
          if (!created) {
            create(output);
          }
          return true;
        }
        /**
         * Re-renders the selected item lists.
         */
        refreshItems() {
          var self2 = this;
          self2.lastQuery = null;
          if (self2.isSetup) {
            self2.addItems(self2.items);
          }
          self2.updateOriginalInput();
          self2.refreshState();
        }
        /**
         * Updates all state-dependent attributes
         * and CSS classes.
         */
        refreshState() {
          const self2 = this;
          self2.refreshValidityState();
          const isFull = self2.isFull();
          const isLocked = self2.isLocked;
          self2.wrapper.classList.toggle("rtl", self2.rtl);
          const wrap_classList = self2.wrapper.classList;
          wrap_classList.toggle("focus", self2.isFocused);
          wrap_classList.toggle("disabled", self2.isDisabled);
          wrap_classList.toggle("required", self2.isRequired);
          wrap_classList.toggle("invalid", !self2.isValid);
          wrap_classList.toggle("locked", isLocked);
          wrap_classList.toggle("full", isFull);
          wrap_classList.toggle("input-active", self2.isFocused && !self2.isInputHidden);
          wrap_classList.toggle("dropdown-active", self2.isOpen);
          wrap_classList.toggle("has-options", isEmptyObject(self2.options));
          wrap_classList.toggle("has-items", self2.items.length > 0);
        }
        /**
         * Update the `required` attribute of both input and control input.
         *
         * The `required` property needs to be activated on the control input
         * for the error to be displayed at the right place. `required` also
         * needs to be temporarily deactivated on the input since the input is
         * hidden and can't show errors.
         */
        refreshValidityState() {
          var self2 = this;
          if (!self2.input.validity) {
            return;
          }
          self2.isValid = self2.input.validity.valid;
          self2.isInvalid = !self2.isValid;
        }
        /**
         * Determines whether or not more items can be added
         * to the control without exceeding the user-defined maximum.
         *
         * @returns {boolean}
         */
        isFull() {
          return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
        }
        /**
         * Refreshes the original <select> or <input>
         * element to reflect the current state.
         *
         */
        updateOriginalInput(opts = {}) {
          const self2 = this;
          var option, label;
          const empty_option = self2.input.querySelector('option[value=""]');
          if (self2.is_select_tag) {
            let AddSelected = function(option_el, value, label2) {
              if (!option_el) {
                option_el = getDom('<option value="' + escape_html(value) + '">' + escape_html(label2) + "</option>");
              }
              if (option_el != empty_option) {
                self2.input.append(option_el);
              }
              selected.push(option_el);
              if (option_el != empty_option || has_selected > 0) {
                option_el.selected = true;
              }
              return option_el;
            };
            const selected = [];
            const has_selected = self2.input.querySelectorAll("option:checked").length;
            self2.input.querySelectorAll("option:checked").forEach((option_el) => {
              option_el.selected = false;
            });
            if (self2.items.length == 0 && self2.settings.mode == "single") {
              AddSelected(empty_option, "", "");
            } else {
              self2.items.forEach((value) => {
                option = self2.options[value];
                label = option[self2.settings.labelField] || "";
                if (selected.includes(option.$option)) {
                  const reuse_opt = self2.input.querySelector(`option[value="${addSlashes(value)}"]:not(:checked)`);
                  AddSelected(reuse_opt, value, label);
                } else {
                  option.$option = AddSelected(option.$option, value, label);
                }
              });
            }
          } else {
            self2.input.value = self2.getValue();
          }
          if (self2.isSetup) {
            if (!opts.silent) {
              self2.trigger("change", self2.getValue());
            }
          }
        }
        /**
         * Shows the autocomplete dropdown containing
         * the available options.
         */
        open() {
          var self2 = this;
          if (self2.isLocked || self2.isOpen || self2.settings.mode === "multi" && self2.isFull())
            return;
          self2.isOpen = true;
          setAttr(self2.focus_node, {
            "aria-expanded": "true"
          });
          self2.refreshState();
          applyCSS(self2.dropdown, {
            visibility: "hidden",
            display: "block"
          });
          self2.positionDropdown();
          applyCSS(self2.dropdown, {
            visibility: "visible",
            display: "block"
          });
          self2.focus();
          self2.trigger("dropdown_open", self2.dropdown);
        }
        /**
         * Closes the autocomplete dropdown menu.
         */
        close(setTextboxValue = true) {
          var self2 = this;
          var trigger2 = self2.isOpen;
          if (setTextboxValue) {
            self2.setTextboxValue();
            if (self2.settings.mode === "single" && self2.items.length) {
              self2.hideInput();
            }
          }
          self2.isOpen = false;
          setAttr(self2.focus_node, {
            "aria-expanded": "false"
          });
          applyCSS(self2.dropdown, {
            display: "none"
          });
          if (self2.settings.hideSelected) {
            self2.clearActiveOption();
          }
          self2.refreshState();
          if (trigger2)
            self2.trigger("dropdown_close", self2.dropdown);
        }
        /**
         * Calculates and applies the appropriate
         * position of the dropdown if dropdownParent = 'body'.
         * Otherwise, position is determined by css
         */
        positionDropdown() {
          if (this.settings.dropdownParent !== "body") {
            return;
          }
          var context = this.control;
          var rect = context.getBoundingClientRect();
          var top = context.offsetHeight + rect.top + window.scrollY;
          var left = rect.left + window.scrollX;
          applyCSS(this.dropdown, {
            width: rect.width + "px",
            top: top + "px",
            left: left + "px"
          });
        }
        /**
         * Resets / clears all selected items
         * from the control.
         *
         */
        clear(silent) {
          var self2 = this;
          if (!self2.items.length)
            return;
          var items = self2.controlChildren();
          iterate$1(items, (item) => {
            self2.removeItem(item, true);
          });
          self2.showInput();
          if (!silent)
            self2.updateOriginalInput();
          self2.trigger("clear");
        }
        /**
         * A helper method for inserting an element
         * at the current caret position.
         *
         */
        insertAtCaret(el) {
          const self2 = this;
          const caret = self2.caretPos;
          const target = self2.control;
          target.insertBefore(el, target.children[caret] || null);
          self2.setCaret(caret + 1);
        }
        /**
         * Removes the current selected item(s).
         *
         */
        deleteSelection(e) {
          var direction, selection, caret, tail;
          var self2 = this;
          direction = e && e.keyCode === KEY_BACKSPACE ? -1 : 1;
          selection = getSelection(self2.control_input);
          const rm_items = [];
          if (self2.activeItems.length) {
            tail = getTail(self2.activeItems, direction);
            caret = nodeIndex(tail);
            if (direction > 0) {
              caret++;
            }
            iterate$1(self2.activeItems, (item) => rm_items.push(item));
          } else if ((self2.isFocused || self2.settings.mode === "single") && self2.items.length) {
            const items = self2.controlChildren();
            let rm_item;
            if (direction < 0 && selection.start === 0 && selection.length === 0) {
              rm_item = items[self2.caretPos - 1];
            } else if (direction > 0 && selection.start === self2.inputValue().length) {
              rm_item = items[self2.caretPos];
            }
            if (rm_item !== void 0) {
              rm_items.push(rm_item);
            }
          }
          if (!self2.shouldDelete(rm_items, e)) {
            return false;
          }
          preventDefault(e, true);
          if (typeof caret !== "undefined") {
            self2.setCaret(caret);
          }
          while (rm_items.length) {
            self2.removeItem(rm_items.pop());
          }
          self2.showInput();
          self2.positionDropdown();
          self2.refreshOptions(false);
          return true;
        }
        /**
         * Return true if the items should be deleted
         */
        shouldDelete(items, evt) {
          const values = items.map((item) => item.dataset.value);
          if (!values.length || typeof this.settings.onDelete === "function" && this.settings.onDelete(values, evt) === false) {
            return false;
          }
          return true;
        }
        /**
         * Selects the previous / next item (depending on the `direction` argument).
         *
         * > 0 - right
         * < 0 - left
         *
         */
        advanceSelection(direction, e) {
          var last_active, adjacent, self2 = this;
          if (self2.rtl)
            direction *= -1;
          if (self2.inputValue().length)
            return;
          if (isKeyDown(KEY_SHORTCUT, e) || isKeyDown("shiftKey", e)) {
            last_active = self2.getLastActive(direction);
            if (last_active) {
              if (!last_active.classList.contains("active")) {
                adjacent = last_active;
              } else {
                adjacent = self2.getAdjacent(last_active, direction, "item");
              }
            } else if (direction > 0) {
              adjacent = self2.control_input.nextElementSibling;
            } else {
              adjacent = self2.control_input.previousElementSibling;
            }
            if (adjacent) {
              if (adjacent.classList.contains("active")) {
                self2.removeActiveItem(last_active);
              }
              self2.setActiveItemClass(adjacent);
            }
          } else {
            self2.moveCaret(direction);
          }
        }
        moveCaret(direction) {
        }
        /**
         * Get the last active item
         *
         */
        getLastActive(direction) {
          let last_active = this.control.querySelector(".last-active");
          if (last_active) {
            return last_active;
          }
          var result = this.control.querySelectorAll(".active");
          if (result) {
            return getTail(result, direction);
          }
        }
        /**
         * Moves the caret to the specified index.
         *
         * The input must be moved by leaving it in place and moving the
         * siblings, due to the fact that focus cannot be restored once lost
         * on mobile webkit devices
         *
         */
        setCaret(new_pos) {
          this.caretPos = this.items.length;
        }
        /**
         * Return list of item dom elements
         *
         */
        controlChildren() {
          return Array.from(this.control.querySelectorAll("[data-ts-item]"));
        }
        /**
         * Disables user input on the control. Used while
         * items are being asynchronously created.
         */
        lock() {
          this.isLocked = true;
          this.refreshState();
        }
        /**
         * Re-enables user input on the control.
         */
        unlock() {
          this.isLocked = false;
          this.refreshState();
        }
        /**
         * Disables user input on the control completely.
         * While disabled, it cannot receive focus.
         */
        disable() {
          var self2 = this;
          self2.input.disabled = true;
          self2.control_input.disabled = true;
          self2.focus_node.tabIndex = -1;
          self2.isDisabled = true;
          this.close();
          self2.lock();
        }
        /**
         * Enables the control so that it can respond
         * to focus and user input.
         */
        enable() {
          var self2 = this;
          self2.input.disabled = false;
          self2.control_input.disabled = false;
          self2.focus_node.tabIndex = self2.tabIndex;
          self2.isDisabled = false;
          self2.unlock();
        }
        /**
         * Completely destroys the control and
         * unbinds all event listeners so that it can
         * be garbage collected.
         */
        destroy() {
          var self2 = this;
          var revertSettings = self2.revertSettings;
          self2.trigger("destroy");
          self2.off();
          self2.wrapper.remove();
          self2.dropdown.remove();
          self2.input.innerHTML = revertSettings.innerHTML;
          self2.input.tabIndex = revertSettings.tabIndex;
          removeClasses(self2.input, "tomselected", "ts-hidden-accessible");
          self2._destroy();
          delete self2.input.tomselect;
        }
        /**
         * A helper method for rendering "item" and
         * "option" templates, given the data.
         *
         */
        render(templateName, data2) {
          var id, html;
          const self2 = this;
          if (typeof this.settings.render[templateName] !== "function") {
            return null;
          }
          html = self2.settings.render[templateName].call(this, data2, escape_html);
          if (!html) {
            return null;
          }
          html = getDom(html);
          if (templateName === "option" || templateName === "option_create") {
            if (data2[self2.settings.disabledField]) {
              setAttr(html, {
                "aria-disabled": "true"
              });
            } else {
              setAttr(html, {
                "data-selectable": ""
              });
            }
          } else if (templateName === "optgroup") {
            id = data2.group[self2.settings.optgroupValueField];
            setAttr(html, {
              "data-group": id
            });
            if (data2.group[self2.settings.disabledField]) {
              setAttr(html, {
                "data-disabled": ""
              });
            }
          }
          if (templateName === "option" || templateName === "item") {
            const value = get_hash(data2[self2.settings.valueField]);
            setAttr(html, {
              "data-value": value
            });
            if (templateName === "item") {
              addClasses(html, self2.settings.itemClass);
              setAttr(html, {
                "data-ts-item": ""
              });
            } else {
              addClasses(html, self2.settings.optionClass);
              setAttr(html, {
                role: "option",
                id: data2.$id
              });
              data2.$div = html;
              self2.options[value] = data2;
            }
          }
          return html;
        }
        /**
         * Type guarded rendering
         *
         */
        _render(templateName, data2) {
          const html = this.render(templateName, data2);
          if (html == null) {
            throw "HTMLElement expected";
          }
          return html;
        }
        /**
         * Clears the render cache for a template. If
         * no template is given, clears all render
         * caches.
         *
         */
        clearCache() {
          iterate$1(this.options, (option) => {
            if (option.$div) {
              option.$div.remove();
              delete option.$div;
            }
          });
        }
        /**
         * Removes a value from item and option caches
         *
         */
        uncacheValue(value) {
          const option_el = this.getOption(value);
          if (option_el)
            option_el.remove();
        }
        /**
         * Determines whether or not to display the
         * create item prompt, given a user input.
         *
         */
        canCreate(input) {
          return this.settings.create && input.length > 0 && this.settings.createFilter.call(this, input);
        }
        /**
         * Wraps this.`method` so that `new_fn` can be invoked 'before', 'after', or 'instead' of the original method
         *
         * this.hook('instead','onKeyDown',function( arg1, arg2 ...){
         *
         * });
         */
        hook(when, method, new_fn) {
          var self2 = this;
          var orig_method = self2[method];
          self2[method] = function() {
            var result, result_new;
            if (when === "after") {
              result = orig_method.apply(self2, arguments);
            }
            result_new = new_fn.apply(self2, arguments);
            if (when === "instead") {
              return result_new;
            }
            if (when === "before") {
              result = orig_method.apply(self2, arguments);
            }
            return result;
          };
        }
      }
      function change_listener() {
        addEvent(this.input, "change", () => {
          this.sync();
        });
      }
      function checkbox_options() {
        var self2 = this;
        var orig_onOptionSelect = self2.onOptionSelect;
        self2.settings.hideSelected = false;
        var UpdateCheckbox = function UpdateCheckbox2(option) {
          setTimeout(() => {
            var checkbox = option.querySelector("input");
            if (checkbox instanceof HTMLInputElement) {
              if (option.classList.contains("selected")) {
                checkbox.checked = true;
              } else {
                checkbox.checked = false;
              }
            }
          }, 1);
        };
        self2.hook("after", "setupTemplates", () => {
          var orig_render_option = self2.settings.render.option;
          self2.settings.render.option = (data2, escape_html2) => {
            var rendered = getDom(orig_render_option.call(self2, data2, escape_html2));
            var checkbox = document.createElement("input");
            checkbox.addEventListener("click", function(evt) {
              preventDefault(evt);
            });
            checkbox.type = "checkbox";
            const hashed = hash_key(data2[self2.settings.valueField]);
            if (hashed && self2.items.indexOf(hashed) > -1) {
              checkbox.checked = true;
            }
            rendered.prepend(checkbox);
            return rendered;
          };
        });
        self2.on("item_remove", (value) => {
          var option = self2.getOption(value);
          if (option) {
            option.classList.remove("selected");
            UpdateCheckbox(option);
          }
        });
        self2.on("item_add", (value) => {
          var option = self2.getOption(value);
          if (option) {
            UpdateCheckbox(option);
          }
        });
        self2.hook("instead", "onOptionSelect", (evt, option) => {
          if (option.classList.contains("selected")) {
            option.classList.remove("selected");
            self2.removeItem(option.dataset.value);
            self2.refreshOptions();
            preventDefault(evt, true);
            return;
          }
          orig_onOptionSelect.call(self2, evt, option);
          UpdateCheckbox(option);
        });
      }
      function clear_button(userOptions) {
        const self2 = this;
        const options = Object.assign({
          className: "clear-button",
          title: "Clear All",
          html: (data2) => {
            return `<div class="${data2.className}" title="${data2.title}">&#10799;</div>`;
          }
        }, userOptions);
        self2.on("initialize", () => {
          var button = getDom(options.html(options));
          button.addEventListener("click", (evt) => {
            if (self2.isDisabled) {
              return;
            }
            self2.clear();
            if (self2.settings.mode === "single" && self2.settings.allowEmptyOption) {
              self2.addItem("");
            }
            evt.preventDefault();
            evt.stopPropagation();
          });
          self2.control.appendChild(button);
        });
      }
      function drag_drop() {
        var self2 = this;
        if (!$.fn.sortable)
          throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
        if (self2.settings.mode !== "multi")
          return;
        var orig_lock = self2.lock;
        var orig_unlock = self2.unlock;
        self2.hook("instead", "lock", () => {
          var sortable = $(self2.control).data("sortable");
          if (sortable)
            sortable.disable();
          return orig_lock.call(self2);
        });
        self2.hook("instead", "unlock", () => {
          var sortable = $(self2.control).data("sortable");
          if (sortable)
            sortable.enable();
          return orig_unlock.call(self2);
        });
        self2.on("initialize", () => {
          var $control = $(self2.control).sortable({
            items: "[data-value]",
            forcePlaceholderSize: true,
            disabled: self2.isLocked,
            start: (e, ui) => {
              ui.placeholder.css("width", ui.helper.css("width"));
              $control.css({
                overflow: "visible"
              });
            },
            stop: () => {
              $control.css({
                overflow: "hidden"
              });
              var values = [];
              $control.children("[data-value]").each(function() {
                if (this.dataset.value)
                  values.push(this.dataset.value);
              });
              self2.setValue(values);
            }
          });
        });
      }
      function dropdown_header(userOptions) {
        const self2 = this;
        const options = Object.assign({
          title: "Untitled",
          headerClass: "dropdown-header",
          titleRowClass: "dropdown-header-title",
          labelClass: "dropdown-header-label",
          closeClass: "dropdown-header-close",
          html: (data2) => {
            return '<div class="' + data2.headerClass + '"><div class="' + data2.titleRowClass + '"><span class="' + data2.labelClass + '">' + data2.title + '</span><a class="' + data2.closeClass + '">&times;</a></div></div>';
          }
        }, userOptions);
        self2.on("initialize", () => {
          var header = getDom(options.html(options));
          var close_link = header.querySelector("." + options.closeClass);
          if (close_link) {
            close_link.addEventListener("click", (evt) => {
              preventDefault(evt, true);
              self2.close();
            });
          }
          self2.dropdown.insertBefore(header, self2.dropdown.firstChild);
        });
      }
      function caret_position() {
        var self2 = this;
        self2.hook("instead", "setCaret", (new_pos) => {
          if (self2.settings.mode === "single" || !self2.control.contains(self2.control_input)) {
            new_pos = self2.items.length;
          } else {
            new_pos = Math.max(0, Math.min(self2.items.length, new_pos));
            if (new_pos != self2.caretPos && !self2.isPending) {
              self2.controlChildren().forEach((child, j) => {
                if (j < new_pos) {
                  self2.control_input.insertAdjacentElement("beforebegin", child);
                } else {
                  self2.control.appendChild(child);
                }
              });
            }
          }
          self2.caretPos = new_pos;
        });
        self2.hook("instead", "moveCaret", (direction) => {
          if (!self2.isFocused)
            return;
          const last_active = self2.getLastActive(direction);
          if (last_active) {
            const idx = nodeIndex(last_active);
            self2.setCaret(direction > 0 ? idx + 1 : idx);
            self2.setActiveItem();
            removeClasses(last_active, "last-active");
          } else {
            self2.setCaret(self2.caretPos + direction);
          }
        });
      }
      function dropdown_input() {
        const self2 = this;
        self2.settings.shouldOpen = true;
        self2.hook("before", "setup", () => {
          self2.focus_node = self2.control;
          addClasses(self2.control_input, "dropdown-input");
          const div = getDom('<div class="dropdown-input-wrap">');
          div.append(self2.control_input);
          self2.dropdown.insertBefore(div, self2.dropdown.firstChild);
          const placeholder = getDom('<input class="items-placeholder" tabindex="-1" />');
          placeholder.placeholder = self2.settings.placeholder || "";
          self2.control.append(placeholder);
        });
        self2.on("initialize", () => {
          self2.control_input.addEventListener("keydown", (evt) => {
            switch (evt.keyCode) {
              case KEY_ESC:
                if (self2.isOpen) {
                  preventDefault(evt, true);
                  self2.close();
                }
                self2.clearActiveItems();
                return;
              case KEY_TAB:
                self2.focus_node.tabIndex = -1;
                break;
            }
            return self2.onKeyDown.call(self2, evt);
          });
          self2.on("blur", () => {
            self2.focus_node.tabIndex = self2.isDisabled ? -1 : self2.tabIndex;
          });
          self2.on("dropdown_open", () => {
            self2.control_input.focus();
          });
          const orig_onBlur = self2.onBlur;
          self2.hook("instead", "onBlur", (evt) => {
            if (evt && evt.relatedTarget == self2.control_input)
              return;
            return orig_onBlur.call(self2);
          });
          addEvent(self2.control_input, "blur", () => self2.onBlur());
          self2.hook("before", "close", () => {
            if (!self2.isOpen)
              return;
            self2.focus_node.focus({
              preventScroll: true
            });
          });
        });
      }
      function input_autogrow() {
        var self2 = this;
        self2.on("initialize", () => {
          var test_input = document.createElement("span");
          var control = self2.control_input;
          test_input.style.cssText = "position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ";
          self2.wrapper.appendChild(test_input);
          var transfer_styles = ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"];
          for (const style_name of transfer_styles) {
            test_input.style[style_name] = control.style[style_name];
          }
          var resize = () => {
            test_input.textContent = control.value;
            control.style.width = test_input.clientWidth + "px";
          };
          resize();
          self2.on("update item_add item_remove", resize);
          addEvent(control, "input", resize);
          addEvent(control, "keyup", resize);
          addEvent(control, "blur", resize);
          addEvent(control, "update", resize);
        });
      }
      function no_backspace_delete() {
        var self2 = this;
        var orig_deleteSelection = self2.deleteSelection;
        this.hook("instead", "deleteSelection", (evt) => {
          if (self2.activeItems.length) {
            return orig_deleteSelection.call(self2, evt);
          }
          return false;
        });
      }
      function no_active_items() {
        this.hook("instead", "setActiveItem", () => {
        });
        this.hook("instead", "selectAll", () => {
        });
      }
      function optgroup_columns() {
        var self2 = this;
        var orig_keydown = self2.onKeyDown;
        self2.hook("instead", "onKeyDown", (evt) => {
          var index, option, options, optgroup;
          if (!self2.isOpen || !(evt.keyCode === KEY_LEFT || evt.keyCode === KEY_RIGHT)) {
            return orig_keydown.call(self2, evt);
          }
          self2.ignoreHover = true;
          optgroup = parentMatch(self2.activeOption, "[data-group]");
          index = nodeIndex(self2.activeOption, "[data-selectable]");
          if (!optgroup) {
            return;
          }
          if (evt.keyCode === KEY_LEFT) {
            optgroup = optgroup.previousSibling;
          } else {
            optgroup = optgroup.nextSibling;
          }
          if (!optgroup) {
            return;
          }
          options = optgroup.querySelectorAll("[data-selectable]");
          option = options[Math.min(options.length - 1, index)];
          if (option) {
            self2.setActiveOption(option);
          }
        });
      }
      function remove_button(userOptions) {
        const options = Object.assign({
          label: "&times;",
          title: "Remove",
          className: "remove",
          append: true
        }, userOptions);
        var self2 = this;
        if (!options.append) {
          return;
        }
        var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + "</a>";
        self2.hook("after", "setupTemplates", () => {
          var orig_render_item = self2.settings.render.item;
          self2.settings.render.item = (data2, escape) => {
            var item = getDom(orig_render_item.call(self2, data2, escape));
            var close_button = getDom(html);
            item.appendChild(close_button);
            addEvent(close_button, "mousedown", (evt) => {
              preventDefault(evt, true);
            });
            addEvent(close_button, "click", (evt) => {
              preventDefault(evt, true);
              if (self2.isLocked)
                return;
              if (!self2.shouldDelete([item], evt))
                return;
              self2.removeItem(item);
              self2.refreshOptions(false);
              self2.inputState();
            });
            return item;
          };
        });
      }
      function restore_on_backspace(userOptions) {
        const self2 = this;
        const options = Object.assign({
          text: (option) => {
            return option[self2.settings.labelField];
          }
        }, userOptions);
        self2.on("item_remove", function(value) {
          if (!self2.isFocused) {
            return;
          }
          if (self2.control_input.value.trim() === "") {
            var option = self2.options[value];
            if (option) {
              self2.setTextboxValue(options.text.call(self2, option));
            }
          }
        });
      }
      function virtual_scroll() {
        const self2 = this;
        const orig_canLoad = self2.canLoad;
        const orig_clearActiveOption = self2.clearActiveOption;
        const orig_loadCallback = self2.loadCallback;
        var pagination = {};
        var dropdown_content;
        var loading_more = false;
        var load_more_opt;
        var default_values = [];
        if (!self2.settings.shouldLoadMore) {
          self2.settings.shouldLoadMore = () => {
            const scroll_percent = dropdown_content.clientHeight / (dropdown_content.scrollHeight - dropdown_content.scrollTop);
            if (scroll_percent > 0.9) {
              return true;
            }
            if (self2.activeOption) {
              var selectable = self2.selectable();
              var index = Array.from(selectable).indexOf(self2.activeOption);
              if (index >= selectable.length - 2) {
                return true;
              }
            }
            return false;
          };
        }
        if (!self2.settings.firstUrl) {
          throw "virtual_scroll plugin requires a firstUrl() method";
        }
        self2.settings.sortField = [{
          field: "$order"
        }, {
          field: "$score"
        }];
        const canLoadMore = (query) => {
          if (typeof self2.settings.maxOptions === "number" && dropdown_content.children.length >= self2.settings.maxOptions) {
            return false;
          }
          if (query in pagination && pagination[query]) {
            return true;
          }
          return false;
        };
        const clearFilter = (option, value) => {
          if (self2.items.indexOf(value) >= 0 || default_values.indexOf(value) >= 0) {
            return true;
          }
          return false;
        };
        self2.setNextUrl = (value, next_url) => {
          pagination[value] = next_url;
        };
        self2.getUrl = (query) => {
          if (query in pagination) {
            const next_url = pagination[query];
            pagination[query] = false;
            return next_url;
          }
          pagination = {};
          return self2.settings.firstUrl.call(self2, query);
        };
        self2.hook("instead", "clearActiveOption", () => {
          if (loading_more) {
            return;
          }
          return orig_clearActiveOption.call(self2);
        });
        self2.hook("instead", "canLoad", (query) => {
          if (!(query in pagination)) {
            return orig_canLoad.call(self2, query);
          }
          return canLoadMore(query);
        });
        self2.hook("instead", "loadCallback", (options, optgroups2) => {
          if (!loading_more) {
            self2.clearOptions(clearFilter);
          } else if (load_more_opt) {
            const first_option = options[0];
            if (first_option !== void 0) {
              load_more_opt.dataset.value = first_option[self2.settings.valueField];
            }
          }
          orig_loadCallback.call(self2, options, optgroups2);
          loading_more = false;
        });
        self2.hook("after", "refreshOptions", () => {
          const query = self2.lastValue;
          var option;
          if (canLoadMore(query)) {
            option = self2.render("loading_more", {
              query
            });
            if (option) {
              option.setAttribute("data-selectable", "");
              load_more_opt = option;
            }
          } else if (query in pagination && !dropdown_content.querySelector(".no-results")) {
            option = self2.render("no_more_results", {
              query
            });
          }
          if (option) {
            addClasses(option, self2.settings.optionClass);
            dropdown_content.append(option);
          }
        });
        self2.on("initialize", () => {
          default_values = Object.keys(self2.options);
          dropdown_content = self2.dropdown_content;
          self2.settings.render = Object.assign({}, {
            loading_more: () => {
              return `<div class="loading-more-results">Loading more results ... </div>`;
            },
            no_more_results: () => {
              return `<div class="no-more-results">No more results</div>`;
            }
          }, self2.settings.render);
          dropdown_content.addEventListener("scroll", () => {
            if (!self2.settings.shouldLoadMore.call(self2)) {
              return;
            }
            if (!canLoadMore(self2.lastValue)) {
              return;
            }
            if (loading_more)
              return;
            loading_more = true;
            self2.load.call(self2, self2.lastValue);
          });
        });
      }
      TomSelect3.define("change_listener", change_listener);
      TomSelect3.define("checkbox_options", checkbox_options);
      TomSelect3.define("clear_button", clear_button);
      TomSelect3.define("drag_drop", drag_drop);
      TomSelect3.define("dropdown_header", dropdown_header);
      TomSelect3.define("caret_position", caret_position);
      TomSelect3.define("dropdown_input", dropdown_input);
      TomSelect3.define("input_autogrow", input_autogrow);
      TomSelect3.define("no_backspace_delete", no_backspace_delete);
      TomSelect3.define("no_active_items", no_active_items);
      TomSelect3.define("optgroup_columns", optgroup_columns);
      TomSelect3.define("remove_button", remove_button);
      TomSelect3.define("restore_on_backspace", restore_on_backspace);
      TomSelect3.define("virtual_scroll", virtual_scroll);
      return TomSelect3;
    });
  }
});

// src/js/property_map/init_public_map.ts
var init_public_map_exports = {};
__export(init_public_map_exports, {
  Alpine: () => module_default8
});
module.exports = __toCommonJS(init_public_map_exports);

// node_modules/@aerni/alpine-resize/dist/module.esm.js
function src_default(Alpine3) {
  Alpine3.directive("resize", (el, { expression }, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
    const evaluate2 = evaluateLater2(expression);
    const observer2 = new ResizeObserver((entries) => {
      entries.forEach((entry) => evaluate2(() => {
      }, { params: [entry] }));
    });
    observer2.observe(el);
    cleanup2(() => {
      observer2.disconnect();
    });
  });
}
var module_default = src_default;

// node_modules/@alpinejs/collapse/dist/module.esm.js
function src_default2(Alpine3) {
  Alpine3.directive("collapse", collapse);
  collapse.inline = (el, { modifiers }) => {
    if (!modifiers.includes("min"))
      return;
    el._x_doShow = () => {
    };
    el._x_doHide = () => {
    };
  };
  function collapse(el, { modifiers }) {
    let duration = modifierValue(modifiers, "duration", 250) / 1e3;
    let floor = modifierValue(modifiers, "min", 0);
    let fullyHide = !modifiers.includes("min");
    if (!el._x_isShown)
      el.style.height = `${floor}px`;
    if (!el._x_isShown && fullyHide)
      el.hidden = true;
    if (!el._x_isShown)
      el.style.overflow = "hidden";
    let setFunction = (el2, styles) => {
      let revertFunction = Alpine3.setStyles(el2, styles);
      return styles.height ? () => {
      } : revertFunction;
    };
    let transitionStyles = {
      transitionProperty: "height",
      transitionDuration: `${duration}s`,
      transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)"
    };
    el._x_transition = {
      in(before = () => {
      }, after = () => {
      }) {
        if (fullyHide)
          el.hidden = false;
        if (fullyHide)
          el.style.display = null;
        let current = el.getBoundingClientRect().height;
        el.style.height = "auto";
        let full = el.getBoundingClientRect().height;
        if (current === full) {
          current = floor;
        }
        Alpine3.transition(el, Alpine3.setStyles, {
          during: transitionStyles,
          start: { height: current + "px" },
          end: { height: full + "px" }
        }, () => el._x_isShown = true, () => {
          if (el.getBoundingClientRect().height == full) {
            el.style.overflow = null;
          }
        });
      },
      out(before = () => {
      }, after = () => {
      }) {
        let full = el.getBoundingClientRect().height;
        Alpine3.transition(el, setFunction, {
          during: transitionStyles,
          start: { height: full + "px" },
          end: { height: floor + "px" }
        }, () => el.style.overflow = "hidden", () => {
          el._x_isShown = false;
          if (el.style.height == `${floor}px` && fullyHide) {
            el.style.display = "none";
            el.hidden = true;
          }
        });
      }
    };
  }
}
function modifierValue(modifiers, key, fallback) {
  if (modifiers.indexOf(key) === -1)
    return fallback;
  const rawValue = modifiers[modifiers.indexOf(key) + 1];
  if (!rawValue)
    return fallback;
  if (key === "duration") {
    let match = rawValue.match(/([0-9]+)ms/);
    if (match)
      return match[1];
  }
  if (key === "min") {
    let match = rawValue.match(/([0-9]+)px/);
    if (match)
      return match[1];
  }
  return rawValue;
}
var module_default2 = src_default2;

// node_modules/@alpinejs/focus/dist/module.esm.js
var candidateSelectors = ["input", "select", "textarea", "a[href]", "button", "[tabindex]:not(slot)", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  return element.getRootNode();
} : function(element) {
  return element.ownerDocument;
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scope: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !options.shadowRootFilter || options.shadowRootFilter(element);
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scope: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var getTabindex = function getTabindex2(node, isScope) {
  if (node.tabIndex < 0) {
    if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute("tabindex"), 10))) {
      return 0;
    }
  }
  return node.tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  var nodeRootHost = getRootNode(node).host;
  var nodeIsAttached = (nodeRootHost === null || nodeRootHost === void 0 ? void 0 : nodeRootHost.ownerDocument.contains(nodeRootHost)) || node.ownerDocument.contains(node);
  if (!displayCheck || displayCheck === "full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (nodeIsAttached) {
      return !node.getClientRects().length;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scope;
    var element = isScope ? item.scope : item;
    var candidateTabindex = getTabindex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var activeFocusTraps = function() {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];
        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }
      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }
      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();
var isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent2(e) {
  return e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;
};
var isTabEvent = function isTabEvent2(e) {
  return e.key === "Tab" || e.keyCode === 9;
};
var delay = function delay2(fn) {
  return setTimeout(fn, 0);
};
var findIndex = function findIndex2(arr, fn) {
  var idx = -1;
  arr.every(function(value, i) {
    if (fn(value)) {
      idx = i;
      return false;
    }
    return true;
  });
  return idx;
};
var valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === "function" ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget2(event) {
  return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
};
var createFocusTrap = function createFocusTrap2(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);
  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   firstTabbableNode: HTMLElement|null,
    //   lastTabbableNode: HTMLElement|null,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0
  };
  var trap;
  var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  var findContainerIndex = function findContainerIndex2(element) {
    return state.containerGroups.findIndex(function(_ref) {
      var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      tabbableNodes.find(function(node) {
        return node === element;
      });
    });
  };
  var getNodeForOption = function getNodeForOption2(optionName) {
    var optionValue = config[optionName];
    if (typeof optionValue === "function") {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      optionValue = optionValue.apply(void 0, params);
    }
    if (optionValue === true) {
      optionValue = void 0;
    }
    if (!optionValue) {
      if (optionValue === void 0 || optionValue === false) {
        return optionValue;
      }
      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }
    var node = optionValue;
    if (typeof optionValue === "string") {
      node = doc.querySelector(optionValue);
      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode2() {
    var node = getNodeForOption("initialFocus");
    if (node === false) {
      return false;
    }
    if (node === void 0) {
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
        node = firstTabbableNode || getNodeForOption("fallbackFocus");
      }
    }
    if (!node) {
      throw new Error("Your focus-trap needs to have at least one focusable element");
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes2() {
    state.containerGroups = state.containers.map(function(container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions);
      var focusableNodes = focusable(container, config.tabbableOptions);
      return {
        container,
        tabbableNodes,
        focusableNodes,
        firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
        lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var nodeIdx = focusableNodes.findIndex(function(n) {
            return n === node;
          });
          if (nodeIdx < 0) {
            return void 0;
          }
          if (forward) {
            return focusableNodes.slice(nodeIdx + 1).find(function(n) {
              return isTabbable(n, config.tabbableOptions);
            });
          }
          return focusableNodes.slice(0, nodeIdx).reverse().find(function(n) {
            return isTabbable(n, config.tabbableOptions);
          });
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function(group) {
      return group.tabbableNodes.length > 0;
    });
    if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    }
  };
  var tryFocus = function tryFocus2(node) {
    if (node === false) {
      return;
    }
    if (node === doc.activeElement) {
      return;
    }
    if (!node || !node.focus) {
      tryFocus2(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    var node = getNodeForOption("setReturnFocus", previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  };
  var checkPointerDown = function checkPointerDown2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config.returnFocusOnDeactivate && !isFocusable(target, config.tabbableOptions)
      });
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
  };
  var checkFocusIn = function checkFocusIn2(e) {
    var target = getActualTarget(e);
    var targetContained = findContainerIndex(target) >= 0;
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  };
  var checkTab = function checkTab2(e) {
    var target = getActualTarget(e);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      var containerIndex = findContainerIndex(target);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
      if (containerIndex < 0) {
        if (e.shiftKey) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        var startOfGroupIndex = findIndex(state.tabbableGroups, function(_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function(_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      destinationNode = getNodeForOption("fallbackFocus");
    }
    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    }
  };
  var checkKey = function checkKey2(e) {
    if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }
    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };
  var checkClick = function checkClick2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var addListeners = function addListeners2() {
    if (!state.active) {
      return;
    }
    activeFocusTraps.activateTrap(trap);
    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener("focusin", checkFocusIn, true);
    doc.addEventListener("mousedown", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("touchstart", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("click", checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };
  var removeListeners = function removeListeners2() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener("focusin", checkFocusIn, true);
    doc.removeEventListener("mousedown", checkPointerDown, true);
    doc.removeEventListener("touchstart", checkPointerDown, true);
    doc.removeEventListener("click", checkClick, true);
    doc.removeEventListener("keydown", checkKey, true);
    return trap;
  };
  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, "onActivate");
      var onPostActivate = getOption(activateOptions, "onPostActivate");
      var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;
      if (onActivate) {
        onActivate();
      }
      var finishActivation = function finishActivation2() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        if (onPostActivate) {
          onPostActivate();
        }
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);
      clearTimeout(state.delayInitialFocusTimer);
      state.delayInitialFocusTimer = void 0;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(options, "onDeactivate");
      var onPostDeactivate = getOption(options, "onPostDeactivate");
      var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
      var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
      if (onDeactivate) {
        onDeactivate();
      }
      var finishDeactivation = function finishDeactivation2() {
        delay(function() {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }
      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }
      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function(element) {
        return typeof element === "string" ? doc.querySelector(element) : element;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      return this;
    }
  };
  trap.updateContainerElements(elements);
  return trap;
};
function src_default3(Alpine3) {
  let lastFocused;
  let currentFocused;
  window.addEventListener("focusin", () => {
    lastFocused = currentFocused;
    currentFocused = document.activeElement;
  });
  Alpine3.magic("focus", (el) => {
    let within = el;
    return {
      __noscroll: false,
      __wrapAround: false,
      within(el2) {
        within = el2;
        return this;
      },
      withoutScrolling() {
        this.__noscroll = true;
        return this;
      },
      noscroll() {
        this.__noscroll = true;
        return this;
      },
      withWrapAround() {
        this.__wrapAround = true;
        return this;
      },
      wrap() {
        return this.withWrapAround();
      },
      focusable(el2) {
        return isFocusable(el2);
      },
      previouslyFocused() {
        return lastFocused;
      },
      lastFocused() {
        return lastFocused;
      },
      focused() {
        return currentFocused;
      },
      focusables() {
        if (Array.isArray(within))
          return within;
        return focusable(within, { displayCheck: "none" });
      },
      all() {
        return this.focusables();
      },
      isFirst(el2) {
        let els = this.all();
        return els[0] && els[0].isSameNode(el2);
      },
      isLast(el2) {
        let els = this.all();
        return els.length && els.slice(-1)[0].isSameNode(el2);
      },
      getFirst() {
        return this.all()[0];
      },
      getLast() {
        return this.all().slice(-1)[0];
      },
      getNext() {
        let list = this.all();
        let current = document.activeElement;
        if (list.indexOf(current) === -1)
          return;
        if (this.__wrapAround && list.indexOf(current) === list.length - 1) {
          return list[0];
        }
        return list[list.indexOf(current) + 1];
      },
      getPrevious() {
        let list = this.all();
        let current = document.activeElement;
        if (list.indexOf(current) === -1)
          return;
        if (this.__wrapAround && list.indexOf(current) === 0) {
          return list.slice(-1)[0];
        }
        return list[list.indexOf(current) - 1];
      },
      first() {
        this.focus(this.getFirst());
      },
      last() {
        this.focus(this.getLast());
      },
      next() {
        this.focus(this.getNext());
      },
      previous() {
        this.focus(this.getPrevious());
      },
      prev() {
        return this.previous();
      },
      focus(el2) {
        if (!el2)
          return;
        setTimeout(() => {
          if (!el2.hasAttribute("tabindex"))
            el2.setAttribute("tabindex", "0");
          el2.focus({ preventScroll: this._noscroll });
        });
      }
    };
  });
  Alpine3.directive("trap", Alpine3.skipDuringClone(
    (el, { expression, modifiers }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
      let evaluator = evaluateLater2(expression);
      let oldValue = false;
      let options = {
        escapeDeactivates: false,
        allowOutsideClick: true,
        fallbackFocus: () => el
      };
      let autofocusEl = el.querySelector("[autofocus]");
      if (autofocusEl)
        options.initialFocus = autofocusEl;
      let trap = createFocusTrap(el, options);
      let undoInert = () => {
      };
      let undoDisableScrolling = () => {
      };
      const releaseFocus = () => {
        undoInert();
        undoInert = () => {
        };
        undoDisableScrolling();
        undoDisableScrolling = () => {
        };
        trap.deactivate({
          returnFocus: !modifiers.includes("noreturn")
        });
      };
      effect3(() => evaluator((value) => {
        if (oldValue === value)
          return;
        if (value && !oldValue) {
          setTimeout(() => {
            if (modifiers.includes("inert"))
              undoInert = setInert(el);
            if (modifiers.includes("noscroll"))
              undoDisableScrolling = disableScrolling();
            trap.activate();
          });
        }
        if (!value && oldValue) {
          releaseFocus();
        }
        oldValue = !!value;
      }));
      cleanup2(releaseFocus);
    },
    // When cloning, we only want to add aria-hidden attributes to the
    // DOM and not try to actually trap, as trapping can mess with the
    // live DOM and isn't just isolated to the cloned DOM.
    (el, { expression, modifiers }, { evaluate: evaluate2 }) => {
      if (modifiers.includes("inert") && evaluate2(expression))
        setInert(el);
    }
  ));
}
function setInert(el) {
  let undos = [];
  crawlSiblingsUp(el, (sibling) => {
    let cache = sibling.hasAttribute("aria-hidden");
    sibling.setAttribute("aria-hidden", "true");
    undos.push(() => cache || sibling.removeAttribute("aria-hidden"));
  });
  return () => {
    while (undos.length)
      undos.pop()();
  };
}
function crawlSiblingsUp(el, callback) {
  if (el.isSameNode(document.body) || !el.parentNode)
    return;
  Array.from(el.parentNode.children).forEach((sibling) => {
    if (sibling.isSameNode(el)) {
      crawlSiblingsUp(el.parentNode, callback);
    } else {
      callback(sibling);
    }
  });
}
function disableScrolling() {
  let overflow = document.documentElement.style.overflow;
  let paddingRight = document.documentElement.style.paddingRight;
  let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
  return () => {
    document.documentElement.style.overflow = overflow;
    document.documentElement.style.paddingRight = paddingRight;
  };
}
var module_default3 = src_default3;

// node_modules/@alpinejs/intersect/dist/module.esm.js
function src_default4(Alpine3) {
  Alpine3.directive("intersect", (el, { value, expression, modifiers }, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
    let evaluate2 = evaluateLater2(expression);
    let options = {
      rootMargin: getRootMargin(modifiers),
      threshold: getThreshhold(modifiers)
    };
    let observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === (value === "leave"))
          return;
        evaluate2();
        modifiers.includes("once") && observer2.disconnect();
      });
    }, options);
    observer2.observe(el);
    cleanup2(() => {
      observer2.disconnect();
    });
  });
}
function getThreshhold(modifiers) {
  if (modifiers.includes("full"))
    return 0.99;
  if (modifiers.includes("half"))
    return 0.5;
  if (!modifiers.includes("threshold"))
    return 0;
  let threshold = modifiers[modifiers.indexOf("threshold") + 1];
  if (threshold === "100")
    return 1;
  if (threshold === "0")
    return 0;
  return Number(`.${threshold}`);
}
function getLengthValue(rawValue) {
  let match = rawValue.match(/^(-?[0-9]+)(px|%)?$/);
  return match ? match[1] + (match[2] || "px") : void 0;
}
function getRootMargin(modifiers) {
  const key = "margin";
  const fallback = "0px 0px 0px 0px";
  const index = modifiers.indexOf(key);
  if (index === -1)
    return fallback;
  let values = [];
  for (let i = 1; i < 5; i++) {
    values.push(getLengthValue(modifiers[index + i] || ""));
  }
  values = values.filter((v) => v !== void 0);
  return values.length ? values.join(" ").trim() : fallback;
}
var module_default4 = src_default4;

// node_modules/@alpinejs/persist/dist/module.esm.js
function src_default5(Alpine3) {
  let persist = () => {
    let alias;
    let storage = localStorage;
    return Alpine3.interceptor((initialValue, getter, setter, path, key) => {
      let lookup = alias || `_x_${path}`;
      let initial = storageHas(lookup, storage) ? storageGet(lookup, storage) : initialValue;
      setter(initial);
      Alpine3.effect(() => {
        let value = getter();
        storageSet(lookup, value, storage);
        setter(value);
      });
      return initial;
    }, (func) => {
      func.as = (key) => {
        alias = key;
        return func;
      }, func.using = (target) => {
        storage = target;
        return func;
      };
    });
  };
  Object.defineProperty(Alpine3, "$persist", { get: () => persist() });
  Alpine3.magic("persist", persist);
  Alpine3.persist = (key, { get: get3, set: set3 }, storage = localStorage) => {
    let initial = storageHas(key, storage) ? storageGet(key, storage) : get3();
    set3(initial);
    Alpine3.effect(() => {
      let value = get3();
      storageSet(key, value, storage);
      set3(value);
    });
  };
}
function storageHas(key, storage) {
  return storage.getItem(key) !== null;
}
function storageGet(key, storage) {
  return JSON.parse(storage.getItem(key, storage));
}
function storageSet(key, value, storage) {
  storage.setItem(key, JSON.stringify(value));
}
var module_default5 = src_default5;

// node_modules/@ryangjchandler/alpine-mask/dist/module.esm.js
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp2(target, "__esModule", { value: true });
var __commonJS2 = (callback, module2) => () => {
  if (!module2) {
    module2 = { exports: {} };
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames2(module2))
      if (!__hasOwnProp2.call(target, key) && key !== "default")
        __defProp2(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc2(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp2(module2 != null ? __create2(__getProtoOf2(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var require_cleave = __commonJS2((exports, module2) => {
  (function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module2 === "object")
      module2.exports = factory();
    else if (typeof define === "function" && define.amd)
      define([], factory);
    else if (typeof exports === "object")
      exports["Cleave"] = factory();
    else
      root["Cleave"] = factory();
  })(exports, function() {
    return function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
          return installedModules[moduleId].exports;
        var module22 = installedModules[moduleId] = {
          exports: {},
          id: moduleId,
          loaded: false
        };
        modules[moduleId].call(module22.exports, module22, module22.exports, __webpack_require__);
        module22.loaded = true;
        return module22.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.p = "";
      return __webpack_require__(0);
    }([
      function(module22, exports2, __webpack_require__) {
        (function(global2) {
          "use strict";
          var Cleave2 = function(element, opts) {
            var owner = this;
            var hasMultipleElements = false;
            if (typeof element === "string") {
              owner.element = document.querySelector(element);
              hasMultipleElements = document.querySelectorAll(element).length > 1;
            } else {
              if (typeof element.length !== "undefined" && element.length > 0) {
                owner.element = element[0];
                hasMultipleElements = element.length > 1;
              } else {
                owner.element = element;
              }
            }
            if (!owner.element) {
              throw new Error("[cleave.js] Please check the element");
            }
            if (hasMultipleElements) {
              try {
                console.warn("[cleave.js] Multiple input fields matched, cleave.js will only take the first one.");
              } catch (e) {
              }
            }
            opts.initValue = owner.element.value;
            owner.properties = Cleave2.DefaultProperties.assign({}, opts);
            owner.init();
          };
          Cleave2.prototype = {
            init: function() {
              var owner = this, pps = owner.properties;
              if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.time && !pps.date && (pps.blocksLength === 0 && !pps.prefix)) {
                owner.onInput(pps.initValue);
                return;
              }
              pps.maxLength = Cleave2.Util.getMaxLength(pps.blocks);
              owner.isAndroid = Cleave2.Util.isAndroid();
              owner.lastInputValue = "";
              owner.isBackward = "";
              owner.onChangeListener = owner.onChange.bind(owner);
              owner.onKeyDownListener = owner.onKeyDown.bind(owner);
              owner.onFocusListener = owner.onFocus.bind(owner);
              owner.onCutListener = owner.onCut.bind(owner);
              owner.onCopyListener = owner.onCopy.bind(owner);
              owner.initSwapHiddenInput();
              owner.element.addEventListener("input", owner.onChangeListener);
              owner.element.addEventListener("keydown", owner.onKeyDownListener);
              owner.element.addEventListener("focus", owner.onFocusListener);
              owner.element.addEventListener("cut", owner.onCutListener);
              owner.element.addEventListener("copy", owner.onCopyListener);
              owner.initPhoneFormatter();
              owner.initDateFormatter();
              owner.initTimeFormatter();
              owner.initNumeralFormatter();
              if (pps.initValue || pps.prefix && !pps.noImmediatePrefix) {
                owner.onInput(pps.initValue);
              }
            },
            initSwapHiddenInput: function() {
              var owner = this, pps = owner.properties;
              if (!pps.swapHiddenInput)
                return;
              var inputFormatter = owner.element.cloneNode(true);
              owner.element.parentNode.insertBefore(inputFormatter, owner.element);
              owner.elementSwapHidden = owner.element;
              owner.elementSwapHidden.type = "hidden";
              owner.element = inputFormatter;
              owner.element.id = "";
            },
            initNumeralFormatter: function() {
              var owner = this, pps = owner.properties;
              if (!pps.numeral) {
                return;
              }
              pps.numeralFormatter = new Cleave2.NumeralFormatter(pps.numeralDecimalMark, pps.numeralIntegerScale, pps.numeralDecimalScale, pps.numeralThousandsGroupStyle, pps.numeralPositiveOnly, pps.stripLeadingZeroes, pps.prefix, pps.signBeforePrefix, pps.tailPrefix, pps.delimiter);
            },
            initTimeFormatter: function() {
              var owner = this, pps = owner.properties;
              if (!pps.time) {
                return;
              }
              pps.timeFormatter = new Cleave2.TimeFormatter(pps.timePattern, pps.timeFormat);
              pps.blocks = pps.timeFormatter.getBlocks();
              pps.blocksLength = pps.blocks.length;
              pps.maxLength = Cleave2.Util.getMaxLength(pps.blocks);
            },
            initDateFormatter: function() {
              var owner = this, pps = owner.properties;
              if (!pps.date) {
                return;
              }
              pps.dateFormatter = new Cleave2.DateFormatter(pps.datePattern, pps.dateMin, pps.dateMax);
              pps.blocks = pps.dateFormatter.getBlocks();
              pps.blocksLength = pps.blocks.length;
              pps.maxLength = Cleave2.Util.getMaxLength(pps.blocks);
            },
            initPhoneFormatter: function() {
              var owner = this, pps = owner.properties;
              if (!pps.phone) {
                return;
              }
              try {
                pps.phoneFormatter = new Cleave2.PhoneFormatter(new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode), pps.delimiter);
              } catch (ex) {
                throw new Error("[cleave.js] Please include phone-type-formatter.{country}.js lib");
              }
            },
            onKeyDown: function(event) {
              var owner = this, charCode = event.which || event.keyCode;
              owner.lastInputValue = owner.element.value;
              owner.isBackward = charCode === 8;
            },
            onChange: function(event) {
              var owner = this, pps = owner.properties, Util = Cleave2.Util;
              owner.isBackward = owner.isBackward || event.inputType === "deleteContentBackward";
              var postDelimiter = Util.getPostDelimiter(owner.lastInputValue, pps.delimiter, pps.delimiters);
              if (owner.isBackward && postDelimiter) {
                pps.postDelimiterBackspace = postDelimiter;
              } else {
                pps.postDelimiterBackspace = false;
              }
              this.onInput(this.element.value);
            },
            onFocus: function() {
              var owner = this, pps = owner.properties;
              owner.lastInputValue = owner.element.value;
              if (pps.prefix && pps.noImmediatePrefix && !owner.element.value) {
                this.onInput(pps.prefix);
              }
              Cleave2.Util.fixPrefixCursor(owner.element, pps.prefix, pps.delimiter, pps.delimiters);
            },
            onCut: function(e) {
              if (!Cleave2.Util.checkFullSelection(this.element.value))
                return;
              this.copyClipboardData(e);
              this.onInput("");
            },
            onCopy: function(e) {
              if (!Cleave2.Util.checkFullSelection(this.element.value))
                return;
              this.copyClipboardData(e);
            },
            copyClipboardData: function(e) {
              var owner = this, pps = owner.properties, Util = Cleave2.Util, inputValue = owner.element.value, textToCopy = "";
              if (!pps.copyDelimiter) {
                textToCopy = Util.stripDelimiters(inputValue, pps.delimiter, pps.delimiters);
              } else {
                textToCopy = inputValue;
              }
              try {
                if (e.clipboardData) {
                  e.clipboardData.setData("Text", textToCopy);
                } else {
                  window.clipboardData.setData("Text", textToCopy);
                }
                e.preventDefault();
              } catch (ex) {
              }
            },
            onInput: function(value) {
              var owner = this, pps = owner.properties, Util = Cleave2.Util;
              var postDelimiterAfter = Util.getPostDelimiter(value, pps.delimiter, pps.delimiters);
              if (!pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
                value = Util.headStr(value, value.length - pps.postDelimiterBackspace.length);
              }
              if (pps.phone) {
                if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
                  pps.result = pps.prefix + pps.phoneFormatter.format(value).slice(pps.prefix.length);
                } else {
                  pps.result = pps.phoneFormatter.format(value);
                }
                owner.updateValueState();
                return;
              }
              if (pps.numeral) {
                if (pps.prefix && pps.noImmediatePrefix && value.length === 0) {
                  pps.result = "";
                } else {
                  pps.result = pps.numeralFormatter.format(value);
                }
                owner.updateValueState();
                return;
              }
              if (pps.date) {
                value = pps.dateFormatter.getValidatedDate(value);
              }
              if (pps.time) {
                value = pps.timeFormatter.getValidatedTime(value);
              }
              value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters);
              value = Util.getPrefixStrippedValue(value, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix);
              value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value;
              value = pps.uppercase ? value.toUpperCase() : value;
              value = pps.lowercase ? value.toLowerCase() : value;
              if (pps.prefix) {
                if (pps.tailPrefix) {
                  value = value + pps.prefix;
                } else {
                  value = pps.prefix + value;
                }
                if (pps.blocksLength === 0) {
                  pps.result = value;
                  owner.updateValueState();
                  return;
                }
              }
              if (pps.creditCard) {
                owner.updateCreditCardPropsByValue(value);
              }
              value = Util.headStr(value, pps.maxLength);
              pps.result = Util.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter, pps.delimiters, pps.delimiterLazyShow);
              owner.updateValueState();
            },
            updateCreditCardPropsByValue: function(value) {
              var owner = this, pps = owner.properties, Util = Cleave2.Util, creditCardInfo;
              if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
                return;
              }
              creditCardInfo = Cleave2.CreditCardDetector.getInfo(value, pps.creditCardStrictMode);
              pps.blocks = creditCardInfo.blocks;
              pps.blocksLength = pps.blocks.length;
              pps.maxLength = Util.getMaxLength(pps.blocks);
              if (pps.creditCardType !== creditCardInfo.type) {
                pps.creditCardType = creditCardInfo.type;
                pps.onCreditCardTypeChanged.call(owner, pps.creditCardType);
              }
            },
            updateValueState: function() {
              var owner = this, Util = Cleave2.Util, pps = owner.properties;
              if (!owner.element) {
                return;
              }
              var endPos = owner.element.selectionEnd;
              var oldValue = owner.element.value;
              var newValue = pps.result;
              endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters);
              if (owner.isAndroid) {
                window.setTimeout(function() {
                  owner.element.value = newValue;
                  Util.setSelection(owner.element, endPos, pps.document, false);
                  owner.callOnValueChanged();
                }, 1);
                return;
              }
              owner.element.value = newValue;
              if (pps.swapHiddenInput)
                owner.elementSwapHidden.value = owner.getRawValue();
              Util.setSelection(owner.element, endPos, pps.document, false);
              owner.callOnValueChanged();
            },
            callOnValueChanged: function() {
              var owner = this, pps = owner.properties;
              pps.onValueChanged.call(owner, {
                target: {
                  name: owner.element.name,
                  value: pps.result,
                  rawValue: owner.getRawValue()
                }
              });
            },
            setPhoneRegionCode: function(phoneRegionCode) {
              var owner = this, pps = owner.properties;
              pps.phoneRegionCode = phoneRegionCode;
              owner.initPhoneFormatter();
              owner.onChange();
            },
            setRawValue: function(value) {
              var owner = this, pps = owner.properties;
              value = value !== void 0 && value !== null ? value.toString() : "";
              if (pps.numeral) {
                value = value.replace(".", pps.numeralDecimalMark);
              }
              pps.postDelimiterBackspace = false;
              owner.element.value = value;
              owner.onInput(value);
            },
            getRawValue: function() {
              var owner = this, pps = owner.properties, Util = Cleave2.Util, rawValue = owner.element.value;
              if (pps.rawValueTrimPrefix) {
                rawValue = Util.getPrefixStrippedValue(rawValue, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix);
              }
              if (pps.numeral) {
                rawValue = pps.numeralFormatter.getRawValue(rawValue);
              } else {
                rawValue = Util.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
              }
              return rawValue;
            },
            getISOFormatDate: function() {
              var owner = this, pps = owner.properties;
              return pps.date ? pps.dateFormatter.getISOFormatDate() : "";
            },
            getISOFormatTime: function() {
              var owner = this, pps = owner.properties;
              return pps.time ? pps.timeFormatter.getISOFormatTime() : "";
            },
            getFormattedValue: function() {
              return this.element.value;
            },
            destroy: function() {
              var owner = this;
              owner.element.removeEventListener("input", owner.onChangeListener);
              owner.element.removeEventListener("keydown", owner.onKeyDownListener);
              owner.element.removeEventListener("focus", owner.onFocusListener);
              owner.element.removeEventListener("cut", owner.onCutListener);
              owner.element.removeEventListener("copy", owner.onCopyListener);
            },
            toString: function() {
              return "[Cleave Object]";
            }
          };
          Cleave2.NumeralFormatter = __webpack_require__(1);
          Cleave2.DateFormatter = __webpack_require__(2);
          Cleave2.TimeFormatter = __webpack_require__(3);
          Cleave2.PhoneFormatter = __webpack_require__(4);
          Cleave2.CreditCardDetector = __webpack_require__(5);
          Cleave2.Util = __webpack_require__(6);
          Cleave2.DefaultProperties = __webpack_require__(7);
          (typeof global2 === "object" && global2 ? global2 : window)["Cleave"] = Cleave2;
          module22.exports = Cleave2;
        }).call(exports2, function() {
          return this;
        }());
      },
      function(module22, exports2) {
        "use strict";
        var NumeralFormatter = function(numeralDecimalMark, numeralIntegerScale, numeralDecimalScale, numeralThousandsGroupStyle, numeralPositiveOnly, stripLeadingZeroes, prefix2, signBeforePrefix, tailPrefix, delimiter) {
          var owner = this;
          owner.numeralDecimalMark = numeralDecimalMark || ".";
          owner.numeralIntegerScale = numeralIntegerScale > 0 ? numeralIntegerScale : 0;
          owner.numeralDecimalScale = numeralDecimalScale >= 0 ? numeralDecimalScale : 2;
          owner.numeralThousandsGroupStyle = numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand;
          owner.numeralPositiveOnly = !!numeralPositiveOnly;
          owner.stripLeadingZeroes = stripLeadingZeroes !== false;
          owner.prefix = prefix2 || prefix2 === "" ? prefix2 : "";
          owner.signBeforePrefix = !!signBeforePrefix;
          owner.tailPrefix = !!tailPrefix;
          owner.delimiter = delimiter || delimiter === "" ? delimiter : ",";
          owner.delimiterRE = delimiter ? new RegExp("\\" + delimiter, "g") : "";
        };
        NumeralFormatter.groupStyle = {
          thousand: "thousand",
          lakh: "lakh",
          wan: "wan",
          none: "none"
        };
        NumeralFormatter.prototype = {
          getRawValue: function(value) {
            return value.replace(this.delimiterRE, "").replace(this.numeralDecimalMark, ".");
          },
          format: function(value) {
            var owner = this, parts, partSign, partSignAndPrefix, partInteger, partDecimal = "";
            value = value.replace(/[A-Za-z]/g, "").replace(owner.numeralDecimalMark, "M").replace(/[^\dM-]/g, "").replace(/^\-/, "N").replace(/\-/g, "").replace("N", owner.numeralPositiveOnly ? "" : "-").replace("M", owner.numeralDecimalMark);
            if (owner.stripLeadingZeroes) {
              value = value.replace(/^(-)?0+(?=\d)/, "$1");
            }
            partSign = value.slice(0, 1) === "-" ? "-" : "";
            if (typeof owner.prefix != "undefined") {
              if (owner.signBeforePrefix) {
                partSignAndPrefix = partSign + owner.prefix;
              } else {
                partSignAndPrefix = owner.prefix + partSign;
              }
            } else {
              partSignAndPrefix = partSign;
            }
            partInteger = value;
            if (value.indexOf(owner.numeralDecimalMark) >= 0) {
              parts = value.split(owner.numeralDecimalMark);
              partInteger = parts[0];
              partDecimal = owner.numeralDecimalMark + parts[1].slice(0, owner.numeralDecimalScale);
            }
            if (partSign === "-") {
              partInteger = partInteger.slice(1);
            }
            if (owner.numeralIntegerScale > 0) {
              partInteger = partInteger.slice(0, owner.numeralIntegerScale);
            }
            switch (owner.numeralThousandsGroupStyle) {
              case NumeralFormatter.groupStyle.lakh:
                partInteger = partInteger.replace(/(\d)(?=(\d\d)+\d$)/g, "$1" + owner.delimiter);
                break;
              case NumeralFormatter.groupStyle.wan:
                partInteger = partInteger.replace(/(\d)(?=(\d{4})+$)/g, "$1" + owner.delimiter);
                break;
              case NumeralFormatter.groupStyle.thousand:
                partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, "$1" + owner.delimiter);
                break;
            }
            if (owner.tailPrefix) {
              return partSign + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : "") + owner.prefix;
            }
            return partSignAndPrefix + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : "");
          }
        };
        module22.exports = NumeralFormatter;
      },
      function(module22, exports2) {
        "use strict";
        var DateFormatter = function(datePattern, dateMin, dateMax) {
          var owner = this;
          owner.date = [];
          owner.blocks = [];
          owner.datePattern = datePattern;
          owner.dateMin = dateMin.split("-").reverse().map(function(x) {
            return parseInt(x, 10);
          });
          if (owner.dateMin.length === 2)
            owner.dateMin.unshift(0);
          owner.dateMax = dateMax.split("-").reverse().map(function(x) {
            return parseInt(x, 10);
          });
          if (owner.dateMax.length === 2)
            owner.dateMax.unshift(0);
          owner.initBlocks();
        };
        DateFormatter.prototype = {
          initBlocks: function() {
            var owner = this;
            owner.datePattern.forEach(function(value) {
              if (value === "Y") {
                owner.blocks.push(4);
              } else {
                owner.blocks.push(2);
              }
            });
          },
          getISOFormatDate: function() {
            var owner = this, date = owner.date;
            return date[2] ? date[2] + "-" + owner.addLeadingZero(date[1]) + "-" + owner.addLeadingZero(date[0]) : "";
          },
          getBlocks: function() {
            return this.blocks;
          },
          getValidatedDate: function(value) {
            var owner = this, result = "";
            value = value.replace(/[^\d]/g, "");
            owner.blocks.forEach(function(length, index) {
              if (value.length > 0) {
                var sub = value.slice(0, length), sub0 = sub.slice(0, 1), rest = value.slice(length);
                switch (owner.datePattern[index]) {
                  case "d":
                    if (sub === "00") {
                      sub = "01";
                    } else if (parseInt(sub0, 10) > 3) {
                      sub = "0" + sub0;
                    } else if (parseInt(sub, 10) > 31) {
                      sub = "31";
                    }
                    break;
                  case "m":
                    if (sub === "00") {
                      sub = "01";
                    } else if (parseInt(sub0, 10) > 1) {
                      sub = "0" + sub0;
                    } else if (parseInt(sub, 10) > 12) {
                      sub = "12";
                    }
                    break;
                }
                result += sub;
                value = rest;
              }
            });
            return this.getFixedDateString(result);
          },
          getFixedDateString: function(value) {
            var owner = this, datePattern = owner.datePattern, date = [], dayIndex = 0, monthIndex = 0, yearIndex = 0, dayStartIndex = 0, monthStartIndex = 0, yearStartIndex = 0, day, month, year, fullYearDone = false;
            if (value.length === 4 && datePattern[0].toLowerCase() !== "y" && datePattern[1].toLowerCase() !== "y") {
              dayStartIndex = datePattern[0] === "d" ? 0 : 2;
              monthStartIndex = 2 - dayStartIndex;
              day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
              month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
              date = this.getFixedDate(day, month, 0);
            }
            if (value.length === 8) {
              datePattern.forEach(function(type, index) {
                switch (type) {
                  case "d":
                    dayIndex = index;
                    break;
                  case "m":
                    monthIndex = index;
                    break;
                  default:
                    yearIndex = index;
                    break;
                }
              });
              yearStartIndex = yearIndex * 2;
              dayStartIndex = dayIndex <= yearIndex ? dayIndex * 2 : dayIndex * 2 + 2;
              monthStartIndex = monthIndex <= yearIndex ? monthIndex * 2 : monthIndex * 2 + 2;
              day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
              month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
              year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);
              fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;
              date = this.getFixedDate(day, month, year);
            }
            if (value.length === 4 && (datePattern[0] === "y" || datePattern[1] === "y")) {
              monthStartIndex = datePattern[0] === "m" ? 0 : 2;
              yearStartIndex = 2 - monthStartIndex;
              month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
              year = parseInt(value.slice(yearStartIndex, yearStartIndex + 2), 10);
              fullYearDone = value.slice(yearStartIndex, yearStartIndex + 2).length === 2;
              date = [0, month, year];
            }
            if (value.length === 6 && (datePattern[0] === "Y" || datePattern[1] === "Y")) {
              monthStartIndex = datePattern[0] === "m" ? 0 : 4;
              yearStartIndex = 2 - 0.5 * monthStartIndex;
              month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
              year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);
              fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;
              date = [0, month, year];
            }
            date = owner.getRangeFixedDate(date);
            owner.date = date;
            var result = date.length === 0 ? value : datePattern.reduce(function(previous, current) {
              switch (current) {
                case "d":
                  return previous + (date[0] === 0 ? "" : owner.addLeadingZero(date[0]));
                case "m":
                  return previous + (date[1] === 0 ? "" : owner.addLeadingZero(date[1]));
                case "y":
                  return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], false) : "");
                case "Y":
                  return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], true) : "");
              }
            }, "");
            return result;
          },
          getRangeFixedDate: function(date) {
            var owner = this, datePattern = owner.datePattern, dateMin = owner.dateMin || [], dateMax = owner.dateMax || [];
            if (!date.length || dateMin.length < 3 && dateMax.length < 3)
              return date;
            if (datePattern.find(function(x) {
              return x.toLowerCase() === "y";
            }) && date[2] === 0)
              return date;
            if (dateMax.length && (dateMax[2] < date[2] || dateMax[2] === date[2] && (dateMax[1] < date[1] || dateMax[1] === date[1] && dateMax[0] < date[0])))
              return dateMax;
            if (dateMin.length && (dateMin[2] > date[2] || dateMin[2] === date[2] && (dateMin[1] > date[1] || dateMin[1] === date[1] && dateMin[0] > date[0])))
              return dateMin;
            return date;
          },
          getFixedDate: function(day, month, year) {
            day = Math.min(day, 31);
            month = Math.min(month, 12);
            year = parseInt(year || 0, 10);
            if (month < 7 && month % 2 === 0 || month > 8 && month % 2 === 1) {
              day = Math.min(day, month === 2 ? this.isLeapYear(year) ? 29 : 28 : 30);
            }
            return [day, month, year];
          },
          isLeapYear: function(year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
          },
          addLeadingZero: function(number) {
            return (number < 10 ? "0" : "") + number;
          },
          addLeadingZeroForYear: function(number, fullYearMode) {
            if (fullYearMode) {
              return (number < 10 ? "000" : number < 100 ? "00" : number < 1e3 ? "0" : "") + number;
            }
            return (number < 10 ? "0" : "") + number;
          }
        };
        module22.exports = DateFormatter;
      },
      function(module22, exports2) {
        "use strict";
        var TimeFormatter = function(timePattern, timeFormat) {
          var owner = this;
          owner.time = [];
          owner.blocks = [];
          owner.timePattern = timePattern;
          owner.timeFormat = timeFormat;
          owner.initBlocks();
        };
        TimeFormatter.prototype = {
          initBlocks: function() {
            var owner = this;
            owner.timePattern.forEach(function() {
              owner.blocks.push(2);
            });
          },
          getISOFormatTime: function() {
            var owner = this, time = owner.time;
            return time[2] ? owner.addLeadingZero(time[0]) + ":" + owner.addLeadingZero(time[1]) + ":" + owner.addLeadingZero(time[2]) : "";
          },
          getBlocks: function() {
            return this.blocks;
          },
          getTimeFormatOptions: function() {
            var owner = this;
            if (String(owner.timeFormat) === "12") {
              return {
                maxHourFirstDigit: 1,
                maxHours: 12,
                maxMinutesFirstDigit: 5,
                maxMinutes: 60
              };
            }
            return {
              maxHourFirstDigit: 2,
              maxHours: 23,
              maxMinutesFirstDigit: 5,
              maxMinutes: 60
            };
          },
          getValidatedTime: function(value) {
            var owner = this, result = "";
            value = value.replace(/[^\d]/g, "");
            var timeFormatOptions = owner.getTimeFormatOptions();
            owner.blocks.forEach(function(length, index) {
              if (value.length > 0) {
                var sub = value.slice(0, length), sub0 = sub.slice(0, 1), rest = value.slice(length);
                switch (owner.timePattern[index]) {
                  case "h":
                    if (parseInt(sub0, 10) > timeFormatOptions.maxHourFirstDigit) {
                      sub = "0" + sub0;
                    } else if (parseInt(sub, 10) > timeFormatOptions.maxHours) {
                      sub = timeFormatOptions.maxHours + "";
                    }
                    break;
                  case "m":
                  case "s":
                    if (parseInt(sub0, 10) > timeFormatOptions.maxMinutesFirstDigit) {
                      sub = "0" + sub0;
                    } else if (parseInt(sub, 10) > timeFormatOptions.maxMinutes) {
                      sub = timeFormatOptions.maxMinutes + "";
                    }
                    break;
                }
                result += sub;
                value = rest;
              }
            });
            return this.getFixedTimeString(result);
          },
          getFixedTimeString: function(value) {
            var owner = this, timePattern = owner.timePattern, time = [], secondIndex = 0, minuteIndex = 0, hourIndex = 0, secondStartIndex = 0, minuteStartIndex = 0, hourStartIndex = 0, second, minute, hour;
            if (value.length === 6) {
              timePattern.forEach(function(type, index) {
                switch (type) {
                  case "s":
                    secondIndex = index * 2;
                    break;
                  case "m":
                    minuteIndex = index * 2;
                    break;
                  case "h":
                    hourIndex = index * 2;
                    break;
                }
              });
              hourStartIndex = hourIndex;
              minuteStartIndex = minuteIndex;
              secondStartIndex = secondIndex;
              second = parseInt(value.slice(secondStartIndex, secondStartIndex + 2), 10);
              minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
              hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);
              time = this.getFixedTime(hour, minute, second);
            }
            if (value.length === 4 && owner.timePattern.indexOf("s") < 0) {
              timePattern.forEach(function(type, index) {
                switch (type) {
                  case "m":
                    minuteIndex = index * 2;
                    break;
                  case "h":
                    hourIndex = index * 2;
                    break;
                }
              });
              hourStartIndex = hourIndex;
              minuteStartIndex = minuteIndex;
              second = 0;
              minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
              hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);
              time = this.getFixedTime(hour, minute, second);
            }
            owner.time = time;
            return time.length === 0 ? value : timePattern.reduce(function(previous, current) {
              switch (current) {
                case "s":
                  return previous + owner.addLeadingZero(time[2]);
                case "m":
                  return previous + owner.addLeadingZero(time[1]);
                case "h":
                  return previous + owner.addLeadingZero(time[0]);
              }
            }, "");
          },
          getFixedTime: function(hour, minute, second) {
            second = Math.min(parseInt(second || 0, 10), 60);
            minute = Math.min(minute, 60);
            hour = Math.min(hour, 60);
            return [hour, minute, second];
          },
          addLeadingZero: function(number) {
            return (number < 10 ? "0" : "") + number;
          }
        };
        module22.exports = TimeFormatter;
      },
      function(module22, exports2) {
        "use strict";
        var PhoneFormatter = function(formatter, delimiter) {
          var owner = this;
          owner.delimiter = delimiter || delimiter === "" ? delimiter : " ";
          owner.delimiterRE = delimiter ? new RegExp("\\" + delimiter, "g") : "";
          owner.formatter = formatter;
        };
        PhoneFormatter.prototype = {
          setFormatter: function(formatter) {
            this.formatter = formatter;
          },
          format: function(phoneNumber) {
            var owner = this;
            owner.formatter.clear();
            phoneNumber = phoneNumber.replace(/[^\d+]/g, "");
            phoneNumber = phoneNumber.replace(/^\+/, "B").replace(/\+/g, "").replace("B", "+");
            phoneNumber = phoneNumber.replace(owner.delimiterRE, "");
            var result = "", current, validated = false;
            for (var i = 0, iMax = phoneNumber.length; i < iMax; i++) {
              current = owner.formatter.inputDigit(phoneNumber.charAt(i));
              if (/[\s()-]/g.test(current)) {
                result = current;
                validated = true;
              } else {
                if (!validated) {
                  result = current;
                }
              }
            }
            result = result.replace(/[()]/g, "");
            result = result.replace(/[\s-]/g, owner.delimiter);
            return result;
          }
        };
        module22.exports = PhoneFormatter;
      },
      function(module22, exports2) {
        "use strict";
        var CreditCardDetector = {
          blocks: {
            uatp: [4, 5, 6],
            amex: [4, 6, 5],
            diners: [4, 6, 4],
            discover: [4, 4, 4, 4],
            mastercard: [4, 4, 4, 4],
            dankort: [4, 4, 4, 4],
            instapayment: [4, 4, 4, 4],
            jcb15: [4, 6, 5],
            jcb: [4, 4, 4, 4],
            maestro: [4, 4, 4, 4],
            visa: [4, 4, 4, 4],
            mir: [4, 4, 4, 4],
            unionPay: [4, 4, 4, 4],
            general: [4, 4, 4, 4]
          },
          re: {
            uatp: /^(?!1800)1\d{0,14}/,
            amex: /^3[47]\d{0,13}/,
            discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
            diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
            mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
            dankort: /^(5019|4175|4571)\d{0,12}/,
            instapayment: /^63[7-9]\d{0,13}/,
            jcb15: /^(?:2131|1800)\d{0,11}/,
            jcb: /^(?:35\d{0,2})\d{0,12}/,
            maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
            mir: /^220[0-4]\d{0,12}/,
            visa: /^4\d{0,15}/,
            unionPay: /^(62|81)\d{0,14}/
          },
          getStrictBlocks: function(block) {
            var total = block.reduce(function(prev, current) {
              return prev + current;
            }, 0);
            return block.concat(19 - total);
          },
          getInfo: function(value, strictMode) {
            var blocks = CreditCardDetector.blocks, re = CreditCardDetector.re;
            strictMode = !!strictMode;
            for (var key in re) {
              if (re[key].test(value)) {
                var matchedBlocks = blocks[key];
                return {
                  type: key,
                  blocks: strictMode ? this.getStrictBlocks(matchedBlocks) : matchedBlocks
                };
              }
            }
            return {
              type: "unknown",
              blocks: strictMode ? this.getStrictBlocks(blocks.general) : blocks.general
            };
          }
        };
        module22.exports = CreditCardDetector;
      },
      function(module22, exports2) {
        "use strict";
        var Util = {
          noop: function() {
          },
          strip: function(value, re) {
            return value.replace(re, "");
          },
          getPostDelimiter: function(value, delimiter, delimiters) {
            if (delimiters.length === 0) {
              return value.slice(-delimiter.length) === delimiter ? delimiter : "";
            }
            var matchedDelimiter = "";
            delimiters.forEach(function(current) {
              if (value.slice(-current.length) === current) {
                matchedDelimiter = current;
              }
            });
            return matchedDelimiter;
          },
          getDelimiterREByDelimiter: function(delimiter) {
            return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "g");
          },
          getNextCursorPosition: function(prevPos, oldValue, newValue, delimiter, delimiters) {
            if (oldValue.length === prevPos) {
              return newValue.length;
            }
            return prevPos + this.getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters);
          },
          getPositionOffset: function(prevPos, oldValue, newValue, delimiter, delimiters) {
            var oldRawValue, newRawValue, lengthOffset;
            oldRawValue = this.stripDelimiters(oldValue.slice(0, prevPos), delimiter, delimiters);
            newRawValue = this.stripDelimiters(newValue.slice(0, prevPos), delimiter, delimiters);
            lengthOffset = oldRawValue.length - newRawValue.length;
            return lengthOffset !== 0 ? lengthOffset / Math.abs(lengthOffset) : 0;
          },
          stripDelimiters: function(value, delimiter, delimiters) {
            var owner = this;
            if (delimiters.length === 0) {
              var delimiterRE = delimiter ? owner.getDelimiterREByDelimiter(delimiter) : "";
              return value.replace(delimiterRE, "");
            }
            delimiters.forEach(function(current) {
              current.split("").forEach(function(letter) {
                value = value.replace(owner.getDelimiterREByDelimiter(letter), "");
              });
            });
            return value;
          },
          headStr: function(str, length) {
            return str.slice(0, length);
          },
          getMaxLength: function(blocks) {
            return blocks.reduce(function(previous, current) {
              return previous + current;
            }, 0);
          },
          getPrefixStrippedValue: function(value, prefix2, prefixLength, prevResult, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix) {
            if (prefixLength === 0) {
              return value;
            }
            if (value === prefix2 && value !== "") {
              return "";
            }
            if (signBeforePrefix && value.slice(0, 1) == "-") {
              var prev = prevResult.slice(0, 1) == "-" ? prevResult.slice(1) : prevResult;
              return "-" + this.getPrefixStrippedValue(value.slice(1), prefix2, prefixLength, prev, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix);
            }
            if (prevResult.slice(0, prefixLength) !== prefix2 && !tailPrefix) {
              if (noImmediatePrefix && !prevResult && value)
                return value;
              return "";
            } else if (prevResult.slice(-prefixLength) !== prefix2 && tailPrefix) {
              if (noImmediatePrefix && !prevResult && value)
                return value;
              return "";
            }
            var prevValue = this.stripDelimiters(prevResult, delimiter, delimiters);
            if (value.slice(0, prefixLength) !== prefix2 && !tailPrefix) {
              return prevValue.slice(prefixLength);
            } else if (value.slice(-prefixLength) !== prefix2 && tailPrefix) {
              return prevValue.slice(0, -prefixLength - 1);
            }
            return tailPrefix ? value.slice(0, -prefixLength) : value.slice(prefixLength);
          },
          getFirstDiffIndex: function(prev, current) {
            var index = 0;
            while (prev.charAt(index) === current.charAt(index)) {
              if (prev.charAt(index++) === "") {
                return -1;
              }
            }
            return index;
          },
          getFormattedValue: function(value, blocks, blocksLength, delimiter, delimiters, delimiterLazyShow) {
            var result = "", multipleDelimiters = delimiters.length > 0, currentDelimiter = "";
            if (blocksLength === 0) {
              return value;
            }
            blocks.forEach(function(length, index) {
              if (value.length > 0) {
                var sub = value.slice(0, length), rest = value.slice(length);
                if (multipleDelimiters) {
                  currentDelimiter = delimiters[delimiterLazyShow ? index - 1 : index] || currentDelimiter;
                } else {
                  currentDelimiter = delimiter;
                }
                if (delimiterLazyShow) {
                  if (index > 0) {
                    result += currentDelimiter;
                  }
                  result += sub;
                } else {
                  result += sub;
                  if (sub.length === length && index < blocksLength - 1) {
                    result += currentDelimiter;
                  }
                }
                value = rest;
              }
            });
            return result;
          },
          fixPrefixCursor: function(el, prefix2, delimiter, delimiters) {
            if (!el) {
              return;
            }
            var val = el.value, appendix = delimiter || (delimiters[0] || " ");
            if (!el.setSelectionRange || !prefix2 || prefix2.length + appendix.length <= val.length) {
              return;
            }
            var len = val.length * 2;
            setTimeout(function() {
              el.setSelectionRange(len, len);
            }, 1);
          },
          checkFullSelection: function(value) {
            try {
              var selection = window.getSelection() || document.getSelection() || {};
              return selection.toString().length === value.length;
            } catch (ex) {
            }
            return false;
          },
          setSelection: function(element, position, doc) {
            if (element !== this.getActiveElement(doc)) {
              return;
            }
            if (element && element.value.length <= position) {
              return;
            }
            if (element.createTextRange) {
              var range = element.createTextRange();
              range.move("character", position);
              range.select();
            } else {
              try {
                element.setSelectionRange(position, position);
              } catch (e) {
                console.warn("The input element type does not support selection");
              }
            }
          },
          getActiveElement: function(parent) {
            var activeElement = parent.activeElement;
            if (activeElement && activeElement.shadowRoot) {
              return this.getActiveElement(activeElement.shadowRoot);
            }
            return activeElement;
          },
          isAndroid: function() {
            return navigator && /android/i.test(navigator.userAgent);
          },
          isAndroidBackspaceKeydown: function(lastInputValue, currentInputValue) {
            if (!this.isAndroid() || !lastInputValue || !currentInputValue) {
              return false;
            }
            return currentInputValue === lastInputValue.slice(0, -1);
          }
        };
        module22.exports = Util;
      },
      function(module22, exports2) {
        (function(global2) {
          "use strict";
          var DefaultProperties = {
            assign: function(target, opts) {
              target = target || {};
              opts = opts || {};
              target.creditCard = !!opts.creditCard;
              target.creditCardStrictMode = !!opts.creditCardStrictMode;
              target.creditCardType = "";
              target.onCreditCardTypeChanged = opts.onCreditCardTypeChanged || function() {
              };
              target.phone = !!opts.phone;
              target.phoneRegionCode = opts.phoneRegionCode || "AU";
              target.phoneFormatter = {};
              target.time = !!opts.time;
              target.timePattern = opts.timePattern || ["h", "m", "s"];
              target.timeFormat = opts.timeFormat || "24";
              target.timeFormatter = {};
              target.date = !!opts.date;
              target.datePattern = opts.datePattern || ["d", "m", "Y"];
              target.dateMin = opts.dateMin || "";
              target.dateMax = opts.dateMax || "";
              target.dateFormatter = {};
              target.numeral = !!opts.numeral;
              target.numeralIntegerScale = opts.numeralIntegerScale > 0 ? opts.numeralIntegerScale : 0;
              target.numeralDecimalScale = opts.numeralDecimalScale >= 0 ? opts.numeralDecimalScale : 2;
              target.numeralDecimalMark = opts.numeralDecimalMark || ".";
              target.numeralThousandsGroupStyle = opts.numeralThousandsGroupStyle || "thousand";
              target.numeralPositiveOnly = !!opts.numeralPositiveOnly;
              target.stripLeadingZeroes = opts.stripLeadingZeroes !== false;
              target.signBeforePrefix = !!opts.signBeforePrefix;
              target.tailPrefix = !!opts.tailPrefix;
              target.swapHiddenInput = !!opts.swapHiddenInput;
              target.numericOnly = target.creditCard || target.date || !!opts.numericOnly;
              target.uppercase = !!opts.uppercase;
              target.lowercase = !!opts.lowercase;
              target.prefix = target.creditCard || target.date ? "" : opts.prefix || "";
              target.noImmediatePrefix = !!opts.noImmediatePrefix;
              target.prefixLength = target.prefix.length;
              target.rawValueTrimPrefix = !!opts.rawValueTrimPrefix;
              target.copyDelimiter = !!opts.copyDelimiter;
              target.initValue = opts.initValue !== void 0 && opts.initValue !== null ? opts.initValue.toString() : "";
              target.delimiter = opts.delimiter || opts.delimiter === "" ? opts.delimiter : opts.date ? "/" : opts.time ? ":" : opts.numeral ? "," : opts.phone ? " " : " ";
              target.delimiterLength = target.delimiter.length;
              target.delimiterLazyShow = !!opts.delimiterLazyShow;
              target.delimiters = opts.delimiters || [];
              target.blocks = opts.blocks || [];
              target.blocksLength = target.blocks.length;
              target.root = typeof global2 === "object" && global2 ? global2 : window;
              target.document = opts.document || target.root.document;
              target.maxLength = 0;
              target.backspace = false;
              target.result = "";
              target.onValueChanged = opts.onValueChanged || function() {
              };
              return target;
            }
          };
          module22.exports = DefaultProperties;
        }).call(exports2, function() {
          return this;
        }());
      }
    ]);
  });
});
var import_cleave = __toModule(require_cleave());
var findModifierArgument = (modifiers, target, offset = 1) => {
  return modifiers[modifiers.indexOf(target) + offset];
};
var buildConfigFromModifiers = (modifiers, expression, evaluate2) => {
  const config = {};
  if (modifiers.includes("card")) {
    config.creditCard = true;
    config.creditCardStrictMode = modifiers.includes("strict");
  } else if (modifiers.includes("date")) {
    config.date = true;
    config.datePattern = expression ? evaluate2(expression) : null;
  } else if (modifiers.includes("time")) {
    config.time = true;
    config.timePattern = expression ? evaluate2(expression) : null;
  } else if (modifiers.includes("numeral")) {
    config.numeral = true;
    if (modifiers.includes("thousands")) {
      config.numeralThousandsGroupStyle = findModifierArgument(modifiers, "thousands");
    }
    if (modifiers.includes("delimiter")) {
      config.delimiter = findModifierArgument(modifiers, "delimiter") === "dot" ? "." : ",";
    }
    if (modifiers.includes("decimal")) {
      config.numeralDecimalMark = findModifierArgument(modifiers, "decimal") === "comma" ? "," : ".";
    }
    if (modifiers.includes("positive")) {
      config.numeralPositiveOnly = true;
    }
    if (modifiers.includes("prefix")) {
      config.prefix = findModifierArgument(modifiers, "prefix");
    }
  } else if (modifiers.includes("blocks")) {
    config.blocks = evaluate2(expression);
  }
  return config;
};
var valueChangedCallback = (el) => {
  return (event) => {
    if (!el._x_model) {
      return;
    }
    el._x_model.set(event.target.rawValue);
  };
};
function src_default6(Alpine3) {
  Alpine3.magic("mask", (el) => {
    if (el.__cleave) {
      return el.__cleave;
    }
  });
  Alpine3.directive("mask", (el, { modifiers, expression }, { effect: effect3, evaluate: evaluate2 }) => {
    if (el._x_model) {
      const directive2 = Alpine3.prefixed("model");
      Object.keys(el._x_attributeCleanups).forEach((key) => {
        if (key.startsWith(directive2)) {
          el._x_attributeCleanups[directive2][0]();
          delete el._x_attributeCleanups[directive2];
        }
      });
      el._x_forceModelUpdate = () => {
      };
    }
    const config = modifiers.length === 0 ? {
      ...evaluate2(expression),
      onValueChanged: valueChangedCallback(el)
    } : {
      ...buildConfigFromModifiers(modifiers, expression, evaluate2),
      onValueChanged: valueChangedCallback(el)
    };
    if (!el.__cleave) {
      el.__cleave = new import_cleave.default(el, config);
    }
    if (el._x_model) {
      effect3(() => {
        Alpine3.mutateDom(() => el.__cleave.setRawValue(el._x_model.get()));
      });
    }
  });
}
var module_default6 = src_default6;

// node_modules/@ryangjchandler/alpine-tooltip/dist/module.esm.js
var __create3 = Object.create;
var __defProp3 = Object.defineProperty;
var __getProtoOf3 = Object.getPrototypeOf;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __getOwnPropNames3 = Object.getOwnPropertyNames;
var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
var __markAsModule2 = (target) => __defProp3(target, "__esModule", { value: true });
var __commonJS3 = (callback, module2) => () => {
  if (!module2) {
    module2 = { exports: {} };
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __exportStar2 = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames3(module2))
      if (!__hasOwnProp3.call(target, key) && key !== "default")
        __defProp3(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc3(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule2 = (module2) => {
  return __exportStar2(__markAsModule2(__defProp3(module2 != null ? __create3(__getProtoOf3(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var require_popper = __commonJS3((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  function getBoundingClientRect(element) {
    var rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      x: rect.left,
      y: rect.top
    };
  }
  function getWindow(node) {
    if (node == null) {
      return window;
    }
    if (node.toString() !== "[object Window]") {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }
    return node;
  }
  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft,
      scrollTop
    };
  }
  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }
  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }
  function isShadowRoot(node) {
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }
  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }
  function getNodeName(element) {
    return element ? (element.nodeName || "").toLowerCase() : null;
  }
  function getDocumentElement(element) {
    return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
  }
  function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
  }
  function getComputedStyle2(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function isScrollParent(element) {
    var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }
  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement);
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }
  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element);
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }
    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }
    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width,
      height
    };
  }
  function getParentNode(element) {
    if (getNodeName(element) === "html") {
      return element;
    }
    return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
  }
  function getScrollParent(node) {
    if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
      return node.ownerDocument.body;
    }
    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }
    return getScrollParent(getParentNode(node));
  }
  function listScrollParents(element, list) {
    var _element$ownerDocumen;
    if (list === void 0) {
      list = [];
    }
    var scrollParent = getScrollParent(element);
    var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
  }
  function isTableElement(element) {
    return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
  }
  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
      return null;
    }
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
    var isIE = navigator.userAgent.indexOf("Trident") !== -1;
    if (isIE && isHTMLElement(element)) {
      var elementCss = getComputedStyle2(element);
      if (elementCss.position === "fixed") {
        return null;
      }
    }
    var currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle2(currentNode);
      if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    return null;
  }
  function getOffsetParent(element) {
    var window2 = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
      return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
  }
  var top = "top";
  var bottom = "bottom";
  var right = "right";
  var left = "left";
  var auto = "auto";
  var basePlacements = [top, bottom, right, left];
  var start2 = "start";
  var end = "end";
  var clippingParents = "clippingParents";
  var viewport = "viewport";
  var popper = "popper";
  var reference = "reference";
  var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
    return acc.concat([placement + "-" + start2, placement + "-" + end]);
  }, []);
  var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
    return acc.concat([placement, placement + "-" + start2, placement + "-" + end]);
  }, []);
  var beforeRead = "beforeRead";
  var read = "read";
  var afterRead = "afterRead";
  var beforeMain = "beforeMain";
  var main = "main";
  var afterMain = "afterMain";
  var beforeWrite = "beforeWrite";
  var write = "write";
  var afterWrite = "afterWrite";
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
  function order(modifiers) {
    var map = /* @__PURE__ */ new Map();
    var visited = /* @__PURE__ */ new Set();
    var result = [];
    modifiers.forEach(function(modifier) {
      map.set(modifier.name, modifier);
    });
    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function(dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);
          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }
    modifiers.forEach(function(modifier) {
      if (!visited.has(modifier.name)) {
        sort(modifier);
      }
    });
    return result;
  }
  function orderModifiers(modifiers) {
    var orderedModifiers = order(modifiers);
    return modifierPhases.reduce(function(acc, phase) {
      return acc.concat(orderedModifiers.filter(function(modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }
  function debounce2(fn) {
    var pending;
    return function() {
      if (!pending) {
        pending = new Promise(function(resolve) {
          Promise.resolve().then(function() {
            pending = void 0;
            resolve(fn());
          });
        });
      }
      return pending;
    };
  }
  function format(str) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return [].concat(args).reduce(function(p, c) {
      return p.replace(/%s/, c);
    }, str);
  }
  var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
  var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
  var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
  function validateModifiers(modifiers) {
    modifiers.forEach(function(modifier) {
      Object.keys(modifier).forEach(function(key) {
        switch (key) {
          case "name":
            if (typeof modifier.name !== "string") {
              console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
            }
            break;
          case "enabled":
            if (typeof modifier.enabled !== "boolean") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
            }
          case "phase":
            if (modifierPhases.indexOf(modifier.phase) < 0) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
            }
            break;
          case "fn":
            if (typeof modifier.fn !== "function") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
            }
            break;
          case "effect":
            if (typeof modifier.effect !== "function") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
            }
            break;
          case "requires":
            if (!Array.isArray(modifier.requires)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
            }
            break;
          case "requiresIfExists":
            if (!Array.isArray(modifier.requiresIfExists)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
            }
            break;
          case "options":
          case "data":
            break;
          default:
            console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
              return '"' + s + '"';
            }).join(", ") + '; but "' + key + '" was provided.');
        }
        modifier.requires && modifier.requires.forEach(function(requirement) {
          if (modifiers.find(function(mod) {
            return mod.name === requirement;
          }) == null) {
            console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
          }
        });
      });
    });
  }
  function uniqueBy(arr, fn) {
    var identifiers = /* @__PURE__ */ new Set();
    return arr.filter(function(item) {
      var identifier = fn(item);
      if (!identifiers.has(identifier)) {
        identifiers.add(identifier);
        return true;
      }
    });
  }
  function getBasePlacement(placement) {
    return placement.split("-")[0];
  }
  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function(merged2, current) {
      var existing = merged2[current.name];
      merged2[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged2;
    }, {});
    return Object.keys(merged).map(function(key) {
      return merged[key];
    });
  }
  function getViewportRect(element) {
    var win = getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x: x + getWindowScrollBarX(element),
      y
    };
  }
  var max = Math.max;
  var min = Math.min;
  var round = Math.round;
  function getDocumentRect(element) {
    var _element$ownerDocumen;
    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;
    if (getComputedStyle2(body || html).direction === "rtl") {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode();
    if (parent.contains(child)) {
      return true;
    } else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;
      do {
        if (next && parent.isSameNode(next)) {
          return true;
        }
        next = next.parentNode || next.host;
      } while (next);
    }
    return false;
  }
  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }
  function getInnerBoundingClientRect(element) {
    var rect = getBoundingClientRect(element);
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }
  function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  }
  function getClippingParents(element) {
    var clippingParents2 = listScrollParents(getParentNode(element));
    var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
    if (!isElement(clipperElement)) {
      return [];
    }
    return clippingParents2.filter(function(clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
    });
  }
  function getClippingRect(element, boundary, rootBoundary) {
    var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
    var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents2[0];
    var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element, clippingParent);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }
  function getVariation(placement) {
    return placement.split("-")[1];
  }
  function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
  }
  function computeOffsets(_ref) {
    var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference2.x + reference2.width / 2 - element.width / 2;
    var commonY = reference2.y + reference2.height / 2 - element.height / 2;
    var offsets;
    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference2.y - element.height
        };
        break;
      case bottom:
        offsets = {
          x: commonX,
          y: reference2.y + reference2.height
        };
        break;
      case right:
        offsets = {
          x: reference2.x + reference2.width,
          y: commonY
        };
        break;
      case left:
        offsets = {
          x: reference2.x - element.width,
          y: commonY
        };
        break;
      default:
        offsets = {
          x: reference2.x,
          y: reference2.y
        };
    }
    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
    if (mainAxis != null) {
      var len = mainAxis === "y" ? "height" : "width";
      switch (variation) {
        case start2:
          offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
          break;
        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
          break;
      }
    }
    return offsets;
  }
  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }
  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }
  function expandToHashMap(value, keys) {
    return keys.reduce(function(hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }
  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var referenceElement = state.elements.reference;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = getBoundingClientRect(referenceElement);
    var popperOffsets2 = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: "absolute",
      placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset;
    if (elementContext === popper && offsetData) {
      var offset2 = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function(key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
        overflowOffsets[key] += offset2[axis] * multiply;
      });
    }
    return overflowOffsets;
  }
  var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
  var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
  var DEFAULT_OPTIONS = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return !args.some(function(element) {
      return !(element && typeof element.getBoundingClientRect === "function");
    });
  }
  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }
    var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper2(reference2, popper2, options) {
      if (options === void 0) {
        options = defaultOptions;
      }
      var state = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference2,
          popper: popper2
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state,
        setOptions: function setOptions(options2) {
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options2);
          state.scrollParents = {
            reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
            popper: listScrollParents(popper2)
          };
          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
          state.orderedModifiers = orderedModifiers.filter(function(m) {
            return m.enabled;
          });
          if (true) {
            var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
              var name = _ref.name;
              return name;
            });
            validateModifiers(modifiers);
            if (getBasePlacement(state.options.placement) === auto) {
              var flipModifier = state.orderedModifiers.find(function(_ref2) {
                var name = _ref2.name;
                return name === "flip";
              });
              if (!flipModifier) {
                console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
              }
            }
            var _getComputedStyle = getComputedStyle2(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
            if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
              return parseFloat(margin);
            })) {
              console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
            }
          }
          runModifierEffects();
          return instance.update();
        },
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }
          var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
          if (!areValidElements(reference3, popper3)) {
            if (true) {
              console.error(INVALID_ELEMENT_ERROR);
            }
            return;
          }
          state.rects = {
            reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
            popper: getLayoutRect(popper3)
          };
          state.reset = false;
          state.placement = state.options.placement;
          state.orderedModifiers.forEach(function(modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          var __debug_loops__ = 0;
          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (true) {
              __debug_loops__ += 1;
              if (__debug_loops__ > 100) {
                console.error(INFINITE_LOOP_ERROR);
                break;
              }
            }
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }
            var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
            if (typeof fn === "function") {
              state = fn({
                state,
                options: _options,
                name,
                instance
              }) || state;
            }
          }
        },
        update: debounce2(function() {
          return new Promise(function(resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };
      if (!areValidElements(reference2, popper2)) {
        if (true) {
          console.error(INVALID_ELEMENT_ERROR);
        }
        return instance;
      }
      instance.setOptions(options).then(function(state2) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state2);
        }
      });
      function runModifierEffects() {
        state.orderedModifiers.forEach(function(_ref3) {
          var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect22 = _ref3.effect;
          if (typeof effect22 === "function") {
            var cleanupFn = effect22({
              state,
              name,
              instance,
              options: options2
            });
            var noopFn = function noopFn2() {
            };
            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }
      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function(fn) {
          return fn();
        });
        effectCleanupFns = [];
      }
      return instance;
    };
  }
  var passive = {
    passive: true
  };
  function effect$2(_ref) {
    var state = _ref.state, instance = _ref.instance, options = _ref.options;
    var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
    var window2 = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.addEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.addEventListener("resize", instance.update, passive);
    }
    return function() {
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.removeEventListener("scroll", instance.update, passive);
        });
      }
      if (resize) {
        window2.removeEventListener("resize", instance.update, passive);
      }
    };
  }
  var eventListeners = {
    name: "eventListeners",
    enabled: true,
    phase: "write",
    fn: function fn() {
    },
    effect: effect$2,
    data: {}
  };
  function popperOffsets(_ref) {
    var state = _ref.state, name = _ref.name;
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: "absolute",
      placement: state.placement
    });
  }
  var popperOffsets$1 = {
    name: "popperOffsets",
    enabled: true,
    phase: "read",
    fn: popperOffsets,
    data: {}
  };
  var unsetSides = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  function roundOffsetsByDPR(_ref) {
    var x = _ref.x, y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(round(x * dpr) / dpr) || 0,
      y: round(round(y * dpr) / dpr) || 0
    };
  }
  function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets;
    var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y = _ref3$y === void 0 ? 0 : _ref3$y;
    var hasX = offsets.hasOwnProperty("x");
    var hasY = offsets.hasOwnProperty("y");
    var sideX = left;
    var sideY = top;
    var win = window;
    if (adaptive) {
      var offsetParent = getOffsetParent(popper2);
      var heightProp = "clientHeight";
      var widthProp = "clientWidth";
      if (offsetParent === getWindow(popper2)) {
        offsetParent = getDocumentElement(popper2);
        if (getComputedStyle2(offsetParent).position !== "static") {
          heightProp = "scrollHeight";
          widthProp = "scrollWidth";
        }
      }
      offsetParent = offsetParent;
      if (placement === top) {
        sideY = bottom;
        y -= offsetParent[heightProp] - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }
      if (placement === left) {
        sideX = right;
        x -= offsetParent[widthProp] - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }
    var commonStyles = Object.assign({
      position
    }, adaptive && unsetSides);
    if (gpuAcceleration) {
      var _Object$assign;
      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
  }
  function computeStyles(_ref4) {
    var state = _ref4.state, options = _ref4.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    if (true) {
      var transitionProperty = getComputedStyle2(state.elements.popper).transitionProperty || "";
      if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
        return transitionProperty.indexOf(property) >= 0;
      })) {
        console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
      }
    }
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration
    };
    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive,
        roundOffsets
      })));
    }
    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: "absolute",
        adaptive: false,
        roundOffsets
      })));
    }
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-placement": state.placement
    });
  }
  var computeStyles$1 = {
    name: "computeStyles",
    enabled: true,
    phase: "beforeWrite",
    fn: computeStyles,
    data: {}
  };
  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function(name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name];
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(name2) {
        var value = attributes[name2];
        if (value === false) {
          element.removeAttribute(name2);
        } else {
          element.setAttribute(name2, value === true ? "" : value);
        }
      });
    });
  }
  function effect$1(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
    return function() {
      Object.keys(state.elements).forEach(function(name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
        var style = styleProperties.reduce(function(style2, property) {
          style2[property] = "";
          return style2;
        }, {});
        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function(attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  }
  var applyStyles$1 = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: applyStyles,
    effect: effect$1,
    requires: ["computeStyles"]
  };
  function distanceAndSkiddingToXY(placement, rects, offset2) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
      placement
    })) : offset2, skidding = _ref[0], distance = _ref[1];
    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }
  function offset(_ref2) {
    var state = _ref2.state, options = _ref2.options, name = _ref2.name;
    var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data2 = placements.reduce(function(acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
      return acc;
    }, {});
    var _data$state$placement = data2[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name] = data2;
  }
  var offset$1 = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset
  };
  var hash$1 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function(matched) {
      return hash$1[matched];
    });
  }
  var hash = {
    start: "end",
    end: "start"
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function(matched) {
      return hash[matched];
    });
  }
  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
      return getVariation(placement2) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function(placement2) {
      return allowedAutoPlacements.indexOf(placement2) >= 0;
    });
    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
      if (true) {
        console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
      }
    }
    var overflows = allowedPlacements.reduce(function(acc, placement2) {
      acc[placement2] = detectOverflow(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding
      })[getBasePlacement(placement2)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function(a, b) {
      return overflows[a] - overflows[b];
    });
  }
  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }
    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }
  function flip(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    if (state.modifiersData[name]._skip) {
      return;
    }
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
      return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding,
        flipVariations,
        allowedAutoPlacements
      }) : placement2);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = /* @__PURE__ */ new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements2[0];
    for (var i = 0; i < placements2.length; i++) {
      var placement = placements2[i];
      var _basePlacement = getBasePlacement(placement);
      var isStartVariation = getVariation(placement) === start2;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? "width" : "height";
      var overflow = detectOverflow(state, {
        placement,
        boundary,
        rootBoundary,
        altBoundary,
        padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }
      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];
      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }
      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }
      if (checks.every(function(check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }
      checksMap.set(placement, checks);
    }
    if (makeFallbackChecks) {
      var numberOfChecks = flipVariations ? 3 : 1;
      var _loop = function _loop2(_i2) {
        var fittingPlacement = placements2.find(function(placement2) {
          var checks2 = checksMap.get(placement2);
          if (checks2) {
            return checks2.slice(0, _i2).every(function(check) {
              return check;
            });
          }
        });
        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };
      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);
        if (_ret === "break")
          break;
      }
    }
    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  }
  var flip$1 = {
    name: "flip",
    enabled: true,
    phase: "main",
    fn: flip,
    requiresIfExists: ["offset"],
    data: {
      _skip: false
    }
  };
  function getAltAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function preventOverflow(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary,
      rootBoundary,
      padding,
      altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var data2 = {
      x: 0,
      y: 0
    };
    if (!popperOffsets2) {
      return;
    }
    if (checkMainAxis || checkAltAxis) {
      var mainSide = mainAxis === "y" ? top : left;
      var altSide = mainAxis === "y" ? bottom : right;
      var len = mainAxis === "y" ? "height" : "width";
      var offset2 = popperOffsets2[mainAxis];
      var min$1 = popperOffsets2[mainAxis] + overflow[mainSide];
      var max$1 = popperOffsets2[mainAxis] - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start2 ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start2 ? -popperRect[len] : -referenceRect[len];
      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide];
      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
      var tetherMin = popperOffsets2[mainAxis] + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = popperOffsets2[mainAxis] + maxOffset - offsetModifierValue;
      if (checkMainAxis) {
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets2[mainAxis] = preventedOffset;
        data2[mainAxis] = preventedOffset - offset2;
      }
      if (checkAltAxis) {
        var _mainSide = mainAxis === "x" ? top : left;
        var _altSide = mainAxis === "x" ? bottom : right;
        var _offset = popperOffsets2[altAxis];
        var _min = _offset + overflow[_mainSide];
        var _max = _offset - overflow[_altSide];
        var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);
        popperOffsets2[altAxis] = _preventedOffset;
        data2[altAxis] = _preventedOffset - _offset;
      }
    }
    state.modifiersData[name] = data2;
  }
  var preventOverflow$1 = {
    name: "preventOverflow",
    enabled: true,
    phase: "main",
    fn: preventOverflow,
    requiresIfExists: ["offset"]
  };
  var toPaddingObject = function toPaddingObject2(padding, state) {
    padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  };
  function arrow(_ref) {
    var _state$modifiersData$;
    var state = _ref.state, name = _ref.name, options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? "height" : "width";
    if (!arrowElement || !popperOffsets2) {
      return;
    }
    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === "y" ? top : left;
    var maxProp = axis === "y" ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
    var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2;
    var min2 = paddingObject[minProp];
    var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset2 = within(min2, center, max2);
    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
  }
  function effect3(_ref2) {
    var state = _ref2.state, options = _ref2.options;
    var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
    if (arrowElement == null) {
      return;
    }
    if (typeof arrowElement === "string") {
      arrowElement = state.elements.popper.querySelector(arrowElement);
      if (!arrowElement) {
        return;
      }
    }
    if (true) {
      if (!isHTMLElement(arrowElement)) {
        console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
      }
    }
    if (!contains(state.elements.popper, arrowElement)) {
      if (true) {
        console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      }
      return;
    }
    state.elements.arrow = arrowElement;
  }
  var arrow$1 = {
    name: "arrow",
    enabled: true,
    phase: "main",
    fn: arrow,
    effect: effect3,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };
  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }
    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }
  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function(side) {
      return overflow[side] >= 0;
    });
  }
  function hide(_ref) {
    var state = _ref.state, name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: "reference"
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets,
      popperEscapeOffsets,
      isReferenceHidden,
      hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-reference-hidden": isReferenceHidden,
      "data-popper-escaped": hasPopperEscaped
    });
  }
  var hide$1 = {
    name: "hide",
    enabled: true,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: hide
  };
  var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
  var createPopper$1 = /* @__PURE__ */ popperGenerator({
    defaultModifiers: defaultModifiers$1
  });
  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /* @__PURE__ */ popperGenerator({
    defaultModifiers
  });
  exports.applyStyles = applyStyles$1;
  exports.arrow = arrow$1;
  exports.computeStyles = computeStyles$1;
  exports.createPopper = createPopper;
  exports.createPopperLite = createPopper$1;
  exports.defaultModifiers = defaultModifiers;
  exports.detectOverflow = detectOverflow;
  exports.eventListeners = eventListeners;
  exports.flip = flip$1;
  exports.hide = hide$1;
  exports.offset = offset$1;
  exports.popperGenerator = popperGenerator;
  exports.popperOffsets = popperOffsets$1;
  exports.preventOverflow = preventOverflow$1;
});
var require_tippy_cjs = __commonJS3((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var core = require_popper();
  var ROUND_ARROW = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>';
  var BOX_CLASS = "tippy-box";
  var CONTENT_CLASS = "tippy-content";
  var BACKDROP_CLASS = "tippy-backdrop";
  var ARROW_CLASS = "tippy-arrow";
  var SVG_ARROW_CLASS = "tippy-svg-arrow";
  var TOUCH_OPTIONS = {
    passive: true,
    capture: true
  };
  function hasOwnProperty2(obj, key) {
    return {}.hasOwnProperty.call(obj, key);
  }
  function getValueAtIndexOrReturn(value, index, defaultValue) {
    if (Array.isArray(value)) {
      var v = value[index];
      return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
    }
    return value;
  }
  function isType(value, type) {
    var str = {}.toString.call(value);
    return str.indexOf("[object") === 0 && str.indexOf(type + "]") > -1;
  }
  function invokeWithArgsOrReturn(value, args) {
    return typeof value === "function" ? value.apply(void 0, args) : value;
  }
  function debounce2(fn, ms) {
    if (ms === 0) {
      return fn;
    }
    var timeout;
    return function(arg) {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        fn(arg);
      }, ms);
    };
  }
  function removeProperties(obj, keys) {
    var clone2 = Object.assign({}, obj);
    keys.forEach(function(key) {
      delete clone2[key];
    });
    return clone2;
  }
  function splitBySpaces(value) {
    return value.split(/\s+/).filter(Boolean);
  }
  function normalizeToArray(value) {
    return [].concat(value);
  }
  function pushIfUnique(arr, value) {
    if (arr.indexOf(value) === -1) {
      arr.push(value);
    }
  }
  function unique(arr) {
    return arr.filter(function(item, index) {
      return arr.indexOf(item) === index;
    });
  }
  function getBasePlacement(placement) {
    return placement.split("-")[0];
  }
  function arrayFrom(value) {
    return [].slice.call(value);
  }
  function removeUndefinedProps(obj) {
    return Object.keys(obj).reduce(function(acc, key) {
      if (obj[key] !== void 0) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }
  function div() {
    return document.createElement("div");
  }
  function isElement(value) {
    return ["Element", "Fragment"].some(function(type) {
      return isType(value, type);
    });
  }
  function isNodeList(value) {
    return isType(value, "NodeList");
  }
  function isMouseEvent(value) {
    return isType(value, "MouseEvent");
  }
  function isReferenceElement(value) {
    return !!(value && value._tippy && value._tippy.reference === value);
  }
  function getArrayOfElements(value) {
    if (isElement(value)) {
      return [value];
    }
    if (isNodeList(value)) {
      return arrayFrom(value);
    }
    if (Array.isArray(value)) {
      return value;
    }
    return arrayFrom(document.querySelectorAll(value));
  }
  function setTransitionDuration(els, value) {
    els.forEach(function(el) {
      if (el) {
        el.style.transitionDuration = value + "ms";
      }
    });
  }
  function setVisibilityState(els, state) {
    els.forEach(function(el) {
      if (el) {
        el.setAttribute("data-state", state);
      }
    });
  }
  function getOwnerDocument(elementOrElements) {
    var _element$ownerDocumen;
    var _normalizeToArray = normalizeToArray(elementOrElements), element = _normalizeToArray[0];
    return (element == null ? void 0 : (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body) ? element.ownerDocument : document;
  }
  function isCursorOutsideInteractiveBorder(popperTreeData, event) {
    var clientX = event.clientX, clientY = event.clientY;
    return popperTreeData.every(function(_ref) {
      var popperRect = _ref.popperRect, popperState = _ref.popperState, props = _ref.props;
      var interactiveBorder = props.interactiveBorder;
      var basePlacement = getBasePlacement(popperState.placement);
      var offsetData = popperState.modifiersData.offset;
      if (!offsetData) {
        return true;
      }
      var topDistance = basePlacement === "bottom" ? offsetData.top.y : 0;
      var bottomDistance = basePlacement === "top" ? offsetData.bottom.y : 0;
      var leftDistance = basePlacement === "right" ? offsetData.left.x : 0;
      var rightDistance = basePlacement === "left" ? offsetData.right.x : 0;
      var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
      var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
      var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
      var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
      return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
    });
  }
  function updateTransitionEndListener(box, action, listener) {
    var method = action + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function(event) {
      box[method](event, listener);
    });
  }
  var currentInput = {
    isTouch: false
  };
  var lastMouseMoveTime = 0;
  function onDocumentTouchStart() {
    if (currentInput.isTouch) {
      return;
    }
    currentInput.isTouch = true;
    if (window.performance) {
      document.addEventListener("mousemove", onDocumentMouseMove);
    }
  }
  function onDocumentMouseMove() {
    var now = performance.now();
    if (now - lastMouseMoveTime < 20) {
      currentInput.isTouch = false;
      document.removeEventListener("mousemove", onDocumentMouseMove);
    }
    lastMouseMoveTime = now;
  }
  function onWindowBlur() {
    var activeElement = document.activeElement;
    if (isReferenceElement(activeElement)) {
      var instance = activeElement._tippy;
      if (activeElement.blur && !instance.state.isVisible) {
        activeElement.blur();
      }
    }
  }
  function bindGlobalEventListeners() {
    document.addEventListener("touchstart", onDocumentTouchStart, TOUCH_OPTIONS);
    window.addEventListener("blur", onWindowBlur);
  }
  var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
  var ua = isBrowser ? navigator.userAgent : "";
  var isIE = /MSIE |Trident\//.test(ua);
  function createMemoryLeakWarning(method) {
    var txt = method === "destroy" ? "n already-" : " ";
    return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
  }
  function clean(value) {
    var spacesAndTabs = /[ \t]{2,}/g;
    var lineStartWithSpaces = /^[ \t]*/gm;
    return value.replace(spacesAndTabs, " ").replace(lineStartWithSpaces, "").trim();
  }
  function getDevMessage(message) {
    return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\u{1F477}\u200D This is a development-only message. It will be removed in production.\n  ");
  }
  function getFormattedMessage(message) {
    return [
      getDevMessage(message),
      "color: #00C584; font-size: 1.3em; font-weight: bold;",
      "line-height: 1.5",
      "color: #a6a095;"
    ];
  }
  var visitedMessages;
  if (true) {
    resetVisitedMessages();
  }
  function resetVisitedMessages() {
    visitedMessages = /* @__PURE__ */ new Set();
  }
  function warnWhen(condition, message) {
    if (condition && !visitedMessages.has(message)) {
      var _console;
      visitedMessages.add(message);
      (_console = console).warn.apply(_console, getFormattedMessage(message));
    }
  }
  function errorWhen(condition, message) {
    if (condition && !visitedMessages.has(message)) {
      var _console2;
      visitedMessages.add(message);
      (_console2 = console).error.apply(_console2, getFormattedMessage(message));
    }
  }
  function validateTargets(targets) {
    var didPassFalsyValue = !targets;
    var didPassPlainObject = Object.prototype.toString.call(targets) === "[object Object]" && !targets.addEventListener;
    errorWhen(didPassFalsyValue, ["tippy() was passed", "`" + String(targets) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" "));
    errorWhen(didPassPlainObject, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
  }
  var pluginProps = {
    animateFill: false,
    followCursor: false,
    inlinePositioning: false,
    sticky: false
  };
  var renderProps = {
    allowHTML: false,
    animation: "fade",
    arrow: true,
    content: "",
    inertia: false,
    maxWidth: 350,
    role: "tooltip",
    theme: "",
    zIndex: 9999
  };
  var defaultProps = Object.assign({
    appendTo: function appendTo() {
      return document.body;
    },
    aria: {
      content: "auto",
      expanded: "auto"
    },
    delay: 0,
    duration: [300, 250],
    getReferenceClientRect: null,
    hideOnClick: true,
    ignoreAttributes: false,
    interactive: false,
    interactiveBorder: 2,
    interactiveDebounce: 0,
    moveTransition: "",
    offset: [0, 10],
    onAfterUpdate: function onAfterUpdate() {
    },
    onBeforeUpdate: function onBeforeUpdate() {
    },
    onCreate: function onCreate() {
    },
    onDestroy: function onDestroy() {
    },
    onHidden: function onHidden() {
    },
    onHide: function onHide() {
    },
    onMount: function onMount() {
    },
    onShow: function onShow() {
    },
    onShown: function onShown() {
    },
    onTrigger: function onTrigger() {
    },
    onUntrigger: function onUntrigger() {
    },
    onClickOutside: function onClickOutside() {
    },
    placement: "top",
    plugins: [],
    popperOptions: {},
    render: null,
    showOnCreate: false,
    touch: true,
    trigger: "mouseenter focus",
    triggerTarget: null
  }, pluginProps, {}, renderProps);
  var defaultKeys = Object.keys(defaultProps);
  var setDefaultProps = function setDefaultProps2(partialProps) {
    if (true) {
      validateProps(partialProps, []);
    }
    var keys = Object.keys(partialProps);
    keys.forEach(function(key) {
      defaultProps[key] = partialProps[key];
    });
  };
  function getExtendedPassedProps(passedProps) {
    var plugins = passedProps.plugins || [];
    var pluginProps2 = plugins.reduce(function(acc, plugin2) {
      var name = plugin2.name, defaultValue = plugin2.defaultValue;
      if (name) {
        acc[name] = passedProps[name] !== void 0 ? passedProps[name] : defaultValue;
      }
      return acc;
    }, {});
    return Object.assign({}, passedProps, {}, pluginProps2);
  }
  function getDataAttributeProps(reference, plugins) {
    var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
      plugins
    }))) : defaultKeys;
    var props = propKeys.reduce(function(acc, key) {
      var valueAsString = (reference.getAttribute("data-tippy-" + key) || "").trim();
      if (!valueAsString) {
        return acc;
      }
      if (key === "content") {
        acc[key] = valueAsString;
      } else {
        try {
          acc[key] = JSON.parse(valueAsString);
        } catch (e) {
          acc[key] = valueAsString;
        }
      }
      return acc;
    }, {});
    return props;
  }
  function evaluateProps(reference, props) {
    var out = Object.assign({}, props, {
      content: invokeWithArgsOrReturn(props.content, [reference])
    }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
    out.aria = Object.assign({}, defaultProps.aria, {}, out.aria);
    out.aria = {
      expanded: out.aria.expanded === "auto" ? props.interactive : out.aria.expanded,
      content: out.aria.content === "auto" ? props.interactive ? null : "describedby" : out.aria.content
    };
    return out;
  }
  function validateProps(partialProps, plugins) {
    if (partialProps === void 0) {
      partialProps = {};
    }
    if (plugins === void 0) {
      plugins = [];
    }
    var keys = Object.keys(partialProps);
    keys.forEach(function(prop) {
      var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
      var didPassUnknownProp = !hasOwnProperty2(nonPluginProps, prop);
      if (didPassUnknownProp) {
        didPassUnknownProp = plugins.filter(function(plugin2) {
          return plugin2.name === prop;
        }).length === 0;
      }
      warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", "\n\n", "All props: https://atomiks.github.io/tippyjs/v6/all-props/\n", "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
    });
  }
  var innerHTML = function innerHTML2() {
    return "innerHTML";
  };
  function dangerouslySetInnerHTML(element, html) {
    element[innerHTML()] = html;
  }
  function createArrowElement(value) {
    var arrow = div();
    if (value === true) {
      arrow.className = ARROW_CLASS;
    } else {
      arrow.className = SVG_ARROW_CLASS;
      if (isElement(value)) {
        arrow.appendChild(value);
      } else {
        dangerouslySetInnerHTML(arrow, value);
      }
    }
    return arrow;
  }
  function setContent(content, props) {
    if (isElement(props.content)) {
      dangerouslySetInnerHTML(content, "");
      content.appendChild(props.content);
    } else if (typeof props.content !== "function") {
      if (props.allowHTML) {
        dangerouslySetInnerHTML(content, props.content);
      } else {
        content.textContent = props.content;
      }
    }
  }
  function getChildren(popper) {
    var box = popper.firstElementChild;
    var boxChildren = arrayFrom(box.children);
    return {
      box,
      content: boxChildren.find(function(node) {
        return node.classList.contains(CONTENT_CLASS);
      }),
      arrow: boxChildren.find(function(node) {
        return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
      }),
      backdrop: boxChildren.find(function(node) {
        return node.classList.contains(BACKDROP_CLASS);
      })
    };
  }
  function render(instance) {
    var popper = div();
    var box = div();
    box.className = BOX_CLASS;
    box.setAttribute("data-state", "hidden");
    box.setAttribute("tabindex", "-1");
    var content = div();
    content.className = CONTENT_CLASS;
    content.setAttribute("data-state", "hidden");
    setContent(content, instance.props);
    popper.appendChild(box);
    box.appendChild(content);
    onUpdate(instance.props, instance.props);
    function onUpdate(prevProps, nextProps) {
      var _getChildren = getChildren(popper), box2 = _getChildren.box, content2 = _getChildren.content, arrow = _getChildren.arrow;
      if (nextProps.theme) {
        box2.setAttribute("data-theme", nextProps.theme);
      } else {
        box2.removeAttribute("data-theme");
      }
      if (typeof nextProps.animation === "string") {
        box2.setAttribute("data-animation", nextProps.animation);
      } else {
        box2.removeAttribute("data-animation");
      }
      if (nextProps.inertia) {
        box2.setAttribute("data-inertia", "");
      } else {
        box2.removeAttribute("data-inertia");
      }
      box2.style.maxWidth = typeof nextProps.maxWidth === "number" ? nextProps.maxWidth + "px" : nextProps.maxWidth;
      if (nextProps.role) {
        box2.setAttribute("role", nextProps.role);
      } else {
        box2.removeAttribute("role");
      }
      if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
        setContent(content2, instance.props);
      }
      if (nextProps.arrow) {
        if (!arrow) {
          box2.appendChild(createArrowElement(nextProps.arrow));
        } else if (prevProps.arrow !== nextProps.arrow) {
          box2.removeChild(arrow);
          box2.appendChild(createArrowElement(nextProps.arrow));
        }
      } else if (arrow) {
        box2.removeChild(arrow);
      }
    }
    return {
      popper,
      onUpdate
    };
  }
  render.$$tippy = true;
  var idCounter = 1;
  var mouseMoveListeners = [];
  var mountedInstances = [];
  function createTippy(reference, passedProps) {
    var props = evaluateProps(reference, Object.assign({}, defaultProps, {}, getExtendedPassedProps(removeUndefinedProps(passedProps))));
    var showTimeout;
    var hideTimeout;
    var scheduleHideAnimationFrame;
    var isVisibleFromClick = false;
    var didHideDueToDocumentMouseDown = false;
    var didTouchMove = false;
    var ignoreOnFirstUpdate = false;
    var lastTriggerEvent;
    var currentTransitionEndListener;
    var onFirstUpdate;
    var listeners = [];
    var debouncedOnMouseMove = debounce2(onMouseMove, props.interactiveDebounce);
    var currentTarget;
    var id = idCounter++;
    var popperInstance = null;
    var plugins = unique(props.plugins);
    var state = {
      isEnabled: true,
      isVisible: false,
      isDestroyed: false,
      isMounted: false,
      isShown: false
    };
    var instance = {
      id,
      reference,
      popper: div(),
      popperInstance,
      props,
      state,
      plugins,
      clearDelayTimeouts,
      setProps,
      setContent: setContent2,
      show,
      hide,
      hideWithInteractivity,
      enable,
      disable,
      unmount,
      destroy
    };
    if (!props.render) {
      if (true) {
        errorWhen(true, "render() function has not been supplied.");
      }
      return instance;
    }
    var _props$render = props.render(instance), popper = _props$render.popper, onUpdate = _props$render.onUpdate;
    popper.setAttribute("data-tippy-root", "");
    popper.id = "tippy-" + instance.id;
    instance.popper = popper;
    reference._tippy = instance;
    popper._tippy = instance;
    var pluginsHooks = plugins.map(function(plugin2) {
      return plugin2.fn(instance);
    });
    var hasAriaExpanded = reference.hasAttribute("aria-expanded");
    addListeners();
    handleAriaExpandedAttribute();
    handleStyles();
    invokeHook("onCreate", [instance]);
    if (props.showOnCreate) {
      scheduleShow();
    }
    popper.addEventListener("mouseenter", function() {
      if (instance.props.interactive && instance.state.isVisible) {
        instance.clearDelayTimeouts();
      }
    });
    popper.addEventListener("mouseleave", function(event) {
      if (instance.props.interactive && instance.props.trigger.indexOf("mouseenter") >= 0) {
        getDocument().addEventListener("mousemove", debouncedOnMouseMove);
        debouncedOnMouseMove(event);
      }
    });
    return instance;
    function getNormalizedTouchSettings() {
      var touch = instance.props.touch;
      return Array.isArray(touch) ? touch : [touch, 0];
    }
    function getIsCustomTouchBehavior() {
      return getNormalizedTouchSettings()[0] === "hold";
    }
    function getIsDefaultRenderFn() {
      var _instance$props$rende;
      return !!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy);
    }
    function getCurrentTarget() {
      return currentTarget || reference;
    }
    function getDocument() {
      var parent = getCurrentTarget().parentNode;
      return parent ? getOwnerDocument(parent) : document;
    }
    function getDefaultTemplateChildren() {
      return getChildren(popper);
    }
    function getDelay(isShow) {
      if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === "focus") {
        return 0;
      }
      return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
    }
    function handleStyles() {
      popper.style.pointerEvents = instance.props.interactive && instance.state.isVisible ? "" : "none";
      popper.style.zIndex = "" + instance.props.zIndex;
    }
    function invokeHook(hook, args, shouldInvokePropsHook) {
      if (shouldInvokePropsHook === void 0) {
        shouldInvokePropsHook = true;
      }
      pluginsHooks.forEach(function(pluginHooks) {
        if (pluginHooks[hook]) {
          pluginHooks[hook].apply(void 0, args);
        }
      });
      if (shouldInvokePropsHook) {
        var _instance$props;
        (_instance$props = instance.props)[hook].apply(_instance$props, args);
      }
    }
    function handleAriaContentAttribute() {
      var aria = instance.props.aria;
      if (!aria.content) {
        return;
      }
      var attr = "aria-" + aria.content;
      var id2 = popper.id;
      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function(node) {
        var currentValue = node.getAttribute(attr);
        if (instance.state.isVisible) {
          node.setAttribute(attr, currentValue ? currentValue + " " + id2 : id2);
        } else {
          var nextValue = currentValue && currentValue.replace(id2, "").trim();
          if (nextValue) {
            node.setAttribute(attr, nextValue);
          } else {
            node.removeAttribute(attr);
          }
        }
      });
    }
    function handleAriaExpandedAttribute() {
      if (hasAriaExpanded || !instance.props.aria.expanded) {
        return;
      }
      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function(node) {
        if (instance.props.interactive) {
          node.setAttribute("aria-expanded", instance.state.isVisible && node === getCurrentTarget() ? "true" : "false");
        } else {
          node.removeAttribute("aria-expanded");
        }
      });
    }
    function cleanupInteractiveMouseListeners() {
      getDocument().removeEventListener("mousemove", debouncedOnMouseMove);
      mouseMoveListeners = mouseMoveListeners.filter(function(listener) {
        return listener !== debouncedOnMouseMove;
      });
    }
    function onDocumentPress(event) {
      if (currentInput.isTouch) {
        if (didTouchMove || event.type === "mousedown") {
          return;
        }
      }
      if (instance.props.interactive && popper.contains(event.target)) {
        return;
      }
      if (getCurrentTarget().contains(event.target)) {
        if (currentInput.isTouch) {
          return;
        }
        if (instance.state.isVisible && instance.props.trigger.indexOf("click") >= 0) {
          return;
        }
      } else {
        invokeHook("onClickOutside", [instance, event]);
      }
      if (instance.props.hideOnClick === true) {
        instance.clearDelayTimeouts();
        instance.hide();
        didHideDueToDocumentMouseDown = true;
        setTimeout(function() {
          didHideDueToDocumentMouseDown = false;
        });
        if (!instance.state.isMounted) {
          removeDocumentPress();
        }
      }
    }
    function onTouchMove() {
      didTouchMove = true;
    }
    function onTouchStart() {
      didTouchMove = false;
    }
    function addDocumentPress() {
      var doc = getDocument();
      doc.addEventListener("mousedown", onDocumentPress, true);
      doc.addEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
      doc.addEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
      doc.addEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
    }
    function removeDocumentPress() {
      var doc = getDocument();
      doc.removeEventListener("mousedown", onDocumentPress, true);
      doc.removeEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
      doc.removeEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
      doc.removeEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
    }
    function onTransitionedOut(duration, callback) {
      onTransitionEnd(duration, function() {
        if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
          callback();
        }
      });
    }
    function onTransitionedIn(duration, callback) {
      onTransitionEnd(duration, callback);
    }
    function onTransitionEnd(duration, callback) {
      var box = getDefaultTemplateChildren().box;
      function listener(event) {
        if (event.target === box) {
          updateTransitionEndListener(box, "remove", listener);
          callback();
        }
      }
      if (duration === 0) {
        return callback();
      }
      updateTransitionEndListener(box, "remove", currentTransitionEndListener);
      updateTransitionEndListener(box, "add", listener);
      currentTransitionEndListener = listener;
    }
    function on2(eventType, handler4, options) {
      if (options === void 0) {
        options = false;
      }
      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function(node) {
        node.addEventListener(eventType, handler4, options);
        listeners.push({
          node,
          eventType,
          handler: handler4,
          options
        });
      });
    }
    function addListeners() {
      if (getIsCustomTouchBehavior()) {
        on2("touchstart", onTrigger, {
          passive: true
        });
        on2("touchend", onMouseLeave, {
          passive: true
        });
      }
      splitBySpaces(instance.props.trigger).forEach(function(eventType) {
        if (eventType === "manual") {
          return;
        }
        on2(eventType, onTrigger);
        switch (eventType) {
          case "mouseenter":
            on2("mouseleave", onMouseLeave);
            break;
          case "focus":
            on2(isIE ? "focusout" : "blur", onBlurOrFocusOut);
            break;
          case "focusin":
            on2("focusout", onBlurOrFocusOut);
            break;
        }
      });
    }
    function removeListeners() {
      listeners.forEach(function(_ref) {
        var node = _ref.node, eventType = _ref.eventType, handler4 = _ref.handler, options = _ref.options;
        node.removeEventListener(eventType, handler4, options);
      });
      listeners = [];
    }
    function onTrigger(event) {
      var _lastTriggerEvent;
      var shouldScheduleClickHide = false;
      if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
        return;
      }
      var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === "focus";
      lastTriggerEvent = event;
      currentTarget = event.currentTarget;
      handleAriaExpandedAttribute();
      if (!instance.state.isVisible && isMouseEvent(event)) {
        mouseMoveListeners.forEach(function(listener) {
          return listener(event);
        });
      }
      if (event.type === "click" && (instance.props.trigger.indexOf("mouseenter") < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
        shouldScheduleClickHide = true;
      } else {
        scheduleShow(event);
      }
      if (event.type === "click") {
        isVisibleFromClick = !shouldScheduleClickHide;
      }
      if (shouldScheduleClickHide && !wasFocused) {
        scheduleHide(event);
      }
    }
    function onMouseMove(event) {
      var target = event.target;
      var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);
      if (event.type === "mousemove" && isCursorOverReferenceOrPopper) {
        return;
      }
      var popperTreeData = getNestedPopperTree().concat(popper).map(function(popper2) {
        var _instance$popperInsta;
        var instance2 = popper2._tippy;
        var state2 = (_instance$popperInsta = instance2.popperInstance) == null ? void 0 : _instance$popperInsta.state;
        if (state2) {
          return {
            popperRect: popper2.getBoundingClientRect(),
            popperState: state2,
            props
          };
        }
        return null;
      }).filter(Boolean);
      if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
        cleanupInteractiveMouseListeners();
        scheduleHide(event);
      }
    }
    function onMouseLeave(event) {
      var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf("click") >= 0 && isVisibleFromClick;
      if (shouldBail) {
        return;
      }
      if (instance.props.interactive) {
        instance.hideWithInteractivity(event);
        return;
      }
      scheduleHide(event);
    }
    function onBlurOrFocusOut(event) {
      if (instance.props.trigger.indexOf("focusin") < 0 && event.target !== getCurrentTarget()) {
        return;
      }
      if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
        return;
      }
      scheduleHide(event);
    }
    function isEventListenerStopped(event) {
      return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf("touch") >= 0 : false;
    }
    function createPopperInstance() {
      destroyPopperInstance();
      var _instance$props2 = instance.props, popperOptions = _instance$props2.popperOptions, placement = _instance$props2.placement, offset = _instance$props2.offset, getReferenceClientRect = _instance$props2.getReferenceClientRect, moveTransition = _instance$props2.moveTransition;
      var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
      var computedReference = getReferenceClientRect ? {
        getBoundingClientRect: getReferenceClientRect,
        contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
      } : reference;
      var tippyModifier = {
        name: "$$tippy",
        enabled: true,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: function fn(_ref2) {
          var state2 = _ref2.state;
          if (getIsDefaultRenderFn()) {
            var _getDefaultTemplateCh = getDefaultTemplateChildren(), box = _getDefaultTemplateCh.box;
            ["placement", "reference-hidden", "escaped"].forEach(function(attr) {
              if (attr === "placement") {
                box.setAttribute("data-placement", state2.placement);
              } else {
                if (state2.attributes.popper["data-popper-" + attr]) {
                  box.setAttribute("data-" + attr, "");
                } else {
                  box.removeAttribute("data-" + attr);
                }
              }
            });
            state2.attributes.popper = {};
          }
        }
      };
      var modifiers = [{
        name: "offset",
        options: {
          offset
        }
      }, {
        name: "preventOverflow",
        options: {
          padding: {
            top: 2,
            bottom: 2,
            left: 5,
            right: 5
          }
        }
      }, {
        name: "flip",
        options: {
          padding: 5
        }
      }, {
        name: "computeStyles",
        options: {
          adaptive: !moveTransition
        }
      }, tippyModifier];
      if (getIsDefaultRenderFn() && arrow) {
        modifiers.push({
          name: "arrow",
          options: {
            element: arrow,
            padding: 3
          }
        });
      }
      modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
      instance.popperInstance = core.createPopper(computedReference, popper, Object.assign({}, popperOptions, {
        placement,
        onFirstUpdate,
        modifiers
      }));
    }
    function destroyPopperInstance() {
      if (instance.popperInstance) {
        instance.popperInstance.destroy();
        instance.popperInstance = null;
      }
    }
    function mount() {
      var appendTo = instance.props.appendTo;
      var parentNode;
      var node = getCurrentTarget();
      if (instance.props.interactive && appendTo === defaultProps.appendTo || appendTo === "parent") {
        parentNode = node.parentNode;
      } else {
        parentNode = invokeWithArgsOrReturn(appendTo, [node]);
      }
      if (!parentNode.contains(popper)) {
        parentNode.appendChild(popper);
      }
      createPopperInstance();
      if (true) {
        warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", "\n\n", "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", "\n\n", "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", "\n\n", "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
      }
    }
    function getNestedPopperTree() {
      return arrayFrom(popper.querySelectorAll("[data-tippy-root]"));
    }
    function scheduleShow(event) {
      instance.clearDelayTimeouts();
      if (event) {
        invokeHook("onTrigger", [instance, event]);
      }
      addDocumentPress();
      var delay3 = getDelay(true);
      var _getNormalizedTouchSe = getNormalizedTouchSettings(), touchValue = _getNormalizedTouchSe[0], touchDelay = _getNormalizedTouchSe[1];
      if (currentInput.isTouch && touchValue === "hold" && touchDelay) {
        delay3 = touchDelay;
      }
      if (delay3) {
        showTimeout = setTimeout(function() {
          instance.show();
        }, delay3);
      } else {
        instance.show();
      }
    }
    function scheduleHide(event) {
      instance.clearDelayTimeouts();
      invokeHook("onUntrigger", [instance, event]);
      if (!instance.state.isVisible) {
        removeDocumentPress();
        return;
      }
      if (instance.props.trigger.indexOf("mouseenter") >= 0 && instance.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(event.type) >= 0 && isVisibleFromClick) {
        return;
      }
      var delay3 = getDelay(false);
      if (delay3) {
        hideTimeout = setTimeout(function() {
          if (instance.state.isVisible) {
            instance.hide();
          }
        }, delay3);
      } else {
        scheduleHideAnimationFrame = requestAnimationFrame(function() {
          instance.hide();
        });
      }
    }
    function enable() {
      instance.state.isEnabled = true;
    }
    function disable() {
      instance.hide();
      instance.state.isEnabled = false;
    }
    function clearDelayTimeouts() {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      cancelAnimationFrame(scheduleHideAnimationFrame);
    }
    function setProps(partialProps) {
      if (true) {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("setProps"));
      }
      if (instance.state.isDestroyed) {
        return;
      }
      invokeHook("onBeforeUpdate", [instance, partialProps]);
      removeListeners();
      var prevProps = instance.props;
      var nextProps = evaluateProps(reference, Object.assign({}, instance.props, {}, partialProps, {
        ignoreAttributes: true
      }));
      instance.props = nextProps;
      addListeners();
      if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
        cleanupInteractiveMouseListeners();
        debouncedOnMouseMove = debounce2(onMouseMove, nextProps.interactiveDebounce);
      }
      if (prevProps.triggerTarget && !nextProps.triggerTarget) {
        normalizeToArray(prevProps.triggerTarget).forEach(function(node) {
          node.removeAttribute("aria-expanded");
        });
      } else if (nextProps.triggerTarget) {
        reference.removeAttribute("aria-expanded");
      }
      handleAriaExpandedAttribute();
      handleStyles();
      if (onUpdate) {
        onUpdate(prevProps, nextProps);
      }
      if (instance.popperInstance) {
        createPopperInstance();
        getNestedPopperTree().forEach(function(nestedPopper) {
          requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
        });
      }
      invokeHook("onAfterUpdate", [instance, partialProps]);
    }
    function setContent2(content) {
      instance.setProps({
        content
      });
    }
    function show() {
      if (true) {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("show"));
      }
      var isAlreadyVisible = instance.state.isVisible;
      var isDestroyed = instance.state.isDestroyed;
      var isDisabled = !instance.state.isEnabled;
      var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
      var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);
      if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
        return;
      }
      if (getCurrentTarget().hasAttribute("disabled")) {
        return;
      }
      invokeHook("onShow", [instance], false);
      if (instance.props.onShow(instance) === false) {
        return;
      }
      instance.state.isVisible = true;
      if (getIsDefaultRenderFn()) {
        popper.style.visibility = "visible";
      }
      handleStyles();
      addDocumentPress();
      if (!instance.state.isMounted) {
        popper.style.transition = "none";
      }
      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh2 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh2.box, content = _getDefaultTemplateCh2.content;
        setTransitionDuration([box, content], 0);
      }
      onFirstUpdate = function onFirstUpdate2() {
        var _instance$popperInsta2;
        if (!instance.state.isVisible || ignoreOnFirstUpdate) {
          return;
        }
        ignoreOnFirstUpdate = true;
        void popper.offsetHeight;
        popper.style.transition = instance.props.moveTransition;
        if (getIsDefaultRenderFn() && instance.props.animation) {
          var _getDefaultTemplateCh3 = getDefaultTemplateChildren(), _box = _getDefaultTemplateCh3.box, _content = _getDefaultTemplateCh3.content;
          setTransitionDuration([_box, _content], duration);
          setVisibilityState([_box, _content], "visible");
        }
        handleAriaContentAttribute();
        handleAriaExpandedAttribute();
        pushIfUnique(mountedInstances, instance);
        (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
        instance.state.isMounted = true;
        invokeHook("onMount", [instance]);
        if (instance.props.animation && getIsDefaultRenderFn()) {
          onTransitionedIn(duration, function() {
            instance.state.isShown = true;
            invokeHook("onShown", [instance]);
          });
        }
      };
      mount();
    }
    function hide() {
      if (true) {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("hide"));
      }
      var isAlreadyHidden = !instance.state.isVisible;
      var isDestroyed = instance.state.isDestroyed;
      var isDisabled = !instance.state.isEnabled;
      var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);
      if (isAlreadyHidden || isDestroyed || isDisabled) {
        return;
      }
      invokeHook("onHide", [instance], false);
      if (instance.props.onHide(instance) === false) {
        return;
      }
      instance.state.isVisible = false;
      instance.state.isShown = false;
      ignoreOnFirstUpdate = false;
      isVisibleFromClick = false;
      if (getIsDefaultRenderFn()) {
        popper.style.visibility = "hidden";
      }
      cleanupInteractiveMouseListeners();
      removeDocumentPress();
      handleStyles();
      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh4 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh4.box, content = _getDefaultTemplateCh4.content;
        if (instance.props.animation) {
          setTransitionDuration([box, content], duration);
          setVisibilityState([box, content], "hidden");
        }
      }
      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      if (instance.props.animation) {
        if (getIsDefaultRenderFn()) {
          onTransitionedOut(duration, instance.unmount);
        }
      } else {
        instance.unmount();
      }
    }
    function hideWithInteractivity(event) {
      if (true) {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("hideWithInteractivity"));
      }
      getDocument().addEventListener("mousemove", debouncedOnMouseMove);
      pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
      debouncedOnMouseMove(event);
    }
    function unmount() {
      if (true) {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("unmount"));
      }
      if (instance.state.isVisible) {
        instance.hide();
      }
      if (!instance.state.isMounted) {
        return;
      }
      destroyPopperInstance();
      getNestedPopperTree().forEach(function(nestedPopper) {
        nestedPopper._tippy.unmount();
      });
      if (popper.parentNode) {
        popper.parentNode.removeChild(popper);
      }
      mountedInstances = mountedInstances.filter(function(i) {
        return i !== instance;
      });
      instance.state.isMounted = false;
      invokeHook("onHidden", [instance]);
    }
    function destroy() {
      if (true) {
        warnWhen(instance.state.isDestroyed, createMemoryLeakWarning("destroy"));
      }
      if (instance.state.isDestroyed) {
        return;
      }
      instance.clearDelayTimeouts();
      instance.unmount();
      removeListeners();
      delete reference._tippy;
      instance.state.isDestroyed = true;
      invokeHook("onDestroy", [instance]);
    }
  }
  function tippy2(targets, optionalProps) {
    if (optionalProps === void 0) {
      optionalProps = {};
    }
    var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
    if (true) {
      validateTargets(targets);
      validateProps(optionalProps, plugins);
    }
    bindGlobalEventListeners();
    var passedProps = Object.assign({}, optionalProps, {
      plugins
    });
    var elements = getArrayOfElements(targets);
    if (true) {
      var isSingleContentElement = isElement(passedProps.content);
      var isMoreThanOneReferenceElement = elements.length > 1;
      warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", "\n\n", "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", "\n\n", "1) content: element.innerHTML\n", "2) content: () => element.cloneNode(true)"].join(" "));
    }
    var instances = elements.reduce(function(acc, reference) {
      var instance = reference && createTippy(reference, passedProps);
      if (instance) {
        acc.push(instance);
      }
      return acc;
    }, []);
    return isElement(targets) ? instances[0] : instances;
  }
  tippy2.defaultProps = defaultProps;
  tippy2.setDefaultProps = setDefaultProps;
  tippy2.currentInput = currentInput;
  var hideAll = function hideAll2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, excludedReferenceOrInstance = _ref.exclude, duration = _ref.duration;
    mountedInstances.forEach(function(instance) {
      var isExcluded = false;
      if (excludedReferenceOrInstance) {
        isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : instance.popper === excludedReferenceOrInstance.popper;
      }
      if (!isExcluded) {
        var originalDuration = instance.props.duration;
        instance.setProps({
          duration
        });
        instance.hide();
        if (!instance.state.isDestroyed) {
          instance.setProps({
            duration: originalDuration
          });
        }
      }
    });
  };
  var applyStylesModifier = Object.assign({}, core.applyStyles, {
    effect: function effect3(_ref) {
      var state = _ref.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: "0",
          top: "0",
          margin: "0"
        },
        arrow: {
          position: "absolute"
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;
      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }
    }
  });
  var createSingleton = function createSingleton2(tippyInstances, optionalProps) {
    var _optionalProps$popper;
    if (optionalProps === void 0) {
      optionalProps = {};
    }
    if (true) {
      errorWhen(!Array.isArray(tippyInstances), ["The first argument passed to createSingleton() must be an array of", "tippy instances. The passed value was", String(tippyInstances)].join(" "));
    }
    var individualInstances = tippyInstances;
    var references = [];
    var currentTarget;
    var overrides = optionalProps.overrides;
    var interceptSetPropsCleanups = [];
    var shownOnCreate = false;
    function setReferences() {
      references = individualInstances.map(function(instance) {
        return instance.reference;
      });
    }
    function enableInstances(isEnabled) {
      individualInstances.forEach(function(instance) {
        if (isEnabled) {
          instance.enable();
        } else {
          instance.disable();
        }
      });
    }
    function interceptSetProps(singleton2) {
      return individualInstances.map(function(instance) {
        var originalSetProps2 = instance.setProps;
        instance.setProps = function(props) {
          originalSetProps2(props);
          if (instance.reference === currentTarget) {
            singleton2.setProps(props);
          }
        };
        return function() {
          instance.setProps = originalSetProps2;
        };
      });
    }
    function prepareInstance(singleton2, target) {
      var index = references.indexOf(target);
      if (target === currentTarget) {
        return;
      }
      currentTarget = target;
      var overrideProps = (overrides || []).concat("content").reduce(function(acc, prop) {
        acc[prop] = individualInstances[index].props[prop];
        return acc;
      }, {});
      singleton2.setProps(Object.assign({}, overrideProps, {
        getReferenceClientRect: typeof overrideProps.getReferenceClientRect === "function" ? overrideProps.getReferenceClientRect : function() {
          return target.getBoundingClientRect();
        }
      }));
    }
    enableInstances(false);
    setReferences();
    var plugin2 = {
      fn: function fn() {
        return {
          onDestroy: function onDestroy() {
            enableInstances(true);
          },
          onHidden: function onHidden() {
            currentTarget = null;
          },
          onClickOutside: function onClickOutside(instance) {
            if (instance.props.showOnCreate && !shownOnCreate) {
              shownOnCreate = true;
              currentTarget = null;
            }
          },
          onShow: function onShow(instance) {
            if (instance.props.showOnCreate && !shownOnCreate) {
              shownOnCreate = true;
              prepareInstance(instance, references[0]);
            }
          },
          onTrigger: function onTrigger(instance, event) {
            prepareInstance(instance, event.currentTarget);
          }
        };
      }
    };
    var singleton = tippy2(div(), Object.assign({}, removeProperties(optionalProps, ["overrides"]), {
      plugins: [plugin2].concat(optionalProps.plugins || []),
      triggerTarget: references,
      popperOptions: Object.assign({}, optionalProps.popperOptions, {
        modifiers: [].concat(((_optionalProps$popper = optionalProps.popperOptions) == null ? void 0 : _optionalProps$popper.modifiers) || [], [applyStylesModifier])
      })
    }));
    var originalShow = singleton.show;
    singleton.show = function(target) {
      originalShow();
      if (!currentTarget && target == null) {
        return prepareInstance(singleton, references[0]);
      }
      if (currentTarget && target == null) {
        return;
      }
      if (typeof target === "number") {
        return references[target] && prepareInstance(singleton, references[target]);
      }
      if (individualInstances.includes(target)) {
        var ref = target.reference;
        return prepareInstance(singleton, ref);
      }
      if (references.includes(target)) {
        return prepareInstance(singleton, target);
      }
    };
    singleton.showNext = function() {
      var first = references[0];
      if (!currentTarget) {
        return singleton.show(0);
      }
      var index = references.indexOf(currentTarget);
      singleton.show(references[index + 1] || first);
    };
    singleton.showPrevious = function() {
      var last = references[references.length - 1];
      if (!currentTarget) {
        return singleton.show(last);
      }
      var index = references.indexOf(currentTarget);
      var target = references[index - 1] || last;
      singleton.show(target);
    };
    var originalSetProps = singleton.setProps;
    singleton.setProps = function(props) {
      overrides = props.overrides || overrides;
      originalSetProps(props);
    };
    singleton.setInstances = function(nextInstances) {
      enableInstances(true);
      interceptSetPropsCleanups.forEach(function(fn) {
        return fn();
      });
      individualInstances = nextInstances;
      enableInstances(false);
      setReferences();
      interceptSetProps(singleton);
      singleton.setProps({
        triggerTarget: references
      });
    };
    interceptSetPropsCleanups = interceptSetProps(singleton);
    return singleton;
  };
  var BUBBLING_EVENTS_MAP = {
    mouseover: "mouseenter",
    focusin: "focus",
    click: "click"
  };
  function delegate(targets, props) {
    if (true) {
      errorWhen(!(props && props.target), ["You must specity a `target` prop indicating a CSS selector string matching", "the target elements that should receive a tippy."].join(" "));
    }
    var listeners = [];
    var childTippyInstances = [];
    var disabled = false;
    var target = props.target;
    var nativeProps = removeProperties(props, ["target"]);
    var parentProps = Object.assign({}, nativeProps, {
      trigger: "manual",
      touch: false
    });
    var childProps = Object.assign({}, nativeProps, {
      showOnCreate: true
    });
    var returnValue = tippy2(targets, parentProps);
    var normalizedReturnValue = normalizeToArray(returnValue);
    function onTrigger(event) {
      if (!event.target || disabled) {
        return;
      }
      var targetNode = event.target.closest(target);
      if (!targetNode) {
        return;
      }
      var trigger2 = targetNode.getAttribute("data-tippy-trigger") || props.trigger || defaultProps.trigger;
      if (targetNode._tippy) {
        return;
      }
      if (event.type === "touchstart" && typeof childProps.touch === "boolean") {
        return;
      }
      if (event.type !== "touchstart" && trigger2.indexOf(BUBBLING_EVENTS_MAP[event.type]) < 0) {
        return;
      }
      var instance = tippy2(targetNode, childProps);
      if (instance) {
        childTippyInstances = childTippyInstances.concat(instance);
      }
    }
    function on2(node, eventType, handler4, options) {
      if (options === void 0) {
        options = false;
      }
      node.addEventListener(eventType, handler4, options);
      listeners.push({
        node,
        eventType,
        handler: handler4,
        options
      });
    }
    function addEventListeners(instance) {
      var reference = instance.reference;
      on2(reference, "touchstart", onTrigger, TOUCH_OPTIONS);
      on2(reference, "mouseover", onTrigger);
      on2(reference, "focusin", onTrigger);
      on2(reference, "click", onTrigger);
    }
    function removeEventListeners() {
      listeners.forEach(function(_ref) {
        var node = _ref.node, eventType = _ref.eventType, handler4 = _ref.handler, options = _ref.options;
        node.removeEventListener(eventType, handler4, options);
      });
      listeners = [];
    }
    function applyMutations(instance) {
      var originalDestroy = instance.destroy;
      var originalEnable = instance.enable;
      var originalDisable = instance.disable;
      instance.destroy = function(shouldDestroyChildInstances) {
        if (shouldDestroyChildInstances === void 0) {
          shouldDestroyChildInstances = true;
        }
        if (shouldDestroyChildInstances) {
          childTippyInstances.forEach(function(instance2) {
            instance2.destroy();
          });
        }
        childTippyInstances = [];
        removeEventListeners();
        originalDestroy();
      };
      instance.enable = function() {
        originalEnable();
        childTippyInstances.forEach(function(instance2) {
          return instance2.enable();
        });
        disabled = false;
      };
      instance.disable = function() {
        originalDisable();
        childTippyInstances.forEach(function(instance2) {
          return instance2.disable();
        });
        disabled = true;
      };
      addEventListeners(instance);
    }
    normalizedReturnValue.forEach(applyMutations);
    return returnValue;
  }
  var animateFill = {
    name: "animateFill",
    defaultValue: false,
    fn: function fn(instance) {
      var _instance$props$rende;
      if (!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy)) {
        if (true) {
          errorWhen(instance.props.animateFill, "The `animateFill` plugin requires the default render function.");
        }
        return {};
      }
      var _getChildren = getChildren(instance.popper), box = _getChildren.box, content = _getChildren.content;
      var backdrop = instance.props.animateFill ? createBackdropElement() : null;
      return {
        onCreate: function onCreate() {
          if (backdrop) {
            box.insertBefore(backdrop, box.firstElementChild);
            box.setAttribute("data-animatefill", "");
            box.style.overflow = "hidden";
            instance.setProps({
              arrow: false,
              animation: "shift-away"
            });
          }
        },
        onMount: function onMount() {
          if (backdrop) {
            var transitionDuration = box.style.transitionDuration;
            var duration = Number(transitionDuration.replace("ms", ""));
            content.style.transitionDelay = Math.round(duration / 10) + "ms";
            backdrop.style.transitionDuration = transitionDuration;
            setVisibilityState([backdrop], "visible");
          }
        },
        onShow: function onShow() {
          if (backdrop) {
            backdrop.style.transitionDuration = "0ms";
          }
        },
        onHide: function onHide() {
          if (backdrop) {
            setVisibilityState([backdrop], "hidden");
          }
        }
      };
    }
  };
  function createBackdropElement() {
    var backdrop = div();
    backdrop.className = BACKDROP_CLASS;
    setVisibilityState([backdrop], "hidden");
    return backdrop;
  }
  var mouseCoords = {
    clientX: 0,
    clientY: 0
  };
  var activeInstances = [];
  function storeMouseCoords(_ref) {
    var clientX = _ref.clientX, clientY = _ref.clientY;
    mouseCoords = {
      clientX,
      clientY
    };
  }
  function addMouseCoordsListener(doc) {
    doc.addEventListener("mousemove", storeMouseCoords);
  }
  function removeMouseCoordsListener(doc) {
    doc.removeEventListener("mousemove", storeMouseCoords);
  }
  var followCursor2 = {
    name: "followCursor",
    defaultValue: false,
    fn: function fn(instance) {
      var reference = instance.reference;
      var doc = getOwnerDocument(instance.props.triggerTarget || reference);
      var isInternalUpdate = false;
      var wasFocusEvent = false;
      var isUnmounted = true;
      var prevProps = instance.props;
      function getIsInitialBehavior() {
        return instance.props.followCursor === "initial" && instance.state.isVisible;
      }
      function addListener() {
        doc.addEventListener("mousemove", onMouseMove);
      }
      function removeListener() {
        doc.removeEventListener("mousemove", onMouseMove);
      }
      function unsetGetReferenceClientRect() {
        isInternalUpdate = true;
        instance.setProps({
          getReferenceClientRect: null
        });
        isInternalUpdate = false;
      }
      function onMouseMove(event) {
        var isCursorOverReference = event.target ? reference.contains(event.target) : true;
        var followCursor3 = instance.props.followCursor;
        var clientX = event.clientX, clientY = event.clientY;
        var rect = reference.getBoundingClientRect();
        var relativeX = clientX - rect.left;
        var relativeY = clientY - rect.top;
        if (isCursorOverReference || !instance.props.interactive) {
          instance.setProps({
            getReferenceClientRect: function getReferenceClientRect() {
              var rect2 = reference.getBoundingClientRect();
              var x = clientX;
              var y = clientY;
              if (followCursor3 === "initial") {
                x = rect2.left + relativeX;
                y = rect2.top + relativeY;
              }
              var top = followCursor3 === "horizontal" ? rect2.top : y;
              var right = followCursor3 === "vertical" ? rect2.right : x;
              var bottom = followCursor3 === "horizontal" ? rect2.bottom : y;
              var left = followCursor3 === "vertical" ? rect2.left : x;
              return {
                width: right - left,
                height: bottom - top,
                top,
                right,
                bottom,
                left
              };
            }
          });
        }
      }
      function create() {
        if (instance.props.followCursor) {
          activeInstances.push({
            instance,
            doc
          });
          addMouseCoordsListener(doc);
        }
      }
      function destroy() {
        activeInstances = activeInstances.filter(function(data2) {
          return data2.instance !== instance;
        });
        if (activeInstances.filter(function(data2) {
          return data2.doc === doc;
        }).length === 0) {
          removeMouseCoordsListener(doc);
        }
      }
      return {
        onCreate: create,
        onDestroy: destroy,
        onBeforeUpdate: function onBeforeUpdate() {
          prevProps = instance.props;
        },
        onAfterUpdate: function onAfterUpdate(_, _ref2) {
          var followCursor3 = _ref2.followCursor;
          if (isInternalUpdate) {
            return;
          }
          if (followCursor3 !== void 0 && prevProps.followCursor !== followCursor3) {
            destroy();
            if (followCursor3) {
              create();
              if (instance.state.isMounted && !wasFocusEvent && !getIsInitialBehavior()) {
                addListener();
              }
            } else {
              removeListener();
              unsetGetReferenceClientRect();
            }
          }
        },
        onMount: function onMount() {
          if (instance.props.followCursor && !wasFocusEvent) {
            if (isUnmounted) {
              onMouseMove(mouseCoords);
              isUnmounted = false;
            }
            if (!getIsInitialBehavior()) {
              addListener();
            }
          }
        },
        onTrigger: function onTrigger(_, event) {
          if (isMouseEvent(event)) {
            mouseCoords = {
              clientX: event.clientX,
              clientY: event.clientY
            };
          }
          wasFocusEvent = event.type === "focus";
        },
        onHidden: function onHidden() {
          if (instance.props.followCursor) {
            unsetGetReferenceClientRect();
            removeListener();
            isUnmounted = true;
          }
        }
      };
    }
  };
  function getProps(props, modifier) {
    var _props$popperOptions;
    return {
      popperOptions: Object.assign({}, props.popperOptions, {
        modifiers: [].concat((((_props$popperOptions = props.popperOptions) == null ? void 0 : _props$popperOptions.modifiers) || []).filter(function(_ref) {
          var name = _ref.name;
          return name !== modifier.name;
        }), [modifier])
      })
    };
  }
  var inlinePositioning = {
    name: "inlinePositioning",
    defaultValue: false,
    fn: function fn(instance) {
      var reference = instance.reference;
      function isEnabled() {
        return !!instance.props.inlinePositioning;
      }
      var placement;
      var cursorRectIndex = -1;
      var isInternalUpdate = false;
      var modifier = {
        name: "tippyInlinePositioning",
        enabled: true,
        phase: "afterWrite",
        fn: function fn2(_ref2) {
          var state = _ref2.state;
          if (isEnabled()) {
            if (placement !== state.placement) {
              instance.setProps({
                getReferenceClientRect: function getReferenceClientRect() {
                  return _getReferenceClientRect(state.placement);
                }
              });
            }
            placement = state.placement;
          }
        }
      };
      function _getReferenceClientRect(placement2) {
        return getInlineBoundingClientRect(getBasePlacement(placement2), reference.getBoundingClientRect(), arrayFrom(reference.getClientRects()), cursorRectIndex);
      }
      function setInternalProps(partialProps) {
        isInternalUpdate = true;
        instance.setProps(partialProps);
        isInternalUpdate = false;
      }
      function addModifier() {
        if (!isInternalUpdate) {
          setInternalProps(getProps(instance.props, modifier));
        }
      }
      return {
        onCreate: addModifier,
        onAfterUpdate: addModifier,
        onTrigger: function onTrigger(_, event) {
          if (isMouseEvent(event)) {
            var rects = arrayFrom(instance.reference.getClientRects());
            var cursorRect = rects.find(function(rect) {
              return rect.left - 2 <= event.clientX && rect.right + 2 >= event.clientX && rect.top - 2 <= event.clientY && rect.bottom + 2 >= event.clientY;
            });
            cursorRectIndex = rects.indexOf(cursorRect);
          }
        },
        onUntrigger: function onUntrigger() {
          cursorRectIndex = -1;
        }
      };
    }
  };
  function getInlineBoundingClientRect(currentBasePlacement, boundingRect, clientRects, cursorRectIndex) {
    if (clientRects.length < 2 || currentBasePlacement === null) {
      return boundingRect;
    }
    if (clientRects.length === 2 && cursorRectIndex >= 0 && clientRects[0].left > clientRects[1].right) {
      return clientRects[cursorRectIndex] || boundingRect;
    }
    switch (currentBasePlacement) {
      case "top":
      case "bottom": {
        var firstRect = clientRects[0];
        var lastRect = clientRects[clientRects.length - 1];
        var isTop = currentBasePlacement === "top";
        var top = firstRect.top;
        var bottom = lastRect.bottom;
        var left = isTop ? firstRect.left : lastRect.left;
        var right = isTop ? firstRect.right : lastRect.right;
        var width = right - left;
        var height = bottom - top;
        return {
          top,
          bottom,
          left,
          right,
          width,
          height
        };
      }
      case "left":
      case "right": {
        var minLeft = Math.min.apply(Math, clientRects.map(function(rects) {
          return rects.left;
        }));
        var maxRight = Math.max.apply(Math, clientRects.map(function(rects) {
          return rects.right;
        }));
        var measureRects = clientRects.filter(function(rect) {
          return currentBasePlacement === "left" ? rect.left === minLeft : rect.right === maxRight;
        });
        var _top = measureRects[0].top;
        var _bottom = measureRects[measureRects.length - 1].bottom;
        var _left = minLeft;
        var _right = maxRight;
        var _width = _right - _left;
        var _height = _bottom - _top;
        return {
          top: _top,
          bottom: _bottom,
          left: _left,
          right: _right,
          width: _width,
          height: _height
        };
      }
      default: {
        return boundingRect;
      }
    }
  }
  var sticky = {
    name: "sticky",
    defaultValue: false,
    fn: function fn(instance) {
      var reference = instance.reference, popper = instance.popper;
      function getReference() {
        return instance.popperInstance ? instance.popperInstance.state.elements.reference : reference;
      }
      function shouldCheck(value) {
        return instance.props.sticky === true || instance.props.sticky === value;
      }
      var prevRefRect = null;
      var prevPopRect = null;
      function updatePosition() {
        var currentRefRect = shouldCheck("reference") ? getReference().getBoundingClientRect() : null;
        var currentPopRect = shouldCheck("popper") ? popper.getBoundingClientRect() : null;
        if (currentRefRect && areRectsDifferent(prevRefRect, currentRefRect) || currentPopRect && areRectsDifferent(prevPopRect, currentPopRect)) {
          if (instance.popperInstance) {
            instance.popperInstance.update();
          }
        }
        prevRefRect = currentRefRect;
        prevPopRect = currentPopRect;
        if (instance.state.isMounted) {
          requestAnimationFrame(updatePosition);
        }
      }
      return {
        onMount: function onMount() {
          if (instance.props.sticky) {
            updatePosition();
          }
        }
      };
    }
  };
  function areRectsDifferent(rectA, rectB) {
    if (rectA && rectB) {
      return rectA.top !== rectB.top || rectA.right !== rectB.right || rectA.bottom !== rectB.bottom || rectA.left !== rectB.left;
    }
    return true;
  }
  tippy2.setDefaultProps({
    render
  });
  exports.animateFill = animateFill;
  exports.createSingleton = createSingleton;
  exports.default = tippy2;
  exports.delegate = delegate;
  exports.followCursor = followCursor2;
  exports.hideAll = hideAll;
  exports.inlinePositioning = inlinePositioning;
  exports.roundArrow = ROUND_ARROW;
  exports.sticky = sticky;
});
var import_tippy2 = __toModule2(require_tippy_cjs());
var import_tippy = __toModule2(require_tippy_cjs());
var buildConfigFromModifiers2 = (modifiers) => {
  const config = {
    plugins: []
  };
  const getModifierArgument = (modifier) => {
    return modifiers[modifiers.indexOf(modifier) + 1];
  };
  if (modifiers.includes("animation")) {
    config.animation = getModifierArgument("animation");
  }
  if (modifiers.includes("duration")) {
    config.duration = parseInt(getModifierArgument("duration"));
  }
  if (modifiers.includes("delay")) {
    const delay3 = getModifierArgument("delay");
    config.delay = delay3.includes("-") ? delay3.split("-").map((n) => parseInt(n)) : parseInt(delay3);
  }
  if (modifiers.includes("cursor")) {
    config.plugins.push(import_tippy.followCursor);
    const next = getModifierArgument("cursor");
    if (["x", "initial"].includes(next)) {
      config.followCursor = next === "x" ? "horizontal" : "initial";
    } else {
      config.followCursor = true;
    }
  }
  if (modifiers.includes("on")) {
    config.trigger = getModifierArgument("on");
  }
  if (modifiers.includes("arrowless")) {
    config.arrow = false;
  }
  if (modifiers.includes("html")) {
    config.allowHTML = true;
  }
  if (modifiers.includes("interactive")) {
    config.interactive = true;
  }
  if (modifiers.includes("border") && config.interactive) {
    config.interactiveBorder = parseInt(getModifierArgument("border"));
  }
  if (modifiers.includes("debounce") && config.interactive) {
    config.interactiveDebounce = parseInt(getModifierArgument("debounce"));
  }
  if (modifiers.includes("max-width")) {
    config.maxWidth = parseInt(getModifierArgument("max-width"));
  }
  if (modifiers.includes("theme")) {
    config.theme = getModifierArgument("theme");
  }
  if (modifiers.includes("placement")) {
    config.placement = getModifierArgument("placement");
  }
  return config;
};
function Tooltip(Alpine3) {
  Alpine3.magic("tooltip", (el) => {
    return (content, config = {}) => {
      const instance = (0, import_tippy2.default)(el, {
        content,
        trigger: "manual",
        ...config
      });
      instance.show();
      setTimeout(() => {
        instance.hide();
        setTimeout(() => instance.destroy(), config.duration || 300);
      }, config.timeout || 2e3);
    };
  });
  Alpine3.directive("tooltip", (el, { modifiers, expression }, { evaluateLater: evaluateLater2, effect: effect3 }) => {
    const config = modifiers.length > 0 ? buildConfigFromModifiers2(modifiers) : {};
    if (!el.__x_tippy) {
      el.__x_tippy = (0, import_tippy2.default)(el, config);
    }
    const enableTooltip = () => el.__x_tippy.enable();
    const disableTooltip = () => el.__x_tippy.disable();
    const setupTooltip = (content) => {
      if (!content) {
        disableTooltip();
      } else {
        enableTooltip();
        el.__x_tippy.setContent(content);
      }
    };
    if (modifiers.includes("raw")) {
      setupTooltip(expression);
    } else {
      const getContent = evaluateLater2(expression);
      effect3(() => {
        getContent((content) => {
          if (typeof content === "object") {
            el.__x_tippy.setProps(content);
            enableTooltip();
          } else {
            setupTooltip(content);
          }
        });
      });
    }
  });
}
Tooltip.defaultProps = (props) => {
  import_tippy2.default.setDefaultProps(props);
  return Tooltip;
};
var src_default7 = Tooltip;
var module_default7 = src_default7;

// node_modules/alpinejs/dist/module.esm.js
var flushPending = false;
var flushing = false;
var queue = [];
var lastFlushedIndex = -1;
function scheduler(callback) {
  queueJob(callback);
}
function queueJob(job) {
  if (!queue.includes(job))
    queue.push(job);
  queueFlush();
}
function dequeueJob(job) {
  let index = queue.indexOf(job);
  if (index !== -1 && index > lastFlushedIndex)
    queue.splice(index, 1);
}
function queueFlush() {
  if (!flushing && !flushPending) {
    flushPending = true;
    queueMicrotask(flushJobs);
  }
}
function flushJobs() {
  flushPending = false;
  flushing = true;
  for (let i = 0; i < queue.length; i++) {
    queue[i]();
    lastFlushedIndex = i;
  }
  queue.length = 0;
  lastFlushedIndex = -1;
  flushing = false;
}
var reactive;
var effect;
var release;
var raw;
var shouldSchedule = true;
function disableEffectScheduling(callback) {
  shouldSchedule = false;
  callback();
  shouldSchedule = true;
}
function setReactivityEngine(engine) {
  reactive = engine.reactive;
  release = engine.release;
  effect = (callback) => engine.effect(callback, { scheduler: (task) => {
    if (shouldSchedule) {
      scheduler(task);
    } else {
      task();
    }
  } });
  raw = engine.raw;
}
function overrideEffect(override) {
  effect = override;
}
function elementBoundEffect(el) {
  let cleanup2 = () => {
  };
  let wrappedEffect = (callback) => {
    let effectReference = effect(callback);
    if (!el._x_effects) {
      el._x_effects = /* @__PURE__ */ new Set();
      el._x_runEffects = () => {
        el._x_effects.forEach((i) => i());
      };
    }
    el._x_effects.add(effectReference);
    cleanup2 = () => {
      if (effectReference === void 0)
        return;
      el._x_effects.delete(effectReference);
      release(effectReference);
    };
    return effectReference;
  };
  return [wrappedEffect, () => {
    cleanup2();
  }];
}
function watch(getter, callback) {
  let firstTime = true;
  let oldValue;
  let effectReference = effect(() => {
    let value = getter();
    JSON.stringify(value);
    if (!firstTime) {
      queueMicrotask(() => {
        callback(value, oldValue);
        oldValue = value;
      });
    } else {
      oldValue = value;
    }
    firstTime = false;
  });
  return () => release(effectReference);
}
var onAttributeAddeds = [];
var onElRemoveds = [];
var onElAddeds = [];
function onElAdded(callback) {
  onElAddeds.push(callback);
}
function onElRemoved(el, callback) {
  if (typeof callback === "function") {
    if (!el._x_cleanups)
      el._x_cleanups = [];
    el._x_cleanups.push(callback);
  } else {
    callback = el;
    onElRemoveds.push(callback);
  }
}
function onAttributesAdded(callback) {
  onAttributeAddeds.push(callback);
}
function onAttributeRemoved(el, name, callback) {
  if (!el._x_attributeCleanups)
    el._x_attributeCleanups = {};
  if (!el._x_attributeCleanups[name])
    el._x_attributeCleanups[name] = [];
  el._x_attributeCleanups[name].push(callback);
}
function cleanupAttributes(el, names) {
  if (!el._x_attributeCleanups)
    return;
  Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
    if (names === void 0 || names.includes(name)) {
      value.forEach((i) => i());
      delete el._x_attributeCleanups[name];
    }
  });
}
function cleanupElement(el) {
  if (el._x_cleanups) {
    while (el._x_cleanups.length)
      el._x_cleanups.pop()();
  }
}
var observer = new MutationObserver(onMutate);
var currentlyObserving = false;
function startObservingMutations() {
  observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
  currentlyObserving = true;
}
function stopObservingMutations() {
  flushObserver();
  observer.disconnect();
  currentlyObserving = false;
}
var queuedMutations = [];
function flushObserver() {
  let records = observer.takeRecords();
  queuedMutations.push(() => records.length > 0 && onMutate(records));
  let queueLengthWhenTriggered = queuedMutations.length;
  queueMicrotask(() => {
    if (queuedMutations.length === queueLengthWhenTriggered) {
      while (queuedMutations.length > 0)
        queuedMutations.shift()();
    }
  });
}
function mutateDom(callback) {
  if (!currentlyObserving)
    return callback();
  stopObservingMutations();
  let result = callback();
  startObservingMutations();
  return result;
}
var isCollecting = false;
var deferredMutations = [];
function deferMutations() {
  isCollecting = true;
}
function flushAndStopDeferringMutations() {
  isCollecting = false;
  onMutate(deferredMutations);
  deferredMutations = [];
}
function onMutate(mutations) {
  if (isCollecting) {
    deferredMutations = deferredMutations.concat(mutations);
    return;
  }
  let addedNodes = /* @__PURE__ */ new Set();
  let removedNodes = /* @__PURE__ */ new Set();
  let addedAttributes = /* @__PURE__ */ new Map();
  let removedAttributes = /* @__PURE__ */ new Map();
  for (let i = 0; i < mutations.length; i++) {
    if (mutations[i].target._x_ignoreMutationObserver)
      continue;
    if (mutations[i].type === "childList") {
      mutations[i].addedNodes.forEach((node) => node.nodeType === 1 && addedNodes.add(node));
      mutations[i].removedNodes.forEach((node) => node.nodeType === 1 && removedNodes.add(node));
    }
    if (mutations[i].type === "attributes") {
      let el = mutations[i].target;
      let name = mutations[i].attributeName;
      let oldValue = mutations[i].oldValue;
      let add2 = () => {
        if (!addedAttributes.has(el))
          addedAttributes.set(el, []);
        addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
      };
      let remove = () => {
        if (!removedAttributes.has(el))
          removedAttributes.set(el, []);
        removedAttributes.get(el).push(name);
      };
      if (el.hasAttribute(name) && oldValue === null) {
        add2();
      } else if (el.hasAttribute(name)) {
        remove();
        add2();
      } else {
        remove();
      }
    }
  }
  removedAttributes.forEach((attrs, el) => {
    cleanupAttributes(el, attrs);
  });
  addedAttributes.forEach((attrs, el) => {
    onAttributeAddeds.forEach((i) => i(el, attrs));
  });
  for (let node of removedNodes) {
    if (addedNodes.has(node))
      continue;
    onElRemoveds.forEach((i) => i(node));
  }
  addedNodes.forEach((node) => {
    node._x_ignoreSelf = true;
    node._x_ignore = true;
  });
  for (let node of addedNodes) {
    if (removedNodes.has(node))
      continue;
    if (!node.isConnected)
      continue;
    delete node._x_ignoreSelf;
    delete node._x_ignore;
    onElAddeds.forEach((i) => i(node));
    node._x_ignore = true;
    node._x_ignoreSelf = true;
  }
  addedNodes.forEach((node) => {
    delete node._x_ignoreSelf;
    delete node._x_ignore;
  });
  addedNodes = null;
  removedNodes = null;
  addedAttributes = null;
  removedAttributes = null;
}
function scope(node) {
  return mergeProxies(closestDataStack(node));
}
function addScopeToNode(node, data2, referenceNode) {
  node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
  return () => {
    node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
  };
}
function closestDataStack(node) {
  if (node._x_dataStack)
    return node._x_dataStack;
  if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
    return closestDataStack(node.host);
  }
  if (!node.parentNode) {
    return [];
  }
  return closestDataStack(node.parentNode);
}
function mergeProxies(objects) {
  return new Proxy({ objects }, mergeProxyTrap);
}
var mergeProxyTrap = {
  ownKeys({ objects }) {
    return Array.from(
      new Set(objects.flatMap((i) => Object.keys(i)))
    );
  },
  has({ objects }, name) {
    if (name == Symbol.unscopables)
      return false;
    return objects.some(
      (obj) => Object.prototype.hasOwnProperty.call(obj, name) || Reflect.has(obj, name)
    );
  },
  get({ objects }, name, thisProxy) {
    if (name == "toJSON")
      return collapseProxies;
    return Reflect.get(
      objects.find(
        (obj) => Reflect.has(obj, name)
      ) || {},
      name,
      thisProxy
    );
  },
  set({ objects }, name, value, thisProxy) {
    const target = objects.find(
      (obj) => Object.prototype.hasOwnProperty.call(obj, name)
    ) || objects[objects.length - 1];
    const descriptor = Object.getOwnPropertyDescriptor(target, name);
    if (descriptor?.set && descriptor?.get)
      return descriptor.set.call(thisProxy, value) || true;
    return Reflect.set(target, name, value);
  }
};
function collapseProxies() {
  let keys = Reflect.ownKeys(this);
  return keys.reduce((acc, key) => {
    acc[key] = Reflect.get(this, key);
    return acc;
  }, {});
}
function initInterceptors(data2) {
  let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
  let recurse = (obj, basePath = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
      if (enumerable === false || value === void 0)
        return;
      if (typeof value === "object" && value !== null && value.__v_skip)
        return;
      let path = basePath === "" ? key : `${basePath}.${key}`;
      if (typeof value === "object" && value !== null && value._x_interceptor) {
        obj[key] = value.initialize(data2, path, key);
      } else {
        if (isObject2(value) && value !== obj && !(value instanceof Element)) {
          recurse(value, path);
        }
      }
    });
  };
  return recurse(data2);
}
function interceptor(callback, mutateObj = () => {
}) {
  let obj = {
    initialValue: void 0,
    _x_interceptor: true,
    initialize(data2, path, key) {
      return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
    }
  };
  mutateObj(obj);
  return (initialValue) => {
    if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
      let initialize = obj.initialize.bind(obj);
      obj.initialize = (data2, path, key) => {
        let innerValue = initialValue.initialize(data2, path, key);
        obj.initialValue = innerValue;
        return initialize(data2, path, key);
      };
    } else {
      obj.initialValue = initialValue;
    }
    return obj;
  };
}
function get(obj, path) {
  return path.split(".").reduce((carry, segment) => carry[segment], obj);
}
function set(obj, path, value) {
  if (typeof path === "string")
    path = path.split(".");
  if (path.length === 1)
    obj[path[0]] = value;
  else if (path.length === 0)
    throw error;
  else {
    if (obj[path[0]])
      return set(obj[path[0]], path.slice(1), value);
    else {
      obj[path[0]] = {};
      return set(obj[path[0]], path.slice(1), value);
    }
  }
}
var magics = {};
function magic(name, callback) {
  magics[name] = callback;
}
function injectMagics(obj, el) {
  Object.entries(magics).forEach(([name, callback]) => {
    let memoizedUtilities = null;
    function getUtilities() {
      if (memoizedUtilities) {
        return memoizedUtilities;
      } else {
        let [utilities, cleanup2] = getElementBoundUtilities(el);
        memoizedUtilities = { interceptor, ...utilities };
        onElRemoved(el, cleanup2);
        return memoizedUtilities;
      }
    }
    Object.defineProperty(obj, `$${name}`, {
      get() {
        return callback(el, getUtilities());
      },
      enumerable: false
    });
  });
  return obj;
}
function tryCatch(el, expression, callback, ...args) {
  try {
    return callback(...args);
  } catch (e) {
    handleError(e, el, expression);
  }
}
function handleError(error2, el, expression = void 0) {
  error2 = Object.assign(
    error2 ?? { message: "No error message given." },
    { el, expression }
  );
  console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
  setTimeout(() => {
    throw error2;
  }, 0);
}
var shouldAutoEvaluateFunctions = true;
function dontAutoEvaluateFunctions(callback) {
  let cache = shouldAutoEvaluateFunctions;
  shouldAutoEvaluateFunctions = false;
  let result = callback();
  shouldAutoEvaluateFunctions = cache;
  return result;
}
function evaluate(el, expression, extras = {}) {
  let result;
  evaluateLater(el, expression)((value) => result = value, extras);
  return result;
}
function evaluateLater(...args) {
  return theEvaluatorFunction(...args);
}
var theEvaluatorFunction = normalEvaluator;
function setEvaluator(newEvaluator) {
  theEvaluatorFunction = newEvaluator;
}
function normalEvaluator(el, expression) {
  let overriddenMagics = {};
  injectMagics(overriddenMagics, el);
  let dataStack = [overriddenMagics, ...closestDataStack(el)];
  let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
  return tryCatch.bind(null, el, expression, evaluator);
}
function generateEvaluatorFromFunction(dataStack, func) {
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [] } = {}) => {
    let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
    runIfTypeOfFunction(receiver, result);
  };
}
var evaluatorMemo = {};
function generateFunctionFromString(expression, el) {
  if (evaluatorMemo[expression]) {
    return evaluatorMemo[expression];
  }
  let AsyncFunction = Object.getPrototypeOf(async function() {
  }).constructor;
  let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
  const safeAsyncFunction = () => {
    try {
      let func2 = new AsyncFunction(
        ["__self", "scope"],
        `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`
      );
      Object.defineProperty(func2, "name", {
        value: `[Alpine] ${expression}`
      });
      return func2;
    } catch (error2) {
      handleError(error2, el, expression);
      return Promise.resolve();
    }
  };
  let func = safeAsyncFunction();
  evaluatorMemo[expression] = func;
  return func;
}
function generateEvaluatorFromString(dataStack, expression, el) {
  let func = generateFunctionFromString(expression, el);
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [] } = {}) => {
    func.result = void 0;
    func.finished = false;
    let completeScope = mergeProxies([scope2, ...dataStack]);
    if (typeof func === "function") {
      let promise = func(func, completeScope).catch((error2) => handleError(error2, el, expression));
      if (func.finished) {
        runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
        func.result = void 0;
      } else {
        promise.then((result) => {
          runIfTypeOfFunction(receiver, result, completeScope, params, el);
        }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = void 0);
      }
    }
  };
}
function runIfTypeOfFunction(receiver, value, scope2, params, el) {
  if (shouldAutoEvaluateFunctions && typeof value === "function") {
    let result = value.apply(scope2, params);
    if (result instanceof Promise) {
      result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
    } else {
      receiver(result);
    }
  } else if (typeof value === "object" && value instanceof Promise) {
    value.then((i) => receiver(i));
  } else {
    receiver(value);
  }
}
var prefixAsString = "x-";
function prefix(subject = "") {
  return prefixAsString + subject;
}
function setPrefix(newPrefix) {
  prefixAsString = newPrefix;
}
var directiveHandlers = {};
function directive(name, callback) {
  directiveHandlers[name] = callback;
  return {
    before(directive2) {
      if (!directiveHandlers[directive2]) {
        console.warn(String.raw`Cannot find directive \`${directive2}\`. \`${name}\` will use the default order of execution`);
        return;
      }
      const pos = directiveOrder.indexOf(directive2);
      directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
    }
  };
}
function directiveExists(name) {
  return Object.keys(directiveHandlers).includes(name);
}
function directives(el, attributes, originalAttributeOverride) {
  attributes = Array.from(attributes);
  if (el._x_virtualDirectives) {
    let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(vAttributes);
    vAttributes = vAttributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    attributes = attributes.concat(vAttributes);
  }
  let transformedAttributeMap = {};
  let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
  return directives2.map((directive2) => {
    return getDirectiveHandler(el, directive2);
  });
}
function attributesOnly(attributes) {
  return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
}
var isDeferringHandlers = false;
var directiveHandlerStacks = /* @__PURE__ */ new Map();
var currentHandlerStackKey = Symbol();
function deferHandlingDirectives(callback) {
  isDeferringHandlers = true;
  let key = Symbol();
  currentHandlerStackKey = key;
  directiveHandlerStacks.set(key, []);
  let flushHandlers = () => {
    while (directiveHandlerStacks.get(key).length)
      directiveHandlerStacks.get(key).shift()();
    directiveHandlerStacks.delete(key);
  };
  let stopDeferring = () => {
    isDeferringHandlers = false;
    flushHandlers();
  };
  callback(flushHandlers);
  stopDeferring();
}
function getElementBoundUtilities(el) {
  let cleanups = [];
  let cleanup2 = (callback) => cleanups.push(callback);
  let [effect3, cleanupEffect] = elementBoundEffect(el);
  cleanups.push(cleanupEffect);
  let utilities = {
    Alpine: alpine_default,
    effect: effect3,
    cleanup: cleanup2,
    evaluateLater: evaluateLater.bind(evaluateLater, el),
    evaluate: evaluate.bind(evaluate, el)
  };
  let doCleanup = () => cleanups.forEach((i) => i());
  return [utilities, doCleanup];
}
function getDirectiveHandler(el, directive2) {
  let noop = () => {
  };
  let handler4 = directiveHandlers[directive2.type] || noop;
  let [utilities, cleanup2] = getElementBoundUtilities(el);
  onAttributeRemoved(el, directive2.original, cleanup2);
  let fullHandler = () => {
    if (el._x_ignore || el._x_ignoreSelf)
      return;
    handler4.inline && handler4.inline(el, directive2, utilities);
    handler4 = handler4.bind(handler4, el, directive2, utilities);
    isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
  };
  fullHandler.runCleanups = cleanup2;
  return fullHandler;
}
var startingWith = (subject, replacement) => ({ name, value }) => {
  if (name.startsWith(subject))
    name = name.replace(subject, replacement);
  return { name, value };
};
var into = (i) => i;
function toTransformedAttributes(callback = () => {
}) {
  return ({ name, value }) => {
    let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
      return transform(carry);
    }, { name, value });
    if (newName !== name)
      callback(newName, name);
    return { name: newName, value: newValue };
  };
}
var attributeTransformers = [];
function mapAttributes(callback) {
  attributeTransformers.push(callback);
}
function outNonAlpineAttributes({ name }) {
  return alpineAttributeRegex().test(name);
}
var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
  return ({ name, value }) => {
    let typeMatch = name.match(alpineAttributeRegex());
    let valueMatch = name.match(/:([a-zA-Z0-9\-_:]+)/);
    let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
    let original = originalAttributeOverride || transformedAttributeMap[name] || name;
    return {
      type: typeMatch ? typeMatch[1] : null,
      value: valueMatch ? valueMatch[1] : null,
      modifiers: modifiers.map((i) => i.replace(".", "")),
      expression: value,
      original
    };
  };
}
var DEFAULT = "DEFAULT";
var directiveOrder = [
  "ignore",
  "ref",
  "data",
  "id",
  "anchor",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  DEFAULT,
  "teleport"
];
function byPriority(a, b) {
  let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
  let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
  return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
}
function dispatch(el, name, detail = {}) {
  el.dispatchEvent(
    new CustomEvent(name, {
      detail,
      bubbles: true,
      // Allows events to pass the shadow DOM barrier.
      composed: true,
      cancelable: true
    })
  );
}
function walk(el, callback) {
  if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
    Array.from(el.children).forEach((el2) => walk(el2, callback));
    return;
  }
  let skip = false;
  callback(el, () => skip = true);
  if (skip)
    return;
  let node = el.firstElementChild;
  while (node) {
    walk(node, callback, false);
    node = node.nextElementSibling;
  }
}
function warn(message, ...args) {
  console.warn(`Alpine Warning: ${message}`, ...args);
}
var started = false;
function start() {
  if (started)
    warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
  started = true;
  if (!document.body)
    warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
  dispatch(document, "alpine:init");
  dispatch(document, "alpine:initializing");
  startObservingMutations();
  onElAdded((el) => initTree(el, walk));
  onElRemoved((el) => destroyTree(el));
  onAttributesAdded((el, attrs) => {
    directives(el, attrs).forEach((handle) => handle());
  });
  let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
  Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach((el) => {
    initTree(el);
  });
  dispatch(document, "alpine:initialized");
  setTimeout(() => {
    warnAboutMissingPlugins();
  });
}
var rootSelectorCallbacks = [];
var initSelectorCallbacks = [];
function rootSelectors() {
  return rootSelectorCallbacks.map((fn) => fn());
}
function allSelectors() {
  return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
}
function addRootSelector(selectorCallback) {
  rootSelectorCallbacks.push(selectorCallback);
}
function addInitSelector(selectorCallback) {
  initSelectorCallbacks.push(selectorCallback);
}
function closestRoot(el, includeInitSelectors = false) {
  return findClosest(el, (element) => {
    const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
    if (selectors.some((selector) => element.matches(selector)))
      return true;
  });
}
function findClosest(el, callback) {
  if (!el)
    return;
  if (callback(el))
    return el;
  if (el._x_teleportBack)
    el = el._x_teleportBack;
  if (!el.parentElement)
    return;
  return findClosest(el.parentElement, callback);
}
function isRoot(el) {
  return rootSelectors().some((selector) => el.matches(selector));
}
var initInterceptors2 = [];
function interceptInit(callback) {
  initInterceptors2.push(callback);
}
function initTree(el, walker = walk, intercept = () => {
}) {
  deferHandlingDirectives(() => {
    walker(el, (el2, skip) => {
      intercept(el2, skip);
      initInterceptors2.forEach((i) => i(el2, skip));
      directives(el2, el2.attributes).forEach((handle) => handle());
      el2._x_ignore && skip();
    });
  });
}
function destroyTree(root, walker = walk) {
  walker(root, (el) => {
    cleanupAttributes(el);
    cleanupElement(el);
  });
}
function warnAboutMissingPlugins() {
  let pluginDirectives = [
    ["ui", "dialog", ["[x-dialog], [x-popover]"]],
    ["anchor", "anchor", ["[x-anchor]"]],
    ["sort", "sort", ["[x-sort]"]]
  ];
  pluginDirectives.forEach(([plugin2, directive2, selectors]) => {
    if (directiveExists(directive2))
      return;
    selectors.some((selector) => {
      if (document.querySelector(selector)) {
        warn(`found "${selector}", but missing ${plugin2} plugin`);
        return true;
      }
    });
  });
}
var tickStack = [];
var isHolding = false;
function nextTick(callback = () => {
}) {
  queueMicrotask(() => {
    isHolding || setTimeout(() => {
      releaseNextTicks();
    });
  });
  return new Promise((res2) => {
    tickStack.push(() => {
      callback();
      res2();
    });
  });
}
function releaseNextTicks() {
  isHolding = false;
  while (tickStack.length)
    tickStack.shift()();
}
function holdNextTicks() {
  isHolding = true;
}
function setClasses(el, value) {
  if (Array.isArray(value)) {
    return setClassesFromString(el, value.join(" "));
  } else if (typeof value === "object" && value !== null) {
    return setClassesFromObject(el, value);
  } else if (typeof value === "function") {
    return setClasses(el, value());
  }
  return setClassesFromString(el, value);
}
function setClassesFromString(el, classString) {
  let split = (classString2) => classString2.split(" ").filter(Boolean);
  let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
  let addClassesAndReturnUndo = (classes) => {
    el.classList.add(...classes);
    return () => {
      el.classList.remove(...classes);
    };
  };
  classString = classString === true ? classString = "" : classString || "";
  return addClassesAndReturnUndo(missingClasses(classString));
}
function setClassesFromObject(el, classObject) {
  let split = (classString) => classString.split(" ").filter(Boolean);
  let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
  let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
  let added = [];
  let removed = [];
  forRemove.forEach((i) => {
    if (el.classList.contains(i)) {
      el.classList.remove(i);
      removed.push(i);
    }
  });
  forAdd.forEach((i) => {
    if (!el.classList.contains(i)) {
      el.classList.add(i);
      added.push(i);
    }
  });
  return () => {
    removed.forEach((i) => el.classList.add(i));
    added.forEach((i) => el.classList.remove(i));
  };
}
function setStyles(el, value) {
  if (typeof value === "object" && value !== null) {
    return setStylesFromObject(el, value);
  }
  return setStylesFromString(el, value);
}
function setStylesFromObject(el, value) {
  let previousStyles = {};
  Object.entries(value).forEach(([key, value2]) => {
    previousStyles[key] = el.style[key];
    if (!key.startsWith("--")) {
      key = kebabCase(key);
    }
    el.style.setProperty(key, value2);
  });
  setTimeout(() => {
    if (el.style.length === 0) {
      el.removeAttribute("style");
    }
  });
  return () => {
    setStyles(el, previousStyles);
  };
}
function setStylesFromString(el, value) {
  let cache = el.getAttribute("style", value);
  el.setAttribute("style", value);
  return () => {
    el.setAttribute("style", cache || "");
  };
}
function kebabCase(subject) {
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function once(callback, fallback = () => {
}) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      callback.apply(this, arguments);
    } else {
      fallback.apply(this, arguments);
    }
  };
}
directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
  if (typeof expression === "function")
    expression = evaluate2(expression);
  if (expression === false)
    return;
  if (!expression || typeof expression === "boolean") {
    registerTransitionsFromHelper(el, modifiers, value);
  } else {
    registerTransitionsFromClassString(el, expression, value);
  }
});
function registerTransitionsFromClassString(el, classString, stage) {
  registerTransitionObject(el, setClasses, "");
  let directiveStorageMap = {
    "enter": (classes) => {
      el._x_transition.enter.during = classes;
    },
    "enter-start": (classes) => {
      el._x_transition.enter.start = classes;
    },
    "enter-end": (classes) => {
      el._x_transition.enter.end = classes;
    },
    "leave": (classes) => {
      el._x_transition.leave.during = classes;
    },
    "leave-start": (classes) => {
      el._x_transition.leave.start = classes;
    },
    "leave-end": (classes) => {
      el._x_transition.leave.end = classes;
    }
  };
  directiveStorageMap[stage](classString);
}
function registerTransitionsFromHelper(el, modifiers, stage) {
  registerTransitionObject(el, setStyles);
  let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
  let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
  let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
  if (modifiers.includes("in") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
  }
  if (modifiers.includes("out") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
  }
  let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
  let wantsOpacity = wantsAll || modifiers.includes("opacity");
  let wantsScale = wantsAll || modifiers.includes("scale");
  let opacityValue = wantsOpacity ? 0 : 1;
  let scaleValue = wantsScale ? modifierValue2(modifiers, "scale", 95) / 100 : 1;
  let delay3 = modifierValue2(modifiers, "delay", 0) / 1e3;
  let origin = modifierValue2(modifiers, "origin", "center");
  let property = "opacity, transform";
  let durationIn = modifierValue2(modifiers, "duration", 150) / 1e3;
  let durationOut = modifierValue2(modifiers, "duration", 75) / 1e3;
  let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
  if (transitioningIn) {
    el._x_transition.enter.during = {
      transformOrigin: origin,
      transitionDelay: `${delay3}s`,
      transitionProperty: property,
      transitionDuration: `${durationIn}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.enter.start = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
    el._x_transition.enter.end = {
      opacity: 1,
      transform: `scale(1)`
    };
  }
  if (transitioningOut) {
    el._x_transition.leave.during = {
      transformOrigin: origin,
      transitionDelay: `${delay3}s`,
      transitionProperty: property,
      transitionDuration: `${durationOut}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.leave.start = {
      opacity: 1,
      transform: `scale(1)`
    };
    el._x_transition.leave.end = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
  }
}
function registerTransitionObject(el, setFunction, defaultValue = {}) {
  if (!el._x_transition)
    el._x_transition = {
      enter: { during: defaultValue, start: defaultValue, end: defaultValue },
      leave: { during: defaultValue, start: defaultValue, end: defaultValue },
      in(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.enter.during,
          start: this.enter.start,
          end: this.enter.end
        }, before, after);
      },
      out(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.leave.during,
          start: this.leave.start,
          end: this.leave.end
        }, before, after);
      }
    };
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
  const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let clickAwayCompatibleShow = () => nextTick2(show);
  if (value) {
    if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
      el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
    } else {
      el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
    }
    return;
  }
  el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
    el._x_transition.out(() => {
    }, () => resolve(hide));
    el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
  }) : Promise.resolve(hide);
  queueMicrotask(() => {
    let closest = closestHide(el);
    if (closest) {
      if (!closest._x_hideChildren)
        closest._x_hideChildren = [];
      closest._x_hideChildren.push(el);
    } else {
      nextTick2(() => {
        let hideAfterChildren = (el2) => {
          let carry = Promise.all([
            el2._x_hidePromise,
            ...(el2._x_hideChildren || []).map(hideAfterChildren)
          ]).then(([i]) => i?.());
          delete el2._x_hidePromise;
          delete el2._x_hideChildren;
          return carry;
        };
        hideAfterChildren(el).catch((e) => {
          if (!e.isFromCancelledTransition)
            throw e;
        });
      });
    }
  });
};
function closestHide(el) {
  let parent = el.parentNode;
  if (!parent)
    return;
  return parent._x_hidePromise ? parent : closestHide(parent);
}
function transition(el, setFunction, { during, start: start2, end } = {}, before = () => {
}, after = () => {
}) {
  if (el._x_transitioning)
    el._x_transitioning.cancel();
  if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
    before();
    after();
    return;
  }
  let undoStart, undoDuring, undoEnd;
  performTransition(el, {
    start() {
      undoStart = setFunction(el, start2);
    },
    during() {
      undoDuring = setFunction(el, during);
    },
    before,
    end() {
      undoStart();
      undoEnd = setFunction(el, end);
    },
    after,
    cleanup() {
      undoDuring();
      undoEnd();
    }
  });
}
function performTransition(el, stages) {
  let interrupted, reachedBefore, reachedEnd;
  let finish = once(() => {
    mutateDom(() => {
      interrupted = true;
      if (!reachedBefore)
        stages.before();
      if (!reachedEnd) {
        stages.end();
        releaseNextTicks();
      }
      stages.after();
      if (el.isConnected)
        stages.cleanup();
      delete el._x_transitioning;
    });
  });
  el._x_transitioning = {
    beforeCancels: [],
    beforeCancel(callback) {
      this.beforeCancels.push(callback);
    },
    cancel: once(function() {
      while (this.beforeCancels.length) {
        this.beforeCancels.shift()();
      }
      ;
      finish();
    }),
    finish
  };
  mutateDom(() => {
    stages.start();
    stages.during();
  });
  holdNextTicks();
  requestAnimationFrame(() => {
    if (interrupted)
      return;
    let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
    let delay3 = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    if (duration === 0)
      duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
    mutateDom(() => {
      stages.before();
    });
    reachedBefore = true;
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      mutateDom(() => {
        stages.end();
      });
      releaseNextTicks();
      setTimeout(el._x_transitioning.finish, duration + delay3);
      reachedEnd = true;
    });
  });
}
function modifierValue2(modifiers, key, fallback) {
  if (modifiers.indexOf(key) === -1)
    return fallback;
  const rawValue = modifiers[modifiers.indexOf(key) + 1];
  if (!rawValue)
    return fallback;
  if (key === "scale") {
    if (isNaN(rawValue))
      return fallback;
  }
  if (key === "duration" || key === "delay") {
    let match = rawValue.match(/([0-9]+)ms/);
    if (match)
      return match[1];
  }
  if (key === "origin") {
    if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
      return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
    }
  }
  return rawValue;
}
var isCloning = false;
function skipDuringClone(callback, fallback = () => {
}) {
  return (...args) => isCloning ? fallback(...args) : callback(...args);
}
function onlyDuringClone(callback) {
  return (...args) => isCloning && callback(...args);
}
var interceptors = [];
function interceptClone(callback) {
  interceptors.push(callback);
}
function cloneNode(from, to) {
  interceptors.forEach((i) => i(from, to));
  isCloning = true;
  dontRegisterReactiveSideEffects(() => {
    initTree(to, (el, callback) => {
      callback(el, () => {
      });
    });
  });
  isCloning = false;
}
var isCloningLegacy = false;
function clone(oldEl, newEl) {
  if (!newEl._x_dataStack)
    newEl._x_dataStack = oldEl._x_dataStack;
  isCloning = true;
  isCloningLegacy = true;
  dontRegisterReactiveSideEffects(() => {
    cloneTree(newEl);
  });
  isCloning = false;
  isCloningLegacy = false;
}
function cloneTree(el) {
  let hasRunThroughFirstEl = false;
  let shallowWalker = (el2, callback) => {
    walk(el2, (el3, skip) => {
      if (hasRunThroughFirstEl && isRoot(el3))
        return skip();
      hasRunThroughFirstEl = true;
      callback(el3, skip);
    });
  };
  initTree(el, shallowWalker);
}
function dontRegisterReactiveSideEffects(callback) {
  let cache = effect;
  overrideEffect((callback2, el) => {
    let storedEffect = cache(callback2);
    release(storedEffect);
    return () => {
    };
  });
  callback();
  overrideEffect(cache);
}
function bind(el, name, value, modifiers = []) {
  if (!el._x_bindings)
    el._x_bindings = reactive({});
  el._x_bindings[name] = value;
  name = modifiers.includes("camel") ? camelCase(name) : name;
  switch (name) {
    case "value":
      bindInputValue(el, value);
      break;
    case "style":
      bindStyles(el, value);
      break;
    case "class":
      bindClasses(el, value);
      break;
    case "selected":
    case "checked":
      bindAttributeAndProperty(el, name, value);
      break;
    default:
      bindAttribute(el, name, value);
      break;
  }
}
function bindInputValue(el, value) {
  if (el.type === "radio") {
    if (el.attributes.value === void 0) {
      el.value = value;
    }
    if (window.fromModel) {
      if (typeof value === "boolean") {
        el.checked = safeParseBoolean(el.value) === value;
      } else {
        el.checked = checkedAttrLooseCompare(el.value, value);
      }
    }
  } else if (el.type === "checkbox") {
    if (Number.isInteger(value)) {
      el.value = value;
    } else if (!Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
      el.value = String(value);
    } else {
      if (Array.isArray(value)) {
        el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
      } else {
        el.checked = !!value;
      }
    }
  } else if (el.tagName === "SELECT") {
    updateSelect(el, value);
  } else {
    if (el.value === value)
      return;
    el.value = value === void 0 ? "" : value;
  }
}
function bindClasses(el, value) {
  if (el._x_undoAddedClasses)
    el._x_undoAddedClasses();
  el._x_undoAddedClasses = setClasses(el, value);
}
function bindStyles(el, value) {
  if (el._x_undoAddedStyles)
    el._x_undoAddedStyles();
  el._x_undoAddedStyles = setStyles(el, value);
}
function bindAttributeAndProperty(el, name, value) {
  bindAttribute(el, name, value);
  setPropertyIfChanged(el, name, value);
}
function bindAttribute(el, name, value) {
  if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
    el.removeAttribute(name);
  } else {
    if (isBooleanAttr(name))
      value = name;
    setIfChanged(el, name, value);
  }
}
function setIfChanged(el, attrName, value) {
  if (el.getAttribute(attrName) != value) {
    el.setAttribute(attrName, value);
  }
}
function setPropertyIfChanged(el, propName, value) {
  if (el[propName] !== value) {
    el[propName] = value;
  }
}
function updateSelect(el, value) {
  const arrayWrappedValue = [].concat(value).map((value2) => {
    return value2 + "";
  });
  Array.from(el.options).forEach((option) => {
    option.selected = arrayWrappedValue.includes(option.value);
  });
}
function camelCase(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
}
function checkedAttrLooseCompare(valueA, valueB) {
  return valueA == valueB;
}
function safeParseBoolean(rawValue) {
  if ([1, "1", "true", "on", "yes", true].includes(rawValue)) {
    return true;
  }
  if ([0, "0", "false", "off", "no", false].includes(rawValue)) {
    return false;
  }
  return rawValue ? Boolean(rawValue) : null;
}
function isBooleanAttr(attrName) {
  const booleanAttributes = [
    "disabled",
    "checked",
    "required",
    "readonly",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule"
  ];
  return booleanAttributes.includes(attrName);
}
function attributeShouldntBePreservedIfFalsy(name) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
}
function getBinding(el, name, fallback) {
  if (el._x_bindings && el._x_bindings[name] !== void 0)
    return el._x_bindings[name];
  return getAttributeBinding(el, name, fallback);
}
function extractProp(el, name, fallback, extract = true) {
  if (el._x_bindings && el._x_bindings[name] !== void 0)
    return el._x_bindings[name];
  if (el._x_inlineBindings && el._x_inlineBindings[name] !== void 0) {
    let binding = el._x_inlineBindings[name];
    binding.extract = extract;
    return dontAutoEvaluateFunctions(() => {
      return evaluate(el, binding.expression);
    });
  }
  return getAttributeBinding(el, name, fallback);
}
function getAttributeBinding(el, name, fallback) {
  let attr = el.getAttribute(name);
  if (attr === null)
    return typeof fallback === "function" ? fallback() : fallback;
  if (attr === "")
    return true;
  if (isBooleanAttr(name)) {
    return !![name, "true"].includes(attr);
  }
  return attr;
}
function debounce(func, wait) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function throttle(func, limit) {
  let inThrottle;
  return function() {
    let context = this, args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
  let firstRun = true;
  let outerHash;
  let innerHash;
  let reference = effect(() => {
    let outer = outerGet();
    let inner = innerGet();
    if (firstRun) {
      innerSet(cloneIfObject(outer));
      firstRun = false;
    } else {
      let outerHashLatest = JSON.stringify(outer);
      let innerHashLatest = JSON.stringify(inner);
      if (outerHashLatest !== outerHash) {
        innerSet(cloneIfObject(outer));
      } else if (outerHashLatest !== innerHashLatest) {
        outerSet(cloneIfObject(inner));
      } else {
      }
    }
    outerHash = JSON.stringify(outerGet());
    innerHash = JSON.stringify(innerGet());
  });
  return () => {
    release(reference);
  };
}
function cloneIfObject(value) {
  return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
}
function plugin(callback) {
  let callbacks = Array.isArray(callback) ? callback : [callback];
  callbacks.forEach((i) => i(alpine_default));
}
var stores = {};
var isReactive = false;
function store(name, value) {
  if (!isReactive) {
    stores = reactive(stores);
    isReactive = true;
  }
  if (value === void 0) {
    return stores[name];
  }
  stores[name] = value;
  if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
    stores[name].init();
  }
  initInterceptors(stores[name]);
}
function getStores() {
  return stores;
}
var binds = {};
function bind2(name, bindings) {
  let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
  if (name instanceof Element) {
    return applyBindingsObject(name, getBindings());
  } else {
    binds[name] = getBindings;
  }
  return () => {
  };
}
function injectBindingProviders(obj) {
  Object.entries(binds).forEach(([name, callback]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback(...args);
        };
      }
    });
  });
  return obj;
}
function applyBindingsObject(el, obj, original) {
  let cleanupRunners = [];
  while (cleanupRunners.length)
    cleanupRunners.pop()();
  let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
  let staticAttributes = attributesOnly(attributes);
  attributes = attributes.map((attribute) => {
    if (staticAttributes.find((attr) => attr.name === attribute.name)) {
      return {
        name: `x-bind:${attribute.name}`,
        value: `"${attribute.value}"`
      };
    }
    return attribute;
  });
  directives(el, attributes, original).map((handle) => {
    cleanupRunners.push(handle.runCleanups);
    handle();
  });
  return () => {
    while (cleanupRunners.length)
      cleanupRunners.pop()();
  };
}
var datas = {};
function data(name, callback) {
  datas[name] = callback;
}
function injectDataProviders(obj, context) {
  Object.entries(datas).forEach(([name, callback]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback.bind(context)(...args);
        };
      },
      enumerable: false
    });
  });
  return obj;
}
var Alpine2 = {
  get reactive() {
    return reactive;
  },
  get release() {
    return release;
  },
  get effect() {
    return effect;
  },
  get raw() {
    return raw;
  },
  version: "3.14.1",
  flushAndStopDeferringMutations,
  dontAutoEvaluateFunctions,
  disableEffectScheduling,
  startObservingMutations,
  stopObservingMutations,
  setReactivityEngine,
  onAttributeRemoved,
  onAttributesAdded,
  closestDataStack,
  skipDuringClone,
  onlyDuringClone,
  addRootSelector,
  addInitSelector,
  interceptClone,
  addScopeToNode,
  deferMutations,
  mapAttributes,
  evaluateLater,
  interceptInit,
  setEvaluator,
  mergeProxies,
  extractProp,
  findClosest,
  onElRemoved,
  closestRoot,
  destroyTree,
  interceptor,
  // INTERNAL: not public API and is subject to change without major release.
  transition,
  // INTERNAL
  setStyles,
  // INTERNAL
  mutateDom,
  directive,
  entangle,
  throttle,
  debounce,
  evaluate,
  initTree,
  nextTick,
  prefixed: prefix,
  prefix: setPrefix,
  plugin,
  magic,
  store,
  start,
  clone,
  // INTERNAL
  cloneNode,
  // INTERNAL
  bound: getBinding,
  $data: scope,
  watch,
  walk,
  data,
  bind: bind2
};
var alpine_default = Alpine2;
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
var EMPTY_OBJ = true ? Object.freeze({}) : {};
var EMPTY_ARR = true ? Object.freeze([]) : [];
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
var targetMap = /* @__PURE__ */ new WeakMap();
var effectStack = [];
var activeEffect;
var ITERATE_KEY = Symbol(true ? "iterate" : "");
var MAP_KEY_ITERATE_KEY = Symbol(true ? "Map key iterate" : "");
function isEffect(fn) {
  return fn && fn._isEffect === true;
}
function effect2(fn, options = EMPTY_OBJ) {
  if (isEffect(fn)) {
    fn = fn.raw;
  }
  const effect3 = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect3();
  }
  return effect3;
}
function stop(effect3) {
  if (effect3.active) {
    cleanup(effect3);
    if (effect3.options.onStop) {
      effect3.options.onStop();
    }
    effect3.active = false;
  }
}
var uid = 0;
function createReactiveEffect(fn, options) {
  const effect3 = function reactiveEffect() {
    if (!effect3.active) {
      return fn();
    }
    if (!effectStack.includes(effect3)) {
      cleanup(effect3);
      try {
        enableTracking();
        effectStack.push(effect3);
        activeEffect = effect3;
        return fn();
      } finally {
        effectStack.pop();
        resetTracking();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect3.id = uid++;
  effect3.allowRecurse = !!options.allowRecurse;
  effect3._isEffect = true;
  effect3.active = true;
  effect3.raw = fn;
  effect3.deps = [];
  effect3.options = options;
  return effect3;
}
function cleanup(effect3) {
  const { deps } = effect3;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect3);
    }
    deps.length = 0;
  }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (!shouldTrack || activeEffect === void 0) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = /* @__PURE__ */ new Set());
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target,
        type,
        key
      });
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const effects = /* @__PURE__ */ new Set();
  const add2 = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach((effect3) => {
        if (effect3 !== activeEffect || effect3.allowRecurse) {
          effects.add(effect3);
        }
      });
    }
  };
  if (type === "clear") {
    depsMap.forEach(add2);
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        add2(dep);
      }
    });
  } else {
    if (key !== void 0) {
      add2(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          add2(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          add2(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const run = (effect3) => {
    if (effect3.options.onTrigger) {
      effect3.options.onTrigger({
        effect: effect3,
        target,
        key,
        type,
        newValue,
        oldValue,
        oldTarget
      });
    }
    if (effect3.options.scheduler) {
      effect3.options.scheduler(effect3);
    } else {
      effect3();
    }
  };
  effects.forEach(run);
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
var get2 = /* @__PURE__ */ createGetter();
var readonlyGet = /* @__PURE__ */ createGetter(true);
var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res2 = arr[key](...args);
      if (res2 === -1 || res2 === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res2;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res2 = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res2;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly = false, shallow = false) {
  return function get3(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res2 = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res2;
    }
    if (!isReadonly) {
      track(target, "get", key);
    }
    if (shallow) {
      return res2;
    }
    if (isRef(res2)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res2.value : res2;
    }
    if (isObject(res2)) {
      return isReadonly ? readonly(res2) : reactive2(res2);
    }
    return res2;
  };
}
var set2 = /* @__PURE__ */ createSetter();
function createSetter(shallow = false) {
  return function set3(target, key, value, receiver) {
    let oldValue = target[key];
    if (!shallow) {
      value = toRaw(value);
      oldValue = toRaw(oldValue);
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys2(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
var mutableHandlers = {
  get: get2,
  set: set2,
  deleteProperty,
  has,
  ownKeys: ownKeys2
};
var readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    if (true) {
      console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    if (true) {
      console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
var toReactive = (value) => isObject(value) ? reactive2(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly = false, isShallow = false) {
  target = target[
    "__v_raw"
    /* RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "get", key);
  }
  !isReadonly && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly = false) {
  const target = this[
    "__v_raw"
    /* RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "has", key);
  }
  !isReadonly && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
  target = target[
    "__v_raw"
    /* RAW */
  ];
  !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3 ? get3.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly, isShallow) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
var mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
var readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive2(target) {
  if (target && target[
    "__v_isReadonly"
    /* IS_READONLY */
  ]) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (true) {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* RAW */
  ] && !(isReadonly && target[
    "__v_isReactive"
    /* IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function toRaw(observed) {
  return observed && toRaw(observed[
    "__v_raw"
    /* RAW */
  ]) || observed;
}
function isRef(r) {
  return Boolean(r && r.__v_isRef === true);
}
magic("nextTick", () => nextTick);
magic("dispatch", (el) => dispatch.bind(dispatch, el));
magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => (key, callback) => {
  let evaluate2 = evaluateLater2(key);
  let getter = () => {
    let value;
    evaluate2((i) => value = i);
    return value;
  };
  let unwatch = watch(getter, callback);
  cleanup2(unwatch);
});
magic("store", getStores);
magic("data", (el) => scope(el));
magic("root", (el) => closestRoot(el));
magic("refs", (el) => {
  if (el._x_refs_proxy)
    return el._x_refs_proxy;
  el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
  return el._x_refs_proxy;
});
function getArrayOfRefObject(el) {
  let refObjects = [];
  findClosest(el, (i) => {
    if (i._x_refs)
      refObjects.push(i._x_refs);
  });
  return refObjects;
}
var globalIdMemo = {};
function findAndIncrementId(name) {
  if (!globalIdMemo[name])
    globalIdMemo[name] = 0;
  return ++globalIdMemo[name];
}
function closestIdRoot(el, name) {
  return findClosest(el, (element) => {
    if (element._x_ids && element._x_ids[name])
      return true;
  });
}
function setIdRoot(el, name) {
  if (!el._x_ids)
    el._x_ids = {};
  if (!el._x_ids[name])
    el._x_ids[name] = findAndIncrementId(name);
}
magic("id", (el, { cleanup: cleanup2 }) => (name, key = null) => {
  let cacheKey = `${name}${key ? `-${key}` : ""}`;
  return cacheIdByNameOnElement(el, cacheKey, cleanup2, () => {
    let root = closestIdRoot(el, name);
    let id = root ? root._x_ids[name] : findAndIncrementId(name);
    return key ? `${name}-${id}-${key}` : `${name}-${id}`;
  });
});
interceptClone((from, to) => {
  if (from._x_id) {
    to._x_id = from._x_id;
  }
});
function cacheIdByNameOnElement(el, cacheKey, cleanup2, callback) {
  if (!el._x_id)
    el._x_id = {};
  if (el._x_id[cacheKey])
    return el._x_id[cacheKey];
  let output = callback();
  el._x_id[cacheKey] = output;
  cleanup2(() => {
    delete el._x_id[cacheKey];
  });
  return output;
}
magic("el", (el) => el);
warnMissingPluginMagic("Focus", "focus", "focus");
warnMissingPluginMagic("Persist", "persist", "persist");
function warnMissingPluginMagic(name, magicName, slug) {
  magic(magicName, (el) => warn(`You can't use [$${magicName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}
directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
  let func = evaluateLater2(expression);
  let innerGet = () => {
    let result;
    func((i) => result = i);
    return result;
  };
  let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
  let innerSet = (val) => evaluateInnerSet(() => {
  }, { scope: { "__placeholder": val } });
  let initialValue = innerGet();
  innerSet(initialValue);
  queueMicrotask(() => {
    if (!el._x_model)
      return;
    el._x_removeModelListeners["default"]();
    let outerGet = el._x_model.get;
    let outerSet = el._x_model.set;
    let releaseEntanglement = entangle(
      {
        get() {
          return outerGet();
        },
        set(value) {
          outerSet(value);
        }
      },
      {
        get() {
          return innerGet();
        },
        set(value) {
          innerSet(value);
        }
      }
    );
    cleanup2(releaseEntanglement);
  });
});
directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 }) => {
  if (el.tagName.toLowerCase() !== "template")
    warn("x-teleport can only be used on a <template> tag", el);
  let target = getTarget(expression);
  let clone2 = el.content.cloneNode(true).firstElementChild;
  el._x_teleport = clone2;
  clone2._x_teleportBack = el;
  el.setAttribute("data-teleport-template", true);
  clone2.setAttribute("data-teleport-target", true);
  if (el._x_forwardEvents) {
    el._x_forwardEvents.forEach((eventName) => {
      clone2.addEventListener(eventName, (e) => {
        e.stopPropagation();
        el.dispatchEvent(new e.constructor(e.type, e));
      });
    });
  }
  addScopeToNode(clone2, {}, el);
  let placeInDom = (clone3, target2, modifiers2) => {
    if (modifiers2.includes("prepend")) {
      target2.parentNode.insertBefore(clone3, target2);
    } else if (modifiers2.includes("append")) {
      target2.parentNode.insertBefore(clone3, target2.nextSibling);
    } else {
      target2.appendChild(clone3);
    }
  };
  mutateDom(() => {
    placeInDom(clone2, target, modifiers);
    skipDuringClone(() => {
      initTree(clone2);
      clone2._x_ignore = true;
    })();
  });
  el._x_teleportPutBack = () => {
    let target2 = getTarget(expression);
    mutateDom(() => {
      placeInDom(el._x_teleport, target2, modifiers);
    });
  };
  cleanup2(() => clone2.remove());
});
var teleportContainerDuringClone = document.createElement("div");
function getTarget(expression) {
  let target = skipDuringClone(() => {
    return document.querySelector(expression);
  }, () => {
    return teleportContainerDuringClone;
  })();
  if (!target)
    warn(`Cannot find x-teleport element for selector: "${expression}"`);
  return target;
}
var handler = () => {
};
handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
  modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
  cleanup2(() => {
    modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
  });
};
directive("ignore", handler);
directive("effect", skipDuringClone((el, { expression }, { effect: effect3 }) => {
  effect3(evaluateLater(el, expression));
}));
function on(el, event, modifiers, callback) {
  let listenerTarget = el;
  let handler4 = (e) => callback(e);
  let options = {};
  let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
  if (modifiers.includes("dot"))
    event = dotSyntax(event);
  if (modifiers.includes("camel"))
    event = camelCase2(event);
  if (modifiers.includes("passive"))
    options.passive = true;
  if (modifiers.includes("capture"))
    options.capture = true;
  if (modifiers.includes("window"))
    listenerTarget = window;
  if (modifiers.includes("document"))
    listenerTarget = document;
  if (modifiers.includes("debounce")) {
    let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler4 = debounce(handler4, wait);
  }
  if (modifiers.includes("throttle")) {
    let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler4 = throttle(handler4, wait);
  }
  if (modifiers.includes("prevent"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.preventDefault();
      next(e);
    });
  if (modifiers.includes("stop"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.stopPropagation();
      next(e);
    });
  if (modifiers.includes("once")) {
    handler4 = wrapHandler(handler4, (next, e) => {
      next(e);
      listenerTarget.removeEventListener(event, handler4, options);
    });
  }
  if (modifiers.includes("away") || modifiers.includes("outside")) {
    listenerTarget = document;
    handler4 = wrapHandler(handler4, (next, e) => {
      if (el.contains(e.target))
        return;
      if (e.target.isConnected === false)
        return;
      if (el.offsetWidth < 1 && el.offsetHeight < 1)
        return;
      if (el._x_isShown === false)
        return;
      next(e);
    });
  }
  if (modifiers.includes("self"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.target === el && next(e);
    });
  if (isKeyEvent(event) || isClickEvent(event)) {
    handler4 = wrapHandler(handler4, (next, e) => {
      if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
        return;
      }
      next(e);
    });
  }
  listenerTarget.addEventListener(event, handler4, options);
  return () => {
    listenerTarget.removeEventListener(event, handler4, options);
  };
}
function dotSyntax(subject) {
  return subject.replace(/-/g, ".");
}
function camelCase2(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
}
function isNumeric(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function kebabCase2(subject) {
  if ([" ", "_"].includes(
    subject
  ))
    return subject;
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function isKeyEvent(event) {
  return ["keydown", "keyup"].includes(event);
}
function isClickEvent(event) {
  return ["contextmenu", "click", "mouse"].some((i) => event.includes(i));
}
function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
  let keyModifiers = modifiers.filter((i) => {
    return !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(i);
  });
  if (keyModifiers.includes("debounce")) {
    let debounceIndex = keyModifiers.indexOf("debounce");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.includes("throttle")) {
    let debounceIndex = keyModifiers.indexOf("throttle");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.length === 0)
    return false;
  if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
    return false;
  const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
  const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
  keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
  if (selectedSystemKeyModifiers.length > 0) {
    const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
      if (modifier === "cmd" || modifier === "super")
        modifier = "meta";
      return e[`${modifier}Key`];
    });
    if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
      if (isClickEvent(e.type))
        return false;
      if (keyToModifiers(e.key).includes(keyModifiers[0]))
        return false;
    }
  }
  return true;
}
function keyToModifiers(key) {
  if (!key)
    return [];
  key = kebabCase2(key);
  let modifierToKeyMap = {
    "ctrl": "control",
    "slash": "/",
    "space": " ",
    "spacebar": " ",
    "cmd": "meta",
    "esc": "escape",
    "up": "arrow-up",
    "down": "arrow-down",
    "left": "arrow-left",
    "right": "arrow-right",
    "period": ".",
    "comma": ",",
    "equal": "=",
    "minus": "-",
    "underscore": "_"
  };
  modifierToKeyMap[key] = key;
  return Object.keys(modifierToKeyMap).map((modifier) => {
    if (modifierToKeyMap[modifier] === key)
      return modifier;
  }).filter((modifier) => modifier);
}
directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
  let scopeTarget = el;
  if (modifiers.includes("parent")) {
    scopeTarget = el.parentNode;
  }
  let evaluateGet = evaluateLater(scopeTarget, expression);
  let evaluateSet;
  if (typeof expression === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
  } else if (typeof expression === "function" && typeof expression() === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
  } else {
    evaluateSet = () => {
    };
  }
  let getValue = () => {
    let result;
    evaluateGet((value) => result = value);
    return isGetterSetter(result) ? result.get() : result;
  };
  let setValue = (value) => {
    let result;
    evaluateGet((value2) => result = value2);
    if (isGetterSetter(result)) {
      result.set(value);
    } else {
      evaluateSet(() => {
      }, {
        scope: { "__placeholder": value }
      });
    }
  };
  if (typeof expression === "string" && el.type === "radio") {
    mutateDom(() => {
      if (!el.hasAttribute("name"))
        el.setAttribute("name", expression);
    });
  }
  var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
  let removeListener = isCloning ? () => {
  } : on(el, event, modifiers, (e) => {
    setValue(getInputValue(el, modifiers, e, getValue()));
  });
  if (modifiers.includes("fill")) {
    if ([void 0, null, ""].includes(getValue()) || el.type === "checkbox" && Array.isArray(getValue()) || el.tagName.toLowerCase() === "select" && el.multiple) {
      setValue(
        getInputValue(el, modifiers, { target: el }, getValue())
      );
    }
  }
  if (!el._x_removeModelListeners)
    el._x_removeModelListeners = {};
  el._x_removeModelListeners["default"] = removeListener;
  cleanup2(() => el._x_removeModelListeners["default"]());
  if (el.form) {
    let removeResetListener = on(el.form, "reset", [], (e) => {
      nextTick(() => el._x_model && el._x_model.set(getInputValue(el, modifiers, { target: el }, getValue())));
    });
    cleanup2(() => removeResetListener());
  }
  el._x_model = {
    get() {
      return getValue();
    },
    set(value) {
      setValue(value);
    }
  };
  el._x_forceModelUpdate = (value) => {
    if (value === void 0 && typeof expression === "string" && expression.match(/\./))
      value = "";
    window.fromModel = true;
    mutateDom(() => bind(el, "value", value));
    delete window.fromModel;
  };
  effect3(() => {
    let value = getValue();
    if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
      return;
    el._x_forceModelUpdate(value);
  });
});
function getInputValue(el, modifiers, event, currentValue) {
  return mutateDom(() => {
    if (event instanceof CustomEvent && event.detail !== void 0)
      return event.detail !== null && event.detail !== void 0 ? event.detail : event.target.value;
    else if (el.type === "checkbox") {
      if (Array.isArray(currentValue)) {
        let newValue = null;
        if (modifiers.includes("number")) {
          newValue = safeParseNumber(event.target.value);
        } else if (modifiers.includes("boolean")) {
          newValue = safeParseBoolean(event.target.value);
        } else {
          newValue = event.target.value;
        }
        return event.target.checked ? currentValue.includes(newValue) ? currentValue : currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
      } else {
        return event.target.checked;
      }
    } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
      if (modifiers.includes("number")) {
        return Array.from(event.target.selectedOptions).map((option) => {
          let rawValue = option.value || option.text;
          return safeParseNumber(rawValue);
        });
      } else if (modifiers.includes("boolean")) {
        return Array.from(event.target.selectedOptions).map((option) => {
          let rawValue = option.value || option.text;
          return safeParseBoolean(rawValue);
        });
      }
      return Array.from(event.target.selectedOptions).map((option) => {
        return option.value || option.text;
      });
    } else {
      let newValue;
      if (el.type === "radio") {
        if (event.target.checked) {
          newValue = event.target.value;
        } else {
          newValue = currentValue;
        }
      } else {
        newValue = event.target.value;
      }
      if (modifiers.includes("number")) {
        return safeParseNumber(newValue);
      } else if (modifiers.includes("boolean")) {
        return safeParseBoolean(newValue);
      } else if (modifiers.includes("trim")) {
        return newValue.trim();
      } else {
        return newValue;
      }
    }
  });
}
function safeParseNumber(rawValue) {
  let number = rawValue ? parseFloat(rawValue) : null;
  return isNumeric2(number) ? number : rawValue;
}
function checkedAttrLooseCompare2(valueA, valueB) {
  return valueA == valueB;
}
function isNumeric2(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function isGetterSetter(value) {
  return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
}
directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
addInitSelector(() => `[${prefix("init")}]`);
directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 }) => {
  if (typeof expression === "string") {
    return !!expression.trim() && evaluate2(expression, {}, false);
  }
  return evaluate2(expression, {}, false);
}));
directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2((value) => {
      mutateDom(() => {
        el.textContent = value;
      });
    });
  });
});
directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2((value) => {
      mutateDom(() => {
        el.innerHTML = value;
        el._x_ignoreSelf = true;
        initTree(el);
        delete el._x_ignoreSelf;
      });
    });
  });
});
mapAttributes(startingWith(":", into(prefix("bind:"))));
var handler2 = (el, { value, modifiers, expression, original }, { effect: effect3, cleanup: cleanup2 }) => {
  if (!value) {
    let bindingProviders = {};
    injectBindingProviders(bindingProviders);
    let getBindings = evaluateLater(el, expression);
    getBindings((bindings) => {
      applyBindingsObject(el, bindings, original);
    }, { scope: bindingProviders });
    return;
  }
  if (value === "key")
    return storeKeyForXFor(el, expression);
  if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) {
    return;
  }
  let evaluate2 = evaluateLater(el, expression);
  effect3(() => evaluate2((result) => {
    if (result === void 0 && typeof expression === "string" && expression.match(/\./)) {
      result = "";
    }
    mutateDom(() => bind(el, value, result, modifiers));
  }));
  cleanup2(() => {
    el._x_undoAddedClasses && el._x_undoAddedClasses();
    el._x_undoAddedStyles && el._x_undoAddedStyles();
  });
};
handler2.inline = (el, { value, modifiers, expression }) => {
  if (!value)
    return;
  if (!el._x_inlineBindings)
    el._x_inlineBindings = {};
  el._x_inlineBindings[value] = { expression, extract: false };
};
directive("bind", handler2);
function storeKeyForXFor(el, expression) {
  el._x_keyExpression = expression;
}
addRootSelector(() => `[${prefix("data")}]`);
directive("data", (el, { expression }, { cleanup: cleanup2 }) => {
  if (shouldSkipRegisteringDataDuringClone(el))
    return;
  expression = expression === "" ? "{}" : expression;
  let magicContext = {};
  injectMagics(magicContext, el);
  let dataProviderContext = {};
  injectDataProviders(dataProviderContext, magicContext);
  let data2 = evaluate(el, expression, { scope: dataProviderContext });
  if (data2 === void 0 || data2 === true)
    data2 = {};
  injectMagics(data2, el);
  let reactiveData = reactive(data2);
  initInterceptors(reactiveData);
  let undo = addScopeToNode(el, reactiveData);
  reactiveData["init"] && evaluate(el, reactiveData["init"]);
  cleanup2(() => {
    reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
    undo();
  });
});
interceptClone((from, to) => {
  if (from._x_dataStack) {
    to._x_dataStack = from._x_dataStack;
    to.setAttribute("data-has-alpine-state", true);
  }
});
function shouldSkipRegisteringDataDuringClone(el) {
  if (!isCloning)
    return false;
  if (isCloningLegacy)
    return true;
  return el.hasAttribute("data-has-alpine-state");
}
directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
  let evaluate2 = evaluateLater(el, expression);
  if (!el._x_doHide)
    el._x_doHide = () => {
      mutateDom(() => {
        el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
      });
    };
  if (!el._x_doShow)
    el._x_doShow = () => {
      mutateDom(() => {
        if (el.style.length === 1 && el.style.display === "none") {
          el.removeAttribute("style");
        } else {
          el.style.removeProperty("display");
        }
      });
    };
  let hide = () => {
    el._x_doHide();
    el._x_isShown = false;
  };
  let show = () => {
    el._x_doShow();
    el._x_isShown = true;
  };
  let clickAwayCompatibleShow = () => setTimeout(show);
  let toggle = once(
    (value) => value ? show() : hide(),
    (value) => {
      if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
        el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
      } else {
        value ? clickAwayCompatibleShow() : hide();
      }
    }
  );
  let oldValue;
  let firstTime = true;
  effect3(() => evaluate2((value) => {
    if (!firstTime && value === oldValue)
      return;
    if (modifiers.includes("immediate"))
      value ? clickAwayCompatibleShow() : hide();
    toggle(value);
    oldValue = value;
    firstTime = false;
  }));
});
directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
  let iteratorNames = parseForExpression(expression);
  let evaluateItems = evaluateLater(el, iteratorNames.items);
  let evaluateKey = evaluateLater(
    el,
    // the x-bind:key expression is stored for our use instead of evaluated.
    el._x_keyExpression || "index"
  );
  el._x_prevKeys = [];
  el._x_lookup = {};
  effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
  cleanup2(() => {
    Object.values(el._x_lookup).forEach((el2) => el2.remove());
    delete el._x_prevKeys;
    delete el._x_lookup;
  });
});
function loop(el, iteratorNames, evaluateItems, evaluateKey) {
  let isObject2 = (i) => typeof i === "object" && !Array.isArray(i);
  let templateEl = el;
  evaluateItems((items) => {
    if (isNumeric3(items) && items >= 0) {
      items = Array.from(Array(items).keys(), (i) => i + 1);
    }
    if (items === void 0)
      items = [];
    let lookup = el._x_lookup;
    let prevKeys = el._x_prevKeys;
    let scopes = [];
    let keys = [];
    if (isObject2(items)) {
      items = Object.entries(items).map(([key, value]) => {
        let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
        evaluateKey((value2) => {
          if (keys.includes(value2))
            warn("Duplicate key on x-for", el);
          keys.push(value2);
        }, { scope: { index: key, ...scope2 } });
        scopes.push(scope2);
      });
    } else {
      for (let i = 0; i < items.length; i++) {
        let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
        evaluateKey((value) => {
          if (keys.includes(value))
            warn("Duplicate key on x-for", el);
          keys.push(value);
        }, { scope: { index: i, ...scope2 } });
        scopes.push(scope2);
      }
    }
    let adds = [];
    let moves = [];
    let removes = [];
    let sames = [];
    for (let i = 0; i < prevKeys.length; i++) {
      let key = prevKeys[i];
      if (keys.indexOf(key) === -1)
        removes.push(key);
    }
    prevKeys = prevKeys.filter((key) => !removes.includes(key));
    let lastKey = "template";
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let prevIndex = prevKeys.indexOf(key);
      if (prevIndex === -1) {
        prevKeys.splice(i, 0, key);
        adds.push([lastKey, i]);
      } else if (prevIndex !== i) {
        let keyInSpot = prevKeys.splice(i, 1)[0];
        let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
        prevKeys.splice(i, 0, keyForSpot);
        prevKeys.splice(prevIndex, 0, keyInSpot);
        moves.push([keyInSpot, keyForSpot]);
      } else {
        sames.push(key);
      }
      lastKey = key;
    }
    for (let i = 0; i < removes.length; i++) {
      let key = removes[i];
      if (!!lookup[key]._x_effects) {
        lookup[key]._x_effects.forEach(dequeueJob);
      }
      lookup[key].remove();
      lookup[key] = null;
      delete lookup[key];
    }
    for (let i = 0; i < moves.length; i++) {
      let [keyInSpot, keyForSpot] = moves[i];
      let elInSpot = lookup[keyInSpot];
      let elForSpot = lookup[keyForSpot];
      let marker = document.createElement("div");
      mutateDom(() => {
        if (!elForSpot)
          warn(`x-for ":key" is undefined or invalid`, templateEl, keyForSpot, lookup);
        elForSpot.after(marker);
        elInSpot.after(elForSpot);
        elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
        marker.before(elInSpot);
        elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
        marker.remove();
      });
      elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
    }
    for (let i = 0; i < adds.length; i++) {
      let [lastKey2, index] = adds[i];
      let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
      if (lastEl._x_currentIfEl)
        lastEl = lastEl._x_currentIfEl;
      let scope2 = scopes[index];
      let key = keys[index];
      let clone2 = document.importNode(templateEl.content, true).firstElementChild;
      let reactiveScope = reactive(scope2);
      addScopeToNode(clone2, reactiveScope, templateEl);
      clone2._x_refreshXForScope = (newScope) => {
        Object.entries(newScope).forEach(([key2, value]) => {
          reactiveScope[key2] = value;
        });
      };
      mutateDom(() => {
        lastEl.after(clone2);
        skipDuringClone(() => initTree(clone2))();
      });
      if (typeof key === "object") {
        warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
      }
      lookup[key] = clone2;
    }
    for (let i = 0; i < sames.length; i++) {
      lookup[sames[i]]._x_refreshXForScope(scopes[keys.indexOf(sames[i])]);
    }
    templateEl._x_prevKeys = keys;
  });
}
function parseForExpression(expression) {
  let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  let stripParensRE = /^\s*\(|\)\s*$/g;
  let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  let inMatch = expression.match(forAliasRE);
  if (!inMatch)
    return;
  let res2 = {};
  res2.items = inMatch[2].trim();
  let item = inMatch[1].replace(stripParensRE, "").trim();
  let iteratorMatch = item.match(forIteratorRE);
  if (iteratorMatch) {
    res2.item = item.replace(forIteratorRE, "").trim();
    res2.index = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res2.collection = iteratorMatch[2].trim();
    }
  } else {
    res2.item = item;
  }
  return res2;
}
function getIterationScopeVariables(iteratorNames, item, index, items) {
  let scopeVariables = {};
  if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
    let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
    names.forEach((name, i) => {
      scopeVariables[name] = item[i];
    });
  } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
    let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
    names.forEach((name) => {
      scopeVariables[name] = item[name];
    });
  } else {
    scopeVariables[iteratorNames.item] = item;
  }
  if (iteratorNames.index)
    scopeVariables[iteratorNames.index] = index;
  if (iteratorNames.collection)
    scopeVariables[iteratorNames.collection] = items;
  return scopeVariables;
}
function isNumeric3(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function handler3() {
}
handler3.inline = (el, { expression }, { cleanup: cleanup2 }) => {
  let root = closestRoot(el);
  if (!root._x_refs)
    root._x_refs = {};
  root._x_refs[expression] = el;
  cleanup2(() => delete root._x_refs[expression]);
};
directive("ref", handler3);
directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
  if (el.tagName.toLowerCase() !== "template")
    warn("x-if can only be used on a <template> tag", el);
  let evaluate2 = evaluateLater(el, expression);
  let show = () => {
    if (el._x_currentIfEl)
      return el._x_currentIfEl;
    let clone2 = el.content.cloneNode(true).firstElementChild;
    addScopeToNode(clone2, {}, el);
    mutateDom(() => {
      el.after(clone2);
      skipDuringClone(() => initTree(clone2))();
    });
    el._x_currentIfEl = clone2;
    el._x_undoIf = () => {
      walk(clone2, (node) => {
        if (!!node._x_effects) {
          node._x_effects.forEach(dequeueJob);
        }
      });
      clone2.remove();
      delete el._x_currentIfEl;
    };
    return clone2;
  };
  let hide = () => {
    if (!el._x_undoIf)
      return;
    el._x_undoIf();
    delete el._x_undoIf;
  };
  effect3(() => evaluate2((value) => {
    value ? show() : hide();
  }));
  cleanup2(() => el._x_undoIf && el._x_undoIf());
});
directive("id", (el, { expression }, { evaluate: evaluate2 }) => {
  let names = evaluate2(expression);
  names.forEach((name) => setIdRoot(el, name));
});
interceptClone((from, to) => {
  if (from._x_ids) {
    to._x_ids = from._x_ids;
  }
});
mapAttributes(startingWith("@", into(prefix("on:"))));
directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
  let evaluate2 = expression ? evaluateLater(el, expression) : () => {
  };
  if (el.tagName.toLowerCase() === "template") {
    if (!el._x_forwardEvents)
      el._x_forwardEvents = [];
    if (!el._x_forwardEvents.includes(value))
      el._x_forwardEvents.push(value);
  }
  let removeListener = on(el, value, modifiers, (e) => {
    evaluate2(() => {
    }, { scope: { "$event": e }, params: [e] });
  });
  cleanup2(() => removeListener());
}));
warnMissingPluginDirective("Collapse", "collapse", "collapse");
warnMissingPluginDirective("Intersect", "intersect", "intersect");
warnMissingPluginDirective("Focus", "trap", "focus");
warnMissingPluginDirective("Mask", "mask", "mask");
function warnMissingPluginDirective(name, directiveName, slug) {
  directive(directiveName, (el) => warn(`You can't use [x-${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}
alpine_default.setEvaluator(normalEvaluator);
alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
var src_default8 = alpine_default;
var module_default8 = src_default8;

// src/js/components/DttColumn.ts
function inferDireccionAndPropietario(value = "") {
  value = value || "";
  if (!(value || "").includes(" - ") && (value || "").includes("-"))
    value = value.replace(
      /([^\s]+)\s*-\s*([^\s]+)/,
      "$1 - $2"
    );
  let valueArray = (value || "").split(" - ");
  let [
    direccion = "",
    propietario = ""
  ] = !valueArray[1] || /\d+/.test(valueArray[0]) || !/\d+/.test(valueArray[1]) ? [
    valueArray[0],
    valueArray[1]
  ] : [valueArray[1], valueArray[0]];
  return { direccion, propietario };
}
var DttColumn = class {
  constructor(options) {
    this._visible = true;
    this.input_type = "text" /* Text */;
    this.editable = true;
    const {
      name,
      data: data2,
      title,
      visible = true,
      className,
      sortable,
      render,
      width,
      targets,
      slug_name,
      input_type,
      checkbox,
      attr_type = "negocio",
      editable = true,
      is_default = false,
      ...attrs
    } = options;
    Object.entries(attrs).forEach(([attr_name, attr_value]) => {
      this[attr_name] = attr_value;
    });
    this.editable = editable;
    this.is_default = is_default;
    this.slug_name = slug_name;
    this.width = width;
    this.title = this.name = name;
    if (data2) {
      this.data = data2;
      this.field = data2;
    } else if (checkbox) {
      this.checkbox = checkbox;
    }
    this.attr_type = attr_type;
    this.title = title;
    this.visible = visible;
    this.class = this.className = className;
    this.sortable = sortable;
    this.targets = targets;
    this.input_type = input_type || "text";
    this.render = render || this.defaultRendered;
    this.formatter = (value, row) => {
      return this.render(value, null, row, null);
    };
    const key = [slug_name, attr_type].filter(Boolean).join(",");
  }
  /*set visible(visible: boolean) {
      //console.trace(this.slug_name + ' setting visible', visible)
      this._visible = visible;
  }
  get visible() {
      return this._visible;
  }*/
  defaultRendered(data2, type, row, meta) {
    return data2;
  }
  get $store() {
    return {
      columnas_actuales: Alpine.store("columnas_actuales"),
      campos_busqueda: Alpine.store("campos_busqueda"),
      negocios: Alpine.store("negocios"),
      active_filter: Alpine.store("active_filter"),
      maps: Alpine.store("maps"),
      user: Alpine.store("user")
    };
  }
};

// src/js/components/alpine.store.ts
console.zdebug = console.info.bind(
  console,
  "%cDEBUG:",
  "color:#A39;font-weight:bold;"
);
console.zsuccess = console.info.bind(
  console,
  "%cSUCCESS:",
  "color:#16a34a;font-weight:bold;"
);
console.zlog = console.log.bind(
  console,
  "%cLOG:",
  "color:#090;font-weight:bold;"
);
console.zinfo = console.info.bind(
  console,
  "%cINFO:",
  "color:#33C;font-weight:bold;"
);
console.zwarn = console.warn.bind(
  console,
  "%cWARN:",
  "color:orange;font-weight:bold;"
);
console.ztable = console.table.bind(
  console,
  "%cTABLE:",
  "color:orange;font-weight:bold;"
);
console.timeEnd = console.timeEnd.bind(
  console,
  "%ctimeEnd:",
  "color:cyan;font-weight:bold;"
);

// src/js/components/alpine_definitions/bindConsole.ts
function bindConsole(className, classNameColor) {
  if (!console.timerInfo) {
    Object.defineProperty(console, "timerInfo", {
      get: function() {
        return Function.prototype.bind.call(
          console.log,
          console,
          "%c" + Number(performance.now() / 1e3).toFixed(1) + " Timer:",
          "color:#03C;font-weight:bold;"
        );
      }
    });
  }
  return {
    ...console,
    debug: console.debug.bind(console, `%c${className}:`, "color:#A39;font-weight:bold;"),
    log: console.log.bind(console, `%c${className}:`, "color:#090;font-weight:bold;"),
    info: console.info.bind(console, `%c${className}:`, classNameColor ?? "color:#33C;font-weight:bold;"),
    warn: console.warn.bind(console, `%c${className}:`, "color:orange;font-weight:bold;"),
    error: console.error.bind(console, `%c${className}:`, "color:red;font-weight:bold;"),
    timerInfo: console.timerInfo.bind(console, `%c${className}:`, classNameColor ?? "color:#33C;font-weight:bold;")
  };
}

// src/js/components/alpine_definitions/definitions.search_types.ts
var VSearchType = /* @__PURE__ */ ((VSearchType3) => {
  VSearchType3["BETWEEN"] = "15";
  VSearchType3["GREATER_THAN"] = "5";
  VSearchType3["GREATER_THAN_OR_EQUAL"] = "7";
  VSearchType3["HAS_ATTACHMENTS"] = "23";
  VSearchType3["IN_RANGE"] = "25";
  VSearchType3["IS_AFTER"] = "18";
  VSearchType3["IS_BEFORE"] = "17";
  VSearchType3["IS_EQUAL"] = "21";
  VSearchType3["IS_NOT_EQUAL"] = "22";
  VSearchType3["IS_NOT_NULL"] = "14";
  VSearchType3["IS_NULL"] = "13";
  VSearchType3["JSON_CONTAINS"] = "19";
  VSearchType3["JSON_NOT_CONTAINS"] = "20";
  VSearchType3["LESS_THAN"] = "6";
  VSearchType3["LESS_THAN_OR_EQUAL"] = "8";
  VSearchType3["LIKE"] = "3";
  VSearchType3["NOT_BETWEEN"] = "16";
  VSearchType3["NOT_IN"] = "2";
  VSearchType3["NOT_LIKE"] = "4";
  VSearchType3["IN"] = "1";
  return VSearchType3;
})(VSearchType || {});
var VTypeSearch = Object.entries(VSearchType).reduce((a, [k, v]) => ({ ...a, [v]: k }), {});

// src/js/components/alpine_definitions/logLevel.ts
var fakeConsole = {
  ...console,
  log: (args) => {
    null;
  },
  info: (args) => {
    null;
  },
  debug: (args) => {
    null;
  },
  warn: (args) => {
    null;
  },
  error: (args) => {
    null;
  }
};

// src/js/components/hardCodedDateFields.ts
var hardCodedDateFields = [
  //{ slug_name: "created_at", attr_type: "negocio", name: "Fecha Creación" },
  {
    slug_name: "updated_at",
    attr_type: "negocio",
    name: "\xDAltima actualizaci\xF3n",
    id_input_type: "6" /* INPUT_DATE_TIME */,
    visible: false,
    readonly: true
  }
  //{ slug_name: "fecha_esperada_venta", attr_type: "negocio_attr", name: "F. Esperada venta" }
].map((item) => {
  let { slug_name, attr_type } = item;
  return {
    data: slug_name,
    field: slug_name,
    id: 0,
    related_model: null,
    readonly: 0,
    input_type: "date",
    ...item,
    key: `${slug_name},${attr_type}`,
    id_input_type: 5,
    inputType: "date",
    form_component: "dateInputComponent",
    visible: item.visible
  };
}).sort((a, b) => {
  return a.slug_name.localeCompare(b.slug_name);
});

// src/js/components/openToast.ts
function openToastRaw(options = {}) {
  if (typeof options === "string") {
    let textmsg = options;
    options = {
      type: "info",
      text: textmsg,
      delay: 2e3,
      from: null,
      description: "",
      callback: () => {
      }
    };
  }
  let {
    type = "info",
    text = "Solicitud guardada exitosamente",
    delay: delay3 = 2e3,
    from = null,
    description = "",
    callback = () => {
    }
  } = options;
  if (from)
    console.info("openToast called from " + from);
  globalThis.dispatchEvent(
    new CustomEvent("notice", {
      detail: {
        type,
        title: text,
        description,
        delay: delay3
      }
    })
  );
  if (callback) {
    setTimeout(callback, delay3);
  }
}
var openToast = module_default8.debounce(openToastRaw, 400);
globalThis.openToast = openToast;

// src/js/components/plugins/addEditableBehavior.ts
var requestAnimationPromise = globalThis.requestAnimationPromise;

// src/js/components/plugins/phoneToPrettyPhone.ts
function phoneToPrettyPhone(phone) {
  if (phone && /(\+*5*6*){0,1}([1-9])(\d{4})(\d{4})/.exec(phone.replace(
    /\s/g,
    ""
  ))) {
    let [_, code, prefix2, group1, group2] = /(\+*5*6*){0,1}([1-9])(\d{4})(\d{4})/.exec(phone.replace(
      /\s/g,
      ""
    ));
    phone = ["+56", prefix2, group1, group2].join(" ");
  }
  return phone;
}
globalThis.phoneToPrettyPhone = phoneToPrettyPhone;

// src/js/components/plugins/tap.ts
var tap = (element, callback) => {
  if (callback)
    callback(element);
  return element;
};

// src/js/components/plugins/waitFor.ts
async function waitFor2(delay3 = 500, cb = () => {
}) {
  return new Promise((res2) => {
    setTimeout(() => res2(cb), delay3);
  });
}

// ../../../negocios-panel/resources/packages/@lacasadejuana/types/src/logLevel.ts
var LogLevels = {
  ERROR: 5,
  WARN: 4,
  INFO: 3,
  DEBUG: 2,
  TRACE: 1
};
var fakeConsole2 = {
  ...console,
  log: (args) => {
    null;
  },
  info: (args) => {
    null;
  },
  debug: (args) => {
    null;
  },
  warn: (args) => {
    null;
  },
  error: (args) => {
    null;
  }
};

// src/js/components/decorators/ContactOption.ts
function processOption(option) {
  let entry = typeof option === "string" ? { name: option, value: option, id: option } : {
    //@ts-ignore
    name: option.name || option.label || option.value || option,
    //@ts-ignore
    label: option.label || option.name || option.value || option,
    //@ts-ignore
    value: option.value || option.id || option.name || option,
    //@ts-ignore
    id: option.value || option.id || option.name || option
  };
  if (typeof option === "object" && option && option.opt_group)
    entry.opt_group = option.opt_group;
  if (/^\d+$/.test(entry.id))
    entry.id = Number(entry.id);
  if (/^\d+$/.test(entry.value))
    entry.value = Number(entry.value);
  return entry;
}
function processContactOption(option) {
  const optionObject = typeof option === "string" ? { nombre_completo: option, id: option, name: option } : {
    nombre_completo: option.nombre_completo,
    id: option.id,
    email: option.email,
    name: option.nombre_completo
  };
  return optionObject;
}

// src/js/components/decorators/ErrorResponse.ts
var ErrorResponse = class extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
};

// src/js/components/alpine_definitions/OptionGroups.ts
var optgroups = [
  //{ group: 'otros', id: 'otros', name: 'Otros' },
  {
    group: "fechas_negocio",
    id: "fechas_negocio",
    name: "Fechas Negocio"
  },
  {
    group: "general",
    id: "general",
    name: "General"
  },
  {
    group: "propiedad",
    id: "propiedad",
    name: "Datos Propiedad"
  },
  {
    group: "comercial",
    id: "comercial",
    name: "Info Comercial"
  },
  {
    group: "contacto",
    id: "contacto",
    name: "Contactos Asociados"
  }
];
var defaultSlugs = [
  "id",
  "nombre",
  "tipo_negocio",
  //'id_tipo_negocio',
  "tipo_propiedad",
  //'id_tipo_propiedad',
  "etapa_negocio",
  //'id_etapa_negocio',
  "fecha_creacion",
  "fecha_actualizacion",
  "fecha_creacion_visual",
  "fechaCreacion"
];

// src/js/components/decorators/decorateCampo.ts
function decorateCampo(campo) {
  campo.id_input_type = String(campo.id_input_type);
  const {
    slug_name = "",
    attr_type,
    id_input_type,
    input_type,
    name
  } = campo;
  let { visible, width } = campo;
  if (!slug_name) {
    console.warn({ campo });
    return campo;
  }
  let group = "general";
  if (slug_name === "nombre") {
    group = "general";
  } else if (attr_type === "propiedad_attr" || slug_name.includes("direccion") || attr_type === "propiedad" || slug_name.includes("m2")) {
    group = "propiedad";
  } else if (slug_name.includes("esperada") && slug_name.includes("venta") || slug_name.includes("precio") || slug_name.includes("monto") || slug_name.includes("gasto") || slug_name.includes("contribuciones") || slug_name.includes("credito") || slug_name.includes("pago") || slug_name.includes("abono") || slug_name.includes("uf") || slug_name.includes("costo") || slug_name.includes("valor")) {
    group = "comercial";
  } else if (String(input_type).toLowerCase().includes("date") || ["5" /* INPUT_DATE */, "6" /* INPUT_DATE_TIME */].includes(id_input_type)) {
    group = "fechas_negocio";
  } else if ((attr_type || "").includes("contacto") || (input_type || "").includes("contacto")) {
    group = "contacto";
  }
  let optgroup = optgroups.find((g) => g.id === group);
  if (!optgroup)
    group = "general";
  let editable = true;
  if (campo.readonly) {
    editable = false;
  }
  let black_list = defaultSlugs;
  if (black_list.includes(slug_name)) {
    editable = false;
  }
  const key = [slug_name, attr_type].filter(Boolean).join(",");
  let data2 = campo.slug_name;
  if (campo.id_input_type === "8" /* INPUT_CHECKBOX */) {
    campo.properties = [
      { id: "NOT NULL", name: "Checked" },
      { id: "NULL", name: "Unchecked" }
    ];
  }
  let template_id;
  switch (campo.id_input_type) {
    case "1" /* INPUT_SELECT */:
    case "14" /* INPUT_RADIO_BUTTONGROUP */:
    case "12" /* INPUT_STATIC_PARAMS */:
      if ([
        "id_tipo_negocio",
        "id_tipo_propiedad",
        "id_etapa_negocio"
      ].includes(String(campo.slug_name))) {
        template_id = "#input_main_fields";
      } else {
        template_id = "#input_select";
      }
      break;
    case "10" /* INPUT_CONTACTO_ASOCIADO */:
      template_id = "#input_contacto";
      break;
    case "2" /* INPUT_TEXT */:
    case "4" /* INPUT_TEXT_AREA */:
      template_id = "#input_textarea";
      break;
    case "9" /* INPUT_SELECT_MULTIPLE */:
      template_id = "#input_multiselect";
      break;
    case "8" /* INPUT_CHECKBOX */:
      template_id = "#input_checkbox";
      break;
    case "7" /* INPUT_NUMBER */:
      if (campo.slug_name !== "id") {
        template_id = "#input_number";
      }
      break;
    case "5" /* INPUT_DATE */:
    case "6" /* INPUT_DATE_TIME */:
      if (campo.readonly) {
        template_id = "#input_readonly";
      } else {
        template_id = "#input_dates";
      }
      break;
    default:
      break;
  }
  return {
    ...campo,
    editable,
    data: data2,
    field: data2,
    key,
    group,
    template_id,
    className: [name].join(" "),
    width,
    title: campo.name
  };
}
globalThis.decorateCampo = decorateCampo;

// src/js/components/decorators/staticFetchWrapper.ts
globalThis.readCookie = (name) => {
  return ((document.cookie || "").split("; ").find((row) => row.startsWith(`${name}=`)) || "").split("=")[1];
};
globalThis.setCookie = (name, value, days = 365) => {
  var expires;
  if (days) {
    var date = /* @__PURE__ */ new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/ ; SameSite=Lax; Secure";
};
function getTokenValue() {
  let tokenMetaValue = document.querySelector('meta[name="csrf"]') && document.querySelector('meta[name="csrf"]').content;
  let jwtMetaValue = document.querySelector('meta[name="jwt"]') && document.querySelector('meta[name="jwt"]').content;
  let tokenElementValue = document.querySelector('[name="_token"]') && document.querySelector('[name="_token"]').value;
  return tokenMetaValue || tokenElementValue;
}
function getJwtValue() {
  return document.querySelector('meta[name="jwt"]') && document.querySelector('meta[name="jwt"]').content;
}
async function staticFetchWrapper(endpoint, options) {
  let tokenValue = getTokenValue();
  const sanctumToken = document.querySelector('meta[name="test_user_token"]');
  if (!tokenValue && !sanctumToken)
    console.warn(endpoint + ": no token found (attempting anyway)");
  if (globalThis.readCookie("debug_lcdj")) {
    globalThis.setCookie("x-csrf-token", document.querySelector('meta[name="csrf"]') && document.querySelector('meta[name="csrf"]').content, 1);
  }
  let headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "charset": "utf-8",
    "expect": "application/json",
    "accept": "application/json",
    ...options.headers
  };
  let jwtValue = getJwtValue();
  if (options.useJwt && jwtValue) {
    headers["Authorization"] = `Bearer ${jwtValue}`;
  } else if (sanctumToken) {
    headers["Authorization"] = `Bearer ${sanctumToken.content}`;
  } else {
    headers["X-CSRF-TOKEN"] = tokenValue;
  }
  let mergedReqInit = {
    method: options.method ?? "GET",
    headers,
    body: options.body
  };
  if (typeof options.body !== "string") {
    mergedReqInit.body = JSON.stringify(options.body);
  }
  return fetch(endpoint, mergedReqInit).then(async (res2) => {
    if (!location.href.includes("public") && !res2.ok) {
      if (res2.status == 401) {
        return location.href = "/logout";
      }
      throw new ErrorResponse(res2.statusText, res2.status);
    }
    return res2.json();
  }).catch((err) => {
    console.error(err);
    throw err;
  });
}

// src/js/components/stores/BaseClass.ts
var BaseClass = class _BaseClass {
  constructor() {
    this.className = "BaseClass";
    this.silent = false;
    this.loglevel = 3 /* INFO */;
    this.timerColor = "color:blue;font-weight:bold";
    this.classNameColor = "color:blue;font-weight:bold;";
    this.onReadyHandlers = [];
    this.eventListeners = {};
  }
  async onReady(handler4) {
    return this.once("ready", handler4);
  }
  /**
   * Handlers declared on an event that is fulfilled should be invoked inmediately
   */
  get verifiers() {
    return {
      "ready": this.ready
    };
  }
  on(event, handler4) {
    this.eventListeners[event] = this.eventListeners[event] || [];
    if (handler4) {
      return this.tap(() => {
        if (typeof handler4 !== "function") {
          this.console.warn("handler is not a function", handler4);
        }
        if (event === "ready" && this.ready || this.verifiers[event] === true)
          return handler4(this);
        this.eventListeners[event].push(handler4);
      });
    } else {
      return new Promise((res2) => {
        if (event === "ready" && this.ready || this.verifiers[event] === true)
          return res2(this);
        this.eventListeners[event].push(res2);
      });
    }
  }
  once(event, handler4) {
    this.eventListeners[event] = this.eventListeners[event] || [];
    if (handler4) {
      return this.tap(() => {
        if (typeof handler4 !== "function") {
          this.console.warn("handler is not a function", handler4);
        }
        if (event === "ready" && this.ready || this.verifiers[event] === true)
          return handler4(this);
        handler4.once = true;
        this.eventListeners[event].push(handler4);
      });
    } else {
      return new Promise((res2) => {
        if (event === "ready" && this.ready || this.verifiers[event] === true)
          return res2(this);
        res2.once = true;
        this.eventListeners[event].push(res2);
      });
    }
  }
  processEventListeners(event, callbackArgument) {
    callbackArgument = callbackArgument || this;
    if (!this.eventListeners[event] || !this.eventListeners[event].length)
      return;
    let onceHandlers = this.eventListeners[event].filter((h) => h.once), otherHandlers = this.eventListeners[event].filter((h) => !h.once);
    this.eventListeners[event] = otherHandlers;
    if (onceHandlers.length) {
      this.marquee(" firing " + onceHandlers.length + " onceHandlers for " + event + " event ");
      while (onceHandlers.length) {
        let onceHandler = onceHandlers.shift();
        if (typeof onceHandler !== "function")
          continue;
        try {
          requestAnimationFrame(() => onceHandler(callbackArgument));
        } catch (e) {
          console.error("error in onceHandler", e);
        }
      }
    }
    if (otherHandlers.length) {
      this.marquee(" firing " + otherHandlers.length + " regular handlers for " + event + " event ");
      otherHandlers.forEach((cb) => requestAnimationFrame(() => cb(callbackArgument)));
    }
    this.marquee(" done firing " + event + " event ");
  }
  processEventListenersAlt(event, callbackArgument) {
    callbackArgument = callbackArgument || this;
    if (!this.eventListeners[event] || !this.eventListeners[event].length)
      return;
    let onceHandlers = this.eventListeners[event].filter((h) => h.once), otherHandlers = this.eventListeners[event].filter((h) => !h.once);
    this.marquee(" firing " + onceHandlers.length + " onceHandlers for " + event + " event ");
    while (onceHandlers.length) {
      let onceHandler = onceHandlers.shift();
      requestAnimationFrame(() => onceHandler(callbackArgument));
    }
    this.marquee(" firing " + otherHandlers.length + " regular handlers for " + event + " event ");
    otherHandlers.forEach((cb) => requestAnimationFrame(() => cb(callbackArgument)));
    this.eventListeners[event] = otherHandlers;
  }
  processHandler(handler4) {
    if (typeof handler4 === "function") {
      handler4(this);
    }
    requestAnimationFrame(() => this.processEventListeners("ready", this));
  }
  marquee(message, ...args) {
    console.marquee({
      [Number(performance.now() / 1e3).toFixed(1)]: this.timerColor,
      [String(this.constructor.name)]: this.classNameColor,
      [message]: ""
      //@ts-ignore
    }, ...args);
  }
  get console() {
    return this.silent ? fakeConsole2 : this._console;
  }
  debug(...arg) {
    this.loglevel >= LogLevels.DEBUG && this.console.debug(...arg);
  }
  log(...arg) {
    this.loglevel >= LogLevels.INFO && this.console.log(...arg);
  }
  error(...arg) {
    this.loglevel >= LogLevels.ERROR && this.console.error(...arg);
  }
  warn(...arg) {
    this.loglevel >= LogLevels.WARN && this.console.warn(...arg);
  }
  info(...arg) {
    this.loglevel >= LogLevels.INFO && this.console.info(...arg);
  }
  init() {
    this.console.log("init");
  }
  get $store() {
    return {
      tipos_busqueda: Alpine.store("tipos_busqueda"),
      columnas_actuales: Alpine.store("columnas_actuales"),
      campos_busqueda: Alpine.store("campos_busqueda"),
      negocios: Alpine.store("negocios"),
      roles_negocio: Alpine.store("roles_negocio"),
      active_filter: Alpine.store("active_filter"),
      maps: Alpine.store("maps"),
      user: Alpine.store("user")
    };
  }
  tap(handler4) {
    if (typeof handler4 !== "function") {
      console.warn("handler is not a function", { handler: handler4 });
      return this;
    }
    return tap(this, handler4);
  }
  /**
   * Boilerplate for generic json fetch. Won't work with other content types.
   * @param endpoint 
   * @param options 
   * @returns 
   */
  fetchWrapper(endpoint, options) {
    return _BaseClass.staticFetchWrapper(endpoint, options);
  }
  static staticFetchWrapper(endpoint, options) {
    return staticFetchWrapper(endpoint, options);
  }
};
Object.defineProperty(BaseClass.prototype, "init", { enumerable: true });

// src/js/components/entities/NegocioColumn.ts
var NegocioColumn = class extends DttColumn {
  constructor(options) {
    super(options);
    this.id_input_type = options.id_input_type;
    this.attr_type = options.attr_type;
    this.properties = options.properties;
    if (this.id_input_type === "8" /* INPUT_CHECKBOX */) {
      this.properties = [
        { id: "NOT NULL", name: "Checked" },
        { id: "NULL", name: "Unchecked" }
      ];
    }
    if (this.slug_name === "dias-publicado")
      this.name = "D\xEDas Publicado";
    this.populateOptions();
    this.inferTemplateId();
    this.group = assignGroup(this);
    this.editable = !this.readonly && !defaultSlugs.includes(this.slug_name);
    this.key = [this.slug_name, this.attr_type].filter(Boolean).join(",");
    this.data = this.slug_name;
    this.field = this.slug_name;
    this.folder_slug = options.folder_slug;
  }
  populateOptions() {
    if (this.properties && Array.isArray(this.properties)) {
      this.optionMap = new Map(this.options.map((o) => [o.id, o.name]));
    }
  }
  get options() {
    if (!this.properties || !Array.isArray(this.properties))
      return [];
    return this.id_input_type == "10" /* INPUT_CONTACTO_ASOCIADO */ ? Object.values(this.properties).map(processContactOption) : Object.values(this.properties).map(processOption);
  }
  get componentName() {
    return `inputs.${this.form_component}`;
  }
  get inputName() {
    return null !== this.attr_type ? `${this.attr_type}-${this.slug_name}` : this.slug_name;
  }
  get filesInputName() {
    return this.attachesFiles ? this.inputName + "-files" : null;
  }
  inferTemplateId() {
    switch (this.id_input_type) {
      case "1" /* INPUT_SELECT */:
      case "14" /* INPUT_RADIO_BUTTONGROUP */:
      case "12" /* INPUT_STATIC_PARAMS */:
        if (String(this.slug_name) === "id_etapa_negocio") {
          this.template_id = "#input_etapa_negocio";
        } else if ([
          "id_tipo_negocio",
          "id_tipo_propiedad"
        ].includes(String(this.slug_name))) {
          this.template_id = "#input_main_fields";
        } else {
          this.template_id = "#input_select";
        }
        break;
      case "10" /* INPUT_CONTACTO_ASOCIADO */:
        this.template_id = "#input_contacto";
        break;
      case "2" /* INPUT_TEXT */:
      case "4" /* INPUT_TEXT_AREA */:
        this.template_id = "#input_textarea";
        break;
      case "9" /* INPUT_SELECT_MULTIPLE */:
        this.template_id = "#input_multiselect";
        break;
      case "8" /* INPUT_CHECKBOX */:
        this.template_id = "#input_checkbox";
        break;
      case "7" /* INPUT_NUMBER */:
        if (this.slug_name !== "id") {
          this.template_id = "#input_number";
        }
        break;
      case "5" /* INPUT_DATE */:
      case "6" /* INPUT_DATE_TIME */:
        if (this.readonly) {
          this.template_id = "#input_readonly";
        } else {
          this.template_id = "#input_dates";
        }
        break;
      default:
        break;
    }
  }
  getShownValue(negocio) {
    if (typeof negocio === "number")
      negocio = this.$store.negocios.get(negocio);
    negocio = negocio || { _extra_props: {} };
    let baseline = negocio[this.slug_name] || (negocio._extra_props || {})[this.slug_name] || "";
    if (this.isSelectOrRadioButtonGroup || this.isContact) {
      if (!this.optionMap) {
        console.warn("Campo select sin opciones", this);
        return baseline;
      }
      return this.optionMap.get(negocio[this.slug_name] || "") || this.optionMap.get(String(negocio[this.slug_name]) || "") || this.optionMap.get(Number(negocio[this.slug_name]) || "") || "";
    }
    if (this.isMultiSelectField) {
      let value = negocio[this.slug_name] || [];
      return Array.isArray(value) ? value.map((id) => this.optionMap.get(id) || "").join(", ") : value;
    }
    if (typeof negocio[this.slug_name] === "string") {
      return baseline.replace("[null]", "").replace("null", "");
    }
    return baseline;
  }
  get attachesFiles() {
    return !!this.attach_files;
  }
  get isMultiSelectField() {
    return "9" /* INPUT_SELECT_MULTIPLE */ === String(this.id_input_type);
  }
  get isDateOrDatetimeField() {
    return "5" /* INPUT_DATE */ === String(this.id_input_type) || "6" /* INPUT_DATE_TIME */ === String(this.id_input_type);
  }
  get isTextOrTextArea() {
    return "2" /* INPUT_TEXT */ === String(this.id_input_type) || "4" /* INPUT_TEXT_AREA */ === String(this.id_input_type);
  }
  get isSelectOrRadioButtonGroup() {
    return "12" /* INPUT_STATIC_PARAMS */ === String(this.id_input_type) || "14" /* INPUT_RADIO_BUTTONGROUP */ === String(this.id_input_type) || "1" /* INPUT_SELECT */ === String(this.id_input_type);
  }
  get isCheckbox() {
    return "8" /* INPUT_CHECKBOX */ === String(this.id_input_type);
  }
  get isNumber() {
    return "7" /* INPUT_NUMBER */ === String(this.id_input_type);
  }
  get isContact() {
    return "10" /* INPUT_CONTACTO_ASOCIADO */ === String(this.id_input_type);
  }
};
function assignGroup(column) {
  let { slug_name, attr_type, input_type, id_input_type } = column;
  let group = "general";
  if (slug_name === "nombre") {
    group = "general";
  } else if (attr_type === "propiedad_attr" || slug_name.includes("direccion") || attr_type === "propiedad" || slug_name.includes("m2")) {
    group = "propiedad";
  } else if (slug_name.includes("esperada") && slug_name.includes("venta") || slug_name.includes("precio") || slug_name.includes("monto") || slug_name.includes("gasto") || slug_name.includes("contribuciones") || slug_name.includes("credito") || slug_name.includes("pago") || slug_name.includes("abono") || slug_name.includes("uf") || slug_name.includes("costo") || slug_name.includes("valor")) {
    group = "comercial";
  } else if (String(input_type).toLowerCase().includes("date") || ["5" /* INPUT_DATE */, "6" /* INPUT_DATE_TIME */].includes(id_input_type)) {
    group = "fechas_negocio";
  } else if ((attr_type || "").includes("contacto") || (input_type || "").includes("contacto")) {
    group = "contacto";
  }
  let optgroup = optgroups.find((g) => g.id === group);
  if (!optgroup)
    group = "general";
  return group;
}

// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

// node_modules/uuid/dist/esm-browser/native.js
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native_default = {
  randomUUID
};

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/js/components/stores/CamposBusquedaStore.ts
var CamposBusquedaStore = class extends BaseClass {
  constructor() {
    super();
    this.className = "CamposBusquedaStore";
    this.silent = false;
    this.loglevel = 4 /* WARN */;
    this.id = v4_default();
    this.properties = [];
    this.fieldMap = /* @__PURE__ */ new Map();
    this.timerColor = "color:blue;font-weight:bold";
    this.classNameColor = "color:purple;font-weight:bold;";
    this.fetching_light_list = false;
    this.ready = false;
    this.classNameColor = "color:purple;font-weight:bold;";
    this._console = bindConsole(this.className, this.classNameColor);
    this.init();
  }
  init() {
    this.marquee(" init ");
    this.lightList = new Promise((res2) => {
    });
  }
  get columnDefs() {
    return this.properties;
  }
  set columnDefs(campos_busqueda) {
    this.properties = campos_busqueda;
  }
  reloadCampos(campos_busqueda, reset = false) {
    if (!campos_busqueda || campos_busqueda.length === 0)
      return;
    if (this.ready)
      return;
    this.properties = Object.values(campos_busqueda).filter((c) => c.slug_name).map((c) => new NegocioColumn(decorateCampo(c))).map((c) => {
      if (defaultSlugs.includes(c.slug_name)) {
        c.readonly = true;
        c.is_default = true;
      }
      this.fieldMap.set(c.slug_name, c);
      return c;
    });
    if (!this.ready) {
      this.ready = true;
      this.marquee(" finished proccesing columnDefs ");
      requestAnimationFrame(() => this.processEventListeners("ready", this));
    }
    return this.properties;
  }
  async fetchLightNegocios() {
    if (this.fetching_light_list)
      return this.lightList;
    this.fetching_light_list = true;
    return staticFetchWrapper("/api/negocios/light_list", {}).then(async (res2) => {
      const jsonRes = tap(await res2, (lightList) => {
        this.find("codigo_interno").properties = Object.values(lightList).filter((option) => option.codigo_interno && String(option.codigo_interno).length === 6).map((option) => {
          return {
            id: option.codigo_interno,
            value: option.codigo_interno,
            label: `${option.codigo_interno}|${option.nombre}`,
            name: `${option.codigo_interno}|${option.nombre}`
          };
        });
        this.find("id").properties = Object.values(lightList).filter((option) => option.id).map((option) => {
          return {
            value: option.id,
            name: `#${option.id}|${option.nombre}`
          };
        });
      });
      return jsonRes.map((row) => {
        let { direccion, propietario } = inferDireccionAndPropietario(row.nombre);
        return { id: row.id, direccion, propietario };
      });
    });
  }
  findMany(cols) {
    return cols.filter((c) => c).map((c) => {
      let col = this.find(c.slug_name || c) || { slug_name: c.slug_name || c, visible: true };
      col.visible = typeof c === "object" ? c.visible ?? true : col.visible;
      return col;
    }).filter((c) => c);
  }
  getMany(ids) {
    return ids.filter((c) => c).map((c) => {
      let col = this.get(c.id || c) || { id: typeof c === "object" ? c.id : c, visible: true };
      col.visible = typeof c === "object" ? c.visible ?? true : col.visible;
      return col;
    }).filter((c) => c);
  }
  computeOptions(campo_busqueda) {
    const campo = this.find(campo_busqueda.split(",")[0]) || { id_input_type: "2" /* INPUT_TEXT */ };
    if (!campo || campo.id_input_type === "1" /* INPUT_SELECT */ && campo.properties === null) {
      console.warn("Campo select sin opciones", campo);
      return [];
    }
    return campo.options;
  }
  getShownValue(negocio, slug_name) {
    const item = this.find(slug_name);
    if (typeof negocio === "number")
      negocio = this.$store.negocios.get(negocio);
    if (item)
      return item.getShownValue(negocio);
    negocio = negocio || {};
    let baseline = negocio[slug_name] || "";
    if (negocio._extra_props) {
      baseline = (negocio[slug_name] ?? negocio._extra_props[slug_name]) || "";
    }
    if (!item) {
      return baseline;
    }
    if (this.isSelectOrRadioButtonGroup(item.id_input_type) || this.isContact(item.id_input_type)) {
      if (!item.optionMap) {
        console.warn("Campo select sin opciones", item);
        return baseline;
      }
      return item.optionMap.get(baseline || "") || item.optionMap.get(baseline || "") || "";
    }
    if (this.isMultiSelectField(item.id_input_type)) {
      let value = negocio[slug_name] || [];
      return Array.isArray(value) ? value.map((id) => item.optionMap.get(id) || "").join(", ") : value;
    }
    if (typeof baseline === "string") {
      return baseline.replace("[null]", "");
    }
    return baseline;
  }
  /**
   * Slug name should be only the clean nombre of the field,
   * but this method cleans the postfix in case it was passed a
   * filter campo de busqueda
   * 
   * @param {string} slug_name 
   * @returns 
   */
  find(slug_name) {
    let exact_match = this.fieldMap.get(slug_name.replace(/^([^,]+),?.*$/, "$1"));
    if (exact_match)
      return exact_match;
    if (slug_name.endsWith("*"))
      return this.properties.find((prop) => prop.slug_name.startsWith(slug_name.replace("*", "")));
    if (slug_name.startsWith("*"))
      return this.properties.find((prop) => prop.slug_name.endsWith(slug_name.replace("*", "")));
    return this.properties.find((prop) => prop.slug_name.includes(slug_name.replaceAll("*", "")));
  }
  has(slug_name) {
    return this.fieldMap.has(slug_name);
  }
  get(id) {
    return this.properties.find((c) => c.id == id);
  }
  get contactos_asociados_fields() {
    return Object.values(this.properties).filter(
      (c) => [
        "10" /* INPUT_CONTACTO_ASOCIADO */
      ].includes(c.id_input_type)
    ).filter(
      (field) => field.group === "contacto"
    );
  }
  get slugs_no_seleccionables() {
    return this.no_seleccionables.map((c) => c.slug_name);
  }
  get columnas_seleccionables() {
    return Object.values(this.properties).filter(
      (campo) => !this.slugs_no_seleccionables.includes(campo.slug_name)
    );
  }
  get all_selectable_fields() {
    return Object.values(this.properties).filter((c) => [
      "1" /* INPUT_SELECT */,
      "2" /* INPUT_TEXT */,
      "4" /* INPUT_TEXT_AREA */,
      "7" /* INPUT_NUMBER */,
      "14" /* INPUT_RADIO_BUTTONGROUP */,
      "12" /* INPUT_STATIC_PARAMS */,
      "8" /* INPUT_CHECKBOX */,
      "12" /* INPUT_STATIC_PARAMS */,
      "5" /* INPUT_DATE */,
      "6" /* INPUT_DATE_TIME */,
      "9" /* INPUT_SELECT_MULTIPLE */
    ].includes(c.id_input_type)).concat(this.contactos_asociados_fields);
  }
  isMultiSelectField(id_input_type) {
    return "9" /* INPUT_SELECT_MULTIPLE */ === String(id_input_type);
  }
  isDateOrDatetimeField(id_input_type) {
    return "5" /* INPUT_DATE */ === String(id_input_type) || "6" /* INPUT_DATE_TIME */ === String(id_input_type);
  }
  isTextOrTextArea(id_input_type) {
    return "2" /* INPUT_TEXT */ === String(id_input_type) || "4" /* INPUT_TEXT_AREA */ === String(id_input_type);
  }
  isSelectOrRadioButtonGroup(id_input_type) {
    return "12" /* INPUT_STATIC_PARAMS */ === String(id_input_type) || "14" /* INPUT_RADIO_BUTTONGROUP */ === String(id_input_type) || "1" /* INPUT_SELECT */ === String(id_input_type);
  }
  isCheckbox(id_input_type) {
    return "8" /* INPUT_CHECKBOX */ === String(id_input_type);
  }
  isNumber(id_input_type) {
    return "7" /* INPUT_NUMBER */ === String(id_input_type);
  }
  isContact(id_input_type) {
    return "10" /* INPUT_CONTACTO_ASOCIADO */ === String(id_input_type);
  }
  get optgroups() {
    return optgroups;
  }
  get no_seleccionables() {
    return this.properties.filter((c) => [
      "nombre",
      "id_tipo_negocio",
      "id_tipo_propiedad",
      "id_etapa_negocio",
      "fecha_creacion",
      "fechaCreacion",
      "fecha_creacion_visual"
    ].concat(this.defaultSlugs).includes(c.slug_name));
  }
  get defaultSlugs() {
    return defaultSlugs;
  }
  printTable(ids) {
    ids = ids.map((id) => id.id || id);
    console.log("buscando", ids.toString());
    let campos = ids.map((id) => this.get(id));
    console.table(campos, ["id", "slug_name", "visible"]);
  }
  /**
   * @todo why stringify and parse?
   */
  get readOnly() {
    return JSON.parse(JSON.stringify(Object.values(this.properties))).filter((c) => c.readonly).map((c) => c.slug_name).concat(this.defaultSlugs);
  }
};
Object.defineProperty(CamposBusquedaStore.prototype, "init", { enumerable: true });

// src/js/components/stores/ColumnasActualesStore.ts
var ColumnasActualesStore = class extends CamposBusquedaStore {
  constructor() {
    super();
    this.className = "ColumnasActualesStore";
    this.id = v4_default();
    this.timerColor = "color:emerald;font-weight:bold";
    this.classNameColor = "color:darkcyan;font-weight:bold;";
    this.ready = false;
    this.classNameColor = "color:darkcyan;font-weight:bold;";
    this.timerColor = "color:emerald;font-weight:bold;";
    this._console = bindConsole(this.className, this.classNameColor);
    this.previouslyInvisible = ["id", "fecha_creacion_visual", "fechaCreacion"];
  }
  init() {
    this.marquee(" init store " + this.classNameColor);
  }
  get columnDefs() {
    return this.properties;
  }
  set columnDefs(campos_busqueda) {
    this.properties = campos_busqueda;
  }
  async setDefaultColumns(default_columns) {
    this.default_columns = Array.from(new Set(default_columns));
    return this;
  }
  get active_filter() {
    return Alpine.store("active_filter");
  }
  get columnVisibility() {
    return this.columnDefs.reduce((acc, col) => {
      acc[col.slug_name] = !!col.visible;
      return acc;
    }, {});
  }
  get sortedColumnDefs() {
    return this.columnDefs.slice(0).sort((a, b) => Number(a.position ?? 19) - Number(b.position ?? 19));
  }
  reloadCampos(columnas_visibles, reset = false) {
    if (columnas_visibles.length === 0)
      return this.columnDefs;
    this.columnas_visibles = Array.from(new Set(columnas_visibles.filter((c) => !defaultSlugs.includes(c.slug_name))));
    let visible_slugs = this.columnas_visibles.map((c) => c.slug_name), default_slugs = this.default_columns.map((c) => c.slug_name);
    let properties = this.$store.campos_busqueda.findMany(Array.from(new Set(default_slugs.filter((c) => !visible_slugs.includes(c)).concat(visible_slugs))));
    this.properties = (this.default_columns || []).filter((c) => !visible_slugs.includes(c.slug_name)).map((c, index) => {
      c.is_default = true;
      c.position = index;
      if (["created_at", "fechaCreacion", "fecha_creacion_visual"].includes(c.slug_name))
        c.position = 3 + index;
      return c;
    }).concat(
      this.columnas_visibles.map((c, index) => {
        c.position = index + this.default_columns.length;
        return c;
      })
    ).sort((a, b) => {
      return a.position - b.position;
    });
    this.properties = this.properties.map((col, index) => {
      let dttCol = this.campos_busqueda.find(col.slug_name) ?? new NegocioColumn(decorateCampo(col));
      if (default_slugs.includes(dttCol.slug_name))
        dttCol.is_default = true;
      if (col.visible !== void 0) {
        if (["created_at", "fechaCreacion", "fecha_creacion_visual"].includes(dttCol.slug_name))
          col.visible = false;
        dttCol.visible = col.visible;
      }
      if (!this.active_filter || !this.active_filter.columnas_actuales)
        return dttCol;
      let colFiltro = this.active_filter.columnas_actuales.find((c) => c.id == dttCol.id);
      if (colFiltro) {
        dttCol.visible = colFiltro.visible;
      }
      if (["created_at", "fechaCreacion", "fecha_creacion_visual"].includes(dttCol.slug_name))
        dttCol.visible = false;
      return dttCol;
    });
    this.properties.sort((a, b) => {
      return a.position - b.position;
    });
    if (!reset)
      this.properties.forEach((c) => {
        c.visible = !this.previouslyInvisible.includes(c.slug_name);
        let col = this.campos_busqueda.find(c.slug_name);
        if (col)
          col.visible = c.visible;
        if (["created_at", "fechaCreacion", "fecha_creacion_visual"].includes(c.slug_name))
          c.visible = false;
      });
    if (!this.ready) {
      this.ready = true;
      this.once("ready", () => {
        this.syncWithActiveFilter();
        this.marquee(" Finished processings columnas_visibles definition ");
      });
      this.processEventListeners("ready", this);
    } else {
      this.processEventListeners("columns_updated", this);
    }
    return this.properties;
  }
  get visible_slugs() {
    return this.columnDefs.filter((c) => c.visible).map((c) => c.slug_name);
  }
  /**
   * @todo since ActiveFilterStore is actually empty the first time this method is called, 
   * perhaps the synchronization should happen in the other direction
   */
  syncWithActiveFilter() {
    Promise.all([
      this.once("ready"),
      this.active_filter.once("ready")
    ]).then(() => {
      this.properties = (this.properties || []).map((col) => {
        if (!this.active_filter || !this.active_filter.columnas_actuales)
          return col;
        let colFiltro = this.active_filter.columnas_actuales.find((c) => c.id == col.id);
        if (colFiltro) {
          col.visible = colFiltro.visible;
        }
        if (["created_at", "fechaCreacion", "fecha_creacion_visual"].includes(col.slug_name))
          col.visible = false;
        return col;
      });
      this.processEventListeners("columns_updated", this);
    });
  }
  get campos_busqueda() {
    return Alpine.store("campos_busqueda");
  }
  get defaultSlugs() {
    return this.default_columns.map((c) => c.slug_name).concat(defaultSlugs);
  }
  get campos_del_filtro() {
    const discard_default_slugs = this.default_columns.map((c) => c.slug_name);
    return this.columnDefs.filter((item) => !discard_default_slugs.includes(item.slug_name));
  }
  setAllFieldsOn(except = ["id"]) {
    this.properties.filter((c) => !except.includes(c.slug_name)).forEach((c) => c.visible = true);
  }
  setAllFieldsOff() {
    this.properties.forEach((c) => c.visible = false);
  }
  printTable() {
    console.table(this.properties, ["id", "slug_name", "position", "visible", "editable", "is_default"]);
  }
  refreshInvisibles() {
    this.previouslyInvisible = this.properties.filter((c) => !c.visible).map((c) => c.slug_name);
    return this;
  }
  /**
   * @returns {Array<string>} the list of slugs for the current set of columns
   */
  get currentSlugs() {
    return [...(this.columnDefs || []).map((c) => c.slug_name)];
  }
  isDefaultField(slug_name) {
    return this.defaultSlugs.includes(slug_name);
  }
  /**
   * Non default columns as provided by the backend
   */
  get column_groups() {
    return Alpine.store("campos_busqueda").optgroups.map((group) => {
      return {
        ...group,
        group_options: this.columnDefs.filter((p) => p.group === group.id)
      };
    });
  }
  isVisible(slug_name) {
    let property = this.find(slug_name) || { visible: void 0 };
    return property.visible;
  }
  /**
  * Slug name should be only the clean nombre of the field,
  * but this method cleans the postfix in case it was passed a
  * filter campo de busqueda
  * 
  * @param {string} slug_name 
  * @returns 
  */
  find(slug_name) {
    slug_name = slug_name.replace(/^([^,]+),?.*$/, "$1");
    return this.columnDefs.find((c) => c.slug_name === slug_name) || {};
  }
  get(id) {
    return this.columnDefs.find((c) => c.id == id);
  }
  has(slug_name) {
    return this.columnDefs.find((c) => c.slug_name === slug_name) !== void 0;
  }
  toggle(slug_name) {
    let current_column = this.find(slug_name);
    current_column.visible = !current_column.visible;
    let col = this.campos_busqueda.find(slug_name);
    col.visible = current_column.visible;
  }
  at(index = 0) {
    return this.columnDefs[index];
  }
  get columnIds() {
    return this.columnDefs.map((c) => c.id);
  }
  async moveColumn(oldIndex, newIndex) {
    this.refreshInvisibles();
    this.columnDefs.forEach((c) => c.visible = false);
    let moved = this.columnDefs.splice(oldIndex, 1)[0];
    console.info(
      `%c se ha movido %c${moved.slug_name} %c hasta despu\xE9s de %c ${(this.columnDefs[newIndex - 1] || { name: "el final" }).slug_name}`,
      "",
      "color:#336699;background-color:#fff;font-weight:bold;",
      "",
      `color:#0a0;font-weight:bold;`
    );
    waitFor2(100);
    this.columnDefs.splice(newIndex, 0, moved);
    this.columnDefs.forEach((c) => {
      c.visible = !this.previouslyInvisible.includes(c.slug_name);
    });
  }
  /**
   * Fields admisible to be shown in the map view info window
   */
  get featureProperties() {
    return this.columnDefs.filter(
      (c) => c.id_input_type !== "8" /* INPUT_CHECKBOX */ && c.id_input_type !== "9" /* INPUT_SELECT_MULTIPLE */
    ).reduce((accum, campo) => {
      accum[campo.slug_name.replace(
        "fecha_creacion_visual",
        "created_at"
      )] = (campo.name || "").replace(/^F\.\s/, "Fecha ");
      return accum;
    }, {});
  }
};
function columnas_actuales() {
  return new ColumnasActualesStore();
}

// src/js/components/entities/DummyNegocio.ts
var DummyNegocio = class extends BaseClass {
  constructor(negocio, slugs = []) {
    super();
    this.className = "DummyNegocio";
    this.savingPromise = null;
    this.initial = /* @__PURE__ */ new Map();
    this.savingMessage = "";
    this.slugs = slugs || Object.keys(negocio);
    this.id = negocio.id;
    this.tipo_negocio = negocio.tipo_negocio;
    this.tipo_propiedad = negocio.tipo_propiedad;
    this.etapa_negocio = negocio.etapa_negocio;
    this.id_tipo_negocio = negocio.id_tipo_negocio;
    this.id_tipo_propiedad = negocio.id_tipo_propiedad;
    this.id_etapa_negocio = negocio.id_etapa_negocio;
    this.searchstring = negocio.searchstring;
    this.thumbnail = negocio.thumbnail;
    this.timestamp = Number(new Date(negocio.timestamp).getTime() / 1e3).toFixed(0);
    this.fecha_creacion_visual = String(negocio.fecha_creacion_visual ?? (this.fechaCreacion ?? (negocio.created_at ?? (negocio._extra_props || {}).created_at)));
    this.fecha_creacion_visual = this.fechaCreacion = this.fecha_creacion = this.created_at = this.fecha_creacion_visual.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1");
    let { propietario, direccion } = inferDireccionAndPropietario(negocio.nombre);
    this.propietario = propietario;
    this.address = direccion;
    this._negocio = negocio;
    this.controls = /* @__PURE__ */ new Map();
    let negocioNormalized = negocio;
    if (slugs) {
      negocioNormalized = slugs ? slugs.reduce((accum, slug_name) => {
        accum[slug_name] = negocio[slug_name];
        this[slug_name] = negocio[slug_name];
        return accum;
      }, {}) : negocio;
    }
    this.initial = new Map(Object.entries(negocioNormalized));
    this._extra_props = Object.keys(negocio).filter((key) => !Object.keys(negocioNormalized).includes(key)).reduce((accum, key) => {
      accum[key] = negocio[key];
      return accum;
    }, {});
  }
  populateFromAddress() {
    this.direccion = this.direccion || this.address;
  }
  match(criteria) {
    return Object.entries(criteria).every(([key, value]) => {
      return this[key] === value;
    });
  }
  get(slug_name) {
    return this[slug_name];
  }
  getWithExtra(slug_name) {
    return this[slug_name] || this._extra_props[slug_name];
  }
  get changes() {
    let dirty = {};
    for (let [slug_name, value] of this.initial) {
      let current = typeof this[slug_name] === "string" && String(this[slug_name]).trim() === "" ? null : this[slug_name];
      if (value != current) {
        dirty[slug_name] = this[slug_name];
      }
    }
    return dirty;
  }
  printChanges() {
    let changes = [];
    for (let [slug_name, value] of this.initial) {
      let current = typeof this[slug_name] === "string" && String(this[slug_name]).trim() === "" ? null : this[slug_name];
      if (value != current) {
        changes.push({ slug_name, initial: value, current });
      }
    }
    console.table(changes);
  }
  get saveable_properties() {
    let { nombre, id, fechaCreacion, lat, lng, id_etapa_negocio, fecha_creacion_visual, ...properties } = this.slugs.reduce((accum, slug) => {
      accum[slug] = this[slug];
      return accum;
    }, {});
    return properties;
  }
  get editable_inputs() {
    return this.$store.columnas_actuales.columnDefs.filter((c) => c.editable && Object.keys(this.saveable_properties).includes(c.slug_name));
  }
  get negocio() {
    return this;
  }
  set negocio(value) {
    console.log("set negocio", value);
    throw new Error("No se puede modificar el negocio");
  }
  toJSON() {
    return this.negocio;
  }
  shown_value(slug_name) {
    return this.$store.campos_busqueda.getShownValue(this, slug_name);
  }
  set(slug_name, value, verbose = true) {
    if (verbose) {
      console.trace("Setting", slug_name, "to", value);
    } else {
      console.log("Setting", slug_name, "to", value);
    }
    this[slug_name] = value;
    return this;
  }
  init() {
  }
  toFeature() {
    throw new Error("not implemented");
  }
  async validateInputs({ property }) {
    let currentValue = this[property];
    let campo = this.$store.columnas_actuales.find(property);
    if (!campo)
      return Promise.reject(new Error("no se encontr\xF3 el campo:" + property));
    let canBeEdited = campo.editable || this.$store.columnas_actuales.isContact(campo.id_input_type) && currentValue === null;
    if (!canBeEdited) {
      console.warn(campo);
      return Promise.reject(new Error("Propiedad no editable: " + property));
    }
    let prefixed_property = [campo.attr_type, property].join(".");
    return { prefixed_property };
  }
  async setProperty(property, value) {
    throw new Error("not implemented");
  }
  syncInitialValues() {
    return this.$store.columnas_actuales.columnDefs.filter((c) => c.editable && !c.readonly && Object.keys(this.saveable_properties).includes(c.slug_name)).map((c) => c.slug_name).reduce((accum, slug_name) => {
      let property_sample = this.$store.negocios.checked.map((n) => n[slug_name]);
      let property_set = new Set(property_sample);
      if (property_set.size === 1) {
        accum[slug_name] = property_sample[0];
        this.set(slug_name, property_sample[0], false);
        this.initial.set(slug_name, property_sample[0]);
      } else {
        this.set(slug_name, null, false);
        this.initial.set(slug_name, null);
      }
      return accum;
    }, {});
  }
  get modalTitle() {
    return this.savingMessage ? this.savingMessage : `Editando ${this.$store.negocios.checked.length} negocios`;
  }
  async save(mock = false) {
    if (Object.keys(this.changes).length === 0 && !mock) {
      console.log("no hay cambios");
      return;
    }
    if (this.changes.id_etapa_negocio)
      return globalThis.cambio_etapa_check({ id: this.id, id_etapa_negocio: this.changes.id_etapa_negocio });
    let changes = await Object.entries(this.changes).reduce(async (accum, [property, value]) => {
      accum = await accum;
      let campo = this.$store.columnas_actuales.find(property);
      if (!campo)
        return accum;
      let prefixed_property = [campo.attr_type, property].join(".");
      accum[prefixed_property] = value;
      return accum;
    }, {});
    console.zinfo("changes", changes);
    let totalChecked = this.$store.negocios.checked.length, saved = 0;
    for (let negocio of this.$store.negocios.checked) {
      Object.entries(this.changes).forEach(([property, value]) => {
        if (/^\d+$/.test(String(value)))
          value = Number(value);
        negocio[property] = value;
        console.log("set", property, value);
      });
      await waitFor2(1e3);
      this.savingMessage = `Guardando negocio ${saved++} de ${totalChecked}`;
      console.log(this.savingMessage, this.modalTitle);
      await negocio.save().catch((err) => {
        console.warn(err);
      }).finally(() => {
        negocio.checked = false;
      });
    }
    this.savingMessage = "";
    Object.entries(this.changes).forEach(([property, value]) => {
      this[property] = this.initial[property];
    });
    return;
  }
};

// src/js/components/entities/Negocio.ts
var Negocio = class extends DummyNegocio {
  constructor(negocio, slugs = []) {
    super(negocio, slugs);
    this.className = "Negocio";
    this.savingPromise = null;
    this.initial = /* @__PURE__ */ new Map();
    this._checked = false;
    let negocioNormalized = negocio;
    if (slugs) {
      negocioNormalized = slugs ? slugs.reduce((accum, slug_name) => {
        accum[slug_name] = negocio[slug_name];
        this[slug_name] = negocio[slug_name];
        return accum;
      }, {}) : negocio;
      this.searchstring = this.computeSearchString(negocioNormalized);
    }
    if (this._extra_props.created_at) {
      negocioNormalized.created_at = negocioNormalized.fechaCreacion = negocioNormalized.fecha_creacion_visual = String(this._extra_props.created_at).replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1");
    }
    this.initial = new Map(Object.entries(negocioNormalized));
  }
  get checked() {
    return this._checked;
  }
  set checked(checked) {
    if (checked === this._checked)
      return;
    this._checked = checked;
    if (!checked)
      globalThis.alpineBsTable.bsTable.bootstrapTable("uncheckBy", {
        field: "id",
        values: [this.id]
      });
  }
  computeSearchString(negocioNormalized) {
    return this.slugs.reduce(
      (accum, slug) => accum + " " + Alpine.store("campos_busqueda").getShownValue(negocioNormalized, slug),
      ""
    ).normalize("NFD").replace(/\n+/, " ").replace(/\s+/g, " ").replace(/\p{Diacritic}/gu, "").toLowerCase();
  }
  get latitud() {
    return this.lat || this._extra_props.lat;
  }
  get longitud() {
    return this.lng || this._extra_props.lng;
  }
  toFeature() {
    const merged_props = { ...this, ...this._extra_props };
    let {
      //searchstring,
      nombre,
      id,
      ...props
    } = merged_props;
    let geometry = {
      type: "Point",
      coordinates: [this.longitud, this.latitud]
    };
    let propertyKeys = Object.keys(
      this.$store.columnas_actuales.featureProperties
    ).concat([
      "nombre",
      "comuna",
      "seudonimo-propiedad",
      "link-img-portada-wordpress"
    ]);
    let properties = Object.entries(props).filter(([slug_name, value]) => {
      return true;
    }).reduce((accum, [slug_name, value]) => {
      accum[slug_name] = this.$store.campos_busqueda.getShownValue(
        this,
        slug_name
      );
      return accum;
    }, {});
    return {
      type: "Feature",
      id,
      properties,
      geometry
    };
  }
  async getBarrio() {
    if (!this.latitud || !this.longitud)
      return Promise.reject(new Error("No hay coordenadas"));
    await fetch(`https://workers.lacasadejuana.cl/geo/coords/${this.longitud}/${this.latitud}`);
  }
  get token() {
    return document.querySelector('[name="_token"]').value;
  }
  async setProperty(property, value) {
    return this.validateInputs({ property }).then(({ prefixed_property }) => {
      console.log({
        property,
        from: this[property],
        to: value
      });
      if (property === "id_etapa_negocio") {
        this.set("id_etapa_negocio", this.initial.get("id_etapa_negocio"));
        return globalThis.cambio_etapa_check({
          id: this.id,
          id_etapa_negocio: value
        });
      }
      if (!this.savingPromise) {
        this.savingPromise = globalThis.patchNegocio(
          {
            id: this.id,
            [prefixed_property]: value
          },
          true
        );
      }
      if (this[property] === value) {
        this.savingPromise = null;
        return true;
      }
      return this.savingPromise.then((result) => {
        if (!result)
          return false;
        openToast({
          type: "success",
          text: "Se ha actualizado el campo " + property,
          description: "en el Negocio " + this.id,
          delay: 2e3
        });
        this[property] = value;
        this.savingPromise = null;
        return true;
      });
    }).catch((err) => {
      openToast({
        type: "error",
        text: "No se pudo actualizar el negocio " + this.id,
        description: err.message,
        delay: 2e3
      });
      this.savingPromise = null;
      return false;
    });
  }
  /**
   * There's no campo_busqueda for "region" but this method handles it in case it's needed in the future
   * @param param0 
   * @returns 
   */
  async saveAddress({
    lat,
    lng,
    direccion,
    comuna,
    region,
    barrio
  }) {
    let changes = await Object.entries({ lat, lng, direccion, comuna, barrio }).reduce(
      async (accum, [property, value]) => {
        accum = await accum;
        let campo = this.$store.campos_busqueda.find(
          property
        );
        if (!campo)
          return accum;
        let prefixed_property = [campo.attr_type, property].join(".");
        accum[prefixed_property] = value;
        return accum;
      },
      {}
    );
    console.log(changes);
    if (!this.savingPromise) {
      this.savingPromise = globalThis.patchNegocio(
        {
          id: this.id,
          ...changes
        },
        true
      );
    }
    return this.savingPromise.then((result) => {
      if (!result)
        return false;
      openToast({
        type: "success",
        text: `Se actualiz\xF3 el negocio ${this.id}`,
        description: "(direcci\xF3n, comuna y coordenadas)",
        delay: 2e3
      });
      Object.entries({ lat, lng, direccion, comuna }).forEach(([property, value]) => {
        this[property] = value;
        this.initial.set(property, value);
      });
      this.savingPromise = null;
      return true;
    }).catch((err) => {
      openToast({
        type: "error",
        text: "No se pudo actualizar el negocio " + this.id,
        description: err.message,
        delay: 2e3
      });
      this.savingPromise = null;
      return false;
    });
  }
  async save() {
    if (Object.keys(this.changes).length === 0) {
      console.log("Negocio " + this.id + ": no hay cambios");
      return;
    }
    if (this.changes.id_etapa_negocio)
      return globalThis.cambio_etapa_check({
        id: this.id,
        //@ts-ignore
        id_etapa_negocio: this.changes.id_etapa_negocio
      });
    let changes = await Object.entries(this.changes).reduce(
      async (accum, [property, value]) => {
        accum = await accum;
        let campo = this.$store.columnas_actuales.find(
          property
        );
        if (["id_tipo_negocio", "id_tipo_propiedad"].includes(
          campo.slug_name
        ) && this.id_etapa_negocio >= 3)
          return accum;
        if (!campo)
          return accum;
        let prefixed_property = [campo.attr_type, property].join(".");
        accum[prefixed_property] = value;
        return accum;
      },
      {}
    );
    console.log(changes);
    if (!this.savingPromise) {
      this.savingPromise = globalThis.patchNegocio(
        {
          id: this.id,
          ...changes
        },
        true
      );
    }
    return this.savingPromise.then((result) => {
      if (!result)
        return false;
      openToast({
        type: "success",
        text: `Se actualiz\xF3 el negocio ${this.id}`,
        delay: 2e3
      });
      Object.entries(this.changes).forEach(([property, value]) => {
        this[property] = value;
        this.initial.set(property, value);
      });
      this.savingPromise = null;
      return true;
    }).catch((err) => {
      openToast({
        type: "error",
        text: "No se pudo actualizar el negocio " + this.id,
        description: err.message,
        delay: 2e3
      });
      this.savingPromise = null;
      return false;
    });
  }
  submitContacto(slug_name, id_persona) {
    let id_negocio = this.negocio.id;
    let campo = this.$store.columnas_actuales.find(
      slug_name
    );
    if (!campo)
      return Promise.reject(
        new Error("No se encontr\xF3 el campo: " + slug_name)
      );
    let id_rol_negocio = campo.id_rol_negocio;
    if (!id_rol_negocio)
      return Promise.reject(
        new Error(
          "No se encontr\xF3 el rol negocio del campo " + slug_name
        )
      );
    const nombreRol = ifDefined(this.$store.roles_negocio, (rolesStore) => rolesStore.get(Number(id_rol_negocio)).name);
    console.info({ id_negocio, id_persona, id_rol_negocio });
    return fetch(location.origin + "/negocio/nuevoContacto/" + this.id, {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": this.token,
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_negocio,
        buscador_persona: id_persona,
        id_rol_negocio
      })
    }).then((res2) => res2.json()).then((res2) => {
      return tap(
        res2,
        (res3) => openToast({
          type: res3.type || "warning",
          text: "Se modific\xF3 un contacto del negocio " + this.id,
          from: "submitContacto",
          description: "rol " + nombreRol,
          delay: 2e3
        })
      );
    });
  }
};

// src/js/components/stores/NegocioStore.ts
var NegocioStore = class extends BaseClass {
  constructor() {
    super();
    this.className = "NegocioStore";
    this.model = null;
    this.total = 0;
    this.state = {
      from: 0,
      to: 0,
      total: 0
    };
    this.per_page = 0;
    this.last_page = 0;
    this.current_page = 1;
    this.properties = [];
    this.activeFilterIcon = "fa fa-filter";
    this.ready = false;
    this.complete = false;
    this.limit = null;
    this.dummy = null;
    this.next_page_url = location.origin + "/api/negocios";
    this.urlInstance = new URL(location.href);
    this.apiSortBy = "created_at";
    this.timerColor = "color:cobalt;font-weight:bold";
    this.classNameColor = "color:cobalt;font-weight:bold;";
    this.fetchPromises = {};
    this.fetchResults = {};
    this.abortController = null;
    this.buffer = [];
    this.ready = false;
    this.complete = false;
    this.classNameColor = "color:cobalt;font-weight:bold;";
    this._console = bindConsole(this.className, this.classNameColor);
    this.init();
  }
  get deals_with_coordinates() {
    return this.data.filter((n) => n.lat && n.lng || n._extra_props.lat && n._extra_props.lng);
  }
  init() {
    this.marquee(" init ");
  }
  async fetchAll(page = 0) {
    return this.next().then((res2) => {
      if (this.next_page_url || this.complete === false)
        return this.fetchAll();
      this.processEventListeners("complete", this.properties);
      return this.properties;
    });
  }
  setOptions({
    per_page,
    total,
    last_page,
    request_id,
    next_page_url
  }) {
    this.per_page = per_page;
    this.total = total;
    this.last_page = last_page;
    this.request_id = request_id;
    this.next_page_url = next_page_url;
    return this;
  }
  openModalEdition() {
    this.dummy.syncInitialValues();
    this.model = this.dummy;
  }
  get to() {
    return this.properties[this.properties.length - 1] || 5e5;
  }
  stopFetching(cb) {
    this.ready = true;
    this.next_page_url = null;
    this.complete = true;
    cb && cb([]);
    this.marquee("processing onComplete handlers ");
    this.processEventListeners("complete", this.properties);
    this.$store.active_filter.clearLoading(2500);
    return [];
  }
  async restart() {
    let total = this.$store.active_filter.estimate;
    this.next_page_url = location.origin + `/maps/api/negocios?from=${Number(Date.now() / 1e3).toFixed(0)}&total=${total}&limit=5000`;
    this.complete = false;
    this.ready = true;
    this.properties = [];
    return this.fetchAll();
  }
  async next(page = 1, cb) {
    if (!globalThis.backendPaginator || globalThis.backendPaginator.total === void 0 || globalThis.logging_out) {
      return this.stopFetching(cb);
    }
    if (!this.next_page_url) {
      this.stopFetching(cb);
      return this.properties;
    }
    let token = document.querySelector('meta[name="csrf"]') && document.querySelector('meta[name="csrf"]').content;
    const next_page_url = this.next_page_url;
    if (this.fetchPromises[next_page_url])
      return this.fetchPromises[next_page_url];
    this.marquee(`dataLength: ${this.data.length} fetching ${this.next_page_url}`);
    let url = new URL(next_page_url);
    url.searchParams.set("total", String(this.total));
    url.searchParams.set("limit", "500");
    let current_progress = this.properties.length / (this.total ?? 50);
    this.$store.active_filter.setLoading(this.properties.length < 100 ? 30 : current_progress, "Cargando negocios");
    this.abortController = new AbortController();
    const signal = this.abortController.signal;
    this.fetchPromises[this.next_page_url] = fetch(url.toString(), {
      signal,
      headers: {
        "Content-Type": "application/json",
        expect: "application/json",
        "X-CSRF-TOKEN": token
      }
    }).then(async (res2) => {
      if (!res2.ok) {
        return this.stopFetching(cb);
      }
      const data2 = await this.processResult(res2, next_page_url);
      if (data2.length === 0) {
        return this.stopFetching(cb);
      }
      cb && cb(data2);
      this.ready = true;
      return this.data.length === 0 ? this.reload(data2) : this.append(data2);
    }).catch((err) => {
      return this.stopFetching(cb);
    });
    return this.fetchPromises[this.next_page_url];
  }
  get data() {
    return this.properties;
  }
  normalizeNegocio(row, slug_names) {
    row.fecha_creacion_visual = new Date(row.created_at).toLocaleDateString("es-CL");
    row.fechaCreacion = new Date(row.created_at).toLocaleDateString("es-CL");
    return new Negocio(row, this.$store.columnas_actuales.currentSlugs);
  }
  async recreateNegocios() {
    this.$store.active_filter.setLoading(
      1 / 3,
      "Regenerando negocios"
    );
    let currentSlugs = Array.from(new Set(module_default8.raw(this.$store.columnas_actuales.currentSlugs.concat(this.$store.active_filter.currentSlugs))));
    this.properties.forEach((row) => {
      Object.entries({
        ...Object.fromEntries(row.initial),
        ...row._extra_props
      }).filter(([key]) => currentSlugs.includes(key)).forEach(([key, value]) => {
        row.initial.set(key, value);
      });
    });
    return this.processEventListeners("complete", this.properties);
  }
  append(rows) {
    return new Promise((res2) => {
      return this.$store.active_filter.once("ready").then(() => {
        this.$store.active_filter.setLoading(
          1 / 3,
          "Cargando negocios"
        );
        let currentSlugs = Array.from(new Set(module_default8.raw(this.$store.columnas_actuales.currentSlugs.concat(this.$store.active_filter.currentSlugs))));
        let newRows = Object.values(rows).filter((r) => !this.ids.includes(r.id));
        let newRowsNormalized = newRows.map((row) => this.normalizeNegocio(row, currentSlugs));
        this.properties = this.properties.concat(newRowsNormalized);
        res2(newRowsNormalized);
      });
    });
  }
  reload(rows) {
    return new Promise((res2) => {
      return this.$store.active_filter.once("ready").then(() => {
        let currentSlugs = Array.from(new Set(module_default8.raw(this.$store.columnas_actuales.currentSlugs.concat(this.$store.active_filter.currentSlugs))));
        this.$store.active_filter.setLoading(
          1 / 3,
          "Cargando negocios"
        );
        this.dummy = new DummyNegocio({ id: 0 }, currentSlugs);
        this.properties = rows.map((row) => this.normalizeNegocio(row, currentSlugs));
        if (!this.ready) {
          this.ready = true;
          this.marquee(" Finished ingesting first batch ");
          this.processEventListeners("ready", this.properties);
        } else {
          this.processEventListeners("reload", this.properties);
        }
        res2(this.properties);
      });
    });
  }
  get checked() {
    return this.properties.filter((n) => n.checked);
  }
  getDummy() {
    return this.dummy;
  }
  get url() {
    this.urlInstance = new URL(this.next_page_url);
    return this.urlInstance;
  }
  async fetchFilteredRecords(endpoint, {
    state,
    method,
    headers,
    page
  } = { page: 1, state: {}, method: "GET", headers: [] }) {
    endpoint = endpoint || new URL(this.$store.active_filter.searchUrl, location.origin).toString();
    state = state || {};
    state.limit = state.limit || 100;
    let url = new URL(endpoint), body = typeof state === "string" ? state : JSON.stringify(state);
    if (page !== 0) {
      url.searchParams.set("page", page.toFixed(0));
    }
    this.abortController = new AbortController();
    this.current_page = page || 1;
    const signal = this.abortController.signal;
    const result = await staticFetchWrapper(url.toString(), {
      signal,
      method: method || "post",
      body
    }).then(async (res2) => {
      const data2 = await this.processResult(res2);
      this.current_page === 1 ? this.reload(data2) : this.append(data2);
      if (!this.next_page_url) {
        this.stopFetching();
        return this.properties;
      }
      state.from = this.from;
      state.total = this.total;
      this.current_page++;
      return this.fetchFilteredRecords(endpoint, { state, method, headers, page: this.current_page });
    });
    return result;
  }
  async processResult(res2, last_page_url) {
    const result = typeof res2.json === "function" ? await res2.json() : res2;
    if (result.data) {
      result.data = Object.values(result.data);
      this.per_page = result.per_page;
      this.last_page = result.last_page;
      this.current_page = result.current_page;
      this.next_page_url = result.next_page_url;
      this.total = result.total;
      this.from = result.from;
      if (last_page_url) {
        this.fetchResults[last_page_url] = {
          per_page: result.per_page,
          last_page: result.last_page,
          next_page_url: result.next_page_url,
          total: result.total,
          request_id: result.request_id
        };
      }
      return result.data;
    }
    return [];
  }
  toJson(id) {
    return this.toJSON(id);
  }
  toJSON(id) {
    let negocio = this.getRaw(id);
    let { lng, lat, searchstring, ...props } = negocio;
    let geometry = { type: "Point", coordinates: [lng, lat] };
    let properties = module_default8.store("columnas_actuales").columnDefs.reduce((accum, c) => {
      let { slug_name, name, properties: properties2, input_type, id_input_type, ...rest } = c;
      accum[slug_name] = negocio[slug_name];
      if (id_input_type === "1" && Array.isArray(properties2)) {
        let selected_value = properties2.find((p) => p.id === negocio[slug_name]);
        accum[slug_name] = selected_value ? selected_value.name : negocio[slug_name];
      }
      return accum;
    }, {});
    return {
      type: "Feature",
      id,
      properties,
      geometry
    };
  }
  get ids() {
    return this.data.map((n) => n.id);
  }
  /**
   * Provided to avoid breaking changes
   */
  getRaw(id) {
    return this.properties.find((n) => n.id === id);
  }
  get(id) {
    if (id === 0)
      return this.getDummy();
    return this.properties.find((n) => n.id === id);
  }
  at(index) {
    return this.data[index];
  }
  splice(id) {
    let position = this.ids.indexOf(id);
    if (position) {
      this.properties.splice(position, 1);
    }
  }
  /**
   * the new value comes from coalescing the allowed properties, stripping readonly keys and replacing them using their getter
   * @param    {Object}    data    
   **/
  set(id, data2 = {}) {
    throw new Error(`Deprecated. Use Negocio.set(slug_name, value)`);
  }
  async setProperty(id, property, value) {
    return this.get(id).setProperty(property, value);
  }
  setModel(model) {
    this.model = model;
    return this;
  }
};
var createNegociosStore = () => {
  return new NegocioStore();
};

// src/js/components/stores/PersonaStore.ts
var PersonaStore = class extends BaseClass {
  constructor() {
    super();
    this.className = "PersonaStore";
    this.silent = false;
    this.loglevel = 4 /* WARN */;
    this.persona = {};
    this._console = bindConsole(this.className);
    console.marquee({
      [Number(performance.now() / 1e3).toFixed(1)]: "color:blue;font-weight:bold",
      " created store ": "",
      [String(this.constructor.name)]: "color:purple;font-weight:bold;"
    });
  }
  init() {
  }
  get extra_attributes() {
    return this.persona.extra_attributes || {};
  }
  mergeAttributes(attrs) {
    this.persona.extra_attributes = {
      ...this.persona.extra_attributes,
      ...attrs
    };
  }
  mergeAttributesIfMissing(attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      this.persona.extra_attributes[key] = this.persona.extra_attributes[key] ?? value;
    });
  }
  get nombre_completo() {
    return this.persona.nombre + " " + this.persona.apellidos;
  }
  setProperties(persona) {
    this.persona = persona;
    this.id = persona.id || null;
    this.persona.extra_attributes = this.persona.extra_attributes || {};
    this.syncAttributes();
    this.persona.extra_attributes.id_rol_negocio = Object.values((this.persona.extra_attributes || {}).id_rol_negocio || []);
  }
  /**
   * Syncs extra attributes in both notations 
   * e.g. persona[extra-attributes->comuna] and persona.extra_attributes.comuna
   */
  syncAttributes() {
    Object.entries(this.persona || {}).forEach(([key, value]) => {
      if (key.startsWith("extra_attributes->")) {
        this.persona.extra_attributes[key.replace("extra_attributes->", "")] = this.persona.extra_attributes[key.replace("extra_attributes->", "")] ?? value;
      }
    });
    Object.entries(this.persona.extra_attributes || {}).forEach(([key, value]) => {
      this.persona[`extra_attributes->${key}`] = this.persona[`extra_attributes->${key}`] ?? value;
    });
  }
  get(key, defaultValue = null) {
    return this.persona[key] || defaultValue;
  }
  get mapLink() {
    let { lat, lng, map_link } = this.persona.extra_attributes;
    if (map_link)
      return map_link;
    if (lat && lng)
      return encodeURI(`https://www.google.com/maps/search/?api=1&query='${this.persona.direccion}'`);
  }
  get payload() {
    return this.persona;
  }
  save_property(frm, remove_label = false) {
    let tokenElement = frm.querySelector('[name="_token"]');
    if (!(tokenElement instanceof HTMLInputElement) || !tokenElement.value)
      throw new Error("No se encontr\xF3 el token de seguridad");
    const sanctumToken = document.querySelector('meta[name="test_user_token"]');
    const headers = {
      // 'Content-Type': 'application/json; charset=UTF-8',
    };
    if (sanctumToken) {
      headers["Authorization"] = `Bearer ${sanctumToken.content}`;
    } else {
      headers["X-CSRF-TOKEN"] = `${tokenElement.value}`;
    }
    const propfields = new FormData(frm);
    propfields.delete("negocio-id_etapa_negocio");
    propfields.delete("modal_etapas");
    return fetch(frm.action, {
      method: String(propfields.get("_method") || "POST"),
      headers,
      body: propfields
    }).then((res2) => res2.json()).then(async (jsonRes) => {
      return jsonRes;
    });
  }
  get changed() {
    let changed = /* @__PURE__ */ new Map();
    for (let [key, value] of Object.entries(this.persona)) {
      let cleanKey = key;
      let initialValue = this.persona[key];
      if (initialValue === null && !value)
        continue;
      if (initialValue != value) {
        changed.set(cleanKey, value);
      }
    }
    return Object.fromEntries(changed);
  }
};
Object.defineProperty(PersonaStore.prototype, "init", { enumerable: true });

// ../../../negocios-panel/resources/packages/@lacasadejuana/types/src/VSearchType.ts
var VSearchType2 = /* @__PURE__ */ ((VSearchType3) => {
  VSearchType3["BETWEEN"] = "15";
  VSearchType3["GREATER_THAN"] = "5";
  VSearchType3["GREATER_THAN_OR_EQUAL"] = "7";
  VSearchType3["HAS_ATTACHMENTS"] = "23";
  VSearchType3["IN_RANGE"] = "25";
  VSearchType3["IS_AFTER"] = "18";
  VSearchType3["IS_BEFORE"] = "17";
  VSearchType3["IS_EQUAL"] = "21";
  VSearchType3["IS_NOT_EQUAL"] = "22";
  VSearchType3["IS_NOT_NULL"] = "14";
  VSearchType3["IS_NULL"] = "13";
  VSearchType3["JSON_CONTAINS"] = "19";
  VSearchType3["JSON_NOT_CONTAINS"] = "20";
  VSearchType3["LESS_THAN"] = "6";
  VSearchType3["LESS_THAN_OR_EQUAL"] = "8";
  VSearchType3["LIKE"] = "3";
  VSearchType3["NOT_BETWEEN"] = "16";
  VSearchType3["NOT_IN"] = "2";
  VSearchType3["NOT_LIKE"] = "4";
  VSearchType3["IN"] = "1";
  return VSearchType3;
})(VSearchType2 || {});

// ../../../negocios-panel/resources/packages/@lacasadejuana/types/src/VTypeSearch.ts
var VTypeSearch2 = Object.entries(VSearchType2).reduce((a, [k, v]) => ({ ...a, [v]: k }), {});

// ../../../negocios-panel/resources/packages/@lacasadejuana/types/src/VRenderType.ts
var VRenderType = /* @__PURE__ */ ((VRenderType2) => {
  VRenderType2["renderNull"] = "renderNull";
  VRenderType2["renderSelect"] = "renderSelect";
  VRenderType2["renderSingleDate"] = "renderSingleDate";
  VRenderType2["renderDateRange"] = "renderDateRange";
  VRenderType2["renderNumber"] = "renderNumber";
  VRenderType2["renderContacto"] = "renderContacto";
  VRenderType2["renderButtonGroup"] = "renderButtonGroup";
  VRenderType2["renderText"] = "renderText";
  VRenderType2["renderNumericInterval"] = "renderNumericInterval";
  return VRenderType2;
})(VRenderType || {});

// ../../../negocios-panel/resources/packages/@lacasadejuana/types/src/definitions.search_types.ts
var IN = "1";
var NOT_IN = "2";
var LIKE = "3";
var NOT_LIKE = "4";
var GREATER_THAN = "5";
var LESS_THAN = "6";
var GREATER_THAN_OR_EQUAL = "7";
var LESS_THAN_OR_EQUAL = "8";
var IS_NULL = "13";
var IS_NOT_NULL = "14";
var BETWEEN = "15";
var NOT_BETWEEN = "16";
var IS_BEFORE = "17";
var IS_AFTER = "18";
var JSON_CONTAINS = "19";
var JSON_NOT_CONTAINS = "20";
var IS_EQUAL = "21";
var IS_NOT_EQUAL = "22";
var HAS_ATTACHMENTS = "23";
var IN_RANGE = "25";
var search_types = {
  BETWEEN,
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL,
  HAS_ATTACHMENTS,
  IS_AFTER,
  IS_BEFORE,
  IS_EQUAL,
  IS_NOT_EQUAL,
  IS_NOT_NULL,
  IS_NULL,
  JSON_CONTAINS,
  JSON_NOT_CONTAINS,
  LESS_THAN,
  LESS_THAN_OR_EQUAL,
  LIKE,
  NOT_BETWEEN,
  NOT_IN,
  NOT_LIKE,
  IN,
  IN_RANGE
};

// src/js/components/entities/EnrichedFilter.ts
var import_lodash = __toESM(require_lodash());
var EnrichedFilter = class {
  constructor(filtro) {
    this.filter_id = String(filtro.id);
    filtro.valor_busquedaFn = (negocio) => true;
    this._filtro = filtro;
    this._campo_busqueda = filtro.campo_busqueda;
    this._tipo_busqueda = filtro.tipo_busqueda;
    this._conector = filtro.conector;
    this._valor_busqueda = filtro.valor_busqueda;
    this.disabled = filtro.disabled;
    this.index = filtro.index;
    this.$store.active_filter = Alpine.store("active_filter");
    this.$store.tipos_busqueda = Alpine.store("tipos_busqueda");
  }
  get id() {
    return this.filter_id;
  }
  get parent_id() {
    return Number(this.$store.active_filter.id);
  }
  get conector() {
    return this._conector || this._filtro.conector;
  }
  set conector(conector) {
    this._conector = conector;
    this._filtro.conector = conector;
  }
  get valor_busqueda() {
    return this._valor_busqueda || this._filtro.valor_busqueda;
  }
  set valor_busqueda(valor_busqueda) {
    this._valor_busqueda = valor_busqueda;
    this._filtro.valor_busqueda = valor_busqueda;
  }
  get "$store"() {
    return {
      campos_busqueda: Alpine.store("campos_busqueda"),
      negocios: Alpine.store("negocios"),
      columnas_actuales: Alpine.store("columnas_actuales"),
      active_filter: Alpine.store("active_filter"),
      tipos_busqueda: Alpine.store("tipos_busqueda")
    };
  }
  get campo_busqueda() {
    return this._campo_busqueda;
  }
  set campo_busqueda(newCampo) {
    if (this._campo_busqueda !== newCampo) {
      this._campo_busqueda = newCampo;
      console.colorInfo("#00C", "EnrichedFilter", { "setting new campo ": newCampo, shouldRender: this.shouldRender });
      this.valor_busqueda = "";
      this.tipo_busqueda = "13" /* IS_NULL */;
    }
  }
  get tipo_busqueda() {
    return this._tipo_busqueda;
  }
  set tipo_busqueda(newType) {
    if (this._tipo_busqueda === newType)
      return;
    this._tipo_busqueda = newType;
    console.colorInfo("#00C", "EnrichedFilter", { "setting new tipo_busqueda ": newType, shouldRender: this.shouldRender, valor_busqueda: this.valor_busqueda });
    if (!(0, import_lodash.isArray)(this.valor_busqueda))
      this.valor_busqueda = [];
  }
  get filtro() {
    return this;
  }
  get slug_name() {
    return (this.campo_busqueda || "").replace(/^([^,]+).*$/, "$1") || this.campo_busqueda.split(",")[0];
  }
  get id_input_type() {
    return (this.campo || { id_input_type: "2" /* INPUT_TEXT */ }).id_input_type;
  }
  get id_rol_negocio() {
    return (this.campo || { id_rol_negocio: null }).id_rol_negocio;
  }
  get slug() {
    return this.slug_name;
  }
  get attr_type() {
    return this.campo ? this.campo.attr_type : this.campo_busqueda.split(",")[1] ?? "negocio";
  }
  get campo() {
    return this.filtro && this.campo_busqueda ? this.$store.campos_busqueda.find(this.campo_busqueda) : { id_input_type: "2" /* INPUT_TEXT */ };
  }
  get tipo() {
    return this.$store.tipos_busqueda.get(this.tipo_busqueda).name;
  }
  get operation() {
    return this.$store.tipos_busqueda.getOperation(this.tipo_busqueda);
  }
  get properties() {
    return this.campo && Array.isArray(this.campo.properties) ? this.campo.properties : [];
  }
  get items() {
    return (Array.isArray(this.valor_busqueda) ? this.valor_busqueda : [this.valor_busqueda]).map(String);
  }
  get options() {
    return this.campo ? this.campo.options : [];
  }
  get operadores_busqueda() {
    return this.$store.tipos_busqueda.operadores_para(
      this.campo || { id_input_type: 0 }
    ) || {
      ["13" /* IS_NULL */]: "Vac\xEDo/Nulo",
      ["14" /* IS_NOT_NULL */]: "No es vac\xEDo/Nulo"
    };
  }
  /*get index() {
      return (this.filtro || {}).index;
  }
  set index(value) {
      this.filtro.index = value;
  }
  get disabled() {
      return !!(this.filtro || {}).disabled
  }
  set disabled(value) {
      this.filtro.disabled = !!value
  }*/
  get operadores() {
    return this.operadores_busqueda;
  }
  get isValid() {
    return this.campo_busqueda && this.campo_busqueda !== ",negocio" && this.slug_name && (this.valor_busqueda !== null && this.valor_busqueda !== void 0 || String(this.tipo_busqueda) === "13" /* IS_NULL */ || String(this.tipo_busqueda) === "14" /* IS_NOT_NULL */);
  }
  get input_type() {
    return this.campo ? this.campo.input_type : "text";
  }
  get payload() {
    let {
      id,
      conector,
      campo_busqueda,
      tipo_busqueda,
      valor_busqueda,
      slug_name,
      attr_type,
      id_input_type,
      id_rol_negocio,
      disabled,
      input_type,
      operation,
      index
    } = this;
    return {
      id,
      index,
      conector,
      campo_busqueda,
      tipo_busqueda,
      input_type,
      valor_busqueda: valor_busqueda === null ? null : typeof valor_busqueda === "object" ? Object.values(valor_busqueda) : valor_busqueda,
      slug_name,
      id_input_type,
      attr_type,
      id_rol_negocio,
      operation,
      disabled
    };
  }
  get templateId() {
    if (this.renderButtonGroup)
      return "#render_button_group";
    if (this.renderSelect)
      return "#render_select";
    if (this.renderContacto)
      return "#render_contacto";
    if (this.renderDateRange)
      return "#render_date_range";
    if (this.renderSingleDate)
      return "#render_date";
    if (this.renderNull)
      return "#render_null";
    if (this.renderNumber)
      return "#render_number";
    if (this.renderText)
      return "#render_text";
    return "#render_text";
  }
  getTemplateContent() {
    return document.querySelector(this.templateId).innerHTML;
  }
  get templateContent() {
    return document.querySelector(this.templateId).innerHTML;
  }
  get VRenderType() {
    return VRenderType;
  }
  get shouldRender() {
    if (!this.campo)
      return "renderNull";
    let {
      renderNumericInterval,
      renderSelect,
      renderSingleDate,
      renderDateRange,
      renderNumber,
      renderContacto,
      renderNull,
      renderText,
      renderButtonGroup
    } = this;
    let shouldRender = Object.entries({
      renderNull,
      renderSelect,
      renderSingleDate,
      renderDateRange,
      renderNumericInterval,
      renderNumber,
      renderContacto,
      renderButtonGroup,
      renderText
      //@ts-ignore
    }).find(([key, value]) => value === true);
    return shouldRender ? shouldRender[0] : "renderText";
  }
  get renderSelect() {
    if (!this.campo)
      return false;
    return (this.campo.isSelectOrRadioButtonGroup || this.campo.isMultiSelectField || this.campo.isCheckbox || !this.renderContacto && [search_types.IN, search_types.NOT_IN].includes(String(this.tipo_busqueda)) && (this.campo.options || []).length) && !this.renderNull && !this.renderButtonGroup;
  }
  get renderButtonGroup() {
    if (!this.campo)
      return false;
    return [
      search_types.HAS_ATTACHMENTS
    ].includes(String(this.tipo_busqueda)) && !this.renderNull;
  }
  get renderSingleDate() {
    if (!this.campo)
      return false;
    return this.campo && this.campo.isDateOrDatetimeField && ![
      search_types.BETWEEN,
      search_types.NOT_BETWEEN
    ].includes(String(this.tipo_busqueda)) && !this.renderNull;
  }
  get renderDateRange() {
    if (!this.campo)
      return false;
    return this.campo && this.campo.isDateOrDatetimeField && [
      search_types.BETWEEN,
      search_types.NOT_BETWEEN
    ].includes(String(this.tipo_busqueda)) && !this.renderNull;
  }
  get renderNumber() {
    if (!this.campo)
      return false;
    return this.campo.isNumber && !this.renderNull && search_types.IN_RANGE !== String(this.tipo_busqueda);
  }
  get renderNumericInterval() {
    if (!this.campo)
      return false;
    return this.campo.isNumber && !this.renderNull && search_types.IN_RANGE === String(this.tipo_busqueda);
  }
  get renderNull() {
    if (!this.campo)
      return true;
    return [
      search_types.IS_NULL,
      search_types.IS_NOT_NULL
    ].includes(String(this.tipo_busqueda));
  }
  get renderContacto() {
    if (!this.campo)
      return false;
    return this.campo.isContact && !this.renderNull;
  }
  get renderText() {
    return !this.renderSelect && !this.renderNull && !this.renderNumber && !this.renderDateRange && !this.renderSingleDate && !this.renderContacto && !this.renderNull;
  }
};
Object.defineProperty(EnrichedFilter.prototype, "tipo", { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, "input_type", { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, "shouldRender", { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, "payload", { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, "operadores_busqueda", { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, "operation", { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, "tipo_busqueda", { enumerable: true });
Object.defineProperty(EnrichedFilter.prototype, "campo_busqueda", { enumerable: true });

// src/js/components/stores/activeFilterStore.ts
var ActiveFilterStore = class extends BaseClass {
  constructor() {
    super();
    this.opened_once = false;
    this.filters_open = false;
    this.className = "ActiveFilterStore";
    this.ready = false;
    this.estimate = 0;
    //updated_at: Date;
    this.properties = {
      columnas_actuales: []
    };
    this.filtrosDisponibles = [];
    this.default_changed = false;
    this.filterMap = null;
    this.filterIndex = -1;
    this.filterIds = [];
    this.estimatePromise = null;
    this.controls = /* @__PURE__ */ new Map();
    this.redrawing = false;
    this.searchUrl = "/api/negocios/apply_filter";
    this.display_filters_accordion = false;
    this.loadingProgress = 0;
    this.loadingText = "";
    this._console = bindConsole(this.className);
    this.marquee(" created store ");
    globalThis.$store = globalThis.$store || {};
    globalThis.$store.active_filter = this;
    this.filterMap = /* @__PURE__ */ new Map();
    this.redrawingTimeout = null;
    this.debouncedDisableRedrawing = () => {
      if (this.redrawingTimeout)
        clearTimeout(this.redrawingTimeout);
      this.redrawingTimeout = setTimeout(() => this.disableRedrawing(), 500);
    };
  }
  get user_id() {
    return this.properties.user_id;
  }
  get nextIndex() {
    return tap(
      ++this.filterIndex,
      (index) => console.log("nextIndex", index)
    );
  }
  resetControl() {
    this.controls = /* @__PURE__ */ new Map();
    this.on("ready", () => {
    });
  }
  disableRedrawing() {
    this.marquee("disableRedrawing");
    this.redrawing = false;
  }
  get verifiers() {
    return {
      ready: !!this.ready,
      filters_loaded: this.filtrosDisponibles.length > 0
    };
  }
  replaceDisponible(filtro) {
    let position = this.filtrosDisponibles.map((f) => Number(f.id)).indexOf(Number(filtro.id));
    if (position !== -1) {
      let extracted = this.filtrosDisponibles.splice(position, 1);
      filtro.highlighted = true;
      this.filtrosDisponibles.splice(position, 0, filtro);
      this.processEventListeners("filters_loaded", this);
    } else {
      this.filtrosDisponibles.unshift(filtro);
      this.processEventListeners("filters_loaded", this);
    }
  }
  loadFiltrosDisponibles(filtrosDisponibles) {
    let filtrosNormalized = filtrosDisponibles.map((filtro) => {
      let {
        query_string,
        id,
        updated_at,
        user_id,
        name,
        created_at,
        opt_group = "Otros",
        areas_subareas,
        user,
        ...rest
      } = filtro, author = user?.name, {
        user_id: fake_user_id,
        id: fake_id,
        rol,
        personas,
        //@ts-ignore
        _method,
        filter,
        ...properties
      } = query_string;
      return {
        id,
        name,
        public: !!rest.public,
        user_id,
        ...properties,
        opt_group,
        areas_subareas,
        author,
        created_at,
        updated_at
      };
    });
    this.filtrosDisponibles = filtrosNormalized;
    this.processEventListeners("filters_loaded", this);
    return this;
  }
  once(event, handler4) {
    if (event === "filters_loaded" && this.filtrosDisponibles.length > 0 || event === "ready" && this.ready) {
      return Promise.resolve(typeof handler4 === "function" ? handler4(this) : this);
    }
    return super.once(event, handler4);
  }
  xprocessEventListeners(event, callbackArgument) {
    callbackArgument = callbackArgument || this;
    if (!this.eventListeners[event])
      return;
    this.log(`processing ${event} handlers, ${this.eventListeners[event].length} remaining`);
    let onceHandlers = this.eventListeners[event].filter((h) => h.once), otherHandlers = this.eventListeners[event].filter((h) => !h.once);
    while (onceHandlers.length) {
      onceHandlers.shift()(callbackArgument);
    }
    otherHandlers.forEach((cb) => cb(callbackArgument));
    this.eventListeners[event] = otherHandlers;
  }
  get emptyFilter() {
    return {
      id: null,
      name: "Nuevo filtro " + (/* @__PURE__ */ new Date()).toLocaleString("es-CL").replace(",", "").substr(0, 16),
      opt_group: "Otros",
      public: null,
      author: null,
      filtros: [{
        conector: "AND",
        valor_busqueda: null,
        tipo_busqueda: "14" /* IS_NOT_NULL */,
        campo_busqueda: "id_tipo_negocio,negocio",
        slug_name: "id_tipo_negocio",
        attr_type: "negocio",
        id_input_type: "1" /* INPUT_SELECT */
      }],
      columnas_visibles: [70],
      columnas_actuales: [{
        slug_name: "id_tipo_negocio",
        id: 70,
        visible: true
      }],
      areas_subareas: null,
      //@ts-ignore
      estimate: this.$store.negocios.properties.length,
      grouped_filters: [],
      filtros_and_or: [],
      user_id: null,
      created_at: null,
      updated_at: null
    };
  }
  getEstimate(options) {
    this.estimatePromise = this.estimatePromise ?? this.getEstimateOriginal(options);
    return this.estimatePromise;
  }
  get estimate_icon() {
    return this.estimatePromise ? "fa fa-spinner fa-spin" : "fa fa-calculator";
  }
  get payloadForNewFilter() {
    let { id, ...payload } = this.estimatePayload;
    return payload;
  }
  /**
  * @returns {Array<string>} the list of slugs for the current set of columns
  */
  get currentSlugs() {
    return [...(this.columnas_actuales || []).map((c) => c.slug_name)];
  }
  get estimatePayload() {
    let {
      filtros,
      user_id,
      columnas_actuales: columnas_actuales2,
      columnas_visibles,
      id,
      name
    } = this.properties;
    filtros = this.filtros.filter((f) => !f.disabled && f.campo_busqueda).map((filtro) => {
      let f = filtro._filtro || filtro;
      f.conector = f.conector || f._conector || "and";
      f.campo_busqueda = (filtro.campo_busqueda || f.campo_busqueda || f._campo_busqueda).replace("fechaCreacion", "created_at");
      f.tipo_busqueda = filtro.tipo_busqueda || f.tipo_busqueda || f._tipo_busqueda;
      f.valor_busqueda = filtro.valor_busqueda || f.valor_busqueda || f._valor_busqueda;
      let [slug_name, attr_type] = f.campo_busqueda.split(",");
      f.slug_name = slug_name;
      f.attr_type = attr_type;
      return f;
    }).filter((f) => f.campo_busqueda && f.campo_busqueda !== ",negocio").map((f) => module_default8.raw(f));
    return module_default8.raw({
      id: this.id,
      name: this.name,
      opt_group: this.opt_group,
      areas_subareas: this.areas_subareas,
      filtros,
      public: this.public,
      columnas_actuales: module_default8.raw(this.columnas_actuales),
      columnas_visibles: module_default8.raw(this.columnas_visibles)
    });
  }
  normalizeSearchPayload(state) {
    state.columnas_actuales = module_default8.raw(state.columnas_actuales.length ? state.columnas_actuales : this.columnas_visibles).map((c) => {
      return { id: Number(c.id), visible: c.visible, slug_name: c.slug_name };
    });
    state.columnas_visibles = module_default8.raw(state.columnas_visibles.length ? state.columnas_visibles : this.columnas_visibles).map((c) => Number(c));
    let missingVisible = state.columnas_visibles.filter((c) => !state.columnas_actuales.find((c2) => c2.id == c));
    if (missingVisible.length)
      this.console.warn("missingVisible", missingVisible);
    let missing_actuales = state.columnas_actuales.filter((c) => state.columnas_visibles.indexOf(c.id) === -1).map((c) => c.id);
    if (missing_actuales.length)
      this.console.warn("missing_actuales", missing_actuales);
    state.filter = 1;
    state.from = state.from || Number(Date.now() / 1e3).toFixed(0);
    state.limit = Math.max(this.estimate ?? 100, state.limit || 1e3);
    this.console.log({ state });
    return state;
  }
  setLoading(progress, text) {
    if (progress < 1) {
      progress = Math.min(100, (100 - this.loadingProgress) * progress);
    }
    this.loadingProgress = progress;
    this.loadingText = text ?? "cargando";
    if (this.$store.user)
      this.$store.user.displayLoadingMessage = false;
  }
  clearLoading(delay3 = 100) {
    this.loadingProgress = this.loadingProgress + (100 - this.loadingProgress) / 2;
    setTimeout(() => {
      this.loadingProgress = 0;
      this.loadingText = "";
      if (this.$store.user)
        this.$store.user.displayLoadingMessage = false;
    }, delay3 ?? 100);
  }
  computeEndpoint() {
    let endpoint = location.origin + "/api/negocios/apply_filter";
    if (this.searchUrl)
      endpoint = location.origin + this.searchUrl.replace(location.origin, "");
    return endpoint;
  }
  submitSearch(state = {}) {
    const payload = this.estimatePayload;
    state = this.normalizeSearchPayload({ ...payload, ...state });
    if (!state.columnas_visibles.length) {
      this.setLoading(1 / 4, "Buscando negocios");
      this.console.warn("submitSearch: retry with  " + this.columnas_visibles.length + " current columnas_visibles");
      return waitFor2(100).then(() => this.submitSearch(this.estimatePayload));
    }
    console.table(state.columnas_actuales);
    this.info("submitSearch", state);
    this.$store.negocios.complete = false;
    this.setLoading(1 / 2, "Buscando negocios");
    return this.$store.negocios.fetchFilteredRecords(this.computeEndpoint(), {
      method: "post",
      headers: {},
      state,
      page: 1
    }).then(async (result) => {
      setTimeout(() => this.$store.negocios.total = this.$store.negocios.properties.length, 1e3);
      return result;
    }).catch((e) => {
      this.clearLoading();
    });
  }
  async getEstimateOriginal(options) {
    const estimate_url = new URL(
      location.origin + "/api/filtros/estimate_filter"
    );
    estimate_url.pathname += `/${this.properties.id}`;
    if (options.include_columns) {
      estimate_url.searchParams.append("include_columns", "1");
    }
    setTimeout(() => {
      this.estimatePromise = null;
    }, 2e3);
    return BaseClass.staticFetchWrapper(estimate_url.toString(), {
      method: "POST",
      body: JSON.stringify(this.estimatePayload)
    }).then((results) => {
      results = results;
      let { total, new_total, default_filter_id, columnas_visibles } = results || {};
      this.marquee("estimate", {
        total,
        new_total,
        default_filter_id,
        columnas_visibles
      });
      this.estimatePromise = null;
      this.estimate = total;
      let freshResult = { estimate: this.estimate, columnas_visibles };
      this.processEventListeners("probe", freshResult);
      this.redrawing = false;
      return freshResult;
    }).catch((err) => {
      this.redrawing = false;
      this.estimatePromise = null;
      let fallbackResult = {
        estimate: this.estimate,
        columnas_visibles: options.include_columns ? this.$store.columnas_actuales.columnDefs : this.columnas_visibles
      };
      return fallbackResult;
    });
  }
  async updateColumnDefs() {
    return new Promise((res2) => {
      this.$store.columnas_actuales.once("columns_updated", () => res2(this.get_or_infer_columnas_actuales()));
      if (!this.$store.columnas_actuales.ready) {
        setTimeout(() => {
          this.$store.columnas_actuales.processEventListeners("columns_updated", this.$store.columnas_actuales.columnDefs);
        }, 200);
      }
      this.$store.columnas_actuales.reloadCampos(this.get_or_infer_columnas_actuales(), true);
      setTimeout(() => res2(this.columnas_actuales), 200);
    });
  }
  async submitTwice() {
    this.$store.columnas_actuales.once("columns_updated", async () => {
      this.$store.negocios.ready = false;
      await this.submitSearch({ limit: 5500, from: Number(Date.now() / 1e3).toFixed(0) });
      setTimeout(() => this.submitSearch({ limit: 5500, from: Number(Date.now() / 1e3).toFixed(0) }).then(() => globalThis.filterProgress.width = 100));
    });
    this.updateColumnDefs();
  }
  get filtros() {
    return this.filterIds.map((id) => this.filterMap.get(id));
  }
  set filtros(filtros) {
    console.log("set filtros", filtros);
    this.filterIds = [];
    let newFiltros = filtros.map((f, index) => {
      this.filterIds.push(String(f.id));
      return f;
    });
    this.properties.filtros = newFiltros;
    this.filterMap = new Map(newFiltros.map((f) => [f.id, f]));
  }
  get updated_at() {
    return this.properties.updated_at;
  }
  set updated_at(updated_at) {
    this.properties.updated_at = updated_at;
  }
  updateProperties(newProperties) {
    let {
      columnas_visibles,
      id,
      name,
      user_id,
      filtros,
      updated_at,
      created_at,
      opt_group,
      areas_subareas,
      public: isPublic,
      author,
      columnas_actuales: columnas_actuales2,
      ...otherProps
    } = newProperties || this.properties;
    this.author = author;
    console.marquee({
      'Filter name is "': "",
      [name]: "color:blue;font-weight:bold",
      '"': ""
    });
    if (!id)
      isPublic = true;
    this.properties = {
      columnas_actuales: module_default8.raw(columnas_actuales2),
      columnas_visibles: module_default8.raw(columnas_visibles),
      updated_at,
      created_at,
      id,
      name,
      user_id,
      author,
      filtros: module_default8.raw(filtros),
      //@ts-ignore
      filtros2: filtros,
      opt_group,
      areas_subareas,
      public: isPublic,
      ...otherProps
    };
    this.properties.columnas_visibles = Array.isArray(columnas_visibles) && columnas_visibles.length ? module_default8.raw(columnas_visibles) : [
      61,
      139,
      70,
      71,
      65,
      62
    ];
    this.properties.columnas_visibles = Array.from(
      new Set(
        [...this.properties.columnas_visibles].map((c) => String(c))
      )
    );
    this.columnas_actuales = this.infer_columnas_actuales(columnas_actuales2);
    this.properties.columnas_actuales = columnas_actuales2;
    this.properties.opt_group = this.properties.opt_group || "Otros";
    this.properties.areas_subareas = this.properties.areas_subareas || [];
    this.author = this.properties.author;
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.public = !!isPublic;
    try {
      this.properties.filtros = this.properties.filtros || [];
      this.normalizeFiltros(filtros ?? []);
    } catch (e) {
      console.error(e);
    }
    this.columnas_actuales.forEach((c) => {
      c.id = Number(c.id);
      c.visible = c.visible ?? true;
      if (this.$store.campos_busqueda.get(c.id)) {
        let { slug_name } = this.$store.campos_busqueda.get(c.id);
        c.slug_name = slug_name;
      }
    });
    this.reloadCampos();
    if (!this.ready) {
      this.ready = true;
      this.processEventListeners("ready", this);
    }
  }
  onReady(handler4) {
    return this.once("ready", handler4);
  }
  normalizeFiltros(filtros) {
    this.filterMap = /* @__PURE__ */ new Map();
    this.filterIds = [];
    filtros = filtros || this.properties.filtros;
    if (!filtros.length)
      filtros.push(this.createDummyFilter());
    this.properties.filtros = filtros.map(
      (f, index) => {
        f.conector = f.conector || "AND";
        f.index = index;
        this.filterIds.push(String(f.id));
        return f;
      }
    );
    this.properties.filtros.forEach(
      (filtro) => this.filterMap.set(filtro.id, filtro)
    );
  }
  syncFiltrosWithAvailableInfo() {
    let availableFiltro = this.get(this.id);
    if (availableFiltro) {
      this.normalizeFiltros(availableFiltro.filtros);
      this.columnas_visibles = availableFiltro.columnas_visibles;
      this.columnas_actuales = availableFiltro.columnas_actuales;
    }
  }
  appendFiltro() {
    if (!Array.isArray(this.filterIds)) {
      this.filterIds = [];
      this.normalizeFiltros();
    }
    let lengthBefore = this.filterMap.size;
    let newFiltro = this.createDummyFilter();
    newFiltro.index = lengthBefore;
    newFiltro.id = v4_default();
    newFiltro.parent_id = Number(this.id);
    const filtro = new EnrichedFilter(newFiltro);
    this.properties.filtros.push(filtro);
    this.filterMap.set(filtro.id, filtro);
    this.filterIds.push(filtro.id);
    return filtro;
  }
  reloadCampos() {
    this.$store.columnas_actuales.syncWithActiveFilter();
  }
  rollBack() {
    this.setActive(this.id);
  }
  toggleRedrawing() {
    this.redrawing = true;
    this.debouncedDisableRedrawing();
  }
  getActive() {
    return this.get(this.id);
  }
  getSafeProperies(id) {
    id = Number(id ?? this.id);
    let { filtros, ...newProperties } = this.get(id) || {};
    filtros = (filtros || []).map((filtro) => {
      return { ...module_default8.raw(filtro) };
    });
    return { id, filtros, ...newProperties };
  }
  async setActive(id) {
    id = Number(id ?? this.id);
    let { filtros, ...newProperties } = this.get(id) || {};
    this.ready = false;
    this.once("ready", () => this.updateColumnDefs());
    this.$store.tipos_busqueda.once("ready").then(() => {
      this.updateProperties(this.getSafeProperies(Number(id)));
      this.id = id;
      this.name = this.properties.name;
      this.resetSelectedColumns();
      this.default_changed = true;
    });
    return this.redrawing = true;
  }
  resetSelectedColumns() {
    if (this.controls.has("columnas_disponibles_control")) {
      this.controls.get("columnas_disponibles_control").resetSelectedOptions(
        [...this.columnas_visibles].join(",")
      );
    }
  }
  get(id) {
    if (id == 0)
      return this.emptyFilter;
    return this.filtrosDisponibles.find(
      (f) => Number(f.id) === Number(id || this.id)
    );
  }
  /**
   * Reads a cookie in the user's browser to decide if
   * the page should be reloaded after a filter is saved, or when
   * the default filter is changed
   */
  get prevent_reload() {
    return true;
  }
  reloadAvailableFilters(setActive = null) {
    this.filtrosDisponibles = [];
    setActive = setActive || this.id;
    return BaseClass.staticFetchWrapper(
      "/api/filtros/get_available_filters",
      {
        headers: {
          "cache-control": "no-cache"
        }
      }
    ).then(async (filtros) => {
      if (setActive) {
        this.once("filters_loaded", () => this.setActive(setActive));
      }
      await this.loadFiltrosDisponibles(filtros);
      return filtros;
    });
  }
  getCurrentFilter() {
    globalThis.activeFilterPromise = staticFetchWrapper(
      "/api/filtros/current_filter",
      {}
    ).then((res2) => {
      console.timerInfo("received activeFilterPromise result from sw", res2.id);
      return res2;
    });
  }
  async init() {
    this.marquee(" init ");
    this.updateProperties(this.properties);
    this.properties.filtros = (this.properties || {}).filtros || [];
  }
  removeAt(id, retry = 0) {
    this.filterIds = this.filterIds.filter((fid) => fid !== id);
    this.properties.filtros = this.properties.filtros.filter(
      (f) => f.id !== id
    );
    return this.filterMap.delete(id);
  }
  moveFilter(from, to) {
    let filterIds = [...this.filterIds].slice(0);
    let moved = filterIds.splice(from, 1)[0];
    filterIds.splice(to, 0, moved);
    this.filterIds = filterIds;
    this.properties.filtros = this.filterIds.map((id) => {
      return this.properties.filtros.find((f) => f.id == id);
    });
    console.table(this.filtros.map((f) => f.campo_busqueda));
  }
  get columnas_visibles() {
    return Array.from(new Set(this.properties.columnas_visibles));
  }
  set columnas_visibles(columnas_visibles) {
    this.properties.columnas_visibles = Array.from(
      new Set(columnas_visibles)
    );
  }
  get columnas_actuales() {
    return this.infer_columnas_actuales(this.properties.columnas_actuales);
  }
  set columnas_actuales(columnas_actuales2) {
    this.properties.columnas_actuales = this.infer_columnas_actuales(columnas_actuales2);
    this.columnas_visibles = this.columnas_actuales.map((c) => c.id);
  }
  get_or_infer_columnas_actuales() {
    if (!this.columnas_actuales)
      this.columnas_actuales = this.infer_columnas_actuales();
    return this.columnas_actuales;
  }
  sync_columnas_actuales() {
    this.columnas_actuales = this.infer_columnas_actuales();
    return this.columnas_actuales;
  }
  infer_columnas_actuales(columnas_actuales2) {
    columnas_actuales2 = Array.isArray(columnas_actuales2) ? columnas_actuales2 : Array.isArray(this.properties.columnas_actuales) ? this.properties.columnas_actuales : this.$store.columnas_actuales.columnDefs;
    let actuales = Array.from(new Set(this.columnas_visibles)).map((c) => Number(c)).map((c) => {
      let actual = columnas_actuales2.find((ca) => ca.id == c) || {
        id: c,
        visible: true
      };
      let campo = this.$store.campos_busqueda.get(c);
      return {
        id: c,
        slug_name: campo?.slug_name.replace(
          "fechaCracion",
          "created_at"
        ),
        visible: actual.visible ?? true
      };
    });
    return Array.from(new Set(actuales));
  }
  get name() {
    return this.properties.name;
  }
  set name(name) {
    if (name && name !== this.properties.name) {
      this.properties.name = name;
    }
  }
  get public() {
    return !!this.properties.public;
  }
  set public(flag) {
    this.properties.public = !!flag;
  }
  get opt_group() {
    return this.properties.opt_group;
  }
  set opt_group(opt_group) {
    this.properties.opt_group = opt_group;
  }
  get areas_subareas() {
    return this.properties.areas_subareas;
  }
  set areas_subareas(areas_subareas) {
    this.properties.areas_subareas = areas_subareas;
  }
  createDummyFilter() {
    return dummyFilter();
  }
  enrichFilter(filtro) {
    return;
  }
  printColumns() {
    let combinedColumns = this.columnas_visibles.map((c) => {
      let actual = this.columnas_actuales.find((ca) => ca.id == c);
      return {
        id_visible: c,
        id_actual: actual?.id,
        slug_name: actual?.slug_name,
        visible: actual?.visible
      };
    });
    console.table(combinedColumns);
  }
  printTable(filters = null) {
    printFilters(
      (filters ?? this.enrichedFilters).map((f) => {
        let filtro = f._filtro || f;
        filtro.tipo = f.operation || f.tipo;
        return filtro;
      }),
      ["attr_type", "slug_name", "tipo", "valor_busqueda", "conector"]
    );
  }
  at(index) {
    return this.filtros[index] || {};
  }
  get enrichedFilters() {
    return this.properties.filtros;
  }
  suggestNewName() {
    return [
      (this.name || "nuevo filtro ").split(" v202")[0],
      (/* @__PURE__ */ new Date()).toISOString().replace(/-/g, "").replace("T", " ").substr(0, 14)
    ].join(" v");
  }
  async setDefaultFilter(id) {
    return Promise.resolve().then(() => {
      return Promise.resolve();
    }).then(() => {
      return staticFetchWrapper("/api/filtros/change_default_filter", {
        method: "POST",
        body: JSON.stringify({ default_filter: id })
      });
    }).then((jsonRes) => {
      openToast({
        //@ts-ignore
        type: jsonRes.type,
        //@ts-ignore
        text: "Cambio de filtro guardado",
        description: jsonRes.message,
        delay: 4e3,
        from: "selectorFiltroDefault"
      });
      return;
    });
  }
  populateEmptyFilter() {
    let emptyFilter = this.emptyFilter;
    if (globalThis.defaultFieldsPromise) {
      globalThis.defaultFieldsPromise.then((fields) => {
        emptyFilter.columnas_actuales = fields.map((field) => {
          let { slug_name, id, visible } = field;
          return { slug_name, id, visible };
        });
        emptyFilter.columnas_visibles = fields.map((f) => f.id);
        this.updateProperties(emptyFilter);
      });
    } else {
      this.updateProperties(emptyFilter);
    }
    this.redrawing = true;
    this.searchUrl = null;
  }
};
Object.defineProperty(ActiveFilterStore.prototype, "id", { enumerable: true, writable: true });
Object.defineProperty(ActiveFilterStore.prototype, "name", { enumerable: true, writable: true });

// src/js/components/index.ts
var ifDefined = (element, callback, fallback) => {
  if (element) {
    return callback(element);
  }
  return typeof fallback === "function" ? fallback() : fallback;
};
globalThis.ifDefined = ifDefined;
async function waitFor(delay3 = 500, cb = () => {
}) {
  return new Promise((res2) => {
    setTimeout(() => res2(cb), delay3);
  });
}

// src/js/property_map/public_map_modules/exampleLayers.ts
var exampleLayers = [
  {
    type: "deals",
    slug_name: "venta_departamentos",
    name: "Departamentos en Venta",
    checked: true,
    criteria: {
      id_tipo_propiedad: 1,
      id_tipo_negocio: 1
    },
    layer_options: {
      icon: {
        url: "data:image/png;base64,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"
      },
      name: "Departamentos en Venta",
      url_low_emphasis: "data:image/png;base64,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",
      text: "f1ad",
      type: "deals",
      scale: 0.7,
      criteria: {
        id_tipo_negocio: 1,
        id_tipo_propiedad: 1
      },
      className: "icon-building-filled",
      slug_name: "venta_departamentos",
      fontFamily: "fontello",
      checked: true,
      fillOpacity: 0.85,
      strokeColor: "#3060ff"
    }
  },
  {
    type: "deals",
    slug_name: "arriendo_departamentos",
    name: "Departamentos en Arriendo",
    checked: true,
    criteria: {
      id_tipo_propiedad: 1,
      id_tipo_negocio: 2
    },
    layer_options: {
      icon: {
        url: "data:image/png;base64,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"
        //url: 'data:image/png;base64,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',
        //url_alt_b:  data:image/png;base64,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
        //url: 'data:image/png;base64,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',
      },
      name: "Departamentos",
      url_low_emphasis: "data:image/png;base64,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",
      text: "f1ad",
      type: "deals",
      scale: 0.7,
      criteria: {
        id_tipo_negocio: 1,
        id_tipo_propiedad: 1
      },
      className: "icon-building-filled",
      slug_name: "departamentos",
      fontFamily: "fontello",
      checked: true,
      fillOpacity: 0.85,
      strokeColor: "#3060cf"
    }
  },
  {
    type: "deals",
    slug_name: "venta_casas",
    name: "Casas en Venta",
    checked: true,
    criteria: {
      id_tipo_propiedad: 2,
      id_tipo_negocio: 1
    },
    layer_options: {
      strokeColor: "#109010",
      scale: 0.7,
      clickable: true,
      fontSize: 32,
      className: "icon-home",
      text: "e800",
      fillOpacity: 0.85,
      checked: true,
      icon: {
        //url: 'data:image/png;base64,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',
        url_alt_c: "data:image/png;base64,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",
        url: "data:image/png;base64,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",
        url_alt_a: "data:image/png;base64,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"
      },
      name: "Casas",
      url_low_emphasis: "data:image/png;base64,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",
      slug_name: "casas",
      fontFamily: "fontello"
    }
  },
  {
    type: "deals",
    slug_name: "arriendo_casas",
    name: "Casas en Arriendo",
    checked: true,
    criteria: {
      id_tipo_propiedad: 2,
      id_tipo_negocio: 2
    },
    layer_options: {
      strokeColor: "#107010",
      scale: 0.7,
      clickable: true,
      fontSize: 32,
      className: "icon-home",
      text: "e800",
      fillOpacity: 0.85,
      checked: true,
      icon: {
        url_alt_0: "data:image/png;base64,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",
        url: "data:image/png;base64,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"
        //url: 'data:image/png;base64,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',
      },
      name: "Casas",
      url_low_emphasis: "data:image/png;base64,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",
      slug_name: "casas",
      fontFamily: "fontello"
    }
  },
  {
    type: "barrios",
    slug_name: "barrios",
    name: "Barrios",
    layer_options: {
      strokeColor: "#666666",
      strokeWeight: 1,
      text: "e803",
      className: "icon-leaf",
      fontFamily: "fontello",
      scale: 0.84,
      clickable: true,
      labelProperty: "Nombre_de_Barrio",
      fillOpacity: 0.8,
      strokeOpacity: 0.8,
      url: "/json/barrios_old.json",
      infoWindow: false,
      checked: true,
      campos: {
        Nombre_de_Barrio: "Nombre de Barrio"
      }
    }
  },
  /*  {
          type: 'geojson',
          slug_name: 'publicaciones',
          name: 'Publicaciones',
          layer_options: {
              strokeColor: '#339933',
              scale: 0.8,
              clickable: true,
              fillOpacity: 0.85,
              url: '/json/deals_for_map.geojson',
              labelProperty: 'Nombre',
  
              infoWindow: true,
  
              checked: false,
              text: 'e803',
              type: 'geojson',
  
  
              className: 'icon-home-2',
              icon: {
                  url_depto: 'data:image/png;base64,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',
                  url: 'data:image/png;base64,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'
              },
              campos: {
  
                  barrio: "Barrio",
                  seudonimo: "Nombre",
                  status: "Status",
                  precio_uf: "precio_uf",
                  //thumbnail: "thumbnail",
                  dormitorios: "Dormitorios",
                  id_propiedad: "id_propiedad",
                  tipo_negocio: "Modalidad",
                  //comuna_barrio: "comuna_barrio",
                  banos_servicio: "Baños servicio",
                  //codigo_interno: "codigo_interno",
                  tipo_propiedad: "Tipo propiedad",
                  banos_completos: "Baños completos",
                  comuna_propiedad: "Comuna",
                  fecha_publicacion: "Fecha Publicacion",
                  //precio_publicacion: "precio_publicacion",
                  dormitorios_servicio: "Dormitorios servicio",
              },
          },
      },*/
  {
    type: "geojson",
    slug_name: "colegios",
    name: "Colegios",
    layer_options: {
      strokeColor: "#2e2338",
      scale: 0.3,
      clickable: true,
      fillOpacity: 0.85,
      url: "/json/capa_colegios.geojson",
      className: "icon-school",
      labelProperty: "Nombre",
      infoWindow: true,
      text: "e834",
      checked: true,
      fontFamily: "fontello",
      icon: {
        url: "data:image/png;base64,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",
        old_url: "data:image/png;base64,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"
      },
      campos: {
        Nombre: "Nombre",
        Direcci\u00F3n_: "Direcci\xF3n",
        Comuna: "Comuna",
        Formaci\u00F3n: "Formaci\xF3n",
        G\u00E9nero: "G\xE9nero",
        Biling\u00FCe: "Biling\xFCe",
        Playgroup: "Playgroup",
        Cursos_por_nivel: "Cursos por nivel",
        Alumnos_por_nivel: "Alumnos por nivel",
        Superficie_terreno: "Superficieterreno"
      }
    }
  },
  {
    type: "geojson",
    slug_name: "metro",
    name: "Estaciones de Metro",
    layer_options: {
      strokeColor: "#993333",
      scale: 0.3,
      infoWindow: true,
      clickable: true,
      fillOpacity: 0.85,
      className: "icon-subway",
      strokeWeight: 1,
      icon: {
        strokeWeight: 0.14,
        rotation: 0,
        url: "data:image/png;base64,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"
        //path: 'm -0.06452214,-1300.3857 c -144.29784786,0 -258.43104786,33.1537 -344.50584786,94.9296 42.9233,-20.0324 91.3754,-30.1484 145.4707,-30.1484 h 383.41995 c 64.6672,0 120.9378,14.0824 168.8652,42.1621 -87.7094,-72.0803 -206.0617,-106.9433 -353.25000214,-106.9433 z M 353.18548,-1193.4424 c 37.2095,30.5791 68.9017,67.8605 94.8789,112.0938 -9.6712,-37.4905 -34.1898,-70.3022 -73.6465,-98.4082 -6.8766,-4.8985 -13.9716,-9.4316 -21.2324,-13.6856 z m 94.8789,112.0938 c 3.1403,12.1731 4.7559,24.8277 4.7559,37.9902 v 537.00004 c 0,50.8361 -25.0596,94.87145 -75.1797,132.10352 -50.1201,37.23207 -111.3382,56.92036 -183.6543,59.06836 l 127.8066,120.28906 c 1.0601,0.95406 1.7594,1.95596 2.584,2.94141 118.0796,-146.74362 210.8828,-311.40576 210.8828,-491.81055 0,-167.97517 -29.7021,-299.68413 -87.1953,-397.58204 z m -123.6875,889.39259 c -8.1862,10.17344 -16.325,20.35496 -24.7344,30.35351 h 9.2618 c 8.592,0 14.6777,-3.93844 18.2578,-11.81445 3.0499,-6.70994 1.9601,-12.86848 -2.7852,-18.53906 z m -24.7344,30.35351 H -305.83217 C -203.49037,-44.171958 -87.765672,59.410753 1.8065779,149.22955 91.460077,58.315253 202.24108,-45.794548 299.64248,-161.6025 Z m -605.47465,0 c -10.0972,-11.58587 -19.8542,-23.47198 -29.6523,-35.32812 l -2.1602,2.0332 c -5.728,6.44402 -7.1608,13.60446 -4.2968,21.48047 2.864,7.87601 8.9497,11.81445 18.2578,11.81445 z m -29.6523,-35.32812 125.6465,-118.25586 c -71.6002,-2.86401 -132.4619,-22.55229 -182.5821,-59.06836 -50.12,-36.51607 -75.1796,-80.55142 -75.1796,-132.10352 v -537.00004 c -0.1341,-10.0542 0.9879,-19.7242 2.7363,-29.2012 -58.5056,99.66164 -86.08977,229.31225 -85.16797,383.56257 1.1008,184.20416 95.50167,348.01696 214.54687,492.06641 z m -129.3789,-875.62898 c 31.1756,-53.1063 71.1793,-97.6475 120.293,-132.8965 -15.5941,7.2778 -30.5075,15.7774 -44.627,25.6993 -43.0639,30.2611 -68.0762,66.0574 -75.666,107.1972 z m 73.5176,-9.4629 v 307.16414 h 345.829998 v -307.16414 z m 422.083948,0 v 307.16414 H 357.23428 v -307.16414 z m -325.423848,441.41414 c -27.9241,0 -50.8363,9.3078 -68.7363,27.92383 -17.9001,18.61604 -27.2078,41.17007 -27.9238,67.66211 -0.716,26.49205 8.5917,49.04608 27.9238,67.66211 19.332,18.61603 42.2442,27.92383 68.7363,27.92383 25.0601,0 47.6141,-9.3078 67.6621,-27.92383 20.0481,-18.61603 29.3559,-41.17006 27.9239,-67.66211 -1.432,-26.49204 -10.7398,-49.04607 -27.9239,-67.66211 -17.184,-18.61603 -39.738,-27.92383 -67.6621,-27.92383 z m 574.59185,0 c -26.4921,0 -49.0461,9.3078 -67.6621,27.92383 -18.6161,18.61604 -27.9238,41.17007 -27.9238,67.66211 0,26.49205 9.3077,49.04608 27.9238,67.66211 18.616,18.61603 41.17,27.92383 67.6621,27.92383 25.06,0 47.6141,-9.3078 67.6621,-27.92383 20.048,-18.61603 29.7141,-41.17006 28.9981,-67.66211 -0.716,-26.49204 -10.3821,-49.04607 -28.9981,-67.66211 -18.616,-18.61603 -41.1701,-27.92383 -67.6621,-27.92383 z',
      },
      rotation: 0,
      //fontFamily: 'FontAwesome5Free',
      text: "f239",
      labelProperty: "Nombre",
      url: "/json/capa_metro.geojson",
      checked: true,
      campos: {
        Nombre: "Nombre",
        Estaci\u00F3n: "Estaci\xF3n",
        L\u00EDnea: "L\xEDnea"
      }
    }
  }
];
var PublicLayersObject = exampleLayers.reduce((acc, layer) => {
  layer.layer_options.checked = true;
  acc[layer.slug_name] = layer;
  return acc;
}, {});

// src/js/property_map/public_map_modules/sharingLevels.ts
var sharingLevels = {
  private: {
    id: "private",
    title: "Privado",
    description: "El mapa s\xF3lo ser\xE1 visible para usted y los administradores",
    icon: "fa fa-lock"
  },
  shared: {
    id: "shared",
    title: "Compartido",
    description: "Otros usuarios podr\xE1n ver el mapa, pero no guardar cambios",
    icon: "fa fa-eye"
  },
  collaborative: {
    id: "collaborative",
    title: "Colaborativo",
    description: "Otros usuarios podr\xE1n ver y guardar cambios el mapa",
    icon: "fa fa-users"
  },
  public: {
    id: "public",
    title: "P\xFAblico",
    description: "Visitantes externos podr\xE1n ver una versi\xF3n simplificada del mapa",
    icon: "fa fa-globe"
  }
};

// node_modules/@googlemaps/js-api-loader/dist/index.esm.js
var LoaderStatus;
(function(LoaderStatus2) {
  LoaderStatus2[LoaderStatus2["INITIALIZED"] = 0] = "INITIALIZED";
  LoaderStatus2[LoaderStatus2["LOADING"] = 1] = "LOADING";
  LoaderStatus2[LoaderStatus2["SUCCESS"] = 2] = "SUCCESS";
  LoaderStatus2[LoaderStatus2["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));

// src/js/property_map/public_map_modules/extendMapDataProtoType.ts
function extendMapDataProtoType() {
  let maps = google.maps;
  console.info({ googleMaps: maps });
  var MAP_PIN = "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z";
  var SQUARE_PIN = "M22-48h-44v43h16l6 5 6-5h16z";
  var SHIELD = "M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z";
  var ROUTE = "M24-28.3c-.2-13.3-7.9-18.5-8.3-18.7l-1.2-.8-1.2.8c-2 1.4-4.1 2-6.1 2-3.4 0-5.8-1.9-5.9-1.9l-1.3-1.1-1.3 1.1c-.1.1-2.5 1.9-5.9 1.9-2.1 0-4.1-.7-6.1-2l-1.2-.8-1.2.8c-.8.6-8 5.9-8.2 18.7-.2 1.1 2.9 22.2 23.9 28.3 22.9-6.7 24.1-26.9 24-28.3z";
  var SQUARE = "M-24-48h48v48h-48z";
  var SQUARE_ROUNDED = "M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z";
  var inherits = function(childCtor, parentCtor) {
    function tempCtor() {
    }
    ;
    tempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    childCtor.prototype.constructor = childCtor;
  };
  class MarkerLabel extends maps.OverlayView {
    constructor(options) {
      super();
      var self2 = this;
      this.setValues(options);
      this.div = document.createElement("div");
      this.div.className = "map-icon-label";
      maps.event.addDomListener(this.div, "click", function(e) {
        e.stopPropagation && e.stopPropagation();
        maps.event.trigger(self2.marker, "click");
      });
    }
    onAdd() {
      var pane = this.getPanes().overlayImage.appendChild(this.div);
      var self2 = this;
      this.listeners = [
        google.maps.event.addListener(this, "position_changed", function() {
          self2.draw();
        }),
        google.maps.event.addListener(this, "text_changed", function() {
          self2.draw();
        }),
        google.maps.event.addListener(this, "zindex_changed", function() {
          self2.draw();
        })
      ];
    }
    // Marker Label onRemove
    onRemove() {
      this.div.parentNode.removeChild(this.div);
      for (var i = 0, I = this.listeners.length; i < I; ++i) {
        google.maps.event.removeListener(this.listeners[i]);
      }
    }
    draw() {
      var projection = this.getProjection();
      var position = projection.fromLatLngToDivPixel(this.get("position"));
      var div = this.div;
      this.div.innerHTML = this.get("text").toString();
      div.style.zIndex = this.get("zIndex");
      div.style.position = "absolute";
      div.style.display = "block";
      div.style.left = position.x - div.offsetWidth / 2 + "px";
      div.style.top = position.y - div.offsetHeight + "px";
    }
  }
  ;
  maps.importLibrary("marker").then(() => {
    class Marker extends maps.Marker {
      constructor(options) {
        super();
        maps.Marker.apply(this, arguments);
        if (options.map_icon_label) {
          this.MarkerLabel = new MarkerLabel({
            map: this.map,
            marker: this,
            text: options.map_icon_label
          });
          this.MarkerLabel.bindTo("position", this, "position");
        }
      }
      setMap() {
        maps.Marker.prototype.setMap.apply(this, arguments);
        this.MarkerLabel && this.MarkerLabel.setMap.apply(this.MarkerLabel, arguments);
      }
    }
  });
  google.maps.Data.Feature.prototype.getCenter = function() {
    return this.getBounds().getCenter();
  };
  google.maps.Data.prototype.getBounds = function() {
    var featuresArray = [];
    var bounds = new google.maps.LatLngBounds();
    this.forEach(function(feature) {
      bounds.union(feature.getBounds());
    });
    return bounds;
  };
  google.maps.Data.Feature.prototype.getBounds = function() {
    const bounds = new google.maps.LatLngBounds();
    this.getGeometry().forEachLatLng(function(latLng) {
      bounds.extend(latLng);
    });
    return bounds;
  };
  google.maps.Data.Geometry.prototype.getBounds = function() {
    const bounds = new google.maps.LatLngBounds();
    this.forEachLatLng(function(latLng) {
      bounds.extend(latLng);
    });
    return bounds;
  };
  maps.Data.prototype.getBounds = function() {
    var featuresArray = [];
    var bounds = new maps.LatLngBounds();
    this.forEach(function(feature) {
      bounds.union(feature.getBounds());
    });
    return bounds;
  };
  maps.Data.prototype.removeFeatures = function() {
    this.forEach((feature) => {
      this.remove(feature);
    });
  };
  maps.Data.prototype.getArray = function() {
    const featuresArray = [];
    this.forEach(function(feature) {
      featuresArray.push(feature);
    });
    return featuresArray;
  };
  maps.Data.Feature.prototype.getProperties = function() {
    const properties = {};
    this.forEachProperty((value, name) => {
      properties[name] = value;
    });
    return properties;
  };
  maps.Data.prototype.getLength = function() {
    let length = 0;
    this.forEach(function(feature) {
      length++;
    });
    return length;
  };
  return maps;
}

// src/js/property_map/public_map_modules/iconSelector.ts
var import_tom_select = __toESM(require_tom_select_complete());

// src/js/property_map/public_map_modules/iconOptions.ts
var iconOptions = [
  //{ fontFamily: 'FontAwesome5Free', className: 'fas fa-house-user', text: '0f9' ,
  //{ fontFamily: 'LineIcons', className: 'lni lni-apartment', text: 'e800' },
  //{ fontFamily: 'LineIcons', className: 'lni lni-home', text: 'e800' },
  { fontFamily: "fontello", className: "icon-home", text: "e800" },
  { fontFamily: "fontello", className: "icon-home-1", text: "e801" },
  { fontFamily: "fontello", className: "icon-home-outline", text: "e802" },
  { fontFamily: "fontello", className: "icon-home-2", text: "e803" },
  { fontFamily: "fontello", className: "icon-home-3", text: "e804" },
  { fontFamily: "fontello", className: "icon-home-4", text: "e805" },
  { fontFamily: "fontello", className: "icon-home-5", text: "e806" },
  //{ fontFamily: 'fontello', className: 'icon-home-circled', text: 'e807' },
  //{ fontFamily: 'fontello', className: 'icon-iphone-home', text: 'e808' },
  //{ fontFamily: 'fontello', className: 'icon-tree', text: 'e809' },
  { fontFamily: "fontello", className: "icon-leaf", text: "e80a" },
  { fontFamily: "fontello", className: "icon-belowground-rail", text: "e80b" },
  //{ fontFamily: 'fontello', className: 'icon-bus-1', text: 'e80c' },
  //{ fontFamily: 'fontello', className: 'icon-basket', text: 'e80d' },
  //{ fontFamily: 'fontello', className: 'icon-basket-1', text: 'e80e' },
  { fontFamily: "fontello", className: "icon-commerical-building", text: "e811" },
  { fontFamily: "fontello", className: "icon-industrial-building", text: "e822" },
  { fontFamily: "fontello", className: "icon-school", text: "e834" },
  //{ fontFamily: 'fontello', className: 'icon-tree-2', text: 'e83f' },
  { fontFamily: "fontello", className: "icon-warehouse", text: "e840" },
  { fontFamily: "fontello", className: "icon-building", text: "f0f7" },
  { fontFamily: "fontello", className: "icon-graduation-cap", text: "f19d" },
  { fontFamily: "fontello", className: "icon-building-filled", text: "f1ad" },
  //{ fontFamily: 'fontello', className: 'icon-bus', text: 'f207' },
  { fontFamily: "fontello", className: "icon-train", text: "f238" },
  { fontFamily: "fontello", className: "icon-subway", text: "f239" },
  //{ fontFamily: 'fontello', className: 'icon-shopping-basket', text: 'f291' },
  //{ fontFamily: 'fontello', className: 'icon-spread', text: 'f527' },
  //{ fontFamily: 'fontello', className: 'icon-graduation-cap-2', text: 'e812' },
  { fontFamily: "fontello", className: "icon-college", text: "e813" },
  { fontFamily: "fontello", className: "icon-person", text: "e814" },
  { fontFamily: "fontello", className: "icon-child", text: "e815" },
  { fontFamily: "fontello", className: "icon-adult", text: "e816" }
].map((icon) => {
  icon.label = `${icon.fontFamily} ${icon.className.replace("lni ", "").replace("fas ", "")}`;
  return icon;
});

// src/js/property_map/PublicMapStore.ts
var PublicMapStore = class extends BaseClass {
  constructor() {
    super();
    this.map_name = null;
    this.map_description = null;
    this.sharing_level = null;
    this.map_type = null;
    this.layer_object = null;
    this.id = null;
    this.filter_id = null;
    this.user_id = null;
    this.sharingLevels = sharingLevels;
    this.PublicLayersObject = PublicLayersObject;
    this.map_sharing_level = "private";
    this.token = null;
    this.active_tab = "tabs-savemap";
    this.ready = false;
    this.layer_array = [];
    this.savedMaps = [];
    this.feature_collection = { type: "FeatureCollection", features: [] };
    this.layerSlugs = [];
    this.codigo_interno = null;
    this._customElementsMap = null;
    this.skipMapCreation = false;
    this.barrioLabels = [];
    this.full_map = false;
    this.no_labels = false;
    //@ts-ignore
    this.__$store = {
      tipos_busqueda: module_default8.store("tipos_busqueda"),
      columnas_actuales: module_default8.store("columnas_actuales"),
      campos_busqueda: module_default8.store("campos_busqueda"),
      negocios: module_default8.store("negocios"),
      roles_negocio: module_default8.store("roles_negocio"),
      active_filter: module_default8.store("active_filter"),
      user: module_default8.store("user")
    };
    this._$store = {
      tipos_busqueda: module_default8.store("tipos_busqueda"),
      columnas_actuales: module_default8.store("columnas_actuales"),
      campos_busqueda: module_default8.store("campos_busqueda"),
      negocios: module_default8.store("negocios"),
      roles_negocio: module_default8.store("roles_negocio"),
      active_filter: module_default8.store("active_filter"),
      user: module_default8.store("user")
    };
    this._console = bindConsole(this.className, this.classNameColor);
    this.exampleLayers = exampleLayers;
    this.url = new URL(window.location.href);
    let qs = this.url.searchParams;
    this.no_labels = qs.has("no_labels");
    this.no_infowindows = qs.has("no_infowindows");
    this.waitForGoogleMapsLoaded().then((maps) => {
      console.log("will extend prototype", maps);
      extendMapDataProtoType(maps);
      this.ready = true;
      this.processEventListeners("ready", maps);
    });
  }
  get customElementsMap() {
    return this._customElementsMap;
  }
  set customElementsMap(customElementsMap) {
    if (customElementsMap) {
      if (!this._customElementsMap)
        this._customElementsMap = customElementsMap;
      if (!this.ready)
        this.processEventListeners("ready", google.maps);
      globalThis.gmap = customElementsMap;
      this.processEventListeners("map_created", customElementsMap);
      this.marquee("received customElementsMap");
      if (this.codigo_interno) {
        this.marquee("setting center on codigo interno");
        let negocio = this.$store.negocios.get(this.codigo_interno);
        if (negocio) {
          let { lat, lng } = negocio;
          customElementsMap.setCenter({ lat, lng });
        }
      }
    }
  }
  get verifiers() {
    return {
      map_created: !!this.customElementsMap,
      ready: !!this.ready,
      layers_added: this.layer_array.length > 0
    };
  }
  getNameLabel(text = "", className = "markerLabel bg-white border radius-4 p-1  ") {
    return {
      text,
      color: "#444",
      fontSize: "14px",
      className
    };
  }
  async waitForGmStyleElement(selector, attempt = 0) {
    let gm = document.querySelector(selector);
    if (gm)
      return Promise.resolve(gm);
    return attempt > 10 ? Promise.reject(new Error("Cannot find an element with thaat elector")) : waitFor(300).then(() => this.waitForGmStyleElement(selector, attempt + 1));
  }
  setBarrioLabels(features) {
    this.barrioMarkers = /* @__PURE__ */ new Map();
    this.barrioLabels = features.map((feature) => {
      let { geometry, id, properties } = feature;
      let [lng, lat] = geometry.coordinates;
      return { position: { lng, lat }, id, name: properties.Nombre_de_Barrio };
    });
    if (this.no_labels)
      return;
    this.once("map_created", async (gmap) => {
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      if (this.full_map && this.skipMapCreation) {
        let gmElement = await this.waitForGmStyleElement(".gm-style");
        gmElement.classList.add("hide-labels");
        this.createClassicMarkers();
      } else {
        this.createAdvancedMarkers(AdvancedMarkerElement);
      }
    });
  }
  createClassicMarkers() {
    this.barrioLabels.forEach(({ id, position, name }) => {
      const priceTag = document.createElement("div");
      priceTag.className = " uppercase max-w-[125px] text-gray-500 visible_over_zoom_15 markerLabel_break_words markerLabel bg-gray-200   p-1 bg-opacity-50";
      priceTag.textContent = name;
      if (name) {
        const marker = new google.maps.Marker({
          map: globalThis.gmap,
          position,
          icon: {
            path: 1,
            scale: 5,
            strokeWeight: 2,
            strokeColor: "rgba(200,200,200,0)"
          },
          label: this.getNameLabel(name, priceTag.className)
        });
        this.barrioMarkers.set(String(id), marker);
      }
    });
  }
  createAdvancedMarkers(constructor) {
    console.warn(this.customElementsMap);
    this.barrioLabels.forEach(async ({ id, position, name }) => {
      const priceTag = document.createElement("div");
      priceTag.className = " uppercase max-w-[125px] visible_over_zoom_15 text-gray-500 markerLabel_break_words markerLabel bg-gray-50   p-1 bg-opacity-10";
      priceTag.textContent = name;
      priceTag.style.backgroundColor = "rgba(190,190,190,0.2)";
      const marker = new constructor({
        map: null,
        position,
        content: priceTag,
        title: name
      });
      this.barrioMarkers.set(String(id), marker);
    });
  }
  get markerArray() {
    return this.barrioMarkers ? Array.from(this.barrioMarkers.values()) : [];
  }
  async waitForGoogleMapsLoaded(attempt = 0) {
    let gmaps = globalThis.google && globalThis.google.maps;
    if (gmaps) {
      console.timerInfo("importing core and maps at attempt " + attempt);
      return gmaps.importLibrary("core").then(() => Promise.all([
        gmaps.importLibrary("maps"),
        gmaps.importLibrary("marker")
      ]));
    }
    if (attempt > 19) {
      return gmaps;
    }
    return waitFor(300).then(() => {
      console.timerInfo("google maps not found. Attempt " + attempt);
      return this.waitForGoogleMapsLoaded(attempt + 1);
    });
  }
  init() {
  }
  setCodigoInterno(codigo_interno) {
    this.codigo_interno = codigo_interno;
  }
  reloadSavedMaps(savedMaps) {
    this.savedMaps = savedMaps;
  }
  updateProperties(mapData) {
    let {
      filter_id,
      id,
      name,
      description,
      sharing_level,
      map_type,
      layer_object,
      user_id,
      map_status,
      feature_collection
    } = mapData || {};
    this.filter_id = filter_id;
    this.map_name = name;
    this.map_description = description;
    this.sharing_level = sharing_level;
    this.map_type = map_type;
    this.feature_collection = feature_collection || this.feature_collection;
    this.layer_object = id ? layer_object || this.PublicLayersObject : this.PublicLayersObject;
    if (map_status) {
      this.storedStatus = map_status;
    }
    this.id = id;
    this.user_id = user_id;
    if (!filter_id) {
      setTimeout(() => {
        this.filter_id = 157;
      }, 2e3);
    }
    return this;
  }
  get active_filter() {
    return this.filter_id;
  }
  set active_filter(filter_id) {
    if (filter_id !== this.filter_id) {
      console.zinfo("setting map filter id to " + filter_id);
      this.filter_id = filter_id;
    }
  }
  refreshSavedMaps() {
    return;
  }
  fetchPublicaciones() {
    module_default8.store("negocios").next_page_url = "https://maps.lacasadejuana.cl/api/publicaciones";
    module_default8.store("negocios").complete = false;
    return this.$store.negocios.restart().then((result) => {
      setTimeout(() => this.$store.negocios.total = this.$store.negocios.properties.length, 1e3);
      return result;
    });
  }
  get comunasOptions() {
    return Array.from(new Set(this.dealsWithCoords.map((d) => d.comuna)));
  }
  get dealsWithCoords() {
    return this.$store.negocios.properties.filter(
      ({ lat, lng, _extra_props }) => lat && lng && typeof lat === "number" && typeof lng === "number" || //@ts-ignore
      _extra_props?.lat && _extra_props?.lng && typeof _extra_props?.lat === "number" && typeof _extra_props?.lng === "number"
    );
  }
  get sharingLevelDescription() {
    return this.sharingLevels[this.map_sharing_level].description;
  }
  get dataLayers() {
    return this.layerSlugs.map(
      (slug_name) => globalThis.layerComponents[slug_name]
    );
  }
  get payload() {
    return {
      id: this.id,
      user_id: this.user_id || this.$store.user.id,
      last_modified_by: this.$store.user.id,
      filter_id: this.filter_id,
      name: this.map_name,
      description: this.map_description,
      sharing_level: this.map_sharing_level,
      layer_object: this.layer_object,
      map_status: this.storedStatus,
      feature_collection: this.feature_collection
    };
  }
  async saveLayer(slug_name, { layer_options }) {
    this.layer_object[slug_name].layer_options = layer_options;
  }
  get storedStatus() {
    const defaultMapStatus = {
      center: { lat: -33.415785, lng: -70.578539 },
      //mapTypeId: 'Grass',
      zoom: 13.1
    };
    const mapStatus = {
      ...defaultMapStatus
    };
    if (mapStatus.zoom)
      mapStatus.zoom = Number(Number(mapStatus.zoom).toFixed(1));
    if (mapStatus.center?.lat)
      mapStatus.center.lat = Number(
        Number(mapStatus.center.lat).toFixed(6)
      );
    if (mapStatus.center?.lng)
      mapStatus.center.lng = Number(
        Number(mapStatus.center.lng).toFixed(6)
      );
    return mapStatus;
  }
  set storedStatus(mapStatus) {
    mapStatus = mapStatus || {};
    mapStatus.mapTypeId = mapStatus.mapTypeId || "roadmap";
    if (mapStatus.zoom && mapStatus.center?.lat && mapStatus.center?.lng) {
      mapStatus.zoom = Number(Number(mapStatus.zoom).toFixed(1));
      mapStatus.center.lng = Number(
        Number(mapStatus.center.lng).toFixed(6)
      );
      mapStatus.center.lat = Number(
        Number(mapStatus.center.lat).toFixed(6)
      );
    }
  }
  pushLayer(options) {
    this.layer_array.push(options);
    this.layerSlugs.push(options.slug_name);
    return waitFor(200 + Math.random() * 150);
  }
  async createLayers(mapFrameData) {
    let initialLength = this.layer_array.length;
    const promises = Object.entries(this.layer_object).filter(([slug_name, layer]) => !layer.disabled).map(([slug_name, layer_options]) => {
      return this.pushLayer({ slug_name, name: layer_options.name || slug_name, ...layer_options });
    });
    return Promise.all(promises).then(() => {
      if (initialLength === 0) {
        this.processEventListeners("layers_added", this);
      }
    });
  }
  set $store($store2) {
    this._$store = $store2;
  }
  get $store() {
    return this._$store;
  }
};

// src/js/property_map/init_public_map.ts
module_default8.plugin(module_default5);
module_default8.plugin(module_default);
module_default8.plugin(module_default3);
module_default8.plugin(module_default2);
module_default8.plugin(module_default7);
module_default8.plugin(module_default4);
module_default8.plugin(module_default6);
globalThis.Alpine = module_default8;
if (!globalThis.storeCamposBusqueda) {
  const createAlpineStore = (name, factoryFn) => {
    if (module_default8.store(name))
      return module_default8.store(name);
    module_default8.store(name, factoryFn());
    return module_default8.store(name);
  };
  const storeCamposBusqueda = globalThis.storeCamposBusqueda = createAlpineStore("campos_busqueda", () => new CamposBusquedaStore());
  const storeNegocios = globalThis.storeNegocios = createAlpineStore("negocios", () => createNegociosStore());
  const storeColumnasActuales = globalThis.storeColumnasActuales = createAlpineStore("columnas_actuales", () => columnas_actuales());
  const storeActiveFilter = globalThis.storeActiveFilter = createAlpineStore("active_filter", () => new ActiveFilterStore());
  const storePublicMaps = globalThis.storePublicMaps = createAlpineStore("public_maps", () => new PublicMapStore());
  const camposBusquedaPromise = staticFetchWrapper(
    "/api/campos_formulario",
    {}
  ).then((res2) => {
    globalThis.camposBusquedaJson = res2;
    console.timerInfo("received camposBusquedaPromise result from sw");
    return globalThis.camposBusquedaJson;
  });
  const barrioLabelsJson = staticFetchWrapper(
    "/json/barrios_label.geojson",
    {}
  ).then((res2) => {
    globalThis.barrioLabelsJson = res2;
    console.timerInfo("received barrioLabelsJson result from sw");
    storePublicMaps.setBarrioLabels(res2.features);
    return globalThis.barrioLabelsJson;
  });
  globalThis.columnasVisiblesPromise = staticFetchWrapper(
    "/api/columnas_actuales",
    {}
  ).then((res2) => {
    globalThis.camposBusquedaJson = res2;
    console.timerInfo("received camposBusquedaPromise result from sw");
    return globalThis.camposBusquedaJson;
  });
  camposBusquedaPromise.then((campos) => {
    storeCamposBusqueda.reloadCampos(Object.values(campos), false);
    storePublicMaps.fetchPublicaciones();
  });
  storeCamposBusqueda.on("ready", () => {
    storeColumnasActuales.setDefaultColumns(storeCamposBusqueda.findMany(["id", "nombre"]));
    globalThis.columnasVisiblesPromise.then((columnasVisibles) => {
      storeColumnasActuales.reloadCampos(columnasVisibles, false);
      storeActiveFilter.ready = true;
    });
  });
}
/*! Bundled license information:

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)

tom-select/dist/js/tom-select.complete.js:
  (*! @orchidjs/unicode-variants | https://github.com/orchidjs/unicode-variants | Apache License (v2) *)
  (*! sifter.js | https://github.com/orchidjs/sifter.js | Apache License (v2) *)

@alpinejs/focus/dist/module.esm.js:
  (*! Bundled license information:
  
  tabbable/dist/index.esm.js:
    (*!
    * tabbable 5.3.3
    * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
    *)
  
  focus-trap/dist/focus-trap.esm.js:
    (*!
    * focus-trap 6.9.4
    * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
    *)
  *)

@googlemaps/js-api-loader/dist/index.esm.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
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
//# sourceMappingURL=init_public_map.js.map
