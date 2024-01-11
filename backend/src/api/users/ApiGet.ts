import { Global } from './../../mongodb/index';
import { ApiCall } from "tsrpc";
import { ReqGet, ResGet } from "../../shared/protocols/users/PtlGet";

export default async function (call: ApiCall<ReqGet, ResGet>) {
    const { pageIndex, pageSize, name } = call.req.query;
    const filter: any = {}
    if (name) {
        filter.filter = new RegExp(name!)
    }

    const ret = await Global.db.collection('User').aggregate([
        {
            $match: filter
        },
        {
            $facet: {
                total: [{ $count: 'total' }],
                data: [{ $sort: { _id: -1 } }, { $skip: (pageIndex - 1) * pageSize }, { $limit: pageSize }],
            },
        },
    ]).toArray()
    return call.succ({
        data: ret[0].data,
        pageTotal: ret[0].total[0]?.total || 0
    })
}