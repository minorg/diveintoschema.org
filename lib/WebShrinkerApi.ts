import {Array, Record, String} from "runtypes";
import WebShrinkerCategory from "./models/WebShrinkerCategory";
import cachingAxios from "./cachingAxios";

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
  }

  async lookupCategories(url: string): Promise<readonly WebShrinkerCategory[]> {
    const response = await cachingAxios.get(
      "https://api.webshrinker.com/categories/v3/" +
        Buffer.from(url).toString("base64url"),
      {
        auth: {
          username: this.accessKey,
          password: this.secretKey,
        },
        cache: {
          ttl: Number.MAX_SAFE_INTEGER,
        },
        validateStatus: () => true,
      }
    );

    if (response.status === 200) {
      const dataResponse = LookupCategoriesDataResponse.check(response.data);
      return dataResponse.data[0].categories;
    } else {
      const errorResponse = ErrorResponse.check(response.data);
      throw new Error(errorResponse.error.message);
    }
  }
}
