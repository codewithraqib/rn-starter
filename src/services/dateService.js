import {Platform} from 'react-native';
import CommonService from './commonService';

const monthDaysName = {
  sun: 'dom',
  mon: 'lun',
  tue: 'mar',
  wed: 'mié',
  thu: 'jue',
  fri: 'vie',
  sat: 'sáb',

  sunday2: 'do',
  monday2: 'lu',
  tuesday2: 'ma',
  wednesday2: 'mi',
  thursday2: 'ju',
  friday2: 'vi',
  saturday2: 'sá',

  sunday: 'domingo',
  monday: 'lunes',
  tuesday: 'martes',
  wednesday: 'miércoles',
  thursday: 'jueves',
  friday: 'viernes',
  saturday: 'sábado',

  sunday_full: 'domingo',
  monday_full: 'lunes',
  tuesday_full: 'martes',
  wednesday_full: 'miércoles',
  thursday_full: 'jueves',
  friday_full: 'viernes',
  saturday_full: 'sábado',
  depart_on: 'Fecha de ida',

  jan: 'enero',
  feb: 'febrero',
  mar: 'marzo',
  apr: 'abril',
  may: 'mayo',
  jun: 'junio',
  jul: 'julio',
  aug: 'agosto',
  sep: 'septiembre',
  oct: 'octubre',
  nov: 'noviembre',
  dec: 'diciembre',

  jan_half: 'ene',
  feb_half: 'feb',
  mar_half: 'mar',
  apr_half: 'abr',
  may_half: 'may',
  jun_half: 'jun',
  jul_half: 'jul',
  aug_half: 'ago',
  sep_half: 'sep',
  oct_half: 'oct',
  nov_half: 'nov',
  dec_half: 'dic',
};
const datePostfix = Platform.OS === 'android' ? 'T00:00:00' : 'T00:00:00';

const DateService = {
  getCurrentTimeUTC: () => {
    var d = new Date();
    return +((d.getTime() - d.getTimezoneOffset() * 60000) / 1000).toFixed(0);
  },
  getCurrentTimeInSeconds: () => {
    var d = new Date();
    return +d.getTime();
  },
  getCurrentTimeInActualSeconds: () => {
    var d = new Date();
    return +(d.getTime() / 1000).toFixed(0);
  },
  translateDays: days => {
    if (days) {
      let dArr = days.split(',');
      let dayTrans = [];
      for (let d of dArr) {
        dayTrans.push(CommonService.capitalize(monthDaysName[d]));
      }
      return dayTrans.join(', ');
    }
    return '';
  },
  getFormattedDateHome: (d, format) => {
    try {
      if (!d) {
        return '';
      }
      let date = new Date(d);
      let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      let month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1);
      let year = date.getFullYear();
      if (format) {
        return format
          .replace('dd', day)
          .replace('mm', month)
          .replace('yyyy', year);
      }
      return day + '-' + month + '-' + year;
    } catch (e) {}
  },
  getTodayString: (format = 'dd-mm-yyyy') => {
    let d = new Date();
    format = format.replace('dd', DateService.preZero(d.getDate()));
    format = format.replace('mm', DateService.preZero(d.getMonth() + 1));
    format = format.replace('yyyy', d.getFullYear());
    return format;
  },
  getTimeInSeconds: date => {
    // console.log('Timezone offset', new Date().getTimezoneOffset() * 60);

    return (
      new Date(date).getTime() / 1000 - new Date().getTimezoneOffset() * 60
    );
  },
  getFormattedDate: (d, format, dateObj = false) => {
    try {
      if (!d) {
        return '';
      }
      let doo = dateObj ? d : new Date(Date.parse(d + datePostfix));
      let date = new Date(
        doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
      );
      let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      let month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1);
      let year = date.getFullYear();
      if (format) {
        return format
          .replace('dd', day)
          .replace('mm', month)
          .replace('yyyy', year);
      }
      return day + '-' + month + '-' + year;
    } catch (e) {}
  },
  getUTCDate: () => {
    var tmLoc = new Date();
    let date = +(
      (tmLoc.getTime() + Math.abs(tmLoc.getTimezoneOffset() * 60000)) /
      1000
    ).toFixed(0);
    return new Date(date);
  },
  getToday: () => {
    try {
      let date = new Date();
      let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      let month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1);
      let year = date.getFullYear();
      return year + '-' + month + '-' + day;
    } catch (e) {}
  },
  changeDateFormat: (
    date,
    fromFormat = 'dd/mm/yyyy',
    toFormat = 'mm-dd-yyyy',
  ) => {
    if (date) {
      let d, m, y;

      if (fromFormat == 'dd/mm/yyyy' || fromFormat == 'dd-mm-yyyy') {
        d = date.substr(0, 2);
        m = date.substr(3, 2);
        y = date.substr(6, 4);
      } else if (fromFormat == 'mm/dd/yyyy' || fromFormat == 'mm-dd-yyyy') {
        m = date.substr(0, 2);
        d = date.substr(3, 2);
        y = date.substr(6, 4);
      } else if (fromFormat == 'yyyy/mm/dd' || fromFormat == 'yyyy-mm-dd') {
        y = date.substr(0, 4);
        m = date.substr(5, 2);
        d = date.substr(8, 2);
      }
      return toFormat
        .replace('dd', d)
        .replace('mm', m)
        .replace('yyyy', y);
    }
    return '';
  },
  addDate: (date, number) => {
    if (date) {
      var doo = new Date(
        new Date(Date.parse(date + datePostfix)).getTime() +
          number * 24 * 60 * 60 * 1000,
      );
      let d = new Date(
        doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
      );
      let day = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
      let month =
        d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
      let year = d.getFullYear();
      return year + '-' + month + '-' + day;
    }
  },
  getServiceHeaderDateFormat: (date, showYear = true, halfMonth = false) => {
    if (date) {
      var doo = new Date(Date.parse(date + datePostfix));
      let d = new Date(
        doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
      );
      let day = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
      let month =
        d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
      let year = d.getFullYear();
      return (
        DateService.getDayname(d.getDay()) +
        ', ' +
        day +
        ' ' +
        DateService.getMonthName(d.getMonth(), !halfMonth ? 'full' : 'half') +
        ' ' +
        (showYear ? year : '')
      );
    }
  },
  changeDateFormatMonth: (
    date,
    fromFormat = 'mm/dd/yyyy',
    type = 'half',
    toFormat = 'dd-mm-yyyy',
  ) => {
    let d = 0,
      m = 0,
      y = 0;

    if (fromFormat == 'dd/mm/yyyy' || fromFormat == 'dd-mm-yyyy') {
      d = +date.substr(0, 2);
      m = +date.substr(3, 2);
      y = +date.substr(6, 4);
    } else if (fromFormat == 'mm/dd/yyyy' || fromFormat == 'mm-dd-yyyy') {
      m = +date.substr(0, 2);
      d = +date.substr(3, 2);
      y = +date.substr(6, 4);
    } else if (fromFormat == 'yyyy/mm/dd' || fromFormat == 'yyyy-mm-dd') {
      y = +date.substr(0, 4);
      m = +date.substr(5, 2);
      d = +date.substr(8, 2);
    }
    toFormat = toFormat.replace(/yyyy/g, y);
    toFormat = toFormat.replace(/mm/g, DateService.getMonthName(m - 1, 'half'));
    toFormat = toFormat.replace(/dd/g, d > 9 ? d : '0' + d);
    return toFormat;
  },
  getMonthName: (month, type = 'half') => {
    let monthName;
    switch (month) {
      case 0:
        monthName = type == 'half' ? 'jan_half' : 'jan';
        break;
      case 1:
        monthName = type == 'half' ? 'feb_half' : 'feb';
        break;
      case 2:
        monthName = type == 'half' ? 'mar_half' : 'mar';
        break;
      case 3:
        monthName = type == 'half' ? 'apr_half' : 'apr';
        break;
      case 4:
        monthName = type == 'half' ? 'may_half' : 'may';
        break;
      case 5:
        monthName = type == 'half' ? 'jun_half' : 'jun';
        break;
      case 6:
        monthName = type == 'half' ? 'jul_half' : 'jul';
        break;
      case 7:
        monthName = type == 'half' ? 'aug_half' : 'aug';
        break;
      case 8:
        monthName = type == 'half' ? 'sep_half' : 'sep';
        break;
      case 9:
        monthName = type == 'half' ? 'oct_half' : 'oct';
        break;
      case 10:
        monthName = type == 'half' ? 'nov_half' : 'nov';
        break;
      case 11:
        monthName = type == 'half' ? 'dec_half' : 'dec';
        break;
      default:
        monthName = type == 'half' ? 'jan_half' : 'jan';
        break;
    }
    return CommonService.capitalize(monthDaysName[monthName]);
  },
  getDayname: (day, type = 'half') => {
    let dayName;
    switch (day) {
      case 0:
        dayName = type == 'half' ? 'sun' : 'sunday_full';
        break;
      case 1:
        dayName = type == 'half' ? 'mon' : 'monday_full';
        break;
      case 2:
        dayName = type == 'half' ? 'tue' : 'tuesday_full';
        break;
      case 3:
        dayName = type == 'half' ? 'wed' : 'wednesday_full';
        break;
      case 4:
        dayName = type == 'half' ? 'thu' : 'thursday_full';
        break;
      case 5:
        dayName = type == 'half' ? 'fri' : 'friday_full';
        break;
      case 6:
        dayName = type == 'half' ? 'sat' : 'saturday_full';
        break;
      default:
        dayName = type == 'half' ? 'sun' : 'sunday_full';
        break;
    }
    return CommonService.capitalize(monthDaysName[dayName]);
  },
  getDayNameFromDate: (date, format = 'dd/mm/yyyy', type = 'half') => {
    let d = DateService.changeDateFormat(date, format, 'yyyy-mm-dd');
    if (!d) {
      return '';
    }
    let doo = new Date(Date.parse(d + datePostfix));
    let dt = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
    );
    let day = dt.getDay();
    return DateService.getDayname(day, type);
  },

  getMonthNameFromDate: (date, format = 'dd/mm/yyyy', type = 'half') => {
    let d = DateService.changeDateFormat(date, format, 'yyyy-mm-dd');
    if (!d) {
      return '';
    }
    let doo = new Date(Date.parse(d + datePostfix));
    let dt = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
    );
    let month = dt.getMonth();
    return DateService.getMonthName(month, type);
  },

  getYearFromDate: (date, format = 'dd/mm/yyyy') => {
    let d = DateService.changeDateFormat(date, format, 'yyyy-mm-dd');
    if (!d) {
      return '';
    }
    let doo = new Date(Date.parse(d + datePostfix));
    let dt = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
    );
    let year = dt.getFullYear();
    return year;
  },

  getMonthYearFromDate: (date, format = 'dd/mm/yyyy') => {
    let d = DateService.changeDateFormat(date, format, 'yyyy-mm-dd');
    if (!d) {
      return '';
    }
    let doo = new Date(Date.parse(d + datePostfix));
    let dt = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
    );
    let month =
      dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1);
    let monYear = month + '-' + dt.getFullYear();
    return monYear;
  },

  getDateFromDate: (date, format = 'dd/mm/yyyy') => {
    let d = DateService.changeDateFormat(date, format, 'yyyy-mm-dd');
    if (!d) {
      return '';
    }
    let doo = new Date(Date.parse(d + datePostfix));
    let dt = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
    );
    let day = dt.getDate();
    return day > 9 ? day : '0' + day;
  },
  getMonthFromDate: (date, format = 'dd/mm/yyyy') => {
    let d = DateService.changeDateFormat(date, format, 'yyyy-mm-dd');
    if (!d) {
      return '';
    }
    let doo = new Date(Date.parse(d + datePostfix));
    let dt = new Date(
      doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000),
    );
    let month = dt.getMonth() + 1;
    return month > 9 ? month : '0' + month;
  },

  getVirtualMoneyListDateFromDate: (date, fromFormat = 'dd/mm/yyyy') => {
    let d = 0,
      m = 0,
      y = 0;
    if (fromFormat == 'dd/mm/yyyy' || fromFormat == 'dd-mm-yyyy') {
      d = date.substr(0, 2);
      m = date.substr(3, 2);
      y = date.substr(6, 4);
    } else if (fromFormat == 'mm/dd/yyyy' || fromFormat == 'mm-dd-yyyy') {
      m = date.substr(0, 2);
      d = date.substr(3, 2);
      y = date.substr(6, 4);
    } else if (fromFormat == 'yyyy/mm/dd' || fromFormat == 'yyyy-mm-dd') {
      y = date.substr(0, 4);
      m = date.substr(5, 2);
      d = date.substr(8, 2);
    }
    return d + ' de ' + DateService.getMonthName(+m - 1) + ' de ' + y;
  },

  ampm: (time, time24Format = true) => {
    if (time24Format) {
      if (time < '12:00') {
        return time + ' AM';
      }
      return time + ' PM';
    }
    return '';
  },

  ampmOnly: (time, time24Format) => {
    if (time < '12:00') {
      return 'AM';
    }
    return 'PM';
  },

  convertToUTC: date => {
    var tmLoc = new Date(date);
    return +(
      (tmLoc.getTime() + Math.abs(tmLoc.getTimezoneOffset() * 60000)) /
      1000
    ).toFixed(0);
  },
  getUTC: date => {
    var tmLoc = new Date();
    return +(
      (tmLoc.getTime() + Math.abs(tmLoc.getTimezoneOffset() * 60000)) /
      1000
    ).toFixed(0);
  },
  getTime: (d, showAmPm = true) => {
    return (
      DateService.preZero(d.getHours()) +
      ':' +
      DateService.preZero(d.getMinutes()) +
      (showAmPm ? (d.getHours() >= 12 ? ' PM' : ' AM') : '')
    );
  },
  convertTime12to24: time12h => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${DateService.preZero(+hours)}:${DateService.preZero(+minutes)}`;
  },
  convert24to12: time => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  },
  getCurrentHour: (format12 = true) => {
    var d = new Date();
    var h = d.getHours();
    if (h < 12) {
      return DateService.preZero(h);
    }
    return format12
      ? DateService.preZero(h % 12 || 12)
      : DateService.preZero(h);
  },
  getCurrentMinute: () => {
    var d = new Date();
    var m = d.getMinutes();
    return DateService.preZero(m);
  },
  getCurrentMpPm: () => {
    var d = new Date();
    var h = d.getHours();
    if (h < 12) {
      return 'AM';
    }
    return 'PM';
  },
  getCurrentTime: (format12 = true) => {
    var d = new Date();
    var time =
      DateService.preZero(d.getHours()) +
      ':' +
      DateService.preZero(d.getMinutes()) +
      ':' +
      DateService.preZero(d.getSeconds());
    if (format12) {
      return DateService.convert24to12(time);
    }
  },
  convertUTCDateToLocalDate: date => {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000,
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  },
  convertUTCTimestampToLocalTimestamp: date => {
    var d = new Date();
    var newDate = new Date(date - d.getTimezoneOffset() * 60 * 1000);

    return newDate;
  },
  getServiceItemDate: (date, format = 'yyyy-mm-dd') => {
    let dayName = DateService.getDayNameFromDate(date, format);
    let day = DateService.getDateFromDate(date, format);
    let month = DateService.getMonthFromDate(date, format);
    return dayName + ' ' + day + '/' + month;
  },
  preZero: n => {
    if (n > 9) {
      return n;
    }
    return '0' + n;
  },
  getMyTripsDateFormat: (
    date,
    format = 'yyyy-mm-dd',
    showDe = true,
    showYear = true,
  ) => {
    return `${DateService.getDayNameFromDate(
      date,
      format,
    )}, ${DateService.getDateFromDate(date, format)} ${
      showDe ? 'de' : ''
    } ${DateService.getMonthNameFromDate(date, format, 'full')} ${
      showDe ? 'de' : ''
    } ${showYear ? DateService.getYearFromDate(date, format) : ''}`;
  },
};

export default DateService;
