import postgres from "postgres";
import Config from "./Config";

export default class Database {
  private pg: postgres.Sql<{}>;

  constructor(private readonly config: Config) {
    this.pg = this.connect();
  }

  private connect() {
    if (this.pg) {
      return this.pg;
    }

    const connectionString = this.config.getOne("DB_URI");
    this.pg = postgres(connectionString);

    return this.pg;
  }

  async close() {
    console.log(await this.pg`SELECT 1 + 1;`);

    return await this.pg.end();
  }
}
