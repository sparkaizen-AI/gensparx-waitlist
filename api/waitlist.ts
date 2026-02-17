import { VercelRequest, VercelResponse } from '@vercel/node'
import express from 'express'
import { registerRoutes } from '../server/routes.js'
import { serveStatic } from '../server/static.js'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Register all routes
await registerRoutes(null as any, app)

// Static files for production
serveStatic(app)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res)
}
