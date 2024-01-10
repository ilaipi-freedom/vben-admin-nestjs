import { format, formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';

export const timeZone = 'Asia/Shanghai';

export const fmtISO = (date: Date, tz?: string) =>
  date
    ? format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone: tz || timeZone })
    : undefined;

export const fmtBy = (date: Date, fmt: string) =>
  date ? formatInTimeZone(date, timeZone, fmt) : undefined;

export const utc = (date: string, tz?: string) =>
  date ? zonedTimeToUtc(date, tz || timeZone) : null;
