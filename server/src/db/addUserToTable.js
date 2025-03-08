import { CHAT_ID_ERR, COLUMNS } from "../utils/constants.js";
import { sleep } from "../utils/sleep.js";
import { tgSend } from "../utils/tgSend.js";
import { getDB } from "./getDb.js";

/**
 * @param {string} tableName
 * @param {any} user
 * @param {string | undefined} columns
 */
export async function addToTable(tableName, user, columns = undefined) {
  try {
    const res_cols = columns ? columns : COLUMNS[tableName]; // addr,calldata, ...
    const res_marks = getQMarks(res_cols); // ?,?, ...

    const db = await getDB();

    if (user.id) delete user.id;
    let userArr = [...Object.values(user)];
    userArr = userArr.filter((field) => field !== null);

    const sql = `insert into ${tableName}(${res_cols}) values (${res_marks})`;
    await db.run(sql, userArr);
  } catch (e) {
    tgSend("Error [addToTable]: " + e, CHAT_ID_ERR);
    console.log("[addToTable]", e);
    await sleep(500);
  }
}

function getQMarks(columns) {
  let res = "";
  columns.split(",").forEach(() => (res += "?,"));
  return res.slice(0, -1);
}
