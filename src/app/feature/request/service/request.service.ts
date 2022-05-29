import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/core/state/service/state.service';
import { ApiGetRequestListReq } from '../model/ApiGetRequestList';
import { ServiceRequest } from '../model/Request';
import { RequestStateConst } from '../request.state';

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

  public get requestList$(): Observable<ServiceRequest> {
    return this.stateService.getState$(
      RequestStateConst.featureKey,
      RequestStateConst.requestList
    );
  }

  update(patchValue: ApiGetRequestListReq) {
    this.stateService.patchState(
      RequestStateConst.featureKey,
      RequestStateConst.requestReq,
      (): ApiGetRequestListReq => {
        return {
          requestId: 'llll',
          userName: 'rion3333',
        };
      }
    );
  }
}
