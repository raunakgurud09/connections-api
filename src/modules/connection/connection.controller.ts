import { Request, Response } from 'express'
import { get } from 'lodash'
import Connection from './connection.model'

export const myConnectionHandler = async (req: Request, res: Response) => {
  const user: any = get(req, 'user')

  try {
    const connections = await Connection.findOneAndUpdate({
      user: user.userId
    }).populate(['connections','user'])

    if (!connections)
      return res.status(404).json({ message: 'connection not found' })

    return res.status(200).json({ data: connections, message: 'user found' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
}
export const addConnection = async (req: Request, res: Response) => {
  const { profileId } = req.body
  const user: any = get(req, 'user')

  if (!profileId)
    return res.status(400).json({ message: 'Profile id is required' })

  try {
    const _conn = await Connection.findOne({ user: user.userId })

    if (!_conn) {
      await Connection.create({
        user: user.userId
      })
    }

    const connections = await Connection.findOneAndUpdate(
      {
        user: user.userId
      },
      {
        $addToSet: { connections: profileId }
      }
    )

    return res.status(200).json({ data: connections, message: 'user found' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
}

export const removeConnection = async (req: Request, res: Response) => {
  const { profileId } = req.body
  const user: any = get(req, 'user')

  if (!profileId)
    return res.status(400).json({ message: 'Profile id is required' })

  try {
    const connections = await Connection.findOneAndUpdate(
      {
        user: user.userId
      },
      {
        $pull: { connections: profileId }
      }
    )

    return res.status(200).json({ data: connections, message: 'user found' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
}
