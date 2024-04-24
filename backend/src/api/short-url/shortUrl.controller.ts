import { Request, Response } from "express";
import ShortURLService from "./shortUrl.service";

export default class ShortURLController {
  constructor(
    private readonly service: ShortURLService = new ShortURLService()
  ) {}

  async handleCreate(req: Request, res: Response) {
    const payload = req.body;

    const short = await this.service.create({
      name: payload.name,
      url: payload.url,
      // @ts-ignore
      ownerId: req.session.user.id,
    });

    console.log(short[0]);

    res.status(201).send(short[0]);
  }
}
