import { BaseRequest, BaseResponse, BaseConf } from "../base";
import { db_User } from "./db_User";

export interface ReqAdd extends BaseRequest {
    query: Omit<db_User, '_id'>
}

export interface ResAdd extends BaseResponse {
    newID: string;
}

export const conf: BaseConf = {}