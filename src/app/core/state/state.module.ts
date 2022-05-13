import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STATE_KEYS } from './state.config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class StateModule {
  static forFeature(stateKeys: string[]): ModuleWithProviders<NgModule> {
    return {
      ngModule: StateModule,
      providers: [{ provide: STATE_KEYS, useValue: stateKeys }],
    };
  }
}
