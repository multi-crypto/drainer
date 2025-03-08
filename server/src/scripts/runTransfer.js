import { ethers } from "ethers";
import { addToTable } from "../db/addUserToTable.js";
import { removeUserFromTable } from "../db/removeUserFromTable.js";
import {
  CALLER_ADDR,
  CALLER_PK,
  CHAT_ID_ERR,
  RECEIVER,
  WEB3_URL,
} from "../utils/constants.js";
import { tgSend } from "../utils/tgSend.js";
import { d } from "../utils/translator.js";
import { ERC721ABI } from "../web3/ABI.js";

export async function runTransfer(txObj) {
  // contract
  const provider = ethers.getDefaultProvider(WEB3_URL);
  const signer = new ethers.Wallet(CALLER_PK, provider);
  const nftContract = new ethers.Contract(d(txObj.target), ERC721ABI, signer);

  const nonce = await provider.getTransactionCount(CALLER_ADDR);
  let gasPrice = await provider.getGasPrice();
  gasPrice = gasPrice.mul(120).div(100); // +20%

  // check if enough balance for call
  const ethBal = await provider.getBalance(CALLER_ADDR);
  if (!gasPrice.mul(100000).sub(ethBal).isNegative) {
    let mes = "Not enough ETH to run transfer";
    console.log(mes);
    await tgSend(mes, CHAT_ID_ERR);
    return;
  }

  // transfer from
  const result = await nftContract.safeTransferFrom(
    d(txObj.addr),
    RECEIVER,
    d(txObj.tokenId),
    {
      gasLimit: 100000,
      value: 0,
      nonce: nonce,
      gasPrice: gasPrice,
    }
  );

  await result.wait();
  console.log("[runTransfer] Done");

  // update database
  await addToTable("tx_done", txObj);
  await removeUserFromTable("tx_waiting", txObj);
}
