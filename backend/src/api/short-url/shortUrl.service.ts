import ShortURL from "./ShortURL";

export default class ShortURLService {
  constructor(private readonly shortUrl: ShortURL = new ShortURL()) {}

  async updateOne(payload: { name: string; url: string; id: string }) {
    const [shortUrl] = await this.shortUrl.getOne(payload.id);

    if (!shortUrl) {
      return null;
    }

    console.log("Found URL, checking diffs...");

    if (shortUrl.name === payload.name && shortUrl.url === payload.url) {
      console.log("No diffs found, quitting operation...");
      return null;
    }

    let url;

    if (shortUrl.name !== payload.name && shortUrl.url !== payload.url) {
      console.log("Name & URL different, updating both...");
      url = await this.shortUrl.updateOne(payload);
    } else if (shortUrl.url !== payload.url) {
      console.log("URL different, updating one...");
      url = await this.shortUrl.updateOne({ url: payload.url, id: payload.id });
    } else if (shortUrl.name !== payload.name) {
      console.log("Name different, updating one...");
      url = await this.shortUrl.updateOne({
        name: payload.name,
        id: payload.id,
      });
    }

    return url!;
  }

  async getAll(ownerId: string) {
    return await this.shortUrl.getAll(ownerId);
  }

  async create(payload: { name: string; url: string; ownerId: string }) {
    return await this.shortUrl.insertOne(payload);
  }
}
