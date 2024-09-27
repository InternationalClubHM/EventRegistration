import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Event {
  name: string,
  dates: Date[],
  link: string
}

interface CalendarInfo {
  month: string,
  days: { currentMonth: boolean, today: boolean, date: Date, event: Event | undefined }[]
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})

export class EventsComponent implements OnInit {
  events: Event[] = [];
  currentCalendar: CalendarInfo | undefined = undefined
  currentCalendarIndex = 0
  calendarShowing = false

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('assets/events.txt', {responseType: 'text'})
      .subscribe(data => {
        const lines = data.split('\n');
        lines.forEach(line => {
          if (line.trim() !== '') {
            const [eventName, eventDate, eventLink] = line.trim().split(';');

            this.events.push({
              name: eventName,
              dates: this.getDates(eventDate),
              link: eventLink,
            })

            this.currentCalendar = this.getCalendar(this.currentCalendarIndex)
          }
        });
      });
  }

  updateCalendarIndex(addition: number) {
    this.currentCalendarIndex += addition;
    this.currentCalendar = this.getCalendar(this.currentCalendarIndex)
  }

  // Build objects of date objects for each supplied date
  getDates(dateString: string): Date[] {
    return dateString
      .trim()
      .split("-")
      .map((string) => string.trim().split("."))
      .map((dateArr) => new Date(parseInt(dateArr[2]), parseInt(dateArr[1]) - 1, parseInt(dateArr[0]))); // Build a date object from year, month and day
  }

  // Reads the date and builds a nice readable text of the date or timespan
  buildDateString(dates: Date[]) {
    // Returns the correct suffix for a day, for example 1'st', 2'nd', 3'rd'
    const nthNumber = (number: number) => {
      if (number > 3 && number < 21) return "th";
      switch (number % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    let dateInfo = dates.map((date) => {
      let weekday = date.toLocaleString("en-EN", {weekday: "long"});
      let day = date.getDate();
      let suffix = nthNumber(day);
      let month = date.toLocaleString("en-EN", {month: "long"});
      let year = date.getFullYear();

      return {
        dayInfo: `${weekday}, ${day}${suffix}`,
        month: month,
        year: year,
      };
    });

    let date1 = dateInfo[0];
    let date2 = dateInfo[1];

    if (dateInfo.length === 1) {
      // Just one date supplied
      return `${date1.dayInfo} of ${date1.month} ${date1.year}`;
    }

    // Two dates supplied

    if (date1.month !== date2.month) {
      // The months differ
      return `${date1.dayInfo} of ${date1.month} - ${date2.dayInfo} of ${date2.month} ${date2.year}`;
    }

    // The months are the same
    return `${date1.dayInfo} - ${date2.dayInfo} of ${date2.month} ${date2.year}`;
  }

  dateInFuture(date: Date) {
    return (new Date() < date)
  }


  openEventLink(link: string): void {
    if (link != '') {
      window.open(link, '_blank');
    }
  }

  // Gets a calendar plan for a month, for each day the information if it's in the current month, if it's today and the event on that day
  getCalendar(monthIndex: number): CalendarInfo { // monthIndex === 0 -> current month. -1 means last month and 1 means next month

    const isSameDay = (day1: Date, day2: Date): boolean => {
      return day1.getDate() == day2.getDate() && day1.getMonth() == day2.getMonth() && day1.getFullYear() == day2.getFullYear()
    }

    // Returns if the day is today and the event on that day
    const getInformationForDay = (date: Date, currentMonth: boolean): {
      currentMonth: boolean,
      today: boolean,
      date: Date,
      event: Event | undefined
    } => {
      const isToday = isSameDay(date, new Date())

      // Either same day OR second (if exists) date is the same day OR the first date is not in the future but the second is
      let eventFound = this.events.find(event =>
        isSameDay(event.dates[0], date) ||
        (event.dates[1] && (isSameDay(event.dates[1], date) || (event.dates[0] < date && event.dates[1] > date))));

      return {
        currentMonth: currentMonth,
        today: isToday,
        date: date, // Copy the date
        event: eventFound
      }
    }

    let firstDayOfMonth = new Date(); // Create a new date, which will be updated to the first day of the specific month

    // Set the current month by the monthIndex
    firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() + monthIndex);

    // Just some information about the current month
    let month = firstDayOfMonth.toLocaleString("en-EN", {month: "long"});
    let year = firstDayOfMonth.getFullYear()

    firstDayOfMonth.setDate(1) // Set to first day of month
    let daysFirstWeekButLastMonth = (firstDayOfMonth.getDay() + 6) % 7 // How many weekdays are in the first week but the month before

    let days = []

    // Add days before the month
    for (let i = daysFirstWeekButLastMonth; i > 0; i--) {
      let newDate = new Date(firstDayOfMonth.getTime());
      newDate.setDate(firstDayOfMonth.getDate() - i);
      days.push(getInformationForDay(newDate, false))
    }

    // Add days of that month
    const lastDayOfMonth = new Date(firstDayOfMonth.getTime()); // Copy the firstDayOfMonth
    lastDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1); // Move by one month
    lastDayOfMonth.setDate(firstDayOfMonth.getDate() - 1); // Go one day back to get the last day of the month before
    let daysInMonth = lastDayOfMonth.getDate()
    for (let i = 0; i < daysInMonth; i++) {
      let newDate = new Date(firstDayOfMonth.getTime())
      newDate.setDate(firstDayOfMonth.getDate() + i)
      days.push(getInformationForDay(newDate, true));
    }


    // Add days after the month
    let daysLastWeekButNextMonth = 6 - (lastDayOfMonth.getDay() + 6) % 7; // + 6 mod 7 because: Sunday - Saturday equals 0 - 6 for getDay()
    for (let i = 0; i < daysLastWeekButNextMonth; i++) {
      // Iterate over every day in the month after but same week as the last week in the current month
      let newDate = new Date(lastDayOfMonth.getTime())
      newDate.setDate(lastDayOfMonth.getDate() + 1 + i); // + 1 to get the first day of the next month
      days.push(getInformationForDay(newDate, false));
    }

    return {
      month: `${month} ${year}`,
      days: days
    }
  }
}
