import ShortURL from "./ShortURL";

export default class ShortURLService {
  constructor(private readonly shortUrl: ShortURL = new ShortURL()) {}

  async create(payload: { name: string; original: string; ownerId: string }) {
    return await this.shortUrl.insertOne(payload);
  }
}
