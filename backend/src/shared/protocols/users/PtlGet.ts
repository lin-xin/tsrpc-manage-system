import { db_User } from './db_User';
import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGet extends BaseRequest {
    query: {
        pageIndex: number;
        pageSize: number;
        name?: string;
    };
}

export interface ResGet extends BaseResponse {
    data: db_User[],
    pageTotal: number
}

export const conf: BaseConf = {}