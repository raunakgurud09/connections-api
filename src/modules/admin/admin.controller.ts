import { Request, Response } from 'express'
import User from '../user/user.model'

export const getAllUserHandler = async (req: Request, res: Response) => {
  const { role } = req.query

  const allUser = await User.find({}).where({ role: role && role })

  res.status(200).json(allUser)
}

export const handleDeleteUserById = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const user = await User.findByIdAndDelete({ _id: userId })

    if (!user) return res.status(400).json({ message: 'User not found' })

    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    return res.status(500).json({ messaeg: 'Something went wrong' })
  }
}

