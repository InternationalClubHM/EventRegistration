import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  eventNames: string[] = [
    'Bavarian Brunch',
    'City Rally',
    'Residenz',
    'Schloss Neuschwanstein',
    'Bodensee Boat Trip',
    'Tour Olympic Roofs',
    'Tour Olympic Roofs',
    'Sailing',
    'Zugspitze',
    'Rafting',
    'Dachau Memorial',
    'Hiking (Partnachklamm)',
    'Summer Sledding',
    'High Ropes Course',
    'Last Event: Standup-Paddeling at a lake with BBQ'
  ];

  eventDates: string[] = [
    'Saturday, 9th of March 2024',
    'Saturday, 16th of March 2024',
    'Saturday, 30th of March 2024',
    'Saturday, 13th of April 2024',
    'Saturday, 20th of April 2024',
    'Saturday, 27th of April 2024',
    'Sunday, 28th of April 2024',
    'Saturday 4th of May 2024',
    'Saturday 11th of May 2024',
    'Saturday 18th of May 2024',
    'Saturday, 25th of May 2024',
    'Saturday 8th of June 2024',
    'Saturday 15th of June 2024',
    'Saturday 22nd of June 2024',
    'Saturday 29th of June 2024'
  ];

  eventLinks: string[] = [
    'https://forms.gle/NSfaSj9MCsJSHNXB7',
    'https://forms.gle/GzhxL169Ty94Uxin8',
    'link-zu-event-1',
    'link-zu-event-1',
    'link-zu-event-3',
    'link-zu-event-1',
    'link-zu-event-2',
    'link-zu-event-1',
    'link-zu-event-2',
    'link-zu-event-3',
    'https://forms.gle/gbhBg3HeXsUrvUWz9',
    'link-zu-event-3',
    'link-zu-event-1',
    'link-zu-event-2',
    'link-zu-event-3'
  ];

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
