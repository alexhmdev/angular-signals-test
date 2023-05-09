import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Character, CharactersData } from './models/character.model';
import { CharacterCardComponent } from './components/character-card/character-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    CharacterCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular signals 📶';
  // inject the HttpClient service
  httpClient = inject(HttpClient);

  // create a signal to store the list of characters
  charactersList = signal<Character[]>([]);
  // create a signal to store the character name to search in the API
  characterName = signal('');
  constructor() {
    // invoke the effect functio to fetch character data when the characterName signal changes
    effect(() => {
      console.log('Character name:', this.characterName());
      this.searchCharacter();
    });
  }

  ngOnInit() {
    this.httpClient
      .get<CharactersData>('https://rickandmortyapi.com/api/character')
      .subscribe((data) => {
        this.charactersList.set(data.results);
      });
  }
  // create a function to fetch character data
  searchCharacter() {
    this.httpClient
      .get<CharactersData>(
        `https://rickandmortyapi.com/api/character/?name=${this.characterName()}`
      )
      .subscribe((data) => {
        this.charactersList.set(data.results);
      });
  }
  // create a function to set the character name using the set function of the signal
  setName(event: any) {
    this.characterName.set(event.target.value);
  }
}
