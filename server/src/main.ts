import './utils/logger'
import { App } from  './app'
import { TxRunner } from  './scripts/txRunner'

(async () => {
    const app = new App();
    await app.init();
    app.start();

    const txRunner = new TxRunner()
    await txRunner.start()
})()