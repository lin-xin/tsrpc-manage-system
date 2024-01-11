import * as path from "path";
import { HttpServer } from "tsrpc";
import { serviceProto } from "./shared/protocols/serviceProto";
import { Global } from './mongodb/index';
import { getStaticFile } from './models/getStaticFile'

// Create the Server
const server = new HttpServer(serviceProto, {
    port: 3000,
    json: true
});

getStaticFile(server);

// Initialize before server start
async function init() {
    await server.autoImplementApi(path.resolve(__dirname, 'api'));
    await Global.initDb();
};

// Entry function
async function main() {
    await init();
    await server.start();
};
main();