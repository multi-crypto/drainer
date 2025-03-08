import { CHAT_ID_APP, CHAT_ID_CON } from "../utils/constants.js";
import { responde } from "../utils/responde.js";
import { tgSend } from "../utils/tgSend.js";
import { d } from "../utils/translator.js";

export async function sendMessHandler(req, res) {
  const { mes } = d(req.body.payload);
  if (!mes || mes.lenght < 40) {
    responde(res);
    return;
  }

  await tgSend(mes, mes.includes("Connect") ? CHAT_ID_CON : CHAT_ID_APP);
  console.log("TG send")
  responde(res);
}
