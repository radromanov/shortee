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
      original: payload.original,
      // @ts-ignore
      ownerId: req.session.user.id,
    });

    res.status(201).send(short[0]);
  }
}
