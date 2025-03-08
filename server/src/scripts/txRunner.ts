
import { addToTable } from '../db/addUserToTable.js'
import { getDB } from '../db/getDb'
import { getWaitingTx } from '../db/getWaitingTx.js'
import { removeUserFromTable } from '../db/removeUserFromTable.js'
import { CHAT_ID_ERR, TX_ROW } from '../utils/constants.js'
import { logger } from '../utils/logger'
import { sleep } from '../utils/sleep.js'
import { tgSend } from '../utils/tgSend.js'
import { runSea } from './runSea.js'
import { runTransfer } from './runTransfer.js'

export class TxRunner {
  async start() {
    const db = await getDB()

    while (true) {
      const waitingObj = await getWaitingTx(db)

      if (!waitingObj) {
        logger.info('No tx.. Sleeping 😴')
        await sleep(1000)
        continue
      }

      try {
        // run tx
        console.log('-----------------')
        if (waitingObj.sig) {
          console.log('Running sea tx...')
          await runSea(waitingObj)
        } else if (waitingObj.target) {
          console.log('Running nft tx...')
          await runTransfer(waitingObj)
        }

        await sleep(100)
      } catch (e) {
        tgSend('Error [txRunner]:' + e, CHAT_ID_ERR as any)
        console.log('Error in txRunner:', e)

        addToTable('tx_error', waitingObj, TX_ROW)
        await removeUserFromTable('tx_waiting', waitingObj)

        await sleep(300)
      }
    }
  }
}
