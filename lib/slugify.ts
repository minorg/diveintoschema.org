import * as urlSlug from "url-slug";

export default function slugify(s: string) {
  return urlSlug.convert(s);
}
