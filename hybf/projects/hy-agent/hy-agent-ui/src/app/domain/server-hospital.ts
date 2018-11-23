import {Page} from "../common/page";
import {Server} from "./server";

export class ServerHospital extends Page{

  serverid: string;
  servercode: string;
  servername: string;
  content: string;
  excepted: string;
  unit: string;
  servermatingCondition:string;
  serverparamschosed:string;
  server: Server; 
}
