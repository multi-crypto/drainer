import { getDB } from "./getDb.js";

/**
 * @param {string} tableName
 * @param {{ addr: any; sig: any; sigTime: any; }} user
 */
export async function removeUserFromTable(tableName, user) {
  const db = await getDB();
  await db.run(
    `delete from ${tableName} where addr=? and sig=? and sigTime=?`,
    [user.addr, user.sig, user.sigTime]
  );
}
