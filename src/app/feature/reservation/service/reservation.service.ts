import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/core/state/service/state.service';
import { ApiGetReservationListReq } from '../model/ApiGetReservationList';
import { ReservationStateConst } from '../reservation.state';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private stateService: StateService) {}

  public get reservation$(): Observable<ApiGetReservationListReq> {
    return this.stateService.getState$(
      ReservationStateConst.featureKey,
      ReservationStateConst.reservationReq
    );
  }
}
