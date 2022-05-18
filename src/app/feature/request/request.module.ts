import { NgModule } from '@angular/core';
import { StateModule } from 'src/app/core/state/state.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestIndexComponent } from './component/request-index/request-index.component';
import { stateConfig } from './request.state';

@NgModule({
  declarations: [RequestIndexComponent],
  imports: [SharedModule, StateModule.forFeature(stateConfig)],
  exports: [RequestIndexComponent],
})
export class RequestModule {}
