import { ApiCall } from "tsrpc";
import { Global } from "../../mongodb";
import { ReqDel, ResDel } from "../../shared/protocols/users/PtlDel";

export default async function (call: ApiCall<ReqDel, ResDel>) {
    const ret = await Global.db.collection('User').deleteOne({ _id: call.req._id });
    return call.succ({ matchNum: ret.deletedCount })
}