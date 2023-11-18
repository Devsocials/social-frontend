import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  count$: Observable<number>;
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

}
