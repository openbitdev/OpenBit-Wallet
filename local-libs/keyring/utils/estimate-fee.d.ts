type InputScriptTypes = 'p2pkh' | 'p2sh' | 'p2sh-p2wpkh' | 'p2sh-p2wsh' | 'p2wpkh' | 'p2wsh' | 'p2tr';
interface TxSizerParams {
    input_count: number;
    input_script: InputScriptTypes;
    input_m: number;
    input_n: number;
    p2pkh_output_count: number;
    p2sh_output_count: number;
    p2sh_p2wpkh_output_count: number;
    p2sh_p2wsh_output_count: number;
    p2wpkh_output_count: number;
    p2wsh_output_count: number;
    p2tr_output_count: number;
}
export declare class BtcSizeFeeEstimator {
    P2PKH_IN_SIZE: number;
    P2PKH_OUT_SIZE: number;
    P2SH_OUT_SIZE: number;
    P2SH_P2WPKH_OUT_SIZE: number;
    P2SH_P2WSH_OUT_SIZE: number;
    P2SH_P2WPKH_IN_SIZE: number;
    P2WPKH_IN_SIZE: number;
    P2WPKH_OUT_SIZE: number;
    P2WSH_OUT_SIZE: number;
    P2TR_OUT_SIZE: number;
    P2TR_IN_SIZE: number;
    PUBKEY_SIZE: number;
    SIGNATURE_SIZE: number;
    SUPPORTED_INPUT_SCRIPT_TYPES: InputScriptTypes[];
    defaultParams: TxSizerParams;
    params: TxSizerParams;
    getSizeOfScriptLengthElement(length: number): 5 | 1 | 2 | 3;
    getSizeOfletInt(length: number): 5 | 1 | 3 | 9;
    getTxOverheadVBytes(input_script: InputScriptTypes, input_count: number, output_count: number): number;
    getTxOverheadExtraRawBytes(input_script: InputScriptTypes, input_count: number): number;
    prepareParams(opts: Partial<TxSizerParams>): TxSizerParams;
    getOutputCount(): number;
    getSizeBasedOnInputType(): {
        inputSize: number;
        inputWitnessSize: number;
    };
    calcTxSize(opts: Partial<TxSizerParams>): {
        txVBytes: number;
        txBytes: number;
        txWeight: number;
    };
    estimateFee(vbyte: number, satVb: number): number;
    formatFeeRange(fee: number, multiplier: number): string;
}
export {};
