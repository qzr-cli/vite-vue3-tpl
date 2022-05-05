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
    res: {
      uid: number
      username: string
      email: string
      rid: number
      groupid: number
      imagepath: string | null
      phone: string | null
    }
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
