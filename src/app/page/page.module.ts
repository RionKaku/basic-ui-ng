import { NgModule } from '@angular/core';
import { PageRoutingModule } from './page-routing.module';
import { IndexModule } from './index/index.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RequestModule } from '../feature/request/request.module';
import { ReservationModule } from '../feature/reservation/reservation.module';

@NgModule({
  declarations: [],
  imports: [
    PageRoutingModule,
    IndexModule,
    DashboardModule,
    RequestModule,
    ReservationModule,
  ],
})
export class PageModule {}
