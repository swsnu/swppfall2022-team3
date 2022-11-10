import { AES, enc } from "crypto-ts";


const cryptoKey = "test";

/**
 * Encrypt data as an url parameter.
 * Type T must be an object.
 * ex: { key1: value1, key2: value2, ... }
 * @param data object to encrypt
 * @return string
 */
const encrypt = <T>(data: T): string => {
  const jsonString = JSON.stringify(data);
  return encodeURIComponent(AES.encrypt(jsonString, cryptoKey).toString());
};

/**
 * Decrypt string to data as type T.
 * Type T must be an object.
 * ex: { key1: value1, key2: value2, ... }
 * @param encrypted a string result of encryption
 */
const decrypt = <T>(encrypted: string): T => {
  const jsonString = AES.decrypt(encrypted, cryptoKey).toString(enc.Utf8);
  return JSON.parse(jsonString) as T
};

const functions = {
  encrypt,
  decrypt,
}
export default functions;
