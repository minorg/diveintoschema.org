import base58 from "./base58";

const encodeFileName = (value: string): string =>
  base58.encode(Buffer.from(value, "utf-8"));
export default encodeFileName;
