import express from 'express'
const Router = express.Router()

import authorizePermissions from '../../middleware/auth.middleware'
import requiresUser from '../../middleware/requiresUser.middleware'
import {
  getAllUserHandler,
  handleDeleteUserById,
} from './admin.controller'

Router.route('/:userId').delete(
  requiresUser,
  authorizePermissions('admin'),
  handleDeleteUserById
)

Router.route('/users').get(
  requiresUser,
  authorizePermissions('admin'),
  getAllUserHandler
)



export { Router as adminRouter }
