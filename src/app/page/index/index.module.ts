import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './component/index/index.component';
import { ReservationModule } from 'src/app/feature/reservation/reservation.module';
import { RequestModule } from 'src/app/feature/request/request.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [SharedModule, IndexRoutingModule, RequestModule, ReservationModule],
})
export class IndexModule {}
