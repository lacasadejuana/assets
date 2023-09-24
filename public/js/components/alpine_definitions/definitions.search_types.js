const IN = '1';
const NOT_IN = '2';
const LIKE = '3';
const NOT_LIKE = '4';
const GREATER_THAN = '5';
const LESS_THAN = '6';
const GREATER_THAN_OR_EQUAL = '7';
const LESS_THAN_OR_EQUAL = '8';
const IS_NULL = '13';
const IS_NOT_NULL = '14';
const BETWEEN = '15';
const NOT_BETWEEN = '16';
const IS_BEFORE = '17';
const IS_AFTER = '18';
const JSON_CONTAINS = '19';
const JSON_NOT_CONTAINS = '20';
const IS_EQUAL = '21';
const IS_NOT_EQUAL = '22';
const HAS_ATTACHMENTS = '23';
const IN_RANGE = '25';
export const search_types = {
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
export var VSearchType;
(function (VSearchType) {
    VSearchType["BETWEEN"] = "15";
    VSearchType["GREATER_THAN"] = "5";
    VSearchType["GREATER_THAN_OR_EQUAL"] = "7";
    VSearchType["HAS_ATTACHMENTS"] = "23";
    VSearchType["IN_RANGE"] = "25";
    VSearchType["IS_AFTER"] = "18";
    VSearchType["IS_BEFORE"] = "17";
    VSearchType["IS_EQUAL"] = "21";
    VSearchType["IS_NOT_EQUAL"] = "22";
    VSearchType["IS_NOT_NULL"] = "14";
    VSearchType["IS_NULL"] = "13";
    VSearchType["JSON_CONTAINS"] = "19";
    VSearchType["JSON_NOT_CONTAINS"] = "20";
    VSearchType["LESS_THAN"] = "6";
    VSearchType["LESS_THAN_OR_EQUAL"] = "8";
    VSearchType["LIKE"] = "3";
    VSearchType["NOT_BETWEEN"] = "16";
    VSearchType["NOT_IN"] = "2";
    VSearchType["NOT_LIKE"] = "4";
    VSearchType["IN"] = "1";
})(VSearchType || (VSearchType = {}));
;
export const VTypeSearch = Object.entries(VSearchType).reduce((a, [k, v]) => ({ ...a, [v]: k }), {});
//# sourceMappingURL=definitions.search_types.js.map