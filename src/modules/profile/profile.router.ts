import express from 'express'
const Router = express.Router()

import requiresUser from '../../middleware/requiresUser.middleware'

import authorizePermissions from '../../middleware/auth.middleware'

import {
  createProfile,
  updateProfileHandler,
  deleteProfileHandler,
  profileById
} from './profile.controller'

Router.route('/:profileId').get(profileById)


Router.use(requiresUser)
Router.route('/')
  .post(createProfile)
  .put(updateProfileHandler)
  .delete(deleteProfileHandler)

export { Router as profileRouter }
