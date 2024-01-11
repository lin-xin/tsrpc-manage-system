import { Db, MongoClient } from 'mongodb';

export class Global {
    static db: Db;

    static async initDb() {
        const uri = 'mongodb://127.0.0.1:27017/test?authSource=admin';
        const client = await new MongoClient(uri).connect();
        this.db = client.db();
    }
}
