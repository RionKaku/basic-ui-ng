import { Reservation } from './reservation';

export interface ApiGetReservationListReq {
  requestId: string;
}

export interface ApiGetReservationListRes {
  page: number;
  data: Reservation[];
}
