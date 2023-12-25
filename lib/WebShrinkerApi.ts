import {Array, Record, String} from "runtypes";
import WebShrinkerCategory from "./models/WebShrinkerCategory";
import path from "node:path";
import {dataDirPath} from "@/lib/paths";
import HttpClient from "./HttpClient";

const LookupCategoriesDataResponse = Record({
  data: Array(
    Record({
      categories: Array(WebShrinkerCategory),
      url: String,
    })
  ),
});

const ErrorResponse = Record({
  error: Record({
    message: String,
  }),
});

export default class WebShrinkerApi {
  private readonly accessKey: string;
  private readonly httpClient: HttpClient;
  private readonly secretKey: string;

  constructor() {
    const requiredEnvironmentVariable = (name: string): string => {
      const value = process.env[name];
      if (!value || value.trim().length === 0) {
        throw new EvalError(`no ${name} found in environment`);
      }
      return value;
    };

    this.accessKey = requiredEnvironmentVariable("WEBSHRINKER_API_ACCESS_KEY");
    this.secretKey = requiredEnvironmentVariable("WEBSHRINKER_API_SECRET_KEY");

    this.httpClient = new HttpClient({
      cacheDirectoryPath: path.resolve(
        dataDirPath,
        "webshrinker",
        "http-cache"
      ),
    });
  }

  async lookupCategories(url: string): Promise<readonly WebShrinkerCategory[]> {
    const dataResponse = LookupCategoriesDataResponse.check(
      (
        await this.httpClient.get(
          "https://api.webshrinker.com/categories/v3/" +
            Buffer.from(url).toString("base64"),
          // encode(url),
          {
            password: this.secretKey,
            // cache: {
            //   ttl: Number.MAX_SAFE_INTEGER,
            // },
            username: this.accessKey,
          }
        )
      ).toString("utf8")
    );

    return dataResponse.data[0].categories;
    // } else {
    //   const errorResponse = ErrorResponse.check(JSON.parse(response.body));
    //   throw new Error(errorResponse.error.message);
    // }
  }
}
