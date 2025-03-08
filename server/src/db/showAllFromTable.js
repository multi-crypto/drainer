import { getDB } from "./getDb";

/**
 * @param {string} tableName
 */
export async function showAllFromTable(tableName) {
  const db = await getDB();
  const res = await db.all(`select * from ${tableName}`);
  console.log(`all ${tableName}:`, res);
}
