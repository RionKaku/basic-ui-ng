import { InjectionToken } from '@angular/core';

export interface StateConfig {
  featureKey: string;
  initState: Object;
}

export const STATE_CONF = new InjectionToken<StateConfig>('state.conf');
