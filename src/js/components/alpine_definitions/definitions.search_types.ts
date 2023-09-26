

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
const IN_RANGE = '25'
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

export enum VSearchType {
    BETWEEN = '15',
    GREATER_THAN = '5',
    GREATER_THAN_OR_EQUAL = '7',
    HAS_ATTACHMENTS = '23',
    IN_RANGE = '25',
    IS_AFTER = '18',
    IS_BEFORE = '17',
    IS_EQUAL = '21',
    IS_NOT_EQUAL = '22',
    IS_NOT_NULL = '14',
    IS_NULL = '13',
    JSON_CONTAINS = '19',
    JSON_NOT_CONTAINS = '20',
    LESS_THAN = '6',
    LESS_THAN_OR_EQUAL = '8',
    LIKE = '3',
    NOT_BETWEEN = '16',
    NOT_IN = '2',
    NOT_LIKE = '4',
    IN = '1',


};
export const VTypeSearch = Object.entries(VSearchType).reduce((a, [k, v]) => ({ ...a, [v]: k }), {} as Record<VSearchType, string>);
