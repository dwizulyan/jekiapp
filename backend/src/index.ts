import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { dbUsers } from './services/users.service.js'
import userController from './controllers/users.controller.js'
import { authMiddleware } from './middleware/auth.js'
import { logger } from 'hono/logger'
import { customCORS } from './middleware/cors.js'
import imagesController from './controllers/images.controller.js'

const app = new Hono()

app.use("users/get-all", authMiddleware);

app.use("*", logger());
app.use("*", customCORS());
app.get('/', (c) => {
  return c.json({
    success: true,
    data: dbUsers.getAll()
  })
})

app.route("/users", userController);
app.route("/image", imagesController);

serve({
  fetch: app.fetch,
  hostname: "0.0.0.0",
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
