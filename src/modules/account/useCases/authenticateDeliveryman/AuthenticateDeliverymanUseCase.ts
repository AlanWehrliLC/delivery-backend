import { prisma } from "../../../../database/prismaClient"

import { compare } from "bcryptjs"

import { sign } from "jsonwebtoken"

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {
  async execute({username, password}: IAuthenticateDeliveryman){

    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new Error("Username or password invalid!")
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch) {
      throw new Error("Username or password invalid!")
    }

    const token = sign({username}, "8a789288c41b5c9a25b84ace1771b03a", {
      subject: deliveryman.id,
      expiresIn: "1d"
    })

    return token
    
  }
}