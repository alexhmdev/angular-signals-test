# Angular 16 signals!

Signals in Angular are here!

> Since Angular 16 they added signals as a developer preview function
> and we are using it as an example to fetch data when the signal changes

In this example we fetch data from the Rick and Morty API when the user changes the characterName

```typescript
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
``

```
