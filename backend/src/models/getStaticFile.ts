import { HttpConnection, HttpServer } from 'tsrpc';
import fs from 'fs/promises';
import * as path from 'path';

export function getStaticFile(server: HttpServer) {
    server.flows.preRecvDataFlow.push(async (v) => {
        let conn = v.conn as HttpConnection;

        if (conn.httpReq.method === 'GET') {
            // 静态文件服务
            if (conn.httpReq.url) {
                // 检测文件是否存在
                let resFilePath = path.join('./', decodeURI(conn.httpReq.url));
                let isExisted = await fs
                    .access(resFilePath)
                    .then(() => true)
                    .catch(() => false);
                if (isExisted) {
                    // 返回文件内容
                    let content = await fs.readFile(resFilePath);
                    conn.httpRes.end(content);
                    return undefined;
                }
            }

            // 默认 GET 响应
            conn.httpRes.end('Not Found');
            return undefined;
        }

        return v;
    });
}