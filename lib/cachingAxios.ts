import Axios from "axios";
import buildAxiosCacheFileStorage from "./buildAxiosCacheFileStorage";
import {dataDirPath} from "./paths";
import {setupCache} from "axios-cache-interceptor";
import path from "node:path";

const cachingAxios = setupCache(Axios.create(), {
  debug: console.log,
  storage: buildAxiosCacheFileStorage(path.resolve(dataDirPath, "axios-cache")),
});

export default cachingAxios;
