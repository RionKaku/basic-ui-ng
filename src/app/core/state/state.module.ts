import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateConfig, STATE_CONF } from './state.config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class StateModule {
  static forFeature(stateConfig: StateConfig): ModuleWithProviders<NgModule> {
    return {
      ngModule: StateModule,
      providers: [{ provide: STATE_CONF, useValue: stateConfig, multi: true }],
    };
  }
}
