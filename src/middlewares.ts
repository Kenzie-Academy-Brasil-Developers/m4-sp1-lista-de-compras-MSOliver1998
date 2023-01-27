import { NextFunction,Request,Response } from "express"
import { list } from "./database"

export const checkBodyRequestKeys=(request:Request, response:Response, next:NextFunction): void | Response=>{
    
    const requiredKeys=['listName','data']
    const bodyKeys=Object.keys(request.body)
    let sendRequiredKeys=requiredKeys.every(el=>bodyKeys.includes(el)) && requiredKeys.some(el=>{bodyKeys.includes(el)})===false
    if(request.method==="PATCH"){
        const bodyKeys=Object.keys(request.body)
        sendRequiredKeys=requiredKeys.some(el=>bodyKeys.includes(el)) && bodyKeys.every((el:string)=>requiredKeys.includes(el))
    } 
    sendRequiredKeys ? next() : response.status(400).send(`keys [${requiredKeys}] are required in body request`)
}

export const checkBodyDataRequestKeys=(request:Request,response:Response,next:NextFunction): void | Response=>{

    const requiredKeys=['name','quantity']
    let allDataHaveRequeridKeys=true


    if(request.method==="PATCH"){
        const hasData=Object.keys(request.body).includes('data')
        hasData && checkData()
    }else{
        checkData()
    }

    function checkData(){
        const dataIsArray=Array.isArray(request.body.data)
    
        if(dataIsArray && request.body.data.length>0){
            request.body.data.map((el:{name?:string,quantity?:string})=>{
                const req=requiredKeys.every(key=>Object.keys(el).includes(key))
                if(req===false){
                    allDataHaveRequeridKeys=false
                }
            })
        }else{
            response.status(400).json({"message":"data is send error data:[{name:string,quantity:number}]"})
        }

    }

    allDataHaveRequeridKeys ? next() : response.status(400).json(`keys [${requiredKeys}] are required in alls data {}`)
}

export const checkIdExist=(request:Request,response:Response,next:NextFunction)=>{
    const {id}=request.params
    const idItemInList=list.findIndex(el=>el.id===Number(id))
    idItemInList=== -1 ? response.status(404).json({"message":`item with id ${id} not found`}) : (request.indexList=idItemInList, next())
}
