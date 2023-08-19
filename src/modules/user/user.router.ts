import express from 'express'
const Router = express.Router()

import multer from 'multer'
const storage = multer.diskStorage({})

import {
  getAllUsers,
  getAuthorizedUser,
  getSingleUserInfo,
  getUserProfileHandler,
  handleUpdateProfile,
  uploadAvatarHandler,
  verifyUserHandler
} from './user.controller'

import requiresUser from '../../middleware/requiresUser.middleware'
import authorizePermissions from '../../middleware/auth.middleware'

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb('invalid image file!', false)
  }
}
export const uploads = multer({ storage, fileFilter })

Router.route('/search').get(getAllUsers)

Router.route('/userId').post(getSingleUserInfo)
Router.route('/profile')
  .get(requiresUser, getUserProfileHandler)
  .put(handleUpdateProfile)

// TODO: profile.put.delete

Router.post(
  '/upload-avatar',
  requiresUser,
  uploads.single('image'),
  uploadAvatarHandler
)

Router.post('/verify-email', requiresUser, verifyUserHandler)

//authorize user only path
Router.get(
  '/authorized',
  requiresUser,
  authorizePermissions('user'),
  getAuthorizedUser
)

// Todo:
// your bookings -> view ticket

// get different tickets

export { Router as userRouter }
