import { Routes } from '@angular/router';
import { TimelineComponent } from '../../components/timeline/timeline.component';

export const TimelienRoutes: Routes = [
  { path: '**', component: TimelineComponent },
  { path: '', component: TimelineComponent },
];
