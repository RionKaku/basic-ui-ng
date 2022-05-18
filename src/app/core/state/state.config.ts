import { InjectionToken } from '@angular/core';

export interface StateConfig {
  featureKey: string;
  initState: Object;
}

export const STATE_KEYS = new InjectionToken<StateConfig>('state.keys');
