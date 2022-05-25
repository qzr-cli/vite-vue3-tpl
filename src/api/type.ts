import { User } from '@/types/system/user'

export type IAPISchema = Record<string, {
  req: Record<string, any> | void
  res: Record<string, any> | any
}>

export default interface APISchema extends IAPISchema {
  login: {
    req: {
      username: string
      password: string
    }
    res: User
  }
  logout: {
    req: {
      uid: number
      password?: string
    }
    res: {

    }
  }
}
