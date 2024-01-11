import { ObjectId } from 'mongodb';

export interface db_User {
    _id: ObjectId;
    name: string;	// 用户名
    thumb?: string;  // 头像
    money: number;  // 账户余额
    state: number;  // 账户状态
    address: string;    // 地址
    date: Date; // 注册日期
}