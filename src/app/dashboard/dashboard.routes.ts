import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [],
    // canActivate: [ AuthGuardService ]
  }
];


export const DASH_ROUTE = RouterModule.forChild(routes);
