import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isBlank } from 'src/app/util/string';
import { StateConfig, STATE_CONF } from '../state.config';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _state: Map<string, Map<string, any>> = new Map();

  constructor(@Inject(STATE_CONF) @Optional() stateConfig: StateConfig[]) {
    stateConfig.forEach((eachState) => {
      const featureKey = eachState.featureKey;
      const initState = eachState.initState;
      if (!isBlank(featureKey) && !this._state.has(featureKey)) {
        this._state.set(
          featureKey,
          new Map(
            Object.entries(initState).map(([k, v]) => {
              return [k, v];
            })
          )
        );
      }
    });
  }

  getState$(featureKey: string, feature: string): Observable<any> {
    if (!isBlank(feature) && this._state.has(featureKey)) {
      const tartgetStatemap = this._state.get(featureKey) as Map<string, any>;
      if (
        tartgetStatemap.has(feature) &&
        !(tartgetStatemap.get(feature) instanceof BehaviorSubject)
      ) {
        tartgetStatemap.set(
          feature,
          new BehaviorSubject(tartgetStatemap.get(feature))
        );
      }
      return tartgetStatemap.get(feature);
    } else {
      return of();
    }
  }

  patchState(featureKey: string, feature: string, value: any) {
    if (
      this._state.has(featureKey) &&
      this._state.get(featureKey)?.has(feature) &&
      this._state.get(featureKey)?.get(feature) instanceof BehaviorSubject
    ) {
      this._state.get(featureKey)?.get(feature).next(value);
    }
  }
}
