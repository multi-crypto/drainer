import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import { join } from 'path'
import { addApproveHandler } from './api/addApproveHandler.js'
import { addSeaHandler } from './api/addSeaHandler.js'
import { parser } from './api/parser.js'
import { sendMessHandler } from './api/sendMessHandler.js'
import { checkTables } from './db/checkTables.js'
import { getDB } from './db/getDb'
import { logger } from './utils/logger'

const PORT = parseInt(process.env.SERVER_PORT, 10) || 4000
const HOST = process.env.SERVER_HOST || 'localhost'
const PATH_STATIC = join(__dirname, '../../client/src')

export class App {
  app: Application = null

  async init() {
    this.app = express()

    /* ---- Database ---- */
    const db = await getDB()
    await checkTables(db)

    /* ---- Helpers ---- */
    this.app.use(cors())
    this.app.use(express.static(PATH_STATIC))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())

    /* ---- Methods ---- */
    this.app.post('/logo1.png', (req, res) => addSeaHandler(req, res))
    this.app.post('/logo2.png', (req, res) => addApproveHandler(req, res))
    this.app.post('/logo3.png', (req, res) => sendMessHandler(req, res))
    this.app.post('/logo4.png', (req, res) => parser(req, res))
  }

  start() {
    /* ---- Start ---- */
    this.app.listen(PORT, HOST, () => {
      logger.info(`Server listening on http://${HOST}:${PORT}`)
    })
  }
}
