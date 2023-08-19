import { Request, Response } from 'express'

export const createProfile = async (req: Request, res: Response) => {
  res.send("createProfile")
}

export const profileById = async (req: Request, res: Response) => {
  res.send("profileById")
}

export const updateProfileHandler = async (req: Request, res: Response) => {
  res.send("updateProfileHandler")
}

export const deleteProfileHandler = async (req: Request, res: Response) => {
  res.send("deleteProfileHandler")
}
