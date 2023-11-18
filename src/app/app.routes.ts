import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';

export const AppRoutes: Routes = [
  {
    path: 'timeline',
    loadChildren: () =>
      import('./modules/timeline/timeline.module').then(
        (m) => m.TimelineModule
      ),
  },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent },
];
