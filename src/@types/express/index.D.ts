import * as express from 'express'

declare global {
  namespace Express {
    interface Request{
      indexList: number 
      indexItem: number
    }
  }
}