import {buildStorage} from "axios-cache-interceptor";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import encodeFileName from "./encodeFileName";
import stringify from "json-stringify-deterministic";

export default function buildAxiosCacheFileStorage(directoryPath: string) {
  fsSync.mkdirSync(directoryPath, {recursive: true});

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
      await fs.writeFile(filePath, stringify(value, {space: "  "}));
    },
  });
}
