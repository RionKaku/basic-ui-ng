import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pluck, throwError } from 'rxjs';
import { STATE_KEYS } from '../state.config';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _states: Map<string, any> = new Map();
  private _states$: any;

  constructor(@Inject(STATE_KEYS) config: string) {
    console.warn(config);
  }

  createState(key: string, initState: any): void {
    if (!this._states.has(key)) {
      this._states.set(key, initState);
      this._states$ = new BehaviorSubject(this._states.get(key));
    }
  }

  getState(stateKey: string, key: string): Observable<any> {
    if (this._states.has(stateKey) && key in this._states.get(stateKey)) {
      return this._states$.pipe(pluck(key));
    } else {
      return throwError(() => {
        return new Error('Not key');
      });
    }
  }
}
