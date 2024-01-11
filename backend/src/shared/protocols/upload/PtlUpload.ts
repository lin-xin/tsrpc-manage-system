import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqUpload extends BaseRequest {
    fileName: string;
    fileData: Uint8Array;
}

export interface ResUpload extends BaseResponse {
    url: string;
}

export const conf: BaseConf = {

}