/**
 * @flow
 */

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import router from './routes'
import { errorHandler } from './middleware'
import fs from 'fs'
import latex from 'node-latex'
import getTemplateData from './generator/templates'

let app

if (process.argv.includes('create')) {
  const content = JSON.parse(
    fs.readFileSync('/tmp/cv.json', { encoding: 'utf8' })
  )
  const { texDoc, opts } = getTemplateData(content)
  const pdf = latex(texDoc, opts)

  const output = fs.createWriteStream('/tmp/cv.pdf')
  pdf.pipe(output);
  pdf.on('error', (err) => console.error(err))
  pdf.on('finish', () => process.exit(0))
} else {
  app = new Koa()

  if (app.env === 'development') {
    app.proxy = true
  }

  app.use(errorHandler())
  app.use(helmet())
  app.use(bodyParser())
  app.use(router)
}

export default app
