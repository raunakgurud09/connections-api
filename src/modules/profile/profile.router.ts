import express from 'express'
const Router = express.Router()

import requiresUser from '../../middleware/requiresUser.middleware'

import authorizePermissions from '../../middleware/auth.middleware'

import {
  createProfile,
  updateProfileHandler,
  deleteProfileHandler,
  profileById,
  myProfileHandler,
  uploadProfileImage,
  uploadResume,
  allProfile,
  addConnection,
  removeConnection
} from './profile.controller'
import { uploads } from '../user/user.router'

Router.route('/all-profile').get(authorizePermissions('user'), allProfile)

Router.route('/:profileId').get(profileById)

Router.use(requiresUser)

Router.route('/')
  .post(createProfile)
  .get(myProfileHandler)
  .put(updateProfileHandler)
  .delete(deleteProfileHandler)

Router.route('/connection').post(addConnection).delete(removeConnection)
//skills
Router.route('/upload-resume').post(uploadResume)

Router.route('/upload-image').post(uploads.single('image'), uploadProfileImage)

export { Router as profileRouter }
