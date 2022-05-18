import { StateConfig } from 'src/app/core/state/state.config';
import { ApiGetReservationListReq } from './model/ApiGetReservationList';
import { Reservation } from './model/reservation';

const featureKey = 'reservation';

const initReservationList: Reservation[] = [];

const initReservationReq: ApiGetReservationListReq = {
  requestId: '',
};

interface ReservationState {
  reservationList: Reservation[];
  reservationReq: ApiGetReservationListReq;
}

const initReservatonState: ReservationState = {
  reservationList: initReservationList,
  reservationReq: initReservationReq,
};

export const stateConfig: StateConfig = {
  featureKey: featureKey,
  initState: initReservatonState,
};
