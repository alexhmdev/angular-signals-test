import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
})
export class CharacterCardComponent {
  // standalone component that receives a character as input
  @Input() character: Character | undefined;
}
