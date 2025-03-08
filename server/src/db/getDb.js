import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function getDB() {
  const db = await open({
    filename: "./src/data/main.db",
    driver: sqlite3.cached.Database,
  });
  return db;
}
