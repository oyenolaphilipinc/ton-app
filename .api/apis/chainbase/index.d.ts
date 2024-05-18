import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Get basic information about the address: balance, code, data, last_transaction_id.
     *
     * @summary Get Address Information
     */
    get_address_information_getAddressInformation_get(metadata: types.GetAddressInformationGetAddressInformationGetMetadataParam): Promise<FetchResponse<200, types.GetAddressInformationGetAddressInformationGetResponse200>>;
    /**
     * Similar to previous one but tries to parse additional information for known contract
     * types. This method is based on tonlib's function *getAccountState*. For detecting
     * wallets we recommend to use *getWalletInformation*.
     *
     * @summary Get Extended Address Information
     */
    get_extended_address_information_getExtendedAddressInformation_get(metadata: types.GetExtendedAddressInformationGetExtendedAddressInformationGetMetadataParam): Promise<FetchResponse<200, types.GetExtendedAddressInformationGetExtendedAddressInformationGetResponse200>>;
    /**
     * Retrieve wallet information. This method parses contract state and currently supports
     * more wallet types than getExtendedAddressInformation: simple wallet, standart wallet, v3
     * wallet, v4 wallet.
     *
     * @summary Get Wallet Information
     */
    get_wallet_information_getWalletInformation_get(metadata: types.GetWalletInformationGetWalletInformationGetMetadataParam): Promise<FetchResponse<200, types.GetWalletInformationGetWalletInformationGetResponse200>>;
    /**
     * Get transaction history of a given address.
     *
     * @summary Get Transactions
     */
    get_transactions_getTransactions_get(metadata: types.GetTransactionsGetTransactionsGetMetadataParam): Promise<FetchResponse<200, types.GetTransactionsGetTransactionsGetResponse200>>;
    /**
     * Get balance (in nanotons) of a given address.
     *
     * @summary Get Address Balance
     */
    get_address_balance_getAddressBalance_get(metadata: types.GetAddressBalanceGetAddressBalanceGetMetadataParam): Promise<FetchResponse<200, types.GetAddressBalanceGetAddressBalanceGetResponse200>>;
    /**
     * Get state of a given address. State can be either *unitialized*, *active* or *frozen*.
     *
     * @summary Get Address
     */
    get_address_getAddressState_get(metadata: types.GetAddressGetAddressStateGetMetadataParam): Promise<FetchResponse<200, types.GetAddressGetAddressStateGetResponse200>>;
    /**
     * Convert an address from raw to human-readable format.
     *
     * @summary Pack Address
     */
    pack_address_packAddress_get(metadata: types.PackAddressPackAddressGetMetadataParam): Promise<FetchResponse<200, types.PackAddressPackAddressGetResponse200>>;
    /**
     * Convert an address from human-readable to raw format.
     *
     * @summary Unpack Address
     */
    unpack_address_unpackAddress_get(metadata: types.UnpackAddressUnpackAddressGetMetadataParam): Promise<FetchResponse<200, types.UnpackAddressUnpackAddressGetResponse200>>;
    /**
     * Get up-to-date masterchain state.
     *
     * @summary Get Masterchain Info
     */
    get_masterchain_info_getMasterchainInfo_get(): Promise<FetchResponse<200, types.GetMasterchainInfoGetMasterchainInfoGetResponse200>>;
    /**
     * Get up-to-date masterchain state.
     *
     * @summary Get Masterchain Block Signatures
     */
    get_masterchain_block_signatures_getMasterchainBlockSignatures_get(metadata: types.GetMasterchainBlockSignaturesGetMasterchainBlockSignaturesGetMetadataParam): Promise<FetchResponse<200, types.GetMasterchainBlockSignaturesGetMasterchainBlockSignaturesGetResponse200>>;
    /**
     * Get merkle proof of shardchain block.
     *
     * @summary Get Shard Block Proof
     */
    get_shard_block_proof_getShardBlockProof_get(metadata: types.GetShardBlockProofGetShardBlockProofGetMetadataParam): Promise<FetchResponse<200, types.GetShardBlockProofGetShardBlockProofGetResponse200>>;
    /**
     * Get consensus block and its update timestamp.
     *
     * @summary Get Consensus Block
     */
    get_consensus_block_getConsensusBlock_get(): Promise<FetchResponse<200, types.GetConsensusBlockGetConsensusBlockGetResponse200>>;
    /**
     * Look up block by either *seqno*, *lt* or *unixtime*.
     *
     * @summary Lookup Block
     */
    lookup_block_lookupBlock_get(metadata: types.LookupBlockLookupBlockGetMetadataParam): Promise<FetchResponse<200, types.LookupBlockLookupBlockGetResponse200>>;
    /**
     * Get shards information.
     *
     * @summary Get Shards
     */
    get_shards_shards_get(metadata: types.GetShardsShardsGetMetadataParam): Promise<FetchResponse<200, types.GetShardsShardsGetResponse200>>;
    /**
     * Get transactions of the given block.
     *
     * @summary Get Block Transactions
     */
    get_block_transactions_getBlockTransactions_get(metadata: types.GetBlockTransactionsGetBlockTransactionsGetMetadataParam): Promise<FetchResponse<200, types.GetBlockTransactionsGetBlockTransactionsGetResponse200>>;
    /**
     * Get metadata of a given block.
     *
     * @summary Get Block Header
     */
    get_block_header_getBlockHeader_get(metadata: types.GetBlockHeaderGetBlockHeaderGetMetadataParam): Promise<FetchResponse<200, types.GetBlockHeaderGetBlockHeaderGetResponse200>>;
    /**
     * Get NFT or Jetton information.
     *
     * @summary Get Token Data
     */
    get_token_data_getTokenData_get(metadata: types.GetTokenDataGetTokenDataGetMetadataParam): Promise<FetchResponse<200, types.GetTokenDataGetTokenDataGetResponse200>>;
    /**
     * Locate outcoming transaction of *destination* address by incoming message.
     *
     * @summary Get Try Locate Tx
     */
    get_try_locate_tx_tryLocateTx_get(metadata: types.GetTryLocateTxTryLocateTxGetMetadataParam): Promise<FetchResponse<200, types.GetTryLocateTxTryLocateTxGetResponse200>>;
    /**
     * Same as previous. Locate outcoming transaction of *destination* address by incoming
     * message
     *
     * @summary Get Try Locate Result Tx
     */
    get_try_locate_result_tx_tryLocateResultTx_get(metadata: types.GetTryLocateResultTxTryLocateResultTxGetMetadataParam): Promise<FetchResponse<200, types.GetTryLocateResultTxTryLocateResultTxGetResponse200>>;
    /**
     * Locate incoming transaction of *source* address by outcoming message.
     *
     * @summary Get Try Locate Source Tx
     */
    get_try_locate_source_tx_tryLocateSourceTx_get(metadata: types.GetTryLocateSourceTxTryLocateSourceTxGetMetadataParam): Promise<FetchResponse<200, types.GetTryLocateSourceTxTryLocateSourceTxGetResponse200>>;
    /**
     * Get all possible address forms.
     *
     * @summary Detect Address
     */
    detect_address_detectAddress_get(metadata: types.DetectAddressDetectAddressGetMetadataParam): Promise<FetchResponse<200, types.DetectAddressDetectAddressGetResponse200>>;
}
declare const createSDK: SDK;
export default createSDK;
