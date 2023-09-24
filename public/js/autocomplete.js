/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./resources/js/autocomplete.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAutoCompleter": () => (/* binding */ createAutoCompleter),
/* harmony export */   "fillInAddress": () => (/* binding */ fillInAddress)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/// <reference types="google.maps" />
function fillInAddress(place) {
  // optional parameter
  var addressNameFormat = {
    street_number: "short_name",
    route: "long_name",
    locality: "long_name",
    administrative_area_level_1: "short_name",
    country: "long_name",
    postal_code: "short_name"
  };
  var componentForm = ["address", "locality", "administrative_area_level_1", "country", "postal_code"];

  var getAddressComp = function getAddressComp(type) {
    var _iterator = _createForOfIteratorHelper(place.address_components),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var component = _step.value;

        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return "";
  };

  document.getElementById("address").value = [getAddressComp("route"), getAddressComp("street_number")].join(" ");

  for (var _i = 0, _componentForm = componentForm; _i < _componentForm.length; _i++) {
    var component = _componentForm[_i];

    // Location field is handled separately above as it has different logic.
    if (component !== "address") {
      document.getElementById(component).value = getAddressComp(component);
    }
  }

  var calleYNumero = {
    calle: getAddressComp("route"),
    numeroCalleStr: getAddressComp("street_number")
  };
  return calleYNumero;
}
function createAutoCompleter(_ref) {
  var map = _ref.map,
      $theForm = _ref.$theForm,
      autocompleteInput = _ref.autocompleteInput,
      autocompleteOptions = _ref.autocompleteOptions;
  var geocoder = new google.maps.Geocoder();

  var geocode = function geocode(request) {
    geocoder.geocode(request).then(function (_ref2) {
      var results = _ref2.results;
      if (!results) return {}; //results.forEach(result => console.log({ result }));

      var resultFirst = results[0];
      map.setCenter(resultFirst.geometry.location);
      globalThis.marker.setPosition(resultFirst.geometry.location);
      globalThis.marker.setMap(map); //    console.log(resultFirst);

      fillInAddress(resultFirst);
      return resultFirst;
    })["catch"](function (e) {
      alert("Geocode was not successful for the following reason: " + e);
      return {};
    });
  };

  console.info({
    autocompleteOptions: autocompleteOptions
  });
  var autocomplete = globalThis.autocomplete || new google.maps.places.Autocomplete(autocompleteInput, autocompleteOptions);
  autocomplete.addListener("place_changed", function () {
    var place = globalThis.autocomplete.getPlace();

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No existe información georreferenciada para: '" + place.name + "'");
      return;
    }

    console.log({
      place: place
    });
    map.setCenter(place.geometry.location);
    var address_obj = place.address_components.reduce(function (accum, entry) {
      var key = entry.types[0];
      accum[key] = entry.short_name;
      $theForm.set("propiedad_attr-".concat(key), entry.short_name);
      return accum;
    }, {}); //@ts-ignore

    var _map$getCenter$toJSON = map.getCenter().toJSON(),
        lat = _map$getCenter$toJSON.lat,
        lng = _map$getCenter$toJSON.lng;

    var coordinates = {
      lat: Number(Number(lat).toFixed(6)),
      lng: Number(Number(lng).toFixed(6))
    }; //geocode({ location: place.geometry.location });

    $theForm.set('negocio_attr-coordenadas-mapa', JSON.stringify(coordinates));
    $theForm.set('propiedad-lat', coordinates.lat);
    $theForm.set('propiedad-lng', coordinates.lng);
    var flattenedResult = fillInAddress(place) || {
      calle: '',
      numeroCalleStr: ''
    };
    var calle = flattenedResult.calle,
        numeroCalleStr = flattenedResult.numeroCalleStr;
    console.info({
      place: place,
      flattenedResult: flattenedResult
    }); //geocode(place.formatted_address)

    globalThis.marker.setPosition(map.getCenter());
    fetch("https://worker.juana.house/coords/".concat(lng, "/").concat(lat)).then(function (res) {
      return res.json();
    }).then(function (barrioFeature) {
      if (!barrioFeature || !barrioFeature.properties || !barrioFeature.properties.Nombre_de_Barrio) return;

      var _ref3 = barrioFeature.properties || {},
          Nombre_de_Barrio = _ref3.Nombre_de_Barrio,
          codigo = _ref3.codigo;

      $('#barrio').val(Nombre_de_Barrio).parent().removeClass('empty_neighborhood');
      $theForm.set('propiedad_attr-barrio', Nombre_de_Barrio);
      barrioFeature.properties = _objectSpread({
        calle: calle,
        numeroCalleStr: numeroCalleStr
      }, barrioFeature.properties);
      if (codigo && calle && numeroCalleStr) return fetch("https://worker.juana.house/".concat(codigo, "/").concat(calle, "/").concat(numeroCalleStr)).then(function (res) {
        return res.json();
      }).then(function (propFeature) {
        return console.log({
          propFeature: propFeature
        });
      });
      console.log({
        barrioFeature: barrioFeature
      });
    });
  });
  globalThis.geocoder = geocoder;
  globalThis.geocode = geocode;
  globalThis.autocomplete = autocomplete;
  return {
    autocomplete: autocomplete,
    geocoder: geocoder,
    geocode: geocode
  };
}
/******/ })()
;