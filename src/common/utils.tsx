import { DayOfWeek, StartEndTime } from "./interfaces";

export const getDayOfWeekString = (day: DayOfWeek) => {
  switch (day) {
    case DayOfWeek.Sunday:
      return "Sunday";
    case DayOfWeek.Monday:
      return "Monday";
    case DayOfWeek.Tuesday:
      return "Tuesday";
    case DayOfWeek.Wednesday:
      return "Wednesday";
    case DayOfWeek.Thursday:
      return "Thursday";
    case DayOfWeek.Friday:
      return "Friday";
    case DayOfWeek.Saturday:
      return "Saturday";
    default:
      return "";
  }
};

interface ShiftTimeProps {
  startTime: number;
  endTime: number;
}

const getHourFromTimeNumber = (timeNumber: number) => {
  const timeNumberMilitary = timeNumber / 100;
  const hourNumber = timeNumberMilitary > 12 ? timeNumberMilitary - 12 : timeNumberMilitary;
  return hourNumber;
}
export const ShiftTime: React.FC<ShiftTimeProps> = ({ startTime, endTime }) => {
  const start = `${getHourFromTimeNumber(startTime)}${startTime < 1200 ? "am" : "pm"
    }`;
  const end = `${getHourFromTimeNumber(endTime)}${endTime < 1200 ? "am" : "pm"
    }`;
  return <span>{start} - {end}</span>
}

export type DayTimeString = string;
export const createDayShiftTimeStringKey = (day: DayOfWeek, time: StartEndTime) => {
  return `${day}-${time.startTime}-${time.endTime}`;
}