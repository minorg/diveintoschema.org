import {GlobalRef} from "@/lib/GlobalRef";
import MajesticMillionReport from "@/lib/models/MajesticMillionReport";

const majesticMillionReport = new GlobalRef("majesticMillionReport");
if (!majesticMillionReport.value) {
  majesticMillionReport.value = new MajesticMillionReport();
}
export default majesticMillionReport.value as MajesticMillionReport;
