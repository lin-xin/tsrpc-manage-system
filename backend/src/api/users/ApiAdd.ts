import { Global } from './../../mongodb/index';
import { ApiCall } from "tsrpc";
import { ReqAdd, ResAdd } from "../../shared/protocols/users/PtlAdd";

export default async function (call: ApiCall<ReqAdd, ResAdd>) {
    const ret = await Global.db.collection('User').insertOne(call.req.query);
    return call.succ({ newID: ret.insertedId.toString() })
}