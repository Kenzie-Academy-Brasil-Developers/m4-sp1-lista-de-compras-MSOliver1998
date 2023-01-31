import express, { Application, json} from "express";
import {  createList, deleteItemInList, deleteList, getAllList, searchItem, updateList } from "./logic";
import { checkBodyDataRequestKeys, checkBodyRequestKeys, checkIdExist, checkNameItem } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/purchaseList", checkBodyRequestKeys, checkBodyDataRequestKeys, createList)

app.get("/purchaseList", getAllList)

app.get("/purchaseList/:id", checkIdExist, searchItem)

app.delete("/purchaseList/:id", checkIdExist, deleteList)

app.delete("/purchaseList/:id/:name", checkIdExist,checkNameItem, deleteItemInList)

app.patch("/purchaseList/:id/:name", checkIdExist,checkNameItem, updateList)

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));