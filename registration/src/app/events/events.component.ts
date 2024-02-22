import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  eventNames: string[] = [
    'Bavarian Brunch',
    'City Rallye',
    'Residenz',
    'Schloss Neuschwanstein',
    'Bodensee Boat Trip',
    'Tour Olympic Roofs',
    'Tour Olympic Roofs',
    'TBA',
    'Zugspitze',
    'BERLIN weekend trip',
    'Rafting',
    'KZ Dachau (Concentration Camp)',
    'Hiking (Partnachklamm)',
    'Summer sledding',
    'High Ropes Course',
    'Last Event: Standup-Paddeling at a lake with BBQ'
  ];

  eventDates: string[] = [
    'Saturday, 9th of March 2024',
    'Saturday, 16th of March 2024',
    'tba',
    'Saturday, 13th of April 2024',
    'Saturday, 20th of April 2024',
    'tba',
    'tba',
    'tba',
    'Saturday 11th of May 2024',
    'Friday 17th of May - Monday 20th of May',
    'Saturday 18th of May 2024',
    'tba',
    'Saturday 8th of June 2024',
    'Saturday 15th of June 2024',
    'Saturday 22nd of June 2024',
    'Saturday 29th of June 2024'
  ];

  eventLinks: string[] = [
    'link-zu-event-2',
    'link-zu-event-3',
    'link-zu-event-1',
    'https://forms.gle/ro6zWEdFdfALpr5G6',
    'link-zu-event-3',
    'link-zu-event-1',
    'link-zu-event-2',
    'link-zu-event-3',
    'link-zu-event-1',
    'link-zu-event-2',
    'link-zu-event-3',
    'link-zu-event-2',
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
