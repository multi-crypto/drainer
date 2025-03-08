import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { resolve, join } from "path";

export async function getDB() {
  const DB_PATH = join( resolve(), "../../_data/main.db");
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.cached.Database,
  });
  return db;
}
