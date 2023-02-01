import { Request, Response } from "express";
import { list } from "./database";

export const createList=(request:Request,response:Response)=>{
    
    const id= list.length>0 ? list[list.length-1].id+1 : 1
    const {listName,data}=request.body
    const Listdata={id,listName,data}
    list.push(Listdata)
    response.status(201).json(Listdata)
}

export const getAllList=(request:Request,response:Response)=>{
    return response.status(200).json(list)
}

export const searchItem=(request:Request,response:Response)=>{
    const listItem=list[request.indexList]
    response.status(200).json(listItem)
}

export const deleteList=(request:Request,response:Response)=>{
    list.splice(request.indexList,1)
    response.status(204).json()
}

export const deleteItemInList=(request:Request,response:Response)=>{
    list[request.indexList].data.splice(request.indexItem,1)
    response.status(204).json()
}

export const updateList=(request:Request, response:Response)=>{
    const listSelect=(list[request.indexList].data[request.indexItem])
    listSelect.name=request.body.name || listSelect.name
    listSelect.quantity=request.body.quantity || listSelect.quantity
    response.status(200).json(listSelect)
}