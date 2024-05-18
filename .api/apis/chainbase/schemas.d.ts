declare const DetectAddressDetectAddressGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly title: "Address";
                    readonly type: "string";
                    readonly description: "Identifier of target TON account in any form.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAddressBalanceGetAddressBalanceGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly title: "Address";
                    readonly type: "string";
                    readonly description: "Identifier of target TON account in any form.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAddressGetAddressStateGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly title: "Address";
                    readonly type: "string";
                    readonly description: "Identifier of target TON account in any form.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAddressInformationGetAddressInformationGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly title: "Address";
                    readonly type: "string";
                    readonly description: "Identifier of target TON account in any form.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetBlockHeaderGetBlockHeaderGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly workchain: {
                    readonly title: "Workchain";
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly shard: {
                    readonly title: "Shard";
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly seqno: {
                    readonly title: "Seqno";
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly root_hash: {
                    readonly title: "Root Hash";
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly file_hash: {
                    readonly title: "File Hash";
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["workchain", "shard", "seqno"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetBlockTransactionsGetBlockTransactionsGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly workchain: {
                    readonly title: "Workchain";
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly shard: {
                    readonly title: "Shard";
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly seqno: {
                    readonly title: "Seqno";
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly root_hash: {
                    readonly title: "Root Hash";
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly file_hash: {
                    readonly title: "File Hash";
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly after_lt: {
                    readonly title: "After Lt";
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly after_hash: {
                    readonly title: "After Hash";
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly count: {
                    readonly title: "Count";
                    readonly type: "integer";
                    readonly default: 40;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["workchain", "shard", "seqno"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetConsensusBlockGetConsensusBlockGet: {
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetExtendedAddressInformationGetExtendedAddressInformationGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly title: "Address";
                    readonly type: "string";
                    readonly description: "Identifier of target TON account in any form.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetMasterchainBlockSignaturesGetMasterchainBlockSignaturesGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly seqno: {
                    readonly title: "Seqno";
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["seqno"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetMasterchainInfoGetMasterchainInfoGet: {
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetShardBlockProofGetShardBlockProofGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly workchain: {
                    readonly title: "Workchain";
                    readonly type: "integer";
                    readonly description: "Block workchain id";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly shard: {
                    readonly title: "Shard";
                    readonly type: "integer";
                    readonly description: "Block shard id";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly seqno: {
                    readonly title: "Seqno";
                    readonly type: "integer";
                    readonly description: "Block seqno";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly from_seqno: {
                    readonly title: "From Seqno";
                    readonly type: "integer";
                    readonly description: "Seqno of masterchain block starting from which proof is required. If not specified latest masterchain block is used.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["workchain", "shard", "seqno"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetShardsShardsGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly seqno: {
                    readonly title: "Seqno";
                    readonly type: "integer";
                    readonly description: "Masterchain seqno to fetch shards of.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["seqno"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTokenDataGetTokenDataGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly title: "Address";
                    readonly type: "string";
                    readonly description: "Address of NFT collection/item or Jetton master/wallet smart contract";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTransactionsGetTransactionsGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly title: "Address";
                    readonly type: "string";
                    readonly description: "Identifier of target TON account in any form.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly limit: {
                    readonly title: "Limit";
                    readonly maximum: 100;
                    readonly minimum: 0;
                    readonly type: "integer";
                    readonly description: "Maximum number of transactions in response.";
                    readonly default: 10;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly lt: {
                    readonly title: "Lt";
                    readonly type: "integer";
                    readonly description: "Logical time of transaction to start with, must be sent with *hash*.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly hash: {
                    readonly title: "Hash";
                    readonly type: "string";
                    readonly description: "Hash of transaction to start with, in *base64* or *hex* encoding , must be sent with *lt*.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly to_lt: {
                    readonly title: "To Lt";
                    readonly type: "integer";
                    readonly description: "Logical time of transaction to finish with (to get tx from *lt* to *to_lt*).";
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly archival: {
                    readonly title: "Archival";
                    readonly type: "boolean";
                    readonly description: "By default getTransaction request is processed by any available liteserver. If *archival=true* only liteservers with full history are used.";
                    readonly default: false;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTryLocateResultTxTryLocateResultTxGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly source: {
                    readonly title: "Source";
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly destination: {
                    readonly title: "Destination";
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly created_lt: {
                    readonly title: "Created Lt";
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["source", "destination", "created_lt"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTryLocateSourceTxTryLocateSourceTxGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly source: {
                    readonly title: "Source";
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly destination: {
                    readonly title: "Destination";
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly created_lt: {
                    readonly title: "Created Lt";
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["source", "destination", "created_lt"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTryLocateTxTryLocateTxGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly source: {
                    readonly title: "Source";
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly destination: {
                    readonly title: "Destination";
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly created_lt: {
                    readonly title: "Created Lt";
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["source", "destination", "created_lt"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetWalletInformationGetWalletInformationGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly title: "Address";
                    readonly type: "string";
                    readonly description: "Identifier of target TON account in any form.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const LookupBlockLookupBlockGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly workchain: {
                    readonly title: "Workchain";
                    readonly type: "integer";
                    readonly description: "Workchain id to look up block in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly shard: {
                    readonly title: "Shard";
                    readonly type: "integer";
                    readonly description: "Shard id to look up block in";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly seqno: {
                    readonly title: "Seqno";
                    readonly type: "integer";
                    readonly description: "Block's height";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly lt: {
                    readonly title: "Lt";
                    readonly type: "integer";
                    readonly description: "Block's logical time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly unixtime: {
                    readonly title: "Unixtime";
                    readonly type: "integer";
                    readonly description: "Block's unixtime";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["workchain", "shard"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PackAddressPackAddressGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly title: "Address";
                    readonly type: "string";
                    readonly description: "Identifier of target TON account in raw form.";
                    readonly examples: readonly ["0:83DFD552E63729B472FCBCC8C45EBCC6691702558B68EC7527E1BA403A0F31A8"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UnpackAddressUnpackAddressGet: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly address: {
                    readonly title: "Address";
                    readonly type: "string";
                    readonly description: "Identifier of target TON account in user-friendly form";
                    readonly examples: readonly ["EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["address"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "TonResponse";
            readonly required: readonly ["ok"];
            readonly type: "object";
            readonly properties: {
                readonly ok: {
                    readonly title: "Ok";
                    readonly type: "boolean";
                };
                readonly result: {
                    readonly title: "Result";
                    readonly anyOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {};
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    }];
                };
                readonly error: {
                    readonly title: "Error";
                    readonly type: "string";
                };
                readonly code: {
                    readonly title: "Code";
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { DetectAddressDetectAddressGet, GetAddressBalanceGetAddressBalanceGet, GetAddressGetAddressStateGet, GetAddressInformationGetAddressInformationGet, GetBlockHeaderGetBlockHeaderGet, GetBlockTransactionsGetBlockTransactionsGet, GetConsensusBlockGetConsensusBlockGet, GetExtendedAddressInformationGetExtendedAddressInformationGet, GetMasterchainBlockSignaturesGetMasterchainBlockSignaturesGet, GetMasterchainInfoGetMasterchainInfoGet, GetShardBlockProofGetShardBlockProofGet, GetShardsShardsGet, GetTokenDataGetTokenDataGet, GetTransactionsGetTransactionsGet, GetTryLocateResultTxTryLocateResultTxGet, GetTryLocateSourceTxTryLocateSourceTxGet, GetTryLocateTxTryLocateTxGet, GetWalletInformationGetWalletInformationGet, LookupBlockLookupBlockGet, PackAddressPackAddressGet, UnpackAddressUnpackAddressGet };
