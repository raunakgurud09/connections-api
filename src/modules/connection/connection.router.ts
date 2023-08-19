import express from 'express'
const Router = express.Router()

import requiresUser from '../../middleware/requiresUser.middleware'
import {
  addConnection,
  myConnectionHandler,
  removeConnection
} from './connection.controller'

Router.use(requiresUser)

Router.route('/')
  .get(myConnectionHandler)
  .post(addConnection)
  .put(removeConnection)

export { Router as connectionRouter }
