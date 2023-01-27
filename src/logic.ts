import {request, Request, Response } from "express";
import { list } from "./database";

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

export const searchItem=(request:Request,response:Response)=>{
    const listItem=list[request.indexList]
    response.status(201).json(listItem)
}

export const deleteItemInList=(request:Request,response:Response)=>{
    list.splice(request.indexList,1)
    response.status(201).json()
}

export const updateList=(request:Request, response:Response)=>{
    const newList={...list[request.indexList], ...request.body}
    list.splice(request.indexList,1,newList)
    response.status(201).json(newList)
}