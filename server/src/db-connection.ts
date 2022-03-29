import { connection, connect } from "mongoose";
class Database {
  private readonly connection = connection;

  constructor() {
    this.connection
      .on("open", () => console.info("Database connection: open"))
      .on("close", () => console.info("Database connection: close"))
      .on("disconnected", () =>
        console.info("Database connection: disconnecting")
      )
      .on("disconnected", () =>
        console.info("Database connection: disconnected")
      )
      .on("reconnected", () =>
        console.info("Database connection: reconnected")
      );
  }

  async connect(uri?: string) {
    try {
      if(uri) {
        await connect(uri);
        return
      }

      const username = process.env.DB_USERNAME;
      const password = process.env.DB_PASSWORD;
      const dbName = process.env.DB_NAME;
      if (!username || !password || !dbName) {
        throw new Error(
          "DB_USERNAME, DB_PASSWORD or DB_NAME must be define"
        );
      }
      await connect(
        `mongodb+srv://${username}:${password}@cluster0.2sxed.mongodb.net/${dbName}?retryWrites=true&w=majority`
      );
      
    } catch (error) {
      throw error;
    }
  }

  async close() {
    try {
      await this.connection.close();
    } catch (error) {
      throw error;
    }
  }
}

const db = new Database();
export { db };
