import { BaseRequest, BaseResponse, BaseConf } from "../base";
import { db_User } from "./db_User";

export interface ReqUpdate extends BaseRequest {
    updateObj: Pick<db_User, '_id'> & Partial<Pick<db_User, 'name' | 'money' | 'address' | 'thumb'>>;
}

export interface ResUpdate extends BaseResponse {
    updatedNum: number;
}

export const conf: BaseConf = {}