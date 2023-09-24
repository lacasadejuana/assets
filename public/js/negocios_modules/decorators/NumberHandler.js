import NumberFormatParse from 'number-format-parse';
export class NumberHandler {
    constructor(locale, formatterConfig) {
        this.locale = locale;
        this.formatterConfig = formatterConfig;
        this.formatParse = new NumberFormatParse(locale, formatterConfig);
    }
    stringify(num) {
        return this.formatParse.stringify(num);
    }
    parse(str) {
        return this.formatParse.parse(str);
    }
    numberToString(num) {
        return this.formatParse.stringify(typeof num === 'number' ? num : this.strToNumber(num));
    }
    strToNumber(val) {
        if (typeof val === 'number')
            return val;
        if (val === null || val === undefined)
            return 0;
        let parsedNumber = this.formatParse.parse(String(val).replace(/,$/, ',0'));
        return isNaN(parsedNumber) ? 0 : parsedNumber;
    }
}
//# sourceMappingURL=NumberHandler.js.map