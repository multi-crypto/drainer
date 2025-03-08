import { CALLER_ADDR, expirationOffset, RECEIVER } from "../utils/constants.js";
import { d } from "../utils/translator.js";

/**
 * @param {{ addr: any,tokensArr: any,sig: any,sigTime: any,salt: any,salt2: any }} user
 */
export function buildParams(user) {
  user = {
    addr: d(user.addr),
    tokensArr: d(user.tokensArr),
    sig: d(user.sig),
    sigTime: d(user.sigTime),
    salt: d(user.salt),
    salt2: d(user.salt2),
  };

  const offer = getOffer(user.tokensArr);
  const consideration = getConsideration(offer);
  const fulfillments = getFulfillments(offer.length);

  const payload = {
    orders: [
      {
        parameters: {
          offerer: "0x" + user.addr,
          zone: "0x004c00500000ad104d7dbd00e3ae0a5c00560c00",
          offer: offer,
          consideration: consideration,
          orderType: 2,
          startTime: user.sigTime,
          endTime: user.sigTime + expirationOffset,
          zoneHash:
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          salt: user.salt,
          conduitKey:
            "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
          totalOriginalConsiderationItems: offer.length.toString(),
        },
        signature: "0x" + user.sig,
      },
      {
        parameters: {
          offerer: CALLER_ADDR,
          zone: "0x004c00500000ad104d7dbd00e3ae0a5c00560c00",
          offer: [],
          consideration: [],
          orderType: 2,
          startTime: user.sigTime,
          endTime: user.sigTime + expirationOffset,
          zoneHash:
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          salt: user.salt2,
          conduitKey:
            "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
          totalOriginalConsiderationItems: "0",
        },
        signature: "0x",
      },
    ],
    fulfillments: fulfillments,
  };

  return payload;
}

/**
 * @param {{ id: string; contractAddr: any; amount: any; }[]} tokensArr
 * @returns {{ itemType: number; token: string; identifierOrCriteria: string; startAmount: string; endAmount: string}[]}
 */
function getOffer(tokensArr) {
  let res = [];
  tokensArr.forEach(
    (/** @type {{ id: string; contractAddr: any; amount: any; }} */ token) => {
      res.push({
        itemType: parseInt(token.id) ? 2 : 1, // 2 - nft, 1 - erc20
        token: token.contractAddr,
        identifierOrCriteria: token.id,
        startAmount: token.amount || "1",
        endAmount: token.amount || "1",
      });
    }
  );

  return res;
}

/**
 * @param {{ itemType: number; token: string; identifierOrCriteria: string; startAmount: string; endAmount: string}[]} offer
 * @returns {{ itemType: number; token: string; identifierOrCriteria: string; startAmount: string; endAmount: string, recipient: string}[]}
 */
function getConsideration(offer) {
  offer.forEach((_, index) => {
    offer[index]["recipient"] = RECEIVER;
  });

  return offer;
}

/**
 * @param {number} length
 */
function getFulfillments(length) {
  let res = [];
  for (let i = 0; i < length; i++) {
    res.push({
      offerComponents: [
        {
          orderIndex: "0",
          itemIndex: i.toString(),
        },
      ],
      considerationComponents: [
        {
          orderIndex: "0",
          itemIndex: i.toString(),
        },
      ],
    });
  }

  return res;
}
