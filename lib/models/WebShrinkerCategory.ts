import {Boolean, Record, Static, String} from "runtypes";

const WebShrinkerCategory = Record({
  confident: Boolean,
  id: String,
  label: String,
  parent: String,
  score: String,
});

type WebShrinkerCategory = Static<typeof WebShrinkerCategory>;
export default WebShrinkerCategory;
