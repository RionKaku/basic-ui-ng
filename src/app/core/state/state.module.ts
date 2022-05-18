import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateConfig, STATE_KEYS } from './state.config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class StateModule {
  static forFeature(stateKeys: StateConfig): ModuleWithProviders<NgModule> {
    return {
      ngModule: StateModule,
      providers: [{ provide: STATE_KEYS, useValue: stateKeys, multi: true }],
    };
  }
}
