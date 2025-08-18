import * as z from 'zod'

export type UserJsonValue = {
  id: string
  hospitalId: string
  username: string
  name: string
  email: string
}

export default class User {
  static readonly schema = z.object({
    id: z.uuid(),
    hospitalId: z.string(),
    username: z.string(),
    email: z.email(),
    name: z.string(),
  })

  constructor(
    readonly id: string,
    readonly username: string,
    readonly name: string,
    readonly email: string,
    readonly hospitalId: string,
  ) {}

  static validate(data: UserJsonValue) {
    User.schema.parse(data)
  }

  static fromJson(data: UserJsonValue) {
    User.validate(data)
    return new User(data.id, data.username, data.name, data.email, data.hospitalId)
  }
}
