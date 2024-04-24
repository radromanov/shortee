import ShortURL from "./ShortURL";

export default class ShortURLService {
  constructor(private readonly shortUrl: ShortURL = new ShortURL()) {}

  async getAll(ownerId: string) {
    return await this.shortUrl.getAll(ownerId);
  }

  async create(payload: { name: string; url: string; ownerId: string }) {
    return await this.shortUrl.insertOne(payload);
  }
}
