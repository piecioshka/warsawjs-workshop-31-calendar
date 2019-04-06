
const dayjs = require('dayjs');

/**
 * @param {string} month — Miesiąc. Przykład: 2019-04
 * @returns {Array<string>}
 */
function buildCalendar(month) {
    const date = new Date(month);

    const from = dayjs(dayjs(date).startOf('month').startOf('week').toDate());

    const calendarWidth = 7;
    const calendarHeight = 6;
    return Array
        .from({ length: calendarWidth * calendarHeight })
        .map((_, index) => from.add(index + 1, 'day').toString());
}

/**
 * @param {string} date - Data w formacie DateString
 * @returns {Object}
 */
function getRangeDay(date) {
    const start = dayjs(date).startOf('day').format('YYYY-MM-DDTHH:mm');
    const end = dayjs(date).endOf('day').format('YYYY-MM-DDTHH:mm');
    return { start, end };
}

module.exports = {
    buildCalendar,
    getRangeDay
};
