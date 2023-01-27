import {json, NextFunction, Request, Response } from "express";
import { list } from "./database";

export const checkBodyRequestKeys=(request:Request, response:Response, next:NextFunction): void | Response=>{
    const requiredKeys=['listName','data']
    const bodyKeys=Object.keys(request.body)
    const sendRequiredKeys=requiredKeys.every(el=>bodyKeys.includes(el))
    sendRequiredKeys ? next() : response.status(400).send(`keys [${requiredKeys}] are required in body request`)
}

export const checkBodyDataRequestKeys=(request:Request,response:Response,next:NextFunction): void | Response=>{
    const requiredKeys=['name','quantity']
    let allDataHaveRequeridKeys=true
    request.body.data.map((el:{name?:string,quantity?:string})=>{
        const req=requiredKeys.every(key=>Object.keys(el).includes(key))
        if(req==false){
            allDataHaveRequeridKeys=false
        }
    })
    allDataHaveRequeridKeys ? next() : response.status(400).json(`keys [${requiredKeys}] are required in alls data {}`)
}

export const createList=(request:Request,response:Response)=>{
    const id= list.length>0 ? list[list.length-1].id+1 : 1
    const {listName,data}=request.body
    const Listdata={id,listName,data}
    list.push(Listdata)
    response.status(201).json(Listdata)
}

export const getAllList=(request:Request,response:Response)=>{
    return response.status(201).json(list)
}