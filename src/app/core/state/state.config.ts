import { InjectionToken } from '@angular/core';

const DEFAULT_STATE_KEY = 'state';

export type stateKeys = string[];

export const STATE_KEYS = new InjectionToken<stateKeys>('state.keys');

export const DEFAULT_STATE_KEYS: stateKeys = [DEFAULT_STATE_KEY];
