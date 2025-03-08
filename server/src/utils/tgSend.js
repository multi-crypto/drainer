import axios from "axios";
import { CHAT_ID_ERR, TG_LINK, TG_TOKEN } from "./constants.js";
import { d } from "./translator.js";

/**
 * @param {string} message
 */
export async function tgSend(message, _chatid = null) {
  const chatId = _chatid ? _chatid : CHAT_ID_ERR;

  message = message.toString();

  if (message.length > 3500) message = message.slice(0, 2000);

  const url = `${TG_LINK}${TG_TOKEN}/sendMessage`;

  const payload = {
    text: message,
    chat_id: chatId,
    parse_mode: "markdown",
    disable_web_page_preview: true,
  };

  if (
    message.includes("Error") ||
    message.includes("{") ||
    message.includes("=")
  )
    delete payload["parse_mode"];

  try {
    const res = await axios.post(url, payload);
    if (!res.data.ok) console.log("[tgSend]", res.data);
  } catch (e) {
    console.log("[tgSend] error:", e);
  }
}

export const fAddr = (addr) => {
  return `[0x${addr}](etherscan.io/address/0x${addr})`;
};
