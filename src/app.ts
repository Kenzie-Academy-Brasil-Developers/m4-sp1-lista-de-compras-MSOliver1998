import express, { Application, json} from "express";
import { checkBodyDataRequestKeys, checkBodyRequestKeys, createList, getAllList } from "./logic";

const app: Application = express();
app.use(json());

app.post("/purchaseList", checkBodyRequestKeys, checkBodyDataRequestKeys, createList)

app.get("/purchaseList",getAllList)

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));