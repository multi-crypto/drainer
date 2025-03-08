import { APP_USER, SEA_USER, TX_ROW } from "../utils/constants.js";

/**
 * @param {any} db
 */
export async function checkTables(db) {
  await checkTable(db, "sea_users", SEA_USER);
  await checkTable(db, "app_users", APP_USER);
  await checkTable(db, "tx_waiting", TX_ROW);
  await checkTable(db, "tx_done", TX_ROW);
  await checkTable(db, "tx_error", TX_ROW);
}

/**
 * @param {any} db
 * @param {string} tableName
 * @param {string} columns
 */
async function checkTable(db, tableName, columns) {
  db.get(
    `SELECT name FROM sqlite_master WHERE type='table' and name='${tableName}'`
  ).then((res) => {
    if (!res) {
      const sql = `CREATE TABLE ${tableName}(id INTEGER PRIMARY KEY,${columns})`;
      db.run(sql);
      console.log(`Created ${tableName} table`);
    }
  });
}
