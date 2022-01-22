import { DayOfWeek } from "./interfaces";

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
