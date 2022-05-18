import { StateConfig } from 'src/app/core/state/state.config';
import { ApiGetRequestListReq } from './model/ApiGetRequestList';
import { ServiceRequest } from './model/Request';

export const RequestConst = {
  featureKey: 'request',
};
export type RequestConst = typeof RequestConst[keyof typeof RequestConst];

const requestList: ServiceRequest[] = [];

const requestReq: ApiGetRequestListReq = {
  requestId: '',
  userName: '',
};

/**
 * Request State Interface
 */
export interface RequestState {
  requestList: ServiceRequest[];
  requestReq: ApiGetRequestListReq;
}
/**
 * Request State Init
 */
const requestState: RequestState = {
  requestList: requestList,
  requestReq: requestReq,
};
/**
 * Export State Config
 */
export const stateConfig: StateConfig = {
  featureKey: RequestConst.featureKey,
  initState: requestState,
};
