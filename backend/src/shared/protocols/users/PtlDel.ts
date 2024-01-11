import { ObjectId } from "mongodb";
import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqDel extends BaseRequest {
    _id: ObjectId
}

export interface ResDel extends BaseResponse {
    matchNum: number;
}

export const conf: BaseConf = {}