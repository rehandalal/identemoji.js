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
