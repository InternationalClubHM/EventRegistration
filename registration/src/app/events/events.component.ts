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
}
