import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimelienRoutes } from './timeline.routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(TimelienRoutes)],
})
export class TimelineModule {}
