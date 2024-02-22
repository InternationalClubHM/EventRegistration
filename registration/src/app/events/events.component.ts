// events.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  eventNames: string[] = ['Orientation Days',
                          'Bavarian Brunch',
                          'Stadttour/CityRallye',
                          'Residenz',
                          'Schloss Neuschwanstein',
                          'Lindau-Insel Bodensee Schifffahrt',
                          'Tour Olympia-Dächer',
                          'Tour Olympia-Dächer',
                          'Sailing',
                          'Zugspitze',
                          'BERLIN',
                          'Wildwasserrafting',
                          'KZ Dachau',
                          'Wandern (Partnachklamm)',
                          'Sommerrodeln',
                          'Klettergarten',
                          'Abschlussevent Standup-Paddeling mit Grillen an einem See'];

                          eventDates: string[] = [
                              '01.01.24',
                              '02.01.24',
                              '03.01.24',
                              '01.01.24',
                              '02.01.24',
                              '03.01.24',
                              '01.01.24',
                              '02.01.24',
                              '03.01.24',
                              '01.01.24',
                              '02.01.24',
                              '03.01.24',
                              '02.01.24',
                              '03.01.24',
                              '01.01.24',
                              '02.01.24',
                              '03.01.24',
                            ];

                            eventLinks: string[] = [
                                'link-zu-event-1',
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
                                'link-zu-event-3',
                              ];
}
