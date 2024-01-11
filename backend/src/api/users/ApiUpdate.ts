import { Global } from './../../mongodb/index';
import { ApiCall } from "tsrpc";
import { ReqUpdate, ResUpdate } from "../../shared/protocols/users/PtlUpdate";

export default async function (call: ApiCall<ReqUpdate, ResUpdate>) {
    let { _id, ...reset } = call.req.updateObj;

    let op = await Global.db.collection('User').updateOne(
        {
            _id: _id,
        },
        {
            $set: reset,
        }
    );

    call.succ({
        updatedNum: op.matchedCount,
    });
}