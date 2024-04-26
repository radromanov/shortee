import { Request, Response } from "express";
import ShortURLService from "./shortUrl.service";
import Exception from "../../core/Exception";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default class ShortURLController {
  constructor(
    private readonly service: ShortURLService = new ShortURLService()
  ) {}

  async handleGetAll(req: Request, res: Response) {
    //@ts-ignore
    const urls = await this.service.getAll(req.session.user.id);

    console.log(urls);

    res.status(200).send(urls);
  }

  async handleCreate(req: Request, res: Response) {
    const payload = req.body;

    const response = await fetch(payload.url);
    if (!response.ok) {
      throw new Exception("URL doesn't exist.", "Bad Request");
    }

    const userLinks = await db.query.users.findFirst({
      with: {
        urls: true,
      },
      columns: {
        id: true,
        username: true,
        email: true,
      },
      // @ts-ignore
      where: eq(users.id, req.session.user.id),
    });

    console.log(userLinks);

    if (userLinks && userLinks.urls.length >= 10) {
      throw new Exception("You can only have up to 10 URLS.", "Bad Request");
    }

    if (userLinks?.urls.find((short) => short.url === payload.url)) {
      throw new Exception("Link already exists.", "Conflict");
    }

    const short = await this.service.create({
      name: payload.name,
      url: payload.url,
      // @ts-ignore
      ownerId: req.session.user.id,
    });

    res.status(201).send(short[0]);
  }

  async handleRedirect(_req: Request, res: Response) {
    res.redirect(302, "https://www.google.com");
  }
}
