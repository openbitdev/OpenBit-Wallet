// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

// export function insertRuneSlugSpacer (runeSlug: string, spacerList: number[], char: string) {
//   function insertCharAtIndex (str: string, index: number, char: string): string {
//     return str.slice(0, index) + char + str.slice(index);
//   }
//
//   if (!spacerList.length) {
//     return runeSlug;
//   }
//
//   const slugSplit = runeSlug.split('-');
//   let runeName = slugSplit[2];
//
//   for (let i = spacerList.length - 1; i >= 0; i--) {
//     const index = spacerList[i];
//
//     runeName = insertCharAtIndex(runeName, index, char);
//   }
//
//   slugSplit[2] = runeName;
//
//   return slugSplit.join('-');
// }

export function insertRuneSpacer (runeName: string, spacerList: number[], char = '•') {
  function insertCharAtIndex (str: string, index: number, char: string): string {
    return str.slice(0, index) + char + str.slice(index);
  }

  if (!spacerList.length) {
    return runeName;
  }

  for (let i = spacerList.length - 1; i >= 0; i--) {
    const index = spacerList[i];

    runeName = insertCharAtIndex(runeName, index + 1, char);
  }

  return runeName;
}

export function decodeRuneSpacer (spacerInt: number) {
  function decimalToBinaryString (decimal: number) {
    const binaryString: string = (decimal >>> 0).toString(2);

    return binaryString;
  }

  function binaryStringToSpacerList (binaryString: string) {
    const reverseStringList = binaryString.split('').reverse().join('');

    return findAllIndices(reverseStringList, '1');
  }

  function findAllIndices (input: string, target: string): number[] {
    const regex = new RegExp(target, 'g');
    const indices: number[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(input)) !== null) {
      indices.push(match.index);
    }

    return indices;
  }

  const binaryString = decimalToBinaryString(spacerInt);

  return binaryStringToSpacerList(binaryString);
}
