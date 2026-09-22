import { errorsText, HOUR_IN_MILLISECONDS } from './constants.js';

class DateProcessor {
  constructor(date) {
    // Проверяем полученную дату на корректность в момент создания объекта
    this.handleErrors(date);
    this.date = new Date(date);
  }

  // Обработка ошибок с более подробным описанием ошибки
  handleErrors(date) {
    switch (true) {
      case date.trim() === '':
        throw new Error(errorsText.noInput);
      case typeof date !== 'string':
        throw new Error(errorsText.invalidDate);
      case date.length !== 10:
        throw new Error(errorsText.invalidDateFormat);
      case new Date(isNaN(date)):
        throw new Error(errorsText.invalidDateObject);
      default:
        return true;
    }
  }

  processDateComplex(includeTime = false, extraOffset = 0, config = {}) {
    const offset = config.offsetHours || 0;
    const format = config.format || 'ISO';

    let resultDate = new Date(
      this.date.getTime() + (offset + extraOffset) * HOUR_IN_MILLISECONDS,
    );

    if (includeTime) {
      return `${resultDate.toLocaleDateString()} ${resultDate.toLocaleTimeString()}`;
    }

    // Switch на мой взгляд более читаемый и поддерживаемый код, чем if-else
    switch (format) {
      case 'ISO':
        return resultDate.toISOString();
      case 'UTC':
        return resultDate.toUTCString();
      case 'LOCAL':
        return resultDate.toLocaleString();
      default:
        return resultDate.toString();
    }
  }

  formatDateShort() {
    const day = this.date.getDate().toString().padStart(2, '0');
    const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
    const year = this.date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatDateLong() {
    const day = this.date.getDate().toString().padStart(2, '0');
    const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
    const year = this.date.getFullYear();
    return `${day} - ${month} - ${year}`;
  }

  // Понятная ошибка в случае неверного типа данных
  capitalizeDateString(str) {
    if (typeof str !== 'string') throw new Error(errorsText.invalidInput);
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  isWeekend() {
    const day = this.date.getDay();
    return day === 0 || day === 6;
  }
}
