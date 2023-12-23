import base58 from "./base58";

const decodeFileName = (value: string): string =>
  base58.decode(value).toString("utf-8");

export default decodeFileName;
