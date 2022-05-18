import { ServiceRequest } from './Request';

export interface ApiGetRequestListReq {
  requestId: string;
  userName: string;
}

export interface ApiGetRequestListRes {
  page: number;
  limit: number;
  total: number;
  data: ServiceRequest[];
}
