import { DASH_ROUTE } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent],
  imports: [
    CommonModule,
    DASH_ROUTE
  ]
})
export class DashboardModule { }
