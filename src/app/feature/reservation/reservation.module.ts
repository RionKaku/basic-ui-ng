import { NgModule } from '@angular/core';
import { StateModule } from 'src/app/core/state/state.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { stateConfig } from './reservation.state';

@NgModule({
  declarations: [],
  imports: [SharedModule, StateModule.forFeature(stateConfig)],
})
export class ReservationModule {}
