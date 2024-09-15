import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventNames: string[] = [];
  eventDates: string[] = [];
  eventLinks: string[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('assets/events.txt', {responseType: 'text'})
      .subscribe(data => {
        const lines = data.split('\n');
        lines.forEach(line => {
          if (line.trim() !== '') {
            const [eventName, eventDate, eventLink] = line.trim().split(';');
            this.eventNames.push(eventName);
            this.eventDates.push(eventDate);
            this.eventLinks.push(eventLink);
          }
        });
      });
  }

  // Build objects of date objects for each supplied date
  getDates(dateString: string): Array<Date> {
    return dateString
      .trim()
      .split("-")
      .map((string) => string.trim().split("."))
      .map((dateArr) => new Date(parseInt(dateArr[2]), parseInt(dateArr[1]) - 1, parseInt(dateArr[0]))); // Build a date object from year, month and day
  }

  // Reads the date and builds a nice readable text of the date or timespan
  buildDateString(dates: Array<Date>) {
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
    window.open(link, '_blank');
  }

  protected readonly Date = Date;
}
