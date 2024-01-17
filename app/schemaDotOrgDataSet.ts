import {GlobalRef} from "@/lib/GlobalRef";
import WebDataCommons, {SchemaDotOrgDataSet} from "webdatacommons";
import {dataDirPath} from "@/lib/paths";
import path from "node:path";

const schemaDotOrgDataSet = new GlobalRef("schemaDotOrgDataSet");
if (!schemaDotOrgDataSet.value) {
  schemaDotOrgDataSet.value = new WebDataCommons({
    cacheDirectoryPath: path.resolve(
      dataDirPath,
      "webdatacommons",
      "http-cache"
    ),
  }).schemaDotOrgDataSet({});
}
export default schemaDotOrgDataSet.value as SchemaDotOrgDataSet;
