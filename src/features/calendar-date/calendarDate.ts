export type CalendarDate = {
  year: number;
  month: number;
  day: number;
};

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}

export function formatYearMonthDay(date: CalendarDate) {
  return `${date.year}/${twoDigits(date.month)}/${twoDigits(date.day)}`;
}

export function formatMonthDay(date: CalendarDate) {
  return `${twoDigits(date.month)}/${twoDigits(date.day)}`;
}
