import * as config from '../configuration'
import express from 'express'
import ls from 'log-symbols'
export const app = express()
console.log(ls.info, 'Launching web server')

app.listen(config.web.port, () =>
  console.log(ls.success, 'Web server listening on', config.web.port)
)
