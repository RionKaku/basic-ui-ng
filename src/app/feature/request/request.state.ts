import { StateConfig } from 'src/app/core/state/state.config';
import { ApiGetRequestListReq } from './model/ApiGetRequestList';
import { ServiceRequest } from './model/Request';

export const RequestStateConst = {
  featureKey: 'request',
  requestList: 'requestList',
  requestReq: 'requestReq',
};
export type RequestStateConst =
  typeof RequestStateConst[keyof typeof RequestStateConst];

const requestList: ServiceRequest[] = [
  {
    applicationAccount: 'string',
    applicationMailAddress: 'string',
    userAccount: 'string',
    userName: 'string',
    userMailAddress: 'string',
  },
];

const requestReq: ApiGetRequestListReq = {
  requestId: 'ididi',
  userName: 'rion',
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
  featureKey: RequestStateConst.featureKey,
  initState: requestState,
};
