import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventNames: string[] = [];
  eventDates: string[] = [];
  eventLinks: string[] = [];

  constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.http.get('assets/events.txt', { responseType: 'text' })
    .subscribe(data => {
      const lines = data.split('\n');
      lines.forEach(line => {
        if (line.trim() !== '') {
          const [eventName, eventDate, eventLink] = line.split(';');
          this.eventNames.push(eventName);
          this.eventDates.push(eventDate);
          this.eventLinks.push(eventLink);
        }
      });
    });
}

  renderEventName(eventName: string, eventLink: string): string {
    if (eventLink.startsWith('link-zu-event')) {
      return eventName;
    } else {
      return `<a href="${eventLink}" target="_blank">${eventName}</a>`;
    }
  }

  openEventLink(link: string): void {
    window.open(link, '_blank');
  }
}
