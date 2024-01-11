import { ApiCall } from "tsrpc";
import { ReqUpload, ResUpload } from "../../shared/protocols/upload/PtlUpload";
import fs from 'fs/promises';

export default async function (call: ApiCall<ReqUpload, ResUpload>) {
    await fs.access('uploads').catch(async () => {
        await fs.mkdir('uploads')
    })
    await fs.writeFile('uploads/' + call.req.fileName, call.req.fileData);

    call.succ({
        url: call.req.fileName,
    });
}