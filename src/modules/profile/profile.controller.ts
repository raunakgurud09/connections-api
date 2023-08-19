import { Request, Response } from 'express'
import { get } from 'lodash'
import Profile from './profile.model'
import { Cloudinary } from '../../lib/cloudinary'
// import { TUser } from '../../types/TUser'

export const createProfile = async (req: Request, res: Response) => {
  const user: any = get(req, 'user')

  if (!user) {
    return res.status(400).json({ message: 'Login first' })
  }

  try {
    const alreadyExist = await Profile.findOne({ user: user.userId })

    if (alreadyExist)
      return res
        .status(402)
        .json({ message: 'you can only create you profile once' })

    const profile = await Profile.create({
      user: user.userId,
      name: user?.name.firstName + user?.name.lastName,
      email: user.email,
      phone: user.phone
    })

    return res.status(200).json({ data: profile, message: 'user created' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
}

export const myProfileHandler = async (req: Request, res: Response) => {
  const user: any = get(req, 'user')

  try {
    const profile = await Profile.findOne({ user: user.userId })

    if (!profile)
      return res.status(404).json({ message: "you don't have a profile" })

    return res.status(200).json({ data: profile, message: 'your profile' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
}

export const profileById = async (req: Request, res: Response) => {
  const { profileId } = req.params

  try {
    const profile = await Profile.findById({ _id: profileId })

    if (!profile) return res.status(404).json({ message: 'profile not found' })

    return res.status(200).json({ data: profile, message: 'profile found' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
}

export const updateProfileHandler = async (req: Request, res: Response) => {
  const user: any = get(req, 'user')

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: user.userId },
      req.body
    )

    if (!profile) return res.status(404).json({ message: 'profile not found' })

    return res.status(200).json({ data: profile, message: 'profile updated' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
}

export const deleteProfileHandler = async (req: Request, res: Response) => {
  const user: any = get(req, 'user')

  try {
    const profile = await Profile.findOneAndDelete({ user: user.userId })

    if (!profile) return res.status(404).json({ message: 'profile not found' })

    return res.status(200).json({ message: 'profile deleted' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
}

export const uploadProfileImage = async (req: Request, res: Response) => {
  const user: any = get(req, 'user')

  const image = req.file
  if (!image) return res.status(400).json({ message: 'Image is required' })

  const id = new Date()
  let imageUrl: string | null | undefined = ''
  try {
    imageUrl = await Cloudinary.uploadImageFile(image, `/profile/${id}`, {
      width: 300,
      height: 300
    })

    if (!imageUrl)
      return res.status(500).json({ message: 'Image not uploaded' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error in image upload' })
  }

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: user.userId },
      { image: imageUrl }
    )

    if (!profile) return res.status(404).json({ message: 'profile not found' })

    return res.status(200).json({ data: profile, message: 'profile updated' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
}

export const uploadResume = async (req: Request, res: Response) => {
  const user: any = get(req, 'user')
  const { resumeLink } = req.body

  if (!resumeLink)
    return res.status(400).json({ message: 'resumeLink is required' })

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: user.userId },
      {
        resume: resumeLink
      }
    )

    if (!profile) return res.status(404).json({ message: 'profile not found' })

    return res.status(200).json({ data: profile, message: 'profile updated' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
}

export const allProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.find({})

    if (!profile) return res.status(404).json({ message: 'profile not found' })

    return res.status(200).json({ data: profile, message: 'all profile' })
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
    const profile = await Profile.findOneAndUpdate(
      {
        user: user.userId
      },
      {
        $addToSet: { connections: profileId }
      }
    )

    return res.status(200).json({ data: profile, message: 'user found' })
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
    const profile = await Profile.findOneAndUpdate(
      {
        user: user.userId
      },
      {
        $pull: { connections: profileId }
      }
    )

    return res.status(200).json({ data: profile, message: 'user found' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
}
