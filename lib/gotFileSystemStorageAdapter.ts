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

  const filePath = (key: string) =>
    path.resolve(directoryPath, encodeFileName(key) + ".json");

  return {
    async clear(): Promise<void> {
      for (const file of await fs.readdir(directoryPath)) {
        await fs.unlink(file);
      }
    },

    async delete(key: string): Promise<boolean> {
      try {
        await fs.unlink(filePath(key));
        return true;
      } catch {
        return false;
      }
    },

    async has(key: string): Promise<boolean> {
      try {
        await fs.access(filePath(key));
        return true;
      } catch {
        return false;
      }
    },

    async get(key: string): Promise<any> {
      let fileContents: Buffer;
      try {
        fileContents = await fs.readFile(filePath(key));
      } catch {
        return undefined;
      }
      return fileContents.toString("utf-8");
    },

    async set(key: string, value: string): Promise<void> {
      await fs.writeFile(
        filePath(key),
        stringify(JSON.parse(value), {space: "  "})
      );
    },
  };
}
