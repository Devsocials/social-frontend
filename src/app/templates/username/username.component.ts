import { Component, Input } from '@angular/core';

@Component({
  selector: 'username',
  templateUrl: './username.component.html',
  styleUrl: './username.component.css'
})
export class UsernameComponent {
  @Input() userName!: string;

}
