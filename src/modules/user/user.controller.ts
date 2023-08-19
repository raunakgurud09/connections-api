import { Request, Response } from 'express'
import { get } from 'lodash'
import Users from './user.service'
import User from './user.model'

export async function getAllUsers(req: Request, res: Response) {
  // const image = req.file

  const { limit } = req.query

  let limitN = Number(limit)

  if (!limit) {
    limitN = 10
  }

  try {
    const users = await User.find({
      email: { $regex: req.query.keyword }
    })
      .limit(limitN)
      .where({ role: ['user', 'promoter'] })

    res.status(200).json({ data: users })
    // res.status(200).json({ data: { total, count: users.length, users } })
  } catch (error) {
    res.status(500).json({ message: 'Error in getting users' })
  }
}

export async function uploadAvatarHandler(req: Request, res: Response) {
  // const image = req.file

  const image = get(req, 'file')
  const user = get(req, 'user')

  const result = await Users.uploadAvatar(user, image)

  res.status(200).json({ result })
}

export async function getUserProfileHandler(req: Request, res: Response) {
  const user = get(req, 'user')
  const { foundUser, message } = await Users.profile(user)

  res.status(200).json({ user: foundUser, message })
}

export const handleUpdateProfile = async (req: Request, res: Response) => {
  const { userId }: any = get(req, 'user')
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, req.body)

    if (!user) return res.status(400).json({ message: 'User not found' })

    res.status(200).json({ user: user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something went wrong' })
  }
}

export async function getAuthorizedUser(req: Request, res: Response) {
  const user = get(req, 'user')
  res.status(200).send(user)
}

export async function getSingleUserInfo(req: Request, res: Response) {
  const { userId } = req.body

  if (!userId) return res.status(400).json({ message: 'UserId is required' })

  try {
    const user = await User.find({ _id: userId })

    if (!user) return res.status(400).json({ message: 'No user found' })

    return res
      .status(200)
      .json({ data: user, message: 'user fetched successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

export async function verifyUserHandler(req: Request, res: Response) {
  //check weather the same as user called

  res.status(200).json({})
}
