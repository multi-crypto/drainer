import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { resolve, join } from "path";
import { makeDirectory } from 'make-dir';

const DB_PATH = join(resolve(), "../_data");
const DB_FILE = join(DB_PATH, 'main.db');

let DB = undefined

async function initDB() {
  await makeDirectory(DB_PATH)

  DB = await open({
    filename: DB_FILE,
    driver: sqlite3.cached.Database,
  });
}

export async function getDB() {
  if (!DB) {
    await initDB()
  }

  return DB
}
