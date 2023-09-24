export var InputType;
(function (InputType) {
    InputType["Date"] = "date";
    InputType["DateTime"] = "dateTime";
    InputType["Number"] = "number";
    InputType["Select"] = "select";
    InputType["Text"] = "text";
})(InputType || (InputType = {}));
export const INPUT_SELECT = '1';
export const INPUT_TEXT = '2';
const INPUT_TEXT_AREA = '4';
export const INPUT_DATE = '5';
export const INPUT_DATE_TIME = '6';
export const INPUT_NUMBER = '7';
const INPUT_CHECKBOX = '8';
const INPUT_SELECT_MULTIPLE = '9';
const INPUT_CONTACTO_ASOCIADO = '10';
const INPUT_SOLICITUDES_ASOCIADAS = '11';
const INPUT_STATIC_PARAMS = '12';
const INPUT_MULTIPLE_ATTRIBUTES = '13';
const INPUT_RADIO_BUTTONGROUP = '14';
export const INPUT_TYPES = {
    INPUT_SELECT,
    INPUT_TEXT,
    INPUT_TEXT_AREA,
    INPUT_DATE,
    INPUT_DATE_TIME,
    INPUT_NUMBER,
    INPUT_CHECKBOX,
    INPUT_SELECT_MULTIPLE,
    INPUT_CONTACTO_ASOCIADO,
    INPUT_SOLICITUDES_ASOCIADAS,
    INPUT_STATIC_PARAMS,
    INPUT_MULTIPLE_ATTRIBUTES,
    INPUT_RADIO_BUTTONGROUP,
};
export var VInputType;
(function (VInputType) {
    VInputType["INPUT_SELECT"] = "1";
    VInputType["INPUT_TEXT"] = "2";
    VInputType["INPUT_TEXT_AREA"] = "4";
    VInputType["INPUT_DATE"] = "5";
    VInputType["INPUT_DATE_TIME"] = "6";
    VInputType["INPUT_NUMBER"] = "7";
    VInputType["INPUT_CHECKBOX"] = "8";
    VInputType["INPUT_SELECT_MULTIPLE"] = "9";
    VInputType["INPUT_CONTACTO_ASOCIADO"] = "10";
    VInputType["INPUT_SOLICITUDES_ASOCIADAS"] = "11";
    VInputType["INPUT_STATIC_PARAMS"] = "12";
    VInputType["INPUT_MULTIPLE_ATTRIBUTES"] = "13";
    VInputType["INPUT_RADIO_BUTTONGROUP"] = "14";
})(VInputType || (VInputType = {}));
export const VInputTypeIcons = {
    '1': 'fas fa-list-ul',
    '2': 'lni lni-text-align-justify',
    '4': 'lni lni-text-format',
    '5': 'far fa-calendar',
    '6': 'far fa-calendar-alt',
    '7': 'fas fa-hashtag',
    '8': 'far fa-check-square',
    '9': 'fas fa-list',
    '10': 'far fa-address-book',
    '11': 'fas fa-passport',
    '12': 'fas fa-list-ul',
    '13': 'fas fa-list',
    '14': 'fas fa-list-ul',
};
//# sourceMappingURL=definitions.input_types.js.map