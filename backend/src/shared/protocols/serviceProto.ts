import { ServiceProto } from 'tsrpc-proto';
import { ReqUpload, ResUpload } from './upload/PtlUpload';
import { ReqAdd, ResAdd } from './users/PtlAdd';
import { ReqDel, ResDel } from './users/PtlDel';
import { ReqGet, ResGet } from './users/PtlGet';
import { ReqUpdate, ResUpdate } from './users/PtlUpdate';

export interface ServiceType {
    api: {
        "upload/Upload": {
            req: ReqUpload,
            res: ResUpload
        },
        "users/Add": {
            req: ReqAdd,
            res: ResAdd
        },
        "users/Del": {
            req: ReqDel,
            res: ResDel
        },
        "users/Get": {
            req: ReqGet,
            res: ResGet
        },
        "users/Update": {
            req: ReqUpdate,
            res: ResUpdate
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 4,
    "services": [
        {
            "id": 6,
            "name": "upload/Upload",
            "type": "api",
            "conf": {}
        },
        {
            "id": 2,
            "name": "users/Add",
            "type": "api",
            "conf": {}
        },
        {
            "id": 3,
            "name": "users/Del",
            "type": "api",
            "conf": {}
        },
        {
            "id": 4,
            "name": "users/Get",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "users/Update",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "upload/PtlUpload/ReqUpload": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "fileName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "fileData",
                    "type": {
                        "type": "Buffer",
                        "arrayType": "Uint8Array"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface"
        },
        "upload/PtlUpload/ResUpload": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "url",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface"
        },
        "users/PtlAdd/ReqAdd": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "query",
                    "type": {
                        "target": {
                            "type": "Reference",
                            "target": "users/db_User/db_User"
                        },
                        "keys": [
                            "_id"
                        ],
                        "type": "Omit"
                    }
                }
            ]
        },
        "users/db_User/db_User": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                },
                {
                    "id": 1,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "thumb",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "money",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "state",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 6,
                    "name": "address",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 7,
                    "name": "date",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "users/PtlAdd/ResAdd": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "newID",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "users/PtlDel/ReqDel": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "Reference",
                        "target": "?mongodb/ObjectId"
                    }
                }
            ]
        },
        "users/PtlDel/ResDel": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "matchNum",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "users/PtlGet/ReqGet": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "query",
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "pageIndex",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "name": "pageSize",
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 2,
                                "name": "name",
                                "type": {
                                    "type": "String"
                                },
                                "optional": true
                            }
                        ]
                    }
                }
            ]
        },
        "users/PtlGet/ResGet": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "data",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "users/db_User/db_User"
                        }
                    }
                },
                {
                    "id": 1,
                    "name": "pageTotal",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "users/PtlUpdate/ReqUpdate": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "updateObj",
                    "type": {
                        "type": "Intersection",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "target": {
                                        "type": "Reference",
                                        "target": "users/db_User/db_User"
                                    },
                                    "keys": [
                                        "_id"
                                    ],
                                    "type": "Pick"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Partial",
                                    "target": {
                                        "target": {
                                            "type": "Reference",
                                            "target": "users/db_User/db_User"
                                        },
                                        "keys": [
                                            "name",
                                            "money",
                                            "address",
                                            "thumb"
                                        ],
                                        "type": "Pick"
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "users/PtlUpdate/ResUpdate": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "updatedNum",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        }
    }
};