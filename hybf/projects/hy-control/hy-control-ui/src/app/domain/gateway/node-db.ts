import {GatewayNodeReg} from "./gateway-node-reg";

export class NodeDb {
  id:string;
  ip:string;
  port:number;
  dbType:string;
  accessType:string;
  dbName:string;
  userName:string;
  password:string;
  remark:string;
  py:string;
  wb:string;
  creator:string;
  modifor:string;
  modifyTime:any;
  connName:string;
  parent:GatewayNodeReg=new GatewayNodeReg();
}
