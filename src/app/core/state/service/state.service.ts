import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, pluck, take, throwError } from 'rxjs';
import { isBlank } from 'src/app/util/string';
import { StateConfig, STATE_KEYS } from '../state.config';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _state: Map<string, BehaviorSubject<Object>> = new Map();

  constructor(@Inject(STATE_KEYS) @Optional() stateConfig: StateConfig[]) {
    stateConfig.forEach((eachState) => {
      const featureKey = eachState.featureKey;
      const initState = eachState.initState;
      if (!isBlank(featureKey) && !this._state.has(featureKey)) {
        this._state.set(featureKey, new BehaviorSubject(initState));
      }
    });
  }

  private getSnapshot<T>(featureKey: string): T {
    let _resSnapShot: any;
    if (this._state.has(featureKey)) {
      this._state
        .get(featureKey)
        ?.pipe(take(1))
        .subscribe((res) => {
          _resSnapShot = res;
        });
      return _resSnapShot;
    } else {
      return {} as T;
    }
  }

  getState(featureKey: string, feature?: string): Observable<any> {
    if (isBlank(feature) && this._state.has(featureKey)) {
      return this._state.get(featureKey) as BehaviorSubject<Object>;
    } else if (this._state.has(featureKey)) {
      return this._state
        .get(featureKey)
        ?.pipe(pluck(feature as string)) as Observable<any>;
    } else {
      return throwError(() => {
        return new Error('state not found.');
      });
    }
  }

  patchState<T>(featureKey: string, fn: (state: T) => T) {
    if (this._state.has(featureKey)) {
      const _snapShot: T = this.getSnapshot(featureKey);
      this._state.get(featureKey)?.next(fn(_snapShot));
    }
  }
}
