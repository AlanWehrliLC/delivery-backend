import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"

import {routes} from "./routes"

const app = express()

app.use(express.json())

app.use(routes)

app.use((error: Error, request: Request, response: Response, next: NextFunction)=>{
  if (error instanceof Error) {
    return response.status(400).json({
      message: error.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error!"
  })
})

app.listen(3000, ()=>{console.log("Server is running")})