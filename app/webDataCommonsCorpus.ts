import {GlobalRef} from "@/lib/GlobalRef";
import WebDataCommonsCorpus from "@/lib/models/WebDataCommonsCorpus";

const webDataCommonsCorpus = new GlobalRef("webDataCommonsCorpus");
if (!webDataCommonsCorpus.value) {
  webDataCommonsCorpus.value = new WebDataCommonsCorpus({});
}
export default webDataCommonsCorpus.value as WebDataCommonsCorpus;
