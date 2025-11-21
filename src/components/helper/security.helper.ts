import * as Crypto from 'crypto-js';

import { isJson } from './data.helper';

export function dataEncryption(data: any) {
  const obj = typeof data === 'object' ? JSON.stringify(data) : data;
  const result = Crypto.Rabbit.encrypt(
    obj,
    <string>process.env.ENCRIPTION_PASSWORD
  ).toString();

  return result;
}

export function dataDecryption(data: any) {
  try {
    const predicate = Crypto.Rabbit.decrypt(
      data,
      <string>process.env.ENCRIPTION_PASSWORD
    );
    const decrypted = predicate.toString(Crypto.enc.Utf8);
    const result = isJson(decrypted) ? JSON.parse(decrypted) : decrypted;
    return result;
  } catch (error) { }
}
