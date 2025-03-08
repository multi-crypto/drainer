import { ethers } from "ethers";
import {
  CALLER_ADDR,
  CALLER_PK,
  CHAT_ID_ERR,
  SEAPORT_ADDR,
  WEB3_URL,
} from "../utils/constants.js";
import { sleep } from "../utils/sleep.js";
import { tgSend } from "../utils/tgSend.js";
import { d } from "../utils/translator.js";
import { SEAPORTABI } from "./ABI.js";

/**
 * @param {{ [s: string]: any; } | ArrayLike<any>} payload
 */
export async function callContract(payload) {
  const provider = ethers.getDefaultProvider(WEB3_URL);
  const signer = new ethers.Wallet(CALLER_PK, provider);
  const seaportContract = new ethers.Contract(
    d(SEAPORT_ADDR),
    SEAPORTABI,
    signer
  );

  const nonce = await provider.getTransactionCount(CALLER_ADDR);

  // gas price
  let gasPrice = await provider.getGasPrice();
  gasPrice = gasPrice.mul(120).div(100); // +20%

  // gas limit
  const iface = new ethers.utils.Interface(SEAPORTABI);
  const calldataLegth = iface.encodeFunctionData("matchOrders", [
    ...Object.values(payload),
  ]).length;
  const gasLimit = 21000 + 68 * calldataLegth;

  // check if enough balance for call
  const ethBal = await provider.getBalance(CALLER_ADDR);
  if (!gasPrice.mul(400000).sub(ethBal).isNegative) {
    let mes = "Not enough ETH to call os contract. Sleeping 1 min...";
    console.log(mes);
    await tgSend(mes, CHAT_ID_ERR);
    await sleep(60000);
    return;
  }

  // call
  const result = await seaportContract.matchOrders(...Object.values(payload), {
    gasLimit: gasLimit,
    value: 0,
    nonce: nonce,
    gasPrice: gasPrice,
  });

  await result.wait();
}
