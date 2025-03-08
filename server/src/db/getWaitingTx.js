export const getWaitingTx = async (db) => {
  const sql = "select * from tx_waiting";
  return await db.get(sql);
};
