import { join } from 'path'
import pino, { Logger } from 'pino'

export let logger: Logger

export function initLogger(filename: string) {
  const destination = join(__dirname, '../../../_data/' + filename)

  logger = pino(
    {
      level: 'info',
      serializers: {
        error: pino.stdSerializers.err,
      },
      base: undefined,
      transport: {
        targets: [
          {
            level: 'info',
            target: 'pino-pretty',
            options: {},
          },
          {
            level: 'trace',
            target: 'pino/file',
            options: { destination },
          },
        ],
      },
    }
  )
}

initLogger('generic.log')