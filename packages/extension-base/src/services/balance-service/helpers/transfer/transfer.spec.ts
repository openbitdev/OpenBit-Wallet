// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { DetermineUtxosForSpendArgs, DetermineUtxosForSpendResult, UtxoResponseItem } from '@subwallet/extension-base/types';
import { determineUtxosForSpend, determineUtxosForSpendAll, filterUneconomicalUtxos, getSizeInfo } from '@subwallet/extension-base/utils/bitcoin';
import BigN from 'bignumber.js';

jest.setTimeout(1000 * 60 * 10);

interface TestCaseInput {
  utxos: number[];
  feeRate: number;
  isTransferAll: boolean;
  transferAmount: number;
}

interface TestCaseOutput {
  utxos: number[];
  vSize: number;
  fee: number;
  amountLeft: number;
  maxTransfer: number;
}

interface TestCase {
  input: TestCaseInput;
  output: TestCaseOutput;
}

let id = 1;

const createUtxo = (value: number): UtxoResponseItem => ({
  value: value,
  status: {
    confirmed: false
  },
  vout: 0,
  txid: (id++).toString()
})

const sortAsc = (a: UtxoResponseItem, b: UtxoResponseItem) => a.value - b.value;

const to = 'tb1qutykdlta72j3k4r9m9ng54hgwdrkgjfr5hhckf';
const sender = 'tb1q4vgvwexhn745qn404thq6a8mua3un899n2rhrl';

describe('bitcoin utxo', () => {
  const fitlerUtxoTestcases: TestCase[] = [
    {
      input:{
        utxos: [7000, 12143],
        feeRate: 108,
        isTransferAll: true,
        transferAmount: 0
      },
      output: {
        utxos: [12143],
        vSize: 109.5,
        fee: 11826,
        amountLeft: 0,
        maxTransfer: 0
      }
    },
    {
      input:{
        utxos: [6000, 7500, 12143],
        feeRate: 108,
        isTransferAll: true,
        transferAmount: 0
      },
      output: {
        utxos: [7500, 12143],
        vSize: 177.25,
        fee: 19143,
        amountLeft: 0,
        maxTransfer: 0
      }
    },
    {
      input:{
        utxos: [12000, 12500],
        feeRate: 108,
        isTransferAll: true,
        transferAmount: 0
      },
      output: {
        utxos: [12000, 12500],
        vSize: 177.25,
        fee: 19143,
        amountLeft: 0,
        maxTransfer: 0
      }
    },
    {
      input:{
        utxos: [11000, 12500, 17500],
        feeRate: 108,
        isTransferAll: true,
        transferAmount: 0
      },
      output: {
        utxos: [11000, 12500, 17500],
        vSize: 245,
        fee: 26460,
        amountLeft: 0,
        maxTransfer: 0
      }
    },
    {
      input:{
        utxos: [7317, 11826],
        feeRate: 108,
        isTransferAll: true,
        transferAmount: 0
      },
      output: {
        utxos: [],
        vSize: 41.75,
        fee: 4509,
        amountLeft: 0,
        maxTransfer: 0
      }
    },
  ];
  test.each(fitlerUtxoTestcases)('filter utxo %j', (testCase) => {
    const { input, output } = testCase;

    const rs = filterUneconomicalUtxos({
      utxos: input.utxos.map(createUtxo),
      feeRate: input.feeRate,
      recipients: [to],
      sender
    })

    const sizeInfo = getSizeInfo({
      sender,
      inputLength: rs.length,
      recipients: [to]
    })

    const fee = Math.ceil(sizeInfo.txVBytes * input.feeRate);

    console.log(rs.sort(sortAsc).map(value => value.value), sizeInfo.txVBytes, fee);
    expect(JSON.stringify(rs.sort(sortAsc).map(value => value.value))).toEqual(JSON.stringify(output.utxos));
    expect(sizeInfo.txVBytes).toEqual(output.vSize);
    expect(fee).toEqual(output.fee);
  });

  const determineSendAllTestCases: TestCase[] = [
    {
      input:{
        utxos: [12500, 5000, 4550, 6800],
        feeRate: 108,
        isTransferAll: true,
        transferAmount: 0
      },
      output: {
        utxos: [12500],
        vSize: 109.5,
        fee: 11826,
        amountLeft: 0,
        maxTransfer: 674
      }
    },
    {
      input:{
        utxos: [12500, 8000, 4550, 6800],
        feeRate: 108,
        isTransferAll: true,
        transferAmount: 0
      },
      output: {
        utxos: [12500, 8000],
        vSize: 177.25,
        fee: 19143,
        amountLeft: 0,
        maxTransfer: 1357
      }
    },
    {
      input:{
        utxos: [8000, 9000, 4550, 7800],
        feeRate: 108,
        isTransferAll: true,
        transferAmount: 0
      },
      output: {
        utxos: [],
        vSize: 41.75,
        fee: 4509,
        amountLeft: 0,
        maxTransfer: 0
      }
    },
    {
      input:{
        utxos: [6017, 7006],
        feeRate: 108,
        isTransferAll: true,
        transferAmount: 0
      },
      output: {
        utxos: [],
        vSize: 41.75,
        fee: 4509,
        amountLeft: 0,
        maxTransfer: 0
      }
    }
  ];
  test.each(determineSendAllTestCases)('determine utxo for spend all %#', (testCase) => {
    const { input, output } = testCase;

    const determineUtxosArgs: DetermineUtxosForSpendArgs = {
      amount: input.transferAmount,
      feeRate: input.feeRate,
      recipient: to,
      sender: sender,
      utxos: input.utxos.map(createUtxo)
    }

    let rs: Omit<DetermineUtxosForSpendResult, 'filteredUtxos'>;

    try {
      rs = determineUtxosForSpendAll(determineUtxosArgs)
    } catch (e) {
      const sizeInfo = getSizeInfo({
        sender,
        inputLength: 0,
        recipients: [to]
      })

      const fee = Math.ceil(sizeInfo.txVBytes * input.feeRate);

      rs = {
        inputs: [],
        outputs: [],
        fee,
        size: sizeInfo.txVBytes
      }
    }

    const maxTransfer = BigN.max(
      rs.inputs
        .reduce((prevVal, curVal) => prevVal.plus(curVal.value), new BigN(0))
        .minus(rs.fee)
      ,
      0
    ).toNumber();

    console.log(JSON.stringify(rs.inputs.sort(sortAsc).map(value => value.value)), rs.size, rs.fee, maxTransfer);

    expect(JSON.stringify(rs.inputs.sort(sortAsc).map(value => value.value))).toEqual(JSON.stringify(output.utxos.sort((a,b) => a - b)));
    expect(rs.size).toEqual(output.vSize);
    expect(rs.fee).toEqual(output.fee);
    expect(maxTransfer).toEqual(output.maxTransfer);
  })

  const determineSendAmountTestcase: TestCase[] = [
    {
      input:{
        utxos: [9550, 11800, 17000, 18000],
        feeRate: 108,
        isTransferAll: false,
        transferAmount: 3000
      },
      output: {
        utxos: [17000, 18000],
        vSize: 208.25,
        fee: 22491,
        amountLeft: 9509,
        maxTransfer: 0
      }
    },
    {
      input:{
        utxos: [9550, 11800, 12000, 20000],
        feeRate: 108,
        isTransferAll: false,
        transferAmount: 3000
      },
      output: {
        utxos: [20000],
        vSize: 140.5,
        fee: 15174,
        amountLeft: 1826,
        maxTransfer: 0
      }
    },
    {
      input:{
        utxos: [3550, 4800, 5000, 6000],
        feeRate: 108,
        isTransferAll: false,
        transferAmount: 3000
      },
      output: {
        utxos: [],
        vSize: 72.75,
        fee: 7857,
        amountLeft: 0,
        maxTransfer: 0
      }
    },
    {
      input:{
        utxos: [7000, 11800],
        feeRate: 108,
        isTransferAll: false,
        transferAmount: 3000
      },
      output: {
        utxos: [],
        vSize: 72.75,
        fee: 7857,
        amountLeft: 0,
        maxTransfer: 0
      }
    },
    {
      input:{
        utxos: [11800, 12800],
        feeRate: 108,
        isTransferAll: false,
        transferAmount: 3000
      },
      output: {
        utxos: [],
        vSize: 72.75,
        fee: 7857,
        amountLeft: 0,
        maxTransfer: 0
      }
    },
    {
      input:{
        utxos: [11800, 13691],
        feeRate: 108,
        isTransferAll: false,
        transferAmount: 3000
      },
      output: {
        utxos: [],
        vSize: 72.75,
        fee: 7857,
        amountLeft: 0,
        maxTransfer: 0
      }
    },

  ];
  test.each(determineSendAmountTestcase)('determine utxo for spend amount %#', (testCase) => {
    const { input, output } = testCase;

    const determineUtxosArgs: DetermineUtxosForSpendArgs = {
      amount: input.transferAmount,
      feeRate: input.feeRate,
      recipient: to,
      sender: sender,
      utxos: input.utxos.map(createUtxo)
    }

    let rs: DetermineUtxosForSpendResult;

    try {
      rs = determineUtxosForSpend(determineUtxosArgs)
    } catch (e) {
      const sizeInfo = getSizeInfo({
        sender,
        inputLength: 0,
        recipients: [to, sender]
      })

      const fee = Math.ceil(sizeInfo.txVBytes * input.feeRate);

      rs = {
        filteredUtxos: [],
        inputs: [],
        outputs: [],
        fee,
        size: sizeInfo.txVBytes
      }
    }

    const amountLeft = BigN.max(
      rs.inputs
        .reduce((prevVal, curVal) => prevVal.plus(curVal.value), new BigN(0))
        .minus(rs.fee)
        .minus(input.transferAmount)
      ,
      0
    ).toNumber();

    console.log(JSON.stringify(rs.inputs.sort(sortAsc).map(value => value.value)), rs.size, rs.fee, amountLeft);

    expect(JSON.stringify(rs.inputs.sort(sortAsc).map(value => value.value))).toEqual(JSON.stringify(output.utxos.sort((a,b) => a - b)));
    expect(rs.size).toEqual(output.vSize);
    expect(rs.fee).toEqual(output.fee);
    expect(amountLeft).toEqual(output.amountLeft);
  })
});
