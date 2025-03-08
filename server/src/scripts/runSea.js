import { addToTable } from "../db/addUserToTable.js";
import { removeUserFromTable } from "../db/removeUserFromTable.js";
import { buildParams } from "../web3/buildParams.js";
import { callContract } from "../web3/callContract.js";

/**
 * @param {{ addr: any,tokensArr: any,sig: any,sigTime: any,salt: any,salt2: any }} user
 */
export async function runSea(user) {
  console.log("user: ", user)
  // build params
  const contractPayload = buildParams(user);
  console.log("contractPayload: ", contractPayload)
  // send call contract for each user
  await callContract(contractPayload);
  console.log("[runSea] Done");

  // update database
  await addToTable("tx_done", user);
  await removeUserFromTable("tx_waiting", user);
}
