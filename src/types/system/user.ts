export interface User {
  uid: number
  rid: number
  userName: string
  email: string
  groupId: number
  status: string
  imagePath: string
  phone: string
  isManager?: boolean
  isAdministrators?: boolean
}

export interface pwdUpdate {
  uid: number
  password: string
  passwordNew: string
}
