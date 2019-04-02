import * as rgb from "color-space/rgb";
import * as lchab from "color-space/lchab";
import * as xyz from "color-space/xyz";
import deltaE from "delta-e";

/**
 * Returns a SHA-1 hash of the given message.
 * @param message  The string to be hashed.
 * @returns {string}  The hash.
 */
export async function getHash(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const buffer = await window.crypto.subtle.digest("SHA-1", data);
  const byteArray = new Uint8Array(buffer);

  const hexCodes = [...byteArray].map(value => {
    const hexCode = value.toString(16);
    const paddedHexCode = hexCode.padStart(2, "0");
    return paddedHexCode;
  });

  return hexCodes.join("");
}

export function hex2RGB(hex) {
  let v = hex;
  if (v.startsWith("#")) {
    v = v.substring(1);
  }
  if (v.length === 3) {
    return [
      parseInt(v.substring(0, 1), 16),
      parseInt(v.substring(1, 2), 16),
      parseInt(v.substring(2, 3), 16)
    ];
  }
  return [
    parseInt(v.substring(0, 2), 16),
    parseInt(v.substring(2, 4), 16),
    parseInt(v.substring(4, 6), 16)
  ];
}

export function getDeltaE(hex1, hex2) {
  const lab1 = xyz.lchab(rgb.xyz(hex2RGB(hex1)));
  const lab2 = xyz.lchab(rgb.xyz(hex2RGB(hex2)));
  return deltaE.getDeltaE00(
    { L: lab1[0], A: lab1[1], B: lab1[2] },
    { L: lab2[0], A: lab2[1], B: lab2[2] }
  );
}
