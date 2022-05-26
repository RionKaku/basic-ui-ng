import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { isBlank } from 'src/app/util/string';
import { StateConfig, STATE_CONF } from '../state.config';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _state: Map<string, Map<string, BehaviorSubject<any>>> = new Map();

  constructor(@Inject(STATE_CONF) @Optional() stateConfig: StateConfig[]) {
    stateConfig.forEach((eachState) => {
      const featureKey = eachState.featureKey;
      const initState = eachState.initState;
      if (!isBlank(featureKey) && !this._state.has(featureKey)) {
        this._state.set(
          featureKey,
          new Map([[featureKey, new BehaviorSubject(initState)]])
        );
      }
    });
  }

  private getSnapshot<T>(featureKey: string): T {
    let _resSnapShot: any;
    if (this._state.has(featureKey)) {
      this._state
        .get(featureKey)
        ?.get(featureKey)
        ?.pipe(take(1))
        .subscribe((res) => {
          _resSnapShot = res;
        });
      return _resSnapShot;
    } else {
      return {} as T;
    }
  }

  getState$(featureKey: string, feature?: string): BehaviorSubject<any> {
    if (isBlank(feature) && this._state.has(featureKey)) {
      return this._state
        .get(featureKey)
        ?.get(featureKey) as BehaviorSubject<any>;
    } else if (this._state.has(featureKey) && typeof feature == 'string') {
      const currentMap = this._state.get(featureKey);
      if (!currentMap?.has(feature)) {
        currentMap
          ?.get(featureKey)
          ?.pipe(take(1))
          .subscribe((initStateVal) => {
            currentMap?.set(
              feature,
              new BehaviorSubject(initStateVal[feature])
            );
          });
      }
      return currentMap?.get(feature) as BehaviorSubject<any>;
    } else {
      return new BehaviorSubject(null);
    }
  }

  patchState<T>(featureKey: string, feature: string, patchValue: any) {
    if (this._state.has(featureKey)) {
      const _snapShot: T = this.getSnapshot(featureKey);
      this._state
        .get(featureKey)
        ?.get(featureKey)
        ?.next({
          ..._snapShot,
          feature: patchValue,
        });
      this._state.get(featureKey)?.get(feature)?.next(patchValue);
    }
  }
}
