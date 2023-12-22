import {buildStorage} from "axios-cache-interceptor";
import fs from "node:fs/promises";
import path from "node:path";

const basex = require("base-x");
const base58 = basex(
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
);

export const decodeFileName = (value: string): string =>
  base58.decode(value).toString("utf-8");

export const encodeFileName = (value: string): string =>
  base58.encode(Buffer.from(value, "utf-8"));

export default async function buildAxiosCacheFileStorage(
  directoryPath: string
) {
  await fs.mkdir(directoryPath, {recursive: true});

  return buildStorage({
    async find(key) {
      const filePath = path.resolve(directoryPath, encodeFileName(key));
      let fileContents: Buffer;
      try {
        fileContents = await fs.readFile(filePath);
      } catch {
        return undefined;
      }
      return JSON.parse(fileContents.toString("utf-8"));
    },

    async remove(key) {
      const filePath = path.resolve(directoryPath, encodeFileName(key));
      try {
        await fs.unlink(filePath);
      } catch {}
    },

    async set(key, value) {
      const filePath = path.resolve(directoryPath, encodeFileName(key));
      await fs.writeFile(filePath, JSON.stringify(value));
    },
  });
}
