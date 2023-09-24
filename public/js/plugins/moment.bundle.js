//@ts-nocheck
import moment from 'moment';
//import 'moment/locale/es'
import 'moment-timezone';
globalThis.moment = moment;
function createLocaleEs(momentInstance) {
    //! momentInstance.js locale configuration
    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'), monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'), monthsParse = [
        /^ene/i,
        /^feb/i,
        /^mar/i,
        /^abr/i,
        /^may/i,
        /^jun/i,
        /^jul/i,
        /^ago/i,
        /^sep/i,
        /^oct/i,
        /^nov/i,
        /^dic/i,
    ], monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
    var es = momentInstance.defineLocale('es', {
        months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort: function (m, format) {
            if (!m) {
                return monthsShortDot;
            }
            else if (/-MMM-/.test(format)) {
                return monthsShort[m.month()];
            }
            else {
                return monthsShortDot[m.month()];
            }
        },
        monthsRegex: monthsRegex,
        monthsShortRegex: monthsRegex,
        monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse: monthsParse,
        longMonthsParse: monthsParse,
        shortMonthsParse: monthsParse,
        weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY H:mm',
            LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm',
        },
        calendar: {
            sameDay: function () {
                return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            nextDay: function () {
                return '[mañana a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            nextWeek: function () {
                return 'dddd [a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            lastDay: function () {
                return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            lastWeek: function () {
                return ('[el] dddd [pasado a la' +
                    (this.hours() !== 1 ? 's' : '') +
                    '] LT');
            },
            sameElse: 'L',
        },
        relativeTime: {
            future: 'en %s',
            past: 'hace %s',
            s: 'unos segundos',
            ss: '%d segundos',
            m: 'un minuto',
            mm: '%d minutos',
            h: 'una hora',
            hh: '%d horas',
            d: 'un día',
            dd: '%d días',
            w: 'una semana',
            ww: '%d semanas',
            M: 'un mes',
            MM: '%d meses',
            y: 'un año',
            yy: '%d años',
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1,
            doy: 4, // The week that contains Jan 4th is the first week of the year.
        },
        invalidDate: 'Fecha inválida',
    });
    return es;
}
const es = createLocaleEs(moment);
export { moment };
export function getMinScheduleableDate() {
    const tomorrowAt8Am = moment().endOf('day').add(8, 'hour').add(1, 'minute'), todayAt8Am = moment().startOf('day').add(8, 'hour').add(1, 'minute'), in1Hour = moment().add(15, 'minute'), currentHour = moment().hour();
    // The soonest possible is exactly one hour from now.
    // It can't be earlier than 8AM (so, before 7AM, 8AM is the fixed minimum)
    // It can't be after 22:00 (so after 21:00, 8AM of the next day becomes the next minimum)
    return currentHour >= 21
        ? tomorrowAt8Am
        : currentHour < 7
            ? todayAt8Am
            : in1Hour;
}
export function parseMySqlDate(dateStr, tz = 'America/Santiago', debug = false) {
    const dateRegex = /^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})$/;
    let parsed;
    //is input date had format DD-MM-YYYY HH:mm
    if (dateRegex.test(dateStr)) {
        //parse it as if it was in UTC
        let asUTC = dateStr.replace(dateRegex, '$3-$2-$1T$4:$5:00Z');
        parsed = moment(asUTC);
        //then optionally convert it to specified timezone (defaults to America/Santiago)
        if (parsed.tz) {
            if (debug)
                console.info(`parsing ${dateStr} as ${asUTC} on tz ${tz}`);
            parsed = parsed.tz(tz);
        }
    }
    else {
        parsed = moment(new Date(dateStr));
    }
    return parsed;
}
moment.prototype.parseAsUTC = function (dateStr) {
    const dateRegex = /^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})$/;
    let parsed = moment(new Date(dateStr));
    if (dateRegex.test(dateStr)) {
        parsed = moment(dateStr.replace(dateRegex, '$3-$2-$1T$4:$5:00Z'));
    }
    return parsed;
};
moment.prototype.parseAsCLT = function (dateStr) {
    const dateRegex = /^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})$/;
    let parsed = moment(new Date(dateStr));
    if (dateRegex.test(dateStr)) {
        parsed = moment(dateStr.replace(dateRegex, '$3-$2-$1 $4:$5:00'));
    }
    return parsed;
};
export default moment;
//# sourceMappingURL=moment.bundle.js.map