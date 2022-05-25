import { StateConfig } from 'src/app/core/state/state.config';
import { ApiGetReservationListReq } from './model/ApiGetReservationList';
import { Reservation } from './model/reservation';

export const ReservationStateConst = {
  featureKey: 'reservation',
  reservationList: 'reservationList',
  reservationReq: 'reservationReq',
};

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
  featureKey: ReservationStateConst.featureKey,
  initState: initReservatonState,
};
