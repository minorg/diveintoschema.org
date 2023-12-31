import Papa from "papaparse";
import {Memoize} from "typescript-memoize";
import brotliDecompress from "@/lib/brotliDecompress";
import {readFile} from "fs/promises";
import path from "node:path";
import {dataDirPath} from "../paths";

export default class MajesticMillionReport {
  constructor() {}

  async getDomainGlobalRank(domain: string): Promise<number | null> {
    return (await this.getGlobalRanksByDomain())[domain] ?? null;
  }

  @Memoize()
  private async getGlobalRanksByDomain(): Promise<Record<string, number>> {
    const csv = (
      await brotliDecompress(
        await readFile(path.join(dataDirPath, "majestic_million.csv.br"))
      )
    ).toString("utf-8");

    const result: Record<string, number> = {};
    Papa.parse(csv, {
      delimiter: ",",
      header: true,
      step: (results) => {
        const row: any = results.data;
        result[row["Domain"]] = parseInt(row["GlobalRank"]);
      },
    });

    return result;
  }
}
