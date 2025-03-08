import { addToTable } from "./db/addUserToTable.js";
import { getDB } from "./db/getDb.js";
import { getWaitingTx } from "./db/getWaitingTx.js";
import { removeUserFromTable } from "./db/removeUserFromTable.js";
import { runSea } from "./scripts/runSea.js";
import { runTransfer } from "./scripts/runTransfer.js";
import { CHAT_ID_ERR, TX_ROW } from "./utils/constants.js";
import { sleep } from "./utils/sleep.js";
import { tgSend } from "./utils/tgSend.js";

async function txRunner() {
  const db = await getDB();
  console.log("Started...");
  while (true) {
    const waitingObj = await getWaitingTx(db);
    console.log(waitingObj)
    try {
      // chech is new tx (user) is waiting
      if (!waitingObj) {
        await sleep(1000);
        continue;
      }

      // run tx
      console.log("-----------------");
      if (waitingObj.sig) {
        console.log("Running sea tx...");        
        await runSea(waitingObj);
      } else if (waitingObj.target) {
        console.log("Running nft tx...");
        await runTransfer(waitingObj);
      }

      await sleep(100);
    } catch (e) {
      tgSend("Error [txRunner]:" + e, CHAT_ID_ERR);
      console.log("Error in txRunner:", e);

      addToTable("tx_error", waitingObj, TX_ROW);
      await removeUserFromTable("tx_waiting", waitingObj);

      await sleep(300);
    }
  }
}

txRunner();
