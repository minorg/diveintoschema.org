import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import encodeFileName from "./encodeFileName";
import stringify from "json-stringify-deterministic";
import {Store} from "keyv";

export default function gotFileSystemStorageAdapter(
  directoryPath: string
): Store<any> {
  fsSync.mkdirSync(directoryPath, {recursive: true});

  return {
    async clear(): Promise<void> {
      for (const file of await fs.readdir(directoryPath)) {
        await fs.unlink(file);
      }
    },

    async delete(key): Promise<boolean> {
      const filePath = path.resolve(directoryPath, encodeFileName(key));
      try {
        await fs.unlink(filePath);
        return true;
      } catch {
        return false;
      }
    },

    async has(key: string): Promise<boolean> {
      try {
        await fs.access(path.resolve(directoryPath, encodeFileName(key)));
        return true;
      } catch {
        return false;
      }
    },

    async get(key: string): Promise<any> {
      const filePath = path.resolve(directoryPath, encodeFileName(key));
      let fileContents: Buffer;
      try {
        fileContents = await fs.readFile(filePath);
      } catch {
        return undefined;
      }
      return JSON.parse(fileContents.toString("utf-8"));
    },

    async set(key: string, value: any): Promise<void> {
      const filePath = path.resolve(directoryPath, encodeFileName(key));
      await fs.writeFile(filePath, stringify(value, {space: "  "}));
    },
  });
}
