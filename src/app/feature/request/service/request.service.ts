import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/core/state/service/state.service';
import { ApiGetRequestListReq } from '../model/ApiGetRequestList';
import { RequestState, RequestStateConst } from '../request.state';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private stateService: StateService) {}

  public get request$(): Observable<ApiGetRequestListReq> {
    return this.stateService.getState$(
      RequestStateConst.featureKey,
      RequestStateConst.requestReq
    );
  }

  public get requestList$(): Observable<ApiGetRequestListReq> {
    return this.stateService.getState$(
      RequestStateConst.featureKey,
      RequestStateConst.requestList
    );
  }

  public get requestAll$(): Observable<RequestState> {
    return this.stateService.getState$(RequestStateConst.featureKey);
  }

  update(patchValue: any) {
    this.stateService.patchState(
      RequestStateConst.featureKey,
      RequestStateConst.requestReq,
      patchValue,
      (state: RequestState): RequestState => {
        return {
          ...state,
          [RequestStateConst.requestReq]: patchValue,
        };
      }
    );
  }
}
